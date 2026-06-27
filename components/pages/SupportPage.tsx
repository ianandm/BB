"use client";

import { motion } from 'motion/react';
import { MessageCircle, Mail, Truck, RotateCcw, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const tiles = [
  { icon: Mail, color: '#3AA7FF', title: 'Contact Us', description: 'Send us a message — our team responds within 24 hours on weekdays.', to: '/contact' },
  { icon: Truck, color: '#F5B84B', title: 'Shipping Information', description: "Delivery timelines, tracking, and international shipping details.", to: '/shipping' },
  { icon: RotateCcw, color: '#F28C28', title: 'Returns & Refunds', description: 'Changed your mind? Our 30-day no-hassle return policy has you covered.', to: '/returns' },
  { icon: HelpCircle, color: '#3AA7FF', title: 'FAQ', description: 'Quick answers to the most common questions from our readers.', to: '/faq' },
  { icon: MessageCircle, color: '#F5B84B', title: 'Community', description: 'Connect with fellow readers, join reading challenges, and share your journey.', to: '/community' },
];

export function SupportPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h1 className="text-5xl sm:text-6xl mb-5 text-white" style={{ fontFamily: 'var(--font-heading)' }}>How Can We Help?</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            We are here for every part of your journey — before, during, and after your purchase.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {tiles.map((tile, i) => {
            const Icon = tile.icon;
            return (
              <motion.div
                key={tile.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href={tile.to} className="group block p-7 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${tile.color}20` }}>
                      <Icon className="w-6 h-6" style={{ color: tile.color }} />
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-xl text-white mb-2" style={{ fontFamily: 'var(--font-heading-secondary)' }}>{tile.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{tile.description}</p>
                </Link>
              </motion.div>
            );
          })}

          {/* Direct chat tile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="p-7 rounded-3xl bg-gradient-to-br from-[#3AA7FF]/10 to-[#F5B84B]/10 border border-white/20 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl text-white mb-2" style={{ fontFamily: 'var(--font-heading-secondary)' }}>Still need help?</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-5" style={{ fontFamily: 'var(--font-body)' }}>
                Email us directly at <span className="text-[#3AA7FF]">support@bluishboy.com</span> or use the contact form and we will get back to you within one business day.
              </p>
            </div>
            <Link href="/contact">
              <button className="w-full px-5 py-3 rounded-full bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 text-white text-sm font-medium hover:shadow-lg hover:shadow-[#3AA7FF]/20 transition-all" style={{ fontFamily: 'var(--font-nav)' }}>
                Send a Message
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
