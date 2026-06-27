"use client";

import { motion } from 'motion/react';
import { BookOpen, Clock, ArrowRight, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const paths = [
  {
    id: 1,
    title: 'The Complete Beginner',
    subtitle: 'Start from zero, arrive at clarity.',
    duration: '3 months',
    books: 4,
    level: 'Beginner',
    color: '#3AA7FF',
    description: 'Never read Vedic literature before? This path eases you in gently — beginning with conversational texts before moving to the foundational scriptures.',
    steps: [
      { week: 'Week 1–2', book: 'Perfect Questions, Perfect Answers', task: 'Read chapters 1–4. Focus on the basics of consciousness.' },
      { week: 'Week 3–5', book: 'The Science of Self-Realization', task: 'Selected chapters on karma and the self.' },
      { week: 'Week 6–10', book: 'Bhagavad Gita As It Is', task: 'Read with the purports. Keep a reflection journal.' },
      { week: 'Week 11–12', book: 'The Journey Home', task: 'Let the memoir consolidate everything you have learned.' },
    ],
    outcomes: ['Understanding of karma & the soul', 'Foundation in Bhakti philosophy', 'Personal daily spiritual practice'],
    image: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=800&fit=crop',
  },
  {
    id: 2,
    title: 'Devotion & Bhakti',
    subtitle: 'Deepen your relationship with the Divine.',
    duration: '4 months',
    books: 5,
    level: 'Intermediate',
    color: '#F5B84B',
    description: 'For those who have read the Gita and want to go deeper into the practice and philosophy of devotional service — Bhakti-yoga.',
    steps: [
      { week: 'Week 1–3', book: 'Nectar of Devotion', task: 'Study the 64 limbs of Bhakti. Practice one daily.' },
      { week: 'Week 4–6', book: 'Teachings of Lord Chaitanya', task: 'Understand the philosophy of acintya-bhedabheda.' },
      { week: 'Week 7–10', book: 'Srimad Bhagavatam: First Canto', task: 'Read with commentary. Focus on the invocation verses.' },
      { week: 'Week 11–14', book: 'Krishna Book', task: "Meditate on Krishna's pastimes as devotional practice." },
      { week: 'Week 15–16', book: 'Krishna: The Supreme Personality', task: 'Integrate your understanding of the divine identity.' },
    ],
    outcomes: ['Established personal devotional practice', 'Deeper understanding of Bhakti-yoga', 'Connection to the tradition of Lord Chaitanya'],
    image: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=800&fit=crop',
  },
  {
    id: 3,
    title: 'Leadership & Purpose',
    subtitle: 'Ancient wisdom for the modern leader.',
    duration: '2 months',
    books: 3,
    level: 'All Levels',
    color: '#F28C28',
    description: 'Distill the Gita\'s timeless guidance on duty, decision-making, and leadership into your daily professional and personal life.',
    steps: [
      { week: 'Week 1–4', book: 'Bhagavad Gita As It Is', task: 'Focus on chapters 2, 3 & 18 — duty, action, and liberation.' },
      { week: 'Week 5–6', book: 'Perfect Questions, Perfect Answers', task: 'Apply the answers to your own leadership questions.' },
      { week: 'Week 7–8', book: 'The Science of Self-Realization', task: 'Use the interviews as a model for self-inquiry at work.' },
    ],
    outcomes: ['Clarity on duty and right action', 'Decision-making grounded in dharma', 'Inner equanimity under pressure'],
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&fit=crop',
  },
  {
    id: 4,
    title: 'Family & Children',
    subtitle: 'Raise the next generation with wisdom.',
    duration: '2 months',
    books: 3,
    level: 'All Levels',
    color: '#3AA7FF',
    description: 'A path designed for parents and families — bringing Vedic values into the home through stories, practices, and shared reading.',
    steps: [
      { week: 'Week 1–3', book: 'Krishna Book', task: "Read the opening chapters together as a family. Discuss Krishna's qualities." },
      { week: 'Week 4–5', book: 'The Ramayana', task: "Explore Rama's example of honor and duty with your children." },
      { week: 'Week 6–8', book: 'The Journey Home', task: "Read alone as the parent — let Radhanath Swami's journey inspire your own." },
    ],
    outcomes: ['Shared family spiritual vocabulary', 'Stories and values for children', 'Personal renewal as a parent'],
    image: 'https://images.unsplash.com/photo-1526916027372-0c0852cef5d3?w=800&fit=crop',
  },
];

const levelColors: Record<string, string> = {
  Beginner: '#3AA7FF',
  Intermediate: '#F5B84B',
  Advanced: '#F28C28',
  'All Levels': 'rgba(255,255,255,0.4)',
};

export function ReadingPathsPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen">

      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5">
            <BookOpen className="w-4 h-4 text-[#F5B84B]" />
            <span className="text-white/70 text-sm" style={{ fontFamily: 'var(--font-nav)' }}>Curated for your journey</span>
          </div>
          <h1 className="text-5xl sm:text-6xl mb-5 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Reading Paths
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Not sure where to begin — or what to read next? Our reading paths give you a structured, week-by-week journey through the texts that matter most.
          </p>
        </motion.div>
      </div>

      {/* Paths */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {paths.map((path, i) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all"
          >
            {/* Hero image strip */}
            <div className="relative h-48 overflow-hidden">
              <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E27]/90 via-[#0A0E27]/60 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${levelColors[path.level]}25`, color: levelColors[path.level], border: `1px solid ${levelColors[path.level]}40`, fontFamily: 'var(--font-nav)' }}
                  >
                    {path.level}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/60 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                    <Clock className="w-3.5 h-3.5" /> {path.duration}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/60 text-xs" style={{ fontFamily: 'var(--font-body)' }}>
                    <BookOpen className="w-3.5 h-3.5" /> {path.books} books
                  </span>
                </div>
                <h2 className="text-3xl text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {path.title}
                </h2>
                <p className="text-white/70" style={{ fontFamily: 'var(--font-body)' }}>{path.subtitle}</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 grid lg:grid-cols-3 gap-8">
              {/* Description + outcomes */}
              <div className="lg:col-span-1">
                <p className="text-white/70 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                  {path.description}
                </p>
                <h4 className="text-white text-sm font-medium mb-3" style={{ fontFamily: 'var(--font-nav)' }}>
                  What you will gain
                </h4>
                <ul className="space-y-2 mb-6">
                  {path.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                      <span style={{ color: path.color }}>✓</span> {o}
                    </li>
                  ))}
                </ul>
                <Link href="/books">
                  <button
                    className="w-full px-5 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-all hover:opacity-90"
                    style={{ background: `${path.color}20`, color: path.color, border: `1px solid ${path.color}40`, fontFamily: 'var(--font-nav)' }}
                  >
                    Start This Path <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>

              {/* Weekly steps */}
              <div className="lg:col-span-2">
                <h4 className="text-white text-sm font-medium mb-4" style={{ fontFamily: 'var(--font-nav)' }}>
                  Week-by-week guide
                </h4>
                <div className="space-y-3">
                  {path.steps.map((step, si) => (
                    <div key={si} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium"
                        style={{ background: `${path.color}20`, color: path.color, fontFamily: 'var(--font-nav)' }}
                      >
                        {si + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-white/40 text-xs" style={{ fontFamily: 'var(--font-nav)' }}>{step.week}</span>
                          <ChevronRight className="w-3 h-3 text-white/20" />
                          <span className="text-white text-sm font-medium" style={{ fontFamily: 'var(--font-heading-secondary)' }}>{step.book}</span>
                        </div>
                        <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>{step.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
