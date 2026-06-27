import { BookOpen, Heart, Sparkles, Baby, Crown, Users, TrendingUp, Flame } from 'lucide-react';

export interface CategoryData {
  slug: string;
  title: string;
  description: string;
  icon: any;
  heroImage: string;
  gradient: string;
  stats: {
    books: number;
    readingPaths: number;
    articles: number;
    resources: number;
  };
  starterBook: {
    title: string;
    author: string;
    image: string;
    whyStartHere: string;
    difficulty: string;
    readingTime: string;
    whoFor: string;
  };
  learningStages: Array<{
    stage: string;
    title: string;
    books: number;
    duration: string;
  }>;
  collections: Array<{
    title: string;
    description: string;
    bookCount: number;
  }>;
  wisdomTopics: string[];
  relatedCategories: string[];
}

export const categoryData: Record<string, CategoryData> = {
  'bhagavad-gita': {
    slug: 'bhagavad-gita',
    title: 'Bhagavad Gita',
    description: 'Explore timeless teachings on purpose, leadership, self-mastery, devotion, and spiritual wisdom through the world\'s most celebrated spiritual text.',
    icon: BookOpen,
    heroImage: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=1200',
    gradient: 'from-[#3AA7FF] to-[#F5B84B]',
    stats: {
      books: 24,
      readingPaths: 5,
      articles: 18,
      resources: 12,
    },
    starterBook: {
      title: 'Bhagavad Gita As It Is',
      author: 'Srila Prabhupada',
      image: 'https://images.unsplash.com/photo-1467688695332-6b486449d78f?w=600',
      whyStartHere: 'This translation makes ancient wisdom accessible to modern readers with clear explanations and practical applications.',
      difficulty: 'Beginner Friendly',
      readingTime: '2-3 months',
      whoFor: 'Perfect for those new to Eastern philosophy or seeking life guidance',
    },
    learningStages: [
      { stage: 'Stage 1', title: 'Introduction', books: 3, duration: '2-4 weeks' },
      { stage: 'Stage 2', title: 'Core Concepts', books: 5, duration: '1-2 months' },
      { stage: 'Stage 3', title: 'Daily Application', books: 4, duration: '1 month' },
      { stage: 'Stage 4', title: 'Deeper Study', books: 6, duration: '2-3 months' },
      { stage: 'Stage 5', title: 'Advanced Wisdom', books: 6, duration: '3-6 months' },
    ],
    collections: [
      { title: 'Gita for Beginners', description: 'Start your journey with accessible translations', bookCount: 5 },
      { title: 'Gita for Leaders', description: 'Apply dharmic principles to leadership', bookCount: 6 },
      { title: 'Gita for Students', description: 'Find purpose and focus in your studies', bookCount: 4 },
      { title: 'Gita for Personal Growth', description: 'Transform through self-knowledge', bookCount: 7 },
      { title: 'Gita and Daily Practice', description: 'Integrate wisdom into everyday life', bookCount: 5 },
    ],
    wisdomTopics: ['Karma Yoga', 'Bhakti Yoga', 'Leadership', 'Purpose', 'Discipline', 'Detachment', 'Relationships'],
    relatedCategories: ['devotion', 'self-mastery', 'leadership', 'relationships'],
  },
  'ramayana': {
    slug: 'ramayana',
    title: 'Ramayana',
    description: 'Journey through epic tales of dharma, devotion, and divine love. Experience the timeless story of Lord Rama and the triumph of righteousness.',
    icon: Sparkles,
    heroImage: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=1200',
    gradient: 'from-[#F5B84B] to-[#F28C28]',
    stats: {
      books: 18,
      readingPaths: 4,
      articles: 15,
      resources: 10,
    },
    starterBook: {
      title: 'Ramayana: The Divine Story',
      author: 'Valmiki (Translation)',
      image: 'https://images.unsplash.com/photo-1534289907116-888fe70c4806?w=600',
      whyStartHere: 'An accessible retelling that captures the essence of dharma and devotion through captivating storytelling.',
      difficulty: 'Beginner Friendly',
      readingTime: '1-2 months',
      whoFor: 'Ideal for those who love epic stories and want to understand dharmic principles',
    },
    learningStages: [
      { stage: 'Stage 1', title: 'The Story Begins', books: 3, duration: '2-3 weeks' },
      { stage: 'Stage 2', title: 'Understanding Dharma', books: 4, duration: '1 month' },
      { stage: 'Stage 3', title: 'Devotional Lessons', books: 4, duration: '1-2 months' },
      { stage: 'Stage 4', title: 'Deep Analysis', books: 4, duration: '2 months' },
      { stage: 'Stage 5', title: 'Spiritual Insights', books: 3, duration: '1-2 months' },
    ],
    collections: [
      { title: 'Ramayana for Beginners', description: 'Accessible retellings of the epic', bookCount: 4 },
      { title: 'Stories of Devotion', description: 'Lessons in surrender and faith', bookCount: 5 },
      { title: 'Ramayana for Children', description: 'Introduce young ones to dharma', bookCount: 6 },
      { title: 'Character Studies', description: 'Deep dives into each character', bookCount: 4 },
    ],
    wisdomTopics: ['Dharma', 'Devotion', 'Courage', 'Loyalty', 'Righteousness', 'Family Values', 'Divine Love'],
    relatedCategories: ['devotion', 'hanuman', 'children', 'relationships'],
  },
  'hanuman': {
    slug: 'hanuman',
    title: 'Hanuman',
    description: 'Discover stories of unwavering devotion, boundless strength, and complete surrender. Learn from the perfect servant of the divine.',
    icon: Flame,
    heroImage: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=1200',
    gradient: 'from-[#F28C28] to-[#F5B84B]',
    stats: {
      books: 15,
      readingPaths: 3,
      articles: 12,
      resources: 8,
    },
    starterBook: {
      title: 'Hanuman Chalisa: The Divine Prayer',
      author: 'Tulsidas (Commentary)',
      image: 'https://images.unsplash.com/photo-1489421471208-251cc68284b8?w=600',
      whyStartHere: 'Learn the power of devotion through the most beloved prayer to Hanuman, with detailed explanations.',
      difficulty: 'All Levels',
      readingTime: '2-4 weeks',
      whoFor: 'Anyone seeking strength, courage, and unwavering faith',
    },
    learningStages: [
      { stage: 'Stage 1', title: 'Introduction to Hanuman', books: 3, duration: '2-3 weeks' },
      { stage: 'Stage 2', title: 'Stories of Devotion', books: 4, duration: '1 month' },
      { stage: 'Stage 3', title: 'Hanuman Chalisa', books: 3, duration: '3-4 weeks' },
      { stage: 'Stage 4', title: 'Advanced Study', books: 3, duration: '1-2 months' },
      { stage: 'Stage 5', title: 'Living Like Hanuman', books: 2, duration: '1 month' },
    ],
    collections: [
      { title: 'Hanuman Stories', description: 'Tales of strength and devotion', bookCount: 5 },
      { title: 'Chalisa Explained', description: 'Deep dive into the sacred prayer', bookCount: 3 },
      { title: 'For Children', description: 'Inspiring stories for young hearts', bookCount: 4 },
      { title: 'Devotional Practice', description: 'Daily worship and meditation', bookCount: 3 },
    ],
    wisdomTopics: ['Devotion', 'Strength', 'Courage', 'Service', 'Humility', 'Faith', 'Surrender'],
    relatedCategories: ['ramayana', 'devotion', 'children', 'self-mastery'],
  },
  'self-mastery': {
    slug: 'self-mastery',
    title: 'Self Mastery',
    description: 'Transform your life through spiritual practice, self-discipline, and inner development. Master your mind, emotions, and actions.',
    icon: TrendingUp,
    heroImage: 'https://images.unsplash.com/photo-1604078893234-ff3a1a5d5292?w=1200',
    gradient: 'from-[#3AA7FF] to-[#F5B84B]',
    stats: {
      books: 28,
      readingPaths: 6,
      articles: 22,
      resources: 15,
    },
    starterBook: {
      title: 'The Science of Self-Realization',
      author: 'Srila Prabhupada',
      image: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=600',
      whyStartHere: 'Practical insights into understanding the self and achieving spiritual consciousness through accessible teachings.',
      difficulty: 'Beginner Friendly',
      readingTime: '1-2 months',
      whoFor: 'Perfect for those seeking personal transformation and self-understanding',
    },
    learningStages: [
      { stage: 'Stage 1', title: 'Know Yourself', books: 5, duration: '1 month' },
      { stage: 'Stage 2', title: 'Mind Control', books: 6, duration: '1-2 months' },
      { stage: 'Stage 3', title: 'Emotional Mastery', books: 5, duration: '1-2 months' },
      { stage: 'Stage 4', title: 'Spiritual Practice', books: 6, duration: '2-3 months' },
      { stage: 'Stage 5', title: 'Complete Integration', books: 6, duration: '3-6 months' },
    ],
    collections: [
      { title: 'Foundations', description: 'Build your self-mastery practice', bookCount: 6 },
      { title: 'Mind & Meditation', description: 'Control your thoughts and emotions', bookCount: 7 },
      { title: 'Daily Discipline', description: 'Create sustainable spiritual habits', bookCount: 5 },
      { title: 'Advanced Practice', description: 'Deepen your spiritual journey', bookCount: 6 },
      { title: 'Modern Applications', description: 'Apply ancient wisdom today', bookCount: 4 },
    ],
    wisdomTopics: ['Meditation', 'Discipline', 'Mind Control', 'Emotional Intelligence', 'Habits', 'Focus', 'Transformation'],
    relatedCategories: ['bhagavad-gita', 'devotion', 'leadership', 'relationships'],
  },
  'leadership': {
    slug: 'leadership',
    title: 'Leadership',
    description: 'Lead with dharmic principles, wisdom, and compassion. Learn timeless leadership lessons from spiritual texts and great teachers.',
    icon: Crown,
    heroImage: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=1200',
    gradient: 'from-[#F5B84B] to-[#3AA7FF]',
    stats: {
      books: 20,
      readingPaths: 4,
      articles: 16,
      resources: 11,
    },
    starterBook: {
      title: 'Leadership Wisdom from the Bhagavad Gita',
      author: 'Gauranga Das',
      image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600',
      whyStartHere: 'Modern interpretations of ancient leadership principles that apply to today\'s challenges.',
      difficulty: 'Intermediate',
      readingTime: '1-2 months',
      whoFor: 'Leaders, managers, and anyone in a position of influence',
    },
    learningStages: [
      { stage: 'Stage 1', title: 'Leadership Foundations', books: 4, duration: '1 month' },
      { stage: 'Stage 2', title: 'Decision Making', books: 4, duration: '1 month' },
      { stage: 'Stage 3', title: 'Team Building', books: 4, duration: '1-2 months' },
      { stage: 'Stage 4', title: 'Dharmic Leadership', books: 4, duration: '1-2 months' },
      { stage: 'Stage 5', title: 'Mastery', books: 4, duration: '2-3 months' },
    ],
    collections: [
      { title: 'Leadership Basics', description: 'Start your leadership journey', bookCount: 4 },
      { title: 'Gita for Leaders', description: 'Ancient wisdom for modern leaders', bookCount: 5 },
      { title: 'Ethical Leadership', description: 'Lead with integrity and dharma', bookCount: 4 },
      { title: 'Team & Culture', description: 'Build inspired organizations', bookCount: 4 },
      { title: 'Case Studies', description: 'Real-world leadership examples', bookCount: 3 },
    ],
    wisdomTopics: ['Decision Making', 'Ethics', 'Team Building', 'Vision', 'Duty', 'Service', 'Integrity'],
    relatedCategories: ['bhagavad-gita', 'self-mastery', 'relationships', 'devotion'],
  },
  'devotion': {
    slug: 'devotion',
    title: 'Devotion',
    description: 'Deepen your spiritual connection through bhakti yoga, prayer, and divine love. Experience the path of the heart.',
    icon: Heart,
    heroImage: 'https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=1200',
    gradient: 'from-[#3AA7FF] to-[#F28C28]',
    stats: {
      books: 35,
      readingPaths: 7,
      articles: 25,
      resources: 18,
    },
    starterBook: {
      title: 'The Nectar of Devotion',
      author: 'Srila Prabhupada',
      image: 'https://images.unsplash.com/photo-1534289907116-888fe70c4806?w=600',
      whyStartHere: 'A comprehensive guide to bhakti yoga and the science of devotional service.',
      difficulty: 'All Levels',
      readingTime: '2-3 months',
      whoFor: 'Anyone seeking a deeper connection with the divine',
    },
    learningStages: [
      { stage: 'Stage 1', title: 'What is Bhakti?', books: 6, duration: '1 month' },
      { stage: 'Stage 2', title: 'Prayer & Chanting', books: 7, duration: '1-2 months' },
      { stage: 'Stage 3', title: 'Devotional Practice', books: 7, duration: '2-3 months' },
      { stage: 'Stage 4', title: 'Advanced Devotion', books: 8, duration: '3-4 months' },
      { stage: 'Stage 5', title: 'Pure Love', books: 7, duration: '4-6 months' },
    ],
    collections: [
      { title: 'Introduction to Bhakti', description: 'Start your devotional journey', bookCount: 6 },
      { title: 'Prayers & Mantras', description: 'Sacred chants and prayers', bookCount: 7 },
      { title: 'Stories of Devotees', description: 'Inspiring examples of bhakti', bookCount: 8 },
      { title: 'Daily Worship', description: 'Practical devotional practices', bookCount: 6 },
      { title: 'Advanced Bhakti', description: 'Deepen your spiritual connection', bookCount: 8 },
    ],
    wisdomTopics: ['Bhakti Yoga', 'Prayer', 'Chanting', 'Surrender', 'Divine Love', 'Worship', 'Spiritual Practice'],
    relatedCategories: ['bhagavad-gita', 'ramayana', 'hanuman', 'children'],
  },
  'relationships': {
    slug: 'relationships',
    title: 'Relationships',
    description: 'Build meaningful spiritual bonds through understanding, compassion, and dharmic principles. Transform all your relationships.',
    icon: Users,
    heroImage: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=1200',
    gradient: 'from-[#F28C28] to-[#3AA7FF]',
    stats: {
      books: 16,
      readingPaths: 3,
      articles: 14,
      resources: 9,
    },
    starterBook: {
      title: 'The Art of Spiritual Relationships',
      author: 'Radhanath Swami',
      image: 'https://images.unsplash.com/photo-1526916027372-0c0852cef5d3?w=600',
      whyStartHere: 'Learn how to bring spiritual consciousness into all your relationships for deeper connection and understanding.',
      difficulty: 'Beginner Friendly',
      readingTime: '1 month',
      whoFor: 'Anyone seeking to improve their relationships through spiritual wisdom',
    },
    learningStages: [
      { stage: 'Stage 1', title: 'Understanding Relationships', books: 3, duration: '2-3 weeks' },
      { stage: 'Stage 2', title: 'Communication', books: 4, duration: '1 month' },
      { stage: 'Stage 3', title: 'Family & Marriage', books: 3, duration: '1 month' },
      { stage: 'Stage 4', title: 'Spiritual Bonds', books: 3, duration: '1-2 months' },
      { stage: 'Stage 5', title: 'Transformation', books: 3, duration: '1-2 months' },
    ],
    collections: [
      { title: 'Relationship Basics', description: 'Foundation principles', bookCount: 4 },
      { title: 'Marriage & Family', description: 'Build strong family bonds', bookCount: 5 },
      { title: 'Communication', description: 'Connect with compassion', bookCount: 3 },
      { title: 'Spiritual Partnerships', description: 'Grow together spiritually', bookCount: 4 },
    ],
    wisdomTopics: ['Communication', 'Compassion', 'Understanding', 'Family', 'Marriage', 'Friendship', 'Love'],
    relatedCategories: ['self-mastery', 'leadership', 'devotion', 'children'],
  },
  'children': {
    slug: 'children',
    title: "Children's Wisdom",
    description: 'Introduce young hearts to timeless spiritual values through stories, adventures, and age-appropriate teachings.',
    icon: Baby,
    heroImage: 'https://images.unsplash.com/photo-1526916027372-0c0852cef5d3?w=1200',
    gradient: 'from-[#3AA7FF] to-[#F5B84B]',
    stats: {
      books: 32,
      readingPaths: 5,
      articles: 20,
      resources: 16,
    },
    starterBook: {
      title: 'Krishna: The Beautiful Legend',
      author: 'Bhaktivedanta Book Trust',
      image: 'https://images.unsplash.com/photo-1489421471208-251cc68284b8?w=600',
      whyStartHere: 'Beautifully illustrated stories that captivate children while teaching essential values.',
      difficulty: 'Ages 5-12',
      readingTime: 'Ongoing',
      whoFor: 'Parents, educators, and children exploring spiritual values',
    },
    learningStages: [
      { stage: 'Stage 1', title: 'First Stories (Ages 3-5)', books: 6, duration: 'Ongoing' },
      { stage: 'Stage 2', title: 'Character Building (Ages 6-8)', books: 7, duration: 'Ongoing' },
      { stage: 'Stage 3', title: 'Epic Adventures (Ages 9-11)', books: 6, duration: 'Ongoing' },
      { stage: 'Stage 4', title: 'Deeper Values (Ages 12-14)', books: 7, duration: 'Ongoing' },
      { stage: 'Stage 5', title: 'Young Adults (Ages 15+)', books: 6, duration: 'Ongoing' },
    ],
    collections: [
      { title: 'Bedtime Stories', description: 'Sacred tales for young ones', bookCount: 8 },
      { title: 'Character Building', description: 'Stories that teach values', bookCount: 7 },
      { title: 'Epic Adventures', description: 'Ramayana and Mahabharata for kids', bookCount: 6 },
      { title: 'Activity Books', description: 'Interactive learning experiences', bookCount: 5 },
      { title: 'For Parents', description: 'Guide your children spiritually', bookCount: 6 },
    ],
    wisdomTopics: ['Values', 'Character', 'Stories', 'Compassion', 'Honesty', 'Courage', 'Kindness'],
    relatedCategories: ['ramayana', 'hanuman', 'devotion', 'relationships'],
  },
};
