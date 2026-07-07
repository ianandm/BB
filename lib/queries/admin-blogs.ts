import type { BlogStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils/slug";
import type { AdminBlogInput } from "@/lib/validations/admin";

export type AdminBlogRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  category: string | null;
  categoryColor: string | null;
  readTime: string | null;
  relatedBook: string | null;
  coverImageUrl: string | null;
  featured: boolean;
  status: BlogStatus;
  publishedAt: string | null;
  createdAt: string;
};

async function uniqueBlogSlug(base: string, excludeId?: string) {
  let slug = slugify(base);
  let suffix = 0;

  while (true) {
    const candidate = suffix === 0 ? slug : `${slug}-${suffix}`;
    const existing = await prisma.blog.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === excludeId) return candidate;
    suffix += 1;
  }
}

function mapBlog(blog: {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  category: string | null;
  categoryColor: string | null;
  readTime: string | null;
  relatedBook: string | null;
  coverImageUrl: string | null;
  featured: boolean;
  status: BlogStatus;
  publishedAt: Date | null;
  createdAt: Date;
}): AdminBlogRow {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    body: blog.body,
    category: blog.category,
    categoryColor: blog.categoryColor,
    readTime: blog.readTime,
    relatedBook: blog.relatedBook,
    coverImageUrl: blog.coverImageUrl,
    featured: blog.featured,
    status: blog.status,
    publishedAt: blog.publishedAt?.toISOString() ?? null,
    createdAt: blog.createdAt.toISOString(),
  };
}

export async function listBlogsForAdmin() {
  const blogs = await prisma.blog.findMany({ orderBy: { updatedAt: "desc" } });
  return blogs.map(mapBlog);
}

export async function createBlogForAdmin(input: AdminBlogInput) {
  const slug = await uniqueBlogSlug(input.slug ?? input.title);
  const blog = await prisma.blog.create({
    data: {
      title: input.title,
      slug,
      excerpt: input.excerpt || null,
      body: input.body,
      category: input.category || null,
      categoryColor: input.categoryColor ?? "#3AA7FF",
      readTime: input.readTime || null,
      relatedBook: input.relatedBook || null,
      coverImageUrl: input.coverImageUrl || null,
      featured: input.featured,
      status: input.status,
      publishedAt: input.status === "PUBLISHED" ? new Date() : null,
    },
  });
  return mapBlog(blog);
}

export async function updateBlogForAdmin(id: string, input: Partial<AdminBlogInput>) {
  const existing = await prisma.blog.findUnique({ where: { id } });
  if (!existing) return null;

  const slug =
    input.slug || input.title
      ? await uniqueBlogSlug(input.slug ?? input.title ?? existing.title, id)
      : existing.slug;

  const blog = await prisma.blog.update({
    where: { id },
    data: {
      ...(input.title !== undefined && { title: input.title }),
      ...(input.excerpt !== undefined && { excerpt: input.excerpt || null }),
      ...(input.body !== undefined && { body: input.body }),
      ...(input.category !== undefined && { category: input.category || null }),
      ...(input.categoryColor !== undefined && { categoryColor: input.categoryColor }),
      ...(input.readTime !== undefined && { readTime: input.readTime || null }),
      ...(input.relatedBook !== undefined && { relatedBook: input.relatedBook || null }),
      ...(input.coverImageUrl !== undefined && { coverImageUrl: input.coverImageUrl || null }),
      ...(input.featured !== undefined && { featured: input.featured }),
      ...(input.status !== undefined && {
        status: input.status,
        publishedAt:
          input.status === "PUBLISHED" && !existing.publishedAt
            ? new Date()
            : existing.publishedAt,
      }),
      slug,
    },
  });

  return mapBlog(blog);
}

export async function setBlogStatusForAdmin(id: string, status: BlogStatus) {
  const blog = await prisma.blog.update({
    where: { id },
    data: {
      status,
      publishedAt: status === "PUBLISHED" ? new Date() : undefined,
    },
  });
  return mapBlog(blog);
}

export async function deleteBlogForAdmin(id: string) {
  await prisma.blog.delete({ where: { id } });
  return { success: true };
}
