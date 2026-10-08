"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const API_URL = "https://iy-portfolio-chatbot.onrender.com/chat";

const suggestions = [
  "What can a RAG chatbot do for my business?",
  "How much does a chatbot project cost?",
  "Can I see a demo?",
  "How do I book a call?",
];

function MessageText({ text }) {
  return (
    <div className="chat-markdown whitespace-pre-wrap break-words">
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
        const isBold = part.startsWith("**") && part.endsWith("**");
        return isBold ? <strong key={index}>{part.slice(2, -2)}</strong> : part;
      })}
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("conversation");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const messagesRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (open && window.matchMedia("(max-width: 639px)").matches) {
      document.body.classList.add("chat-open");
      return () => document.body.classList.remove("chat-open");
    }
    document.body.classList.remove("chat-open");
  }, [open]);

  useEffect(() => {
    if (!open || activeTab !== "conversation") return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing, open, activeTab]);

  function resizeTextarea() {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 112)}px`;
  }

  function startNewChat() {
    setMessages([]);
    setInput("");
    setActiveTab("conversation");
    requestAnimationFrame(resizeTextarea);
  }

  async function sendMessage(value) {
    const message = value.trim();
    if (!message || typing) return;

    setInput("");
    requestAnimationFrame(resizeTextarea);
    setOpen(true);
    setActiveTab("conversation");
    setMessages((current) => [...current, { role: "user", text: message }, { role: "bot", text: "" }]);
    setTyping(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!response.ok || !response.body) throw new Error("The assistant is temporarily unavailable.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let answer = "";

      const appendChunk = (chunk) => {
        if (!chunk || chunk === "[DONE]") return;
        try {
          const parsed = JSON.parse(chunk);
          if (typeof parsed.text === "string") answer += parsed.text;
        } catch {
          answer += chunk;
        }
        setMessages((current) => {
          const next = [...current];
          next[next.length - 1] = { role: "bot", text: answer };
          return next;
        });
      };

      while (true) {
        const { done, value: chunk } = await reader.read();
        buffer += decoder.decode(chunk || new Uint8Array(), { stream: !done });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        lines.forEach((line) => {
          const trimmed = line.trim();
          if (trimmed.startsWith("data:")) appendChunk(trimmed.slice(5).trim());
        });
        if (done) break;
      }
      if (buffer.trim().startsWith("data:")) appendChunk(buffer.trim().slice(5).trim());
      if (!answer) throw new Error("The assistant returned an empty response.");
    } catch (error) {
      setMessages((current) => {
        const next = [...current];
        next[next.length - 1] = { role: "bot", text: error.message || "Something went wrong." };
        return next;
      });
    } finally {
      setTyping(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  function handleInput(event) {
    setInput(event.target.value);
    resizeTextarea();
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open ? (
        <section className="chat-panel flex h-[min(680px,calc(100dvh-110px))] max-h-[calc(100dvh-96px)] w-[min(420px,calc(100vw-32px))] min-h-0 flex-col rounded-2xl border border-border bg-bg shadow-2xl">
          <header className="flex shrink-0 items-center justify-between bg-accent px-4 py-3 text-[#04140f]">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#04140f] text-sm font-bold text-accent">IY</div>
              <div>
                <p className="font-display text-sm font-semibold">IY AI</p>
                <p className="text-[11px] opacity-75">Portfolio assistant</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-md px-2 py-1 text-xl leading-none transition hover:bg-[#04140f]/10" aria-label="Close chat">
              ×
            </button>
          </header>

          <div className="flex shrink-0 items-center justify-between border-b border-border px-3 py-2">
            <div className="flex gap-1" role="tablist" aria-label="Chat views">
              <button type="button" role="tab" aria-selected={activeTab === "discover"} onClick={() => setActiveTab("discover")} className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${activeTab === "discover" ? "bg-panel-2 text-text" : "text-text-muted hover:text-text"}`}>
                Discover
              </button>
              <button type="button" role="tab" aria-selected={activeTab === "conversation"} onClick={() => setActiveTab("conversation")} className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${activeTab === "conversation" ? "bg-panel-2 text-text" : "text-text-muted hover:text-text"}`}>
                Conversation
              </button>
            </div>
            <button type="button" onClick={startNewChat} className="text-xs text-text-muted transition hover:text-accent">+ New chat</button>
          </div>

          {activeTab === "discover" ? (
            <div className="chat-scroll min-h-0 flex-1 overflow-y-auto px-4 py-5 text-sm">
              <p className="font-display text-lg font-semibold text-text">Hi there 👋</p>
              <p className="mt-1 text-text-muted">Ask about Ibrar&apos;s projects, skills, or experience.</p>
              <div className="mt-5 grid gap-2">
                {suggestions.map((suggestion) => (
                  <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)} className="rounded-md border border-border px-3 py-2 text-left text-text-muted transition hover:border-accent hover:text-accent">{suggestion}</button>
                ))}
              </div>
            </div>
          ) : (
            <div ref={messagesRef} className="chat-scroll min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-5 text-sm">
              {messages.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="font-display text-lg font-semibold">Hi there 👋</p>
                  <p className="mt-2 text-text-muted">Ask me anything about Ibrar&apos;s AI projects.</p>
                </div>
              ) : null}
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`max-w-[88%] rounded-xl px-3 py-2 leading-6 ${message.role === "user" ? "ml-auto max-w-[80%] bg-accent text-[#04140f]" : "bg-panel-2 text-text"}`}>
                  {message.text ? <MessageText text={message.text} /> : typing && index === messages.length - 1 ? <span className="chat-typing" aria-label="Assistant is typing"><i /><i /><i /></span> : null}
                </div>
              ))}
              <div ref={messagesEndRef} aria-hidden="true" />
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex shrink-0 gap-2 border-t border-border p-3">
            <textarea ref={textareaRef} value={input} onChange={handleInput} onKeyDown={handleKeyDown} rows={1} placeholder="Ask a question..." className="chat-input min-h-[40px] max-h-28 min-w-0 flex-1 resize-none overflow-y-auto rounded-md border border-border bg-panel-2 px-3 py-2 text-sm leading-6 outline-none focus:border-accent" aria-label="Chat message" />
            <button type="submit" disabled={typing || !input.trim()} className="self-end rounded-md bg-accent px-3 py-2 text-sm font-medium text-[#04140f] transition hover:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Send message">Send</button>
          </form>
          <p className="shrink-0 border-t border-border px-3 py-1.5 text-center text-[10px] text-text-muted">
            AI can make mistakes — verify important details. <Link href="/#contact" className="text-accent hover:underline">Contact Ibrar</Link>
          </p>
        </section>
      ) : null}

      <button type="button" onClick={() => setOpen((current) => !current)} className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl font-semibold text-[#04140f] shadow-lg transition hover:scale-105" aria-label={open ? "Minimize IY AI chat" : "Open IY AI chat"}>
        <span aria-hidden="true">💬</span>
      </button>
    </div>
  );
}
