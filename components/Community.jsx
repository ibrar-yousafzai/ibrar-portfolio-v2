import Link from "next/link";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

export default function Community({ communities }) {
  const visible = communities.filter((c) => c.published);

  return (
    <section id="community" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">Community</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Communities</h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          Groups and initiatives I lead or take part in.
        </p>

        {visible.length === 0 ? (
          <p className="mt-8 text-text-muted">
            Communities will appear here once added from the admin dashboard.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {visible.map((c, i) => (
              <Reveal key={c._id} delay={i * 80}>
                <div className="rounded-lg border border-border bg-panel p-6 transition duration-150 motion-safe:hover:-translate-y-0.5 hover:border-accent">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-semibold text-text">{c.name}</h3>
                  {c.role ? (
                    <span className="font-mono-tag rounded border border-accent/40 bg-accent/15 px-2 py-0.5 text-[10px] uppercase tracking-wide text-accent">
                      {c.role}
                    </span>
                  ) : null}
                </div>
                {c.memberInfo ? (
                  <p className="mt-1 font-mono-tag text-xs text-text-muted">{c.memberInfo}</p>
                ) : null}
                {c.blurb ? <p className="mt-3 text-sm text-text-muted">{c.blurb}</p> : null}

                <div className="mt-5 flex flex-wrap gap-3">
                  {c.joinUrl ? (
                    <MagneticButton
                      href={c.joinUrl}
                      className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-[#04140f] transition hover:opacity-90"
                    >
                      Join
                    </MagneticButton>
                  ) : null}
                  <Link
                    href="/#contact"
                    className="rounded-md border border-border px-4 py-2 text-sm text-text transition hover:border-accent hover:text-accent"
                  >
                    Get in touch
                  </Link>
                </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}