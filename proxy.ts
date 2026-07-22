import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { verifyAdminSessionTokenEdge } from "@/lib/auth/admin-session-edge";

/**
 * Clerk wraps the middleware so customer session state is available
 * app-wide. The admin HMAC system runs first inside the callback and
 * returns early — admin routes never touch Clerk. The Stripe webhook
 * is excluded entirely (raw body + no auth).
 */
export default clerkMiddleware(async (_auth, request) => {
  const { pathname } = request.nextUrl;

  if (pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("bluish_admin_session")?.value;
    const isAuthenticated = await verifyAdminSessionTokenEdge(token);

    if (pathname.startsWith("/admin/login")) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    if (!isAuthenticated) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // All routes except static files, _next, and the Stripe webhook
    "/((?!_next|api/webhooks/stripe|.*\\..*).*)",
    "/(api(?!/webhooks/stripe)|trpc)(.*)",
  ],
};
