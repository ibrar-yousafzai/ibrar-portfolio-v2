"use client";

import { useState } from "react";
import MagneticButton from "../MagneticButton";

const inputClass =
  "mt-1 w-full rounded-md border border-border bg-panel-2 px-3 py-2 text-sm text-text outline-none transition duration-150 focus:border-accent";

export default function RagContactCta() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    try {
      const res = await fetch("/api/contact-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          subject: "Free call request — AI Assistants",
          source: "rag-final-cta",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setStatus("success");
      setFeedback(data.message);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setFeedback(err.message || "Something went wrong.");
    }
  }

  return (
    <section id="contact-rag" className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Book a free call
        </h2>
        <p className="mt-4 text-text-muted">
          Tell me what your customers keep asking — I&apos;ll reply with how this could work for you.
        </p>

        {status === "success" ? (
          <div className="mt-8 rounded-lg border border-accent/40 bg-accent/10 p-6 text-text">
            {feedback}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-4">
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
            <input
              required
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
            <textarea
              required
              rows={4}
              placeholder="What are your customers asking you most?"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={inputClass}
            />
            {status === "error" ? <p className="text-sm text-red-400">{feedback}</p> : null}
            <MagneticButton
              type="submit"
              disabled={status === "saving"}
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-[#04140f] transition duration-150 hover:opacity-90 disabled:opacity-60"
            >
              {status === "saving" ? "Sending…" : "Send"}
            </MagneticButton>
          </form>
        )}
      </div>
    </section>
  );
}