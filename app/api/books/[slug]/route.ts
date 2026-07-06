import { NextResponse } from "next/server";
import { getBookBySlug } from "@/lib/queries/books";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  try {
    const book = await getBookBySlug(slug);
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    return NextResponse.json({ book });
  } catch (error) {
    console.error("Book detail API error:", error);

    if (
      error instanceof Error &&
      (error.message.includes("DATABASE_URL") ||
        error.message.includes("Can't reach database"))
    ) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}
