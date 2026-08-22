export default function Skills({ settings }) {
  return (
    <section id="skills" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">Toolkit</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Skills & Tools</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {settings.skills?.map((group, i) => (
            <div key={i} className="rounded-lg border border-border bg-panel p-5">
              <h3 className="font-display text-sm font-semibold text-text">{group.category}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items?.map((item, j) => (
                  <span
                    key={j}
                    className="font-mono-tag rounded border border-border bg-panel-2 px-2 py-1 text-xs text-text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
