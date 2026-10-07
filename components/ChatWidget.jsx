"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ChatPanel from "./chat/ChatPanel";
import { CONTACT_EMAIL, CONTACT_FORM_URL, FEEDBACK_URL, GITHUB_URL, LINKEDIN_URL, API_URL, ERROR_MESSAGE, WAKE_MESSAGE } from "./chat/constants";

function getSessionId() {
  try {
    let id = sessionStorage.getItem("iy_ai_session");
    if (!id) {
      id = globalThis.crypto?.randomUUID?.() || `iy-${Date.now()}`;
      sessionStorage.setItem("iy_ai_session", id);
    }
    return id;
  } catch {
    return `iy-${Date.now()}`;
  }
}

function detectsContactIntent(text) {
  const value = String(text || "").toLowerCase().trim();
  return ["how can i contact", "how do i contact", "contact him", "contact ibrar", "reach him", "reach ibrar", "reach out", "get in touch", "how can i reach", "how do i reach", "connect with him", "connect with ibrar", "talk to him", "hire him", "hire ibrar", "hire", "freelance", "freelancing", "work with him", "work with ibrar", "linkedin", "github", "email", "contact"].some((phrase) => value.includes(phrase));
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [tab, setTab] = useState("home");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [genz, setGenz] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [hasSeen, setHasSeen] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [demo, setDemo] = useState(null);
  const lastQuestionRef = useRef("");
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const wakeTimerRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    setSessionId(getSessionId());
    try { setHasSeen(localStorage.getItem("iy_ai_seen") !== "false"); } catch {}
  }, []);

  const openChat = useCallback(() => {
    setOpen(true);
    setFullscreen(false);
    setHasSeen(true);
    try { localStorage.setItem("iy_ai_seen", "true"); } catch {}
    window.setTimeout(() => inputRef.current?.focus(), 120);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = oldOverflow; };
  }, [open]);

  useEffect(() => () => {
    window.clearTimeout(wakeTimerRef.current);
    abortRef.current?.abort();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }));
    }
  }, [messages, typing]);

  const updateMessage = (index, patch) => {
    setMessages((current) => current.map((message, i) => i === index ? { ...message, ...patch } : message));
  };

  const sendMessage = useCallback(async (value) => {
    const messageText = String(value || "").trim();
    if (!messageText || typing) return;
    lastQuestionRef.current = messageText;
    setUnavailable(false);
    setTab("chat");
    setInput("");
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const botIndex = messages.length + 1;
    setMessages((current) => [...current, { role: "user", text: messageText, time }, { role: "bot", text: "", time: "", feedback: null, showContact: false }]);
    setTyping(true);

    if (detectsContactIntent(messageText)) {
      window.setTimeout(() => {
        updateMessage(botIndex, { text: "Let's connect. 👋\n\nChoose an option below to reach Ibrar.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), showContact: true });
        setTyping(false);
      }, 350);
      return;
    }

    let fullText = "";
    wakeTimerRef.current = window.setTimeout(() => {
      if (!fullText) updateMessage(botIndex, { text: WAKE_MESSAGE });
    }, 4000);
    try {
      abortRef.current = new AbortController();
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText, session_id: sessionId }),
        signal: abortRef.current.signal,
      });
      if (!response.ok || !response.body) throw new Error(`Server error: ${response.status}`);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      const consume = (line) => {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) return;
        const data = trimmed.slice(5).trim();
        if (!data || data === "[DONE]") return;
        try {
          const parsed = JSON.parse(data);
          if (typeof parsed.text === "string") {
            fullText += parsed.text;
            updateMessage(botIndex, { text: fullText });
          }
        } catch { /* Ignore malformed streaming chunks. */ }
      };
      while (true) {
        const { done, value: chunk } = await reader.read();
        if (done) break;
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        lines.forEach(consume);
      }
      if (buffer.trim()) consume(buffer);
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("IY AI error:", error);
        fullText = ERROR_MESSAGE;
        setUnavailable(true);
      }
    } finally {
      window.clearTimeout(wakeTimerRef.current);
      updateMessage(botIndex, { text: fullText || "I couldn't generate a response.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), showContact: false });
      setTyping(false);
      abortRef.current = null;
    }
  }, [messages.length, sessionId, typing]);

  useEffect(() => {
    const handler = (event) => {
      const detail = event.detail || {};
      openChat();
      if (detail.tab === "chat" || detail.tab === "demos") setTab(detail.tab);
      if (detail.message) window.setTimeout(() => sendMessage(detail.message), 140);
    };
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, [openChat, sendMessage]);

  const newChat = () => {
    if (typing) return;
    let id = `iy-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try { sessionStorage.setItem("iy_ai_session", id); } catch {}
    setSessionId(id);
    setMessages([]);
    setTab("home");
    setUnavailable(false);
  };

  const retry = () => {
    if (lastQuestionRef.current && !typing) sendMessage(lastQuestionRef.current);
  };

  const sendFeedback = (index, feedback) => {
    const selected = messages[index];
    updateMessage(index, { feedback });
    fetch(FEEDBACK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ session_id: sessionId, message: selected?.text || "", feedback }) }).catch(() => {});
  };

  const theme = genz ? { primary: "#8b5cf6", secondary: "#ec4899", accent: "#d946ef", dark: "#171126", soft: "#faf5ff", bot: "#f5f3ff", border: "#e9d5ff" } : { primary: "#0f766e", secondary: "#06b6d4", accent: "#14b8a6", dark: "#08111f", soft: "#f0fdfa", bot: "#f4f7f8", border: "#dbe4e7" };

  return (
    <div className="iy-root" style={{ "--iy-primary": theme.primary, "--iy-secondary": theme.secondary, "--iy-accent": theme.accent, "--iy-dark": theme.dark, "--iy-soft": theme.soft, "--iy-bot": theme.bot, "--iy-border": theme.border }}>
      <div className="iy-launcher">
        {!open && !hasSeen && <span className="iy-launcher-label">Chat with Ibrar</span>}
        <button type="button" className="iy-launcher-button" onClick={open ? () => setOpen(false) : openChat} aria-label={open ? "Close IY AI assistant" : "Open IY AI assistant"} title={open ? "Close chat" : "Chat with IY AI"}>
          {open ? "×" : <><span className="iy-launcher-logo">IY AI</span>{!hasSeen && <span className="iy-launcher-dot" aria-label="New chat" />}</>}
        </button>
      </div>
      {open && <ChatPanel fullscreen={fullscreen} setFullscreen={setFullscreen} onClose={() => setOpen(false)} tab={tab} setTab={setTab} messages={messages} input={input} setInput={setInput} typing={typing} genz={genz} setGenz={setGenz} sendMessage={sendMessage} newChat={newChat} sendFeedback={sendFeedback} inputRef={inputRef} scrollRef={scrollRef} theme={theme} unavailable={unavailable} retry={retry} demo={demo} setDemo={setDemo} onLiveDemo={() => { setDemo(null); setTab("chat"); }} contact={{ email: CONTACT_EMAIL, linkedin: LINKEDIN_URL, github: GITHUB_URL, form: CONTACT_FORM_URL }} />}
    </div>
  );
}
