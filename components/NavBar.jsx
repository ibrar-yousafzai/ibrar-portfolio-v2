"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "/rag", label: "AI Assistants" },
  { href: "#projects", label: "Projects" },
  { href: "#credentials", label: "Certifications" },
  { href: "#events", label: "Events" },
  { href: "#community", label: "Community" },
  { href: "#contact", label: "Contact" },
];

export default function NavBar({ name }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <a href="#hero" className="font-display text-sm font-semibold tracking-tight text-text">
          {name}
        </a>
        <ul className="hidden items-center gap-4 text-sm text-text-muted xl:flex 2xl:gap-6">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-accent">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="desktop-call shrink-0 rounded-md bg-accent px-4 py-2 text-xs font-medium text-[#04140f] transition hover:opacity-90 md:text-sm"
        >
          Book a free call
        </a>
        <button
          type="button"
          className="ml-3 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-text xl:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="text-xl">{menuOpen ? "×" : "☰"}</span>
        </button>
      </nav>
      {menuOpen ? (
        <div id="mobile-navigation" className="border-t border-border bg-bg px-4 pb-4 pt-2 xl:hidden">
          <ul className="grid gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="flex min-h-11 items-center rounded-md px-3 text-sm text-text-muted hover:bg-panel hover:text-accent"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="mt-3 flex min-h-11 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-[#04140f]"
            onClick={() => setMenuOpen(false)}
          >
            Book a free call
          </a>
        </div>
      ) : null}
    </header>
  );
}
