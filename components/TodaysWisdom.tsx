"use client";

import { motion } from 'motion/react';
import { Sparkles, BookOpen, ArrowRight } from 'lucide-react';

export function TodaysWisdom() {
  return (
    <section className="relative py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-8 lg:p-12"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F5B84B]/20 rounded-full blur-[120px]" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F5B84B]/20 to-[#F28C28]/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#F5B84B]" />
                </div>
                <h2
                  className="text-3xl text-white"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Today's Wisdom
                </h2>
              </div>
              <span className="text-white/40 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                June 7, 2026
              </span>
            </div>

            {/* Quote */}
            <div className="mb-8">
              <div className="relative mb-6">
                <div className="absolute -left-4 top-0 text-6xl text-[#3AA7FF]/20" style={{ fontFamily: 'var(--font-heading)' }}>
                  "
                </div>
                <blockquote
                  className="text-2xl lg:text-3xl text-white/90 leading-relaxed pl-8"
                  style={{ fontFamily: 'var(--font-heading-secondary)' }}
                >
                  One who sees inaction in action, and action in inaction, is intelligent among men.
                </blockquote>
              </div>
              <p className="text-[#F5B84B] text-lg pl-8" style={{ fontFamily: 'var(--font-body)' }}>
                — Bhagavad Gita 4.18
              </p>
            </div>

            {/* Practical Takeaway */}
            <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3
                className="text-xl mb-3 text-white"
                style={{ fontFamily: 'var(--font-heading-secondary)' }}
              >
                Today's Reflection
              </h3>
              <p className="text-white/70 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                True wisdom lies in understanding that even in stillness, we can act with purpose. And in our busiest moments, we can maintain inner peace. Today, practice being fully present in each task while maintaining mental equanimity.
              </p>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#3AA7FF]/10 border border-[#3AA7FF]/20">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3AA7FF]/20 flex items-center justify-center mt-0.5">
                  <span className="text-[#3AA7FF] text-sm font-medium">✓</span>
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-1" style={{ fontFamily: 'var(--font-nav)' }}>
                    Practical Action
                  </h4>
                  <p className="text-white/70 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    Choose one task today and complete it with full awareness, free from anxiety about the outcome.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Book */}
            <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 rounded-lg bg-gradient-to-br from-[#3AA7FF]/20 to-[#F5B84B]/20 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-[#3AA7FF]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                    Dive Deeper
                  </p>
                  <h4 className="text-white text-lg" style={{ fontFamily: 'var(--font-heading-secondary)' }}>
                    Bhagavad Gita As It Is
                  </h4>
                  <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    by Srila Prabhupada
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 transition-all">
                <span className="text-white text-sm" style={{ fontFamily: 'var(--font-nav)' }}>
                  Explore
                </span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
