"use client";

import { useState } from "react";

export default function SavingsEstimator() {
  const [ticketsPerWeek, setTicketsPerWeek] = useState(100);
  const [minutesPerTicket, setMinutesPerTicket] = useState(6);
  const [hourlyCost, setHourlyCost] = useState(10);
  const [shareAutomated, setShareAutomated] = useState(50);

  const hoursPerWeek = (ticketsPerWeek * minutesPerTicket) / 60;
  const hoursSaved = hoursPerWeek * (shareAutomated / 100);
  const moneySavedPerWeek = hoursSaved * hourlyCost;
  const moneySavedPerMonth = moneySavedPerWeek * 4.33;

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">
          Your estimate
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Rough savings calculator
        </h2>
        <p className="mt-4 max-w-2xl text-text-muted">
          This is only an estimate based on the numbers you enter below — not a guarantee.
        </p>

        <div className="mt-8 space-y-6 rounded-lg border border-border bg-panel p-6">
          <Slider
            label="Support tickets per week"
            value={ticketsPerWeek}
            min={10}
            max={1000}
            step={10}
            onChange={setTicketsPerWeek}
          />
          <Slider
            label="Minutes spent per ticket"
            value={minutesPerTicket}
            min={1}
            max={30}
            step={1}
            onChange={setMinutesPerTicket}
          />
          <Slider
            label="Hourly cost of support staff ($)"
            value={hourlyCost}
            min={2}
            max={60}
            step={1}
            onChange={setHourlyCost}
          />
          <Slider
            label={`Share you'd automate: ${shareAutomated}%`}
            value={shareAutomated}
            min={0}
            max={90}
            step={5}
            onChange={setShareAutomated}
          />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-accent/40 bg-accent/10 p-5 transition duration-150 hover:border-accent">
            <p className="text-xs text-text-muted">Estimated hours saved / week</p>
            <p className="font-mono-tag mt-1 text-2xl font-semibold text-accent">
              {hoursSaved.toFixed(1)}
            </p>
          </div>
          <div className="rounded-lg border border-accent/40 bg-accent/10 p-5 transition duration-150 hover:border-accent">
            <p className="text-xs text-text-muted">Estimated savings / month</p>
            <p className="font-mono-tag mt-1 text-2xl font-semibold text-accent">
              ${moneySavedPerMonth.toFixed(0)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, step, onChange }) {
  return (
    <label className="block">
      <span className="text-sm text-text-muted">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--accent)]"
      />
    </label>
  );
}