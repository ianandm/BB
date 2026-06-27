"use client";

import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface WisdomHubProps {
  topics: string[];
  categoryTitle: string;
}

export function WisdomHub({ topics, categoryTitle }: WisdomHubProps) {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Key Ideas to Explore
          </h2>
          <p className="text-white/60 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
            Deep dive into core concepts from {categoryTitle}
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topics.map((topic, index) => (
            <motion.div
              key={topic}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div className="relative p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-[#3AA7FF]/50 transition-all text-center overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3AA7FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <Sparkles className="w-6 h-6 text-[#3AA7FF] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3
                    className="text-white text-lg group-hover:text-[#3AA7FF] transition-colors"
                    style={{ fontFamily: 'var(--font-heading-secondary)' }}
                  >
                    {topic}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
