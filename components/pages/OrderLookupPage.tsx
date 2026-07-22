"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Loader2, Mail, Package, Search } from "lucide-react";
import { formatPrice } from "@/lib/utils";

type CustomerOrder = {
  orderNumber: string;
  status: string;
  placedAt: string | null;
  customerName: string;
  subtotalAmount: number;
  shippingAmount: number;
  totalAmount: number;
  shippingAddress: Record<string, string | null>;
  items: {
    title: string;
    author: string;
    quantity: number;
    totalPrice: number;
  }[];
  history: { status: string; at: string }[];
};

const statusLabels: Record<string, string> = {
  PAID: "Payment received",
  PROCESSING: "Being prepared",
  SHIPPED: "On its way",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export function OrderLookupPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<CustomerOrder | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      const res = await fetch("/api/orders/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data.details?.fieldErrors
            ? Object.values(data.details.fieldErrors as Record<string, string[]>)
                .flat()
                .join(" ")
            : data.error ?? "Lookup failed. Please try again.",
        );
      } else {
        setOrder(data.order as CustomerOrder);
      }
    } catch {
      setError("Unable to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h1
            className="mb-3 text-4xl text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Find your order
          </h1>
          <p className="text-white/60" style={{ fontFamily: "var(--font-body)" }}>
            Enter your order number and the email you used at checkout
          </p>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >
          <div>
            <label className="mb-2 block text-sm text-white/80">
              Order number
            </label>
            <div className="relative">
              <Package className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="BB-2026-01234"
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-white/40 transition-all focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm text-white/80">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-white/40 transition-all focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 px-6 py-4 text-white transition-all hover:shadow-lg hover:shadow-[#3AA7FF]/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            <span style={{ fontFamily: "var(--font-nav)" }}>
              {loading ? "Searching…" : "Find my order"}
            </span>
          </button>
        </form>

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2
                className="text-xl text-white"
                style={{ fontFamily: "var(--font-heading-secondary)" }}
              >
                {order.orderNumber}
              </h2>
              <span className="rounded-full bg-[#3AA7FF]/15 px-4 py-1.5 text-sm text-[#3AA7FF]">
                {statusLabels[order.status] ?? order.status}
              </span>
            </div>

            <ul className="mb-6 space-y-3">
              {order.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-baseline justify-between gap-4 text-sm"
                >
                  <span className="text-white">
                    {item.title}
                    <span className="text-white/50"> × {item.quantity}</span>
                  </span>
                  <span className="text-white">
                    {formatPrice(item.totalPrice)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotalAmount)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Shipping</span>
                <span>
                  {order.shippingAmount === 0
                    ? "Free"
                    : formatPrice(order.shippingAmount)}
                </span>
              </div>
              <div className="flex justify-between pt-2 text-lg text-[#F5B84B]">
                <span>Total</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
            </div>

            {order.shippingAddress && (
              <div className="mt-6 border-t border-white/10 pt-4 text-sm text-white/60">
                <p className="mb-1 text-white/40">Shipping to</p>
                <p className="text-white">
                  {order.shippingAddress.name} — {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state} {order.shippingAddress.zip}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
