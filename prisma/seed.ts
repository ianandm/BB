import "dotenv/config";
import {
  BookFormat,
  BookStatus,
  DiscountType,
  UserRole,
} from "@prisma/client";
import { prisma } from "../lib/prisma";

async function main() {
  console.log("Seeding BluishBoy bookstore database...");

  // ─── Publisher ─────────────────────────────────────────────────────────────
  const bbt = await prisma.publisher.upsert({
    where: { slug: "bhaktivedanta-book-trust" },
    update: {},
    create: {
      name: "Bhaktivedanta Book Trust",
      slug: "bhaktivedanta-book-trust",
      websiteUrl: "https://www.bbt.org",
    },
  });

  // ─── Authors ───────────────────────────────────────────────────────────────
  const authorData = [
    { name: "Srila Prabhupada", slug: "srila-prabhupada" },
    { name: "Radhanath Swami", slug: "radhanath-swami" },
    { name: "Ranchor Prime", slug: "ranchor-prime" },
  ];

  const authors: Record<string, { id: string }> = {};
  for (const a of authorData) {
    authors[a.slug] = await prisma.author.upsert({
      where: { slug: a.slug },
      update: {},
      create: a,
    });
  }

  // ─── Categories ────────────────────────────────────────────────────────────
  const categoryData = [
    { name: "Bhagavad Gita", slug: "bhagavad-gita", sortOrder: 1 },
    { name: "Ramayana", slug: "ramayana", sortOrder: 2 },
    { name: "Hanuman", slug: "hanuman", sortOrder: 3 },
    { name: "Children", slug: "children", sortOrder: 4 },
    { name: "Self Mastery", slug: "self-mastery", sortOrder: 5 },
    { name: "Leadership", slug: "leadership", sortOrder: 6 },
    { name: "Devotion", slug: "devotion", sortOrder: 7 },
    { name: "Relationships", slug: "relationships", sortOrder: 8 },
    { name: "Biography", slug: "biography", sortOrder: 9 },
    { name: "Philosophy", slug: "philosophy", sortOrder: 10 },
  ];

  const categories: Record<string, { id: string }> = {};
  for (const c of categoryData) {
    categories[c.slug] = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: { ...c, isActive: true },
    });
  }

  // ─── Books ─────────────────────────────────────────────────────────────────
  type BookSeed = {
    slug: string;
    title: string;
    authorSlug: string;
    categorySlugs: string[];
    price: number;
    compareAtPrice?: number;
    description: string;
    coverImageUrl: string;
    format: BookFormat;
    isbn13?: string;
    featured?: boolean;
    rating?: number;
    reviewCount?: number;
    stock?: number;
    sku: string;
  };

  const books: BookSeed[] = [
    {
      slug: "bhagavad-gita-as-it-is",
      title: "Bhagavad Gita As It Is",
      authorSlug: "srila-prabhupada",
      categorySlugs: ["bhagavad-gita", "philosophy"],
      price: 24.99,
      compareAtPrice: 29.99,
      description:
        "The definitive guide to understanding the Gita's timeless wisdom. Translated with commentary by His Divine Grace A.C. Bhaktivedanta Swami Prabhupada.",
      coverImageUrl: "/images/bhagavad-gita-cover.jpg",
      format: BookFormat.HARDCOVER,
      isbn13: "9789171495341",
      featured: true,
      rating: 4.9,
      reviewCount: 2847,
      stock: 120,
      sku: "BB-GITA-HC-001",
    },
    {
      slug: "the-journey-home",
      title: "The Journey Home",
      authorSlug: "radhanath-swami",
      categorySlugs: ["devotion", "biography"],
      price: 18.99,
      description:
        "An inspiring spiritual autobiography tracing one soul's extraordinary pilgrimage from the streets of America to the sacred banks of the Ganges.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=500",
      format: BookFormat.PAPERBACK,
      featured: true,
      rating: 4.8,
      reviewCount: 1203,
      stock: 85,
      sku: "BB-JH-PB-001",
    },
    {
      slug: "perfect-questions-perfect-answers",
      title: "Perfect Questions, Perfect Answers",
      authorSlug: "srila-prabhupada",
      categorySlugs: ["philosophy", "bhagavad-gita"],
      price: 12.99,
      description:
        "Essential conversations on life's most important questions — consciousness, the soul, karma and spiritual liberation.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=500",
      format: BookFormat.PAPERBACK,
      featured: true,
      rating: 4.7,
      reviewCount: 934,
      stock: 200,
      sku: "BB-PQPA-PB-001",
    },
    {
      slug: "the-science-of-self-realization",
      title: "The Science of Self-Realization",
      authorSlug: "srila-prabhupada",
      categorySlugs: ["self-mastery", "philosophy"],
      price: 16.99,
      description:
        "Practical insights into spiritual consciousness and the path of bhakti yoga for modern seekers.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1526916027372-0c0852cef5d3?w=500",
      format: BookFormat.HARDCOVER,
      featured: true,
      rating: 4.8,
      reviewCount: 756,
      stock: 64,
      sku: "BB-SSR-HC-001",
    },
    {
      slug: "ramayana-the-epic",
      title: "Ramayana: The Epic",
      authorSlug: "ranchor-prime",
      categorySlugs: ["ramayana"],
      price: 22.99,
      description:
        "Experience the full Ramayana—the story of Lord Rama, Sita, Hanuman, and the triumph of righteousness over evil.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=600",
      format: BookFormat.HARDCOVER,
      rating: 4.6,
      reviewCount: 412,
      stock: 45,
      sku: "BB-RAM-HC-001",
    },
    {
      slug: "hanuman-the-devoted",
      title: "Hanuman: The Devoted",
      authorSlug: "ranchor-prime",
      categorySlugs: ["hanuman", "devotion"],
      price: 14.99,
      description:
        "Explore the life and lessons of Hanuman—embodiment of devotion, courage, and selfless service.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1604078893234-ff3a1a5d5292?w=600",
      format: BookFormat.PAPERBACK,
      rating: 4.7,
      reviewCount: 289,
      stock: 90,
      sku: "BB-HAN-PB-001",
    },
    {
      slug: "krishna-book-for-children",
      title: "Krishna Book for Children",
      authorSlug: "srila-prabhupada",
      categorySlugs: ["children"],
      price: 19.99,
      description:
        "The pastimes of Lord Krishna retold for children with vivid illustrations.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=600",
      format: BookFormat.HARDCOVER,
      rating: 4.9,
      reviewCount: 567,
      stock: 75,
      sku: "BB-KBC-HC-001",
    },
    {
      slug: "leadership-with-dharma",
      title: "Leadership with Dharma",
      authorSlug: "ranchor-prime",
      categorySlugs: ["leadership", "bhagavad-gita"],
      price: 21.99,
      description:
        "Timeless leadership principles from the Mahabharata, Ramayana, and Bhagavad Gita for ethical decision-making.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?w=600",
      format: BookFormat.HARDCOVER,
      rating: 4.5,
      reviewCount: 198,
      stock: 40,
      sku: "BB-LWD-HC-001",
    },
  ];

  for (const book of books) {
    const created = await prisma.book.upsert({
      where: { slug: book.slug },
      update: {
        price: book.price,
        compareAtPrice: book.compareAtPrice,
        featured: book.featured ?? false,
        averageRating: book.rating ?? 0,
        reviewCount: book.reviewCount ?? 0,
        status: BookStatus.ACTIVE,
      },
      create: {
        title: book.title,
        slug: book.slug,
        description: book.description,
        price: book.price,
        compareAtPrice: book.compareAtPrice,
        coverImageUrl: book.coverImageUrl,
        format: book.format,
        isbn13: book.isbn13,
        publisherId: bbt.id,
        featured: book.featured ?? false,
        averageRating: book.rating ?? 0,
        reviewCount: book.reviewCount ?? 0,
        status: BookStatus.ACTIVE,
        language: "en",
      },
    });

    await prisma.bookAuthor.deleteMany({ where: { bookId: created.id } });
    await prisma.bookAuthor.create({
      data: {
        bookId: created.id,
        authorId: authors[book.authorSlug].id,
        authorOrder: 0,
      },
    });

    await prisma.bookCategory.deleteMany({ where: { bookId: created.id } });
    for (const catSlug of book.categorySlugs) {
      await prisma.bookCategory.create({
        data: {
          bookId: created.id,
          categoryId: categories[catSlug].id,
        },
      });
    }

    await prisma.inventory.upsert({
      where: { bookId: created.id },
      update: { quantityAvailable: book.stock ?? 50 },
      create: {
        bookId: created.id,
        quantityAvailable: book.stock ?? 50,
        quantityReserved: 0,
        reorderThreshold: 10,
        sku: book.sku,
      },
    });

    await prisma.bookImage.deleteMany({ where: { bookId: created.id } });
    await prisma.bookImage.create({
      data: {
        bookId: created.id,
        imageUrl: book.coverImageUrl,
        altText: `${book.title} cover`,
        sortOrder: 0,
        isPrimary: true,
      },
    });
  }

  // ─── Demo users ────────────────────────────────────────────────────────────
  const demoCustomer = await prisma.user.upsert({
    where: { email: "demo@bluishboy.com" },
    update: {},
    create: {
      email: "demo@bluishboy.com",
      firstName: "Demo",
      lastName: "Customer",
      role: UserRole.CUSTOMER,
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@bluishboy.com" },
    update: {},
    create: {
      email: "admin@bluishboy.com",
      firstName: "Admin",
      lastName: "User",
      role: UserRole.ADMIN,
    },
  });

  const address = await prisma.address.upsert({
    where: { id: "00000000-0000-4000-8000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-4000-8000-000000000001",
      userId: demoCustomer.id,
      type: "BOTH",
      fullName: "Demo Customer",
      line1: "123 Wisdom Lane",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90001",
      country: "US",
      isDefault: true,
    },
  });

  await prisma.customerProfile.upsert({
    where: { userId: demoCustomer.id },
    update: {},
    create: {
      userId: demoCustomer.id,
      marketingOptIn: true,
      defaultShippingAddressId: address.id,
      defaultBillingAddressId: address.id,
    },
  });

  // ─── Coupon ────────────────────────────────────────────────────────────────
  await prisma.coupon.upsert({
    where: { code: "WELCOME10" },
    update: {},
    create: {
      code: "WELCOME10",
      discountType: DiscountType.PERCENTAGE,
      discountValue: 10,
      minimumOrderAmount: 25,
      maxUses: 1000,
      isActive: true,
    },
  });

  console.log(`Seeded ${books.length} books, ${categoryData.length} categories`);
  console.log(`Demo customer: demo@bluishboy.com (${demoCustomer.id})`);
  console.log(`Admin user: admin@bluishboy.com (${adminUser.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
