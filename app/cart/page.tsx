"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import { SHIPPING_COST } from "@/lib/cart/types";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();
  const total = subtotal + (items.length > 0 ? SHIPPING_COST : 0);

  if (itemCount === 0) {
    return (
      <div className="relative py-24">
        <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
          <div className="mb-6 inline-flex rounded-full bg-white/5 p-4">
            <ShoppingBag className="h-10 w-10 text-[#3AA7FF]" />
          </div>
          <h1 className="font-heading mb-4 text-4xl text-white">
            Your Library is Empty
          </h1>
          <p className="font-body mb-8 text-white/60">
            One step closer to timeless wisdom — add books to begin your journey.
          </p>
          <Button href="/books">Explore the Library</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading mb-2 text-4xl text-white">Your Library</h1>
        <p className="font-body mb-10 text-white/60">
          {itemCount} {itemCount === 1 ? "book" : "books"} ready for checkout
        </p>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.bookId}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:gap-6 sm:p-6"
            >
              <Link
                href={`/books/${item.slug}`}
                className="relative h-28 w-20 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-24"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/books/${item.slug}`}
                    className="font-heading-secondary text-lg text-white hover:text-[#3AA7FF]"
                  >
                    {item.title}
                  </Link>
                  <p className="font-body text-sm text-white/60">
                    by {item.author}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.bookId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="rounded-full border border-white/10 p-1.5 text-white/70 transition-colors hover:bg-white/10 disabled:opacity-40"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-nav w-8 text-center text-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.bookId, item.quantity + 1)
                      }
                      className="rounded-full border border-white/10 p-1.5 text-white/70 transition-colors hover:bg-white/10"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-nav text-lg text-white">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.bookId)}
                      className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-red-400"
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="space-y-3">
            <div className="flex justify-between text-white/70">
              <span className="font-body">Subtotal</span>
              <span className="font-nav">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span className="font-body">Shipping</span>
              <span className="font-nav">{formatPrice(SHIPPING_COST)}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-3 text-white">
              <span className="font-heading-secondary text-lg">Total</span>
              <span className="font-nav text-xl">{formatPrice(total)}</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/checkout" className="flex-1">
              Proceed to Checkout
            </Button>
            <Button href="/books" variant="secondary" className="flex-1">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
