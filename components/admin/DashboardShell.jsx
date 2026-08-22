"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/dashboard/settings", label: "Site content" },
  { href: "/admin/dashboard/projects", label: "Projects" },
  { href: "/admin/dashboard/certifications", label: "Certifications" },
  { href: "/admin/dashboard/events", label: "Events" },
];

export default function DashboardShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-bg text-text">
      <aside className="hidden w-60 shrink-0 border-r border-border p-6 md:block">
        <p className="font-display text-sm font-semibold">Admin</p>
        <nav className="mt-6 flex flex-col gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm transition ${
                  active ? "bg-panel-2 text-accent" : "text-text-muted hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6">
          <Link href="/" className="text-sm text-text-muted hover:text-text">
            View live site →
          </Link>
          <button
            onClick={handleLogout}
            className="text-left text-sm text-text-muted hover:text-accent"
          >
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
