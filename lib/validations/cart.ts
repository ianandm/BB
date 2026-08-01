import { z } from "zod";

export const cartSyncItemSchema = z.object({
  bookId: z.string().uuid(),
  quantity: z.coerce.number().int().min(1).max(99),
});

export const cartSyncSchema = z.object({
  items: z.array(cartSyncItemSchema).max(100),
});

export type CartSyncInput = z.infer<typeof cartSyncSchema>;
