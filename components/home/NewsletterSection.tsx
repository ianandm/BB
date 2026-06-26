"use client";

import { BookOpen, Heart, Mail, Sparkles, Star } from "lucide-react";

const benefits = [
  { icon: Sparkles, text: "Weekly Wisdom" },
  { icon: BookOpen, text: "Reading Recommendations" },
  { icon: Star, text: "New Releases" },
  { icon: Heart, text: "Spiritual Guidance" },
];

export function NewsletterSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#3AA7FF]/20 via-[#F5B84B]/20 to-[#F28C28]/20 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 text-center backdrop-blur-xl lg:p-16">
          <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-[#3AA7FF]/10 blur-2xl" />
          <div className="absolute right-10 bottom-10 h-32 w-32 rounded-full bg-[#F5B84B]/10 blur-2xl" />

          <div className="relative z-10">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3AA7FF]/30 to-[#F5B84B]/30 blur-xl" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#3AA7FF]/20 to-[#F5B84B]/20">
                  <Mail className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>

            <h2 className="font-heading mb-4 text-4xl text-white lg:text-5xl">
              Receive One Timeless Insight Every Week
            </h2>
            <p className="font-body mx-auto mb-8 max-w-2xl text-lg text-white/70">
              Join thousands of seekers receiving curated wisdom, book
              recommendations, and spiritual guidance directly to your inbox.
            </p>

            <form
              className="mx-auto mb-8 max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="group relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3AA7FF]/20 to-[#F5B84B]/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-white placeholder-white/40 backdrop-blur-sm transition-all focus:ring-2 focus:ring-[#3AA7FF]/50 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="group/btn rounded-2xl bg-gradient-to-r from-[#3AA7FF] to-[#F5B84B] px-8 py-4 transition-all hover:shadow-lg hover:shadow-[#3AA7FF]/30"
                  >
                    <span className="font-nav flex items-center justify-center gap-2 font-medium text-white">
                      Subscribe
                      <Sparkles className="h-5 w-5" />
                    </span>
                  </button>
                </div>
              </div>
              <p className="font-body mt-3 text-sm text-white/40">
                No spam. Unsubscribe anytime. Your sacred space, respected.
              </p>
            </form>

            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6 lg:grid-cols-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.text}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <benefit.icon className="h-6 w-6 text-[#3AA7FF]" />
                  </div>
                  <span className="font-body text-center text-sm text-white/70">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
