"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/admin/DashboardShell";

const EMPTY = {
  group: "",
  title: "",
  issuer: "",
  year: "",
  credentialUrl: "",
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

export default function CertificationsAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/certifications");
    setItems(await res.json());
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  function startEdit(c) {
    setEditingId(c._id);
    setForm(c);
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
      const res = await fetch(
        editingId ? `/api/certifications/${editingId}` : "/api/certifications",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error("Save failed");
      await load();
      resetForm();
    } catch {
      setError("Could not save this certification. Check the fields and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this certification?")) return;
    await fetch(`/api/certifications/${id}`, { method: "DELETE" });
    await load();
    if (editingId === id) resetForm();
  }

  return (
    <DashboardShell>
      <h1 className="font-display text-2xl font-semibold">Certifications</h1>
      <p className="mt-1 text-text-muted">Grouped by issuer on the live site.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-text-muted">No certifications yet.</p>
          ) : (
            items.map((c) => (
              <div key={c._id} className="rounded-lg border border-border bg-panel p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display font-semibold text-text">{c.title}</p>
                    <p className="text-xs text-text-muted">
                      {c.group} {c.year ? `· ${c.year}` : ""} · {c.published ? "Published" : "Hidden"}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => startEdit(c)}
                      className="rounded border border-border px-2 py-1 text-xs hover:border-accent hover:text-accent"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
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
            {editingId ? "Edit certification" : "Add certification"}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Group (e.g. Google)">
              <input
                required
                value={form.group}
                onChange={(e) => setForm({ ...form, group: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Year">
              <input
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Title">
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
            />
          </Field>

          <Field label="Issuer (optional)">
            <input
              value={form.issuer}
              onChange={(e) => setForm({ ...form, issuer: e.target.value })}
              className={inputClass}
            />
          </Field>

          <Field label="Credential URL">
            <input
              value={form.credentialUrl}
              onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
              className={inputClass}
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
              {saving ? "Saving…" : editingId ? "Save changes" : "Add certification"}
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
