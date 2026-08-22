"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardShell from "@/components/admin/DashboardShell";

export default function DashboardOverview() {
  const [stats, setStats] = useState({ projects: 0, certifications: 0, events: 0, visitors: 0 });

  useEffect(() => {
    async function load() {
      const [projects, certifications, events, visitors] = await Promise.all([
        fetch("/api/projects").then((r) => r.json()),
        fetch("/api/certifications").then((r) => r.json()),
        fetch("/api/events").then((r) => r.json()),
        fetch("/api/visitors").then((r) => r.json()),
      ]);
      setStats({
        projects: projects.length,
        certifications: certifications.length,
        events: events.length,
        visitors: visitors.count,
      });
    }
    load();
  }, []);

  const cards = [
    { label: "Projects", value: stats.projects, href: "/admin/dashboard/projects" },
    { label: "Certifications", value: stats.certifications, href: "/admin/dashboard/certifications" },
    { label: "Events", value: stats.events, href: "/admin/dashboard/events" },
    { label: "Total visits", value: stats.visitors, href: null },
  ];

  return (
    <DashboardShell>
      <h1 className="font-display text-2xl font-semibold">Overview</h1>
      <p className="mt-1 text-text-muted">Everything on the live site is editable from here.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Wrapper = c.href ? Link : "div";
          return (
            <Wrapper
              key={c.label}
              href={c.href || undefined}
              className="rounded-lg border border-border bg-panel p-5 transition hover:border-accent"
            >
              <p className="text-xs uppercase tracking-wide text-text-muted">{c.label}</p>
              <p className="font-mono-tag mt-2 text-3xl font-semibold text-accent">{c.value}</p>
            </Wrapper>
          );
        })}
      </div>

      <div className="mt-10 rounded-lg border border-border bg-panel p-6">
        <h2 className="font-display text-lg font-semibold">Quick start</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-text-muted">
          <li>Edit hero text, about, skills, socials and SEO in <strong className="text-text">Site content</strong>.</li>
          <li>Add real case studies with outcomes in <strong className="text-text">Projects</strong>.</li>
          <li>Replace placeholder cards with real entries in <strong className="text-text">Events</strong>.</li>
          <li>Group your certificates by issuer in <strong className="text-text">Certifications</strong>.</li>
        </ul>
      </div>
    </DashboardShell>
  );
}
