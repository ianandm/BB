"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import { ShoppingBag, Trash2, Heart, ArrowRight, Shield, RotateCcw, Users, Lock } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';

const recommendedBooks = [
  {
    id: 'rec-3',
    title: 'The Nectar of Devotion',
    author: 'Srila Prabhupada',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1534289907116-888fe70c4806?w=400',
    category: 'Devotion',
    format: 'Hardcover',
    insight: 'Complete your devotional practice',
  },
  {
    id: 'rec-4',
    title: 'Krishna Book',
    author: 'Srila Prabhupada',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1489421471208-251cc68284b8?w=400',
    category: 'Stories',
    format: 'Hardcover',
    insight: 'Enchanting stories of Lord Krishna',
  },
];

export function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, addToCart } = useCart();

  // If cart is empty, show empty state
  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingBag className="w-24 h-24 text-white/20 mx-auto mb-6" />
            <h1
              className="text-4xl mb-4 text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Your Wisdom Library is Empty
            </h1>
            <p className="text-white/60 text-lg mb-8" style={{ fontFamily: 'var(--font-body)' }}>
              Start your spiritual journey by adding books to your cart
            </p>
            <Link href="/">
              <button className="px-8 py-4 bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 rounded-full hover:shadow-lg hover:shadow-[#3AA7FF]/20 transition-all">
                <span className="text-white font-medium" style={{ fontFamily: 'var(--font-nav)' }}>
                  Explore Books
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // Get unique categories from cart items
  const categories = [...new Set(items.map(item => item.category))];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1
            className="text-4xl sm:text-5xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Your Wisdom Library
          </h1>
          <p className="text-white/60 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
            Review the books selected for your journey
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex gap-6">
                  {/* Book Cover */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-44 object-cover rounded-2xl shadow-lg"
                  />

                  {/* Book Info */}
                  <div className="flex-1">
                    <h3
                      className="text-2xl mb-2 text-white"
                      style={{ fontFamily: 'var(--font-heading-secondary)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[#F5B84B] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                      by {item.author}
                    </p>
                    <p className="text-white/60 text-sm mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                      {item.format} • {item.category}
                    </p>

                    {/* Insight */}
                    {item.insight && (
                      <div className="p-3 rounded-xl bg-[#3AA7FF]/10 border border-[#3AA7FF]/20 mb-4">
                        <p className="text-white/80 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                          <strong className="text-[#3AA7FF]">Why readers choose this:</strong> {item.insight}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Quantity */}
                        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-white/70 hover:text-white transition-colors"
                          >
                            <span className="text-xl">−</span>
                          </button>
                          <span className="text-white w-8 text-center" style={{ fontFamily: 'var(--font-nav)' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-white/70 hover:text-white transition-colors"
                          >
                            <span className="text-xl">+</span>
                          </button>
                        </div>

                        {/* Save for Later */}
                        <button className="p-2 rounded-full hover:bg-white/10 transition-colors group">
                          <Heart className="w-5 h-5 text-white/60 group-hover:text-[#F5B84B] transition-colors" />
                        </button>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 rounded-full hover:bg-white/10 transition-colors group"
                        >
                          <Trash2 className="w-5 h-5 text-white/60 group-hover:text-red-400 transition-colors" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-2xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                            ${item.price} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10"
            >
              <h3
                className="text-2xl mb-6 text-white"
                style={{ fontFamily: 'var(--font-heading-secondary)' }}
              >
                Complete Your Journey
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {recommendedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#3AA7FF]/30 transition-all group"
                  >
                    <div className="flex gap-3 mb-3">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-16 h-22 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm mb-1 line-clamp-2" style={{ fontFamily: 'var(--font-heading-secondary)' }}>
                          {book.title}
                        </h4>
                        <p className="text-white/60 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                          {book.author}
                        </p>
                      </div>
                    </div>
                    <p className="text-white/60 text-xs mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                      {book.insight}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white" style={{ fontFamily: 'var(--font-nav)' }}>
                        ${book.price}
                      </span>
                      <button
                        onClick={() => addToCart(book)}
                        className="px-4 py-2 rounded-full bg-[#3AA7FF]/20 text-[#3AA7FF] text-sm hover:bg-[#3AA7FF]/30 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Value Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24 p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20"
            >
              <h3
                className="text-xl mb-6 text-white"
                style={{ fontFamily: 'var(--font-heading-secondary)' }}
              >
                Your Reading Journey Includes
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-white/70">
                  <span style={{ fontFamily: 'var(--font-body)' }}>Total books</span>
                  <span className="text-white font-medium">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span style={{ fontFamily: 'var(--font-body)' }}>Categories</span>
                  <span className="text-white font-medium">{categories.length}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#3AA7FF]/10 border border-[#3AA7FF]/20 mb-6">
                <p className="text-white/80 text-sm mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                  <strong className="text-white">You are building a library focused on:</strong>
                </p>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category} className="flex items-center gap-2 text-white/70 text-sm">
                      <span className="text-[#3AA7FF]">✓</span>
                      <span style={{ fontFamily: 'var(--font-body)' }}>{category}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Summary */}
              <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center justify-between text-white/70">
                  <span style={{ fontFamily: 'var(--font-body)' }}>Subtotal</span>
                  <span className="text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span style={{ fontFamily: 'var(--font-body)' }}>Shipping</span>
                  <span className="text-white">FREE</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <span className="text-xl text-white" style={{ fontFamily: 'var(--font-heading-secondary)' }}>
                  Total
                </span>
                <span className="text-3xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <Link href="/checkout">
                <button className="w-full px-6 py-4 bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 rounded-full hover:shadow-lg hover:shadow-[#3AA7FF]/20 transition-all mb-3">
                  <span className="text-white font-medium flex items-center justify-center gap-2" style={{ fontFamily: 'var(--font-nav)' }}>
                    Proceed To Checkout
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </button>
              </Link>

              <Link href="/">
                <button className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition-all">
                  <span className="text-white/90 font-medium" style={{ fontFamily: 'var(--font-nav)' }}>
                    Continue Exploring
                  </span>
                </button>
              </Link>
            </motion.div>

            {/* Trust Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#3AA7FF] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white text-sm font-medium mb-1">Secure Checkout</h4>
                    <p className="text-white/60 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                      Encrypted payments
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="w-5 h-5 text-[#F5B84B] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white text-sm font-medium mb-1">Easy Returns</h4>
                    <p className="text-white/60 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                      30-day return policy
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#F28C28] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white text-sm font-medium mb-1">Trusted Worldwide</h4>
                    <p className="text-white/60 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                      By thousands of readers
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
