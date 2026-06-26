"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import { generateOrderId, saveOrder } from "@/lib/cart/storage";
import type { CheckoutDetails, Order } from "@/lib/cart/types";
import { SHIPPING_COST } from "@/lib/cart/types";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<CheckoutDetails>({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const shipping = items.length > 0 ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="relative py-24 text-center">
        <p className="font-body mb-6 text-white/60">
          Your library is empty. Add books before checkout.
        </p>
        <Button href="/books">Browse Books</Button>
      </div>
    );
  }

  const handleChange = (field: keyof CheckoutDetails, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const order: Order = {
      id: generateOrderId(),
      items: [...items],
      subtotal,
      shipping,
      total,
      customer: form,
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };

    saveOrder(order);
    clearCart();
    router.push(`/order/${order.id}`);
  };

  return (
    <div className="relative py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/cart"
          className="font-nav mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#3AA7FF]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Library
        </Link>

        <h1 className="font-heading mb-10 text-4xl text-white">Checkout</h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="font-heading-secondary mb-4 text-xl text-white">
                Shipping Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="font-nav mb-1 block text-sm text-white/70"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:ring-2 focus:ring-[#3AA7FF]/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="font-nav mb-1 block text-sm text-white/70"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:ring-2 focus:ring-[#3AA7FF]/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="font-nav mb-1 block text-sm text-white/70"
                  >
                    Street Address
                  </label>
                  <input
                    id="address"
                    required
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:ring-2 focus:ring-[#3AA7FF]/50 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="city"
                      className="font-nav mb-1 block text-sm text-white/70"
                    >
                      City
                    </label>
                    <input
                      id="city"
                      required
                      value={form.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:ring-2 focus:ring-[#3AA7FF]/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="font-nav mb-1 block text-sm text-white/70"
                    >
                      State
                    </label>
                    <input
                      id="state"
                      required
                      value={form.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:ring-2 focus:ring-[#3AA7FF]/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="zip"
                      className="font-nav mb-1 block text-sm text-white/70"
                    >
                      ZIP
                    </label>
                    <input
                      id="zip"
                      required
                      value={form.zip}
                      onChange={(e) => handleChange("zip", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:ring-2 focus:ring-[#3AA7FF]/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="font-nav flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 px-8 py-4 font-medium text-white transition-all hover:shadow-lg hover:shadow-[#3AA7FF]/20 disabled:opacity-60"
            >
              <Lock className="h-5 w-5" />
              {submitting ? "Placing Order…" : "Place Order"}
            </button>
            <p className="font-body text-center text-xs text-white/40">
              Secure checkout — mock payment for demo purposes
            </p>
          </form>

          <div className="lg:col-span-2">
            <div className="sticky top-28 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="font-heading-secondary mb-4 text-xl text-white">
                Order Summary
              </h2>
              <ul className="mb-4 space-y-3">
                {items.map((item) => (
                  <li
                    key={item.bookId}
                    className="flex justify-between gap-2 text-sm"
                  >
                    <span className="font-body text-white/70">
                      {item.title}{" "}
                      <span className="text-white/40">×{item.quantity}</span>
                    </span>
                    <span className="font-nav shrink-0 text-white">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between pt-2 text-lg text-white">
                  <span className="font-heading-secondary">Total</span>
                  <span className="font-nav">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
