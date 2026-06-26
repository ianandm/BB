import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data/homepage";

export function CategoriesSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-heading mb-4 text-4xl text-white sm:text-5xl">
            Explore Book Categories
          </h2>
          <p className="font-body text-lg text-white/60">
            Enter different realms of spiritual knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/books?category=${category.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 transition-all hover:border-white/20"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.gradient} to-transparent opacity-80`}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <p className="font-body mb-2 text-sm text-white/80">
                    {category.count}
                  </p>
                  <h3 className="font-heading-secondary mb-2 text-2xl text-white">
                    {category.title}
                  </h3>
                  <p className="font-body text-sm text-white/90">
                    {category.description}
                  </p>
                  <ArrowRight className="mt-4 h-5 w-5 text-white opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
