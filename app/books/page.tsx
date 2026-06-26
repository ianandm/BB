import type { Metadata } from "next";
import Link from "next/link";
import { BookCard } from "@/components/books/BookCard";
import { categories } from "@/lib/data/homepage";
import { books, getBooksByCategory, getCategoryBySlug } from "@/lib/data/catalog";
import { cn } from "@/lib/utils";

type BooksPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({
  searchParams,
}: BooksPageProps): Promise<Metadata> {
  const { category: categorySlug } = await searchParams;
  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;

  if (category) {
    return {
      title: `${category.title} Books`,
      description: category.description,
    };
  }

  return {
    title: "Explore the Library",
    description:
      "Browse curated spiritual books across Bhagavad Gita, Ramayana, Hanuman, and more.",
  };
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const { category: categorySlug } = await searchParams;
  const activeCategory = categorySlug ? getCategoryBySlug(categorySlug) : null;
  const displayedBooks = categorySlug
    ? getBooksByCategory(categorySlug)
    : books;

  return (
    <div className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-heading mb-4 text-4xl text-white sm:text-5xl">
            {activeCategory ? activeCategory.title : "Explore the Library"}
          </h1>
          <p className="font-body mx-auto max-w-2xl text-lg text-white/60">
            {activeCategory
              ? activeCategory.description
              : "Discover Bhakti, Bhagavad Gita, Ramayana, Hanuman, and timeless spiritual knowledge through curated books."}
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <Link
            href="/books"
            className={cn(
              "font-nav rounded-full px-4 py-2 text-sm transition-all",
              !categorySlug
                ? "bg-[#3AA7FF] text-white"
                : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
            )}
          >
            All Books
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/books?category=${category.slug}`}
              className={cn(
                "font-nav rounded-full px-4 py-2 text-sm transition-all",
                categorySlug === category.slug
                  ? "bg-[#3AA7FF] text-white"
                  : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              {category.title}
            </Link>
          ))}
        </div>

        {displayedBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/5 py-16 text-center">
            <p className="font-body text-lg text-white/60">
              No books found in this category yet.
            </p>
            <Link
              href="/books"
              className="font-nav mt-4 inline-block text-[#3AA7FF] hover:underline"
            >
              Browse all books
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
