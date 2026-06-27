"use client";

import { motion } from 'motion/react';
import { Star, BookOpen, Heart, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';

const kidsBooks = [
  {
    id: 'kids-1',
    title: 'Krishna and the Butter Thief',
    author: 'Illustrated by the BluishBoy Team',
    age: 'Ages 3–7',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&fit=crop',
    category: 'Picture Book',
    description: "A colourful retelling of young Krishna's most beloved pastime — full of laughter, love, and gentle lessons about joy.",
    lesson: 'Joy & playfulness',
    format: 'Hardcover',
    insight: 'Perfect first spiritual story',
  },
  {
    id: 'kids-2',
    title: 'The Story of Dhruva',
    author: 'Adapted from Srimad Bhagavatam',
    age: 'Ages 6–10',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&fit=crop',
    category: 'Story Book',
    description: "Dhruva was just five years old when he went into the forest to find God. A story of determination, focus, and unwavering faith.",
    lesson: 'Determination & devotion',
    format: 'Hardcover',
    insight: 'Teaches perseverance beautifully',
  },
  {
    id: 'kids-3',
    title: 'Hanuman: The Mighty Devotee',
    author: 'Adapted from the Ramayana',
    age: 'Ages 7–12',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&fit=crop',
    category: 'Adventure Story',
    description: "The ultimate story of courage, strength, and selfless service. Hanuman's adventures leap off every page in this beautifully illustrated retelling.",
    lesson: 'Courage & service',
    format: 'Hardcover',
    insight: 'Great for reluctant readers',
  },
  {
    id: 'kids-4',
    title: 'Prahlada and the Pillar of Fire',
    author: 'Adapted from Srimad Bhagavatam',
    age: 'Ages 8–12',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&fit=crop',
    category: 'Story Book',
    description: "Even a king could not shake Prahlada's faith. A story of extraordinary inner strength and the protective power of devotion.",
    lesson: 'Inner strength & faith',
    format: 'Hardcover',
    insight: 'Builds moral courage',
  },
  {
    id: 'kids-5',
    title: "Mirabai: The Singing Saint",
    author: 'Adapted for Young Readers',
    age: 'Ages 9–13',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500&fit=crop',
    category: 'Biography',
    description: "She was a princess who chose devotion over a throne. Mirabai's songs and story inspire young readers — especially girls — to listen to their inner voice.",
    lesson: 'Authenticity & love',
    format: 'Paperback',
    insight: 'Wonderful for girls 9+',
  },
  {
    id: 'kids-6',
    title: 'My First Gita',
    author: 'BluishBoy Editorial Team',
    age: 'Ages 10–14',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1604078893234-ff3a1a5d5292?w=500&fit=crop',
    category: 'Introduction',
    description: "Eighteen chapters of the Bhagavad Gita, retold in language a teenager can grasp — with beautiful illustrations and reflection questions after each chapter.",
    lesson: 'Wisdom & purpose',
    format: 'Hardcover',
    insight: 'The perfect teen introduction',
  },
];

const values = [
  { icon: Heart, color: '#F28C28', title: 'Rooted in Love', body: "Every story in our children's collection is chosen for its emotional warmth first — doctrine never comes before wonder." },
  { icon: Star, color: '#F5B84B', title: 'Age-Appropriate', body: 'Each book is carefully reviewed by parents, teachers, and child development readers. Nothing is above or below the suggested age.' },
  { icon: BookOpen, color: '#3AA7FF', title: 'Beautifully Illustrated', body: 'We believe beauty is itself a teaching. Every book is illustrated to the same standard as the finest picture books worldwide.' },
  { icon: Sparkles, color: '#F28C28', title: 'Discussion Guides', body: 'Most titles include a short parent guide — questions to ask, ideas to explore, and ways to bring the story into daily life.' },
];

export function ForKidsPage() {
  const { addToCart } = useCart();

  return (
    <div className="pt-28 pb-24 min-h-screen">

      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-5">
            <Sparkles className="w-4 h-4 text-[#F28C28]" />
            <span className="text-white/70 text-sm" style={{ fontFamily: 'var(--font-nav)' }}>Stories that stay with them forever</span>
          </div>
          <h1 className="text-5xl sm:text-6xl mb-5 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Wisdom for Little Seekers
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            The greatest gift you can give a child is a story that plants a seed. Our children's collection brings the depth of Vedic tradition to life in language children love.
          </p>
        </motion.div>
      </div>

      {/* Why section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center"
              >
                <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${v.color}20` }}>
                  <Icon className="w-6 h-6" style={{ color: v.color }} />
                </div>
                <h3 className="text-white text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-heading-secondary)' }}>{v.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{v.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Books grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl text-white mb-8" style={{ fontFamily: 'var(--font-heading)' }}>Our Collection</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kidsBooks.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group flex flex-col rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 overflow-hidden transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27]/70 to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#F28C28]/80 backdrop-blur-sm">
                  <span className="text-white text-xs font-medium" style={{ fontFamily: 'var(--font-nav)' }}>{book.age}</span>
                </div>
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-lg text-white mb-1 leading-snug" style={{ fontFamily: 'var(--font-heading-secondary)' }}>{book.title}</h3>
                <p className="text-[#F5B84B] text-xs mb-3" style={{ fontFamily: 'var(--font-body)' }}>{book.author}</p>
                <p className="text-white/60 text-sm leading-relaxed mb-3 flex-1" style={{ fontFamily: 'var(--font-body)' }}>{book.description}</p>
                <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-xl bg-[#F28C28]/10 border border-[#F28C28]/20 w-fit">
                  <Heart className="w-3 h-3 text-[#F28C28]" />
                  <span className="text-[#F28C28] text-xs" style={{ fontFamily: 'var(--font-body)' }}>{book.lesson}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl text-white" style={{ fontFamily: 'var(--font-heading)' }}>${book.price}</span>
                  <button
                    onClick={() => addToCart(book)}
                    className="px-4 py-2 rounded-full bg-[#3AA7FF]/15 text-[#3AA7FF] text-sm border border-[#3AA7FF]/25 hover:bg-[#3AA7FF]/25 transition-all"
                    style={{ fontFamily: 'var(--font-nav)' }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-10 rounded-3xl bg-gradient-to-br from-[#F28C28]/10 to-[#F5B84B]/10 border border-white/20"
        >
          <h2 className="text-3xl text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Gift a Story That Lasts a Lifetime
          </h2>
          <p className="text-white/60 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
            All children's titles are beautifully packaged — perfect as gifts for birthdays, holidays, or just because.
          </p>
          <Link href="/books">
            <button className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#F28C28] to-[#F5B84B] rounded-full hover:shadow-lg hover:shadow-[#F28C28]/20 transition-all">
              <span className="text-white font-medium" style={{ fontFamily: 'var(--font-nav)' }}>Browse All Books</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
