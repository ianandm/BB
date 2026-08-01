import { AdminCategoriesManager } from "@/components/admin/AdminCategoriesManager";
import { listCategoriesForAdminPanel } from "@/lib/queries/admin-categories";

export const metadata = { title: "Categories" };

// Admin data must always reflect the live database.
export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await listCategoriesForAdminPanel();
  return <AdminCategoriesManager initialCategories={JSON.parse(JSON.stringify(categories))} />;
}
