import { ArrowRight, BookOpen } from "lucide-react";
import { articles } from "@/lib/data/homepage";

export function ArticlesSection() {
  return (
    <section id="wisdom-blogs" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-heading mb-4 text-4xl text-white sm:text-5xl">
            Wisdom for Daily Life
          </h2>
          <p className="font-body text-lg text-white/60">
            Practical insights to enrich your spiritual journey
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-white/20"
            >
              <span
                className="font-nav mb-4 inline-block rounded-full px-3 py-1 text-xs"
                style={{
                  backgroundColor: `${article.color}20`,
                  color: article.color,
                }}
              >
                {article.category}
              </span>
              <h3 className="font-heading-secondary mb-4 line-clamp-2 text-xl text-white transition-colors group-hover:text-[#3AA7FF]">
                {article.title}
              </h3>
              <div className="mb-4 flex items-center gap-4 text-sm text-white/60">
                <span>{article.readTime}</span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-[#F5B84B]" />
                  {article.relatedBook}
                </span>
              </div>
              <button
                type="button"
                className="font-nav flex items-center gap-2 text-sm text-[#3AA7FF] transition-colors hover:text-[#3AA7FF]/80"
              >
                Read Article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-nav font-medium text-white/90 transition-all hover:bg-white/10"
          >
            View All Articles
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
