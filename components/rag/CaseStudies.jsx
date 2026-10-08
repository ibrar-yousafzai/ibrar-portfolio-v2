import Reveal from "../Reveal";

export default function CaseStudies({ caseStudies }) {
  const visible = caseStudies.filter((c) => c.status === "published");

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">
          Case studies
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Recent work</h2>

        {visible.length === 0 ? (
          <p className="mt-8 text-text-muted">Case studies will appear here once published.</p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {visible.map((c, i) => (
              <Reveal key={c._id} delay={i * 80}>
                <div className="rounded-lg border border-border bg-panel p-6 transition duration-150 hover:border-accent motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_12px_30px_-18px_var(--accent)]">
                {c.isTodoPlaceholder ? (
                  <span className="font-mono-tag mb-3 inline-block rounded border border-accent-2/40 bg-accent-2/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-accent-2">
                    TODO — placeholder
                  </span>
                ) : null}
                <h3 className="font-display text-xl font-semibold text-text">{c.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{c.summary || "Summary coming soon."}</p>
                {c.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.tags.map((t, i) => (
                      <span
                        key={i}
                        className="font-mono-tag rounded border border-border bg-panel-2 px-2 py-1 text-xs text-text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
                {c.linkUrl ? (
                  <a href={c.linkUrl} className="mt-4 inline-block text-sm text-accent transition duration-150 hover:underline">
                    View details →
                  </a>
                ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}