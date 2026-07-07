import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils/slug";
import type { AdminCategoryInput } from "@/lib/validations/admin";

export type AdminCategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  bookCount: number;
};

async function uniqueCategorySlug(base: string, excludeId?: string) {
  let slug = slugify(base);
  let suffix = 0;

  while (true) {
    const candidate = suffix === 0 ? slug : `${slug}-${suffix}`;
    const existing = await prisma.category.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === excludeId) return candidate;
    suffix += 1;
  }
}

function mapCategory(
  category: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    sortOrder: number;
    isActive: boolean;
    _count: { books: number };
  },
): AdminCategoryRow {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    imageUrl: category.imageUrl,
    sortOrder: category.sortOrder,
    isActive: category.isActive,
    bookCount: category._count.books,
  };
}

export async function listCategoriesForAdminPanel() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { books: true } } },
    orderBy: { sortOrder: "asc" },
  });
  return categories.map(mapCategory);
}

export async function createCategoryForAdmin(input: AdminCategoryInput) {
  const slug = await uniqueCategorySlug(input.slug ?? input.name);
  const category = await prisma.category.create({
    data: {
      name: input.name,
      slug,
      description: input.description || null,
      imageUrl: input.imageUrl || null,
      sortOrder: input.sortOrder,
      isActive: input.isActive,
    },
    include: { _count: { select: { books: true } } },
  });
  return mapCategory(category);
}

export async function updateCategoryForAdmin(
  id: string,
  input: Partial<AdminCategoryInput>,
) {
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) return null;

  const slug =
    input.slug || input.name
      ? await uniqueCategorySlug(input.slug ?? input.name ?? existing.name, id)
      : existing.slug;

  const category = await prisma.category.update({
    where: { id },
    data: {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.description !== undefined && { description: input.description || null }),
      ...(input.imageUrl !== undefined && { imageUrl: input.imageUrl || null }),
      ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
      slug,
    },
    include: { _count: { select: { books: true } } },
  });

  return mapCategory(category);
}

export async function setCategoryActiveForAdmin(id: string, isActive: boolean) {
  const category = await prisma.category.update({
    where: { id },
    data: { isActive },
    include: { _count: { select: { books: true } } },
  });
  return mapCategory(category);
}

export async function deleteCategoryForAdmin(id: string) {
  await prisma.category.delete({ where: { id } });
  return { success: true };
}
