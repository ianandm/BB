"use client";

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Mail, Truck, Package, Home, BookOpen, Users, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useCart, type CartItem } from '@/components/cart/CartProvider';

export function OrderConfirmationPage() {
  const { items, clearCart, totalPrice } = useCart();
  const [orderItems] = useState<CartItem[]>(() => [...items]);
  const [orderTotal] = useState(() => totalPrice);
  const [orderNumber] = useState(
    () => 'BB' + Math.random().toString(36).substring(2, 11).toUpperCase(),
  );

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const categories =
    orderItems.length > 0
      ? [...new Set(orderItems.map((item) => item.category))]
      : [];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Sacred Geometry Animation */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3AA7FF]/20 to-[#F5B84B]/20 blur-xl"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3AA7FF]/20 to-[#F5B84B]/20 flex items-center justify-center border border-white/20 backdrop-blur-sm"
            >
              <CheckCircle2 className="w-16 h-16 text-[#3AA7FF]" />
            </motion.div>
          </div>

          <h1
            className="text-4xl sm:text-5xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Welcome To Your Next Chapter
          </h1>
          <p className="text-white/60 text-lg mb-2" style={{ fontFamily: 'var(--font-body)' }}>
            Your order has been confirmed
          </p>
          <p className="text-[#3AA7FF] text-sm" style={{ fontFamily: 'var(--font-nav)' }}>
            Order #{orderNumber}
          </p>
        </motion.div>

        {/* Confirmation Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <Mail className="w-6 h-6 text-[#3AA7FF] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl text-white mb-1" style={{ fontFamily: 'var(--font-heading-secondary)' }}>
                Confirmation Email Sent
              </h3>
              <p className="text-white/60" style={{ fontFamily: 'var(--font-body)' }}>
                We've sent order details and tracking information to your email
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Truck className="w-6 h-6 text-[#F5B84B] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl text-white mb-1" style={{ fontFamily: 'var(--font-heading-secondary)' }}>
                Estimated Delivery
              </h3>
              <p className="text-white/60" style={{ fontFamily: 'var(--font-body)' }}>
                Your books will arrive within 5-7 business days
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
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
            What Happens Next
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#3AA7FF]/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-[#3AA7FF]" />
              </div>
              <div>
                <h4 className="text-white mb-1" style={{ fontFamily: 'var(--font-nav)' }}>
                  Order Received
                </h4>
                <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                  We've received your order and are preparing it for shipment
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                <Package className="w-6 h-6 text-white/60" />
              </div>
              <div>
                <h4 className="text-white mb-1" style={{ fontFamily: 'var(--font-nav)' }}>
                  Processing
                </h4>
                <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                  Your books are being carefully packaged (1-2 days)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                <Truck className="w-6 h-6 text-white/60" />
              </div>
              <div>
                <h4 className="text-white mb-1" style={{ fontFamily: 'var(--font-nav)' }}>
                  Shipping
                </h4>
                <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                  On its way to you with tracking updates
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                <Home className="w-6 h-6 text-white/60" />
              </div>
              <div>
                <h4 className="text-white mb-1" style={{ fontFamily: 'var(--font-nav)' }}>
                  Delivered
                </h4>
                <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                  Your wisdom library arrives at your door
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Begin Learning Today */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-[#3AA7FF]/10 to-[#F5B84B]/10 border border-white/20 mb-8"
        >
          <h2
            className="text-2xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading-secondary)' }}
          >
            Begin Learning Today
          </h2>
          <p className="text-white/80 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
            While your books arrive, start your spiritual journey with these resources
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#3AA7FF]/30 transition-all cursor-pointer group">
              <BookOpen className="w-8 h-8 text-[#3AA7FF] mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="text-white mb-1" style={{ fontFamily: 'var(--font-heading-secondary)' }}>
                Intro Articles
              </h4>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                Explore foundational concepts
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F5B84B]/30 transition-all cursor-pointer group">
              <Calendar className="w-8 h-8 text-[#F5B84B] mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="text-white mb-1" style={{ fontFamily: 'var(--font-heading-secondary)' }}>
                Reading Guides
              </h4>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                Structured learning paths
              </p>
            </div>
          </div>
        </motion.div>

        {/* Recommended Reading Path */}
        {orderItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 mb-8"
          >
            <h2
              className="text-2xl mb-4 text-white"
              style={{ fontFamily: 'var(--font-heading-secondary)' }}
            >
              Your Personalized Reading Journey
            </h2>
            <p className="text-white/60 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
              Based on your selections, we've created a suggested reading path:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#3AA7FF]/20 flex items-center justify-center text-[#3AA7FF] text-sm font-medium">
                    1
                  </div>
                  <h4 className="text-white" style={{ fontFamily: 'var(--font-heading-secondary)' }}>
                    Week 1-2: Foundation
                  </h4>
                </div>
                <p className="text-white/60 text-sm ml-11" style={{ fontFamily: 'var(--font-body)' }}>
                  {orderItems[0]?.title || 'Start with your first book'} - Read chapters 1-3
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#F5B84B]/20 flex items-center justify-center text-[#F5B84B] text-sm font-medium">
                    2
                  </div>
                  <h4 className="text-white" style={{ fontFamily: 'var(--font-heading-secondary)' }}>
                    Week 3-4: Deepening
                  </h4>
                </div>
                <p className="text-white/60 text-sm ml-11" style={{ fontFamily: 'var(--font-body)' }}>
                  Continue with reflective exercises and daily practice
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#F28C28]/20 flex items-center justify-center text-[#F28C28] text-sm font-medium">
                    3
                  </div>
                  <h4 className="text-white" style={{ fontFamily: 'var(--font-heading-secondary)' }}>
                    Week 5+: Expansion
                  </h4>
                </div>
                <p className="text-white/60 text-sm ml-11" style={{ fontFamily: 'var(--font-body)' }}>
                  {orderItems[1]?.title || 'Move to your next book'} - Build on your foundation
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Community Invitation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 text-center mb-8"
        >
          <Users className="w-12 h-12 text-[#3AA7FF] mx-auto mb-4" />
          <h2
            className="text-2xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading-secondary)' }}
          >
            Continue Your Journey With Us
          </h2>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Join thousands of readers in our community. Receive weekly wisdom, reading challenges, and spiritual guidance.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 rounded-full hover:shadow-lg hover:shadow-[#3AA7FF]/20 transition-all">
            <span className="text-white font-medium" style={{ fontFamily: 'var(--font-nav)' }}>
              Subscribe to Newsletter
            </span>
          </button>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <Link href="/">
            <button className="px-8 py-4 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition-all">
              <span className="text-white/90 font-medium" style={{ fontFamily: 'var(--font-nav)' }}>
                Continue Exploring
              </span>
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

