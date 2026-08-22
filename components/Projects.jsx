"use client";

import Image from "next/image";
import { useState } from "react";

const STATUS_STYLES = {
  Live: "bg-accent/15 text-accent border-accent/40",
  "Case study": "bg-accent-2/15 text-accent-2 border-accent-2/40",
  "In progress": "bg-border text-text-muted border-border",
};

function getProjectImageSrc(imageUrl) {
  if (!imageUrl) return "";

  const rawValue = String(imageUrl).trim();

  const htmlImageMatch = rawValue.match(/<img[^>]+src=['\"]([^'\"]+)['\"]/i);
  const candidateUrl = htmlImageMatch?.[1] || rawValue.match(/https?:\/\/[^\s"'>]+/)?.[0] || rawValue;

  try {
    const parsedUrl = new URL(candidateUrl);

    if (parsedUrl.hostname === "drive.google.com") {
      const fileIdMatch = parsedUrl.pathname.match(/\/file\/d\/([^/]+)/);
      const fileId = fileIdMatch?.[1] || parsedUrl.searchParams.get("id");

      if (fileId) {
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    }

    return candidateUrl;
  } catch {
    return candidateUrl;
  }
}

export default function Projects({ projects }) {
  const visible = projects.filter((p) => p.published);
  const [openProjectId, setOpenProjectId] = useState(null);
  const [showAllImagesProjectId, setShowAllImagesProjectId] = useState(null);

  function toggleProject(id) {
    setOpenProjectId((currentId) => (currentId === id ? null : id));
    setShowAllImagesProjectId(null);
  }

  function toggleShowAllImages(id) {
    setShowAllImagesProjectId((currentId) => (currentId === id ? null : id));
  }

  function getDemoImages(project) {
    const images = Array.isArray(project.demoImages) ? project.demoImages : [];
    const normalized = images.map(getProjectImageSrc).filter(Boolean);

    if (normalized.length > 0) {
      return normalized;
    }

    return project.imageUrl ? [getProjectImageSrc(project.imageUrl)] : [];
  }

  return (
    <section id="projects" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">Selected work</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Projects</h2>

        {visible.length === 0 ? (
          <p className="mt-8 text-text-muted">
            Projects will appear here as soon as they&apos;re added from the admin dashboard.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {visible.map((p) => (
              <article
                key={p._id}
                className="flex flex-col overflow-hidden rounded-lg border border-border bg-panel"
              >
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono-tag text-xs text-text-muted">{p.category}</span>
                    <span
                      className={`font-mono-tag rounded border px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                        STATUS_STYLES[p.status] || STATUS_STYLES["Case study"]
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-text">{p.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{p.summary}</p>

                  {p.outcome ? (
                    <p className="mt-4 border-l-2 border-accent pl-3 text-sm text-text">
                      {p.outcome}
                    </p>
                  ) : null}

                  {p.tags?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t, i) => (
                        <span
                          key={i}
                          className="font-mono-tag rounded border border-border bg-panel-2 px-2 py-1 text-xs text-text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {p.caseStudyUrl ? (
                      <a
                        href={p.caseStudyUrl}
                        className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-text-muted transition hover:border-accent hover:text-accent"
                      >
                        Open case study →
                      </a>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => toggleProject(p._id)}
                      aria-expanded={openProjectId === p._id}
                      className="inline-flex items-center rounded-md border border-accent/40 px-4 py-2 text-sm font-medium text-accent transition hover:border-accent hover:bg-accent/10"
                    >
                      {openProjectId === p._id ? "Hide demo" : "More info"}
                    </button>
                  </div>

                  {openProjectId === p._id ? (
                    <div className="mt-6 rounded-2xl border border-border bg-panel-2 p-4 md:p-5">
                      <div className="flex flex-col gap-4">
                        {getDemoImages(p).length ? (
                          <div className="space-y-3">
                            <div className="grid gap-3 sm:grid-cols-2">
                              {(showAllImagesProjectId === p._id
                                ? getDemoImages(p)
                                : getDemoImages(p).slice(0, 2)
                              ).map((src, index) => (
                                <div
                                  key={`${p._id}-demo-${index}`}
                                  className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-[#08101e]"
                                >
                                  <Image
                                    src={src}
                                    alt={p.title ? `${p.title} demo image ${index + 1}` : "Project demo image"}
                                    fill
                                    className="object-contain p-3"
                                    sizes="(min-width: 768px) 22vw, 50vw"
                                  />
                                </div>
                              ))}
                            </div>

                            {getDemoImages(p).length > 2 ? (
                              <button
                                type="button"
                                onClick={() => toggleShowAllImages(p._id)}
                                className="inline-flex w-fit items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-text-muted transition hover:border-accent hover:text-accent"
                              >
                                {showAllImagesProjectId === p._id
                                  ? "Show fewer images"
                                  : `Show all images (${getDemoImages(p).length})`}
                              </button>
                            ) : null}
                          </div>
                        ) : (
                          <div className="rounded-xl border border-dashed border-border bg-panel px-4 py-8 text-sm text-text-muted">
                            No demo image has been added yet for this project.
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
