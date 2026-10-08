import Reveal from "./Reveal";

const STATUS_STYLES = {
  Live: "bg-accent/15 text-accent border-accent/40",
  "Case study": "bg-accent-2/15 text-accent-2 border-accent-2/40",
  "In progress": "bg-border text-text-muted border-border",
};

export default function Projects({ projects }) {
  const visible = projects.filter((p) => p.published);

  return (
    <section id="projects" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">Selected work</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Projects</h2>

        {visible.length === 0 ? (
          <p className="mt-8 text-text-muted">
            Projects will appear here as soon as they&apos;re added from the admin dashboard.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {visible.map((p, i) => (
              <Reveal key={p._id} delay={i * 80}>
                <article className="flex flex-col rounded-lg border border-border bg-panel p-6 transition duration-150 hover:border-accent motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_12px_30px_-18px_var(--accent)]">
                <div className="flex items-center justify-between">
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
                    className="mt-5 text-sm font-medium text-accent transition duration-150 hover:underline"
                  >
                    Open case study →
                  </a>
                ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
