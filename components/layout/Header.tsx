"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

const navItems = [
  { label: "Books", href: "/books", icon: BookOpen },
  { label: "Blogs", href: "/#wisdom-blogs", icon: Heart, isAnchor: true },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();

  const handleBlogClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileOpen(false);
    const section = document.getElementById("wisdom-blogs");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#wisdom-blogs";
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="shrink-0">
            <h1 className="font-heading bg-gradient-to-r from-[#3AA7FF] to-[#F5B84B] bg-clip-text text-2xl tracking-tight text-transparent">
              BluishBoy
            </h1>
          </Link>

          <div className="mx-6 hidden max-w-lg flex-1 md:flex">
            <div className="group relative w-full">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3AA7FF]/20 to-[#F5B84B]/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-[#3AA7FF]/60" />
                <input
                  type="text"
                  placeholder="Search for wisdom, authors, or topics..."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pr-4 pl-12 text-white placeholder-white/40 backdrop-blur-sm transition-all focus:ring-2 focus:ring-[#3AA7FF]/50 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <nav className="mr-2 hidden items-center gap-1 md:flex">
            {navItems.map((item) =>
              item.isAnchor ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleBlogClick}
                  className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-white/70 transition-all hover:bg-white/8 hover:text-white"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-white/70 transition-all hover:bg-white/8 hover:text-white"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="group hidden rounded-full p-2 transition-colors hover:bg-white/5 sm:block"
              aria-label="Wishlist"
            >
              <Heart className="h-6 w-6 text-white/70 transition-colors group-hover:text-[#F5B84B]" />
            </button>
            <Link
              href="/cart"
              className="group relative rounded-full p-2 transition-colors hover:bg-white/5"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-6 w-6 text-white/70 transition-colors group-hover:text-[#3AA7FF]" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#3AA7FF] text-[10px] font-bold text-white">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            <Link
              href="/account"
              className="group hidden rounded-full p-2 transition-colors hover:bg-white/5 sm:block"
              aria-label="Account"
            >
              <User className="h-6 w-6 text-white/70 transition-colors group-hover:text-white" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="rounded-full p-2 transition-colors hover:bg-white/5 md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-6 w-6 text-white/70" />
              ) : (
                <Menu className="h-6 w-6 text-white/70" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="space-y-1 border-t border-white/10 pt-2 pb-4 md:hidden">
            {navItems.map((item) =>
              item.isAnchor ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleBlogClick}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-white/70 transition-all hover:bg-white/5 hover:text-white"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-white/70 transition-all hover:bg-white/5 hover:text-white"
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
