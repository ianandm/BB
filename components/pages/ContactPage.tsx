"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 transition-all";

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h1 className="text-5xl sm:text-6xl mb-4 text-white" style={{ fontFamily: 'var(--font-heading)' }}>Get in Touch</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Whether you have a question about an order, need a book recommendation, or just want to say hello — we would love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Info Column */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-5">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
              <Mail className="w-6 h-6 text-[#3AA7FF] mb-3" />
              <h3 className="text-white mb-1" style={{ fontFamily: 'var(--font-heading-secondary)' }}>Email</h3>
              <p className="text-[#3AA7FF] text-sm" style={{ fontFamily: 'var(--font-body)' }}>support@bluishboy.com</p>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
              <MessageCircle className="w-6 h-6 text-[#F5B84B] mb-3" />
              <h3 className="text-white mb-1" style={{ fontFamily: 'var(--font-heading-secondary)' }}>Live Chat</h3>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>Available Mon–Fri, 9am–6pm IST</p>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
              <Clock className="w-6 h-6 text-[#F28C28] mb-3" />
              <h3 className="text-white mb-1" style={{ fontFamily: 'var(--font-heading-secondary)' }}>Response Time</h3>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>We reply within 24 hours on weekdays</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-2">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 rounded-3xl bg-white/5 border border-white/10">
                <CheckCircle2 className="w-16 h-16 text-[#3AA7FF] mb-5" />
                <h2 className="text-3xl text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Message Sent</h2>
                <p className="text-white/60 max-w-sm" style={{ fontFamily: 'var(--font-body)' }}>
                  Thank you for reaching out. We will get back to you within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/70 text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>Name</label>
                    <input required type="text" placeholder="Your name" className={inputClass} style={{ fontFamily: 'var(--font-body)' }}
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>Email</label>
                    <input required type="email" placeholder="your@email.com" className={inputClass} style={{ fontFamily: 'var(--font-body)' }}
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>Subject</label>
                  <select required className={inputClass + ' cursor-pointer'} style={{ fontFamily: 'var(--font-body)' }}
                    value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                    <option value="" className="bg-[#1A1F3A]">Select a topic</option>
                    <option value="order" className="bg-[#1A1F3A]">Order Enquiry</option>
                    <option value="return" className="bg-[#1A1F3A]">Return or Refund</option>
                    <option value="recommendation" className="bg-[#1A1F3A]">Book Recommendation</option>
                    <option value="wholesale" className="bg-[#1A1F3A]">Wholesale / Bulk Orders</option>
                    <option value="other" className="bg-[#1A1F3A]">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2" style={{ fontFamily: 'var(--font-body)' }}>Message</label>
                  <textarea required rows={5} placeholder="How can we help you?" className={inputClass + ' resize-none'} style={{ fontFamily: 'var(--font-body)' }}
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" className="w-full px-6 py-4 bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 rounded-full hover:shadow-lg hover:shadow-[#3AA7FF]/20 transition-all flex items-center justify-center gap-2">
                  <span className="text-white font-medium" style={{ fontFamily: 'var(--font-nav)' }}>Send Message</span>
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
