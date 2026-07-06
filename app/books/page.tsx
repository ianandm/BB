import { BooksPage } from "@/components/pages/BooksPage";
import { isDatabaseConnected } from "@/lib/db";
import { listActiveBooks } from "@/lib/queries/books";
import type { CatalogBook } from "@/lib/queries/mappers";

function toBooksPageItem(book: CatalogBook) {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    price: book.price,
    image: book.image,
    category: book.category,
    format: book.format,
    rating: book.rating,
    reviews: book.reviewCount,
    insight: book.insight ?? "",
    badge: book.featured ? "Bestseller" : "",
    badgeColor: book.featured ? "#F5B84B" : "",
    description: book.description,
    themes: book.categories.map((c) => c.name),
  };
}

export default async function BooksRoute() {
  let books;

  if (await isDatabaseConnected()) {
    try {
      const dbBooks = await listActiveBooks();
      books = dbBooks.map(toBooksPageItem);
    } catch {
      books = undefined;
    }
  }

  return <BooksPage books={books} />;
}
