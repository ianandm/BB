import { AdminBooksManager } from "@/components/admin/AdminBooksManager";
import {
  listAllBooksForAdmin,
  listCategoriesForAdmin,
} from "@/lib/queries/admin-books";

export const metadata = {
  title: "Manage Books",
};

// Admin data must always reflect the live database.
export const dynamic = "force-dynamic";

export default async function AdminBooksPage() {
  const [books, categories] = await Promise.all([
    listAllBooksForAdmin(),
    listCategoriesForAdmin(),
  ]);

  return <AdminBooksManager initialBooks={books} categories={categories} />;
}
