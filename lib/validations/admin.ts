import { z } from "zod";

/**
 * Accepts either a full URL (https://...) or a root-relative path
 * served from /public (e.g. /images/ramayana-cover.jpg).
 */
const imagePathOrUrl = (message: string) =>
  z
    .string()
    .min(1, message)
    .refine(
      (value) =>
        /^\/[^\s]+$/.test(value) || z.string().url().safeParse(value).success,
      message,
    );

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const adminBookSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens")
    .optional(),
  author: z.string().min(1, "Author is required").max(200),
  description: z.string().min(1, "Description is required").max(5000),
  price: z.coerce.number().positive("Price must be greater than 0"),
  coverImageUrl: imagePathOrUrl(
    "Cover image must be a full URL or a path like /images/book.jpg",
  ),
  categoryId: z.string().uuid("Select a category"),
  format: z.enum(["HARDCOVER", "PAPERBACK", "EBOOK", "AUDIOBOOK"]),
  status: z.enum(["ACTIVE", "DRAFT", "ARCHIVED"]).default("ACTIVE"),
  featured: z.boolean().default(false),
  inventoryCount: z.coerce.number().int().min(0).default(0),
  isbn13: z.string().max(13).optional().or(z.literal("")),
});

export const adminBookUpdateSchema = adminBookSchema.partial();

export type AdminBookInput = z.infer<typeof adminBookSchema>;
export type AdminBookUpdateInput = z.infer<typeof adminBookUpdateSchema>;

export const adminCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  description: z.string().max(1000).optional().or(z.literal("")),
  imageUrl: imagePathOrUrl("Use a full URL or /images/... path")
    .optional()
    .or(z.literal("")),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const adminBlogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  excerpt: z.string().max(500).optional().or(z.literal("")),
  body: z.string().min(1, "Body is required"),
  category: z.string().max(100).optional().or(z.literal("")),
  categoryColor: z.string().max(20).optional(),
  readTime: z.string().max(50).optional().or(z.literal("")),
  relatedBook: z.string().max(200).optional().or(z.literal("")),
  coverImageUrl: imagePathOrUrl("Use a full URL or /images/... path")
    .optional()
    .or(z.literal("")),
  featured: z.boolean().default(false),
  status: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]).default("DRAFT"),
});

export type AdminCategoryInput = z.infer<typeof adminCategorySchema>;
export type AdminBlogInput = z.infer<typeof adminBlogSchema>;
