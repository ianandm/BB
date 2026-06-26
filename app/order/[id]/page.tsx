"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getOrderById } from "@/lib/cart/storage";
import type { Order } from "@/lib/cart/types";
import { formatPrice } from "@/lib/utils";

export default function OrderConfirmationPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (params.id) {
      setOrder(getOrderById(params.id) ?? null);
    }
  }, [params.id]);

  if (order === null) {
    return (
      <div className="relative py-24 text-center">
        <p className="font-body text-white/60">Loading order…</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="relative py-24 text-center">
        <h1 className="font-heading mb-4 text-3xl text-white">
          Order Not Found
        </h1>
        <p className="font-body mb-8 text-white/60">
          We couldn&apos;t find an order with that ID.
        </p>
        <Button href="/books">Browse Books</Button>
      </div>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex rounded-full bg-[#3AA7FF]/20 p-4">
            <CheckCircle className="h-10 w-10 text-[#3AA7FF]" />
          </div>
          <h1 className="font-heading mb-2 text-4xl text-white">
            Order Confirmed
          </h1>
          <p className="font-body text-white/60">
            Thank you, {order.customer.name}. Your wisdom is on its way.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-[#F5B84B]" />
            <span className="font-nav text-sm text-white/60">Order ID</span>
          </div>
          <p className="font-nav mb-1 text-xl text-white">{order.id}</p>
          <p className="font-body text-sm text-white/50">{orderDate}</p>
        </div>

        <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-heading-secondary mb-4 text-lg text-white">
            Items Ordered
          </h2>
          <ul className="space-y-4">
            {order.items.map((item) => (
              <li key={item.bookId} className="flex items-center gap-4">
                <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-heading-secondary text-white">
                    {item.title}
                  </p>
                  <p className="font-body text-sm text-white/60">
                    Qty {item.quantity} · {formatPrice(item.price)} each
                  </p>
                </div>
                <span className="font-nav text-white">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between text-white/70">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Shipping</span>
              <span>{formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-lg text-white">
              <span className="font-heading-secondary">Total</span>
              <span className="font-nav">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-heading-secondary mb-2 text-lg text-white">
            Shipping To
          </h2>
          <p className="font-body text-white/70">
            {order.customer.name}
            <br />
            {order.customer.address}
            <br />
            {order.customer.city}, {order.customer.state} {order.customer.zip}
            <br />
            {order.customer.email}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/books" className="flex-1">
            Continue Exploring
          </Button>
          <Button href="/" variant="secondary" className="flex-1">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
