import { revalidatePath } from "next/cache";

/**
 * Purge the static cache for storefront pages that render book data,
 * so admin changes appear on the live site immediately.
 * Call after any successful book or category mutation.
 */
export function revalidateBookPages() {
  revalidatePath("/");
  revalidatePath("/books");
}
