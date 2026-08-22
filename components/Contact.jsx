"use client";

import { useState } from "react";

const SUBJECT_OPTIONS = [
  "Project Collaboration",
  "Job Opportunity / Hiring",
  "Freelance Work",
  "Speaking / Event Invitation",
  "General Question",
  "Other",
];

export default function Contact({ settings }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subjectOption: "General Question",
    customSubject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const links = [
    { label: "WhatsApp", href: settings.whatsappUrl },
    { label: "LinkedIn", href: settings.linkedinUrl },
    { label: "GitHub", href: settings.githubUrl },
    { label: "Kaggle", href: settings.kaggleUrl },
  ].filter((l) => l.href);

  return (
    <section id="contact" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Let&apos;s build something data-driven and useful.
        </h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          I&apos;m open to AI, machine learning, and data science opportunities, plus collaboration on
          projects where the work needs to be clear, practical, and measurable.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-text transition hover:border-accent hover:text-accent"
            >
              {l.label}
            </a>
          ))}
          {settings.resumeUrl ? (
            <a
              href={settings.resumeUrl}
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-[#04140f] transition hover:opacity-90"
            >
              Download Resume
            </a>
          ) : null}
        </div>

        <form
          className="mt-12 max-w-3xl rounded-xl border border-border bg-panel p-6 shadow-sm"
          onSubmit={async (event) => {
            event.preventDefault();

            const subject =
              form.subjectOption === "Other" ? form.customSubject.trim() : form.subjectOption.trim();

            if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
              setStatus({ type: "error", message: "Please fill in all required fields." });
              return;
            }

            if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
              setStatus({ type: "error", message: "Please enter a valid email address." });
              return;
            }

            if (!subject) {
              setStatus({ type: "error", message: "Please choose or enter a subject." });
              return;
            }

            if (form.subjectOption === "Other" && !form.customSubject.trim()) {
              setStatus({ type: "error", message: "Please enter a custom subject." });
              return;
            }

            setSubmitting(true);
            setStatus({ type: "idle", message: "" });

            try {
              const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: form.name.trim(),
                  email: form.email.trim(),
                  subjectOption: form.subjectOption,
                  customSubject: form.customSubject.trim(),
                  message: form.message.trim(),
                }),
              });

              const payload = await response.json().catch(() => ({}));

              if (!response.ok) {
                throw new Error(payload?.error || "Something went wrong. Please try again.");
              }

              setForm({
                name: "",
                email: "",
                subjectOption: "General Question",
                customSubject: "",
                message: "",
              });
              setStatus({
                type: "success",
                message: payload?.message || "Message sent successfully. I'll reply soon.",
              });
            } catch (error) {
              setStatus({
                type: "error",
                message: error instanceof Error ? error.message : "Unable to send your message.",
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-text-muted">
              Name
              <input
                required
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className={inputClass}
                placeholder="Your name"
              />
            </label>

            <label className="block text-sm text-text-muted">
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className={inputClass}
                placeholder="you@example.com"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-text-muted md:col-span-1">
              Subject
              <select
                value={form.subjectOption}
                onChange={(event) =>
                  setForm({
                    ...form,
                    subjectOption: event.target.value,
                    customSubject:
                      event.target.value === "Other" ? form.customSubject : "",
                  })
                }
                className={inputClass}
              >
                {SUBJECT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <div className="md:col-span-1 md:self-end">
              {form.subjectOption === "Other" ? (
                <label className="block text-sm text-text-muted">
                  Custom subject
                  <input
                    required
                    value={form.customSubject}
                    onChange={(event) => setForm({ ...form, customSubject: event.target.value })}
                    className={inputClass}
                    placeholder="Type your subject"
                  />
                </label>
              ) : null}
            </div>
          </div>

          <label className="mt-4 block text-sm text-text-muted">
            Message
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              className={inputClass}
              placeholder="Tell me a bit about what you need"
            />
          </label>

          {status.message ? (
            <p
              className={`mt-4 text-sm ${
                status.type === "success" ? "text-accent" : "text-red-400"
              }`}
            >
              {status.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="mt-5 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-[#04140f] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}

const inputClass =
  "mt-1 w-full rounded-md border border-border bg-panel-2 px-3 py-2 text-sm text-text outline-none focus:border-accent";
