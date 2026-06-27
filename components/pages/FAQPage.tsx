"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

const faqs = [
  {
    category: 'Orders & Shipping',
    items: [
      { q: 'How long will my order take to arrive?', a: 'Domestic orders typically arrive within 2–9 business days depending on your location. Metro cities receive orders in 2–4 days. International orders take 8–21 business days. You will receive a tracking number by email once your order ships.' },
      { q: 'Do you offer free shipping?', a: 'Yes! All domestic orders over ₹999 qualify for free standard shipping. The discount is applied automatically at checkout — no code required.' },
      { q: 'Can I change or cancel my order after placing it?', a: 'Orders can be changed or cancelled within 2 hours of placement. After that, they enter our fulfilment process. Please email support@bluishboy.com immediately and we will do our best to help.' },
      { q: 'Do you ship internationally?', a: 'Yes, we ship to over 60 countries worldwide. International shipping rates and times vary by region — see our Shipping page for a full breakdown.' },
      { q: 'My order has not arrived. What should I do?', a: 'First, check your tracking number (sent by email). If your tracking shows delivered but you have not received the package, or if delivery is significantly delayed, contact us at support@bluishboy.com and we will investigate.' },
    ],
  },
  {
    category: 'Books & Products',
    items: [
      { q: 'Are all books the official translations by Srila Prabhupada?', a: "Where we sell Bhaktivedanta Book Trust (BBT) publications, yes — these are the authorised translations with full purports. We clearly label the edition and translator on each product page." },
      { q: 'Do you sell e-books or digital downloads?', a: 'Currently we focus on physical books. We believe the act of holding a book is itself part of the reading practice. That said, we are exploring digital options and will announce them in our newsletter when available.' },
      { q: 'Can I request a book that is not in your catalogue?', a: 'Absolutely. Email us at support@bluishboy.com with the title and author and we will do our best to source it. If there is enough interest in a title, we will add it to the main catalogue.' },
      { q: 'Are the books suitable for complete beginners?', a: 'Many are, and we have created Reading Paths specifically to help beginners start in the right place. We recommend Perfect Questions, Perfect Answers as the ideal first book for most new readers.' },
    ],
  },
  {
    category: 'Returns & Payments',
    items: [
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery for items in original, unread condition. See our Returns page for the full policy and step-by-step process.' },
      { q: 'How long does a refund take?', a: 'Once we receive and inspect the returned item, your refund is processed within 5–7 business days. It may take a further 3–5 business days to appear on your statement depending on your bank.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards, UPI, net banking, Apple Pay, Google Pay, and PayPal. All payments are encrypted and processed securely.' },
      { q: 'Is it safe to pay on your website?', a: 'Yes. Our checkout is encrypted with SSL and we never store your card details. We use industry-standard payment processors trusted by millions of customers worldwide.' },
    ],
  },
  {
    category: 'Account & Community',
    items: [
      { q: 'Do I need to create an account to buy?', a: 'No. Guest checkout is fully supported. Creating an account is optional — it lets you track orders, save wishlists, and receive personalised recommendations, but it is never required.' },
      { q: 'How do I join the BluishBoy reading community?', a: 'Visit our Community page to explore reading challenges, discussion forums, and the newsletter. Everything is free to join and open to readers at all levels.' },
      { q: 'I want to gift a book. Do you offer gift wrapping?', a: 'Yes! At checkout, select "This is a gift" and you can add a gift message. We will include a handwritten note with your message and beautiful packaging at no extra charge.' },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className="text-white/90 group-hover:text-white transition-colors" style={{ fontFamily: 'var(--font-body)' }}>{q}</span>
        <ChevronDown className={`w-5 h-5 text-white/40 flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-5 -mt-1">
          <p className="text-white/60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export function FAQPage() {
  const [search, setSearch] = useState('');

  const filtered = faqs.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        !search ||
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((s) => s.items.length > 0);

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5">
            <HelpCircle className="w-4 h-4 text-[#3AA7FF]" />
            <span className="text-white/70 text-sm" style={{ fontFamily: 'var(--font-nav)' }}>Quick answers</span>
          </div>
          <h1 className="text-5xl sm:text-6xl mb-5 text-white" style={{ fontFamily: 'var(--font-heading)' }}>Frequently Asked Questions</h1>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 transition-all"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </div>
        </motion.div>

        <div className="space-y-8">
          {filtered.map((section, i) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10"
            >
              <h2 className="text-xl text-white mb-4" style={{ fontFamily: 'var(--font-heading-secondary)' }}>{section.category}</h2>
              <div>
                {section.items.map((item) => <FAQItem key={item.q} q={item.q} a={item.a} />)}
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/40 text-lg" style={{ fontFamily: 'var(--font-body)' }}>No results for "{search}"</p>
            </div>
          )}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mt-10 text-center p-8 rounded-3xl bg-white/5 border border-white/10">
          <p className="text-white/60 mb-4" style={{ fontFamily: 'var(--font-body)' }}>Did not find what you were looking for?</p>
          <a href="mailto:support@bluishboy.com" className="text-[#3AA7FF] hover:underline" style={{ fontFamily: 'var(--font-nav)' }}>
            support@bluishboy.com
          </a>
        </motion.div>
      </div>
    </div>
  );
}
