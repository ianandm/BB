import { NextResponse } from "next/server";
import { z } from "zod";
import { getOrderForCustomer } from "@/lib/queries/checkout";

export const runtime = "nodejs";

const lookupSchema = z.object({
  orderNumber: z
    .string()
    .trim()
    .regex(/^BB-\d{4}-\d{5,8}$/i, "Enter your order number (e.g. BB-2026-01234)"),
  email: z.string().trim().email("Enter the email used at checkout"),
});

/** POST /api/orders/lookup — order details only when number AND email match. */
export async function POST(request: Request) {
  try {
    const parsed = lookupSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const order = await getOrderForCustomer({
      orderNumber: parsed.data.orderNumber.toUpperCase(),
      email: parsed.data.email,
    });

    if (!order) {
      // Same message whether the number or the email was wrong.
      return NextResponse.json(
        { error: "No order found for that order number and email." },
        { status: 404 },
      );
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Order lookup error:", error);
    return NextResponse.json({ error: "Lookup failed" }, { status: 500 });
  }
}
