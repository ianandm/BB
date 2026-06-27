"use client";

import { motion } from 'motion/react';
import { BookOpen, ArrowRight, Star } from 'lucide-react';

export function FeaturedBookStory() {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20"
        >
          {/* Gradient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B84B]/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3AA7FF]/20 rounded-full blur-[120px]" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-8 lg:p-16">
            {/* Book Cover Side */}
            <div className="flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#3AA7FF]/30 to-[#F5B84B]/30 rounded-3xl blur-2xl" />
                <img
                  src="https://images.unsplash.com/photo-1467688695332-6b486449d78f?w=600"
                  alt="Featured Book"
                  className="relative rounded-3xl shadow-2xl w-full max-w-md aspect-[3/4] object-cover"
                />
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-[#F28C28] text-white backdrop-blur-sm flex items-center gap-2 shadow-lg">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium" style={{ fontFamily: 'var(--font-nav)' }}>
                    Editor's Pick
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Editorial Content */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-[#3AA7FF]" />
                <span className="text-[#3AA7FF] text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-nav)' }}>
                  Featured Story
                </span>
              </div>

              <h2
                className="text-4xl lg:text-5xl mb-6 text-white leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                The Bhagavad Gita: Your Guide to Modern Living
              </h2>

              <div className="space-y-6 mb-8">
                <div>
                  <h3
                    className="text-xl mb-2 text-[#F5B84B]"
                    style={{ fontFamily: 'var(--font-heading-secondary)' }}
                  >
                    Why This Book Matters
                  </h3>
                  <p className="text-white/70 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                    In a world of constant change and uncertainty, the Bhagavad Gita offers timeless wisdom on purpose, duty, and inner peace. Srila Prabhupada's translation makes these ancient teachings accessible to modern readers.
                  </p>
                </div>

                <div>
                  <h3
                    className="text-xl mb-2 text-[#F5B84B]"
                    style={{ fontFamily: 'var(--font-heading-secondary)' }}
                  >
                    Who Should Read It
                  </h3>
                  <p className="text-white/70 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                    Perfect for seekers at any stage—whether you're facing life decisions, seeking spiritual growth, or simply curious about Eastern philosophy. The Gita speaks to the challenges we all face.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm">
                    Philosophy
                  </span>
                  <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm">
                    Self-Mastery
                  </span>
                  <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm">
                    Leadership
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group px-8 py-4 bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 rounded-full hover:shadow-lg hover:shadow-[#3AA7FF]/20 transition-all">
                  <span className="text-white font-medium flex items-center gap-2" style={{ fontFamily: 'var(--font-nav)' }}>
                    Purchase Book
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button className="px-8 py-4 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition-all">
                  <span className="text-white/90 font-medium" style={{ fontFamily: 'var(--font-nav)' }}>
                    Read More
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
