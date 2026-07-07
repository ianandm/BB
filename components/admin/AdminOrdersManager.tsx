"use client";

import { formatPrice } from "@/lib/utils";

type OrderItem = {
  id: string;
  bookTitle: string;
  quantity: number;
  unitPrice: unknown;
};

type AdminOrder = {
  id: string;
  orderNumber: string;
  status: string;
  customerName: string;
  customerEmail: string;
  totalAmount: unknown;
  createdAt: string;
  items: OrderItem[];
};

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-500/15 text-amber-300",
  PAID: "bg-emerald-500/15 text-emerald-300",
  PROCESSING: "bg-blue-500/15 text-blue-300",
  SHIPPED: "bg-purple-500/15 text-purple-300",
  DELIVERED: "bg-emerald-500/15 text-emerald-300",
  CANCELLED: "bg-red-500/15 text-red-300",
};

export function AdminOrdersManager({ orders }: { orders: AdminOrder[] }) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-white">Orders</h1>
        <p className="mt-1 text-sm text-white/60">
          View customer orders and fulfillment status
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-white/60">
            <tr>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">Items</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-white/50">
                  No orders yet. Orders will appear here after customers checkout.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-4 font-medium text-white">{order.orderNumber}</td>
                  <td className="px-4 py-4">
                    <p className="text-white">{order.customerName}</p>
                    <p className="text-xs text-white/50">{order.customerEmail}</p>
                  </td>
                  <td className="hidden px-4 py-4 text-white/70 md:table-cell">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </td>
                  <td className="px-4 py-4 text-white">
                    {formatPrice(Number(order.totalAmount))}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[order.status] ?? "bg-white/10 text-white/50"}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-white/60">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
