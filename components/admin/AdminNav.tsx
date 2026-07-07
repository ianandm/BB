"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  FolderTree,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Package,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/books", label: "Books", icon: BookOpen },
  { href: "/admin/orders", label: "Orders", icon: Package },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#0A0E27]/95">
      <div className="border-b border-white/10 p-6">
        <Link href="/admin" className="block">
          <span className="font-heading bg-gradient-to-r from-[#3AA7FF] to-[#F5B84B] bg-clip-text text-xl text-transparent">
            BluishBoy
          </span>
          <p className="mt-1 text-xs text-white/50">Administration</p>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                active
                  ? "bg-[#3AA7FF]/15 text-[#3AA7FF]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-4">
        <Link
          href="/"
          className="block rounded-xl px-4 py-2 text-sm text-white/50 transition-colors hover:text-white"
        >
          ← View storefront
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
