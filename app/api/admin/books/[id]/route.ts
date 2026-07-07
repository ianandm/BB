import { BookStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import {
  deleteBookForAdmin,
  setBookStatusForAdmin,
  updateBookForAdmin,
} from "@/lib/queries/admin-books";
import { adminBookUpdateSchema } from "@/lib/validations/admin";
import { z } from "zod";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

const statusSchema = z.object({
  status: z.nativeEnum(BookStatus),
});

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const body = await request.json();

    if (body.action === "hide") {
      const book = await setBookStatusForAdmin(id, BookStatus.ARCHIVED);
      return NextResponse.json({ book });
    }

    if (body.action === "show") {
      const book = await setBookStatusForAdmin(id, BookStatus.ACTIVE);
      return NextResponse.json({ book });
    }

    if (body.status && Object.keys(body).length === 1) {
      const parsed = statusSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      const book = await setBookStatusForAdmin(id, parsed.data.status);
      return NextResponse.json({ book });
    }

    const parsed = adminBookUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const book = await updateBookForAdmin(id, parsed.data);
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ book });
  } catch (error) {
    console.error("Admin update book error:", error);
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    await deleteBookForAdmin(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin delete book error:", error);
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 });
  }
}
