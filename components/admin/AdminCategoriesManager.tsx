"use client";

import { useMemo, useState } from "react";
import { Eye, EyeOff, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import type { AdminCategoryRow } from "@/lib/queries/admin-categories";

type CategoryFormState = {
  name: string;
  description: string;
  imageUrl: string;
  sortOrder: string;
  isActive: boolean;
};

const emptyForm: CategoryFormState = {
  name: "",
  description: "",
  imageUrl: "",
  sortOrder: "0",
  isActive: true,
};

export function AdminCategoriesManager({
  initialCategories,
}: {
  initialCategories: AdminCategoryRow[];
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CategoryFormState>(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return categories.filter(
      (cat) =>
        !q ||
        cat.name.toLowerCase().includes(q) ||
        cat.slug.toLowerCase().includes(q),
    );
  }, [categories, search]);

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  }

  function openEditForm(category: AdminCategoryRow) {
    setEditingId(category.id);
    setForm({
      name: category.name,
      description: category.description ?? "",
      imageUrl: category.imageUrl ?? "",
      sortOrder: String(category.sortOrder),
      isActive: category.isActive,
    });
    setError("");
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name: form.name,
      description: form.description || undefined,
      imageUrl: form.imageUrl || undefined,
      sortOrder: Number(form.sortOrder),
      isActive: form.isActive,
    };

    try {
      const res = await fetch(
        editingId ? `/api/admin/categories/${editingId}` : "/api/admin/categories",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to save category");
        return;
      }

      if (editingId) {
        setCategories((prev) =>
          prev.map((c) => (c.id === editingId ? data.category : c)),
        );
      } else {
        setCategories((prev) => [...prev, data.category].sort((a, b) => a.sortOrder - b.sortOrder));
      }

      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch {
      setError("Failed to save category");
    } finally {
      setLoading(false);
    }
  }

  async function toggleVisibility(category: AdminCategoryRow) {
    const action = category.isActive ? "hide" : "show";
    const res = await fetch(`/api/admin/categories/${category.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    if (res.ok) {
      const data = await res.json();
      setCategories((prev) => prev.map((c) => (c.id === category.id ? data.category : c)));
    }
  }

  async function deleteCategory(category: AdminCategoryRow) {
    if (category.bookCount > 0) {
      alert(`Cannot delete "${category.name}" — it has ${category.bookCount} book(s). Hide it instead.`);
      return;
    }

    if (!confirm(`Delete "${category.name}" permanently?`)) return;

    const res = await fetch(`/api/admin/categories/${category.id}`, { method: "DELETE" });
    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c.id !== category.id));
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl text-white">Categories</h1>
          <p className="mt-1 text-sm text-white/60">
            Add, edit, hide, or remove book categories
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3AA7FF] to-[#3AA7FF]/80 px-5 py-3 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          Add category
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pr-4 pl-10 text-sm text-white placeholder-white/40 focus:border-[#3AA7FF]/50 focus:outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-white/60">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">Slug</th>
              <th className="px-4 py-3 font-medium">Books</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-white/50">
                  No categories found
                </td>
              </tr>
            ) : (
              filtered.map((category) => (
                <tr key={category.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-4 font-medium text-white">{category.name}</td>
                  <td className="hidden px-4 py-4 text-white/50 md:table-cell">
                    {category.slug}
                  </td>
                  <td className="px-4 py-4 text-white/70">{category.bookCount}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        category.isActive
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-white/10 text-white/50"
                      }`}
                    >
                      {category.isActive ? "Visible" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => toggleVisibility(category)}
                        title={category.isActive ? "Hide" : "Show"}
                        className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
                      >
                        {category.isActive ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditForm(category)}
                        className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCategory(category)}
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
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#1A1F3A] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-2xl text-white">
                {editingId ? "Edit category" : "Add category"}
              </h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-white/60 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div>
                <label className="mb-1 block text-sm text-white/70">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Image URL (optional)</label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Sort order</label>
                <input
                  type="number"
                  min="0"
                  value={form.sortOrder}
                  onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="cat-active"
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="cat-active" className="text-sm text-white/70">
                  Visible on storefront
                </label>
              </div>

              {error && (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </p>
              )}

              <div className="flex gap-3">
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
                  {loading ? "Saving..." : editingId ? "Save changes" : "Add category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
