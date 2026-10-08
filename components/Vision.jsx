"use client";

import { useState } from "react";
import { Lightbulb, Target } from "lucide-react";

const TABS = {
  products: {
    label: "AI Products",
    Icon: Lightbulb,
    title: "Building Useful AI Products",
    body: [
      "I want to build AI products that solve one clear problem well, starting with RAG chatbots and agent-based automation.",
      "Every project begins with the customer problem and ends with a measurable result, such as fewer support tickets or faster answers.",
    ],
  },
  growth: {
    label: "Giving Back",
    Icon: Target,
    title: "Growing Together",
    body: [
      "My long-term goal is to grow IFI into an internationally recognized brand and build a successful technology company.",
      "I also want to mentor students and young professionals, sharing what I learn about AI, freelancing, and entrepreneurship.",
    ],
  },
};

export default function Vision() {
  const [active, setActive] = useState("products");
  const tab = TABS[active];
  const Icon = tab.Icon;

  return (
    <section id="vision" className="border-b border-border">
      <div className="section-shell">
        <div className="section-heading">
          <p className="section-kicker"><Icon size={16} aria-hidden="true" /> Vision</p>
          <h2>Where I&apos;m heading</h2>
        </div>

        <div className="vision-tabs" role="tablist" aria-label="Vision">
          {Object.entries(TABS).map(([key, item]) => {
            const TabIcon = item.Icon;
            return (
              <button key={key} type="button" role="tab" aria-selected={active === key} className={active === key ? "active" : ""} onClick={() => setActive(key)}>
                <TabIcon size={16} aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </div>

        <article className="vision-card">
          <h3>{tab.title}</h3>
          {tab.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </article>
      </div>
    </section>
  );
}
