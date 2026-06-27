"use client";

import { useState } from 'react';
import { Search, Heart, ShoppingCart, User, BookOpen, ScrollText, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/components/cart/CartProvider';

const navLinks = [
  {
    label: 'Books',
    href: '/books',
    icon: BookOpen,
  },
  {
    label: 'Blogs',
    href: '/#wisdom-blogs',
    icon: ScrollText,
    isAnchor: true,
  },
];

export function Header() {
  const { totalItems, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleBlogsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    if (pathname === '/') {
      document.getElementById('wisdom-blogs')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/');
      setTimeout(() => {
        document.getElementById('wisdom-blogs')?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1
              className="text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#3AA7FF] to-[#F5B84B] cursor-pointer hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              BluishBoy
            </h1>
          </Link>

          {/* Search Bar — desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-6">
            <div className="relative w-full group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3AA7FF]/20 to-[#F5B84B]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-[#3AA7FF]/60" />
                <input
                  type="text"
                  placeholder="Search for wisdom, authors, or topics..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 transition-all"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>
            </div>
          </div>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-1 mr-2">
            {navLinks.map((link) =>
              link.isAnchor ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleBlogsClick}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/8 transition-all text-sm"
                  style={{ fontFamily: 'var(--font-nav)' }}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/8 transition-all text-sm"
                  style={{ fontFamily: 'var(--font-nav)' }}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors group hidden sm:block">
              <Heart className="w-6 h-6 text-white/70 group-hover:text-[#F5B84B] transition-colors" />
            </button>
            <button
              onClick={openCart}
              className="p-2 hover:bg-white/5 rounded-full transition-colors group relative"
            >
              <ShoppingCart className="w-6 h-6 text-white/70 group-hover:text-[#3AA7FF] transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F28C28] rounded-full flex items-center justify-center text-xs text-white font-medium">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors group hidden sm:block">
              <User className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              {mobileOpen
                ? <X className="w-6 h-6 text-white/70" />
                : <Menu className="w-6 h-6 text-white/70" />
              }
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 pb-4 pt-2 space-y-1">
            {navLinks.map((link) =>
              link.isAnchor ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleBlogsClick}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white/70 hover:text-white hover:bg-white/5 transition-all"
                  style={{ fontFamily: 'var(--font-nav)' }}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white/70 hover:text-white hover:bg-white/5 transition-all"
                  style={{ fontFamily: 'var(--font-nav)' }}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </header>
  );
}
