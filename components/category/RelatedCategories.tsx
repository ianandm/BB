"use client";

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categoryData } from '@/lib/data/categories';

interface RelatedCategoriesProps {
  relatedSlugs: string[];
}

export function RelatedCategories({ relatedSlugs }: RelatedCategoriesProps) {
  const relatedCategories = relatedSlugs
    .map(slug => categoryData[slug])
    .filter(Boolean)
    .slice(0, 4);

  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Continue Your Journey
          </h2>
          <p className="text-white/60 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
            Explore related wisdom domains
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link href={`/category/${category.slug}`} key={category.slug}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-64 rounded-3xl overflow-hidden">
                    {/* Background */}
                    <div className="absolute inset-0">
                      <img
                        src={category.heroImage}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-80 group-hover:opacity-90 transition-opacity`} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                      {/* Icon */}
                      <div className="flex justify-end">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* Text */}
                      <div>
                        <h3
                          className="text-xl mb-2 text-white flex items-center gap-2"
                          style={{ fontFamily: 'var(--font-heading-secondary)' }}
                        >
                          {category.title}
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </h3>
                        <p className="text-white/80 text-sm line-clamp-2" style={{ fontFamily: 'var(--font-body)' }}>
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Border */}
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
