"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/admin/DashboardShell";

const EMPTY = {
  title: "",
  type: "",
  about: "",
  takeaway: "",
  certificateImageUrl: "",
  tags: "",
  date: "",
  order: 0,
  published: true,
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

export default function EventsAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/events");
    setItems(await res.json());
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  function startEdit(e) {
    setEditingId(e._id);
    setForm({ ...e, tags: (e.tags || []).join(", ") });
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
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      const res = await fetch(editingId ? `/api/events/${editingId}` : "/api/events", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      await load();
      resetForm();
    } catch {
      setError("Could not save this event. Check the fields and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    await load();
    if (editingId === id) resetForm();
  }

  return (
    <DashboardShell>
      <h1 className="font-display text-2xl font-semibold">Events</h1>
      <p className="mt-1 text-text-muted">Workshops, hackathons, and community events.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-text-muted">No events yet.</p>
          ) : (
            items.map((e) => (
              <div key={e._id} className="rounded-lg border border-border bg-panel p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display font-semibold text-text">{e.title}</p>
                    <p className="text-xs text-text-muted">
                      {e.type} · {e.published ? "Published" : "Hidden"}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => startEdit(e)}
                      className="rounded border border-border px-2 py-1 text-xs hover:border-accent hover:text-accent"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(e._id)}
                      className="rounded border border-border px-2 py-1 text-xs hover:border-red-400 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-panel p-6">
          <h2 className="font-display text-lg font-semibold">
            {editingId ? "Edit event" : "Add event"}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Title">
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Type">
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={inputClass}
              >
                <option value="">Select</option>
                <option>Workshop</option>
                <option>Hackathon</option>
                <option>Community</option>
              </select>
            </Field>
          </div>

          <Field label="About (what the event covered)">
            <textarea
              value={form.about}
              onChange={(e) => setForm({ ...form, about: e.target.value })}
              className={inputClass}
              rows={2}
            />
          </Field>

          <Field label="Takeaway (what you learned/gained)">
            <textarea
              value={form.takeaway}
              onChange={(e) => setForm({ ...form, takeaway: e.target.value })}
              className={inputClass}
              rows={2}
            />
          </Field>

          <Field label="Certificate image URL">
            <input
              value={form.certificateImageUrl}
              onChange={(e) => setForm({ ...form, certificateImageUrl: e.target.value })}
              className={inputClass}
            />
          </Field>

          <Field label="Tags (comma separated)">
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className={inputClass}
              placeholder="Problem Solving, Teamwork"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Order">
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Visibility">
              <label className="mt-2 flex items-center gap-2 text-sm text-text-muted">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                />
                Published on live site
              </label>
            </Field>
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-[#04140f] hover:opacity-90 disabled:opacity-60"
            >
              {saving ? "Saving…" : editingId ? "Save changes" : "Add event"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md border border-border px-4 py-2 text-sm text-text-muted hover:text-text"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
