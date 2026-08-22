"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/visitors", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setCount(data.count);
      })
      .catch(() => {
        if (!cancelled) setCount(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="visitors" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Live visitor count for this portfolio
        </h2>
        <p className="mt-2 text-text-muted">
          This number updates automatically as people open the portfolio.
        </p>
        <p className="font-mono-tag mt-6 text-5xl font-semibold text-accent">
          {count === null ? "—" : count.toLocaleString()}
        </p>
        <p className="mt-2 text-xs text-text-muted">Total visits</p>
      </div>
    </section>
  );
}
