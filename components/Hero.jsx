import DataField from "./DataField";

export default function Hero({ settings, projectCount, certCount }) {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:py-16 lg:py-20">
        <div>
          <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">
            {settings.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            {settings.name}
          </h1>
          <p className="mt-3 text-lg text-text-muted md:text-xl">{settings.role}</p>
          <p className="mt-6 max-w-xl text-base text-text-muted">{settings.heroTagline}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-[#04140f] transition hover:opacity-90"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-text transition hover:border-accent hover:text-accent"
            >
              Get in Touch
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 font-mono-tag">
            <div>
              <dt className="text-xs text-text-muted">Projects</dt>
              <dd className="text-2xl font-semibold text-text">{String(projectCount).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt className="text-xs text-text-muted">Certificates</dt>
              <dd className="text-2xl font-semibold text-text">{String(certCount).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt className="text-xs text-text-muted">Based in</dt>
              <dd className="text-2xl font-semibold text-text">PK</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
          <DataField className="absolute inset-0 h-full w-full opacity-70" />
          {settings.avatarUrl ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-56 w-56 overflow-hidden rounded-2xl border border-border bg-panel shadow-[0_0_0_6px_var(--panel-2)] md:h-64 md:w-64">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={settings.avatarUrl}
                  alt={settings.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}