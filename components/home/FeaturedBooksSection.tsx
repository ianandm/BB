import { Sparkles } from "lucide-react";
import { BookCard } from "@/components/books/BookCard";
import { featuredBooks } from "@/lib/data/homepage";

export function FeaturedBooksSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3AA7FF]/10 blur-[150px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3AA7FF]/20 bg-[#3AA7FF]/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-[#3AA7FF]" />
            <span className="font-nav text-sm text-[#3AA7FF]">For Beginners</span>
          </div>
          <h2 className="font-heading mb-4 text-4xl text-white sm:text-5xl">
            New Here? Start With These Books
          </h2>
          <p className="font-body text-lg text-white/60">
            Carefully selected to guide your first steps into spiritual wisdom
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
