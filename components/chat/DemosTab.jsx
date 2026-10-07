import { DEMOS } from "./constants";
import DemoCard from "./DemoCard";
import { useState } from "react";
export default function DemosTab({ onLive, demo, setDemo }) {
  const [active, setActive] = useState(demo);
  const openDemo = (item) => { setActive(item); setDemo(item); };
  if (active) return <main className="iy-home iy-demos-page"><button type="button" className="iy-text-link iy-back-button" onClick={() => { setActive(null); setDemo(null); }}>← All demos</button><div className="iy-eyebrow">SAMPLE CONVERSATION</div><h2 className="iy-tab-title">{active.title}</h2><p className="iy-demo-disclaimer">Scripted example — this is not a live response.</p><div className="iy-scripted-chat">{active.messages.map(([role, text], index) => <div key={`${role}-${index}`} className={`iy-scripted-message ${role}`}><span>{role === "bot" ? "IY AI" : "You"}</span>{text}</div>)}</div></main>;
  return <main className="iy-home iy-demos-page"><div className="iy-eyebrow">CLIENT SHOWCASE</div><h2 className="iy-tab-title">See what a RAG assistant can do</h2><p className="iy-welcome-text">The portfolio assistant is the only live demo. The examples below are scripted to show possible patterns honestly.</p><div className="iy-live-demo"><strong>Portfolio assistant</strong><span>Live demo · Ask questions about Ibrar's portfolio data.</span><button type="button" onClick={onLive}>Open live chat</button></div><div className="iy-demos">{DEMOS.map((item) => <DemoCard key={item.title} demo={item} onRun={openDemo} />)}</div></main>;
}
