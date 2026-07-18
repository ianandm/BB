import { AdminAnalyticsView } from "@/components/admin/AdminAnalyticsView";
import { getAdminAnalytics } from "@/lib/queries/admin-analytics";

export const metadata = {
  title: "Analytics",
};

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const data = await getAdminAnalytics();
  return <AdminAnalyticsView data={data} />;
}
