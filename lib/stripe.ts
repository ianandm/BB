import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/** Lazy Stripe client so builds without STRIPE_SECRET_KEY don't crash. */
export function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    stripeClient = new Stripe(key, {
      apiVersion: "2026-06-24.dahlia",
    });
  }
  return stripeClient;
}

/** Flat-rate shipping (Phase 1 of shipping strategy). Amounts in cents. */
export const SHIPPING_RATES = {
  freeThreshold: 35_00,
  standard: { label: "Standard Shipping (5-8 business days)", amount: 4_99 },
  expedited: { label: "Expedited Shipping (2-3 business days)", amount: 9_99 },
} as const;
