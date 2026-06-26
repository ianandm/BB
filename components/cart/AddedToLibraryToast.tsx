"use client";

import Link from "next/link";
import { BookOpen, X } from "lucide-react";
import { useEffect } from "react";

type AddedToLibraryToastProps = {
  bookTitle: string | null;
  onDismiss: () => void;
};

export function AddedToLibraryToast({
  bookTitle,
  onDismiss,
}: AddedToLibraryToastProps) {
  useEffect(() => {
    if (!bookTitle) return;
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [bookTitle, onDismiss]);

  if (!bookTitle) return null;

  return (
    <div className="fixed right-4 bottom-4 z-[100] w-full max-w-sm">
      <div className="rounded-2xl border border-white/10 bg-[#1a1f3a]/95 p-5 shadow-2xl backdrop-blur-xl">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#3AA7FF]/20 p-2">
              <BookOpen className="h-5 w-5 text-[#3AA7FF]" />
            </div>
            <div>
              <h3 className="font-heading-secondary text-lg text-white">
                Added To Your Library
              </h3>
              <p className="font-body text-sm text-white/60">
                One step closer to timeless wisdom.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-full p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="font-body mb-4 text-sm text-white/80">{bookTitle}</p>
        <div className="flex gap-2">
          <Link
            href="/cart"
            onClick={onDismiss}
            className="font-nav flex-1 rounded-full bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-[#3AA7FF]/20"
          >
            View Library
          </Link>
          <Link
            href="/checkout"
            onClick={onDismiss}
            className="font-nav flex-1 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-center text-sm font-medium text-white/90 transition-all hover:bg-white/10"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
