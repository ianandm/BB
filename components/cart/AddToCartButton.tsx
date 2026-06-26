"use client";

import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Book } from "@/lib/data/catalog";
import { useCart } from "@/components/cart/CartProvider";

type AddToCartButtonProps = {
  book: Book;
  variant?: "icon" | "full";
  className?: string;
  label?: string;
};

export function AddToCartButton({
  book,
  variant = "icon",
  className,
  label = "Add to Cart",
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={() => addItem(book)}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 px-8 py-4 font-nav font-medium text-white transition-all hover:shadow-lg hover:shadow-[#3AA7FF]/20",
          className,
        )}
      >
        <ShoppingCart className="h-5 w-5" />
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(book);
      }}
      className={cn(
        "rounded-full bg-[#3AA7FF] p-2 transition-colors hover:bg-[#3AA7FF]/80",
        className,
      )}
      aria-label={`Add ${book.title} to cart`}
    >
      <ShoppingCart className="h-4 w-4 text-white" />
    </button>
  );
}
