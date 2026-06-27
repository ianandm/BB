"use client";

import { motion } from 'motion/react';
import { BookOpen, Clock, TrendingUp, ArrowRight } from 'lucide-react';

const readingPaths = [
  {
    title: 'New to Bhakti',
    description: 'A gentle introduction to devotional practice and philosophy',
    books: 8,
    duration: '2-3 months',
    difficulty: 'Beginner',
    color: '#3AA7FF',
  },
  {
    title: 'Build Inner Strength',
    description: 'Develop resilience through spiritual wisdom and practice',
    books: 12,
    duration: '3-4 months',
    difficulty: 'Intermediate',
    color: '#F5B84B',
  },
  {
    title: 'Stories for Children',
    description: 'Sacred narratives that inspire young minds',
    books: 15,
    duration: 'Ongoing',
    difficulty: 'All Ages',
    color: '#F28C28',
  },
  {
    title: 'Gita for Daily Life',
    description: 'Apply timeless teachings to modern challenges',
    books: 10,
    duration: '4-6 months',
    difficulty: 'All Levels',
    color: '#3AA7FF',
  },
  {
    title: 'Devotional Deep Dive',
    description: 'Immerse yourself in advanced bhakti practices',
    books: 20,
    duration: '6-12 months',
    difficulty: 'Advanced',
    color: '#F5B84B',
  },
];

export function ReadingPaths() {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Guided Reading Paths
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Choose a structured path designed for your current stage of life
          </p>
        </div>

        {/* Paths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {readingPaths.map((path, index) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-full p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden">
                {/* Gradient background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${path.color}, transparent)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3
                        className="text-2xl mb-2 text-white"
                        style={{ fontFamily: 'var(--font-heading-secondary)' }}
                      >
                        {path.title}
                      </h3>
                      <p className="text-white/60" style={{ fontFamily: 'var(--font-body)' }}>
                        {path.description}
                      </p>
                    </div>
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${path.color}20` }}
                    >
                      <BookOpen className="w-6 h-6" style={{ color: path.color }} />
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-white/70">
                      <BookOpen className="w-4 h-4 text-[#3AA7FF]" />
                      <span className="text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                        {path.books} books
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Clock className="w-4 h-4 text-[#F5B84B]" />
                      <span className="text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                        {path.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <TrendingUp className="w-4 h-4 text-[#F28C28]" />
                      <span className="text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                        {path.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    className="w-full px-6 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/5 transition-all flex items-center justify-center gap-2 group/button"
                    style={{ fontFamily: 'var(--font-nav)' }}
                  >
                    Start Path
                    <ArrowRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
