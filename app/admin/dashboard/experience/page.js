"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/admin/DashboardShell";

const EMPTY = {
  title: "",
  organization: "",
  type: "Work",
  startDate: "",
  endDate: "Present",
  location: "",
  description: "",
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

export default function ExperienceAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/experiences");
    setItems(await res.json());
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  function startEdit(e) {
    setEditingId(e._id);
    setForm(e);
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
      const res = await fetch(editingId ? `/api/experiences/${editingId}` : "/api/experiences", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      await load();
      resetForm();
    } catch {
      setError("Could not save this entry. Check the fields and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this experience entry?")) return;
    await fetch(`/api/experiences/${id}`, { method: "DELETE" });
    await load();
    if (editingId === id) resetForm();
  }

  return (
    <DashboardShell>
      <h1 className="font-display text-2xl font-semibold">Experience &amp; Education</h1>
      <p className="mt-1 text-text-muted">
        Degree, internships, jobs — shown as a timeline on the live site.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-text-muted">No entries yet.</p>
          ) : (
            items.map((e) => (
              <div key={e._id} className="rounded-lg border border-border bg-panel p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display font-semibold text-text">{e.title}</p>
                    <p className="text-xs text-text-muted">
                      {e.organization} · {e.type} · {e.published ? "Published" : "Hidden"}
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
            {editingId ? "Edit entry" : "Add entry"}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Title (role or degree)">
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass}
                placeholder="e.g. BS Computer Science"
              />
            </Field>
            <Field label="Type">
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={inputClass}
              >
                <option>Education</option>
                <option>Work</option>
                <option>Internship</option>
                <option>Volunteer</option>
              </select>
            </Field>
          </div>

          <Field label="Organization (school or company)">
            <input
              required
              value={form.organization}
              onChange={(e) => setForm({ ...form, organization: e.target.value })}
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Start">
              <input
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className={inputClass}
                placeholder="2022"
              />
            </Field>
            <Field label="End">
              <input
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className={inputClass}
                placeholder="Present"
              />
            </Field>
            <Field label="Location">
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={inputClass}
              rows={3}
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
              {saving ? "Saving…" : editingId ? "Save changes" : "Add entry"}
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
