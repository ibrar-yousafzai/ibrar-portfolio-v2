"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bot, BriefcaseBusiness, GraduationCap, Home, Mail, User } from "lucide-react";

const ITEMS = [
  { id: "hero", label: "Home", href: "/#hero", Icon: Home },
  { id: "demo", label: "RAG Services", href: "/rag", Icon: Bot },
  { id: "projects", label: "Work", href: "/#projects", Icon: BriefcaseBusiness },
  { id: "about", label: "About", href: "/#about", Icon: User },
  { id: "experience", label: "Education & Experience", href: "/#experience", Icon: GraduationCap },
  { id: "contact", label: "Contact", href: "/#contact", Icon: Mail },
];

export default function Sidebar({ settings }) {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const socials = [
    { label: "LinkedIn", href: settings.linkedinUrl },
    { label: "GitHub", href: settings.githubUrl },
  ].filter((link) => link.href);

  return (
    <aside className="site-rail">
      <Link href="/#hero" className="site-rail-logo" aria-label="Back to home">
        <span>IY</span>
      </Link>
      <nav className="site-rail-nav" aria-label="Primary navigation">
        {ITEMS.map(({ id, label, href, Icon }) => (
          <Link key={id} href={href} className={`site-rail-item ${active === id ? "active" : ""}`}>
            <Icon size={20} aria-hidden="true" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="site-rail-foot">
        <div className="site-rail-me">
          {settings.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.avatarUrl} alt={settings.name} />
          ) : (
            <span className="site-rail-avatar-fallback">IY</span>
          )}
          <div>
            <strong>{settings.name}</strong>
            <small>{settings.role?.split("|")[0]?.trim() || "AI Engineer"}</small>
          </div>
        </div>
        {socials.length ? (
          <div className="site-rail-social">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
