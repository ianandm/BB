import { NextResponse } from "next/server";
import {
  deleteCategoryForAdmin,
  setCategoryActiveForAdmin,
  updateCategoryForAdmin,
} from "@/lib/queries/admin-categories";
import { adminCategorySchema } from "@/lib/validations/admin";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const body = await request.json();

    if (body.action === "hide") {
      const category = await setCategoryActiveForAdmin(id, false);
      return NextResponse.json({ category });
    }

    if (body.action === "show") {
      const category = await setCategoryActiveForAdmin(id, true);
      return NextResponse.json({ category });
    }

    const parsed = adminCategorySchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const category = await updateCategoryForAdmin(id, parsed.data);
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ category });
  } catch (error) {
    console.error("Admin update category error:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    await deleteCategoryForAdmin(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin delete category error:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
