"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Star, Filter, Search, BookOpen, ArrowRight, Check } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';

const defaultBooks = [
  {
    id: 'bk-1',
    title: 'Bhagavad Gita As It Is',
    author: 'Srila Prabhupada',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=500',
    category: 'Bhagavad Gita',
    format: 'Hardcover',
    rating: 4.9,
    reviews: 2847,
    insight: 'Great for beginners',
    badge: 'Bestseller',
    badgeColor: '#F5B84B',
    description: 'The definitive guide to understanding the Gita\'s timeless wisdom. Translated with commentary by His Divine Grace A.C. Bhaktivedanta Swami Prabhupada.',
    themes: ['Self-Mastery', 'Philosophy', 'Devotion'],
  },
  {
    id: 'bk-2',
    title: 'The Journey Home',
    author: 'Radhanath Swami',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=500',
    category: 'Biography',
    format: 'Paperback',
    rating: 4.8,
    reviews: 1203,
    insight: 'Inspiring devotional stories',
    badge: 'Staff Pick',
    badgeColor: '#3AA7FF',
    description: "A remarkable spiritual autobiography tracing one soul's extraordinary pilgrimage from the streets of America to the sacred banks of the Ganges.",
    themes: ['Devotion', 'Biography', 'Inspiration'],
  },
  {
    id: 'bk-3',
    title: 'Perfect Questions, Perfect Answers',
    author: 'Srila Prabhupada',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=500',
    category: 'Philosophy',
    format: 'Paperback',
    rating: 4.7,
    reviews: 934,
    insight: 'Perfect for curious minds',
    badge: '',
    badgeColor: '',
    description: 'Essential conversations on life\'s most important questions — consciousness, the soul, karma and spiritual liberation.',
    themes: ['Philosophy', 'Self-Mastery'],
  },
  {
    id: 'bk-4',
    title: 'The Science of Self-Realization',
    author: 'Srila Prabhupada',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1526916027372-0c0852cef5d3?w=500',
    category: 'Self Mastery',
    format: 'Hardcover',
    rating: 4.8,
    reviews: 765,
    insight: 'Practical daily guidance',
    badge: '',
    badgeColor: '',
    description: 'Profound insights into spiritual consciousness through conversations, lectures and essays on the ancient Vedic tradition.',
    themes: ['Self-Mastery', 'Philosophy'],
  },
  {
    id: 'bk-5',
    title: 'Srimad Bhagavatam: First Canto',
    author: 'Srila Prabhupada',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500',
    category: 'Scripture',
    format: 'Hardcover',
    rating: 4.9,
    reviews: 612,
    insight: 'The crown jewel of Vedic literature',
    badge: 'New Edition',
    badgeColor: '#F28C28',
    description: 'The Bhagavata Purana is the most complete and authoritative exposition of Vedic knowledge and the ripened fruit of all Vedic literature.',
    themes: ['Scripture', 'Devotion', 'Philosophy'],
  },
  {
    id: 'bk-6',
    title: 'Nectar of Devotion',
    author: 'Srila Prabhupada',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1604078893234-ff3a1a5d5292?w=500',
    category: 'Devotion',
    format: 'Hardcover',
    rating: 4.9,
    reviews: 489,
    insight: 'Complete guide to Bhakti-yoga',
    badge: '',
    badgeColor: '',
    description: 'A summary study of Srila Rupa Goswami\'s Bhakti-rasamrita-sindhu — the complete science of devotional service.',
    themes: ['Devotion', 'Philosophy'],
  },
  {
    id: 'bk-7',
    title: 'Krishna Book',
    author: 'Srila Prabhupada',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1489421471208-251cc68284b8?w=500',
    category: 'Stories',
    format: 'Hardcover',
    rating: 4.8,
    reviews: 1050,
    insight: 'Enchanting stories of Lord Krishna',
    badge: 'Bestseller',
    badgeColor: '#F5B84B',
    description: 'A captivating summary of the Tenth Canto of Srimad Bhagavatam — the eternal pastimes of Lord Sri Krishna.',
    themes: ['Stories', 'Devotion'],
  },
  {
    id: 'bk-8',
    title: 'Teachings of Lord Chaitanya',
    author: 'Srila Prabhupada',
    price: 20.99,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
    category: 'Philosophy',
    format: 'Hardcover',
    rating: 4.7,
    reviews: 342,
    insight: 'Profound philosophy of love',
    badge: '',
    badgeColor: '',
    description: 'A summary of Lord Chaitanya\'s teachings on the highest spiritual knowledge — pure devotional love for the Supreme.',
    themes: ['Philosophy', 'Devotion'],
  },
  {
    id: 'bk-9',
    title: 'Easy Journey to Other Planets',
    author: 'Srila Prabhupada',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1534289907116-888fe70c4806?w=500',
    category: 'Philosophy',
    format: 'Paperback',
    rating: 4.6,
    reviews: 278,
    insight: 'Vedic cosmology explained',
    badge: '',
    badgeColor: '',
    description: 'An intriguing exploration of the Vedic understanding of interplanetary travel, spiritual dimensions, and the nature of consciousness.',
    themes: ['Philosophy', 'Self-Mastery'],
  },
  {
    id: 'bk-10',
    title: 'The Ramayana',
    author: 'Valmiki / C. Rajagopalachari',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500',
    category: 'Stories',
    format: 'Hardcover',
    rating: 4.8,
    reviews: 923,
    insight: 'Timeless epic of dharma',
    badge: 'Classic',
    badgeColor: '#F28C28',
    description: 'The beloved story of Lord Rama — a timeless epic that illuminates the principles of dharma, devotion, and righteous living.',
    themes: ['Stories', 'Dharma', 'Inspiration'],
  },
  {
    id: 'bk-11',
    title: 'Krishna: The Supreme Personality',
    author: 'Srila Prabhupada',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500',
    category: 'Devotion',
    format: 'Paperback',
    rating: 4.7,
    reviews: 415,
    insight: 'Who is Krishna?',
    badge: '',
    badgeColor: '',
    description: 'A clear and authoritative introduction to the supreme personality of Godhead — drawn from Vedic scriptures and personal realization.',
    themes: ['Devotion', 'Philosophy'],
  },
  {
    id: 'bk-12',
    title: 'Beyond Birth and Death',
    author: 'Srila Prabhupada',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=500',
    category: 'Self Mastery',
    format: 'Paperback',
    rating: 4.6,
    reviews: 198,
    insight: 'Understanding the eternal soul',
    badge: '',
    badgeColor: '',
    description: 'A concise and illuminating exploration of the soul\'s journey beyond physical existence — rooted in the Vedic understanding of karma and liberation.',
    themes: ['Self-Mastery', 'Philosophy'],
  },
];

const categories = ['All', 'Bhagavad Gita', 'Biography', 'Philosophy', 'Self Mastery', 'Scripture', 'Devotion', 'Stories'];
const formats = ['All Formats', 'Hardcover', 'Paperback'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Most Reviews', 'Highest Rated'];

type BookItem = (typeof defaultBooks)[number];

type BooksPageProps = {
  books?: BookItem[];
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="w-3.5 h-3.5"
          style={{
            fill: star <= Math.round(rating) ? '#F5B84B' : 'transparent',
            color: star <= Math.round(rating) ? '#F5B84B' : 'rgba(255,255,255,0.2)',
          }}
        />
      ))}
    </div>
  );
}

export function BooksPage({ books: booksFromDb }: BooksPageProps = {}) {
  const { addToCart, items } = useCart();
  const allBooks = booksFromDb ?? defaultBooks;
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFormat, setActiveFormat] = useState('All Formats');
  const [sortBy, setSortBy] = useState('Featured');
  const [search, setSearch] = useState('');
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const handleAddToCart = (book: typeof allBooks[0]) => {
    addToCart(book);
    setJustAdded(book.id);
    setTimeout(() => setJustAdded(null), 1800);
  };

  const isInCart = (id: string) => items.some((i) => i.id === id);

  const filtered = allBooks
    .filter((b) => {
      if (activeCategory !== 'All' && b.category !== activeCategory) return false;
      if (activeFormat !== 'All Formats' && b.format !== activeFormat) return false;
      if (search && !b.title.toLowerCase().includes(search.toLowerCase()) && !b.author.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Most Reviews') return b.reviews - a.reviews;
      if (sortBy === 'Highest Rated') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="pt-28 pb-24 min-h-screen">

      {/* ── Page Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5">
            <BookOpen className="w-4 h-4 text-[#F5B84B]" />
            <span className="text-white/70 text-sm" style={{ fontFamily: 'var(--font-nav)' }}>
              {allBooks.length} titles curated with devotion
            </span>
          </div>
          <h1
            className="text-5xl sm:text-6xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The Wisdom Library
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Every title chosen to guide you closer to truth, purpose, and devotion.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Filters ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 space-y-4"
        >
          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search books or authors..."
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 transition-all text-sm"
                style={{ fontFamily: 'var(--font-body)' }}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-11 pr-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-white/80 focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 transition-all text-sm appearance-none cursor-pointer min-w-[200px]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {sortOptions.map((o) => (
                  <option key={o} value={o} className="bg-[#1A1F3A]">{o}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Tabs */}
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
            <div className="w-px h-8 bg-white/10 self-center mx-1 hidden sm:block" />
            {formats.map((fmt) => (
              <button
                key={fmt}
                onClick={() => setActiveFormat(fmt)}
                className="px-4 py-2 rounded-full text-sm transition-all"
                style={{
                  fontFamily: 'var(--font-nav)',
                  background: activeFormat === fmt ? '#F5B84B20' : 'rgba(255,255,255,0.05)',
                  color: activeFormat === fmt ? '#F5B84B' : 'rgba(255,255,255,0.6)',
                  border: activeFormat === fmt ? '1px solid #F5B84B50' : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {fmt}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-white/40 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
            Showing {filtered.length} {filtered.length === 1 ? 'title' : 'titles'}
          </p>
        </motion.div>

        {/* ── Book Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/50 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
              No books match your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative flex flex-col rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 overflow-hidden transition-all hover:shadow-2xl hover:shadow-black/20"
              >
                {/* Badge */}
                {book.badge && (
                  <div
                    className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm"
                    style={{ backgroundColor: `${book.badgeColor}cc`, fontFamily: 'var(--font-nav)' }}
                  >
                    {book.badge}
                  </div>
                )}

                {/* Cover */}
                <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27]/80 via-transparent to-transparent" />

                  {/* Category pill */}
                  <div className="absolute bottom-3 left-3">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs text-white/80 backdrop-blur-sm bg-black/40"
                      style={{ fontFamily: 'var(--font-nav)' }}
                    >
                      {book.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 p-5">
                  <h3
                    className="text-base mb-1 text-white leading-snug line-clamp-2"
                    style={{ fontFamily: 'var(--font-heading-secondary)' }}
                  >
                    {book.title}
                  </h3>
                  <p className="text-[#F5B84B] text-xs mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                    {book.author}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={book.rating} />
                    <span className="text-white/50 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                      {book.rating} ({book.reviews.toLocaleString()})
                    </span>
                  </div>

                  {/* Insight */}
                  <div className="flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-xl bg-[#3AA7FF]/10 border border-[#3AA7FF]/15">
                    <span className="text-[#3AA7FF] text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                      ✦ {book.insight}
                    </span>
                  </div>

                  {/* Themes */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {book.themes.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full text-xs text-white/50 bg-white/5 border border-white/10"
                        style={{ fontFamily: 'var(--font-nav)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Price + Add to Cart */}
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span
                        className="text-xl text-white"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        ${book.price}
                      </span>
                      <span className="text-white/40 text-xs ml-1" style={{ fontFamily: 'var(--font-body)' }}>
                        {book.format}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(book)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
                      style={{
                        fontFamily: 'var(--font-nav)',
                        background: justAdded === book.id
                          ? 'rgba(74,222,128,0.2)'
                          : isInCart(book.id)
                          ? 'rgba(58,167,255,0.2)'
                          : 'rgba(58,167,255,0.15)',
                        color: justAdded === book.id ? '#4ade80' : '#3AA7FF',
                        border: justAdded === book.id
                          ? '1px solid rgba(74,222,128,0.3)'
                          : '1px solid rgba(58,167,255,0.25)',
                      }}
                    >
                      {justAdded === book.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          {isInCart(book.id) ? 'Add Again' : 'Add to Cart'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center p-12 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-[#3AA7FF]/10 to-[#F5B84B]/10 border border-white/20"
        >
          <h2
            className="text-3xl mb-3 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Not sure where to start?
          </h2>
          <p className="text-white/60 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
            Our curated reading paths guide you from first page to lasting transformation.
          </p>
          <a href="/#reading-paths">
            <button className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 rounded-full hover:shadow-lg hover:shadow-[#3AA7FF]/20 transition-all">
              <span className="text-white font-medium" style={{ fontFamily: 'var(--font-nav)' }}>
                Explore Reading Paths
              </span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
