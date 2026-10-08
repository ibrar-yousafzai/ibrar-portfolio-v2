import Link from "next/link";

export default function HomeRoutingBlock() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-2">
        <Link
          href="/rag"
          className="group rounded-lg border border-border bg-panel p-6 transition duration-150 motion-safe:hover:-translate-y-0.5 hover:border-accent"
        >
          <p className="font-mono-tag text-xs uppercase tracking-wide text-accent">Business</p>
          <h3 className="mt-2 font-display text-lg font-semibold text-text">
            I&apos;m a business looking for an AI assistant
          </h3>
          <p className="mt-2 text-sm text-text-muted">
            See how I build AI assistants trained on your own data.
          </p>
          <span className="mt-4 inline-block text-sm text-accent group-hover:underline">
            Explore AI Assistants →
          </span>
        </Link>

        <a
          href="/#projects"
          className="group rounded-lg border border-border bg-panel p-6 transition duration-150 motion-safe:hover:-translate-y-0.5 hover:border-accent"
        >
          <p className="font-mono-tag text-xs uppercase tracking-wide text-accent-2">Hiring / Collaborating</p>
          <h3 className="mt-2 font-display text-lg font-semibold text-text">
            I&apos;m hiring, collaborating, or want to see projects
          </h3>
          <p className="mt-2 text-sm text-text-muted">
            Browse my data science and machine learning work directly.
          </p>
          <span className="mt-4 inline-block text-sm text-accent-2 group-hover:underline">
            View projects →
          </span>
        </a>
      </div>
    </section>
  );
}