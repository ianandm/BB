"use client";

import { motion } from 'motion/react';
import { BookOpen, ArrowRight } from 'lucide-react';

interface Collection {
  title: string;
  description: string;
  bookCount: number;
}

interface CuratedCollectionsProps {
  collections: Collection[];
}

export function CuratedCollections({ collections }: CuratedCollectionsProps) {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Curated Reading Collections
          </h2>
          <p className="text-white/60 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
            Themed journeys designed for specific goals and interests
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-full p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden">
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3AA7FF]/10 to-[#F5B84B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3AA7FF]/20 to-[#F5B84B]/20 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-[#3AA7FF]" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      <span className="text-white/70 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                        {collection.bookCount} books
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-2xl mb-3 text-white"
                    style={{ fontFamily: 'var(--font-heading-secondary)' }}
                  >
                    {collection.title}
                  </h3>
                  <p className="text-white/60 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                    {collection.description}
                  </p>

                  {/* CTA */}
                  <button className="w-full px-6 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/5 transition-all flex items-center justify-center gap-2 group/button">
                    <span style={{ fontFamily: 'var(--font-nav)' }}>
                      Start Collection
                    </span>
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
