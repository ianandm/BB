"use client";

import { ArrowRight } from "lucide-react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Button } from "@/components/ui/Button";
import { getBookBySlug } from "@/lib/data/catalog";

const FEATURED_SLUG = "bhagavad-gita-as-it-is";

export function FeaturedStoryActions() {
  const book = getBookBySlug(FEATURED_SLUG);
  if (!book) return null;

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <AddToCartButton book={book} variant="full" label="Purchase Book" />
      <Button href={`/books/${FEATURED_SLUG}`} variant="secondary">
        Read More
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
