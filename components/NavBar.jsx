"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/rag", label: "AI Assistants" },
];

export default function NavBar({ name }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-bg/90 backdrop-blur-md shadow-[0_1px_0_0_var(--border)]"
          : "border-transparent bg-bg/60 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/#hero" className="font-display text-sm font-semibold tracking-tight text-text">
          {name}
        </Link>
        <ul className="hidden gap-6 text-sm text-text-muted md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative inline-block transition-colors hover:text-accent after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:content-[''] motion-safe:after:transition-transform motion-safe:after:duration-200 motion-safe:group-hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <MagneticButton
          href="/rag#contact-rag"
          className="shrink-0 rounded-full bg-accent px-4 py-2 text-xs font-medium text-[#04140f] transition hover:opacity-90 md:text-sm"
        >
          Book a free call
        </MagneticButton>
      </nav>
    </header>
  );
}