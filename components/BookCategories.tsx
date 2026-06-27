"use client";

import { motion } from 'motion/react';
import { BookOpen, Heart, Sparkles, Baby, Crown, Users, TrendingUp, Flame } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    icon: BookOpen,
    title: 'Bhagavad Gita',
    slug: 'bhagavad-gita',
    description: 'Timeless wisdom for modern living',
    count: '24 books',
    image: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=600',
    gradient: 'from-[#3AA7FF] to-[#3AA7FF]/50',
  },
  {
    icon: Sparkles,
    title: 'Ramayana',
    slug: 'ramayana',
    description: 'Epic tales of dharma and devotion',
    count: '18 books',
    image: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=600',
    gradient: 'from-[#F5B84B] to-[#F5B84B]/50',
  },
  {
    icon: Flame,
    title: 'Hanuman',
    slug: 'hanuman',
    description: 'Stories of strength and surrender',
    count: '15 books',
    image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600',
    gradient: 'from-[#F28C28] to-[#F28C28]/50',
  },
  {
    icon: Baby,
    title: 'Children',
    slug: 'children',
    description: 'Sacred stories for young hearts',
    count: '32 books',
    image: 'https://images.unsplash.com/photo-1526916027372-0c0852cef5d3?w=600',
    gradient: 'from-[#3AA7FF] to-[#3AA7FF]/50',
  },
  {
    icon: TrendingUp,
    title: 'Self Mastery',
    slug: 'self-mastery',
    description: 'Transform through spiritual practice',
    count: '28 books',
    image: 'https://images.unsplash.com/photo-1604078893234-ff3a1a5d5292?w=600',
    gradient: 'from-[#F5B84B] to-[#F5B84B]/50',
  },
  {
    icon: Crown,
    title: 'Leadership',
    slug: 'leadership',
    description: 'Lead with dharmic principles',
    count: '20 books',
    image: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=600',
    gradient: 'from-[#F28C28] to-[#F28C28]/50',
  },
  {
    icon: Heart,
    title: 'Devotion',
    slug: 'devotion',
    description: 'Deepen your spiritual connection',
    count: '35 books',
    image: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=600',
    gradient: 'from-[#3AA7FF] to-[#3AA7FF]/50',
  },
  {
    icon: Users,
    title: 'Relationships',
    slug: 'relationships',
    description: 'Build meaningful spiritual bonds',
    count: '16 books',
    image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600',
    gradient: 'from-[#F5B84B] to-[#F5B84B]/50',
  },
];

export function BookCategories() {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Explore Book Categories
          </h2>
          <p className="text-white/60 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
            Enter different realms of spiritual knowledge
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link href={`/category/${category.slug}`} key={category.title}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-80 rounded-3xl overflow-hidden">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-80 group-hover:opacity-90 transition-opacity`} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                    {/* Icon */}
                    <div className="flex justify-end">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Text */}
                    <div>
                      <p className="text-white/80 text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                        {category.count}
                      </p>
                      <h3
                        className="text-2xl mb-2 text-white"
                        style={{ fontFamily: 'var(--font-heading-secondary)' }}
                      >
                        {category.title}
                      </h3>
                      <p className="text-white/90 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Glassmorphism border */}
                  <div className="absolute inset-0 border border-white/20 rounded-3xl" />
                </div>
              </motion.div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
