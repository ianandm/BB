import type { OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getUserOrderHistory(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: true,
      shipments: true,
      payments: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAdminOrders(filters?: {
  status?: OrderStatus;
  limit?: number;
  offset?: number;
}) {
  return prisma.order.findMany({
    where: filters?.status ? { status: filters.status } : undefined,
    include: {
      user: { select: { id: true, email: true, firstName: true, lastName: true } },
      items: true,
      payments: true,
    },
    orderBy: { createdAt: "desc" },
    take: filters?.limit ?? 50,
    skip: filters?.offset,
  });
}

export async function getOrderByNumber(orderNumber: string) {
  return prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: true,
      payments: true,
      shipments: { include: { items: true } },
      statusHistory: { orderBy: { createdAt: "desc" } },
      returnRequests: { include: { items: true } },
    },
  });
}

export async function updateOrderStatus(
  orderId: string,
  toStatus: OrderStatus,
  changedByUserId?: string,
  note?: string,
) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("Order not found");

  return prisma.$transaction([
    prisma.order.update({
      where: { id: orderId },
      data: { status: toStatus },
    }),
    prisma.orderStatusHistory.create({
      data: {
        orderId,
        fromStatus: order.status,
        toStatus,
        changedByUserId,
        note,
      },
    }),
  ]);
}
