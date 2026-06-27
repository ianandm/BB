import { BestPlaceToStart } from "@/components/BestPlaceToStart";
import { BookCategories } from "@/components/BookCategories";
import { FeaturedBookStory } from "@/components/FeaturedBookStory";
import { Hero } from "@/components/Hero";
import { Newsletter } from "@/components/Newsletter";
import { ReadingPaths } from "@/components/ReadingPaths";
import { SeekingSection } from "@/components/SeekingSection";
import { SpiritualityBlogs } from "@/components/SpiritualityBlogs";
import { TodaysWisdom } from "@/components/TodaysWisdom";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SeekingSection />
      <ReadingPaths />
      <BestPlaceToStart />
      <FeaturedBookStory />
      <BookCategories />
      <TodaysWisdom />
      <SpiritualityBlogs />
      <Newsletter />
    </>
  );
}
