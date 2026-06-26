import { categories } from "./homepage";

export type Book = {
  id: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  categorySlug: string;
  format: string;
  insight?: string;
  featured?: boolean;
  tags?: string[];
};

export const books: Book[] = [
  {
    id: "book-1",
    slug: "bhagavad-gita-as-it-is",
    title: "Bhagavad Gita As It Is",
    author: "Srila Prabhupada",
    price: 24.99,
    description: "The definitive guide to understanding the Gita's timeless wisdom",
    longDescription:
      "In a world of constant change and uncertainty, the Bhagavad Gita offers timeless wisdom on purpose, duty, and inner peace. Srila Prabhupada's translation makes these ancient teachings accessible to modern readers. Perfect for seekers at any stage—whether you're facing life decisions, seeking spiritual growth, or simply curious about Eastern philosophy.",
    image: "https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=600",
    categorySlug: "bhagavad-gita",
    format: "Hardcover",
    insight: "Great for beginners",
    featured: true,
    tags: ["Philosophy", "Self-Mastery", "Leadership"],
  },
  {
    id: "book-5",
    slug: "bhagavad-gita-pocket-edition",
    title: "Bhagavad Gita — Pocket Edition",
    author: "Srila Prabhupada",
    price: 9.99,
    description: "Carry the Gita's wisdom wherever you go",
    longDescription:
      "A compact edition of the Bhagavad Gita As It Is, perfect for daily reading and travel. Contains the complete text with purports in a portable format.",
    image: "https://images.unsplash.com/photo-1604078893234-ff3a1a5d5292?w=600",
    categorySlug: "bhagavad-gita",
    format: "Paperback",
    insight: "Perfect travel companion",
  },
  {
    id: "book-6",
    slug: "gita-for-daily-life",
    title: "Gita for Daily Life",
    author: "Various Authors",
    price: 19.99,
    description: "Apply timeless teachings to modern challenges",
    longDescription:
      "A practical guide to integrating Bhagavad Gita principles into everyday decisions, relationships, and work life.",
    image: "https://images.unsplash.com/photo-1526916027372-0c0852cef5d3?w=600",
    categorySlug: "bhagavad-gita",
    format: "Paperback",
    insight: "Practical daily guidance",
  },
  {
    id: "book-2",
    slug: "the-journey-home",
    title: "The Journey Home",
    author: "Radhanath Swami",
    price: 18.99,
    description: "An inspiring spiritual autobiography of self-discovery",
    longDescription:
      "Radhanath Swami shares his extraordinary journey from suburban Chicago to the caves of the Himalayas and finally to the heart of bhakti yoga in India. A captivating story of faith, adventure, and spiritual awakening.",
    image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=400",
    categorySlug: "devotion",
    format: "Paperback",
    insight: "Inspiring devotional stories",
    featured: true,
    tags: ["Biography", "Devotion"],
  },
  {
    id: "book-3",
    slug: "perfect-questions-perfect-answers",
    title: "Perfect Questions, Perfect Answers",
    author: "Srila Prabhupada",
    price: 12.99,
    description: "Essential conversations on life's most important questions",
    longDescription:
      "A series of illuminating conversations between Srila Prabhupada and a thoughtful seeker. Covers the nature of the soul, reincarnation, karma, and the path of bhakti yoga in clear, accessible language.",
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=400",
    categorySlug: "bhagavad-gita",
    format: "Paperback",
    insight: "Perfect for curious minds",
    featured: true,
    tags: ["Philosophy", "Beginner"],
  },
  {
    id: "book-4",
    slug: "the-science-of-self-realization",
    title: "The Science of Self-Realization",
    author: "Srila Prabhupada",
    price: 16.99,
    description: "Practical insights into spiritual consciousness",
    longDescription:
      "A collection of essays and conversations exploring the science of yoga, meditation, and self-realization. Ideal for those seeking practical spiritual guidance for modern life.",
    image: "https://images.unsplash.com/photo-1526916027372-0c0852cef5d3?w=400",
    categorySlug: "self-mastery",
    format: "Hardcover",
    insight: "Practical daily guidance",
    featured: true,
    tags: ["Self-Mastery", "Philosophy"],
  },
  {
    id: "book-7",
    slug: "ramayana-the-epic",
    title: "Ramayana: The Epic",
    author: "Valmiki (trans. Ranchor Prime)",
    price: 22.99,
    description: "The complete epic tale of dharma and devotion",
    longDescription:
      "Experience the full Ramayana—the story of Lord Rama, Sita, Hanuman, and the triumph of righteousness over evil. Beautifully retold for modern readers.",
    image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=600",
    categorySlug: "ramayana",
    format: "Hardcover",
    insight: "Epic storytelling",
  },
  {
    id: "book-8",
    slug: "sita-her-story",
    title: "Sita: Her Story",
    author: "Ranchor Prime",
    price: 15.99,
    description: "The Ramayana through Sita's eyes",
    longDescription:
      "A fresh perspective on the Ramayana, exploring Sita's strength, devotion, and wisdom. An inspiring read for seekers of all backgrounds.",
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600",
    categorySlug: "ramayana",
    format: "Paperback",
    insight: "Fresh perspective",
  },
  {
    id: "book-9",
    slug: "hanuman-the-devoted",
    title: "Hanuman: The Devoted",
    author: "Various Authors",
    price: 14.99,
    description: "Stories of strength, service, and surrender",
    longDescription:
      "Explore the life and lessons of Hanuman—embodiment of devotion, courage, and selfless service. Stories and teachings for daily inspiration.",
    image: "https://images.unsplash.com/photo-1604078893234-ff3a1a5d5292?w=600",
    categorySlug: "hanuman",
    format: "Paperback",
    insight: "Stories of devotion",
  },
  {
    id: "book-10",
    slug: "stories-of-hanuman",
    title: "Stories of Hanuman for Children",
    author: "Various Authors",
    price: 11.99,
    description: "Sacred tales of Hanuman for young hearts",
    longDescription:
      "Beautifully illustrated stories of Hanuman's adventures, perfect for reading aloud with children. Teaches courage, devotion, and humility.",
    image: "https://images.unsplash.com/photo-1526916027372-0c0852cef5d3?w=600",
    categorySlug: "hanuman",
    format: "Hardcover",
    insight: "All ages",
  },
  {
    id: "book-11",
    slug: "krishna-book-for-children",
    title: "Krishna Book for Children",
    author: "Srila Prabhupada",
    price: 19.99,
    description: "Sacred stories that inspire young hearts",
    longDescription:
      "The pastimes of Lord Krishna retold for children with vivid illustrations. A beloved introduction to Vedic wisdom for the whole family.",
    image: "https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=600",
    categorySlug: "children",
    format: "Hardcover",
    insight: "Family favorite",
  },
  {
    id: "book-12",
    slug: "stories-for-children",
    title: "Stories for Children",
    author: "Various Authors",
    price: 13.99,
    description: "Sacred narratives that inspire young minds",
    longDescription:
      "A collection of timeless Vedic stories adapted for children, teaching values of honesty, compassion, and devotion through engaging narratives.",
    image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=600",
    categorySlug: "children",
    format: "Paperback",
    insight: "Ages 5–12",
  },
  {
    id: "book-13",
    slug: "inner-strength-guide",
    title: "Build Inner Strength",
    author: "Various Authors",
    price: 17.99,
    description: "Develop resilience through spiritual wisdom",
    longDescription:
      "Practical exercises and teachings from Vedic wisdom to build mental resilience, emotional balance, and spiritual discipline.",
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600",
    categorySlug: "self-mastery",
    format: "Paperback",
    insight: "Intermediate level",
  },
  {
    id: "book-14",
    slug: "leadership-with-dharma",
    title: "Leadership with Dharma",
    author: "Various Authors",
    price: 21.99,
    description: "Lead with dharmic principles in the modern world",
    longDescription:
      "Drawing from the Mahabharata, Ramayana, and Bhagavad Gita, this guide offers timeless leadership principles for ethical decision-making and servant leadership.",
    image: "https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=600",
    categorySlug: "leadership",
    format: "Hardcover",
    insight: "For leaders",
  },
  {
    id: "book-15",
    slug: "the-art-of-devotion",
    title: "The Art of Devotion",
    author: "Various Authors",
    price: 16.99,
    description: "Deepen your spiritual connection through bhakti",
    longDescription:
      "A comprehensive introduction to bhakti yoga practices—chanting, deity worship, and community service—as paths to divine love.",
    image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=600",
    categorySlug: "devotion",
    format: "Paperback",
    insight: "Bhakti essentials",
  },
  {
    id: "book-16",
    slug: "spiritual-relationships",
    title: "Spiritual Relationships",
    author: "Various Authors",
    price: 15.99,
    description: "Build meaningful bonds rooted in dharma",
    longDescription:
      "Explore how Vedic wisdom guides marriage, friendship, family, and community relationships toward harmony, respect, and spiritual growth.",
    image: "https://images.unsplash.com/photo-1604078893234-ff3a1a5d5292?w=600",
    categorySlug: "relationships",
    format: "Paperback",
    insight: "For couples & families",
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getBooksByCategory(categorySlug: string): Book[] {
  return books.filter((book) => book.categorySlug === categorySlug);
}

export function getFeaturedBooks(): Book[] {
  return books.filter((book) => book.featured);
}

export const featuredBooks = getFeaturedBooks();

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryName(slug: string): string {
  return getCategoryBySlug(slug)?.title ?? slug;
}
