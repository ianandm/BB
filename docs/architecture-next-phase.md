# BluishBoy — Next-Phase Architecture

This document covers three workstreams: moving from `prisma db push` to real migrations, integrating Clerk for customer auth, and persisting the cart to the database. The cart work ships with code in this change; migrations and Clerk are designed here and implemented in follow-up commits.

---

## 1. Prisma migrations strategy

### Why move off `db push`

`db push` mutates the database to match the schema with no history and no review step. It can silently drop columns or data when a change is ambiguous, and there is no way to know what state production is actually in versus what the schema says. Migrations give you a versioned, reviewable SQL history, a deterministic deploy step, and safe rollforward.

### Step 1 — Baseline the existing Neon database

The production database already matches `schema.prisma`, so the first migration must be generated *and marked as already applied* rather than run. From the repo root, with `DATABASE_URL` pointing at the **production** Neon database:

```bash
mkdir -p prisma/migrations/0_init

npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel prisma/schema.prisma \
  --script > prisma/migrations/0_init/migration.sql

npx prisma migrate resolve --applied 0_init
```

This writes the full CREATE-everything SQL as migration `0_init` and records it in the `_prisma_migrations` table on Neon without executing it. Commit `prisma/migrations/` to git. `prisma.config.ts` already points `migrations.path` at `prisma/migrations`, so no config change is needed.

Repeat `migrate resolve --applied 0_init` against any other database that already has the schema (e.g. a second Neon branch). Fresh databases skip this step — `migrate deploy` will run `0_init` for real.

### Step 2 — Day-to-day development

From now on, schema changes follow this loop: edit `schema.prisma`, then run `npx prisma migrate dev --name describe_the_change`. This generates a new migration folder, applies it to your dev database, and regenerates the client. Never hand-edit an applied migration; create a new one instead.

Neon-specific note: `migrate dev` uses a shadow database to detect drift. Neon's default role can't create databases, so either create a second Neon branch and set it as the shadow via `shadowDatabaseUrl` in the datasource, or (simpler) run a local Postgres for development — the repo already has a `docker-compose.yml`. The recommended setup is: local Postgres (or a dedicated Neon dev branch) for `migrate dev`, production Neon only ever touched by `migrate deploy`.

### Step 3 — Deploys

Change the Vercel build to apply pending migrations before building:

```json
"build": "prisma generate && prisma migrate deploy && next build",
"db:migrate": "prisma migrate dev",
"db:deploy": "prisma migrate deploy"
```

`migrate deploy` is non-interactive, only runs pending migrations, and fails the build loudly if the database and migration history disagree — which is exactly what you want. Keep `db:push` around for throwaway experiments only, and stop using it against production. The existing `db:setup` script should become `db:generate && db:deploy && db:seed`.

One caution: Vercel can run multiple concurrent builds (e.g. a preview and a production deploy). Prisma takes an advisory lock during `migrate deploy`, so concurrent runs are safe, but preview deployments pointing at the production `DATABASE_URL` would migrate production from a preview branch. Give preview deployments their own Neon branch via Vercel's environment-scoped variables.

### First real migration to schedule

When Clerk lands (section 2), the first post-baseline migration will add `clerkUserId` to `User`. That's a good, low-risk first exercise of the new workflow.

---

## 2. Clerk customer-auth integration design

### Scope

Clerk handles **customers only**. The admin area keeps the existing HMAC cookie system — it works, it's decoupled, and mixing the two would complicate the middleware for no benefit. Revisit later if you want admins in Clerk with role claims.

### Identity model: Clerk is the authority, Prisma mirrors it

Clerk owns credentials, sessions, and profile UI. The Prisma `User` row exists to anchor relational data (orders, carts, reviews, addresses). Link them with one new field:

```prisma
model User {
  // ...existing fields
  clerkUserId String? @unique
}
```

`passwordHash` stays nullable and simply goes unused for Clerk-managed users.

### Keeping the mirror in sync — webhook plus lazy upsert

Primary mechanism: a Clerk webhook at `POST /api/webhooks/clerk` (verified with `svix` using `CLERK_WEBHOOK_SECRET`) handling `user.created` and `user.updated` by upserting the `User` row (`clerkUserId`, `email`, `firstName`, `lastName`), and `user.deleted` by anonymizing rather than deleting, so order history survives.

Backstop mechanism: a `getOrCreateLocalUser()` helper called from any server code path that needs the Prisma user. It reads `auth()` from `@clerk/nextjs/server`, looks up by `clerkUserId`, and creates the row if the webhook hasn't arrived yet (webhooks are eventually consistent, and localhost won't receive them without a tunnel). This makes local development work with zero webhook setup.

```ts
// lib/auth/customer.ts (sketch)
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getOrCreateLocalUser() {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return null;

  const existing = await prisma.user.findUnique({ where: { clerkUserId } });
  if (existing) return existing;

  const clerkUser = await currentUser();
  return prisma.user.upsert({
    where: { email: clerkUser!.primaryEmailAddress!.emailAddress },
    update: { clerkUserId },
    create: {
      clerkUserId,
      email: clerkUser!.primaryEmailAddress!.emailAddress,
      firstName: clerkUser!.firstName,
      lastName: clerkUser!.lastName,
      role: "CUSTOMER",
    },
  });
}
```

The upsert keyed on email also handles the seeded `demo@bluishboy.com` user gracefully if that address ever signs up through Clerk.

### Middleware: composing Clerk with the existing admin guard

Clerk's `clerkMiddleware` must become the outer wrapper, with the current admin logic moved inside its callback. The admin check runs first and returns early, so admin routes never touch Clerk:

```ts
// middleware.ts (sketch)
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { verifyAdminSessionTokenEdge } from "@/lib/auth/admin-session-edge";

const isProtectedCustomerRoute = createRouteMatcher(["/account(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    // ...existing admin logic, unchanged, returning early
  }

  if (isProtectedCustomerRoute(request)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // Clerk needs to see most routes to attach session state
    "/(api|trpc)(.*)",
  ],
};
```

Note the matcher must widen from the current admin-only matcher, because Clerk attaches auth context on every matched request. The admin branch is a pure pass-through of today's behavior. (The Vercel "middleware → proxy" deprecation warning applies here too; when you migrate, this same composition works in `proxy.ts`.)

### UI integration

Wrap the root layout in `<ClerkProvider>`. Replace the header's user icon (currently linking to `/admin/login`) with Clerk's `<SignedIn>/<UserButton>` and `<SignedOut>/<SignInButton>` components — admin login gets reached by URL directly instead, which is more appropriate anyway. Use Clerk's hosted or modal sign-in rather than building custom pages initially. New env vars: `CLERK_WEBHOOK_SECRET`, plus the two already scaffolded keys, in both `.env` and Vercel.

### Cart handoff on sign-in

This is where sections 2 and 3 meet. `lib/queries/cart.ts` now exports `mergeGuestCartIntoUserCart(guestSessionId, userId)`: it sums quantities for books in both carts, moves guest-only items over, and deletes the guest cart. Call it once per sign-in — the cleanest trigger is a small client effect that fires when Clerk's `useUser()` transitions to signed-in and calls `POST /api/cart/merge`, which reads the `bluish_cart_session` cookie, resolves the local user via `getOrCreateLocalUser()`, merges, and clears the cookie. `/api/cart` routes then prefer the user cart over the guest cart when a Clerk session is present.

### Rollout order

Ship in this sequence, each independently deployable: (1) migration adding `clerkUserId`; (2) `ClerkProvider` + middleware composition with no protected customer routes yet — pure no-op for existing users; (3) header sign-in UI; (4) webhook + `getOrCreateLocalUser`; (5) cart merge; (6) `/account` pages (orders, addresses) as the first protected routes.

---

## 3. Cart-to-DB persistence (implemented in this change)

### Design goals and approach

The cart had to stay instant (optimistic, no spinners on add-to-cart), keep working if the API or DB is down, and require zero changes to the many components consuming `useCart()`. The design therefore keeps **localStorage as the client source of truth** and treats the database as a **synced mirror**, reconciled with a whole-cart replace rather than per-item mutations.

Client flow: on mount, the provider hydrates from localStorage exactly as before, then fetches `GET /api/cart` once and merges server-only items into local state (local quantities win on conflict — the device in front of the user is freshest). After that, any change to the cart debounces 800 ms and pushes the full item list via `PUT /api/cart`. A whole-cart `PUT` is idempotent and self-healing: there is no per-item request ordering to get wrong, and any missed sync is corrected by the next one.

Server flow: guests are identified by a `bluish_cart_session` httpOnly cookie (30-day, created lazily on first *write*, never on read — browsing never creates Cart rows). `PUT` upserts the guest `Cart`, then `replaceCartItems` deletes and recreates `CartItem` rows in one transaction, re-reading prices from the `Book` table. **Client-supplied prices are never trusted**; unknown or non-ACTIVE book ids are dropped. Items whose ids aren't UUIDs (the static fallback books like `bk-1`) are filtered client-side and stay localStorage-only.

### Files in this change

`lib/cart/session.ts` (guest session cookie helpers), `lib/validations/cart.ts` (Zod schema for the sync payload), additions to `lib/queries/cart.ts` (`findActiveGuestCart`, `replaceCartItems`, `clearCart`, `mergeGuestCartIntoUserCart`), `app/api/cart/route.ts` (GET/PUT/DELETE, `runtime = "nodejs"`), and a drop-in `components/cart/CartProvider.tsx` with an unchanged public API — no consumer component needs edits.

### Tradeoffs and follow-ups

Last-write-wins across devices is accepted: two browsers editing the same guest cart converge to whichever synced last. This is standard for guest carts and resolves fully once carts attach to Clerk users. The server cart also enables the deferred pieces: checkout can read the authoritative cart (real prices, stock via `Inventory`) instead of trusting the client, abandoned-cart queries become possible (`status`/`expiresAt` are already modeled — consider adding a `MERGED` value to `CartStatus` in a future migration if you'd rather keep merged guest carts than delete them), and `POST /api/cart/merge` slots in with Clerk as described above.

### Deploy checklist for this change

No schema changes — `Cart`/`CartItem` already exist, so no `prisma db push`/migration is needed. No new env vars. Just push and redeploy; verify by adding a book, checking the `bluish_cart_session` cookie appears, and confirming rows in Prisma Studio (`npm run db:studio`).
