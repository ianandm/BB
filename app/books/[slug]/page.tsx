import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import { BookPurchaseActions } from "@/components/books/BookPurchaseActions";
import { formatPrice } from "@/lib/utils";
import {
  books,
  getBookBySlug,
  getBooksByCategory,
  getCategoryName,
} from "@/lib/data/catalog";

type BookPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: "Book Not Found" };
  return {
    title: book.title,
    description: book.description,
  };
}

export default async function BookDetailPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const relatedBooks = getBooksByCategory(book.categorySlug)
    .filter((b) => b.slug !== book.slug)
    .slice(0, 3);

  return (
    <div className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/books?category=${book.categorySlug}`}
          className="font-nav mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#3AA7FF]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {getCategoryName(book.categorySlug)}
        </Link>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#3AA7FF]/30 to-[#F5B84B]/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <Image
                src={book.image}
                alt={book.title}
                width={600}
                height={800}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>

          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Link
                href={`/books?category=${book.categorySlug}`}
                className="font-nav rounded-full border border-[#3AA7FF]/20 bg-[#3AA7FF]/10 px-3 py-1 text-xs text-[#3AA7FF]"
              >
                {getCategoryName(book.categorySlug)}
              </Link>
              <span className="font-nav rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                {book.format}
              </span>
              {book.featured && (
                <span className="font-nav rounded-full bg-[#F28C28] px-3 py-1 text-xs text-white">
                  Beginner Friendly
                </span>
              )}
            </div>

            <h1 className="font-heading mb-2 text-4xl text-white lg:text-5xl">
              {book.title}
            </h1>
            <p className="font-body mb-4 text-lg text-[#F5B84B]">
              by {book.author}
            </p>
            <p className="font-nav mb-6 text-3xl text-white">
              {formatPrice(book.price)}
            </p>
            <p className="font-body mb-8 leading-relaxed text-white/70">
              {book.longDescription}
            </p>

            {book.tags && book.tags.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {book.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-nav rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <BookPurchaseActions book={book} />
          </div>
        </div>

        {relatedBooks.length > 0 && (
          <section className="mt-24">
            <div className="mb-8 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#3AA7FF]" />
              <h2 className="font-heading-secondary text-2xl text-white">
                More in {getCategoryName(book.categorySlug)}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedBooks.map((related) => (
                <Link
                  key={related.slug}
                  href={`/books/${related.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20"
                >
                  <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-xl">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="300px"
                    />
                  </div>
                  <h3 className="font-heading-secondary text-lg text-white group-hover:text-[#3AA7FF]">
                    {related.title}
                  </h3>
                  <p className="font-body text-sm text-white/60">
                    {formatPrice(related.price)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
