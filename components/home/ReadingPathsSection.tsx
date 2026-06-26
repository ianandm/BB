import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { readingPaths } from "@/lib/data/homepage";

export function ReadingPathsSection() {
  return (
    <section id="reading-paths" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-heading mb-4 text-4xl text-white sm:text-5xl">
            Guided Reading Paths
          </h2>
          <p className="font-body mx-auto max-w-2xl text-lg text-white/60">
            Choose a structured path designed for your current stage of life
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {readingPaths.map((path) => (
            <article
              key={path.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:border-white/20"
            >
              <div
                className="mb-4 h-1 w-16 rounded-full"
                style={{ backgroundColor: path.color }}
              />
              <h3 className="font-heading-secondary mb-3 text-2xl text-white">
                {path.title}
              </h3>
              <p className="font-body mb-6 text-white/60">{path.description}</p>

              <div className="mb-6 flex flex-wrap gap-4 text-sm text-white/70">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-[#3AA7FF]" />
                  {path.books} books
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#F5B84B]" />
                  {path.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: path.color }}
                  />
                  {path.difficulty}
                </span>
              </div>

              <button
                type="button"
                className="font-nav flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: path.color }}
              >
                Start This Path
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
