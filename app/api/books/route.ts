import { NextResponse } from "next/server";
import {
  getBooksByCategorySlug,
  getFeaturedBooks,
  listActiveBooks,
  searchBooks,
} from "@/lib/queries/books";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");
  const category = searchParams.get("category");
  const q = searchParams.get("q");
  const sort = searchParams.get("sort") as
    | "price_asc"
    | "price_desc"
    | "newest"
    | "rating"
    | null;

  try {
    if (featured === "true") {
      const books = await getFeaturedBooks(Number(searchParams.get("limit") ?? 4));
      return NextResponse.json({ books });
    }

    if (q) {
      const books = await searchBooks(q);
      return NextResponse.json({ books });
    }

    if (category) {
      const books = await getBooksByCategorySlug(category);
      return NextResponse.json({ books });
    }

    const books = await listActiveBooks({ sort: sort ?? undefined });
    return NextResponse.json({ books });
  } catch (error) {
    console.error("Books API error:", error);

    if (
      error instanceof Error &&
      (error.message.includes("DATABASE_URL") ||
        error.message.includes("Can't reach database"))
    ) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}
