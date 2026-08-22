export default function Community({ settings }) {
  return (
    <section id="community" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">Community</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          {settings.communityName}
        </h2>
        <p className="mt-4 max-w-2xl text-text-muted">{settings.communityBlurb}</p>

        <div className="mt-8 flex flex-wrap gap-4">
          {settings.communityJoinUrl ? (
            <a
              href={settings.communityJoinUrl}
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-[#04140f] transition hover:opacity-90"
            >
              Join the community
            </a>
          ) : null}
          <a
            href="#contact"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-text transition hover:border-accent hover:text-accent"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
