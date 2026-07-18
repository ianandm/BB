import { BestPlaceToStart } from "@/components/BestPlaceToStart";
import { BookCategories } from "@/components/BookCategories";
import { FeaturedBookStory } from "@/components/FeaturedBookStory";
import { Hero } from "@/components/Hero";
import { Newsletter } from "@/components/Newsletter";
import { ReadingPaths } from "@/components/ReadingPaths";
import { SeekingSection } from "@/components/SeekingSection";
import { SpiritualityBlogs } from "@/components/SpiritualityBlogs";
import { TodaysWisdom } from "@/components/TodaysWisdom";
import { isDatabaseConnected } from "@/lib/db";
import { getFeaturedBooks } from "@/lib/queries/books";

// Refresh from the database at most every 5 minutes (safety net;
// admin mutations also revalidate these pages instantly).
export const revalidate = 300;

export default async function HomePage() {
  let featuredBooks;

  if (await isDatabaseConnected()) {
    try {
      featuredBooks = await getFeaturedBooks(4);
    } catch {
      featuredBooks = undefined;
    }
  }

  return (
    <>
      <Hero />
      <SeekingSection />
      <ReadingPaths />
      <BestPlaceToStart books={featuredBooks} />
      <FeaturedBookStory />
      <BookCategories />
      <TodaysWisdom />
      <SpiritualityBlogs />
      <Newsletter />
    </>
  );
}
