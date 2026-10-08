"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bot, BriefcaseBusiness, Eye, GraduationCap, Home, Mail, MessageCircle, User } from "lucide-react";

const ITEMS = [
  { id: "hero", label: "Home", href: "/#hero", Icon: Home },
  { id: "about", label: "About", href: "/#about", Icon: User },
  { id: "vision", label: "Vision", href: "/#vision", Icon: Eye },
  { id: "services", label: "Services", href: "/#services", Icon: BriefcaseBusiness },
  { id: "projects", label: "Work", href: "/#projects", Icon: BriefcaseBusiness },
  { id: "demo", label: "RAG Services", href: "/rag", Icon: Bot },
  { id: "experience", label: "Education & Experience", href: "/#experience", Icon: GraduationCap },
  { id: "contact", label: "Contact", href: "/#contact", Icon: Mail },
];

export default function Sidebar({ settings }) {
  const profile = {
    name: "Ibrar Yousafzai",
    avatarUrl: "",
    sidebarRole: "AI Engineer · RAG Chatbots",
    linkedinUrl: "",
    githubUrl: "",
    ...settings,
  };
  const [active, setActive] = useState("hero");
  const [expanded, setExpanded] = useState(false);

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
    { label: "WhatsApp", href: profile.whatsappUrl, mark: "wa" },
    { label: "LinkedIn", href: profile.linkedinUrl, mark: "in" },
    { label: "GitHub", href: profile.githubUrl, mark: "gh" },
    { label: "Kaggle", href: profile.kaggleUrl, mark: "kg" },
    { label: "Facebook", href: profile.facebookUrl, mark: "f" },
    { label: "Instagram", href: profile.instagramUrl, mark: "ig" },
  ].filter((link) => link.href);

  return (
    <aside className={`site-rail ${expanded ? "expanded" : ""}`}>
      <button
        type="button"
        className="site-rail-logo"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
        aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
      >
        <span>IY</span>
      </button>
      <nav className="site-rail-nav" aria-label="Primary navigation">
        {ITEMS.map(({ id, label, href, Icon }) => (
          <Link
            key={id}
            href={href}
            title={!expanded ? label : undefined}
            className={`site-rail-item ${active === id ? "active" : ""}`}
            onClick={() => setExpanded(false)}
          >
            <Icon size={20} aria-hidden="true" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="site-rail-foot">
        <div className="site-rail-me">
          {profile.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatarUrl} alt={profile.name} />
          ) : (
            <span className="site-rail-avatar-fallback">IY</span>
          )}
          <div>
            <strong>{profile.name}</strong>
            <small>{profile.sidebarRole}</small>
          </div>
        </div>
        {socials.length ? (
          <div className="site-rail-social">
            {socials.map(({ label, href, mark }) => (
              <a key={label} href={href} title={label} target="_blank" rel="noreferrer">
                <span className="site-social-mark" aria-hidden="true">{mark}</span>
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
