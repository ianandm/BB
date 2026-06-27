"use client";

import { motion } from 'motion/react';
import { Truck, Globe, Clock, Package, CheckCircle2 } from 'lucide-react';

const domesticZones = [
  { zone: 'Metro Cities (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata)', standard: '2–4 days', express: '1–2 days' },
  { zone: 'Tier 2 Cities', standard: '4–6 days', express: '2–3 days' },
  { zone: 'Tier 3 Cities & Towns', standard: '6–9 days', express: '3–5 days' },
  { zone: 'Remote Areas', standard: '10–14 days', express: 'Not available' },
];

const internationalZones = [
  { region: 'USA & Canada', time: '8–14 business days', cost: 'From ₹599' },
  { region: 'United Kingdom & Europe', time: '10–16 business days', cost: 'From ₹699' },
  { region: 'Australia & New Zealand', time: '10–16 business days', cost: 'From ₹699' },
  { region: 'Southeast Asia', time: '7–12 business days', cost: 'From ₹449' },
  { region: 'Middle East', time: '8–12 business days', cost: 'From ₹499' },
  { region: 'Rest of World', time: '14–21 business days', cost: 'From ₹799' },
];

export function ShippingPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h1 className="text-5xl sm:text-6xl mb-4 text-white" style={{ fontFamily: 'var(--font-heading)' }}>Shipping Information</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            We ship wisdom worldwide. Every order is handled with care and packed with intention.
          </p>
        </motion.div>

        <div className="space-y-10">
          {/* Free Shipping Banner */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-3xl bg-gradient-to-r from-[#3AA7FF]/10 to-[#F5B84B]/10 border border-[#3AA7FF]/20 flex items-center gap-5">
            <Truck className="w-10 h-10 text-[#3AA7FF] flex-shrink-0" />
            <div>
              <h3 className="text-white text-xl mb-1" style={{ fontFamily: 'var(--font-heading-secondary)' }}>Free Shipping on Orders Over ₹999</h3>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>Free standard shipping within India on all orders over ₹999. No code needed — applied automatically at checkout.</p>
            </div>
          </motion.div>

          {/* Domestic Shipping */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-[#F5B84B]" />
              <h2 className="text-2xl text-white" style={{ fontFamily: 'var(--font-heading-secondary)' }}>Domestic Shipping (India)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/50 pb-3 pr-6" style={{ fontFamily: 'var(--font-nav)' }}>Zone</th>
                    <th className="text-left text-white/50 pb-3 pr-6 whitespace-nowrap" style={{ fontFamily: 'var(--font-nav)' }}>Standard (Free–₹99)</th>
                    <th className="text-left text-white/50 pb-3 whitespace-nowrap" style={{ fontFamily: 'var(--font-nav)' }}>Express (₹199)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {domesticZones.map((z) => (
                    <tr key={z.zone}>
                      <td className="py-3 pr-6 text-white/70" style={{ fontFamily: 'var(--font-body)' }}>{z.zone}</td>
                      <td className="py-3 pr-6 text-[#3AA7FF]" style={{ fontFamily: 'var(--font-body)' }}>{z.standard}</td>
                      <td className="py-3 text-[#F5B84B]" style={{ fontFamily: 'var(--font-body)' }}>{z.express}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* International Shipping */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-[#3AA7FF]" />
              <h2 className="text-2xl text-white" style={{ fontFamily: 'var(--font-heading-secondary)' }}>International Shipping</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {internationalZones.map((z) => (
                <div key={z.region} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-white text-sm font-medium mb-1" style={{ fontFamily: 'var(--font-nav)' }}>{z.region}</h4>
                  <p className="text-white/50 text-xs mb-1" style={{ fontFamily: 'var(--font-body)' }}>{z.time}</p>
                  <p className="text-[#F5B84B] text-xs" style={{ fontFamily: 'var(--font-body)' }}>{z.cost}</p>
                </div>
              ))}
            </div>
            <p className="text-white/40 text-xs mt-4" style={{ fontFamily: 'var(--font-body)' }}>
              * International delivery times are estimates. Customs delays may occasionally extend delivery. Import duties are the responsibility of the recipient.
            </p>
          </motion.div>

          {/* Order Processing */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-[#F28C28]" />
              <h2 className="text-2xl text-white" style={{ fontFamily: 'var(--font-heading-secondary)' }}>Order Processing</h2>
            </div>
            <ul className="space-y-4">
              {[
                'Orders placed before 2pm IST on weekdays are processed the same day.',
                'Orders placed after 2pm, or on weekends and public holidays, are processed the next business day.',
                'You will receive a tracking number by email once your order has been dispatched.',
                'Pre-order items are shipped on their stated release date.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3AA7FF] flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm" style={{ fontFamily: 'var(--font-body)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
