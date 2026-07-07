import { BlogStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import {
  deleteBlogForAdmin,
  setBlogStatusForAdmin,
  updateBlogForAdmin,
} from "@/lib/queries/admin-blogs";
import { adminBlogSchema } from "@/lib/validations/admin";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const body = await request.json();

    if (body.action === "hide") {
      const blog = await setBlogStatusForAdmin(id, BlogStatus.ARCHIVED);
      return NextResponse.json({ blog });
    }

    if (body.action === "show") {
      const blog = await setBlogStatusForAdmin(id, BlogStatus.PUBLISHED);
      return NextResponse.json({ blog });
    }

    const parsed = adminBlogSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const blog = await updateBlogForAdmin(id, parsed.data);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error("Admin update blog error:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    await deleteBlogForAdmin(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin delete blog error:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
