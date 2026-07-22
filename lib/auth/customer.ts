import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

/**
 * Resolve the local Prisma User for the current Clerk session,
 * creating or linking the row on first use (webhook-independent,
 * so local development needs no tunnel). Returns null when signed out.
 */
export async function getOrCreateLocalUser() {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return null;

  const existing = await prisma.user.findUnique({ where: { clerkUserId } });
  if (existing) return existing;

  const clerkUser = await currentUser();
  const email = clerkUser?.primaryEmailAddress?.emailAddress;
  if (!email) return null;

  // Upsert keyed on email so a pre-existing row (e.g. seeded demo user)
  // gets linked rather than duplicated.
  return prisma.user.upsert({
    where: { email },
    update: { clerkUserId },
    create: {
      clerkUserId,
      email,
      firstName: clerkUser?.firstName ?? null,
      lastName: clerkUser?.lastName ?? null,
      role: "CUSTOMER",
    },
  });
}
