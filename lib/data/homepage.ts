export type SeekingItem = {
  title: string;
  description: string;
  color: string;
};

export type ReadingPath = {
  title: string;
  description: string;
  books: number;
  duration: string;
  difficulty: string;
  color: string;
};

export type { Book as FeaturedBook } from "./catalog";
export { featuredBooks } from "./catalog";

export type CategoryItem = {
  title: string;
  slug: string;
  description: string;
  count: string;
  image: string;
  gradient: string;
};

export type ArticleItem = {
  title: string;
  category: string;
  readTime: string;
  relatedBook: string;
  color: string;
};

export const seekingItems: SeekingItem[] = [
  { title: "Peace of Mind", description: "Find inner calm through devotional wisdom", color: "#3AA7FF" },
  { title: "Purpose", description: "Discover your life's spiritual calling", color: "#F5B84B" },
  { title: "Devotion", description: "Deepen your connection with the divine", color: "#F28C28" },
  { title: "Children's Wisdom", description: "Sacred stories for young hearts", color: "#3AA7FF" },
  { title: "Leadership", description: "Lead with dharmic principles", color: "#F5B84B" },
  { title: "Relationships", description: "Build meaningful spiritual bonds", color: "#F28C28" },
  { title: "Personal Growth", description: "Transform through self-mastery", color: "#3AA7FF" },
  { title: "Spiritual Discipline", description: "Strengthen your daily practice", color: "#F5B84B" },
];

export const readingPaths: ReadingPath[] = [
  {
    title: "New to Bhakti",
    description: "A gentle introduction to devotional practice and philosophy",
    books: 8,
    duration: "2-3 months",
    difficulty: "Beginner",
    color: "#3AA7FF",
  },
  {
    title: "Build Inner Strength",
    description: "Develop resilience through spiritual wisdom and practice",
    books: 12,
    duration: "3-4 months",
    difficulty: "Intermediate",
    color: "#F5B84B",
  },
  {
    title: "Stories for Children",
    description: "Sacred narratives that inspire young minds",
    books: 15,
    duration: "Ongoing",
    difficulty: "All Ages",
    color: "#F28C28",
  },
  {
    title: "Gita for Daily Life",
    description: "Apply timeless teachings to modern challenges",
    books: 10,
    duration: "4-6 months",
    difficulty: "All Levels",
    color: "#3AA7FF",
  },
  {
    title: "Devotional Deep Dive",
    description: "Immerse yourself in advanced bhakti practices",
    books: 20,
    duration: "6-12 months",
    difficulty: "Advanced",
    color: "#F5B84B",
  },
];

export const categories: CategoryItem[] = [
  {
    title: "Bhagavad Gita",
    slug: "bhagavad-gita",
    description: "Timeless wisdom for modern living",
    count: "24 books",
    image: "https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=600",
    gradient: "from-[#3AA7FF] to-[#3AA7FF]/50",
  },
  {
    title: "Ramayana",
    slug: "ramayana",
    description: "Epic tales of dharma and devotion",
    count: "18 books",
    image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=600",
    gradient: "from-[#F5B84B] to-[#F5B84B]/50",
  },
  {
    title: "Hanuman",
    slug: "hanuman",
    description: "Stories of strength and surrender",
    count: "15 books",
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600",
    gradient: "from-[#F28C28] to-[#F28C28]/50",
  },
  {
    title: "Children",
    slug: "children",
    description: "Sacred stories for young hearts",
    count: "32 books",
    image: "https://images.unsplash.com/photo-1526916027372-0c0852cef5d3?w=600",
    gradient: "from-[#3AA7FF] to-[#3AA7FF]/50",
  },
  {
    title: "Self Mastery",
    slug: "self-mastery",
    description: "Transform through spiritual practice",
    count: "28 books",
    image: "https://images.unsplash.com/photo-1604078893234-ff3a1a5d5292?w=600",
    gradient: "from-[#F5B84B] to-[#F5B84B]/50",
  },
  {
    title: "Leadership",
    slug: "leadership",
    description: "Lead with dharmic principles",
    count: "20 books",
    image: "https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=600",
    gradient: "from-[#F28C28] to-[#F28C28]/50",
  },
  {
    title: "Devotion",
    slug: "devotion",
    description: "Deepen your spiritual connection",
    count: "35 books",
    image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=600",
    gradient: "from-[#3AA7FF] to-[#3AA7FF]/50",
  },
  {
    title: "Relationships",
    slug: "relationships",
    description: "Build meaningful spiritual bonds",
    count: "16 books",
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600",
    gradient: "from-[#F5B84B] to-[#F5B84B]/50",
  },
];

export const articles: ArticleItem[] = [
  {
    title: "5 Gita Verses to Start Your Morning With Purpose",
    category: "Bhagavad Gita for Daily Life",
    readTime: "5 min read",
    relatedBook: "Bhagavad Gita As It Is",
    color: "#3AA7FF",
  },
  {
    title: "How Ancient Wisdom Helps Navigate Modern Stress",
    category: "Personal Growth",
    readTime: "7 min read",
    relatedBook: "The Science of Self-Realization",
    color: "#F5B84B",
  },
  {
    title: "Hanuman's Devotion: Lessons in Unwavering Faith",
    category: "Devotion",
    readTime: "6 min read",
    relatedBook: "Ramayana",
    color: "#F28C28",
  },
  {
    title: "Teaching Children Spiritual Values Through Stories",
    category: "Children's Wisdom",
    readTime: "4 min read",
    relatedBook: "Stories for Children",
    color: "#3AA7FF",
  },
  {
    title: "A Beginner's Guide to Reading Srila Prabhupada",
    category: "New to Bhakti",
    readTime: "8 min read",
    relatedBook: "Bhagavad Gita As It Is",
    color: "#F5B84B",
  },
  {
    title: "What is Bhakti Yoga? Your Questions Answered",
    category: "Philosophy",
    readTime: "6 min read",
    relatedBook: "Perfect Questions, Perfect Answers",
    color: "#F28C28",
  },
];
