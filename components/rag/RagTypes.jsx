import Reveal from "../Reveal";

export default function RagTypes({ ragTypes }) {
  const core = ragTypes.filter((t) => !t.advanced);
  const advanced = ragTypes.filter((t) => t.advanced);

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">Approaches</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          RAG types I build
        </h2>

        {ragTypes.length === 0 ? (
          <p className="mt-8 text-text-muted">RAG types will appear here once added in the admin.</p>
        ) : (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {core.map((t, i) => (
                <Reveal key={t._id} delay={i * 80}>
                  <RagTypeCard t={t} />
                </Reveal>
              ))}
            </div>
            {advanced.length > 0 ? (
              <>
                <p className="font-mono-tag mt-12 text-xs uppercase tracking-[0.2em] text-text-muted">
                  Advanced options
                </p>
                <div className="mt-4 grid gap-6 md:grid-cols-2">
                  {advanced.map((t, i) => (
                    <Reveal key={t._id} delay={i * 80}>
                      <RagTypeCard t={t} />
                    </Reveal>
                  ))}
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}

function RagTypeCard({ t }) {
  return (
    <div className="rounded-lg border border-border bg-panel p-5 transition duration-150 hover:border-accent">
      <h3 className="font-display text-lg font-semibold text-text">{t.name}</h3>
      <p className="mt-2 text-sm text-text-muted">{t.explanation}</p>
      {t.bestFor ? (
        <p className="mt-3 text-sm"><span className="text-accent">Best for:</span> <span className="text-text-muted">{t.bestFor}</span></p>
      ) : null}
      {t.whenNotToUse ? (
        <p className="mt-1 text-sm"><span className="text-accent-2">Not for:</span> <span className="text-text-muted">{t.whenNotToUse}</span></p>
      ) : null}
    </div>
  );
}