import { AdminOrdersManager } from "@/components/admin/AdminOrdersManager";
import { getAdminOrders } from "@/lib/queries/orders";

export const metadata = { title: "Orders" };

// Admin data must always reflect the live database.
export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders({ limit: 100 });
  return <AdminOrdersManager orders={JSON.parse(JSON.stringify(orders))} />;
}
