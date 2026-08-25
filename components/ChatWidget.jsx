"use client";

import { useState, useEffect, useRef } from "react";

const API_URL = "https://iy-portfolio-chatbot.onrender.com/chat";
const FEEDBACK_URL = "https://iy-portfolio-chatbot.onrender.com/feedback";
const CONTACT_EMAIL = "ibrar.yousafzai.ai@gmail.com";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("home");
  const [genz, setGenz] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const scrollRef = useRef(null);

   useEffect(() => {
    if (open) {
      document.title = "💬 IY Assistant — Ask me anything";
    } else {
      document.title = "Ibrar Yousafzai — Data Scientist | AI & ML";
    }
    return () => {
      document.title = "Ibrar Yousafzai — Data Scientist | AI & ML";
    };
  }, [open]);

    useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  function renderBold(text) {
    const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const html = escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    return { __html: html };
  }

  function detectsContactIntent(userText, botText) {
    const combined = (userText + " " + botText).toLowerCase();
    return ["contact", "hire", "linkedin", "reach", "freelance", "email"].some(w => combined.includes(w));
  }

  async function sendMessage(text) {
    text = (text || "").trim();
    if (!text) return;
    setTab("chat");
    setInput("");
    const userMsg = { role: "user", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    let fullText = "";
    const botIndex = messages.length + 1;
    setMessages(prev => [...prev, { role: "bot", text: "", time: "", feedback: null }]);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, session_id: sessionId })
      });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        chunk.split("\n\n").forEach(line => {
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            try {
              const data = JSON.parse(line.slice(6));
              fullText += data.text;
              setMessages(prev => {
                const copy = [...prev];
                copy[botIndex] = { ...copy[botIndex], text: fullText };
                return copy;
              });
            } catch (e) {}
          }
        });
      }
    } catch (err) {
      fullText = "Sorry, something went wrong connecting to the server.";
      setMessages(prev => {
        const copy = [...prev];
        copy[botIndex] = { ...copy[botIndex], text: fullText };
        return copy;
      });
    }

    setTyping(false);
    setMessages(prev => {
      const copy = [...prev];
      copy[botIndex] = {
        ...copy[botIndex],
        text: fullText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        showContact: detectsContactIntent(text, fullText)
      };
      return copy;
    });
  }

  function sendFeedback(index, fb) {
    setMessages(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], feedback: fb };
      return copy;
    });
    fetch(FEEDBACK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, message: messages[index]?.text, feedback: fb })
    }).catch(() => {});
  }

  const theme = genz
    ? { from: "#7c3aed", to: "#ec4899", accent: "#f472b6", accentDark: "#db2777", botBg: "#f3e8ff", userBg: "#7c3aed" }
    : { from: "#0a1e42", to: "#14304f", accent: "#14b8a6", accentDark: "#0d9488", botBg: "#f0f1f5", userBg: "#0a1e42" };

  const quickQuestions = [
    { icon: "💼", q: "What projects has Ibrar built?" },
    { icon: "🛠️", q: "What is Ibrar's tech stack?" },
    { icon: "🤝", q: "Is Ibrar available for freelance work?" },
    { icon: "📩", q: "How can I contact Ibrar?" }
  ];

  return (
    <div style={{ fontFamily: "-apple-system, Segoe UI, sans-serif" }}>
            <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", alignItems: "center", gap: 10, flexDirection: "row-reverse" }}>
        <div
          onClick={() => setOpen(!open)}
          style={{
            width: 62, height: 62, borderRadius: "50%",
            background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`, color: "white",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            boxShadow: "0 4px 18px rgba(0,0,0,0.25)", fontWeight: 700, fontSize: open ? 22 : 18,
            transition: "transform 0.15s"
          }}
        >
          {open ? "✕" : "IY"}
        </div>
        {!open && (
          <div
            onClick={() => setOpen(true)}
            style={{
              background: "white", color: "#222", padding: "10px 16px", borderRadius: 20,
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)", fontSize: 13, fontWeight: 600, cursor: "pointer",
              whiteSpace: "nowrap"
            }}
          >
            👋 Try me — I'm IY Assistant
          </div>
        )}
      </div>

      {open && (
        <div style={{
          position: "fixed", bottom: 100, right: 24, width: 380, maxHeight: 600, background: "white",
          borderRadius: 20, boxShadow: "0 10px 36px rgba(0,0,0,0.28)", display: "flex", flexDirection: "column",
          overflow: "hidden", zIndex: 9999, fontSize: 14
        }}>
          <div style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`, color: "white", padding: 20, position: "relative" }}>
            <button
              onClick={() => setGenz(!genz)}
              style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, color: "white", width: 30, height: 30, cursor: "pointer" }}
            >
              🎨
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, border: "1.5px solid rgba(255,255,255,0.4)" }}>IY</div>
              <div>
                <h2 style={{ margin: 0, fontSize: 18 }}>Hi, I'm IY 👋</h2>
                <p style={{ margin: "6px 0 0 0", fontSize: 12.5, opacity: 0.88 }}>Ibrar Yousafzai's AI Assistant</p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", borderBottom: "1px solid #eee" }}>
            {["home", "chat"].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1, padding: 10, textAlign: "center", cursor: "pointer", fontSize: 13, fontWeight: 600,
                  color: tab === t ? theme.accentDark : "#888", background: "white", border: "none",
                  borderBottom: tab === t ? `2px solid ${theme.accent}` : "none"
                }}
              >
                {t === "home" ? "Home" : "Chat"}
              </button>
            ))}
          </div>

          {tab === "home" && (
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 13, color: "#555" }}>Ask me about Ibrar's skills, projects, or how to get in touch.</div>
              {quickQuestions.map((item, i) => (
                <div
                  key={i}
                  onClick={() => sendMessage(item.q)}
                  style={{ background: "#f7f8fb", border: "1px solid #e5e7eb", borderRadius: 12, padding: "12px 14px", cursor: "pointer", fontSize: 13.5, color: "#222" }}
                >
                  {item.icon} {item.q}
                </div>
              ))}
            </div>
          )}

          {tab === "chat" && (
            <div style={{ display: "flex", flexDirection: "column", height: 420 }}>
              <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 4 }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", maxWidth: "85%", alignSelf: m.role === "user" ? "flex-end" : "flex-start", alignItems: m.role === "user" ? "flex-end" : "flex-start" }}>
                    <div
                      style={{
                        padding: "10px 14px", borderRadius: 14, fontSize: 13.5, lineHeight: 1.45,
                        background: m.role === "user" ? theme.userBg : theme.botBg,
                        color: m.role === "user" ? "white" : "#222",
                        borderBottomRightRadius: m.role === "user" ? 4 : 14,
                        borderBottomLeftRadius: m.role === "bot" ? 4 : 14
                      }}
                      dangerouslySetInnerHTML={m.role === "bot" ? renderBold(m.text) : undefined}
                    >
                      {m.role === "user" ? m.text : undefined}
                    </div>
                    {m.time && <div style={{ fontSize: 10.5, color: "#aaa", marginTop: 3, padding: "0 4px" }}>{m.time}</div>}
                    {m.role === "bot" && m.text && (
                      <div style={{ display: "flex", gap: 6, marginTop: 4, padding: "0 4px" }}>
                        <button onClick={() => sendFeedback(i, "up")} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 13, opacity: m.feedback === "up" ? 1 : 0.5 }}>👍</button>
                        <button onClick={() => sendFeedback(i, "down")} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 13, opacity: m.feedback === "down" ? 1 : 0.5 }}>👎</button>
                      </div>
                    )}
                    {m.showContact && (
                      <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                        <a href="https://pk.linkedin.com/in/ibrar-yousafzai" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, background: "white", border: "1px solid #ddd", borderRadius: 10, padding: "7px 11px", fontSize: 12.5, textDecoration: "none", color: "#222" }}>🔗 LinkedIn</a>
                        <a href="https://github.com/ibrar-yousafzai" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, background: "white", border: "1px solid #ddd", borderRadius: 10, padding: "7px 11px", fontSize: 12.5, textDecoration: "none", color: "#222" }}>💻 GitHub</a>
                        <a href={`mailto:${CONTACT_EMAIL}`} style={{ display: "flex", alignItems: "center", gap: 6, background: "white", border: "1px solid #ddd", borderRadius: 10, padding: "7px 11px", fontSize: 12.5, textDecoration: "none", color: "#222" }}>✉️ Email</a>
                      </div>
                    )}
                  </div>
                ))}
                {typing && <div style={{ fontSize: 12, color: "#999" }}>IY is typing...</div>}
              </div>

              <div style={{ padding: "8px 14px", display: "flex", gap: 6, overflowX: "auto" }}>
                {["Projects", "Tech stack", "Contact"].map((label, i) => (
                  <div
                    key={i}
                    onClick={() => sendMessage(quickQuestions[i === 0 ? 0 : i === 1 ? 1 : 3].q)}
                    style={{ whiteSpace: "nowrap", background: "white", border: "1px solid #e2e4ea", borderRadius: 20, padding: "7px 12px", fontSize: 12, cursor: "pointer" }}
                  >
                    {label}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", borderTop: "1px solid #eee", padding: 10, gap: 6 }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={e => e.key === "Enter" && sendMessage(input)}
                  placeholder="Type a message..."
                  style={{ flex: 1, border: "none", outline: "none", fontSize: 13.5, padding: 8 }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  style={{ background: theme.accent, color: "white", border: "none", borderRadius: 10, padding: "8px 14px", cursor: "pointer", fontWeight: 600 }}
                >
                  ➤
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}