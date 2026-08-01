import { AdminOrdersManager } from "@/components/admin/AdminOrdersManager";
import { getAdminOrders } from "@/lib/queries/orders";

export const metadata = { title: "Orders" };

// Admin data must always reflect the live database.
export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders({ limit: 100 });
  const serialized = JSON.parse(JSON.stringify(orders));

  // The manager seeds React state from this prop, so it must remount when
  // the server returns a different set of orders (e.g. a new webhook order).
  const key = `${orders.length}-${orders[0]?.id ?? "empty"}`;

  return <AdminOrdersManager key={key} orders={serialized} />;
}
