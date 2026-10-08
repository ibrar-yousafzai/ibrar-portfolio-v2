"use client";

import { useState } from "react";

const Q1 = [
  { label: "Answer FAQs from our docs/policies", match: (t) => !t.advanced && /basic/i.test(t.name) },
  { label: "Search accurately across lots of documents", match: (t) => /hybrid/i.test(t.name) },
  { label: "Take actions — check orders, capture leads", match: (t) => /agentic|tool/i.test(t.name) },
];

export default function FitSelector({ ragTypes, packages }) {
  const [need, setNeed] = useState(null);
  const [volume, setVolume] = useState(null);
  const [care, setCare] = useState(null);
  const [result, setResult] = useState(null);

  function compute() {
    const type = Q1[need]
      ? ragTypes.find(Q1[need].match) || ragTypes[0]
      : ragTypes[0];
    const idx = volume === 0 ? 0 : volume === 1 ? Math.floor(packages.length / 2) : packages.length - 1;
    const pkg = packages[Math.min(idx, packages.length - 1)];
    setResult({ type, pkg });
  }

  const ready = need !== null && volume !== null && care !== null;

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">
          Quick check
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Which one fits me?
        </h2>

        <div className="mt-8 space-y-6">
          <Question
            label="What do you mainly need?"
            options={Q1.map((q) => q.label)}
            value={need}
            onChange={setNeed}
          />
          <Question
            label="Roughly how many conversations per month?"
            options={["Under 200", "200–1,000", "1,000+"]}
            value={volume}
            onChange={setVolume}
          />
          <Question
            label="Do you want ongoing monitoring and care?"
            options={["Yes, keep it maintained", "No, just set it up"]}
            value={care}
            onChange={setCare}
          />
        </div>

        <button
          onClick={compute}
          disabled={!ready}
          className="mt-6 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-[#04140f] transition duration-150 hover:opacity-90 disabled:opacity-40"
        >
          Show my recommendation
        </button>

        {result ? (
          <div className="mt-8 rounded-lg border border-accent/40 bg-accent/10 p-6">
            <p className="text-sm text-text-muted">Based on your answers:</p>
            <p className="mt-2 text-text">
              <span className="text-accent">{result.type?.name || "Basic RAG"}</span>
              {result.pkg ? (
                <>
                  {" "}with the <span className="text-accent">{result.pkg.name}</span> package
                </>
              ) : null}
              {care === 0 ? " — plus ongoing monitoring and care." : "."}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Question({ label, options, value, onChange }) {
  return (
    <div>
      <p className="text-sm text-text-muted">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt, i) => (
          <button
            key={opt}
            onClick={() => onChange(i)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              value === i
                ? "border-accent bg-accent/15 text-accent"
                : "border-border text-text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}