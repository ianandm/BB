import {
  Baby,
  Brain,
  Compass,
  Flame,
  Heart,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { seekingItems } from "@/lib/data/homepage";

const iconMap = [
  Brain,
  Compass,
  Heart,
  Baby,
  Target,
  Users,
  Sparkles,
  Flame,
];

export function SeekingSection() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1F3A]/50 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-heading mb-4 text-4xl text-white sm:text-5xl">
            What are you seeking today?
          </h2>
          <p className="font-body text-lg text-white/60">
            Begin your journey with curated wisdom for your current stage of life
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {seekingItems.map((item, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <button
                key={item.title}
                type="button"
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/8"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-colors"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <Icon className="h-6 w-6" style={{ color: item.color }} />
                </div>
                <h3 className="font-heading-secondary mb-2 text-lg text-white">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-white/60">{item.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
