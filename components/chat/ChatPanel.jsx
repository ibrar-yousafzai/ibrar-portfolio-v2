import { useEffect, useRef } from "react";
import HomeTab from "./HomeTab";
import ChatTab from "./ChatTab";
import DemosTab from "./DemosTab";

export default function ChatPanel({ fullscreen, setFullscreen, onClose, tab, setTab, messages, input, setInput, typing, genz, setGenz, sendMessage, newChat, sendFeedback, inputRef, scrollRef, theme, contact, onLiveDemo, demo, setDemo, unavailable, retry }) {
  const panelRef = useRef(null);
  useEffect(() => {
    const handler = (event) => {
      if (event.key === "Escape") { onClose(); return; }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll("button:not([disabled]), input:not([disabled]), a[href]");
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  return <section ref={panelRef} className={`iy-window ${fullscreen ? "fullscreen" : ""}`} role="dialog" aria-modal="true" aria-label="IY AI portfolio assistant">
    <header className="iy-header" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}><div className="iy-header-main"><div className="iy-brand"><div className="iy-brand-logo">IY</div><div><strong>IY AI</strong><small>Portfolio assistant by Ibrar Yousafzai</small></div></div><div className="iy-header-copy"><strong>Hi there 👋</strong><p>Ask about my AI projects, or see how a RAG assistant could work for your business.</p></div></div><div className="iy-actions"><button type="button" onClick={onClose} aria-label="Close assistant">×</button></div></header>
    <nav className="iy-nav" aria-label="Chat sections"><button type="button" className={tab === "home" ? "active" : ""} onClick={() => setTab("home")}>✦ Discover</button><button type="button" className={tab === "chat" ? "active" : ""} onClick={() => setTab("chat")}>◌ Conversation {messages.length > 0 && <b>{messages.length}</b>}</button><button type="button" className={tab === "demos" ? "active" : ""} onClick={() => setTab("demos")}>▹ Demos</button></nav>
    {tab === "home" && <HomeTab sendMessage={sendMessage} theme={theme} setTab={setTab} />}{tab === "chat" && <ChatTab messages={messages} typing={typing} input={input} setInput={setInput} sendMessage={sendMessage} newChat={newChat} sendFeedback={sendFeedback} inputRef={inputRef} scrollRef={scrollRef} contact={contact} unavailable={unavailable} retry={retry} onDemo={() => setTab("demos")} />}{tab === "demos" && <DemosTab onLive={onLiveDemo} demo={demo} setDemo={setDemo} />}
    <footer className="iy-footer">Powered by IY AI. Answers may contain mistakes, verify important details.</footer>
  </section>;
}
