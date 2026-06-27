"use client";

import { motion } from 'motion/react';
import { Clock, BookOpen, ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';

const posts = [
  {
    id: 1,
    category: 'Bhagavad Gita',
    categoryColor: '#3AA7FF',
    title: '5 Gita Verses to Start Your Morning With Purpose',
    excerpt: 'The Bhagavad Gita offers more than philosophy — it offers a practical morning orientation. These five verses have changed how thousands of readers begin their day.',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=800&fit=crop',
    relatedBook: 'Bhagavad Gita As It Is',
    featured: true,
  },
  {
    id: 2,
    category: 'Emotional Resilience',
    categoryColor: '#F5B84B',
    title: 'How Ancient Wisdom Helps Navigate Modern Stress',
    excerpt: "Anxiety, overwhelm, and uncertainty aren't new human experiences. The rishis wrote about them thousands of years ago — and left us practical tools.",
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=800&fit=crop',
    relatedBook: 'The Journey Home',
    featured: false,
  },
  {
    id: 3,
    category: 'Stories',
    categoryColor: '#F28C28',
    title: "Hanuman's Devotion: Lessons in Unwavering Faith",
    excerpt: 'What does it mean to be completely devoted? Through Hanuman, we see a model of service so pure it transcends ordinary motivation altogether.',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=800&fit=crop',
    relatedBook: 'The Ramayana',
    featured: false,
  },
  {
    id: 4,
    category: 'Parenting',
    categoryColor: '#3AA7FF',
    title: 'Teaching Children Spiritual Values Through Stories',
    excerpt: "Children learn through narrative, not doctrine. Here's how to use the timeless stories of the Vedic tradition to plant seeds that last a lifetime.",
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1526916027372-0c0852cef5d3?w=800&fit=crop',
    relatedBook: 'Krishna Book',
    featured: false,
  },
  {
    id: 5,
    category: 'Book Guides',
    categoryColor: '#F5B84B',
    title: "A Beginner's Guide to Reading Srila Prabhupada",
    excerpt: 'His books are profound, and the purports can feel dense if you come in unprepared. This guide gives you the context, the pace, and the practice to read them well.',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1604078893234-ff3a1a5d5292?w=800&fit=crop',
    relatedBook: 'Perfect Questions, Perfect Answers',
    featured: true,
  },
  {
    id: 6,
    category: 'Philosophy',
    categoryColor: '#F28C28',
    title: 'What is Bhakti Yoga? Your Questions Answered',
    excerpt: 'Is it a religion? A practice? A feeling? We answer the most common questions first-time readers bring to the Bhakti tradition — clearly and without jargon.',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&fit=crop',
    relatedBook: 'Science of Self-Realization',
    featured: false,
  },
  {
    id: 7,
    category: 'Self-Mastery',
    categoryColor: '#3AA7FF',
    title: 'Karma: What It Actually Means (and What It Does Not)',
    excerpt: 'The word karma is used everywhere and understood almost nowhere. A clear, honest exploration of what the Vedas actually say about action and consequence.',
    readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&fit=crop',
    relatedBook: 'Bhagavad Gita As It Is',
    featured: false,
  },
  {
    id: 8,
    category: 'Devotion',
    categoryColor: '#F5B84B',
    title: "The Nine Processes of Bhakti: A Practical Overview",
    excerpt: 'From hearing and chanting to serving and surrendering — Srila Rupa Goswami outlined nine doorways into devotional life. Here is what each one looks like in practice.',
    readTime: '13 min read',
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&fit=crop',
    relatedBook: 'Nectar of Devotion',
    featured: false,
  },
  {
    id: 9,
    category: 'Book Guides',
    categoryColor: '#F28C28',
    title: 'How to Read the Srimad Bhagavatam Without Getting Lost',
    excerpt: "Twelve cantos, eighteen thousand verses, and centuries of commentary. Here's a practical roadmap for approaching the Bhagavatam as a modern reader.",
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=800&fit=crop',
    relatedBook: 'Srimad Bhagavatam: First Canto',
    featured: false,
  },
];

const categories = ['All', 'Bhagavad Gita', 'Emotional Resilience', 'Stories', 'Parenting', 'Book Guides', 'Philosophy', 'Self-Mastery', 'Devotion'];

export function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = posts.filter((p) => {
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <div className="pt-28 pb-24 min-h-screen">

      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl sm:text-6xl mb-5 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Wisdom for Daily Life
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Insights, stories, and practical guidance drawn from timeless teachings — written for the modern seeker.
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-10 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 transition-all text-sm"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-sm transition-all"
                style={{
                  fontFamily: 'var(--font-nav)',
                  background: activeCategory === cat ? '#3AA7FF' : 'rgba(255,255,255,0.05)',
                  color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.6)',
                  border: activeCategory === cat ? '1px solid #3AA7FF' : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <div className="mb-10">
            <h2 className="text-white/50 text-xs uppercase tracking-widest mb-5" style={{ fontFamily: 'var(--font-nav)' }}>Featured</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {featured.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group cursor-pointer rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 overflow-hidden transition-all"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs backdrop-blur-sm" style={{ backgroundColor: `${post.categoryColor}90`, fontFamily: 'var(--font-nav)' }}>
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl text-white mb-3 group-hover:text-[#3AA7FF] transition-colors" style={{ fontFamily: 'var(--font-heading-secondary)' }}>{post.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)' }}>{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/40 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        <span style={{ fontFamily: 'var(--font-body)' }}>{post.readTime}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[#3AA7FF] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* All posts */}
        {regular.length > 0 && (
          <div>
            <h2 className="text-white/50 text-xs uppercase tracking-widest mb-5" style={{ fontFamily: 'var(--font-nav)' }}>
              {featured.length > 0 ? 'All Articles' : 'Articles'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regular.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group cursor-pointer rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 overflow-hidden transition-all"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-xs backdrop-blur-sm" style={{ backgroundColor: `${post.categoryColor}80`, fontFamily: 'var(--font-nav)' }}>
                      {post.category}
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-white/70" />
                      <span className="text-white/70 text-xs" style={{ fontFamily: 'var(--font-body)' }}>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base text-white mb-3 line-clamp-2 group-hover:text-[#3AA7FF] transition-colors" style={{ fontFamily: 'var(--font-heading-secondary)' }}>{post.title}</h3>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#F5B84B]" />
                        <span className="text-white/50 text-xs line-clamp-1" style={{ fontFamily: 'var(--font-body)' }}>{post.relatedBook}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-white/40 text-lg" style={{ fontFamily: 'var(--font-body)' }}>No articles match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
