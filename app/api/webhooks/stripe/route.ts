import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { sendOrderConfirmationEmail } from "@/lib/email/order-confirmation";
import {
  fulfillCheckoutSession,
  getOrderForCustomer,
  recordPaymentEvent,
} from "@/lib/queries/checkout";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

/**
 * POST /api/webhooks/stripe
 * The webhook — not the success redirect — creates orders.
 * Excluded from auth middleware; gated by signature verification only.
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // Raw body is required for signature verification — never parse first.
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, secret);
  } catch (error) {
    console.error("Stripe signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    // Audit log (exactly-once rows via unique providerEventId). Deliberately
    // NOT used to gate fulfillment: if handling fails after logging, Stripe's
    // retry must still fulfill. fulfillCheckoutSession is itself idempotent.
    await recordPaymentEvent(event);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status === "paid") {
          const { order, created } = await fulfillCheckoutSession(session);
          if (created) {
            const customerOrder = await getOrderForCustomer({
              stripeSessionId: session.id,
            });
            if (customerOrder) {
              await sendOrderConfirmationEmail(customerOrder);
            }
            console.log(`Order ${order.orderNumber} created for ${session.id}`);
          }
        }
        break;
      }
      case "checkout.session.expired":
      case "checkout.session.async_payment_failed":
        // Logged in PaymentEvent above; nothing to fulfill.
        break;
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`Webhook handling failed for ${event.type}:`, error);
    // 500 → Stripe retries.
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
