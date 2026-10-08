import DataField from "./DataField";
import MagneticButton from "./MagneticButton";

export default function Hero({ settings, projectCount, certCount }) {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:py-20">
        <div>
          <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">
            {settings.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            {settings.name}
          </h1>
          
                    <p className="mt-3 text-lg text-text-muted md:text-xl">{settings.role}</p>
          {settings.foundingLine ? (
            <p className="mt-2 text-sm text-text-muted">{settings.foundingLine}</p>
          ) : null}
          <p className="mt-6 max-w-xl text-base text-text-muted">{settings.heroTagline}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <MagneticButton
              href="#projects"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-[#04140f] transition hover:opacity-90"
            >
              View Projects
            </MagneticButton>
            <a
              href="#contact"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-text transition hover:border-accent hover:text-accent"
            >
              Get in Touch
            </a>
          </div>

                    <ul className="mt-12 flex max-w-xl flex-wrap gap-x-8 gap-y-3 font-mono-tag text-xs text-text-muted">
            <li>Live in days, not months</li>
            <li>Every answer shows its source</li>
            <li>Free first call</li>
          </ul>
                  </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl motion-reduce:hidden" />
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
