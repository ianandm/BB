"use client";

import { motion } from 'motion/react';
import { ShoppingCart, Eye, Sparkles } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import type { CatalogBook } from '@/lib/queries/mappers';

const fallbackBooks: CatalogBook[] = [
  {
    id: 'book-1',
    slug: 'bhagavad-gita-as-it-is',
    title: 'Bhagavad Gita As It Is',
    author: 'Srila Prabhupada',
    authors: ['Srila Prabhupada'],
    price: 24.99,
    priceDisplay: '$24.99',
    description: "The definitive guide to understanding the Gita's timeless wisdom",
    image: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=400',
    category: 'Bhagavad Gita',
    categorySlug: 'bhagavad-gita',
    categories: [{ name: 'Bhagavad Gita', slug: 'bhagavad-gita' }],
    format: 'Hardcover',
    rating: 4.9,
    reviewCount: 2847,
    featured: true,
    inStock: true,
    insight: 'Great for beginners',
  },
  {
    id: 'book-2',
    slug: 'the-journey-home',
    title: 'The Journey Home',
    author: 'Radhanath Swami',
    authors: ['Radhanath Swami'],
    price: 18.99,
    priceDisplay: '$18.99',
    description: 'An inspiring spiritual autobiography of self-discovery',
    image: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=400',
    category: 'Biography',
    categorySlug: 'biography',
    categories: [{ name: 'Biography', slug: 'biography' }],
    format: 'Paperback',
    rating: 4.8,
    reviewCount: 1203,
    featured: true,
    inStock: true,
    insight: 'Inspiring devotional stories',
  },
  {
    id: 'book-3',
    slug: 'perfect-questions-perfect-answers',
    title: 'Perfect Questions, Perfect Answers',
    author: 'Srila Prabhupada',
    authors: ['Srila Prabhupada'],
    price: 12.99,
    priceDisplay: '$12.99',
    description: "Essential conversations on life's most important questions",
    image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=400',
    category: 'Philosophy',
    categorySlug: 'philosophy',
    categories: [{ name: 'Philosophy', slug: 'philosophy' }],
    format: 'Paperback',
    rating: 4.7,
    reviewCount: 934,
    featured: true,
    inStock: true,
    insight: 'Perfect for curious minds',
  },
  {
    id: 'book-4',
    slug: 'the-science-of-self-realization',
    title: 'The Science of Self-Realization',
    author: 'Srila Prabhupada',
    authors: ['Srila Prabhupada'],
    price: 16.99,
    priceDisplay: '$16.99',
    description: 'Practical insights into spiritual consciousness',
    image: 'https://images.unsplash.com/photo-1526916027372-0c0852cef5d3?w=400',
    category: 'Self Mastery',
    categorySlug: 'self-mastery',
    categories: [{ name: 'Self Mastery', slug: 'self-mastery' }],
    format: 'Hardcover',
    rating: 4.8,
    reviewCount: 756,
    featured: true,
    inStock: true,
    insight: 'Practical daily guidance',
  },
];

type BestPlaceToStartProps = {
  books?: CatalogBook[];
};

export function BestPlaceToStart({ books = fallbackBooks }: BestPlaceToStartProps) {
  const { addToCart } = useCart();
  const beginnerBooks = books;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3AA7FF]/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3AA7FF]/10 border border-[#3AA7FF]/20 mb-4">
            <Sparkles className="w-4 h-4 text-[#3AA7FF]" />
            <span className="text-[#3AA7FF] text-sm" style={{ fontFamily: 'var(--font-nav)' }}>
              For Beginners
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            New Here? Start With These Books
          </h2>
          <p className="text-white/60 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
            Carefully selected to guide your first steps into spiritual wisdom
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {beginnerBooks.map((book, index) => (
            <motion.div
              key={book.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden">
                {/* Book Cover */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Beginner Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#3AA7FF] text-white text-xs font-medium backdrop-blur-sm">
                    Beginner Friendly
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Book Info */}
                <div className="p-6">
                  <h3
                    className="text-lg mb-1 text-white line-clamp-2"
                    style={{ fontFamily: 'var(--font-heading-secondary)' }}
                  >
                    {book.title}
                  </h3>
                  <p className="text-[#F5B84B] text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                    by {book.author}
                  </p>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2" style={{ fontFamily: 'var(--font-body)' }}>
                    {book.description}
                  </p>

                  {/* Price & Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-white text-xl" style={{ fontFamily: 'var(--font-nav)' }}>
                      {book.priceDisplay}
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <Eye className="w-5 h-5 text-white/70 hover:text-white" />
                      </button>
                      <button
                        onClick={() =>
                          addToCart({
                            id: book.id,
                            title: book.title,
                            author: book.author,
                            price: book.price,
                            image: book.image,
                            category: book.category,
                            format: book.format,
                            insight: book.insight,
                          })
                        }
                        className="p-2 rounded-full bg-[#3AA7FF] hover:bg-[#3AA7FF]/80 transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
