"use client";

import { motion } from 'motion/react';
import { Heart, Target, Sparkles, Baby, Crown, Users as UsersIcon, TrendingUp, Flame } from 'lucide-react';

const seekingCards = [
  {
    icon: Heart,
    title: 'Peace of Mind',
    description: 'Find inner calm through devotional wisdom',
    color: '#3AA7FF',
  },
  {
    icon: Target,
    title: 'Purpose',
    description: 'Discover your life\'s spiritual calling',
    color: '#F5B84B',
  },
  {
    icon: Sparkles,
    title: 'Devotion',
    description: 'Deepen your connection with the divine',
    color: '#F28C28',
  },
  {
    icon: Baby,
    title: "Children's Wisdom",
    description: 'Sacred stories for young hearts',
    color: '#3AA7FF',
  },
  {
    icon: Crown,
    title: 'Leadership',
    description: 'Lead with dharmic principles',
    color: '#F5B84B',
  },
  {
    icon: UsersIcon,
    title: 'Relationships',
    description: 'Build meaningful spiritual bonds',
    color: '#F28C28',
  },
  {
    icon: TrendingUp,
    title: 'Personal Growth',
    description: 'Transform through self-mastery',
    color: '#3AA7FF',
  },
  {
    icon: Flame,
    title: 'Spiritual Discipline',
    description: 'Strengthen your daily practice',
    color: '#F5B84B',
  },
];

export function SeekingSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1F3A]/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            What are you seeking today?
          </h2>
          <p className="text-white/60 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
            Begin your journey with curated wisdom for your current stage of life
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seekingCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group cursor-pointer"
              >
                <div className="relative h-full p-6 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden">
                  {/* Gradient glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    style={{
                      background: `radial-gradient(circle at center, ${card.color}20, transparent)`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${card.color}20, ${card.color}10)`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: card.color }} />
                    </div>

                    {/* Content */}
                    <h3
                      className="text-xl mb-2 text-white"
                      style={{ fontFamily: 'var(--font-heading-secondary)' }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
