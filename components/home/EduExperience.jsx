"use client";

import { useMemo, useState } from "react";

export default function EduExperience({ experiences }) {
  const [tab, setTab] = useState("work");
  const visible = useMemo(
    () =>
      experiences
        .filter((entry) => entry.published)
        .filter((entry) => (tab === "education" ? entry.type === "Education" : entry.type !== "Education")),
    [experiences, tab],
  );

  return (
    <section id="experience" className="border-b border-border">
      <div className="section-shell">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">Journey</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Education &amp; Experience</h2>
        <p className="mt-4 max-w-2xl text-text-muted">Building practical AI, from classroom to client work.</p>

        <div className="experience-tabs" role="tablist" aria-label="Education and experience">
          {[
            ["education", "Education"],
            ["work", "Experience"],
          ].map(([value, label]) => (
            <button key={value} type="button" role="tab" aria-selected={tab === value} className={tab === value ? "active" : ""} onClick={() => setTab(value)}>
              {label}
            </button>
          ))}
        </div>

        {visible.length ? (
          <div className="experience-cards">
            {visible.map((entry) => (
              <article key={entry._id} className="experience-card">
                <div>
                  <h3>{entry.title}</h3>
                  <p className="experience-org">{entry.organization}</p>
                </div>
                <span className="experience-badge">{entry.endDate || "Current"}</span>
                {entry.description ? <p className="experience-description">{entry.description}</p> : null}
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-text-muted">Entries will appear here once added from the admin dashboard.</p>
        )}
      </div>
    </section>
  );
}
