import { NextResponse } from "next/server";
import { createBlogForAdmin, listBlogsForAdmin } from "@/lib/queries/admin-blogs";
import { adminBlogSchema } from "@/lib/validations/admin";

export const runtime = "nodejs";

export async function GET() {
  try {
    const blogs = await listBlogsForAdmin();
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Admin blogs list error:", error);
    return NextResponse.json({ error: "Failed to load blogs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = adminBlogSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const blog = await createBlogForAdmin(parsed.data);
    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    console.error("Admin create blog error:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
