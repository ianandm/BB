import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export const CART_SESSION_COOKIE = "bluish_cart_session";
const CART_SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/** Read the guest cart session id from cookies, if present. */
export async function getCartSessionId(): Promise<string | null> {
  const store = await cookies();
  return store.get(CART_SESSION_COOKIE)?.value ?? null;
}

/**
 * Read the guest cart session id, creating and setting the cookie if missing.
 * Only call from Route Handlers or Server Actions — cookie writes are not
 * allowed in Server Components.
 */
export async function getOrCreateCartSessionId(): Promise<string> {
  const store = await cookies();
  const existing = store.get(CART_SESSION_COOKIE)?.value;
  if (existing) return existing;

  const sessionId = randomUUID();
  store.set(CART_SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: CART_SESSION_MAX_AGE,
    path: "/",
  });
  return sessionId;
}
