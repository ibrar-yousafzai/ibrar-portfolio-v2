import Reveal from "./Reveal";

export default function Projects({ projects }) {
  const visible = projects.filter((p) => p.published);

  return (
    <section id="projects" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="projects-heading">
          <div>
            <p className="section-kicker">Selected work</p>
            <h2>Built for useful outcomes</h2>
          </div>
          <p>Applied AI, data products, and automation with a clear path from problem to result.</p>
        </div>

        {visible.length === 0 ? (
          <p className="mt-8 text-text-muted">
            Projects will appear here as soon as they&apos;re added from the admin dashboard.
          </p>
        ) : (
          <div className="projects-grid">
            {visible.map((p, i) => (
              <Reveal key={p._id} delay={i * 80} className="project-grid-item">
                <article className="project-card">
                <div className="project-card-media">
                  {p.imageUrl ? <img src={p.imageUrl} alt="" /> : <span>{String(i + 1).padStart(2, "0")}</span>}
                  <span className="project-card-status">{p.status}</span>
                </div>
                <div className="project-card-body">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tag text-xs text-text-muted">{p.category}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-text">{p.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{p.summary}</p>

                {p.outcome ? (
                  <p className="mt-4 border-l-2 border-accent pl-3 text-sm text-text">{p.outcome}</p>
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

                {p.caseStudyUrl ? (
                  <a
                    href={p.caseStudyUrl}
                    className="project-card-link"
                  >
                    Open case study →
                  </a>
                ) : null}
                </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
