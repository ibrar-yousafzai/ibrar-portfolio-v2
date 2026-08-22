export default function Footer({ settings }) {
  const year = new Date().getFullYear();
  const links = [
    { label: "WhatsApp", href: settings.whatsappUrl },
    { label: "Kaggle", href: settings.kaggleUrl },
    { label: "GitHub", href: settings.githubUrl },
    { label: "LinkedIn", href: settings.linkedinUrl },
    { label: "Facebook", href: settings.facebookUrl },
  ].filter((l) => l.href);

  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:justify-between">
          <div>
            <p className="font-display text-sm font-semibold text-text">{settings.name}</p>
            <p className="mt-2 max-w-sm text-sm text-text-muted">
              Founder, {settings.communityName}. Always happy to learn and build together.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-text-muted">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-accent">
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-6 text-xs text-text-muted">
          © {year} {settings.name}. All rights reserved. {settings.location}
        </p>
      </div>
    </footer>
  );
}
