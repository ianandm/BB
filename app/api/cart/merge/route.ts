import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getOrCreateLocalUser } from "@/lib/auth/customer";
import { CART_SESSION_COOKIE, getCartSessionId } from "@/lib/cart/session";
import { getCartWithItems, mergeGuestCartIntoUserCart } from "@/lib/queries/cart";

export const runtime = "nodejs";

/**
 * POST /api/cart/merge — merge the guest cart into the signed-in user's
 * cart. Called once by the client when a Clerk session appears.
 * No-op (200) when signed out or when there is no guest cart.
 */
export async function POST() {
  try {
    const user = await getOrCreateLocalUser();
    if (!user) return NextResponse.json({ merged: false });

    const guestSessionId = await getCartSessionId();
    if (!guestSessionId) return NextResponse.json({ merged: false });

    const userCart = await mergeGuestCartIntoUserCart(guestSessionId, user.id);

    // The guest cart is gone; drop the cookie so future syncs go to the user cart.
    const store = await cookies();
    store.delete(CART_SESSION_COOKIE);

    const cart = await getCartWithItems(userCart.id);
    return NextResponse.json({ merged: true, cart });
  } catch (error) {
    console.error("Cart merge error:", error);
    return NextResponse.json({ error: "Failed to merge cart" }, { status: 500 });
  }
}
