"use client";

import { useState } from "react";

const steps = [
  ["01", "Share your docs and policies", "Bring the material your team already trusts."],
  ["02", "I index and test them", "We check retrieval, sources, and edge cases together."],
  ["03", "Launch where people work", "Put the assistant on your site or WhatsApp."],
  ["04", "Review and improve", "Use real questions to keep answers useful."],
];

const capabilities = [
  ["Cited answers", "Every answer can point back to the source material."],
  ["Live data lookups", "Connect approved systems when a static document is not enough."],
  ["Human handoff", "Unknown or sensitive questions go to your team."],
  ["English and Urdu", "Support the languages your customers actually use."],
  ["Question review", "See what people ask and where your content needs work."],
  ["Website or WhatsApp", "Meet customers in the channel they already open."],
];

const useCases = [
  ["Online stores", "Product, shipping, returns, and order questions."],
  ["Clinics", "Patient-facing information grounded in approved guidance."],
  ["Schools", "Admissions, policies, course, and student support answers."],
  ["Service businesses", "Explain your offer and qualify the right requests."],
  ["Internal HR and IT", "Give teams a dependable first stop for internal knowledge."],
];

const faqs = [
  ["How long does a first version take?", "The timeline depends on the amount and shape of your source material. We start by reviewing the documents and the questions the assistant must handle."],
  ["How do you price the work?", "We scope the first version around your data, integrations, channels, and review needs. I will give you a clear proposal after the initial conversation."],
  ["What happens to our data?", "The assistant only uses the sources and connections we agree on. Your data remains yours, and access can be limited to the systems you approve."],
  ["Can it answer in Urdu?", "Yes, language support can be designed around the languages and terminology your customers use, including Urdu."],
  ["What if the bot does not know?", "It should say so. Unknown or sensitive questions can be routed to a person instead of being answered with made-up certainty."],
];

function openChat() {
  window.dispatchEvent(new CustomEvent("open-chat"));
}

function SectionLabel({ children }) {
  return <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">{children}</p>;
}

function ProjectCard({ project }) {
  const href = project.caseStudyUrl || "/#projects";
  return (
    <a href={href} className="group rounded-lg border border-border bg-panel p-5 transition duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-[0_12px_40px_-25px_var(--accent)]">
      <p className="font-mono-tag text-[10px] uppercase tracking-[0.16em] text-accent-2">{project.category || project.status}</p>
      <h3 className="mt-3 font-display text-lg font-semibold text-text">{project.title}</h3>
      <p className="mt-2 text-sm leading-6 text-text-muted">{project.summary || project.description}</p>
      {project.tags?.length ? <p className="mt-4 text-xs text-accent">{project.tags.slice(0, 4).join(" · ")}</p> : null}
    </a>
  );
}

export default function RagLanding({ settings, projects }) {
  const [openFaq, setOpenFaq] = useState(null);
  const selectedTitles = ["Bankly-AI Banking Assistant", "AI E-Commerce Shopping Assistant", "Environmental Analytics Engine"];
  const selectedProjects = selectedTitles.map((title) => projects.find((project) => project.title === title)).filter(Boolean);

  return (
    <div className="overflow-hidden bg-bg">
      <section className="relative border-b border-border bg-[radial-gradient(circle_at_78%_18%,rgba(53,208,192,0.16),transparent_35%),linear-gradient(90deg,rgba(16,24,40,0.98),rgba(10,15,26,0.98))]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-28">
          <div>
            <SectionLabel>AI assistants for real questions</SectionLabel>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">AI assistants that answer your customers from <span className="text-accent">your own data</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-text-muted">Give customers and teams a useful first answer, grounded in the documents, policies, and systems you already trust.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/#contact" className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-[#04140f] transition hover:opacity-90">Book a free call</a>
              <button type="button" onClick={openChat} className="rounded-md border border-border px-5 py-3 text-sm font-medium text-text transition hover:border-accent hover:text-accent">Try the live demo</button>
            </div>
          </div>
          <div className="relative rounded-2xl border border-accent/30 bg-panel p-6 shadow-[0_0_80px_-35px_var(--accent)]">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
            <p className="relative font-mono-tag text-xs uppercase tracking-[0.18em] text-accent">Sample conversation</p>
            <div className="relative mt-8 space-y-5 text-sm">
              <div className="ml-auto max-w-[82%] rounded-lg rounded-tr-none bg-panel-2 px-4 py-3 text-text">Can I get an answer from our own policy documents?</div>
              <div className="max-w-[88%] rounded-lg rounded-tl-none border border-accent/20 bg-accent/10 px-4 py-3 text-text">Yes. The assistant can answer from approved documents and show which source it used.<p className="mt-2 font-mono-tag text-[10px] text-accent">Source: your policy library</p></div>
              <div className="flex items-center gap-1 text-xs text-text-muted"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:150ms]" /><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:300ms]" /> checking the source</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-panel/30"><div className="mx-auto grid max-w-6xl gap-5 px-6 py-8 md:grid-cols-3"><p className="font-mono-tag text-xs uppercase tracking-[0.12em] text-text-muted">Live in days, not months</p><p className="font-mono-tag text-xs uppercase tracking-[0.12em] text-text-muted">Every answer shows its source</p><p className="font-mono-tag text-xs uppercase tracking-[0.12em] text-text-muted">Hands tricky chats to your team</p></div></section>

      <section className="mx-auto max-w-6xl px-6 py-20"><SectionLabel>How it works</SectionLabel><h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">A practical path from documents to a dependable assistant.</h2><div className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-5">{steps.map(([number, title, text], index) => <div key={number} className="relative border-l-2 border-accent/40 pl-5 md:border-l-0 md:border-t-2 md:pt-5"><span className="font-mono-tag text-xs text-accent">{number}</span><h3 className="mt-3 font-display text-base font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-text-muted">{text}</p>{index < steps.length - 1 ? <span className="absolute -bottom-5 left-[-3px] h-5 w-px bg-accent/40 md:bottom-auto md:left-auto md:right-[-10px] md:top-[-2px] md:h-px md:w-5" /> : null}</div>)}</div></section>

      <section className="border-y border-border bg-panel/30"><div className="mx-auto max-w-6xl px-6 py-20"><SectionLabel>What it can do</SectionLabel><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Useful behavior, with clear boundaries.</h2><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{capabilities.map(([title, text]) => <article key={title} className="rounded-lg border border-border bg-panel p-5 transition duration-200 hover:-translate-y-1 hover:border-accent"><h3 className="font-display text-base font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-text-muted">{text}</p></article>)}</div></div></section>

      <section className="mx-auto max-w-4xl px-6 py-20"><SectionLabel>See it in action</SectionLabel><div className="mt-3 flex flex-wrap items-end justify-between gap-5"><h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Sample answers, then the real assistant.</h2><button type="button" onClick={openChat} className="rounded-md border border-border px-4 py-2 text-sm text-text transition hover:border-accent hover:text-accent">Try the real one</button></div><p className="mt-4 text-sm text-text-muted">Sample, not a live assistant. The examples below show the shape of a grounded answer.</p><div className="mt-10 space-y-5">{[["What is the return policy?", "Returns are accepted within the period specified in the approved policy, with the source shown alongside the answer."], ["Can it hand off a hard question?", "Yes. When the assistant cannot answer confidently, it can direct the conversation to your team."]].map(([question, answer]) => <div key={question} className="rounded-lg border border-border bg-panel p-5"><p className="font-mono-tag text-xs uppercase text-text-muted">Customer</p><p className="mt-2 text-text">{question}</p><p className="mt-5 font-mono-tag text-xs uppercase text-accent">Assistant</p><p className="mt-2 text-sm leading-6 text-text-muted">{answer}</p></div>)}</div></section>

      <section className="border-y border-border bg-panel/30"><div className="mx-auto max-w-6xl px-6 py-20"><SectionLabel>Built for</SectionLabel><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Start with the questions people ask repeatedly.</h2><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{useCases.map(([title, text]) => <article key={title} className="border-l-2 border-accent/50 pl-4"><h3 className="font-display text-base font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-text-muted">{text}</p></article>)}</div></div></section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[0.7fr_1.3fr]"><div><SectionLabel>My approach</SectionLabel><h2 className="mt-3 text-3xl font-semibold tracking-tight">Trust is part of the product.</h2></div><div className="grid gap-5 text-sm leading-6 text-text-muted md:grid-cols-2"><p>Answers come from your documents and approved connections, not guesswork.</p><p>Sources are shown so people can check the answer.</p><p>Unknown questions can go to a human instead of becoming confident nonsense.</p><p>Your data stays yours, with access limited to what we agree to connect.</p></div></section>

      <section className="border-y border-border bg-panel/30"><div className="mx-auto max-w-6xl px-6 py-20"><SectionLabel>Selected work</SectionLabel><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Related work from the portfolio.</h2>{selectedProjects.length ? <div className="mt-10 grid gap-5 md:grid-cols-3">{selectedProjects.map((project) => <ProjectCard key={project._id} project={project} />)}</div> : <p className="mt-8 text-sm text-text-muted">Selected project details will appear here when published in the portfolio.</p>}</div></section>

      <section className="mx-auto max-w-3xl px-6 py-20"><SectionLabel>FAQ</SectionLabel><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Before we start.</h2><div className="mt-8 divide-y divide-border border-y border-border">{faqs.map(([question, answer], index) => <div key={question}><button type="button" className="flex w-full items-center justify-between gap-6 py-5 text-left font-display font-semibold" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><span className="text-accent">{openFaq === index ? "−" : "+"}</span></button>{openFaq === index ? <p className="pb-5 text-sm leading-6 text-text-muted">{answer}</p> : null}</div>)}</div></section>

      <section className="border-t border-border bg-accent px-6 py-16 text-[#04140f]"><div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><SectionLabel>Next step</SectionLabel><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Let&apos;s build your assistant.</h2><p className="mt-3 max-w-xl text-sm text-[#16483f]">Bring the questions, documents, and constraints. We&apos;ll work out what is useful first.</p></div><div className="flex flex-wrap gap-3"><a href="/#contact" className="rounded-md bg-[#04140f] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90">Book a free call</a>{settings.whatsappUrl ? <a href={settings.whatsappUrl} className="rounded-md border border-[#16483f] px-5 py-3 text-sm font-medium text-[#04140f] transition hover:bg-[#16483f]/10">WhatsApp</a> : null}</div></div></section>
    </div>
  );
}
