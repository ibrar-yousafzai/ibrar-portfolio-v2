import MagneticButton from "../MagneticButton";

export default function RagHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-12 md:grid-cols-2 md:py-16">
        <div>
          <span className="font-mono-tag inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs uppercase tracking-wide text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> AI Support Assistants
          </span>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            AI assistants that answer your customers from{" "}
            <span className="text-accent">your own data</span>
          </h1>
          <p className="mt-5 max-w-lg text-text-muted">
            Trained on your docs, policies, and catalog — live in days, every answer shows its
            source, and tricky questions hand off to your team.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <MagneticButton
              href="/rag#contact-rag"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-[#04140f] transition hover:opacity-90"
            >
              Book a free call
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#04140f]/10 transition group-hover:translate-x-0.5">
                →
              </span>
            </MagneticButton>
            <a
              href="#demo"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-text transition hover:border-accent hover:text-accent"
            >
              Try the live demo
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-text-muted">
            <li>Live in days, not months</li>
            <li>Every answer shows its source</li>
            <li>Hands tricky chats to your team</li>
          </ul>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-12 rounded-full bg-accent/10 blur-3xl motion-reduce:hidden" />
          <div className="relative rounded-2xl border border-border bg-panel p-5 shadow-[0_0_60px_-20px_var(--accent)]">
            <p className="font-mono-tag text-[10px] uppercase tracking-wide text-text-muted">
              Sample conversation
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="ml-auto max-w-[80%] rounded-lg rounded-tr-none bg-panel-2 px-3 py-2 text-text">
                Do you ship to Lahore, and how long does it take?
              </div>
              <div className="max-w-[85%] rounded-lg rounded-tl-none bg-accent/10 px-3 py-2 text-text">
                Yes — orders to Lahore usually arrive in 2–3 business days.
                <p className="mt-1 font-mono-tag text-[10px] text-accent">Source: Shipping policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}