"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/admin/DashboardShell";

const EMPTY = {
  title: "",
  category: "",
  status: "Case study",
  summary: "",
  description: "",
  tags: "",
  outcome: "",
  imageUrl: "",
  demoImages: [""],
  caseStudyUrl: "",
  order: 0,
  published: true,
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/projects");
    setProjects(await res.json());
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  function startEdit(p) {
    const demoImages = Array.isArray(p.demoImages) && p.demoImages.length > 0 ? p.demoImages : [p.imageUrl || ""];
    setEditingId(p._id);
    setForm({
      ...p,
      tags: (p.tags || []).join(", "),
      demoImages,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY);
  }

  function updateDemoImage(index, value) {
    setForm((current) => {
      const nextImages = [...(current.demoImages || [])];
      nextImages[index] = value;
      return { ...current, demoImages: nextImages };
    });
  }

  function addDemoImage() {
    setForm((current) => ({ ...current, demoImages: [...(current.demoImages || []), ""] }));
  }

  function removeDemoImage(index) {
    setForm((current) => {
      const nextImages = (current.demoImages || []).filter((_, currentIndex) => currentIndex !== index);
      return { ...current, demoImages: nextImages.length ? nextImages : [""] };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const demoImages = (form.demoImages || []).map((image) => image.trim()).filter(Boolean);
    const payload = {
      ...form,
      order: Number(form.order) || 0,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      imageUrl: demoImages[0] || "",
      demoImages,
    };
    try {
      const res = await fetch(editingId ? `/api/projects/${editingId}` : "/api/projects", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      await load();
      resetForm();
    } catch {
      setError("Could not save this project. Check the fields and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    await load();
    if (editingId === id) resetForm();
  }

  return (
    <DashboardShell>
      <h1 className="font-display text-2xl font-semibold">Projects</h1>
      <p className="mt-1 text-text-muted">These power the Selected Work section on the live site.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {projects.length === 0 ? (
            <p className="text-text-muted">No projects yet — add your first one.</p>
          ) : (
            projects.map((p) => (
              <div key={p._id} className="rounded-lg border border-border bg-panel p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display font-semibold text-text">{p.title}</p>
                    <p className="text-xs text-text-muted">
                      {p.category} · {p.status} · {p.published ? "Published" : "Hidden"}
                    </p>
                    <p className="mt-1 text-[11px] text-text-muted">
                      Demo images: {(p.demoImages?.length || (p.imageUrl ? 1 : 0))}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => startEdit(p)}
                      className="rounded border border-border px-2 py-1 text-xs hover:border-accent hover:text-accent"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
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
            {editingId ? "Edit project" : "Add project"}
          </h2>

          <Field label="Title">
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputClass}
                placeholder="e.g. Environmental AI"
              />
            </Field>
            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className={inputClass}
              >
                <option>Live</option>
                <option>Case study</option>
                <option>In progress</option>
              </select>
            </Field>
          </div>

          <Field label="Summary (1-2 sentences shown on the card)">
            <textarea
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className={inputClass}
              rows={2}
            />
          </Field>

          <Field label="Outcome / result (a real number or result, e.g. 'Reduced false positives by 18%')">
            <input
              value={form.outcome}
              onChange={(e) => setForm({ ...form, outcome: e.target.value })}
              className={inputClass}
            />
          </Field>

          <Field label="Tags (comma separated)">
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className={inputClass}
              placeholder="Python, Regression, EDA"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Case study URL">
              <input
                value={form.caseStudyUrl}
                onChange={(e) => setForm({ ...form, caseStudyUrl: e.target.value })}
                className={inputClass}
              />
            </Field>
            <div className="block text-sm text-text-muted">
              <p className="mb-1">Demo images</p>
              <p className="text-xs text-text-muted">Add 1 or 2 images for the compact preview, or more for the full gallery.</p>
            </div>
          </div>

          <div className="space-y-3 rounded-lg border border-border bg-panel-2 p-4">
            {(form.demoImages || [""]).map((image, index) => (
              <div key={index} className="grid gap-2 md:grid-cols-[1fr_auto]">
                <input
                  value={image}
                  onChange={(e) => updateDemoImage(index, e.target.value)}
                  className={inputClass}
                  placeholder={`Demo image URL ${index + 1}`}
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => removeDemoImage(index)}
                    disabled={(form.demoImages || []).length <= 1}
                    className="rounded-md border border-border px-3 py-2 text-sm text-text-muted disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addDemoImage}
              className="rounded-md border border-accent/40 px-3 py-2 text-sm font-medium text-accent hover:border-accent hover:bg-accent/10"
            >
              Add another image
            </button>
          </div>

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
              {saving ? "Saving…" : editingId ? "Save changes" : "Add project"}
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
