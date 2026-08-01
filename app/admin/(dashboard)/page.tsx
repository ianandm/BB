import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Dashboard",
};

// Admin data must always reflect the live database.
export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  return <AdminDashboard />;
}
