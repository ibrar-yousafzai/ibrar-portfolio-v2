"use client";

import { useEffect, useRef, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);
  const [displayCount, setDisplayCount] = useState(0);
  const countRef = useRef(null);

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

  useEffect(() => {
    if (count === null) return;

    const node = countRef.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplayCount(count);
      return;
    }

    let frameId;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const startTime = performance.now();
        const duration = 1200;

        const animate = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          setDisplayCount(Math.round(count * eased));
          if (progress < 1) frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.1 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [count]);

  return (
    <section id="visitors" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Live visitor count for this portfolio
        </h2>
        <p className="mt-2 text-text-muted">
          This number updates automatically as people open the portfolio.
        </p>
        <p ref={countRef} className="font-mono-tag mt-6 text-5xl font-semibold text-accent">
          {count === null ? "—" : displayCount.toLocaleString()}
        </p>
        <p className="mt-2 text-xs text-text-muted">Total visits</p>
      </div>
    </section>
  );
}
