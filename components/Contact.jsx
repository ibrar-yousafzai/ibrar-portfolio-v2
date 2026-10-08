import MagneticButton from "./MagneticButton";

export default function Contact({ settings }) {
  const links = [
    { label: "WhatsApp", href: settings.whatsappUrl },
    { label: "LinkedIn", href: settings.linkedinUrl },
    { label: "GitHub", href: settings.githubUrl },
    { label: "Kaggle", href: settings.kaggleUrl },
  ].filter((l) => l.href);

  return (
    <section id="contact" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Let&apos;s build something data-driven and useful.
        </h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          I&apos;m open to AI, machine learning, and data science opportunities, plus collaboration on
          projects where the work needs to be clear, practical, and measurable.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-text transition hover:border-accent hover:text-accent"
            >
              {l.label}
            </a>
          ))}
          {settings.resumeUrl ? (
            <MagneticButton
              href={settings.resumeUrl}
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-[#04140f] transition hover:opacity-90"
            >
              Download Resume
            </MagneticButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
