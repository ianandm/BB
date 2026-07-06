import type { BookFormat, Prisma } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

export type CatalogBook = {
  id: string;
  slug: string;
  title: string;
  author: string;
  authors: string[];
  price: number;
  priceDisplay: string;
  description: string;
  image: string;
  category: string;
  categorySlug: string;
  categories: { name: string; slug: string }[];
  format: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  inStock: boolean;
  insight?: string;
};

export const bookListInclude = {
  authors: {
    include: { author: true },
    orderBy: { authorOrder: "asc" as const },
  },
  categories: { include: { category: true } },
  inventory: true,
} satisfies Prisma.BookInclude;

export type BookWithRelations = Prisma.BookGetPayload<{
  include: typeof bookListInclude;
}>;

const formatLabels: Record<BookFormat, string> = {
  HARDCOVER: "Hardcover",
  PAPERBACK: "Paperback",
  EBOOK: "Ebook",
  AUDIOBOOK: "Audiobook",
};

export function mapBookToCatalog(book: BookWithRelations): CatalogBook {
  const authors = book.authors.map((a) => a.author.name);
  const primaryCategory = book.categories[0]?.category;

  return {
    id: book.id,
    slug: book.slug,
    title: book.title,
    author: authors.join(", ") || "Unknown",
    authors,
    price: Number(book.price),
    priceDisplay: formatPrice(Number(book.price)),
    description: book.description,
    image: book.coverImageUrl,
    category: primaryCategory?.name ?? "General",
    categorySlug: primaryCategory?.slug ?? "general",
    categories: book.categories.map((c) => ({
      name: c.category.name,
      slug: c.category.slug,
    })),
    format: formatLabels[book.format],
    rating: Number(book.averageRating),
    reviewCount: book.reviewCount,
    featured: book.featured,
    inStock:
      (book.inventory?.quantityAvailable ?? 0) -
        (book.inventory?.quantityReserved ?? 0) >
      0,
  };
}
