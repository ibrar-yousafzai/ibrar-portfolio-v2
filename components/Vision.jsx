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

export default function Vision({ settings = {} }) {
  const [active, setActive] = useState("products");
  const tabs = {
    products: {
      ...TABS.products,
      title: settings.visionProductsTitle || TABS.products.title,
      body: settings.visionProductsBody?.length ? settings.visionProductsBody : TABS.products.body,
    },
    growth: {
      ...TABS.growth,
      title: settings.visionGrowthTitle || TABS.growth.title,
      body: settings.visionGrowthBody?.length ? settings.visionGrowthBody : TABS.growth.body,
    },
  };
  const tab = tabs[active];
  const Icon = tab.Icon;

  return (
    <section id="vision" className="border-b border-border">
      <div className="section-shell">
        <div className="section-heading">
          <p className="section-kicker"><Icon size={16} aria-hidden="true" /> Vision</p>
          <h2>{settings.visionHeading || "Where I’m heading"}</h2>
        </div>

        <div className="vision-tabs" role="tablist" aria-label="Vision">
          {Object.entries(tabs).map(([key, item]) => {
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
