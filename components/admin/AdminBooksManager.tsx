"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { AdminBookRow } from "@/lib/queries/admin-books";

type CategoryOption = { id: string; name: string; slug: string };

type BookFormState = {
  title: string;
  author: string;
  description: string;
  price: string;
  coverImageUrl: string;
  categoryId: string;
  format: "HARDCOVER" | "PAPERBACK" | "EBOOK" | "AUDIOBOOK";
  status: "ACTIVE" | "DRAFT" | "ARCHIVED";
  featured: boolean;
  inventoryCount: string;
  isbn13: string;
};

const emptyForm: BookFormState = {
  title: "",
  author: "",
  description: "",
  price: "",
  coverImageUrl: "",
  categoryId: "",
  format: "PAPERBACK",
  status: "ACTIVE",
  featured: false,
  inventoryCount: "0",
  isbn13: "",
};

type AdminBooksManagerProps = {
  initialBooks: AdminBookRow[];
  categories: CategoryOption[];
};

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-emerald-500/15 text-emerald-300",
  DRAFT: "bg-amber-500/15 text-amber-300",
  ARCHIVED: "bg-white/10 text-white/50",
};

export function AdminBooksManager({
  initialBooks,
  categories,
}: AdminBooksManagerProps) {
  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "DRAFT" | "ARCHIVED">("ALL");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BookFormState>(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesStatus = statusFilter === "ALL" || book.status === statusFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.slug.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [books, search, statusFilter]);

  function openCreateForm() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      categoryId: categories[0]?.id ?? "",
    });
    setError("");
    setShowForm(true);
  }

  function openEditForm(book: AdminBookRow) {
    setEditingId(book.id);
    setForm({
      title: book.title,
      author: book.author,
      description: book.description,
      price: String(book.price),
      coverImageUrl: book.coverImageUrl,
      categoryId: book.categoryId || categories[0]?.id || "",
      format: book.format as BookFormState["format"],
      status: book.status,
      featured: book.featured,
      inventoryCount: String(book.inventoryCount),
      isbn13: "",
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
      author: form.author,
      description: form.description || `${form.title} — spiritual wisdom for modern readers.`,
      price: Number(form.price),
      coverImageUrl: form.coverImageUrl,
      categoryId: form.categoryId,
      format: form.format,
      status: form.status,
      featured: form.featured,
      inventoryCount: Number(form.inventoryCount),
      isbn13: form.isbn13 || undefined,
    };

    try {
      const res = await fetch(
        editingId ? `/api/admin/books/${editingId}` : "/api/admin/books",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to save book");
        return;
      }

      if (editingId) {
        setBooks((prev) => prev.map((b) => (b.id === editingId ? data.book : b)));
      } else {
        setBooks((prev) => [data.book, ...prev]);
      }

      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch {
      setError("Failed to save book");
    } finally {
      setLoading(false);
    }
  }

  async function toggleVisibility(book: AdminBookRow) {
    const action = book.status === "ACTIVE" ? "hide" : "show";
    const res = await fetch(`/api/admin/books/${book.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    if (res.ok) {
      const data = await res.json();
      setBooks((prev) => prev.map((b) => (b.id === book.id ? data.book : b)));
    }
  }

  async function deleteBook(book: AdminBookRow) {
    if (!confirm(`Delete "${book.title}" permanently? This cannot be undone.`)) {
      return;
    }

    const res = await fetch(`/api/admin/books/${book.id}`, { method: "DELETE" });
    if (res.ok) {
      setBooks((prev) => prev.filter((b) => b.id !== book.id));
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl text-white">Manage Books</h1>
          <p className="mt-1 text-sm text-white/60">
            Add, hide, or remove books from your storefront
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 px-5 py-3 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          Add book
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search books..."
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
          <option value="ACTIVE">Visible</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Hidden</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-white/60">
            <tr>
              <th className="px-4 py-3 font-medium">Book</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-white/50">
                  No books found
                </td>
              </tr>
            ) : (
              filteredBooks.map((book) => (
                <tr key={book.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-lg bg-white/10">
                        <Image
                          src={book.coverImageUrl}
                          alt={book.title}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white">{book.title}</p>
                        <p className="text-xs text-white/50">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-4 text-white/70 md:table-cell">
                    {book.category}
                  </td>
                  <td className="px-4 py-4 text-white">{formatPrice(book.price)}</td>
                  <td className="hidden px-4 py-4 text-white/70 sm:table-cell">
                    {book.inventoryCount}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[book.status]}`}
                    >
                      {book.status === "ARCHIVED" ? "Hidden" : book.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => toggleVisibility(book)}
                        title={book.status === "ACTIVE" ? "Hide from store" : "Show in store"}
                        className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
                      >
                        {book.status === "ACTIVE" ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditForm(book)}
                        className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteBook(book)}
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
                {editingId ? "Edit book" : "Add new book"}
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
              <div>
                <label className="mb-1 block text-sm text-white/70">Author</label>
                <input
                  required
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Price ($)</label>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-white/70">Cover image URL</label>
                <input
                  required
                  type="text"
                  value={form.coverImageUrl}
                  onChange={(e) =>
                    setForm({ ...form, coverImageUrl: e.target.value.trim() })
                  }
                  placeholder="https://... or /images/book.jpg"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                />
                {form.coverImageUrl && (
                  <CoverPreview key={form.coverImageUrl} src={form.coverImageUrl} />
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-white/70">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Category</label>
                <select
                  required
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Format</label>
                <select
                  value={form.format}
                  onChange={(e) =>
                    setForm({ ...form, format: e.target.value as BookFormState["format"] })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                >
                  <option value="PAPERBACK">Paperback</option>
                  <option value="HARDCOVER">Hardcover</option>
                  <option value="EBOOK">Ebook</option>
                  <option value="AUDIOBOOK">Audiobook</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value as BookFormState["status"] })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                >
                  <option value="ACTIVE">Visible</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ARCHIVED">Hidden</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Stock count</label>
                <input
                  type="number"
                  min="0"
                  value={form.inventoryCount}
                  onChange={(e) => setForm({ ...form, inventoryCount: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <input
                  id="featured"
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="featured" className="text-sm text-white/70">
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
                  className="flex-1 rounded-xl bg-[#3AA7FF] px-4 py-3 font-medium text-white disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingId ? "Save changes" : "Add book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CoverPreview({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <p className="mt-2 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-300">
        No image found at &ldquo;{src}&rdquo;. Check the exact filename — paths are
        case-sensitive in production, the folder is /images/ (plural), and the
        extension must match (.jpg vs .jpeg).
      </p>
    );
  }

  return (
    <div className="mt-2 flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Cover preview"
        onError={() => setFailed(true)}
        className="h-20 w-auto rounded-lg border border-white/10 object-cover"
      />
      <p className="text-xs text-white/50">
        Preview — if this looks right, the storefront will show it too.
      </p>
    </div>
  );
}
