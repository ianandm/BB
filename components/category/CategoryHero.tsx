"use client";

import { motion } from 'motion/react';
import { BookOpen, FileText, Compass, Lightbulb } from 'lucide-react';

interface CategoryHeroProps {
  title: string;
  description: string;
  heroImage: string;
  gradient: string;
  stats: {
    books: number;
    readingPaths: number;
    articles: number;
    resources: number;
  };
}

export function CategoryHero({ title, description, heroImage, gradient, stats }: CategoryHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${gradient} opacity-90`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-transparent to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl mb-6 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {title}
          </h1>

          <p
            className="text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {description}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-[#3AA7FF]" />
              </div>
              <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {stats.books}
              </div>
              <div className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                Books
              </div>
            </div>

            <div className="p-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Compass className="w-5 h-5 text-[#F5B84B]" />
              </div>
              <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {stats.readingPaths}
              </div>
              <div className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                Reading Paths
              </div>
            </div>

            <div className="p-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-[#F28C28]" />
              </div>
              <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {stats.articles}
              </div>
              <div className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                Articles
              </div>
            </div>

            <div className="p-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-[#3AA7FF]" />
              </div>
              <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                {stats.resources}
              </div>
              <div className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                Resources
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 rounded-full hover:shadow-lg hover:shadow-[#3AA7FF]/20 transition-all">
              <span className="text-white font-medium" style={{ fontFamily: 'var(--font-nav)' }}>
                Explore Books
              </span>
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all">
              <span className="text-white/90 font-medium" style={{ fontFamily: 'var(--font-nav)' }}>
                Start Guided Journey
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
