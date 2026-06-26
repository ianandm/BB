import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Book } from "@/lib/data/catalog";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <article className="group">
      <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:border-white/20">
        <Link href={`/books/${book.slug}`} className="block">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute top-4 left-4 rounded-full bg-[#3AA7FF] px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              Beginner Friendly
            </div>
          </div>
        </Link>

        <div className="p-6">
          <Link href={`/books/${book.slug}`}>
            <h3 className="font-heading-secondary mb-2 text-lg text-white transition-colors group-hover:text-[#3AA7FF]">
              {book.title}
            </h3>
          </Link>
          <p className="font-body mb-2 text-sm text-[#F5B84B]">by {book.author}</p>
          <p className="font-body mb-4 line-clamp-2 text-sm text-white/60">
            {book.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-nav text-xl text-white">
              {formatPrice(book.price)}
            </span>
            <AddToCartButton book={book} />
          </div>
        </div>
      </div>
    </article>
  );
}

export function BookCardCompact({ book }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20"
    >
      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#3AA7FF]/20 to-[#F5B84B]/20">
        <BookOpen className="absolute inset-0 m-auto h-8 w-8 text-[#3AA7FF]" />
      </div>
      <div>
        <p className="font-body text-sm text-white/60">Dive Deeper</p>
        <h4 className="font-heading-secondary text-lg text-white">{book.title}</h4>
        <p className="font-body text-sm text-white/60">by {book.author}</p>
      </div>
    </Link>
  );
}
