"use client";

import { useMemo, useState } from "react";
import { Eye, EyeOff, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import type { AdminBlogRow } from "@/lib/queries/admin-blogs";

type BlogFormState = {
  title: string;
  excerpt: string;
  body: string;
  category: string;
  categoryColor: string;
  readTime: string;
  relatedBook: string;
  coverImageUrl: string;
  featured: boolean;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
};

const emptyForm: BlogFormState = {
  title: "",
  excerpt: "",
  body: "",
  category: "",
  categoryColor: "#3AA7FF",
  readTime: "",
  relatedBook: "",
  coverImageUrl: "",
  featured: false,
  status: "DRAFT",
};

const statusStyles: Record<string, string> = {
  PUBLISHED: "bg-emerald-500/15 text-emerald-300",
  DRAFT: "bg-amber-500/15 text-amber-300",
  ARCHIVED: "bg-white/10 text-white/50",
};

export function AdminBlogsManager({ initialBlogs }: { initialBlogs: AdminBlogRow[] }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT" | "ARCHIVED">("ALL");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogFormState>(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesStatus = statusFilter === "ALL" || blog.status === statusFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.slug.toLowerCase().includes(q) ||
        (blog.category?.toLowerCase().includes(q) ?? false);
      return matchesStatus && matchesSearch;
    });
  }, [blogs, search, statusFilter]);

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  }

  function openEditForm(blog: AdminBlogRow) {
    setEditingId(blog.id);
    setForm({
      title: blog.title,
      excerpt: blog.excerpt ?? "",
      body: blog.body,
      category: blog.category ?? "",
      categoryColor: blog.categoryColor ?? "#3AA7FF",
      readTime: blog.readTime ?? "",
      relatedBook: blog.relatedBook ?? "",
      coverImageUrl: blog.coverImageUrl ?? "",
      featured: blog.featured,
      status: blog.status,
    });
    setError("");
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      title: form.title,
      excerpt: form.excerpt || undefined,
      body: form.body,
      category: form.category || undefined,
      categoryColor: form.categoryColor,
      readTime: form.readTime || undefined,
      relatedBook: form.relatedBook || undefined,
      coverImageUrl: form.coverImageUrl || undefined,
      featured: form.featured,
      status: form.status,
    };

    try {
      const res = await fetch(
        editingId ? `/api/admin/blogs/${editingId}` : "/api/admin/blogs",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to save blog");
        return;
      }

      if (editingId) {
        setBlogs((prev) => prev.map((b) => (b.id === editingId ? data.blog : b)));
      } else {
        setBlogs((prev) => [data.blog, ...prev]);
      }

      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch {
      setError("Failed to save blog");
    } finally {
      setLoading(false);
    }
  }

  async function toggleVisibility(blog: AdminBlogRow) {
    const action = blog.status === "PUBLISHED" ? "hide" : "show";
    const res = await fetch(`/api/admin/blogs/${blog.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    if (res.ok) {
      const data = await res.json();
      setBlogs((prev) => prev.map((b) => (b.id === blog.id ? data.blog : b)));
    }
  }

  async function deleteBlog(blog: AdminBlogRow) {
    if (!confirm(`Delete "${blog.title}" permanently?`)) return;

    const res = await fetch(`/api/admin/blogs/${blog.id}`, { method: "DELETE" });
    if (res.ok) {
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl text-white">Blogs</h1>
          <p className="mt-1 text-sm text-white/60">
            Add, edit, hide, or remove wisdom articles
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F28C28] to-[#F28C28]/80 px-5 py-3 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          Add article
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pr-4 pl-10 text-sm text-white placeholder-white/40 focus:border-[#3AA7FF]/50 focus:outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:outline-none"
        >
          <option value="ALL">All statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Hidden</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-white/60">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-white/50">
                  No articles found
                </td>
              </tr>
            ) : (
              filtered.map((blog) => (
                <tr key={blog.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-4">
                    <p className="font-medium text-white">{blog.title}</p>
                    {blog.excerpt && (
                      <p className="mt-0.5 line-clamp-1 text-xs text-white/50">{blog.excerpt}</p>
                    )}
                  </td>
                  <td className="hidden px-4 py-4 text-white/70 md:table-cell">
                    {blog.category ?? "—"}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[blog.status]}`}
                    >
                      {blog.status === "ARCHIVED" ? "Hidden" : blog.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => toggleVisibility(blog)}
                        title={blog.status === "PUBLISHED" ? "Hide" : "Publish"}
                        className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
                      >
                        {blog.status === "PUBLISHED" ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditForm(blog)}
                        className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteBlog(blog)}
                        className="rounded-lg p-2 text-white/60 hover:bg-red-500/10 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#1A1F3A] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-2xl text-white">
                {editingId ? "Edit article" : "Add article"}
              </h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-white/60 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-white/70">Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-white/70">Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-white/70">Body</label>
                <textarea
                  required
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  rows={8}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Category label</label>
                <input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Mindfulness"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Read time</label>
                <input
                  value={form.readTime}
                  onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                  placeholder="5 min read"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Related book</label>
                <input
                  value={form.relatedBook}
                  onChange={(e) => setForm({ ...form, relatedBook: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Cover image URL</label>
                <input
                  type="url"
                  value={form.coverImageUrl}
                  onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value as BlogFormState["status"] })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                >
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ARCHIVED">Hidden</option>
                </select>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <input
                  id="blog-featured"
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="blog-featured" className="text-sm text-white/70">
                  Feature on homepage
                </label>
              </div>

              {error && (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 sm:col-span-2">
                  {error}
                </p>
              )}

              <div className="flex gap-3 sm:col-span-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-white/70 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-[#F28C28] px-4 py-3 font-medium text-white disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingId ? "Save changes" : "Add article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
