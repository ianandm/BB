"use client";

import { motion } from 'motion/react';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    category: 'Bhagavad Gita for Daily Life',
    title: '5 Gita Verses to Start Your Morning With Purpose',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=600',
    relatedBook: 'Bhagavad Gita As It Is',
    color: '#3AA7FF',
  },
  {
    category: 'Emotional Resilience',
    title: 'How Ancient Wisdom Helps Navigate Modern Stress',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=600',
    relatedBook: 'The Journey Home',
    color: '#F5B84B',
  },
  {
    category: 'Stories from Ramayana',
    title: "Hanuman's Devotion: Lessons in Unwavering Faith",
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600',
    relatedBook: 'Ramayana: The Epic',
    color: '#F28C28',
  },
  {
    category: 'Parenting Wisdom',
    title: 'Teaching Children Spiritual Values Through Stories',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1526916027372-0c0852cef5d3?w=600',
    relatedBook: 'Krishna Book for Children',
    color: '#3AA7FF',
  },
  {
    category: 'Book Guides',
    title: 'A Beginner\'s Guide to Reading Srila Prabhupada',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1604078893234-ff3a1a5d5292?w=600',
    relatedBook: 'Perfect Questions',
    color: '#F5B84B',
  },
  {
    category: 'Beginner Questions',
    title: 'What is Bhakti Yoga? Your Questions Answered',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=600',
    relatedBook: 'Science of Self-Realization',
    color: '#F28C28',
  },
];

export function SpiritualityBlogs() {
  return (
    <section id="wisdom-blogs" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Wisdom for Daily Life
          </h2>
          <p className="text-white/60 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
            Insights, stories, and practical guidance from timeless teachings
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-full rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden">
                {/* Cover Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Category Badge */}
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium backdrop-blur-sm"
                    style={{ backgroundColor: `${post.color}80` }}
                  >
                    {post.category}
                  </div>

                  {/* Read Time */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                    <Clock className="w-3 h-3 text-white/80" />
                    <span className="text-white/80 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="text-xl mb-4 text-white line-clamp-2 group-hover:text-[#3AA7FF] transition-colors"
                    style={{ fontFamily: 'var(--font-heading-secondary)' }}
                  >
                    {post.title}
                  </h3>

                  {/* Related Book */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#F5B84B]" />
                      <span className="text-white/60 text-sm line-clamp-1" style={{ fontFamily: 'var(--font-body)' }}>
                        {post.relatedBook}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="group px-8 py-4 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition-all">
            <span className="text-white/90 font-medium flex items-center gap-2" style={{ fontFamily: 'var(--font-nav)' }}>
              View All Articles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
