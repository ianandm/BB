"use client";

import { motion } from 'motion/react';
import { Sparkles, Clock, TrendingUp, Users, ArrowRight, Eye } from 'lucide-react';

interface StarterBook {
  title: string;
  author: string;
  image: string;
  whyStartHere: string;
  difficulty: string;
  readingTime: string;
  whoFor: string;
}

interface StartHereProps {
  starterBook: StarterBook;
}

export function StartHere({ starterBook }: StartHereProps) {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3AA7FF]/10 border border-[#3AA7FF]/20 mb-4">
            <Sparkles className="w-4 h-4 text-[#3AA7FF]" />
            <span className="text-[#3AA7FF] text-sm" style={{ fontFamily: 'var(--font-nav)' }}>
              Perfect Starting Point
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            New to This Topic?
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Start your journey with the perfect book, chosen to guide you from the very beginning
          </p>
        </div>

        {/* Featured Starter Book */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20"
        >
          {/* Gradient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3AA7FF]/20 rounded-full blur-[120px]" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-8 lg:p-16">
            {/* Book Cover */}
            <div className="flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#3AA7FF]/30 to-[#F5B84B]/30 rounded-3xl blur-2xl" />
                <img
                  src={starterBook.image}
                  alt={starterBook.title}
                  className="relative rounded-3xl shadow-2xl w-full max-w-sm aspect-[3/4] object-cover"
                />
              </motion.div>
            </div>

            {/* Book Info */}
            <div className="flex flex-col justify-center">
              <h3
                className="text-3xl lg:text-4xl mb-2 text-white leading-tight"
                style={{ fontFamily: 'var(--font-heading-secondary)' }}
              >
                {starterBook.title}
              </h3>
              <p className="text-[#F5B84B] text-lg mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                by {starterBook.author}
              </p>

              {/* Why Start Here */}
              <div className="mb-6">
                <h4
                  className="text-xl mb-2 text-white"
                  style={{ fontFamily: 'var(--font-heading-secondary)' }}
                >
                  Why Start Here
                </h4>
                <p className="text-white/70 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  {starterBook.whyStartHere}
                </p>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <TrendingUp className="w-5 h-5 text-[#3AA7FF] mb-2" />
                  <div className="text-white/60 text-xs mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                    Difficulty
                  </div>
                  <div className="text-white text-sm font-medium" style={{ fontFamily: 'var(--font-nav)' }}>
                    {starterBook.difficulty}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <Clock className="w-5 h-5 text-[#F5B84B] mb-2" />
                  <div className="text-white/60 text-xs mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                    Reading Time
                  </div>
                  <div className="text-white text-sm font-medium" style={{ fontFamily: 'var(--font-nav)' }}>
                    {starterBook.readingTime}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <Users className="w-5 h-5 text-[#F28C28] mb-2" />
                  <div className="text-white/60 text-xs mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                    Perfect For
                  </div>
                  <div className="text-white text-sm font-medium line-clamp-2" style={{ fontFamily: 'var(--font-nav)' }}>
                    New Readers
                  </div>
                </div>
              </div>

              {/* Who This Is For */}
              <div className="p-4 rounded-2xl bg-[#3AA7FF]/10 border border-[#3AA7FF]/20 mb-6">
                <p className="text-white/80 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                  <strong className="text-white">Who This Book Is For:</strong> {starterBook.whoFor}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group px-8 py-4 bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 rounded-full hover:shadow-lg hover:shadow-[#3AA7FF]/20 transition-all">
                  <span className="text-white font-medium flex items-center justify-center gap-2" style={{ fontFamily: 'var(--font-nav)' }}>
                    Start Reading
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button className="px-8 py-4 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition-all">
                  <span className="text-white/90 font-medium flex items-center justify-center gap-2" style={{ fontFamily: 'var(--font-nav)' }}>
                    <Eye className="w-5 h-5" />
                    View Book
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
