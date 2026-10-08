import Reveal from "../Reveal";
import MagneticButton from "../MagneticButton";

export default function Packages({ packages }) {
  return (
    <section id="packages" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">Pricing</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Packages</h2>

        {packages.length === 0 ? (
          <p className="mt-8 text-text-muted">Packages will appear here once added in the admin.</p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {packages.map((p, i) => (
              <Reveal key={p._id} delay={i * 80}>
                <div
                  className={`flex flex-col rounded-lg border p-6 transition duration-150 hover:border-accent motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_12px_30px_-18px_var(--accent)] ${
                    p.highlighted ? "border-accent bg-accent/5" : "border-border bg-panel"
                  }`}
                >
                {p.highlighted ? (
                  <span className="font-mono-tag mb-3 w-fit rounded-full bg-accent px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#04140f]">
                    Most popular
                  </span>
                ) : null}
                <h3 className="font-display text-xl font-semibold text-text">{p.name}</h3>
                <p className="mt-2 text-2xl font-semibold text-text">{p.priceText || "TODO"}</p>
                {p.billingNote ? (
                  <p className="text-xs text-text-muted">{p.billingNote}</p>
                ) : null}
                {p.features?.length ? (
                  <ul className="mt-5 space-y-2 text-sm text-text-muted">
                    {p.features.map((f, i) => (
                      <li key={i}>✓ {f}</li>
                    ))}
                  </ul>
                ) : null}
                <MagneticButton
                  href="/rag#contact-rag"
                  className={`mt-6 rounded-md px-4 py-2 text-center text-sm font-medium transition duration-150 ${
                    p.highlighted
                      ? "bg-accent text-[#04140f] hover:opacity-90"
                      : "border border-border text-text hover:border-accent hover:text-accent"
                  }`}
                >
                  Book a free call
                </MagneticButton>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}