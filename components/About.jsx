export default function About({ settings }) {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">Introduction</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">About Me</h2>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div className="space-y-4 text-text-muted">
            <p className="text-lg text-text">{settings.aboutIntro}</p>
            <p>{settings.aboutBody}</p>
            {settings.communityName ? (
              <p>
                I also lead <span className="text-text">{settings.communityName}</span>, a community
                initiative around learning, collaboration, and opportunity.
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-panel p-5">
              <h3 className="font-display text-sm font-semibold text-accent">How I work</h3>
              <ul className="mt-3 space-y-2 text-sm text-text-muted">
                {settings.howIWork?.map((item, i) => (
                  <li key={i}>— {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-panel p-5">
              <h3 className="font-display text-sm font-semibold text-accent-2">Open to</h3>
              <ul className="mt-3 space-y-2 text-sm text-text-muted">
                {settings.openTo?.map((item, i) => (
                  <li key={i}>— {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
