"use client";

import { motion } from 'motion/react';
import { Mail, Sparkles, BookOpen, TrendingUp, Heart } from 'lucide-react';

export function Newsletter() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-[#3AA7FF]/20 via-[#F5B84B]/20 to-[#F28C28]/20 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-8 lg:p-16 text-center"
        >
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#3AA7FF]/10 blur-2xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#F5B84B]/10 blur-2xl" />

          <div className="relative z-10">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3AA7FF]/30 to-[#F5B84B]/30 rounded-full blur-xl" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#3AA7FF]/20 to-[#F5B84B]/20 flex items-center justify-center border border-white/20">
                  <Mail className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            {/* Headline */}
            <h2
              className="text-4xl lg:text-5xl mb-4 text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Receive One Timeless Insight Every Week
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
              Join thousands of seekers receiving curated wisdom, book recommendations, and spiritual guidance directly to your inbox.
            </p>

            {/* Email Form */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3AA7FF]/20 to-[#F5B84B]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3AA7FF]/50 transition-all"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                  <button className="group/btn px-8 py-4 bg-gradient-to-r from-[#3AA7FF] to-[#F5B84B] rounded-2xl hover:shadow-lg hover:shadow-[#3AA7FF]/30 transition-all">
                    <span className="text-white font-medium flex items-center gap-2" style={{ fontFamily: 'var(--font-nav)' }}>
                      Subscribe
                      <Sparkles className="w-5 h-5" />
                    </span>
                  </button>
                </div>
              </div>
              <p className="text-white/40 text-sm mt-3" style={{ fontFamily: 'var(--font-body)' }}>
                No spam. Unsubscribe anytime. Your sacred space, respected.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { icon: Sparkles, text: 'Weekly Wisdom' },
                { icon: BookOpen, text: 'Reading Recommendations' },
                { icon: TrendingUp, text: 'New Releases' },
                { icon: Heart, text: 'Spiritual Guidance' },
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#3AA7FF]" />
                    </div>
                    <span className="text-white/70 text-sm text-center" style={{ fontFamily: 'var(--font-body)' }}>
                      {benefit.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
