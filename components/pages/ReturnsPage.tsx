"use client";

import { motion } from 'motion/react';
import { RotateCcw, CheckCircle2, XCircle, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { step: '1', title: 'Contact Us', body: 'Email support@bluishboy.com within 30 days of delivery with your order number and the reason for your return.' },
  { step: '2', title: 'Receive Return Label', body: "We'll send you a prepaid return shipping label by email within one business day." },
  { step: '3', title: 'Pack & Ship', body: 'Repack the books securely in the original packaging (or similar protective packaging) and drop off at any courier point.' },
  { step: '4', title: 'Refund Processed', body: "Once we receive the returned items, your refund is processed within 5–7 business days to the original payment method." },
];

const eligible = [
  'Books in original, unread condition with no markings or damage',
  'Items received in a damaged or defective state',
  'Wrong items sent',
  'Orders that have not been opened',
];

const ineligible = [
  'Books with highlighted text, notes, or bent pages',
  'Items returned after 30 days of delivery',
  'Digital downloads or e-books',
  'Gift cards and vouchers',
];

export function ReturnsPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h1 className="text-5xl sm:text-6xl mb-4 text-white" style={{ fontFamily: 'var(--font-heading)' }}>Returns & Refunds</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Your satisfaction matters to us. If something is not right, we will make it right — no complicated forms, no hassle.
          </p>
        </motion.div>

        <div className="space-y-10">
          {/* Policy highlight */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-3xl bg-gradient-to-r from-[#F5B84B]/10 to-[#F28C28]/10 border border-[#F5B84B]/20 flex items-center gap-5">
            <RotateCcw className="w-10 h-10 text-[#F5B84B] flex-shrink-0" />
            <div>
              <h3 className="text-white text-xl mb-1" style={{ fontFamily: 'var(--font-heading-secondary)' }}>30-Day Returns, No Questions Asked</h3>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                If you change your mind for any reason, return eligible items within 30 days of delivery for a full refund.
              </p>
            </div>
          </motion.div>

          {/* Process steps */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-7">
              <Package className="w-6 h-6 text-[#3AA7FF]" />
              <h2 className="text-2xl text-white" style={{ fontFamily: 'var(--font-heading-secondary)' }}>How to Return an Item</h2>
            </div>
            <div className="space-y-4">
              {steps.map((s) => (
                <div key={s.step} className="flex gap-5 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-full bg-[#3AA7FF]/20 flex items-center justify-center text-[#3AA7FF] text-sm font-medium flex-shrink-0" style={{ fontFamily: 'var(--font-nav)' }}>
                    {s.step}
                  </div>
                  <div>
                    <h4 className="text-white mb-1" style={{ fontFamily: 'var(--font-heading-secondary)' }}>{s.title}</h4>
                    <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Eligible / Ineligible */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-6">
            <div className="p-7 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-white mb-5 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading-secondary)' }}>
                <CheckCircle2 className="w-5 h-5 text-[#3AA7FF]" /> Eligible for Return
              </h3>
              <ul className="space-y-3">
                {eligible.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    <span className="text-[#3AA7FF] mt-0.5">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-7 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-white mb-5 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading-secondary)' }}>
                <XCircle className="w-5 h-5 text-red-400" /> Not Eligible
              </h3>
              <ul className="space-y-3">
                {ineligible.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    <span className="text-red-400/70 mt-0.5">✕</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
            className="text-center p-8 rounded-3xl bg-white/5 border border-white/10">
            <h3 className="text-white text-xl mb-3" style={{ fontFamily: 'var(--font-heading-secondary)' }}>Ready to Start a Return?</h3>
            <p className="text-white/60 text-sm mb-5" style={{ fontFamily: 'var(--font-body)' }}>Contact our support team and we will take care of the rest.</p>
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 rounded-full hover:shadow-lg hover:shadow-[#3AA7FF]/20 transition-all">
                <span className="text-white font-medium" style={{ fontFamily: 'var(--font-nav)' }}>Contact Support</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
