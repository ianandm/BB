import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getOrCreateLocalUser } from "@/lib/auth/customer";
import { getCartSessionId } from "@/lib/cart/session";
import {
  findActiveGuestCart,
  findActiveUserCart,
  getCartWithItems,
} from "@/lib/queries/cart";
import {
  createCheckoutSessionRecord,
  findOutOfStockItems,
} from "@/lib/queries/checkout";
import { getStripe, SHIPPING_RATES } from "@/lib/stripe";
import { checkoutSchema } from "@/lib/validations/checkout";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000;

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    }

    const parsed = checkoutSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const input = parsed.data;

    // Server cart only — user cart when signed in, else guest cart.
    const user = await getOrCreateLocalUser();
    const cartRow = user
      ? await findActiveUserCart(user.id)
      : await (async () => {
          const sessionId = await getCartSessionId();
          return sessionId ? findActiveGuestCart(sessionId) : null;
        })();

    const cart = cartRow ? await getCartWithItems(cartRow.id) : null;
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty" }, { status: 400 });
    }

    const outOfStock = await findOutOfStockItems(cart);
    if (outOfStock.length > 0) {
      return NextResponse.json(
        {
          error: `Out of stock: ${outOfStock.join(", ")}. Please adjust your cart.`,
        },
        { status: 409 },
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const checkoutSessionId = randomUUID();
    const subtotalCents = Math.round(cart.subtotal * 100);
    const stripe = getStripe();

    const standardShipping = {
      shipping_rate_data: {
        type: "fixed_amount" as const,
        display_name:
          subtotalCents >= SHIPPING_RATES.freeThreshold
            ? "Free Standard Shipping (5-8 business days)"
            : SHIPPING_RATES.standard.label,
        fixed_amount: {
          amount:
            subtotalCents >= SHIPPING_RATES.freeThreshold
              ? 0
              : SHIPPING_RATES.standard.amount,
          currency: "usd",
        },
      },
    };

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: input.email,
      line_items: cart.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.unitPrice * 100),
          product_data: {
            name: item.book.title,
            description: `by ${item.book.author}`,
          },
        },
      })),
      shipping_options: [
        standardShipping,
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: SHIPPING_RATES.expedited.label,
            fixed_amount: {
              amount: SHIPPING_RATES.expedited.amount,
              currency: "usd",
            },
          },
        },
      ],
      metadata: { checkoutSessionId },
      success_url: `${appUrl}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout`,
      expires_at: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
    });

    await createCheckoutSessionRecord({
      id: checkoutSessionId,
      stripeSessionId: stripeSession.id,
      cart,
      userId: user?.id ?? null,
      input,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 },
    );
  }
}
