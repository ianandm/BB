"use client";

import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';

const recommendedBooks = [
  {
    id: 'rec-1',
    title: 'Journey of Self Discovery',
    author: 'Srila Prabhupada',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=400',
    category: 'Self Mastery',
    format: 'Hardcover',
    why: 'Perfect companion to the Bhagavad Gita',
  },
  {
    id: 'rec-2',
    title: 'Perfect Questions, Perfect Answers',
    author: 'Srila Prabhupada',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=400',
    category: 'Philosophy',
    format: 'Paperback',
    why: 'Great for understanding spiritual concepts',
  },
];

export function MiniCart() {
  const { items, isCartOpen, closeCart, updateQuantity, addToCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        style={{ opacity: isCartOpen ? 1 : 0, pointerEvents: isCartOpen ? 'auto' : 'none' }}
      />

      {/* Side Panel */}
      <div
        className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#1A1F3A] z-50 overflow-y-auto transition-transform duration-300 ease-in-out"
        style={{ transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="relative min-h-full">
          {/* Header */}
          <div className="sticky top-0 z-10 backdrop-blur-xl bg-[#1A1F3A]/90 border-b border-white/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <h2
                className="text-2xl text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Added To Your Library
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white/70" />
              </button>
            </div>
            <p className="text-white/60" style={{ fontFamily: 'var(--font-body)' }}>
              One step closer to timeless wisdom.
            </p>
          </div>

          {/* Cart Items */}
          <div className="p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60" style={{ fontFamily: 'var(--font-body)' }}>
                  Your library is empty
                </p>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-28 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3
                        className="text-white text-sm mb-1"
                        style={{ fontFamily: 'var(--font-heading-secondary)' }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-[#F5B84B] text-xs mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                        {item.author}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-white" style={{ fontFamily: 'var(--font-nav)' }}>
                          ${item.price}
                        </span>
                        <div className="flex items-center gap-2 bg-white/5 rounded-full p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <Minus className="w-3 h-3 text-white" />
                          </button>
                          <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
                          >
                            <Plus className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Recommendations */}
                <div className="pt-6 border-t border-white/10">
                  <h3
                    className="text-white text-lg mb-4"
                    style={{ fontFamily: 'var(--font-heading-secondary)' }}
                  >
                    You May Also Enjoy
                  </h3>
                  <div className="space-y-4">
                    {recommendedBooks.slice(0, 2).map((book) => (
                      <div
                        key={book.id}
                        className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#3AA7FF]/30 transition-all group"
                      >
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm mb-1 line-clamp-1" style={{ fontFamily: 'var(--font-heading-secondary)' }}>
                            {book.title}
                          </h4>
                          <p className="text-white/60 text-xs mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                            {book.why}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-white text-sm" style={{ fontFamily: 'var(--font-nav)' }}>
                              ${book.price}
                            </span>
                            <button
                              onClick={() => addToCart({ ...book, insight: book.why })}
                              className="px-3 py-1 rounded-full bg-[#3AA7FF]/20 text-[#3AA7FF] text-xs hover:bg-[#3AA7FF]/30 transition-colors"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="sticky bottom-0 backdrop-blur-xl bg-[#1A1F3A]/90 border-t border-white/10 p-6 space-y-3">
              <Link href="/cart" onClick={closeCart}>
                <button className="w-full px-6 py-4 bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 rounded-full hover:shadow-lg hover:shadow-[#3AA7FF]/20 transition-all">
                  <span className="text-white font-medium flex items-center justify-center gap-2" style={{ fontFamily: 'var(--font-nav)' }}>
                    View Cart
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </button>
              </Link>
              <button
                onClick={closeCart}
                className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition-all"
              >
                <span className="text-white/90 font-medium" style={{ fontFamily: 'var(--font-nav)' }}>
                  Continue Exploring
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
