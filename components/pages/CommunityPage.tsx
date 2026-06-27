"use client";

import { motion } from 'motion/react';
import { Users, BookOpen, MessageCircle, Star, ArrowRight, Heart, Calendar } from 'lucide-react';

const challenges = [
  {
    title: '30-Day Gita Challenge',
    description: 'One chapter a day. A reflection prompt each morning. Join 4,200 readers who have completed this challenge and transformed their daily practice.',
    participants: '4,200+',
    duration: '30 days',
    color: '#3AA7FF',
    status: 'Ongoing',
  },
  {
    title: 'Bhagavatam Reading Circle',
    description: 'A slow, deep reading of the Srimad Bhagavatam — one canto per month, with weekly discussion threads and live Q&A sessions.',
    participants: '1,800+',
    duration: 'Monthly',
    color: '#F5B84B',
    status: 'Open',
  },
  {
    title: 'New Seeker Cohort',
    description: 'Never read Vedic literature before? Join our guided 8-week onboarding with a curated reading list, a mentor, and a small group of fellow beginners.',
    participants: '600+ alumni',
    duration: '8 weeks',
    color: '#F28C28',
    status: 'Starting Soon',
  },
];

const discussions = [
  { title: 'How do you integrate the Gita teachings into a busy work life?', replies: 47, category: 'Practice' },
  { title: "Chapter 2 vs Chapter 18 — which speaks to you more, and why?", replies: 31, category: 'Philosophy' },
  { title: 'Best edition of the Bhagavatam for someone coming from Christianity?', replies: 28, category: 'Book Help' },
  { title: 'Share your morning spiritual practice — what does it look like?', replies: 64, category: 'Community' },
  { title: "Hanuman's devotion vs Arjuna's — two models of relationship with the Divine", replies: 22, category: 'Philosophy' },
];

export function CommunityPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen">

      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5">
            <Users className="w-4 h-4 text-[#3AA7FF]" />
            <span className="text-white/70 text-sm" style={{ fontFamily: 'var(--font-nav)' }}>200,000+ seekers worldwide</span>
          </div>
          <h1 className="text-5xl sm:text-6xl mb-5 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            You Are Not Alone on This Path
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            The spiritual path is richer when walked together. Join a global community of readers, seekers, and devotees — sharing questions, insights, and encouragement.
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { value: '200K+', label: 'Active Members', color: '#3AA7FF' },
            { value: '60+', label: 'Countries', color: '#F5B84B' },
            { value: '12K+', label: 'Discussion Posts', color: '#F28C28' },
            { value: '98%', label: 'Would Recommend', color: '#3AA7FF' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center"
            >
              <div className="text-3xl mb-1" style={{ fontFamily: 'var(--font-heading)', color: stat.color }}>{stat.value}</div>
              <p className="text-white/50 text-sm" style={{ fontFamily: 'var(--font-body)' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reading Challenges */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Reading Challenges</h2>
        <p className="text-white/50 mb-8" style={{ fontFamily: 'var(--font-body)' }}>Structured group journeys with community support at every step.</p>
        <div className="grid lg:grid-cols-3 gap-6">
          {challenges.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-7 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block" style={{ background: `${c.color}20`, color: c.color, border: `1px solid ${c.color}40`, fontFamily: 'var(--font-nav)' }}>{c.status}</span>
                  <h3 className="text-xl text-white" style={{ fontFamily: 'var(--font-heading-secondary)' }}>{c.title}</h3>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-5 flex-1" style={{ fontFamily: 'var(--font-body)' }}>{c.description}</p>
              <div className="flex items-center justify-between mb-5 text-xs text-white/40" style={{ fontFamily: 'var(--font-body)' }}>
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {c.participants}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {c.duration}</span>
              </div>
              <button className="w-full px-5 py-3 rounded-full text-sm font-medium transition-all hover:opacity-90" style={{ background: `${c.color}20`, color: c.color, border: `1px solid ${c.color}40`, fontFamily: 'var(--font-nav)' }}>
                Join Challenge
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Discussions */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Community Discussions</h2>
        <p className="text-white/50 mb-8" style={{ fontFamily: 'var(--font-body)' }}>Real conversations from real readers across the world.</p>
        <div className="space-y-3">
          {discussions.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 cursor-pointer transition-all"
            >
              <div className="flex items-start gap-4">
                <MessageCircle className="w-5 h-5 text-white/30 group-hover:text-[#3AA7FF] transition-colors flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-sm group-hover:text-[#3AA7FF] transition-colors mb-1" style={{ fontFamily: 'var(--font-heading-secondary)' }}>{d.title}</h4>
                  <span className="text-white/40 text-xs" style={{ fontFamily: 'var(--font-nav)' }}>{d.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-xs flex-shrink-0 ml-4">
                <span style={{ fontFamily: 'var(--font-body)' }}>{d.replies} replies</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Join CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-12 rounded-3xl bg-gradient-to-br from-[#3AA7FF]/10 to-[#F5B84B]/10 border border-white/20"
        >
          <Heart className="w-12 h-12 text-[#F28C28] mx-auto mb-5 opacity-80" />
          <h2 className="text-3xl text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Continue Your Journey With Us
          </h2>
          <p className="text-white/60 mb-7 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Join the newsletter for weekly wisdom, reading challenges, and community events — delivered with the same care as every book we carry.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 bg-white/5 border border-white/15 rounded-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 text-sm"
              style={{ fontFamily: 'var(--font-body)' }}
            />
            <button className="px-6 py-3 bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 rounded-full hover:shadow-lg hover:shadow-[#3AA7FF]/20 transition-all whitespace-nowrap">
              <span className="text-white font-medium text-sm" style={{ fontFamily: 'var(--font-nav)' }}>Join Community</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
