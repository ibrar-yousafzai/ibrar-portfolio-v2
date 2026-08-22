export default function Events({ events }) {
  const visible = events.filter((e) => e.published);

  return (
    <section id="events" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">Events</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Event Attempts &amp; Certificates
        </h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          Talks, workshops, competitions, and community events I&apos;ve attended or attempted.
        </p>

        {visible.length === 0 ? (
          <p className="mt-8 text-text-muted">
            No events published yet — add the first one from the admin dashboard.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((e) => (
              <article key={e._id} className="rounded-lg border border-border bg-panel p-5">
                {e.certificateImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={e.certificateImageUrl}
                    alt={`${e.title} certificate`}
                    className="mb-4 h-36 w-full rounded object-cover"
                  />
                ) : null}
                <span className="font-mono-tag text-xs text-accent">{e.type}</span>
                <h3 className="mt-1 font-display text-lg font-semibold text-text">{e.title}</h3>
                {e.about ? <p className="mt-2 text-sm text-text-muted">{e.about}</p> : null}
                {e.takeaway ? (
                  <p className="mt-3 border-l-2 border-accent-2 pl-3 text-sm text-text">{e.takeaway}</p>
                ) : null}
                {e.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.tags.map((t, i) => (
                      <span
                        key={i}
                        className="font-mono-tag rounded border border-border bg-panel-2 px-2 py-1 text-xs text-text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
