"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";

const STATUS_OPTIONS = [
  "PAID",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

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
  const [rows, setRows] = useState<AdminOrder[]>(orders);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const changeStatus = async (orderId: string, status: string) => {
    setSavingId(orderId);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Update failed");
      }
      setRows((prev) =>
        prev.map((row) => (row.id === orderId ? { ...row, status } : row)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-white">Orders</h1>
        <p className="mt-1 text-sm text-white/60">
          View customer orders and update fulfillment status
        </p>
        {error && (
          <p className="mt-3 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm text-red-300">
            {error}
          </p>
        )}
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
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-white/50">
                  No orders yet. Orders will appear here after customers checkout.
                </td>
              </tr>
            ) : (
              rows.map((order) => (
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
                    {order.status === "PENDING" ? (
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[order.status] ?? "bg-white/10 text-white/50"}`}
                      >
                        {order.status}
                      </span>
                    ) : (
                      <select
                        value={order.status}
                        disabled={savingId === order.id}
                        onChange={(e) => changeStatus(order.id, e.target.value)}
                        className={`cursor-pointer rounded-full border-0 px-2.5 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 disabled:opacity-50 ${statusStyles[order.status] ?? "bg-white/10 text-white/50"}`}
                        style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option} value={option} className="bg-[#0A0E27] text-white">
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
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
