import { prisma } from "@/lib/prisma";
import { bookListInclude, mapBookToCatalog } from "@/lib/queries/mappers";

export async function getFeaturedBooks(limit = 4) {
  const books = await prisma.book.findMany({
    where: { featured: true, status: "ACTIVE" },
    include: bookListInclude,
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return books.map(mapBookToCatalog);
}

export async function getBooksByCategorySlug(
  categorySlug: string,
  options?: { limit?: number; offset?: number },
) {
  const books = await prisma.book.findMany({
    where: {
      status: "ACTIVE",
      categories: { some: { category: { slug: categorySlug } } },
    },
    include: bookListInclude,
    orderBy: { title: "asc" },
    take: options?.limit,
    skip: options?.offset,
  });

  return books.map(mapBookToCatalog);
}

export async function getBookBySlug(slug: string) {
  const book = await prisma.book.findUnique({
    where: { slug, status: "ACTIVE" },
    include: {
      ...bookListInclude,
      images: { orderBy: { sortOrder: "asc" } },
      publisher: true,
    },
  });

  if (!book) return null;

  return {
    ...mapBookToCatalog(book),
    subtitle: book.subtitle,
    isbn10: book.isbn10,
    isbn13: book.isbn13,
    pageCount: book.pageCount,
    language: book.language,
    compareAtPrice: book.compareAtPrice
      ? Number(book.compareAtPrice)
      : null,
    images: book.images,
    publisher: book.publisher?.name ?? null,
    longDescription: book.description,
  };
}

export async function searchBooks(query: string, limit = 20) {
  const books = await prisma.book.findMany({
    where: {
      status: "ACTIVE",
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { subtitle: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { isbn10: { contains: query, mode: "insensitive" } },
        { isbn13: { contains: query, mode: "insensitive" } },
        {
          authors: {
            some: {
              author: { name: { contains: query, mode: "insensitive" } },
            },
          },
        },
      ],
    },
    include: bookListInclude,
    take: limit,
    orderBy: { averageRating: "desc" },
  });

  return books.map(mapBookToCatalog);
}

export async function listActiveBooks(options?: {
  limit?: number;
  offset?: number;
  sort?: "price_asc" | "price_desc" | "newest" | "rating";
}) {
  const orderBy =
    options?.sort === "price_asc"
      ? { price: "asc" as const }
      : options?.sort === "price_desc"
        ? { price: "desc" as const }
        : options?.sort === "rating"
          ? { averageRating: "desc" as const }
          : { createdAt: "desc" as const };

  const books = await prisma.book.findMany({
    where: { status: "ACTIVE" },
    include: bookListInclude,
    orderBy,
    take: options?.limit,
    skip: options?.offset,
  });

  return books.map(mapBookToCatalog);
}

export async function getActiveCategories() {
  return prisma.category.findMany({
    where: { isActive: true, parentCategoryId: null },
    include: {
      children: { where: { isActive: true }, orderBy: { sortOrder: "asc" } },
      _count: { select: { books: true } },
    },
    orderBy: { sortOrder: "asc" },
  });
}
