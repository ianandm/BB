"use client";

import { motion } from 'motion/react';
import { BookOpen, Clock, CheckCircle2 } from 'lucide-react';

interface LearningStage {
  stage: string;
  title: string;
  books: number;
  duration: string;
}

interface LearningRoadmapProps {
  stages: LearningStage[];
}

export function LearningRoadmap({ stages }: LearningRoadmapProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F5B84B]/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Your Learning Journey
          </h2>
          <p className="text-white/60 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
            A guided progression from introduction to mastery
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3AA7FF] via-[#F5B84B] to-[#F28C28]" />

          {/* Stages */}
          <div className="space-y-8">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-24"
              >
                {/* Stage marker */}
                <div className="absolute left-0 top-0 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3AA7FF]/20 to-[#F5B84B]/20 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-white text-lg font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-[#3AA7FF] text-sm mb-1" style={{ fontFamily: 'var(--font-nav)' }}>
                        {stage.stage}
                      </div>
                      <h3
                        className="text-2xl text-white mb-2"
                        style={{ fontFamily: 'var(--font-heading-secondary)' }}
                      >
                        {stage.title}
                      </h3>
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-white/20 group-hover:text-[#3AA7FF] transition-colors" />
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-white/70">
                      <BookOpen className="w-4 h-4 text-[#3AA7FF]" />
                      <span className="text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                        {stage.books} books
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Clock className="w-4 h-4 text-[#F5B84B]" />
                      <span className="text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                        {stage.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
