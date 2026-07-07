import { NextResponse } from "next/server";
import {
  createBookForAdmin,
  listAllBooksForAdmin,
} from "@/lib/queries/admin-books";
import { adminBookSchema } from "@/lib/validations/admin";

export const runtime = "nodejs";

export async function GET() {
  try {
    const books = await listAllBooksForAdmin();
    return NextResponse.json({ books });
  } catch (error) {
    console.error("Admin list books error:", error);
    return NextResponse.json({ error: "Failed to load books" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = adminBookSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const book = await createBookForAdmin(parsed.data);
    return NextResponse.json({ book }, { status: 201 });
  } catch (error) {
    console.error("Admin create book error:", error);
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 });
  }
}
