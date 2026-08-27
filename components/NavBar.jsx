const LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#rag-models", label: "RAG Models" },
  { href: "#projects", label: "Projects" },
  { href: "#credentials", label: "Certifications" },
  { href: "#events", label: "Events" },
  { href: "#community", label: "Community" },
  { href: "#contact", label: "Contact" },
];

export default function NavBar({ name }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" className="font-display text-sm font-semibold tracking-tight text-text">
          {name}
        </a>
        <ul className="hidden gap-6 text-sm text-text-muted md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-accent">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
