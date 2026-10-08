const INDUSTRIES = [
  "E-commerce", "Finance", "Healthcare", "Education", "Legal", "Manufacturing",
];

export default function Industries() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">Who it's for</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Industries</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {INDUSTRIES.map((i) => (
            <span
              key={i}
              className="font-mono-tag rounded-full border border-border bg-panel px-4 py-2 text-xs text-text-muted"
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}