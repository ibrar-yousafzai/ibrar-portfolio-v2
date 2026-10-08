"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/admin/DashboardShell";

const EMPTY = { question: "", answer: "", order: 0, status: "draft" };

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

export default function FaqAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/faq-items");
    setItems(await res.json());
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  function startEdit(f) {
    setEditingId(f._id);
    setForm(f);
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = { ...form, order: Number(form.order) || 0 };
    try {
      const res = await fetch(editingId ? `/api/faq-items/${editingId}` : "/api/faq-items", {
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
    if (!confirm("Delete this FAQ item?")) return;
    await fetch(`/api/faq-items/${id}`, { method: "DELETE" });
    await load();
    if (editingId === id) resetForm();
  }

  return (
    <DashboardShell>
      <h1 className="font-display text-2xl font-semibold">FAQ</h1>
      <p className="mt-1 text-text-muted">Shown on /rag and included in the FAQPage JSON-LD.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-text-muted">No FAQ items yet.</p>
          ) : (
            items.map((f) => (
              <div key={f._id} className="rounded-lg border border-border bg-panel p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display font-semibold text-text">{f.question}</p>
                    <p className="text-xs text-text-muted">{f.status}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button onClick={() => startEdit(f)} className="rounded border border-border px-2 py-1 text-xs hover:border-accent hover:text-accent">Edit</button>
                    <button onClick={() => handleDelete(f._id)} className="rounded border border-border px-2 py-1 text-xs hover:border-red-400 hover:text-red-400">Delete</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-panel p-6">
          <h2 className="font-display text-lg font-semibold">{editingId ? "Edit" : "Add"} FAQ item</h2>

          <Field label="Question">
            <input required value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Answer">
            <textarea required value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} className={inputClass} rows={3} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Order">
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Status">
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
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
