"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { CheckCircle2, Loader2, Mail, Package, Search } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/utils";

type CustomerOrderItem = {
  title: string;
  author: string;
  quantity: number;
  totalPrice: number;
};

type CustomerOrder = {
  orderNumber: string;
  status: string;
  customerName: string;
  customerEmail: string;
  subtotalAmount: number;
  shippingAmount: number;
  totalAmount: number;
  items: CustomerOrderItem[];
};

const POLL_INTERVAL_MS = 2000;
const MAX_POLLS = 15; // ~30s before showing the fallback

export function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  const [order, setOrder] = useState<CustomerOrder | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const pollsRef = useRef(0);
  const clearedRef = useRef(false);

  const fetchOrder = useCallback(async () => {
    if (!sessionId) return null;
    try {
      const res = await fetch(
        `/api/orders/confirmation?session_id=${encodeURIComponent(sessionId)}`,
        { cache: "no-store" },
      );
      if (!res.ok) return null;
      const data = (await res.json()) as { order: CustomerOrder | null };
      return data.order;
    } catch {
      return null;
    }
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;

    const poll = async () => {
      const found = await fetchOrder();
      if (cancelled) return;

      if (found) {
        setOrder(found);
        if (!clearedRef.current) {
          clearedRef.current = true;
          clearCart();
        }
        return;
      }

      pollsRef.current += 1;
      if (pollsRef.current >= MAX_POLLS) {
        setTimedOut(true);
        return;
      }
      setTimeout(poll, POLL_INTERVAL_MS);
    };

    poll();
    return () => {
      cancelled = true;
    };
  }, [sessionId, fetchOrder, clearCart]);

  if (!sessionId) {
    return (
      <CenteredShell>
        <p className="text-white/70">
          Missing order reference. If you just paid, check your email for the
          confirmation, or{" "}
          <Link href="/orders/lookup" className="text-[#3AA7FF] hover:underline">
            look up your order
          </Link>
          .
        </p>
      </CenteredShell>
    );
  }

  if (!order && !timedOut) {
    return (
      <CenteredShell>
        <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-[#3AA7FF]" />
        <h1
          className="mb-2 text-3xl text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Finalizing your order…
        </h1>
        <p className="text-white/60">
          Your payment succeeded — we&apos;re writing everything down. This
          usually takes a few seconds.
        </p>
      </CenteredShell>
    );
  }

  if (!order && timedOut) {
    return (
      <CenteredShell>
        <Mail className="mx-auto mb-4 h-10 w-10 text-[#F5B84B]" />
        <h1
          className="mb-2 text-3xl text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Your payment went through
        </h1>
        <p className="mx-auto mb-6 max-w-md text-white/60">
          The order is taking a little longer than usual to record. You&apos;ll
          receive a confirmation email with your order number shortly — no
          action needed and you have not been charged twice.
        </p>
        <Link
          href="/orders/lookup"
          className="inline-flex items-center gap-2 rounded-full bg-[#3AA7FF]/20 px-6 py-3 text-[#3AA7FF] transition-all hover:bg-[#3AA7FF]/30"
        >
          <Search className="h-4 w-4" /> Look up my order
        </Link>
      </CenteredShell>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-emerald-400" />
          <h1
            className="mb-2 text-4xl text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Order confirmed
          </h1>
          <p className="text-white/60">
            Thank you, {order!.customerName}. A confirmation email is on its way
            to {order!.customerEmail}.
          </p>
          <p className="mt-4 inline-block rounded-full border border-[#F5B84B]/40 bg-[#F5B84B]/10 px-5 py-2 text-lg text-[#F5B84B]">
            {order!.orderNumber}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >
          <h2
            className="mb-6 flex items-center gap-2 text-xl text-white"
            style={{ fontFamily: "var(--font-heading-secondary)" }}
          >
            <Package className="h-5 w-5 text-[#3AA7FF]" /> Order summary
          </h2>
          <ul className="mb-6 space-y-3">
            {order!.items.map((item, index) => (
              <li
                key={index}
                className="flex items-baseline justify-between gap-4 text-sm"
              >
                <span className="text-white">
                  {item.title}
                  <span className="text-white/50"> × {item.quantity}</span>
                </span>
                <span className="text-white">{formatPrice(item.totalPrice)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between text-white/60">
              <span>Subtotal</span>
              <span>{formatPrice(order!.subtotalAmount)}</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Shipping</span>
              <span>
                {order!.shippingAmount === 0
                  ? "Free"
                  : formatPrice(order!.shippingAmount)}
              </span>
            </div>
            <div className="flex justify-between pt-2 text-lg text-[#F5B84B]">
              <span>Total</span>
              <span>{formatPrice(order!.totalAmount)}</span>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <Link
            href="/books"
            className="text-[#3AA7FF] hover:underline"
            style={{ fontFamily: "var(--font-nav)" }}
          >
            Continue exploring books →
          </Link>
        </div>
      </div>
    </div>
  );
}

function CenteredShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
