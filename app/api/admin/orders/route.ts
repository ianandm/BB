import { NextResponse } from "next/server";
import { getAdminOrders } from "@/lib/queries/orders";

export const runtime = "nodejs";

export async function GET() {
  try {
    const orders = await getAdminOrders({ limit: 100 });
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Admin orders list error:", error);
    return NextResponse.json({ error: "Failed to load orders" }, { status: 500 });
  }
}
