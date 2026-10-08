"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/admin/DashboardShell";

const EMPTY = {
  name: "",
  slug: "",
  explanation: "",
  bestFor: "",
  whenNotToUse: "",
  advanced: false,
  order: 0,
  status: "draft",
};

const inputClass =
  "mt-1 w-full rounded-md border border-border bg-panel-2 px-3 py-2 text-sm text-text outline-none focus:border-accent";

function Field({ label, children }) {
  return (
    <label className="block text-sm text-text-muted">
      {label}
      {children}
    </label>
  );
}

function slugify(s) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
}

export default function RagTypesAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/rag-types");
    setItems(await res.json());
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  function startEdit(t) {
    setEditingId(t._id);
    setForm(t);
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      order: Number(form.order) || 0,
      slug: form.slug || slugify(form.name),
    };
    try {
      const res = await fetch(editingId ? `/api/rag-types/${editingId}` : "/api/rag-types", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      await load();
      resetForm();
    } catch {
      setError("Could not save. Check the fields and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this RAG type?")) return;
    await fetch(`/api/rag-types/${id}`, { method: "DELETE" });
    await load();
    if (editingId === id) resetForm();
  }

  return (
    <DashboardShell>
      <h1 className="font-display text-2xl font-semibold">RAG Types</h1>
      <p className="mt-1 text-text-muted">The approaches shown on the /rag page.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-text-muted">No RAG types yet.</p>
          ) : (
            items.map((t) => (
              <div key={t._id} className="rounded-lg border border-border bg-panel p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display font-semibold text-text">{t.name}</p>
                    <p className="text-xs text-text-muted">
                      {t.advanced ? "Advanced" : "Core"} · {t.status}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button onClick={() => startEdit(t)} className="rounded border border-border px-2 py-1 text-xs hover:border-accent hover:text-accent">Edit</button>
                    <button onClick={() => handleDelete(t._id)} className="rounded border border-border px-2 py-1 text-xs hover:border-red-400 hover:text-red-400">Delete</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-panel p-6">
          <h2 className="font-display text-lg font-semibold">{editingId ? "Edit" : "Add"} RAG type</h2>

          <Field label="Name">
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Explanation">
            <textarea value={form.explanation} onChange={(e) => setForm({ ...form, explanation: e.target.value })} className={inputClass} rows={2} />
          </Field>
          <Field label="Best for">
            <input value={form.bestFor} onChange={(e) => setForm({ ...form, bestFor: e.target.value })} className={inputClass} />
          </Field>
          <Field label="When NOT to use it">
            <input value={form.whenNotToUse} onChange={(e) => setForm({ ...form, whenNotToUse: e.target.value })} className={inputClass} />
          </Field>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Order">
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Status">
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Field>
            <Field label="Advanced?">
              <label className="mt-2 flex items-center gap-2 text-sm text-text-muted">
                <input type="checkbox" checked={form.advanced} onChange={(e) => setForm({ ...form, advanced: e.target.checked })} />
                Yes
              </label>
            </Field>
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-[#04140f] hover:opacity-90 disabled:opacity-60">
              {saving ? "Saving…" : editingId ? "Save changes" : "Add"}
            </button>
            {editingId ? (
              <button type="button" onClick={resetForm} className="rounded-md border border-border px-4 py-2 text-sm text-text-muted hover:text-text">Cancel</button>
            ) : null}
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
