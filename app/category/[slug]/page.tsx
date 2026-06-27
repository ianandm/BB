import { notFound } from "next/navigation";
import { BestPlaceToStart } from "@/components/BestPlaceToStart";
import { Newsletter } from "@/components/Newsletter";
import { TodaysWisdom } from "@/components/TodaysWisdom";
import { Breadcrumbs } from "@/components/category/Breadcrumbs";
import { CategoryHero } from "@/components/category/CategoryHero";
import { CuratedCollections } from "@/components/category/CuratedCollections";
import { LearningRoadmap } from "@/components/category/LearningRoadmap";
import { RelatedCategories } from "@/components/category/RelatedCategories";
import { StartHere } from "@/components/category/StartHere";
import { WisdomHub } from "@/components/category/WisdomHub";
import { categoryData } from "@/lib/data/categories";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(categoryData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryData[slug];
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryData[slug];
  if (!category) notFound();

  return (
    <>
      <Breadcrumbs categoryTitle={category.title} />
      <CategoryHero
        title={category.title}
        description={category.description}
        heroImage={category.heroImage}
        gradient={category.gradient}
        stats={category.stats}
      />
      <StartHere starterBook={category.starterBook} />
      <LearningRoadmap stages={category.learningStages} />
      <CuratedCollections collections={category.collections} />
      <BestPlaceToStart />
      <WisdomHub topics={category.wisdomTopics} categoryTitle={category.title} />
      <TodaysWisdom />
      <RelatedCategories relatedSlugs={category.relatedCategories} />
      <Newsletter />
    </>
  );
}
