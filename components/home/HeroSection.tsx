import { ArrowRight, BookOpen, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden py-24">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#3AA7FF]/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[#F5B84B]/20 blur-[120px]" />
        {/* Decorative stars — replace with Figma-exported assets if available */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#3AA7FF]"
            style={{
              top: `${10 + ((i * 17) % 80)}%`,
              left: `${5 + ((i * 23) % 90)}%`,
              opacity: 0.3 + (i % 5) * 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading mb-6 bg-gradient-to-r from-white via-[#FDF0DC] to-white bg-clip-text text-5xl text-transparent sm:text-6xl lg:text-7xl">
          Ancient wisdom for the modern minds.
        </h1>
        <p className="font-body mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-white/70 sm:text-xl">
          Discover Bhakti, Bhagavad Gita, Ramayana, Hanuman, and timeless
          spiritual knowledge through curated books and guided reading journeys.
        </p>

        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/books">
            Find Your First Book
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button href="/books" variant="secondary">
            Explore the Library
            <BookOpen className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#3AA7FF]" />
            <span>Curated Spiritual Books</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#F5B84B]" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#F28C28]" />
            <span>Trusted by Thousands</span>
          </div>
        </div>
      </div>
    </section>
  );
}
