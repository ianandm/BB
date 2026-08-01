import { AdminBlogsManager } from "@/components/admin/AdminBlogsManager";
import { listBlogsForAdmin } from "@/lib/queries/admin-blogs";

export const metadata = { title: "Blogs" };

// Admin data must always reflect the live database.
export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const blogs = await listBlogsForAdmin();
  return <AdminBlogsManager initialBlogs={JSON.parse(JSON.stringify(blogs))} />;
}
