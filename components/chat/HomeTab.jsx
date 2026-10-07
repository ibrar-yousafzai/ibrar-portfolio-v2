import { SUGGESTIONS } from "./constants";

export default function HomeTab({ sendMessage, theme, setTab }) {
  return <main className="iy-home">
    <section className="iy-welcome"><div className="iy-eyebrow">IY AI</div><h1 className="iy-welcome-title">Hi there 👋</h1><p className="iy-welcome-text">Ask about my AI projects, or see how a RAG assistant could work for your business.</p></section>
    <button type="button" className="iy-chat-card" onClick={() => setTab("chat")}><span><strong>Chat with us</strong><small>Answers come from my portfolio data</small></span><b>→</b></button>
    <div className="iy-section-heading"><span>Suggested questions</span></div>
    <div className="iy-prompts">{SUGGESTIONS.map((question) => <button type="button" className="iy-prompt" key={question} onClick={() => sendMessage(question)}>{question}<b>→</b></button>)}</div>
    <div className="iy-trust"><strong>Why trust this assistant</strong><span>• Answers are grounded in documents</span><span>• Sources are shown when available</span><span>• Tricky questions can be passed to a human</span></div>
    <a className="iy-call-button" href="/#contact">Book a free call</a>
  </main>;
}
