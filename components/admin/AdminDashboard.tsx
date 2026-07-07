import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FolderTree,
  Newspaper,
  Package,
} from "lucide-react";

const sections = [
  {
    href: "/admin/books",
    title: "Books",
    description: "Add, edit, remove, and hide books in your catalog",
    icon: BookOpen,
    color: "#3AA7FF",
    actions: ["Add book", "Edit", "Hide", "Delete"],
  },
  {
    href: "/admin/orders",
    title: "Orders",
    description: "View customer orders, payment status, and fulfillment",
    icon: Package,
    color: "#F5B84B",
    actions: ["View orders", "Track status"],
  },
  {
    href: "/admin/blogs",
    title: "Blogs",
    description: "Manage wisdom articles shown on your site",
    icon: Newspaper,
    color: "#F28C28",
    actions: ["Add article", "Edit", "Hide", "Delete"],
  },
  {
    href: "/admin/categories",
    title: "Categories",
    description: "Organize books into browseable categories",
    icon: FolderTree,
    color: "#3AA7FF",
    actions: ["Add category", "Edit", "Hide", "Delete"],
  },
];

export function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-10">
        <h1 className="font-heading text-3xl text-white">Admin Dashboard</h1>
        <p className="mt-2 text-white/60">
          Manage your BluishBoy bookstore content and orders
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/8"
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${section.color}20` }}
                >
                  <Icon className="h-6 w-6" style={{ color: section.color }} />
                </div>
                <ArrowRight className="h-5 w-5 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white/60" />
              </div>

              <h2 className="font-heading-secondary mb-2 text-xl text-white">
                {section.title}
              </h2>
              <p className="mb-4 text-sm text-white/60">{section.description}</p>

              <div className="flex flex-wrap gap-2">
                {section.actions.map((action) => (
                  <span
                    key={action}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/50"
                  >
                    {action}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
