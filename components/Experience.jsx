const TYPE_COLORS = {
  Education: "border-accent text-accent",
  Work: "border-accent-2 text-accent-2",
  Internship: "border-accent-2 text-accent-2",
  Volunteer: "border-border text-text-muted",
};

export default function Experience({ experiences }) {
  const visible = experiences.filter((e) => e.published);

  return (
    <section id="experience" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">Journey</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Experience &amp; Education
        </h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          From degree to internships to current work — everything that shaped how I approach data.
        </p>

        {visible.length === 0 ? (
          <p className="mt-8 text-text-muted">
            Timeline entries will appear here once added from the admin dashboard.
          </p>
        ) : (
          <ol className="relative mt-12 border-l border-border pl-8">
            {visible.map((e) => (
              <li key={e._id} className="mb-10 last:mb-0">
                <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-bg bg-accent" />
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`font-mono-tag rounded border px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                      TYPE_COLORS[e.type] || TYPE_COLORS.Work
                    }`}
                  >
                    {e.type}
                  </span>
                  <span className="font-mono-tag text-xs text-text-muted">
                    {e.startDate}
                    {e.endDate ? ` — ${e.endDate}` : ""}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold text-text">{e.title}</h3>
                <p className="text-sm text-text-muted">
                  {e.organization}
                  {e.location ? ` · ${e.location}` : ""}
                </p>
                {e.description ? (
                  <p className="mt-2 max-w-2xl text-sm text-text-muted">{e.description}</p>
                ) : null}
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
