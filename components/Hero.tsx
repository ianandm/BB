"use client";

import { motion } from 'motion/react';
import { Sparkles, BookOpen, Shield, Users } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with cosmic temple library feel */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#1A1F3A] to-[#0A0E27]" />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#3AA7FF] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Sacred geometry overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern id="sacred-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#3AA7FF" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="#F5B84B" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#sacred-pattern)" />
          </svg>
        </div>

        {/* Gradient glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3AA7FF]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F5B84B]/20 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FDF0DC] to-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ancient wisdom for the modern mind.
          </h1>

          <p
            className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Discover Bhakti, Bhagavad Gita, Ramayana, Hanuman, and timeless spiritual knowledge through curated books and guided reading journeys.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 rounded-full overflow-hidden transition-all hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3AA7FF] to-[#F5B84B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative text-white font-medium flex items-center gap-2" style={{ fontFamily: 'var(--font-nav)' }}>
                Find Your First Book
                <Sparkles className="w-5 h-5" />
              </span>
            </button>

            <button className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/10 transition-all">
              <span className="text-white/90 font-medium flex items-center gap-2" style={{ fontFamily: 'var(--font-nav)' }}>
                Explore the Library
                <BookOpen className="w-5 h-5" />
              </span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-white/60">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#3AA7FF]" />
              <span style={{ fontFamily: 'var(--font-body)' }}>Curated Spiritual Books</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#F5B84B]" />
              <span style={{ fontFamily: 'var(--font-body)' }}>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#F28C28]" />
              <span style={{ fontFamily: 'var(--font-body)' }}>Trusted by Thousands</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
