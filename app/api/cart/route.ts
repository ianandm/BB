import { NextResponse } from "next/server";
import {
  getCartSessionId,
  getOrCreateCartSessionId,
} from "@/lib/cart/session";
import {
  clearCart,
  findActiveGuestCart,
  findActiveUserCart,
  getCartWithItems,
  getOrCreateGuestCart,
  getOrCreateUserCart,
  replaceCartItems,
} from "@/lib/queries/cart";
import { getOrCreateLocalUser } from "@/lib/auth/customer";
import { cartSyncSchema } from "@/lib/validations/cart";

export const runtime = "nodejs";

/**
 * GET /api/cart — return the current guest cart.
 * Deliberately does NOT create a session or DB row: read-only visitors
 * should never generate Cart rows.
 */
export async function GET() {
  try {
    const user = await getOrCreateLocalUser();
    if (user) {
      const userCart = await findActiveUserCart(user.id);
      if (!userCart) return NextResponse.json({ cart: null });
      const cartWithItems = await getCartWithItems(userCart.id);
      return NextResponse.json({ cart: cartWithItems });
    }

    const sessionId = await getCartSessionId();
    if (!sessionId) return NextResponse.json({ cart: null });

    const cart = await findActiveGuestCart(sessionId);
    if (!cart) return NextResponse.json({ cart: null });

    const cartWithItems = await getCartWithItems(cart.id);
    return NextResponse.json({ cart: cartWithItems });
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json({ error: "Failed to load cart" }, { status: 500 });
  }
}

/**
 * PUT /api/cart — replace the cart's contents with the client's item list.
 * Creates the guest session cookie and Cart row on first write.
 * Prices are re-read server-side; unknown book ids are dropped.
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const parsed = cartSyncSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const user = await getOrCreateLocalUser();
    const cart = user
      ? await getOrCreateUserCart(user.id)
      : await getOrCreateGuestCart(await getOrCreateCartSessionId());
    await replaceCartItems(cart.id, parsed.data.items);

    const cartWithItems = await getCartWithItems(cart.id);
    return NextResponse.json({ cart: cartWithItems });
  } catch (error) {
    console.error("Cart PUT error:", error);
    return NextResponse.json({ error: "Failed to sync cart" }, { status: 500 });
  }
}

/** DELETE /api/cart — empty the current guest cart. */
export async function DELETE() {
  try {
    const user = await getOrCreateLocalUser();
    const cart = user
      ? await findActiveUserCart(user.id)
      : await (async () => {
          const sessionId = await getCartSessionId();
          return sessionId ? findActiveGuestCart(sessionId) : null;
        })();
    if (cart) await clearCart(cart.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Cart DELETE error:", error);
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 });
  }
}
