import Reveal from "./Reveal";

const CATEGORY_STYLES = {
  "Free Course": "bg-accent/15 text-accent border-accent/40",
  Opportunity: "bg-accent-2/15 text-accent-2 border-accent-2/40",
  Workshop: "bg-border text-text-muted border-border",
  Update: "bg-border text-text-muted border-border",
};

export default function Announcements({ announcements }) {
  const visible = announcements.filter((a) => a.published);

  return (
    <section id="announcements" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">Sharing</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Announcements</h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          Free courses, opportunities, and updates worth passing along.
        </p>

        {visible.length === 0 ? (
          <p className="mt-8 text-text-muted">
            Announcements will appear here once added from the admin dashboard.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((a, i) => (
              <Reveal key={a._id} delay={i * 80}>
                <article className="flex flex-col rounded-lg border border-border bg-panel p-5 transition duration-150 hover:border-accent">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono-tag rounded border px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                      CATEGORY_STYLES[a.category] || CATEGORY_STYLES.Update
                    }`}
                  >
                    {a.category}
                  </span>
                  {a.date ? <span className="font-mono-tag text-xs text-text-muted">{a.date}</span> : null}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-text">{a.title}</h3>
                {a.description ? (
                  <p className="mt-2 text-sm text-text-muted">{a.description}</p>
                ) : null}
                {a.linkUrl ? (
                  <a href={a.linkUrl} className="mt-4 text-sm font-medium text-accent transition duration-150 hover:underline">
                    {a.linkLabel || "Learn more"} →
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