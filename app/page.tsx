import { ArticlesSection } from "@/components/home/ArticlesSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedBooksSection } from "@/components/home/FeaturedBooksSection";
import { FeaturedStorySection } from "@/components/home/FeaturedStorySection";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ReadingPathsSection } from "@/components/home/ReadingPathsSection";
import { SeekingSection } from "@/components/home/SeekingSection";
import { TodaysWisdomSection } from "@/components/home/TodaysWisdomSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SeekingSection />
      <ReadingPathsSection />
      <FeaturedBooksSection />
      <FeaturedStorySection />
      <CategoriesSection />
      <TodaysWisdomSection />
      <ArticlesSection />
      <NewsletterSection />
    </>
  );
}
