import Reveal from "./Reveal";

export default function Certifications({ certifications, visionStatement }) {
  const visible = certifications.filter((c) => c.published);
  const grouped = visible.reduce((acc, c) => {
    acc[c.group] = acc[c.group] || [];
    acc[c.group].push(c);
    return acc;
  }, {});

  return (
    <section id="certifications" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">Credentials</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Certifications &amp; Vision
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(grouped).map(([group, items], i) => (
            <Reveal key={group} delay={i * 80}>
              <div className="rounded-lg border border-border bg-panel p-5 transition duration-150 hover:border-accent">
              <h3 className="font-display text-sm font-semibold text-text">{group}</h3>
              <ul className="mt-3 space-y-2 text-sm text-text-muted">
                {items.map((c) => (
                  <li key={c._id}>
                    {c.credentialUrl ? (
                      <a href={c.credentialUrl} className="transition duration-150 hover:text-accent hover:underline">
                        {c.title}
                      </a>
                    ) : (
                      c.title
                    )}
                    {c.year ? <span className="font-mono-tag text-xs text-text-muted"> · {c.year}</span> : null}
                  </li>
                ))}
              </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {visionStatement ? (
          <p className="mt-10 max-w-3xl border-l-2 border-accent-2 pl-4 text-text-muted">
            {visionStatement}
          </p>
        ) : null}
      </div>
    </section>
  );
}
