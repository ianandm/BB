"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Book } from "@/lib/data/catalog";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { useCart } from "@/components/cart/CartProvider";

type BookPurchaseActionsProps = {
  book: Book;
};

export function BookPurchaseActions({ book }: BookPurchaseActionsProps) {
  const { isInCart } = useCart();
  const inCart = isInCart(book.id);

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <AddToCartButton
        book={book}
        variant="full"
        label={inCart ? "Add Another Copy" : "Purchase Book"}
      />
      {inCart && (
        <Link
          href="/checkout"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-nav font-medium text-white/90 transition-all hover:bg-white/10"
        >
          <ShoppingCart className="h-5 w-5" />
          Go to Checkout
        </Link>
      )}
    </div>
  );
}
