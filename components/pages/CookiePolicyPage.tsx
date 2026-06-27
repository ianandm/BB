"use client";

import { motion } from 'motion/react';
import { Cookie } from 'lucide-react';

const cookieTypes = [
  {
    type: 'Strictly Necessary',
    canDisable: false,
    color: '#3AA7FF',
    description: 'These cookies are essential for the website to function. They include cookies that enable you to log in, add items to your cart, and complete purchases.',
    examples: ['Session ID (keeps you logged in)', 'Cart token (remembers your cart contents)', 'CSRF token (protects form submissions)'],
  },
  {
    type: 'Performance & Analytics',
    canDisable: true,
    color: '#F5B84B',
    description: 'These cookies collect information about how visitors use our website — which pages are most popular, how long people spend reading, and where they come from.',
    examples: ['Google Analytics (_ga, _gid)', 'Page view counts', 'Session duration tracking'],
  },
  {
    type: 'Functional',
    canDisable: true,
    color: '#F28C28',
    description: 'These cookies remember your preferences and choices to provide a more personalised experience.',
    examples: ['Language preference', 'Recently viewed books', 'Newsletter dismissal'],
  },
  {
    type: 'Marketing',
    canDisable: true,
    color: '#3AA7FF',
    description: 'These cookies are used to show you relevant content and occasionally advertisements on other websites. We use these sparingly and only with trusted partners.',
    examples: ['Meta Pixel (retargeting)', 'Google Ads conversion tracking'],
  },
];

export function CookiePolicyPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-6 h-6 text-[#F5B84B]" />
            <span className="text-white/50 text-sm" style={{ fontFamily: 'var(--font-nav)' }}>Last updated: 1 June 2026</span>
          </div>
          <h1 className="text-5xl mb-5 text-white" style={{ fontFamily: 'var(--font-heading)' }}>Cookie Policy</h1>
          <p className="text-white/60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Cookies are small text files stored on your device when you visit a website. This policy explains which cookies we use, why we use them, and how you can control them.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* What are cookies */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-xl text-white mb-4" style={{ fontFamily: 'var(--font-heading-secondary)' }}>How We Use Cookies</h2>
            <p className="text-white/60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              We use cookies to make BluishBoy work better for you — remembering your cart, keeping you signed in, understanding how you use our site, and occasionally showing you relevant content elsewhere on the web. We do not use cookies to build advertising profiles or sell your data.
            </p>
          </motion.div>

          {/* Cookie types */}
          {cookieTypes.map((ct, i) => (
            <motion.div key={ct.type} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl text-white" style={{ fontFamily: 'var(--font-heading-secondary)' }}>{ct.type}</h2>
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: ct.canDisable ? 'rgba(255,255,255,0.05)' : `${ct.color}20`, color: ct.canDisable ? 'rgba(255,255,255,0.4)' : ct.color, border: `1px solid ${ct.canDisable ? 'rgba(255,255,255,0.1)' : ct.color + '40'}`, fontFamily: 'var(--font-nav)' }}
                >
                  {ct.canDisable ? 'Can be disabled' : 'Always active'}
                </span>
              </div>
              <p className="text-white/60 mb-5 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{ct.description}</p>
              <div>
                <p className="text-white/40 text-xs mb-2 uppercase tracking-widest" style={{ fontFamily: 'var(--font-nav)' }}>Examples</p>
                <ul className="space-y-1">
                  {ct.examples.map((ex) => (
                    <li key={ex} className="flex items-center gap-2 text-white/50 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                      <span style={{ color: ct.color }}>·</span> {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          {/* How to control */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <h2 className="text-xl text-white mb-4" style={{ fontFamily: 'var(--font-heading-secondary)' }}>How to Control Cookies</h2>
            <p className="text-white/60 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)' }}>
              You can manage cookie preferences through your browser settings. Most browsers allow you to block or delete cookies. Note that disabling certain cookies may affect the functionality of our website — your cart may not persist between sessions, for example.
            </p>
            <p className="text-white/60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              For more information on managing cookies in your browser, visit your browser's help documentation or <span className="text-[#3AA7FF]">www.aboutcookies.org</span>.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <p className="text-white/50 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
              Questions about this policy? Email <span className="text-[#3AA7FF]">privacy@bluishboy.com</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
