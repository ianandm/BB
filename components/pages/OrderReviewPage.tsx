"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Shield, RotateCcw, Truck, Headphones } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';

export function OrderReviewPage() {
  const { items, totalPrice } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0) router.replace('/cart');
  }, [items.length, router]);

  if (items.length === 0) return null;

  const categories = [...new Set(items.map(item => item.category))];
  const tax = totalPrice * 0.08;
  const total = totalPrice + tax;

  const handlePlaceOrder = () => {
    router.push('/order-confirmation');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Review Your Wisdom Library
          </h1>
          <p className="text-white/60 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
            One final look before you begin your journey
          </p>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 mb-8"
        >
          <h2
            className="text-2xl mb-6 text-white"
            style={{ fontFamily: 'var(--font-heading-secondary)' }}
          >
            Your Books
          </h2>
          <div className="grid gap-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-32 object-cover rounded-lg shadow-lg"
                />
                <div className="flex-1">
                  <h3
                    className="text-xl mb-2 text-white"
                    style={{ fontFamily: 'var(--font-heading-secondary)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#F5B84B] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                    by {item.author}
                  </p>
                  <p className="text-white/60 text-sm mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                    {item.format} • Qty: {item.quantity}
                  </p>
                  <p className="text-white text-lg" style={{ fontFamily: 'var(--font-nav)' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Journey Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-[#3AA7FF]/10 to-[#F5B84B]/10 border border-white/20 mb-8"
        >
          <h2
            className="text-2xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading-secondary)' }}
          >
            Your Learning Journey
          </h2>
          <p className="text-white/80 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
            Through these books you will explore:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {categories.map((category) => (
              <div key={category} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#3AA7FF]" />
                <span className="text-white" style={{ fontFamily: 'var(--font-body)' }}>
                  {category}
                </span>
              </div>
            ))}
          </div>
          <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
            Estimated reading journey: {items.reduce((sum, item) => sum + item.quantity, 0)} books over 3-6 months
          </p>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 mb-8"
        >
          <h2
            className="text-2xl mb-6 text-white"
            style={{ fontFamily: 'var(--font-heading-secondary)' }}
          >
            Order Summary
          </h2>
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-white/70">
              <span style={{ fontFamily: 'var(--font-body)' }}>Subtotal</span>
              <span className="text-white">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-white/70">
              <span style={{ fontFamily: 'var(--font-body)' }}>Shipping</span>
              <span className="text-white">FREE</span>
            </div>
            <div className="flex items-center justify-between text-white/70">
              <span style={{ fontFamily: 'var(--font-body)' }}>Tax</span>
              <span className="text-white">${tax.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <span className="text-2xl text-white" style={{ fontFamily: 'var(--font-heading-secondary)' }}>
              Total
            </span>
            <span className="text-3xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              ${total.toFixed(2)}
            </span>
          </div>
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-center">
            <Shield className="w-8 h-8 text-[#3AA7FF] mx-auto mb-2" />
            <p className="text-white/80 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              Secure Purchase
            </p>
          </div>
          <div className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-center">
            <RotateCcw className="w-8 h-8 text-[#F5B84B] mx-auto mb-2" />
            <p className="text-white/80 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              30-Day Returns
            </p>
          </div>
          <div className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-center">
            <Truck className="w-8 h-8 text-[#F28C28] mx-auto mb-2" />
            <p className="text-white/80 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              Free Shipping
            </p>
          </div>
          <div className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-center">
            <Headphones className="w-8 h-8 text-[#3AA7FF] mx-auto mb-2" />
            <p className="text-white/80 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              24/7 Support
            </p>
          </div>
        </motion.div>

        {/* Place Order Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={handlePlaceOrder}
            className="group relative px-12 py-5 bg-gradient-to-r from-[#3AA7FF] to-[#F5B84B] rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#3AA7FF]/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5B84B] to-[#3AA7FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-white text-lg font-medium flex items-center gap-3" style={{ fontFamily: 'var(--font-nav)' }}>
              Begin My Journey
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <p className="text-white/60 text-sm mt-4" style={{ fontFamily: 'var(--font-body)' }}>
            By placing your order, you agree to our terms and conditions
          </p>
        </motion.div>
      </div>
    </div>
  );
}
