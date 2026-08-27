"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/admin/DashboardShell";

const inputClass =
  "mt-1 w-full rounded-md border border-border bg-panel-2 px-3 py-2 text-sm text-text outline-none focus:border-accent";

function Field({ label, children, hint }) {
  return (
    <label className="block text-sm text-text-muted">
      {label}
      {children}
      {hint ? <span className="mt-1 block text-xs text-text-muted/70">{hint}</span> : null}
    </label>
  );
}

function Section({ title, children }) {
  return (
    <div className="rounded-lg border border-border bg-panel p-6">
      <h2 className="font-display text-lg font-semibold text-text">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

// Skill groups are edited as "Category: item, item, item" lines for simplicity.
function skillsToText(skills) {
  return (skills || []).map((g) => `${g.category}: ${(g.items || []).join(", ")}`).join("\n");
}

function textToSkills(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [category, rest = ""] = line.split(":");
      return {
        category: category.trim(),
        items: rest.split(",").map((i) => i.trim()).filter(Boolean),
      };
    });
}

function ragItemsToText(items) {
  return (items || []).map((item) => `${item.name}: ${item.description || ""}`).join("\n");
}

function textToRagItems(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, description = ""] = line.split(":");
      return { name: name.trim(), description: description.trim() };
    });
}

export default function SettingsAdmin() {
  const [form, setForm] = useState(null);
  const [skillsText, setSkillsText] = useState("");
  const [howIWorkText, setHowIWorkText] = useState("");
  const [openToText, setOpenToText] = useState("");
  const [ragModelTypesText, setRagModelTypesText] = useState("");
  const [ragIndustriesText, setRagIndustriesText] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        setForm(data);
        setSkillsText(skillsToText(data.skills));
        setHowIWorkText((data.howIWork || []).join("\n"));
        setOpenToText((data.openTo || []).join("\n"));
        setRagModelTypesText(ragItemsToText(data.ragModelTypes));
        setRagIndustriesText(ragItemsToText(data.ragIndustries));
      });
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    const payload = {
      ...form,
      skills: textToSkills(skillsText),
      howIWork: howIWorkText.split("\n").map((s) => s.trim()).filter(Boolean),
      openTo: openToText.split("\n").map((s) => s.trim()).filter(Boolean),
      ragModelTypes: textToRagItems(ragModelTypesText),
      ragIndustries: textToRagItems(ragIndustriesText),
    };
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
    } catch {
      setError("Could not save. Check the fields and try again.");
    } finally {
      setSaving(false);
    }
  }

  if (!form) {
    return (
      <DashboardShell>
        <p className="text-text-muted">Loading…</p>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <h1 className="font-display text-2xl font-semibold">Site content</h1>
      <p className="mt-1 text-text-muted">
        Everything here is reflected on the live site immediately after saving.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <Section title="Hero">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name">
              <input value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Eyebrow (small tag above name)">
              <input value={form.eyebrow} onChange={(e) => update("eyebrow", e.target.value)} className={inputClass} />
            </Field>
          </div>
          <Field label="Role / title">
            <input value={form.role} onChange={(e) => update("role", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Hero tagline">
            <textarea
              value={form.heroTagline}
              onChange={(e) => update("heroTagline", e.target.value)}
              className={inputClass}
              rows={2}
            />
          </Field>
        </Section>

        <Section title="About">
          <Field label="Intro line">
            <textarea
              value={form.aboutIntro}
              onChange={(e) => update("aboutIntro", e.target.value)}
              className={inputClass}
              rows={2}
            />
          </Field>
          <Field label="About body">
            <textarea
              value={form.aboutBody}
              onChange={(e) => update("aboutBody", e.target.value)}
              className={inputClass}
              rows={3}
            />
          </Field>
          <Field label="How I work (one item per line)">
            <textarea
              value={howIWorkText}
              onChange={(e) => setHowIWorkText(e.target.value)}
              className={inputClass}
              rows={4}
            />
          </Field>
          <Field label="Open to (one item per line)">
            <textarea
              value={openToText}
              onChange={(e) => setOpenToText(e.target.value)}
              className={inputClass}
              rows={3}
            />
          </Field>
        </Section>

        <Section title="Skills">
          <Field
            label="One category per line, formatted as: Category: item, item, item"
            hint='Example: "Programming: Python, SQL"'
          >
            <textarea
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              className={inputClass}
              rows={6}
            />
          </Field>
        </Section>

        <Section title="RAG models">
          <Field
            label="RAG overview"
            hint="Explain what RAG is and how you use it in your portfolio."
          >
            <textarea
              value={form.ragIntro || ""}
              onChange={(e) => update("ragIntro", e.target.value)}
              className={inputClass}
              rows={3}
            />
          </Field>
          <Field
            label="RAG model types (one per line: Name: description)"
            hint='Example: "Graph RAG: Connects entities and relationships across documents."'
          >
            <textarea
              value={ragModelTypesText}
              onChange={(e) => setRagModelTypesText(e.target.value)}
              className={inputClass}
              rows={5}
            />
          </Field>
          <Field
            label="Industries that need RAG (one per line: Industry: use case)"
          >
            <textarea
              value={ragIndustriesText}
              onChange={(e) => setRagIndustriesText(e.target.value)}
              className={inputClass}
              rows={6}
            />
          </Field>
        </Section>

        <Section title="Community">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Community name">
              <input
                value={form.communityName}
                onChange={(e) => update("communityName", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Join URL">
              <input
                value={form.communityJoinUrl}
                onChange={(e) => update("communityJoinUrl", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
          <Field label="Community blurb">
            <textarea
              value={form.communityBlurb}
              onChange={(e) => update("communityBlurb", e.target.value)}
              className={inputClass}
              rows={2}
            />
          </Field>
        </Section>

        <Section title="Vision statement">
          <Field label="Shown under Certifications">
            <textarea
              value={form.visionStatement}
              onChange={(e) => update("visionStatement", e.target.value)}
              className={inputClass}
              rows={3}
            />
          </Field>
        </Section>

        <Section title="Contact & socials">
          <div className="grid grid-cols-2 gap-4">
            <Field label="WhatsApp URL">
              <input value={form.whatsappUrl} onChange={(e) => update("whatsappUrl", e.target.value)} className={inputClass} />
            </Field>
            <Field label="LinkedIn URL">
              <input value={form.linkedinUrl} onChange={(e) => update("linkedinUrl", e.target.value)} className={inputClass} />
            </Field>
            <Field label="GitHub URL">
              <input value={form.githubUrl} onChange={(e) => update("githubUrl", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Kaggle URL">
              <input value={form.kaggleUrl} onChange={(e) => update("kaggleUrl", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Facebook URL">
              <input value={form.facebookUrl} onChange={(e) => update("facebookUrl", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Email">
              <input value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Resume URL">
              <input value={form.resumeUrl} onChange={(e) => update("resumeUrl", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Location">
              <input value={form.location} onChange={(e) => update("location", e.target.value)} className={inputClass} />
            </Field>
          </div>
        </Section>

        <Section title="SEO">
          <Field label="Meta title">
            <input value={form.metaTitle} onChange={(e) => update("metaTitle", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Meta description">
            <textarea
              value={form.metaDescription}
              onChange={(e) => update("metaDescription", e.target.value)}
              className={inputClass}
              rows={2}
            />
          </Field>
        </Section>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        {saved ? <p className="text-sm text-accent">Saved.</p> : null}

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-[#04140f] hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save all changes"}
        </button>
      </form>
    </DashboardShell>
  );
}
