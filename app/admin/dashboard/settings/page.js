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

function ImageField({ label, value, onChange, hint }) {
  function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      window.alert("Please choose an image smaller than 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <Field label={label} hint={hint}>
      <input value={value || ""} onChange={(e) => onChange(e.target.value)} className={inputClass} placeholder="https://..." />
      <input type="file" accept="image/*" onChange={handleFile} className="mt-2 block w-full text-xs text-text-muted file:mr-3 file:rounded file:border-0 file:bg-panel-2 file:px-3 file:py-1.5 file:text-text" />
      {value ? <img src={value} alt="" className="mt-3 h-20 w-32 rounded object-cover" /> : null}
    </Field>
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

export default function SettingsAdmin() {
  const [form, setForm] = useState(null);
  const [skillsText, setSkillsText] = useState("");
  const [howIWorkText, setHowIWorkText] = useState("");
  const [openToText, setOpenToText] = useState("");
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
          <div className="grid grid-cols-2 gap-4">
            <Field label="Primary button text">
              <input value={form.heroPrimaryCta || ""} onChange={(e) => update("heroPrimaryCta", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Secondary button text">
              <input value={form.heroSecondaryCta || ""} onChange={(e) => update("heroSecondaryCta", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Hero band text">
              <input value={form.heroBandLabel || ""} onChange={(e) => update("heroBandLabel", e.target.value)} className={inputClass} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ImageField label="Shared profile image" value={form.avatarUrl} onChange={(value) => update("avatarUrl", value)} hint="Used everywhere when the shared-image option is enabled." />
            <Field label="Favicon URL" hint="Small icon shown in the browser tab">
              <input
                value={form.faviconUrl}
                onChange={(e) => update("faviconUrl", e.target.value)}
                className={inputClass}
                placeholder="https://... (square image, e.g. 512x512)"
              />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm text-text-muted">
            <input type="checkbox" checked={Boolean(form.useSameProfileImage)} onChange={(e) => update("useSameProfileImage", e.target.checked)} />
            Use this image for both hero and About
          </label>
          {!form.useSameProfileImage ? (
            <div className="grid grid-cols-2 gap-4">
              <ImageField label="Hero background image" value={form.heroImageUrl} onChange={(value) => update("heroImageUrl", value)} />
              <ImageField label="About profile image" value={form.aboutImageUrl} onChange={(value) => update("aboutImageUrl", value)} />
            </div>
          ) : null}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Hero image position" hint="Examples: center center, center 30%, 50% 20%">
              <input value={form.heroImagePosition || "center center"} onChange={(e) => update("heroImagePosition", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Hero image overlay" hint="Lower values show more of the image (10–80%)">
              <input type="number" min="10" max="80" value={form.heroImageOverlay ?? 42} onChange={(e) => update("heroImageOverlay", Number(e.target.value))} className={inputClass} />
            </Field>
            <Field label="Hero image fit" hint="Use contain when the full image must remain visible">
              <select value={form.heroImageFit || "cover"} onChange={(e) => update("heroImageFit", e.target.value)} className={inputClass}>
                <option value="cover">Cover — fills hero</option>
                <option value="contain">Contain — shows full image</option>
              </select>
            </Field>
            <Field label="Image brightness (%)" hint="Recommended: 65–90">
              <input type="number" min="45" max="120" value={form.heroImageBrightness ?? 78} onChange={(e) => update("heroImageBrightness", Number(e.target.value))} className={inputClass} />
            </Field>
            <Field label="Image saturation (%)" hint="100 is natural color">
              <input type="number" min="0" max="160" value={form.heroImageSaturation ?? 92} onChange={(e) => update("heroImageSaturation", Number(e.target.value))} className={inputClass} />
            </Field>
            <Field label="Image contrast (%)" hint="100 is unchanged">
              <input type="number" min="70" max="140" value={form.heroImageContrast ?? 103} onChange={(e) => update("heroImageContrast", Number(e.target.value))} className={inputClass} />
            </Field>
          </div>
          <Field label="Sidebar role / detail">
            <input value={form.sidebarRole || ""} onChange={(e) => update("sidebarRole", e.target.value)} className={inputClass} placeholder="AI Engineer · RAG Chatbots" />
          </Field>
        </Section>

        <Section title="About">
          <Field label="Section subtitle">
            <input value={form.aboutSectionSubtitle || ""} onChange={(e) => update("aboutSectionSubtitle", e.target.value)} className={inputClass} />
          </Field>
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

        <Section title="Home cards and section headings">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Business card title"><input value={form.businessCardTitle || ""} onChange={(e) => update("businessCardTitle", e.target.value)} className={inputClass} /></Field>
            <Field label="Collaboration card title"><input value={form.collaborationCardTitle || ""} onChange={(e) => update("collaborationCardTitle", e.target.value)} className={inputClass} /></Field>
            <Field label="Business card link text"><input value={form.businessCardLink || ""} onChange={(e) => update("businessCardLink", e.target.value)} className={inputClass} /></Field>
            <Field label="Collaboration card link text"><input value={form.collaborationCardLink || ""} onChange={(e) => update("collaborationCardLink", e.target.value)} className={inputClass} /></Field>
            <Field label="Projects kicker"><input value={form.projectsKicker || ""} onChange={(e) => update("projectsKicker", e.target.value)} className={inputClass} /></Field>
            <Field label="Projects heading"><input value={form.projectsHeading || ""} onChange={(e) => update("projectsHeading", e.target.value)} className={inputClass} /></Field>
            <Field label="Skills kicker"><input value={form.skillsKicker || ""} onChange={(e) => update("skillsKicker", e.target.value)} className={inputClass} /></Field>
            <Field label="Skills heading"><input value={form.skillsHeading || ""} onChange={(e) => update("skillsHeading", e.target.value)} className={inputClass} /></Field>
          </div>
          <Field label="Business card description"><textarea value={form.businessCardBody || ""} onChange={(e) => update("businessCardBody", e.target.value)} className={inputClass} rows={2} /></Field>
          <Field label="Collaboration card description"><textarea value={form.collaborationCardBody || ""} onChange={(e) => update("collaborationCardBody", e.target.value)} className={inputClass} rows={2} /></Field>
          <Field label="Projects intro"><textarea value={form.projectsIntro || ""} onChange={(e) => update("projectsIntro", e.target.value)} className={inputClass} rows={2} /></Field>
          <Field label="Skills intro"><textarea value={form.skillsIntro || ""} onChange={(e) => update("skillsIntro", e.target.value)} className={inputClass} rows={2} /></Field>
        </Section>

        <Section title="Vision copy">
          <Field label="Vision heading"><input value={form.visionHeading || ""} onChange={(e) => update("visionHeading", e.target.value)} className={inputClass} /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="AI Products title"><input value={form.visionProductsTitle || ""} onChange={(e) => update("visionProductsTitle", e.target.value)} className={inputClass} /></Field>
            <Field label="Giving Back title"><input value={form.visionGrowthTitle || ""} onChange={(e) => update("visionGrowthTitle", e.target.value)} className={inputClass} /></Field>
          </div>
          <Field label="AI Products paragraphs (one per line)"><textarea value={(form.visionProductsBody || []).join("\n")} onChange={(e) => update("visionProductsBody", e.target.value.split("\n"))} className={inputClass} rows={3} /></Field>
          <Field label="Giving Back paragraphs (one per line)"><textarea value={(form.visionGrowthBody || []).join("\n")} onChange={(e) => update("visionGrowthBody", e.target.value.split("\n"))} className={inputClass} rows={3} /></Field>
        </Section>

        <Section title="Contact copy">
          <Field label="Contact heading"><input value={form.contactHeading || ""} onChange={(e) => update("contactHeading", e.target.value)} className={inputClass} /></Field>
          <Field label="Contact description"><textarea value={form.contactBody || ""} onChange={(e) => update("contactBody", e.target.value)} className={inputClass} rows={2} /></Field>
          <Field label="Contact button text"><input value={form.contactCta || ""} onChange={(e) => update("contactCta", e.target.value)} className={inputClass} /></Field>
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
            <Field label="Instagram URL">
              <input value={form.instagramUrl || ""} onChange={(e) => update("instagramUrl", e.target.value)} className={inputClass} />
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
