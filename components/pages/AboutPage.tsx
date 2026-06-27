"use client";

import { motion } from 'motion/react';
import { BookOpen, Heart, Globe, Star, Leaf, Sun } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: BookOpen,
    color: '#3AA7FF',
    title: 'Wisdom Over Commerce',
    body: 'Every book we carry is chosen for its power to transform a life — not its profit margin. We read every title before it joins the library.',
  },
  {
    icon: Heart,
    color: '#F28C28',
    title: 'Devotion as Practice',
    body: 'We believe the act of learning is itself a form of devotion. Each purchase is a commitment to growth, not just a transaction.',
  },
  {
    icon: Globe,
    color: '#F5B84B',
    title: 'Ancient Wisdom, Modern Access',
    body: 'Vedic knowledge stretches back five thousand years. We exist to place it in the hands of anyone on Earth who is ready to receive it.',
  },
  {
    icon: Leaf,
    color: '#3AA7FF',
    title: 'Sustainable & Ethical',
    body: "We partner with publishers who share our values — fair printing, sustainable materials, and authors who live the teachings they write.",
  },
];

const team = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & Chief Curator',
    bio: 'Arjun spent a decade studying Vedanta in Vrindavan before returning to build a bridge between ancient scriptures and the modern seeker. He personally reviews every title in the catalogue.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    accent: '#3AA7FF',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Learning Journeys',
    bio: 'A former university lecturer in Comparative Spirituality, Priya architects the reading paths and wisdom collections that guide readers from curiosity to clarity.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    accent: '#F5B84B',
  },
  {
    name: 'Rohan Das',
    role: 'Community & Outreach',
    bio: 'Rohan grew up in a family of devotees in Kolkata and has dedicated his life to making spiritual literature accessible to first-generation seekers across South Asia and beyond.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    accent: '#F28C28',
  },
];

const milestones = [
  { year: '2018', label: 'Founded in a small flat in Mumbai with 40 handpicked titles.' },
  { year: '2020', label: 'Launched digital reading guides and our first community newsletter.' },
  { year: '2022', label: 'Reached 50,000 readers across 60 countries.' },
  { year: '2024', label: 'Introduced the Reading Paths system and children\'s wisdom collection.' },
  { year: '2026', label: 'Over 200,000 seekers and growing — one book at a time.' },
];

const stats = [
  { value: '200K+', label: 'Seekers served' },
  { value: '60+', label: 'Countries reached' },
  { value: '500+', label: 'Titles curated' },
  { value: '8', label: 'Years of devotion' },
];

export function AboutPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen">

      {/* ── Hero ── */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-28">
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#3AA7FF]/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sun className="w-4 h-4 text-[#F5B84B]" />
            <span className="text-white/70 text-sm" style={{ fontFamily: 'var(--font-nav)' }}>
              Our Story
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl mb-6 text-white leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            We Exist to Help You{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3AA7FF] to-[#F5B84B]">
              Begin the Journey
            </span>
          </h1>

          <p
            className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            BluishBoy is not a bookstore. It is a doorway — curated with devotion, built for
            seekers, and grounded in the belief that the right book at the right moment can
            change a life forever.
          </p>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 text-center"
            >
              <div
                className="text-4xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#3AA7FF] to-[#F5B84B]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {stat.value}
              </div>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Origin Story ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="text-4xl mb-6 text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Born from a Personal Search
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              <p>
                In 2018, our founder Arjun Mehta sat in a small room in Vrindavan with a worn
                copy of the Bhagavad Gita and a single question: <em className="text-white/90 not-italic">"Where do I even start?"</em>
              </p>
              <p>
                The answer didn't exist in any single place. Wisdom was scattered — across
                temples, libraries, out-of-print editions, and expensive imports. The seeker
                was left to navigate alone.
              </p>
              <p>
                BluishBoy was built to change that. A single, beautifully curated space where
                the depth of Vedic tradition meets the clarity a modern reader needs to take
                the first step — and every step after.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#3AA7FF]/20 to-[#F5B84B]/20 rounded-3xl blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop"
              alt="Ancient library"
              className="relative w-full h-80 object-cover rounded-3xl border border-white/10"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#0A0E27]/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p
                className="text-white/90 text-sm italic"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                "The whole world is a library. We simply built you a door."
              </p>
              <p className="text-[#F5B84B] text-xs mt-1" style={{ fontFamily: 'var(--font-nav)' }}>
                — Arjun Mehta, Founder
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            What We Stand For
          </h2>
          <p className="text-white/60 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            These are not corporate values. They are the commitments we make to every seeker
            who trusts us with their path.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ background: `${v.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: v.color }} />
                </div>
                <h3
                  className="text-xl mb-3 text-white"
                  style={{ fontFamily: 'var(--font-heading-secondary)' }}
                >
                  {v.title}
                </h3>
                <p className="text-white/60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  {v.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The People Behind the Pages
          </h2>
          <p className="text-white/60 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            A small team of devoted readers, teachers, and builders — united by a love for
            wisdom and a responsibility to share it well.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="p-6 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-5">
                <div
                  className="absolute inset-0 rounded-full blur-lg opacity-40"
                  style={{ background: member.accent }}
                />
                <img
                  src={member.image}
                  alt={member.name}
                  className="relative w-24 h-24 rounded-full object-cover border-2"
                  style={{ borderColor: `${member.accent}60` }}
                />
              </div>
              <h3
                className="text-lg mb-1 text-white"
                style={{ fontFamily: 'var(--font-heading-secondary)' }}
              >
                {member.name}
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: member.accent, fontFamily: 'var(--font-nav)' }}
              >
                {member.role}
              </p>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Our Journey So Far
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#3AA7FF]/60 via-[#F5B84B]/40 to-transparent" />

          <div className="space-y-8 pl-16">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-gradient-to-br from-[#3AA7FF] to-[#F5B84B] shadow-lg shadow-[#3AA7FF]/30" />
                <div className="p-5 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <span
                    className="text-sm font-medium"
                    style={{ color: i % 2 === 0 ? '#3AA7FF' : '#F5B84B', fontFamily: 'var(--font-nav)' }}
                  >
                    {m.year}
                  </span>
                  <p className="text-white/80 mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                    {m.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative p-12 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-[#3AA7FF]/10 to-[#F5B84B]/10 border border-white/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#3AA7FF]/5 to-[#F28C28]/5 pointer-events-none" />

          <Star className="w-12 h-12 text-[#F5B84B] mx-auto mb-6 opacity-80" />

          <h2
            className="text-4xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to Begin?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Every great journey starts with a single page. Let us help you find yours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <button className="px-8 py-4 bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 rounded-full hover:shadow-lg hover:shadow-[#3AA7FF]/30 transition-all">
                <span className="text-white font-medium" style={{ fontFamily: 'var(--font-nav)' }}>
                  Explore the Library
                </span>
              </button>
            </Link>
            <Link href="/category/bhagavad-gita">
              <button className="px-8 py-4 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition-all">
                <span className="text-white/90 font-medium" style={{ fontFamily: 'var(--font-nav)' }}>
                  Start with the Gita
                </span>
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
