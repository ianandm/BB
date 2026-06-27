import { ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbsProps {
  categoryTitle: string;
}

export function Breadcrumbs({ categoryTitle }: BreadcrumbsProps) {
  return (
    <div className="pt-24 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Back Button — left */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#3AA7FF] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              Back to All Books
            </span>
          </Link>

          {/* Breadcrumb trail — right */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
            <Link
              href="/"
              className="text-white/60 hover:text-[#3AA7FF] transition-colors text-sm"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <span className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              Books
            </span>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <span className="text-[#3AA7FF] text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              {categoryTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
