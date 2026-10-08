import Reveal from "../Reveal";

const SCRIPT = [
  {
    q: "What's your return policy on electronics?",
    a: "Electronics can be returned within 14 days if unused and in original packaging.",
    source: "Returns policy",
  },
  {
    q: "Where's my order #48213?",
    a: "Order #48213 shipped yesterday and is expected to arrive within 3 business days.",
    source: "Order lookup (live system)",
  },
  {
    q: "Can you give me a discount if I buy 50 units for my office?",
    a: "I'm not able to approve bulk pricing — I've forwarded this to the sales team, and someone will follow up within one business day.",
    source: "Handed off to your team",
  },
];

export default function RagDemo() {
  return (
    <section id="demo" className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-14">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">
          Sample — not a live assistant
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          What a conversation looks like
        </h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          A scripted example for a fictional online store — showing how answers cite a source,
          pull live data, and know when to hand off.
        </p>

        <div className="mt-10 space-y-6">
          {SCRIPT.map((turn, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="rounded-lg border border-border bg-panel p-5 transition duration-150 hover:border-accent">
              <p className="font-mono-tag text-xs text-text-muted">Customer</p>
              <p className="mt-1 text-text">{turn.q}</p>
              <p className="font-mono-tag mt-4 text-xs text-accent">Assistant</p>
              <p className="mt-1 text-text-muted">{turn.a}</p>
              <p className="font-mono-tag mt-2 text-[10px] uppercase tracking-wide text-accent">
                Source: {turn.source}
              </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}