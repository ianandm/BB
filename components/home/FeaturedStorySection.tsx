import Image from "next/image";
import { BookOpen, Star } from "lucide-react";
import { FeaturedStoryActions } from "@/components/home/FeaturedStoryActions";
import { getBookBySlug } from "@/lib/data/catalog";

export function FeaturedStorySection() {
  const book = getBookBySlug("bhagavad-gita-as-it-is");
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#F5B84B]/20 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#3AA7FF]/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#3AA7FF]/30 to-[#F5B84B]/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              {/* Replace with Figma-exported hero image asset */}
              <Image
                src={
                  book?.image ??
                  "https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=600"
                }
                alt="Bhagavad Gita As It Is book cover"
                width={600}
                height={800}
                className="h-auto w-full object-cover"
                priority
              />
              <div className="absolute -top-4 -right-4 flex items-center gap-2 rounded-full bg-[#F28C28] px-4 py-2 text-white shadow-lg">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-nav font-medium">Editor&apos;s Pick</span>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#3AA7FF]" />
              <span className="font-nav text-sm tracking-wider text-[#3AA7FF] uppercase">
                Featured Story
              </span>
            </div>

            <h2 className="font-heading mb-6 text-4xl text-white lg:text-5xl">
              The Bhagavad Gita: Your Guide to Modern Living
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-heading-secondary mb-2 text-xl text-[#F5B84B]">
                  Timeless Wisdom, Modern Relevance
                </h3>
                <p className="font-body leading-relaxed text-white/70">
                  In a world of constant change and uncertainty, the Bhagavad Gita
                  offers timeless wisdom on purpose, duty, and inner peace.
                  Srila Prabhupada&apos;s translation makes these ancient teachings
                  accessible to modern readers.
                </p>
              </div>
              <div>
                <h3 className="font-heading-secondary mb-2 text-xl text-[#F5B84B]">
                  For Every Seeker
                </h3>
                <p className="font-body leading-relaxed text-white/70">
                  Perfect for seekers at any stage—whether you&apos;re facing life
                  decisions, seeking spiritual growth, or simply curious about
                  Eastern philosophy. The Gita speaks to the challenges we all face.
                </p>
              </div>
            </div>

            <FeaturedStoryActions />
          </div>
        </div>
      </div>
    </section>
  );
}
