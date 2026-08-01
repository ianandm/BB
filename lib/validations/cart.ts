import { z } from "zod";

/**
 * A cart item is identified by its database id when available, or by slug
 * for items added from statically-rendered pages. At least one is required.
 */
export const cartSyncItemSchema = z
  .object({
    bookId: z.string().uuid().optional(),
    slug: z.string().min(1).max(200).optional(),
    quantity: z.coerce.number().int().min(1).max(99),
  })
  .refine((item) => Boolean(item.bookId || item.slug), {
    message: "Each item needs a bookId or a slug",
  });

export const cartSyncSchema = z.object({
  items: z.array(cartSyncItemSchema).max(100),
});

export type CartSyncInput = z.infer<typeof cartSyncSchema>;
