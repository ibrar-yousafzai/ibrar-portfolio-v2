export default function RagFaq({ faqItems }) {
  const visible = faqItems.filter((f) => f.status === "published");

  return (
    <section id="faq" className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">FAQ</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Common questions
        </h2>

        {visible.length === 0 ? (
          <p className="mt-8 text-text-muted">FAQ answers will appear here once added.</p>
        ) : (
          <div className="mt-10 space-y-6">
            {visible.map((f) => (
              <div key={f._id}>
                <h3 className="font-display text-lg font-semibold text-text">{f.question}</h3>
                <p className="mt-2 text-text-muted">{f.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}