import type { ReturnReason } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type ReturnItemInput = {
  orderItemId: string;
  quantity: number;
  refundAmount: number;
};

export async function createReturnRequest(input: {
  orderId: string;
  userId?: string;
  reason: ReturnReason;
  customerNote?: string;
  items: ReturnItemInput[];
}) {
  const order = await prisma.order.findUnique({
    where: { id: input.orderId },
    include: { items: true },
  });

  if (!order) throw new Error("Order not found");

  const returnNumber = `RET-${Date.now()}`;

  return prisma.returnRequest.create({
    data: {
      orderId: input.orderId,
      userId: input.userId,
      returnNumber,
      reason: input.reason,
      customerNote: input.customerNote,
      items: {
        create: input.items.map((item) => ({
          orderItemId: item.orderItemId,
          quantity: item.quantity,
          refundAmount: item.refundAmount,
        })),
      },
    },
    include: { items: true },
  });
}

export async function getReturnRequestByNumber(returnNumber: string) {
  return prisma.returnRequest.findUnique({
    where: { returnNumber },
    include: {
      items: { include: { orderItem: true } },
      order: true,
      refunds: true,
    },
  });
}
