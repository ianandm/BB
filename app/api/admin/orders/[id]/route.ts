import { NextResponse } from "next/server";
import { z } from "zod";
import { updateOrderStatus } from "@/lib/queries/orders";

export const runtime = "nodejs";

const statusUpdateSchema = z.object({
  status: z.enum(["PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]),
  note: z.string().max(500).optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const parsed = statusUpdateSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const [order] = await updateOrderStatus(
      id,
      parsed.data.status,
      undefined,
      parsed.data.note ?? "Status updated from admin",
    );

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Admin order status update error:", error);
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 },
    );
  }
}
