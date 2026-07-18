import { BarChart3, BookOpen, DollarSign, FolderTree, Newspaper, Package } from "lucide-react";
import type { AdminAnalytics } from "@/lib/queries/admin-analytics";
import { formatPrice } from "@/lib/utils";

type StatCard = {
  label: string;
  value: string;
  detail: string;
  icon: typeof BarChart3;
  color: string;
};

export function AdminAnalyticsView({ data }: { data: AdminAnalytics }) {
  const cards: StatCard[] = [
    {
      label: "Books",
      value: String(data.books.total),
      detail: `${data.books.active} active · ${data.books.draft} draft · ${data.books.archived} archived`,
      icon: BookOpen,
      color: "#3AA7FF",
    },
    {
      label: "Orders",
      value: String(data.orders.total),
      detail: `${data.orders.pending} pending`,
      icon: Package,
      color: "#F5B84B",
    },
    {
      label: "Revenue",
      value: formatPrice(data.orders.revenue),
      detail: "Excludes cancelled and refunded orders",
      icon: DollarSign,
      color: "#F28C28",
    },
    {
      label: "Blogs",
      value: String(data.blogs.total),
      detail: `${data.blogs.published} published`,
      icon: Newspaper,
      color: "#F28C28",
    },
    {
      label: "Categories",
      value: String(data.categories.total),
      detail: `${data.categories.active} active`,
      icon: FolderTree,
      color: "#3AA7FF",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-10">
        <h1 className="font-heading text-3xl text-white">Analytics</h1>
        <p className="mt-2 text-white/60">
          Live stats from your catalog, orders, and content
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${card.color}20` }}
                >
                  <Icon className="h-6 w-6" style={{ color: card.color }} />
                </div>
              </div>
              <p className="text-sm text-white/60">{card.label}</p>
              <p className="font-heading mt-1 text-3xl text-white">
                {card.value}
              </p>
              <p className="mt-3 text-xs text-white/50">{card.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
