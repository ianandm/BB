import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

export function TodaysWisdomSection() {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl lg:p-12">
          <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#F5B84B]/20 blur-[120px]" />

          <div className="relative z-10">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#F5B84B]/20 to-[#F28C28]/20">
                  <Sparkles className="h-6 w-6 text-[#F5B84B]" />
                </div>
                <h2 className="font-heading text-3xl text-white">
                  Today&apos;s Wisdom
                </h2>
              </div>
              <span className="font-body text-sm text-white/40">{today}</span>
            </div>

            <div className="mb-8">
              <div className="relative mb-6">
                <div className="font-heading absolute -left-4 top-0 text-6xl text-[#3AA7FF]/20">
                  &ldquo;
                </div>
                <blockquote className="font-heading-secondary pl-8 text-2xl leading-relaxed text-white/90 lg:text-3xl">
                  One who sees inaction in action, and action in inaction, is
                  intelligent among men.
                </blockquote>
              </div>
              <p className="font-body pl-8 text-lg text-[#F5B84B]">
                — Bhagavad Gita 4.18
              </p>
            </div>

            <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-heading-secondary mb-3 text-xl text-white">
                Today&apos;s Reflection
              </h3>
              <p className="font-body mb-4 leading-relaxed text-white/70">
                True wisdom lies in understanding that even in stillness, we can
                act with purpose. And in our busiest moments, we can maintain inner
                peace. Today, practice being fully present in each task while
                maintaining mental equanimity.
              </p>
              <div className="flex items-start gap-3 rounded-xl border border-[#3AA7FF]/20 bg-[#3AA7FF]/10 p-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3AA7FF]/20">
                  <span className="text-sm font-medium text-[#3AA7FF]">✓</span>
                </div>
                <div>
                  <h4 className="font-nav mb-1 text-sm font-medium text-white">
                    Practical Action
                  </h4>
                  <p className="font-body text-sm text-white/70">
                    Choose one task today and complete it with full awareness,
                    free from anxiety about the outcome.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/books/bhagavad-gita-as-it-is"
              className="group flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-[#3AA7FF]/20 to-[#F5B84B]/20">
                  <BookOpen className="h-8 w-8 text-[#3AA7FF]" />
                </div>
                <div>
                  <p className="font-body text-sm text-white/60">Dive Deeper</p>
                  <h4 className="font-heading-secondary text-lg text-white">
                    Bhagavad Gita As It Is
                  </h4>
                  <p className="font-body text-sm text-white/60">
                    by Srila Prabhupada
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-white/60 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
