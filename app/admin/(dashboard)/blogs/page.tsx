import { AdminBlogsManager } from "@/components/admin/AdminBlogsManager";
import { listBlogsForAdmin } from "@/lib/queries/admin-blogs";

export const metadata = { title: "Blogs" };

export default async function AdminBlogsPage() {
  const blogs = await listBlogsForAdmin();
  return <AdminBlogsManager initialBlogs={JSON.parse(JSON.stringify(blogs))} />;
}
