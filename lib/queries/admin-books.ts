import type { BookStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { bookListInclude } from "@/lib/queries/mappers";
import { slugify } from "@/lib/utils/slug";
import type { AdminBookInput, AdminBookUpdateInput } from "@/lib/validations/admin";

export type AdminBookRow = {
  id: string;
  title: string;
  slug: string;
  author: string;
  description: string;
  price: number;
  coverImageUrl: string;
  format: string;
  status: BookStatus;
  featured: boolean;
  inventoryCount: number;
  category: string;
  categoryId: string;
  createdAt: string;
};

function mapAdminBook(
  book: Prisma.BookGetPayload<{ include: typeof bookListInclude }>,
): AdminBookRow {
  const primaryAuthor = book.authors[0]?.author.name ?? "Unknown";
  const primaryCategory = book.categories[0]?.category;

  return {
    id: book.id,
    title: book.title,
    slug: book.slug,
    author: primaryAuthor,
    description: book.description,
    price: Number(book.price),
    coverImageUrl: book.coverImageUrl,
    format: book.format,
    status: book.status,
    featured: book.featured,
    inventoryCount: book.inventory?.quantityAvailable ?? 0,
    category: primaryCategory?.name ?? "—",
    categoryId: primaryCategory?.id ?? "",
    createdAt: book.createdAt.toISOString(),
  };
}

export async function listAllBooksForAdmin() {
  const books = await prisma.book.findMany({
    include: bookListInclude,
    orderBy: { updatedAt: "desc" },
  });

  return books.map(mapAdminBook);
}

export async function listCategoriesForAdmin() {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true, slug: true },
  });
}

async function findOrCreateAuthor(name: string) {
  const slug = slugify(name);
  const existing = await prisma.author.findUnique({ where: { slug } });
  if (existing) return existing;

  return prisma.author.create({
    data: { name, slug },
  });
}

async function uniqueBookSlug(base: string, excludeId?: string) {
  let slug = slugify(base);
  let suffix = 0;

  while (true) {
    const candidate = suffix === 0 ? slug : `${slug}-${suffix}`;
    const existing = await prisma.book.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === excludeId) return candidate;
    suffix += 1;
  }
}

export async function createBookForAdmin(input: AdminBookInput) {
  const slug = await uniqueBookSlug(input.slug ?? input.title);
  const author = await findOrCreateAuthor(input.author);
  const sku = `BB-${slug.toUpperCase().slice(0, 12)}-${Date.now().toString(36)}`;

  return prisma.$transaction(async (tx) => {
    const book = await tx.book.create({
      data: {
        title: input.title,
        slug,
        description: input.description,
        price: input.price,
        coverImageUrl: input.coverImageUrl,
        format: input.format,
        status: input.status,
        featured: input.featured,
        isbn13: input.isbn13 || null,
        language: "en",
        authors: {
          create: { authorId: author.id, authorOrder: 0 },
        },
        categories: {
          create: { categoryId: input.categoryId },
        },
        inventory: {
          create: {
            quantityAvailable: input.inventoryCount,
            quantityReserved: 0,
            reorderThreshold: 5,
            sku,
          },
        },
        images: {
          create: {
            imageUrl: input.coverImageUrl,
            altText: `${input.title} cover`,
            sortOrder: 0,
            isPrimary: true,
          },
        },
      },
      include: bookListInclude,
    });

    return mapAdminBook(book);
  });
}

export async function updateBookForAdmin(id: string, input: AdminBookUpdateInput) {
  const existing = await prisma.book.findUnique({
    where: { id },
    include: { authors: true, categories: true },
  });

  if (!existing) return null;

  const slug =
    input.slug || input.title
      ? await uniqueBookSlug(input.slug ?? input.title ?? existing.title, id)
      : existing.slug;

  return prisma.$transaction(async (tx) => {
    if (input.author) {
      const author = await findOrCreateAuthor(input.author);
      await tx.bookAuthor.deleteMany({ where: { bookId: id } });
      await tx.bookAuthor.create({
        data: { bookId: id, authorId: author.id, authorOrder: 0 },
      });
    }

    if (input.categoryId) {
      await tx.bookCategory.deleteMany({ where: { bookId: id } });
      await tx.bookCategory.create({
        data: { bookId: id, categoryId: input.categoryId },
      });
    }

    if (input.inventoryCount !== undefined) {
      await tx.inventory.upsert({
        where: { bookId: id },
        update: { quantityAvailable: input.inventoryCount },
        create: {
          bookId: id,
          quantityAvailable: input.inventoryCount,
          quantityReserved: 0,
          reorderThreshold: 5,
          sku: `BB-${slug.toUpperCase().slice(0, 12)}`,
        },
      });
    }

    const book = await tx.book.update({
      where: { id },
      data: {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.price !== undefined && { price: input.price }),
        ...(input.coverImageUrl !== undefined && { coverImageUrl: input.coverImageUrl }),
        ...(input.format !== undefined && { format: input.format }),
        ...(input.status !== undefined && { status: input.status }),
        ...(input.featured !== undefined && { featured: input.featured }),
        ...(input.isbn13 !== undefined && { isbn13: input.isbn13 || null }),
        slug,
      },
      include: bookListInclude,
    });

    return mapAdminBook(book);
  });
}

export async function setBookStatusForAdmin(id: string, status: BookStatus) {
  const book = await prisma.book.update({
    where: { id },
    data: { status },
    include: bookListInclude,
  });

  return mapAdminBook(book);
}

export async function deleteBookForAdmin(id: string) {
  await prisma.book.delete({ where: { id } });
  return { success: true };
}
