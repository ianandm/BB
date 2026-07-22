import { NextResponse } from "next/server";
import { getOrderForCustomer } from "@/lib/queries/checkout";

export const runtime = "nodejs";

/**
 * GET /api/orders/confirmation?session_id=cs_...
 * Returns the order for a Stripe session id. The session id is a
 * high-entropy secret known only to the payer, so it is sufficient
 * authorization for this read.
 */
export async function GET(request: Request) {
  try {
    const sessionId = new URL(request.url).searchParams.get("session_id");
    if (!sessionId || !sessionId.startsWith("cs_")) {
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }
    const order = await getOrderForCustomer({ stripeSessionId: sessionId });
    // null → webhook hasn't landed yet; client polls.
    return NextResponse.json({ order });
  } catch (error) {
    console.error("Order confirmation lookup error:", error);
    return NextResponse.json({ error: "Lookup failed" }, { status: 500 });
  }
}
