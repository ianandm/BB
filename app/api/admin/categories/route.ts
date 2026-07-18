import { NextResponse } from "next/server";
import {
  createCategoryForAdmin,
  listCategoriesForAdminPanel,
} from "@/lib/queries/admin-categories";
import { adminCategorySchema } from "@/lib/validations/admin";
import { revalidateBookPages } from "@/lib/revalidation";

export const runtime = "nodejs";

export async function GET() {
  try {
    const categories = await listCategoriesForAdminPanel();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Admin categories list error:", error);
    return NextResponse.json({ error: "Failed to load categories" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = adminCategorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const category = await createCategoryForAdmin(parsed.data);
    revalidateBookPages();
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error("Admin create category error:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
