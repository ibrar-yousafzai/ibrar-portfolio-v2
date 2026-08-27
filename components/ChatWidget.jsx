"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";

/*
=========================================================
IY AI — PERSONAL PORTFOLIO ASSISTANT
=========================================================
*/

const API_URL =
  "https://iy-portfolio-chatbot.onrender.com/chat";

const FEEDBACK_URL =
  "https://iy-portfolio-chatbot.onrender.com/feedback";

const CONTACT_EMAIL =
  "ibrar.yousafzai.ai@gmail.com";

const LINKEDIN_URL =
  "https://pk.linkedin.com/in/ibrar-yousafzai";

const GITHUB_URL =
  "https://github.com/ibrar-yousafzai";

const CONTACT_FORM_URL =
  "#contact";


/*
=========================================================
SAFE BOT TEXT RENDERER
Supports:
- **bold**
- escaped **bold**
- line breaks
- bullet points
=========================================================
*/

function renderBotText(text) {
  if (!text) return null;

  const cleanText = String(text)
    .replace(/\\\*\\\*/g, "**")
    .replace(/\\n/g, "\n")
    .trim();

  const lines = cleanText.split("\n");

  return lines.map((line, lineIndex) => {
    const isBullet =
      /^\s*[-*•]\s+/.test(line);

    const content = isBullet
      ? line.replace(/^\s*[-*•]\s+/, "")
      : line;

    const parts =
      content.split(/(\*\*.*?\*\*)/g);

    return (
      <Fragment key={lineIndex}>
        <span
          className={
            isBullet
              ? "iy-bullet-line"
              : "iy-text-line"
          }
        >
          {isBullet && (
            <span className="iy-bullet">
              •
            </span>
          )}

          <span>
            {parts.map(
              (part, partIndex) => {
                const isBold =
                  part.startsWith("**") &&
                  part.endsWith("**") &&
                  part.length >= 4;

                if (isBold) {
                  return (
                    <strong
                      key={partIndex}
                    >
                      {part.slice(2, -2)}
                    </strong>
                  );
                }

                return (
                  <Fragment
                    key={partIndex}
                  >
                    {part}
                  </Fragment>
                );
              }
            )}
          </span>
        </span>

        {lineIndex <
          lines.length - 1 && (
          <br />
        )}
      </Fragment>
    );
  });
}


/*
=========================================================
CONTACT INTENT
=========================================================
*/

function detectsContactIntent(text) {
  const value =
    String(text || "")
      .toLowerCase()
      .trim();

  const phrases = [
    "how can i contact",
    "how do i contact",
    "contact him",
    "contact ibrar",
    "contact ibar",
    "reach him",
    "reach ibrar",
    "reach out",
    "get in touch",
    "how can i reach",
    "how do i reach",
    "connect with him",
    "connect with ibrar",
    "talk to him",
    "talk with him",
    "hire him",
    "hire ibrar",
    "hire",
    "freelance",
    "freelancing",
    "work with him",
    "work with ibrar",
    "linkedin",
    "github",
    "email",
    "contact",
  ];

  return phrases.some(
    (phrase) =>
      value.includes(phrase)
  );
}


/*
=========================================================
COMPONENT
=========================================================
*/

export default function ChatWidget() {
  const [open, setOpen] =
    useState(false);

  const [fullscreen, setFullscreen] =
    useState(false);

  const [tab, setTab] =
    useState("home");

  const [messages, setMessages] =
    useState([]);

  const [input, setInput] =
    useState("");

  const [typing, setTyping] =
    useState(false);

  const [genz, setGenz] =
    useState(false);

  const [sessionId, setSessionId] =
    useState("");

  const scrollRef =
    useRef(null);

  const inputRef =
    useRef(null);


/*
=========================================================
SESSION
=========================================================
*/

  useEffect(() => {
    try {
      let id =
        sessionStorage.getItem(
          "iy_ai_session"
        );

      if (!id) {
        id =
          crypto.randomUUID();

        sessionStorage.setItem(
          "iy_ai_session",
          id
        );
      }

      setSessionId(id);
    } catch {
      setSessionId(
        `iy-${Date.now()}`
      );
    }
  }, []);


/*
=========================================================
AUTO SCROLL
=========================================================
*/

  useEffect(() => {
    if (!scrollRef.current)
      return;

    requestAnimationFrame(() => {
      scrollRef.current.scrollTo({
        top:
          scrollRef.current
            .scrollHeight,
        behavior: "smooth",
      });
    });
  }, [messages, typing]);


/*
=========================================================
ESCAPE
=========================================================
*/

  useEffect(() => {
    function handleKeyDown(event) {
      if (
        event.key !== "Escape"
      ) {
        return;
      }

      if (fullscreen) {
        setFullscreen(false);
        return;
      }

      if (open) {
        setOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    fullscreen,
    open,
  ]);


/*
=========================================================
BODY LOCK
=========================================================
*/

  useEffect(() => {
    if (!open) {
      document.body.style.overflow =
        "";
      return;
    }

    const oldOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        oldOverflow;
    };
  }, [open]);


/*
=========================================================
THEME
=========================================================
*/

  const theme = genz
    ? {
        primary: "#8b5cf6",
        secondary: "#ec4899",
        accent: "#d946ef",
        accentDark: "#a21caf",
        dark: "#171126",
        soft: "#faf5ff",
        bot: "#f5f3ff",
        border: "#e9d5ff",
      }
    : {
        primary: "#0f766e",
        secondary: "#06b6d4",
        accent: "#14b8a6",
        accentDark: "#0f766e",
        dark: "#08111f",
        soft: "#f0fdfa",
        bot: "#f4f7f8",
        border: "#dbe4e7",
      };


/*
=========================================================
PROMPTS
=========================================================
*/

  const prompts = [
    {
      icon: "◈",
      title: "Explore Projects",
      description:
        "See what Ibrar has built",
      question:
        "What projects has Ibrar built?",
    },

    {
      icon: "⌘",
      title: "Tech Stack",
      description:
        "Explore skills & technologies",
      question:
        "What is Ibrar's tech stack?",
    },

    {
      icon: "✦",
      title: "Experience",
      description:
        "Learn about Ibrar's journey",
      question:
        "Tell me about Ibrar's experience.",
    },

    {
      icon: "↗",
      title: "Work Together",
      description:
        "Discuss opportunities",
      question:
        "Is Ibrar available for freelance work?",
    },
  ];


  const suggestedQuestions = [
    "Tell me about Ibrar",
    "What AI projects has he built?",
    "What technologies does he use?",
    "How can I contact him?",
  ];


/*
=========================================================
OPEN / CLOSE
=========================================================
*/

  function openChat() {
    setOpen(true);
    setFullscreen(false);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  }

  function closeChat() {
    setOpen(false);
    setFullscreen(false);
  }

  function toggleFullscreen() {
    setFullscreen(
      (previous) =>
        !previous
    );
  }


/*
=========================================================
SEND MESSAGE
=========================================================
*/

  async function sendMessage(text) {
    const messageText =
      String(text || "").trim();

    if (
      !messageText ||
      typing
    ) {
      return;
    }

    const isContact =
      detectsContactIntent(
        messageText
      );

    setTab("chat");
    setInput("");

    const currentTime =
      new Date().toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );

    setMessages(
      (previous) => [
        ...previous,

        {
          role: "user",
          text: messageText,
          time: currentTime,
        },

        {
          role: "bot",
          text: "",
          time: "",
          feedback: null,
          showContact: false,
        },
      ]
    );

    setTyping(true);

    /*
    -------------------------------------------------------
    CONTACT QUESTIONS
    -------------------------------------------------------
    Do not call RAG.
    Do not expose URLs in AI response.
    -------------------------------------------------------
    */

    if (isContact) {
      window.setTimeout(() => {
        setMessages(
          (previous) => {
            const copy =
              [...previous];

            const index =
              copy.length - 1;

            copy[index] = {
              ...copy[index],

              text:
                "Let's connect. 👋\n\nChoose an option below to reach Ibrar.",

              time:
                new Date().toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                ),

              showContact: true,
            };

            return copy;
          }
        );

        setTyping(false);
      }, 350);

      return;
    }


/*
=========================================================
NORMAL RAG REQUEST
=========================================================
*/

    const botIndex =
      messages.length + 1;

    let fullText = "";

    try {
      const response =
        await fetch(
          API_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                message:
                  messageText,

                session_id:
                  sessionId,
              }),
          }
        );

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status}`
        );
      }

      if (!response.body) {
        throw new Error(
          "Streaming is not available."
        );
      }

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder();

      let buffer = "";

      while (true) {
        const {
          done,
          value,
        } =
          await reader.read();

        if (done)
          break;

        buffer += decoder.decode(
          value,
          {
            stream: true,
          }
        );

        const lines =
          buffer.split("\n");

        buffer =
          lines.pop() || "";

        for (
          const line of lines
        ) {
          const trimmed =
            line.trim();

          if (
            !trimmed.startsWith(
              "data:"
            )
          ) {
            continue;
          }

          const data =
            trimmed
              .slice(5)
              .trim();

          if (
            !data ||
            data === "[DONE]"
          ) {
            continue;
          }

          try {
            const parsed =
              JSON.parse(data);

            if (
              typeof parsed.text ===
              "string"
            ) {
              fullText +=
                parsed.text;

              setMessages(
                (previous) => {
                  const copy =
                    [...previous];

                  if (
                    copy[botIndex]
                  ) {
                    copy[
                      botIndex
                    ] = {
                      ...copy[
                        botIndex
                      ],
                      text:
                        fullText,
                    };
                  }

                  return copy;
                }
              );
            }
          } catch {
            /*
              Ignore malformed
              streaming chunks.
            */
          }
        }
      }

      /*
      Process any final buffered
      SSE line.
      */

      if (buffer.trim()) {
        const trimmed =
          buffer.trim();

        if (
          trimmed.startsWith(
            "data:"
          )
        ) {
          const data =
            trimmed
              .slice(5)
              .trim();

          if (
            data &&
            data !== "[DONE]"
          ) {
            try {
              const parsed =
                JSON.parse(data);

              if (
                typeof parsed.text ===
                "string"
              ) {
                fullText +=
                  parsed.text;
              }
            } catch {
              /* Ignore */
            }
          }
        }
      }

    } catch (error) {
      console.error(
        "IY AI error:",
        error
      );

      fullText =
        "I’m having trouble connecting to my AI service right now. Please try again in a moment.";
    }


/*
=========================================================
FINAL BOT MESSAGE
=========================================================
*/

    setMessages(
      (previous) => {
        const copy =
          [...previous];

        if (
          copy[botIndex]
        ) {
          copy[
            botIndex
          ] = {
            ...copy[
              botIndex
            ],

            text:
              fullText ||
              "I couldn't generate a response.",

            time:
              new Date().toLocaleTimeString(
                [],
                {
                  hour:
                    "2-digit",

                  minute:
                    "2-digit",
                }
              ),

            showContact:
              false,
          };
        }

        return copy;
      }
    );

    setTyping(false);
  }


/*
=========================================================
FORM SUBMIT
=========================================================
*/

  function handleSubmit(event) {
    event.preventDefault();

    sendMessage(input);
  }


/*
=========================================================
FEEDBACK
=========================================================
*/

  function sendFeedback(
    index,
    feedback
  ) {
    const selected =
      messages[index];

    setMessages(
      (previous) => {
        const copy =
          [...previous];

        if (
          copy[index]
        ) {
          copy[index] = {
            ...copy[index],
            feedback,
          };
        }

        return copy;
      }
    );

    fetch(
      FEEDBACK_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify({
            session_id:
              sessionId,

            message:
              selected?.text || "",

            feedback,
          }),
      }
    ).catch(() => {});
  }


/*
=========================================================
CLEAR CHAT
=========================================================
*/

  function clearChat() {
    if (typing)
      return;

    setMessages([]);
    setTab("home");
  }


/*
=========================================================
RENDER
=========================================================
*/

  return (
    <>
      <div
        className="iy-root"
        style={{
          "--iy-primary":
            theme.primary,

          "--iy-secondary":
            theme.secondary,

          "--iy-accent":
            theme.accent,

          "--iy-dark":
            theme.dark,

          "--iy-soft":
            theme.soft,

          "--iy-bot":
            theme.bot,

          "--iy-border":
            theme.border,
        }}
      >

        {!open && (
          <div className="iy-launcher">
            <div className="iy-launcher-label">
              Chat with Ibrar
            </div>

            <button
              type="button"
              className="iy-launcher-button"
              onClick={openChat}
              aria-label="Open IY AI assistant"
              title="Chat with IY AI"
            >
              <span className="iy-launcher-logo">
                IY
              </span>

              <span className="iy-launcher-text">
                AI
              </span>
            </button>
          </div>
        )}


        {open && (
          <div
            className={`iy-window ${
              fullscreen
                ? "fullscreen"
                : ""
            }`}
          >

            {/* HEADER */}

            <header
              className="iy-header"
              style={{
                background:
                  `linear-gradient(
                    135deg,
                    ${theme.primary},
                    ${theme.secondary}
                  )`,
              }}
            >
              <div className="iy-header-glow" />

              <div className="iy-header-content">

                <div className="iy-brand">

                  <div className="iy-brand-logo">
                    IY
                  </div>

                  <div>
                    <div className="iy-brand-name">
                      IY AI
                    </div>

                    <div className="iy-brand-subtitle">
                      Personal Portfolio Intelligence
                    </div>

                    <div className="iy-status">
                      <span className="iy-status-dot" />
                      Online · Ready to help
                    </div>
                  </div>

                </div>


                <div className="iy-actions">

                  <button
                    type="button"
                    className="iy-action"
                    onClick={() =>
                      setGenz(
                        (previous) =>
                          !previous
                      )
                    }
                    title="Change style"
                    aria-label="Change style"
                  >
                    ◐
                  </button>


                  <button
                    type="button"
                    className="iy-action"
                    onClick={
                      toggleFullscreen
                    }
                    title={
                      fullscreen
                        ? "Exit fullscreen"
                        : "Fullscreen"
                    }
                    aria-label={
                      fullscreen
                        ? "Exit fullscreen"
                        : "Fullscreen"
                    }
                  >
                    {fullscreen
                      ? "↙"
                      : "⛶"}
                  </button>


                  <button
                    type="button"
                    className="iy-action"
                    onClick={
                      closeChat
                    }
                    title="Close assistant"
                    aria-label="Close assistant"
                  >
                    ×
                  </button>

                </div>
              </div>
            </header>


            {/* NAV */}

            <nav className="iy-nav">

              <button
                type="button"
                className={`iy-nav-button ${
                  tab === "home"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setTab("home")
                }
              >
                <span>✦</span>
                Discover
              </button>


              <button
                type="button"
                className={`iy-nav-button ${
                  tab === "chat"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setTab("chat")
                }
              >
                <span>◌</span>
                Conversation

                {messages.length >
                  0 && (
                  <span className="iy-count">
                    {messages.length}
                  </span>
                )}
              </button>

            </nav>


            {/* HOME */}

            {tab === "home" && (
              <main className="iy-home">

                <section className="iy-welcome">

                  <div
                    className="iy-welcome-icon"
                    style={{
                      background:
                        `linear-gradient(
                          135deg,
                          ${theme.primary},
                          ${theme.secondary}
                        )`,
                    }}
                  >
                    <span>IY</span>
                    <i />
                  </div>


                  <div className="iy-eyebrow">
                    AI PORTFOLIO GUIDE
                  </div>


                  <h1 className="iy-welcome-title">
                    Hi, I'm{" "}
                    <span>
                      IY AI
                    </span>{" "}
                    👋
                  </h1>


                  <p className="iy-welcome-text">
                    Your intelligent guide to
                    Ibrar Yousafzai's portfolio.
                    Explore projects, skills,
                    experience, technologies,
                    and ways to work together.
                  </p>

                </section>


                <div className="iy-section-heading">
                  <span>
                    Explore
                  </span>

                  <small>
                    Choose a topic
                  </small>
                </div>


                <div className="iy-capabilities">

                  {prompts.map(
                    (item, index) => (
                      <button
                        type="button"
                        key={index}
                        className="iy-capability"
                        onClick={() =>
                          sendMessage(
                            item.question
                          )
                        }
                      >

                        <div
                          className="iy-capability-icon"
                          style={{
                            background:
                              `linear-gradient(
                                135deg,
                                ${theme.primary},
                                ${theme.secondary}
                              )`,
                          }}
                        >
                          {item.icon}
                        </div>


                        <div className="iy-capability-copy">

                          <div className="iy-capability-title">
                            {item.title}
                          </div>

                          <div className="iy-capability-description">
                            {
                              item.description
                            }
                          </div>

                        </div>


                        <span className="iy-capability-arrow">
                          →
                        </span>

                      </button>
                    )
                  )}

                </div>


                <div className="iy-prompt-area">

                  <div className="iy-section-heading">
                    <span>
                      Try asking
                    </span>

                    <small>
                      Quick questions
                    </small>
                  </div>


                  <div className="iy-prompts">

                    {suggestedQuestions.map(
                      (
                        question,
                        index
                      ) => (
                        <button
                          type="button"
                          key={index}
                          className="iy-prompt"
                          onClick={() =>
                            sendMessage(
                              question
                            )
                          }
                        >

                          <span className="iy-prompt-icon">
                            {index === 0
                              ? "?"
                              : index === 1
                              ? "AI"
                              : index === 2
                              ? "⌘"
                              : "↗"}
                          </span>

                          <span className="iy-prompt-text">
                            {question}
                          </span>

                          <span className="iy-prompt-arrow">
                            →
                          </span>

                        </button>
                      )
                    )}

                  </div>

                </div>


              </main>
            )}


            {/* CHAT */}

            {tab === "chat" && (
              <section className="iy-chat">

                <div
                  className="iy-messages"
                  ref={scrollRef}
                >

                  {messages.length === 0 && (
                    <div className="iy-empty-chat">

                      <div
                        className="iy-empty-icon"
                        style={{
                          background:
                            `linear-gradient(
                              135deg,
                              ${theme.primary},
                              ${theme.secondary}
                            )`,
                        }}
                      >
                        IY
                      </div>

                      <h2>
                        Ask IY AI
                      </h2>

                      <p>
                        Ask anything about
                        Ibrar's portfolio.
                      </p>

                    </div>
                  )}


                  {messages.map(
                    (
                      message,
                      index
                    ) => (

                      <div
                        key={index}
                        className={`iy-message-row ${message.role}`}
                      >

                        <div
                          className={`iy-message ${message.role}`}
                        >
                          {message.role ===
                          "bot"
                            ? renderBotText(
                                message.text
                              )
                            : message.text}
                        </div>


                        {message.time && (
                          <div className="iy-time">
                            {message.time}
                          </div>
                        )}


                        {message.role ===
                          "bot" &&
                          message.text && (
                            <div className="iy-message-tools">

                              <button
                                type="button"
                                className={`iy-feedback-button ${
                                  message.feedback ===
                                  "up"
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  sendFeedback(
                                    index,
                                    "up"
                                  )
                                }
                                aria-label="Helpful"
                              >
                                👍
                              </button>

                              <button
                                type="button"
                                className={`iy-feedback-button ${
                                  message.feedback ===
                                  "down"
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  sendFeedback(
                                    index,
                                    "down"
                                  )
                                }
                                aria-label="Not helpful"
                              >
                                👎
                              </button>

                            </div>
                          )}


                        {/* CONTACT OPTIONS */}

                        {message.showContact && (
                          <div className="iy-contact">

                            <div className="iy-contact-label">
                              Connect with Ibrar
                            </div>

                            <div className="iy-contact-grid">

                              <a
                                href={
                                  LINKEDIN_URL
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="iy-contact-link"
                              >
                                <span className="iy-contact-icon">
                                  in
                                </span>

                                <span>
                                  LinkedIn
                                </span>

                                <b>
                                  ↗
                                </b>
                              </a>


                              <a
                                href={
                                  GITHUB_URL
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="iy-contact-link"
                              >
                                <span className="iy-contact-icon">
                                  ◇
                                </span>

                                <span>
                                  GitHub
                                </span>

                                <b>
                                  ↗
                                </b>
                              </a>


                              <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                className="iy-contact-link"
                              >
                                <span className="iy-contact-icon">
                                  @
                                </span>

                                <span>
                                  Email
                                </span>

                                <b>
                                  ↗
                                </b>
                              </a>


                              <a
                                href={
                                  CONTACT_FORM_URL
                                }
                                className="iy-contact-link"
                              >
                                <span className="iy-contact-icon">
                                  ✎
                                </span>

                                <span>
                                  Contact Form
                                </span>

                                <b>
                                  →
                                </b>
                              </a>

                            </div>

                          </div>
                        )}

                      </div>
                    )
                  )}


                  {typing && (
                    <div className="iy-typing">

                      <div className="iy-typing-avatar">
                        IY
                      </div>

                      <div className="iy-typing-bubble">

                        <div className="iy-dots">
                          <span />
                          <span />
                          <span />
                        </div>

                        <span>
                          IY AI is thinking
                        </span>

                      </div>

                    </div>
                  )}

                </div>


                {/* QUICK SUGGESTIONS */}

                {!typing &&
                  messages.length >
                    0 && (
                    <div className="iy-suggestions">

                      {suggestedQuestions.map(
                        (
                          question,
                          index
                        ) => (
                          <button
                            type="button"
                            key={index}
                            className="iy-suggestion"
                            onClick={() =>
                              sendMessage(
                                question
                              )
                            }
                          >
                            {question}
                          </button>
                        )
                      )}

                    </div>
                  )}


                {/* INPUT */}

                <form
                  className="iy-input-area"
                  onSubmit={
                    handleSubmit
                  }
                >

                  <div className="iy-input-wrap">

                    <input
                      ref={inputRef}
                      className="iy-input"
                      type="text"
                      value={input}
                      onChange={(event) =>
                        setInput(
                          event.target.value
                        )
                      }
                      placeholder="Ask IY AI anything..."
                      disabled={typing}
                      autoComplete="off"
                      aria-label="Ask IY AI"
                    />

                    <button
                      type="submit"
                      className="iy-send"
                      disabled={
                        typing ||
                        !input.trim()
                      }
                      style={{
                        background:
                          `linear-gradient(
                            135deg,
                            ${theme.primary},
                            ${theme.secondary}
                          )`,
                      }}
                      aria-label="Send message"
                    >
                      →
                    </button>

                  </div>

                </form>


                <div className="iy-chat-bottom">

                  <button
                    type="button"
                    className="iy-clear"
                    onClick={
                      clearChat
                    }
                    disabled={typing}
                  >
                    ↺ Clear conversation
                  </button>

                  <span>
                    IY AI · Portfolio Assistant
                  </span>

                </div>

              </section>
            )}


            {/* FOOTER */}

            <footer className="iy-footer">

              <span>
                Created by
              </span>

              <strong>
                Ibrar Yousafzai
              </strong>

              <span
                className="iy-footer-logo"
                style={{
                  background:
                    `linear-gradient(
                      135deg,
                      ${theme.primary},
                      ${theme.secondary}
                    )`,
                }}
              >
                IY
              </span>

            </footer>

          </div>
        )}
      </div>


      {/* =====================================================
          STYLES
      ===================================================== */}

      <style jsx global>{`

        * {
          box-sizing:
            border-box;
        }


        .iy-root {
          font-family:
            Inter,
            ui-sans-serif,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          text-rendering:
            optimizeLegibility;
        }


        .iy-root button,
        .iy-root input {
          font-family:
            inherit;
        }


        /* =================================================
           LAUNCHER
           ================================================= */

        .iy-launcher {
          position:
            fixed;

          right:
            24px;

          bottom:
            24px;

          z-index:
            99990;

          display:
            flex;

          align-items:
            center;

          gap:
            10px;
        }


        .iy-launcher-label {
          padding:
            9px 13px;

          border:
            1px solid
            rgba(0,0,0,.07);

          border-radius:
            14px;

          background:
            rgba(255,255,255,.96);

          color:
            #242932;

          font-size:
            11px;

          font-weight:
            700;

          box-shadow:
            0 8px 25px
            rgba(0,0,0,.12);

          white-space:
            nowrap;
        }


        .iy-launcher-button {
          width:
            60px;

          height:
            60px;

          border:
            1px solid
            rgba(255,255,255,.4);

          border-radius:
            18px;

          background:
            linear-gradient(
              135deg,
              var(--iy-primary),
              var(--iy-secondary)
            );

          color:
            white;

          cursor:
            pointer;

          display:
            flex;

          flex-direction:
            column;

          align-items:
            center;

          justify-content:
            center;

          box-shadow:
            0 15px 40px
            rgba(0,0,0,.22);

          transition:
            transform .2s ease,
            box-shadow .2s ease;
        }


        .iy-launcher-button:hover {
          transform:
            translateY(-3px);

          box-shadow:
            0 20px 45px
            rgba(0,0,0,.28);
        }


        .iy-launcher-logo {
          font-size:
            17px;

          font-weight:
            900;

          line-height:
            1;
        }


        .iy-launcher-text {
          margin-top:
            3px;

          font-size:
            8px;

          font-weight:
            800;

          opacity:
            .9;

          letter-spacing:
            .4px;
        }


        /* =================================================
           WINDOW
           ================================================= */

        .iy-window {
          position:
            fixed;

          z-index:
            99999;

          left:
            50%;

          top:
            50%;

          transform:
            translate(-50%, -50%);

          width:
            min(430px, calc(100vw - 40px));

          height:
            min(720px, calc(100vh - 70px));

          max-width:
            calc(100vw - 40px);

          max-height:
            calc(100vh - 70px);

          background:
            #fff;

          border:
            1px solid
            rgba(15,23,42,.10);

          border-radius:
            24px;

          overflow:
            hidden;

          display:
            flex;

          flex-direction:
            column;

          box-shadow:
            0 35px 100px
            rgba(0,0,0,.25),
            0 10px 35px
            rgba(0,0,0,.10);

          animation:
            iy-window-in .25s
            ease-out;
        }


        @keyframes iy-window-in {
          from {
            opacity:
              0;

            transform:
              translate(
                -50%,
                -47%
              )
              scale(.97);
          }

          to {
            opacity:
              1;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1);
          }
        }


        /* =================================================
           FULLSCREEN
           ================================================= */

        .iy-window.fullscreen {
          left:
            0;

          top:
            0;

          width:
            100vw;

          height:
            100vh;

          max-width:
            100vw;

          max-height:
            100vh;

          transform:
            none;

          border:
            none;

          border-radius:
            0;
        }


        /* =================================================
           HEADER
           ================================================= */

        .iy-header {
          position:
            relative;

          flex-shrink:
            0;

          padding:
            15px 16px;

          color:
            white;

          overflow:
            hidden;
        }


        .iy-header-glow {
          position:
            absolute;

          width:
            180px;

          height:
            180px;

          right:
            -80px;

          top:
            -110px;

          border-radius:
            50%;

          background:
            rgba(255,255,255,.10);
        }


        .iy-header-content {
          position:
            relative;

          z-index:
            2;

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap:
            12px;
        }


        .iy-brand {
          display:
            flex;

          align-items:
            center;

          min-width:
            0;

          gap:
            10px;
        }


        .iy-brand-logo {
          width:
            42px;

          height:
            42px;

          flex-shrink:
            0;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border:
            1px solid
            rgba(255,255,255,.35);

          border-radius:
            13px;

          background:
            rgba(255,255,255,.16);

          backdrop-filter:
            blur(8px);

          font-size:
            13px;

          font-weight:
            900;

          letter-spacing:
            -.3px;
        }


        .iy-brand-name {
          font-size:
            15px;

          line-height:
            1.1;

          font-weight:
            850;
        }


        .iy-brand-subtitle {
          margin-top:
            2px;

          font-size:
            9px;

          opacity:
            .78;

          line-height:
            1.2;
        }


        .iy-status {
          display:
            flex;

          align-items:
            center;

          gap:
            5px;

          margin-top:
            5px;

          font-size:
            8px;

          font-weight:
            700;

          opacity:
            .88;
        }


        .iy-status-dot {
          width:
            6px;

          height:
            6px;

          border-radius:
            50%;

          background:
            #9ff5c5;

          box-shadow:
            0 0 8px
            rgba(159,245,197,.7);
        }


        .iy-actions {
          display:
            flex;

          align-items:
            center;

          gap:
            4px;
        }


        .iy-action {
          width:
            30px;

          height:
            30px;

          border:
            1px solid
            rgba(255,255,255,.18);

          border-radius:
            9px;

          background:
            rgba(255,255,255,.10);

          color:
            white;

          cursor:
            pointer;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          font-size:
            13px;

          transition:
            background .15s ease;
        }


        .iy-action:hover {
          background:
            rgba(255,255,255,.20);
        }


        /* =================================================
           NAV
           ================================================= */

        .iy-nav {
          height:
            43px;

          flex-shrink:
            0;

          display:
            flex;

          align-items:
            stretch;

          padding:
            0 12px;

          border-bottom:
            1px solid #edf0f2;

          background:
            white;
        }


        .iy-nav-button {
          position:
            relative;

          flex:
            1;

          border:
            none;

          border-bottom:
            2px solid
            transparent;

          background:
            transparent;

          color:
            #9299a2;

          cursor:
            pointer;

          font-size:
            10px;

          font-weight:
            750;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            5px;
        }


        .iy-nav-button.active {
          color:
            var(--iy-primary);

          border-bottom-color:
            var(--iy-accent);
        }


        .iy-count {
          min-width:
            16px;

          height:
            16px;

          padding:
            0 4px;

          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            8px;

          background:
            var(--iy-soft);

          color:
            var(--iy-primary);

          font-size:
            8px;
        }


        /* =================================================
           HOME
           ================================================= */

        .iy-home {
          flex:
            1;

          min-height:
            0;

          overflow-y:
            auto;

          padding:
            18px 16px 8px;
        }


        .iy-welcome {
          text-align:
            center;

          padding:
            3px 8px 16px;
        }


        .iy-welcome-icon {
          position:
            relative;

          width:
            58px;

          height:
            58px;

          margin:
            0 auto 11px;

          border-radius:
            18px;

          color:
            white;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          font-size:
            16px;

          font-weight:
            900;

          box-shadow:
            0 12px 28px
            rgba(15,118,110,.20);
        }


        .iy-welcome-icon i {
          position:
            absolute;

          width:
            7px;

          height:
            7px;

          right:
            9px;

          top:
            9px;

          border:
            2px solid white;

          border-radius:
            50%;

          opacity:
            .8;
        }


        .iy-eyebrow {
          color:
            var(--iy-primary);

          font-size:
            8px;

          font-weight:
            850;

          letter-spacing:
            1.1px;
        }


        .iy-welcome-title {
          margin:
            5px 0 5px;

          color:
            #1f252d;

          font-size:
            21px;

          line-height:
            1.2;

          letter-spacing:
            -.5px;
        }


        .iy-welcome-title span {
          color:
            var(--iy-primary);
        }


        .iy-welcome-text {
          max-width:
            350px;

          margin:
            0 auto;

          color:
            #7d858e;

          font-size:
            10.5px;

          line-height:
            1.55;
        }


        .iy-section-heading {
          display:
            flex;

          align-items:
            baseline;

          justify-content:
            space-between;

          margin:
            3px 2px 8px;
        }


        .iy-section-heading span {
          color:
            #343b44;

          font-size:
            9px;

          font-weight:
            850;

          text-transform:
            uppercase;

          letter-spacing:
            .7px;
        }


        .iy-section-heading small {
          color:
            #a3a9b0;

          font-size:
            8px;

          font-weight:
            600;
        }


        .iy-capabilities {
          display:
            grid;

          grid-template-columns:
            1fr 1fr;

          gap:
            8px;
        }


        .iy-capability {
          position:
            relative;

          min-height:
            88px;

          padding:
            11px;

          border:
            1px solid #e8ecef;

          border-radius:
            15px;

          background:
            white;

          cursor:
            pointer;

          text-align:
            left;

          box-shadow:
            0 3px 12px
            rgba(0,0,0,.035);

          transition:
            transform .16s ease,
            box-shadow .16s ease,
            border-color .16s ease;
        }


        .iy-capability:hover {
          transform:
            translateY(-2px);

          border-color:
            var(--iy-border);

          box-shadow:
            0 8px 22px
            rgba(0,0,0,.07);
        }


        .iy-capability-icon {
          width:
            29px;

          height:
            29px;

          margin-bottom:
            8px;

          border-radius:
            9px;

          color:
            white;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          font-size:
            11px;

          font-weight:
            900;
        }


        .iy-capability-copy {
          padding-right:
            12px;
        }


        .iy-capability-title {
          color:
            #252b33;

          font-size:
            10.5px;

          font-weight:
            800;
        }


        .iy-capability-description {
          margin-top:
            3px;

          color:
            #8c939b;

          font-size:
            8.5px;

          line-height:
            1.35;
        }


        .iy-capability-arrow {
          position:
            absolute;

          right:
            10px;

          bottom:
            9px;

          color:
            #b1b7bd;

          font-size:
            12px;
        }


        /* =================================================
           PROMPTS
           ================================================= */

        .iy-prompt-area {
          margin-top:
            17px;
        }


        .iy-prompts {
          display:
            flex;

          flex-direction:
            column;

          gap:
            6px;
        }


        .iy-prompt {
          min-height:
            38px;

          width:
            100%;

          padding:
            6px 9px;

          display:
            flex;

          align-items:
            center;

          gap:
            8px;

          border:
            1px solid #e9edef;

          border-radius:
            11px;

          background:
            #fafbfb;

          color:
            #4a5159;

          cursor:
            pointer;

          text-align:
            left;

          transition:
            background .15s ease,
            transform .15s ease,
            border-color .15s ease;
        }


        .iy-prompt:hover {
          background:
            white;

          transform:
            translateX(2px);

          border-color:
            var(--iy-border);
        }


        .iy-prompt-icon {
          width:
            25px;

          height:
            25px;

          flex-shrink:
            0;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border:
            1px solid #e5e9eb;

          border-radius:
            8px;

          background:
            white;

          color:
            var(--iy-primary);

          font-size:
            8px;

          font-weight:
            850;
        }


        .iy-prompt-text {
          flex:
            1;

          font-size:
            9.5px;

          line-height:
            1.3;
        }


        .iy-prompt-arrow {
          color:
            #a7aeb5;

          font-size:
            13px;
        }


        .iy-created {
          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            4px;

          margin:
            17px 0 4px;

          color:
            #a1a7ae;

          font-size:
            8px;
        }


        .iy-created strong {
          color:
            #646c75;

          font-weight:
            800;
        }


        .iy-created-logo {
          width:
            18px;

          height:
            18px;

          margin-left:
            2px;

          border-radius:
            6px;

          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            center;

          color:
            white;

          font-size:
            7px;

          font-weight:
            900;
        }


        /* =================================================
           CHAT
           ================================================= */

        .iy-chat {
          flex:
            1;

          min-height:
            0;

          display:
            flex;

          flex-direction:
            column;

          overflow:
            hidden;

          background:
            #fff;
        }


        .iy-messages {
          flex:
            1;

          min-height:
            0;

          overflow-y:
            auto;

          padding:
            15px 13px 8px;

          display:
            flex;

          flex-direction:
            column;

          gap:
            9px;

          -webkit-overflow-scrolling:
            touch;

          overscroll-behavior:
            contain;
        }


        .iy-messages::-webkit-scrollbar {
          width:
            4px;
        }


        .iy-messages::-webkit-scrollbar-thumb {
          background:
            #dce1e4;

          border-radius:
            10px;
        }


        .iy-message-row {
          width:
            100%;

          display:
            flex;

          flex-direction:
            column;
        }


        .iy-message-row.user {
          align-items:
            flex-end;
        }


        .iy-message-row.bot {
          align-items:
            flex-start;
        }


        .iy-message {
          max-width:
            88%;

          padding:
            10px 13px;

          border-radius:
            15px;

          font-size:
            11.5px;

          line-height:
            1.55;

          overflow-wrap:
            anywhere;

          word-break:
            break-word;
        }


        .iy-message.user {
          color:
            white;

          background:
            var(--iy-dark);

          border-bottom-right-radius:
            4px;

          box-shadow:
            0 4px 12px
            rgba(8,17,31,.10);
        }


        .iy-message.bot {
          color:
            #2b3037;

          background:
            var(--iy-bot);

          border:
            1px solid
            rgba(219,228,231,.7);

          border-bottom-left-radius:
            4px;
        }


        .iy-message strong {
          font-weight:
            850;

          color:
            #20262d;
        }


        .iy-text-line {
          display:
            inline;
        }


        .iy-bullet-line {
          display:
            inline-flex;

          align-items:
            flex-start;

          gap:
            6px;
        }


        .iy-bullet {
          color:
            var(--iy-primary);

          font-weight:
            900;
        }


        .iy-time {
          margin-top:
            2px;

          padding:
            0 4px;

          color:
            #a4aab1;

          font-size:
            8px;
        }


        /* =================================================
           FEEDBACK
           ================================================= */

        .iy-message-tools {
          display:
            flex;

          gap:
            1px;

          margin-top:
            1px;
        }


        .iy-feedback-button {
          width:
            25px;

          height:
            23px;

          border:
            none;

          border-radius:
            7px;

          background:
            transparent;

          color:
            #969da5;

          cursor:
            pointer;

          font-size:
            11px;

          opacity:
            .55;
        }


        .iy-feedback-button:hover,
        .iy-feedback-button.selected {
          background:
            #f2f5f6;

          opacity:
            1;
        }


        /* =================================================
           CONTACT
           ================================================= */

        .iy-contact {
          width:
            min(100%, 355px);

          margin-top:
            7px;

          padding:
            9px;

          border:
            1px solid #e7ecee;

          border-radius:
            13px;

          background:
            #fbfcfc;
        }


        .iy-contact-label {
          margin-bottom:
            7px;

          color:
            #646c75;

          font-size:
            8.5px;

          font-weight:
            800;

          text-transform:
            uppercase;

          letter-spacing:
            .5px;
        }


        .iy-contact-grid {
          display:
            grid;

          grid-template-columns:
            1fr 1fr;

          gap:
            5px;
        }


        .iy-contact-link {
          min-height:
            34px;

          padding:
            5px 7px;

          display:
            flex;

          align-items:
            center;

          gap:
            6px;

          border:
            1px solid #e4e9eb;

          border-radius:
            9px;

          background:
            white;

          color:
            #4c545d;

          text-decoration:
            none;

          font-size:
            8.5px;

          font-weight:
            750;

          transition:
            transform .15s ease,
            border-color .15s ease,
            box-shadow .15s ease;
        }


        .iy-contact-link:hover {
          transform:
            translateY(-1px);

          border-color:
            var(--iy-accent);

          box-shadow:
            0 4px 12px
            rgba(0,0,0,.06);
        }


        .iy-contact-icon {
          width:
            23px;

          height:
            23px;

          flex-shrink:
            0;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          border-radius:
            7px;

          background:
            var(--iy-soft);

          color:
            var(--iy-primary);

          font-size:
            8px;

          font-weight:
            900;
        }


        .iy-contact-link span:nth-child(2) {
          flex:
            1;
        }


        .iy-contact-link b {
          color:
            #a3aab1;

          font-size:
            10px;
        }


        /* =================================================
           EMPTY CHAT
           ================================================= */

        .iy-empty-chat {
          flex:
            1;

          min-height:
            250px;

          display:
            flex;

          flex-direction:
            column;

          align-items:
            center;

          justify-content:
            center;

          text-align:
            center;
        }


        .iy-empty-icon {
          width:
            46px;

          height:
            46px;

          border-radius:
            14px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          color:
            white;

          font-size:
            12px;

          font-weight:
            900;

          margin-bottom:
            9px;
        }


        .iy-empty-chat h2 {
          margin:
            0 0 4px;

          color:
            #313840;

          font-size:
            16px;
        }


        .iy-empty-chat p {
          margin:
            0;

          color:
            #9aa1a8;

          font-size:
            9.5px;
        }


        /* =================================================
           TYPING
           ================================================= */

        .iy-typing {
          display:
            flex;

          align-items:
            center;

          gap:
            7px;

          align-self:
            flex-start;
        }


        .iy-typing-avatar {
          width:
            25px;

          height:
            25px;

          border-radius:
            8px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          background:
            linear-gradient(
              135deg,
              var(--iy-primary),
              var(--iy-secondary)
            );

          color:
            white;

          font-size:
            7px;

          font-weight:
            900;
        }


        .iy-typing-bubble {
          min-height:
            31px;

          padding:
            7px 10px;

          display:
            flex;

          align-items:
            center;

          gap:
            7px;

          border:
            1px solid #e7ecee;

          border-radius:
            11px;

          background:
            #f5f7f8;

          color:
            #949ba2;

          font-size:
            8px;
        }


        .iy-dots {
          display:
            flex;

          gap:
            3px;
        }


        .iy-dots span {
          width:
            4px;

          height:
            4px;

          border-radius:
            50%;

          background:
            var(--iy-primary);

          animation:
            iy-dot 1.1s
            infinite ease-in-out;
        }


        .iy-dots span:nth-child(2) {
          animation-delay:
            .15s;
        }


        .iy-dots span:nth-child(3) {
          animation-delay:
            .3s;
        }


        @keyframes iy-dot {
          0%,
          60%,
          100% {
            transform:
              translateY(0);

            opacity:
              .45;
          }

          30% {
            transform:
              translateY(-3px);

            opacity:
              1;
          }
        }


        /* =================================================
           SUGGESTIONS
           ================================================= */

        .iy-suggestions {
          display:
            flex;

          gap:
            5px;

          overflow-x:
            auto;

          padding:
            5px 11px 6px;

          scrollbar-width:
            none;
        }


        .iy-suggestions::-webkit-scrollbar {
          display:
            none;
        }


        .iy-suggestion {
          flex:
            0 0 auto;

          border:
            1px solid #e5eaec;

          border-radius:
            9px;

          background:
            #fafbfb;

          color:
            #6c747c;

          padding:
            5px 8px;

          cursor:
            pointer;

          font-size:
            8px;

          white-space:
            nowrap;
        }


        .iy-suggestion:hover {
          border-color:
            var(--iy-border);

          color:
            var(--iy-primary);
        }


        /* =================================================
           INPUT
           ================================================= */

        .iy-input-area {
          flex-shrink:
            0;

          padding:
            7px 10px 5px;

          border-top:
            1px solid #edf0f2;

          background:
            white;
        }


        .iy-input-wrap {
          display:
            flex;

          align-items:
            center;

          gap:
            7px;

          padding:
            4px;

          border:
            1px solid #dfe5e8;

          border-radius:
            14px;

          background:
            #f8fafb;

          transition:
            border-color .15s ease,
            box-shadow .15s ease;
        }


        .iy-input-wrap:focus-within {
          border-color:
            var(--iy-accent);

          box-shadow:
            0 0 0 3px
            rgba(20,184,166,.08);

          background:
            white;
        }


        .iy-input {
          flex:
            1;

          min-width:
            0;

          height:
            36px;

          border:
            none;

          outline:
            none;

          background:
            transparent;

          color:
            #20252b;

          padding:
            0 8px;

          font-size:
            13px;
        }


        .iy-input::placeholder {
          color:
            #a7adb3;
        }


        .iy-send {
          width:
            36px;

          height:
            36px;

          flex-shrink:
            0;

          border:
            none;

          border-radius:
            11px;

          color:
            white;

          cursor:
            pointer;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          font-size:
            16px;

          font-weight:
            700;

          transition:
            transform .15s ease,
            opacity .15s ease;
        }


        .iy-send:hover:not(:disabled) {
          transform:
            scale(1.04);
        }


        .iy-send:disabled {
          opacity:
            .4;

          cursor:
            not-allowed;
        }


        /* =================================================
           CHAT BOTTOM
           ================================================= */

        .iy-chat-bottom {
          height:
            25px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          padding:
            0 12px;

          color:
            #a7adb3;

          font-size:
            7px;
        }


        .iy-clear {
          border:
            none;

          padding:
            0;

          background:
            transparent;

          color:
            #9299a1;

          cursor:
            pointer;

          font-size:
            7.5px;
        }


        .iy-clear:hover {
          color:
            var(--iy-primary);
        }


        .iy-clear:disabled {
          opacity:
            .4;

          cursor:
            not-allowed;
        }


        /* =================================================
           FOOTER
           ================================================= */

        .iy-footer {
          flex-shrink:
            0;

          min-height:
            25px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            4px;

          border-top:
            1px solid #f0f2f3;

          background:
            white;

          color:
            #a4aab0;

          font-size:
            7.5px;
        }


        .iy-footer strong {
          color:
            #69717a;

          font-weight:
            800;
        }


        .iy-footer-logo {
          width:
            17px;

          height:
            17px;

          margin-left:
            1px;

          border-radius:
            5px;

          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            center;

          color:
            white;

          font-size:
            6.5px;

          font-weight:
            900;
        }


        /* =================================================
           MOBILE
           ================================================= */

        @media (max-width: 640px) {

          .iy-launcher {
            right:
              15px;

            bottom:
              15px;
          }


          .iy-launcher-label {
            display:
              none;
          }


          .iy-launcher-button {
            width:
              56px;

            height:
              56px;

            border-radius:
              17px;
          }


          .iy-window {
            width:
              calc(100vw - 18px);

            height:
              min(
                720px,
                calc(100dvh - 30px)
              );

            max-width:
              calc(100vw - 18px);

            max-height:
              calc(100dvh - 30px);

            border-radius:
              20px;
          }


          .iy-window.fullscreen {
            width:
              100vw;

            height:
              100dvh;

            max-width:
              100vw;

            max-height:
              100dvh;

            border-radius:
              0;
          }


          .iy-header {
            padding:
              13px 12px;
          }


          .iy-brand-logo {
            width:
              38px;

            height:
              38px;

            border-radius:
              12px;
          }


          .iy-brand-name {
            font-size:
              14px;
          }


          .iy-brand-subtitle {
            font-size:
              8px;
          }


          .iy-status {
            font-size:
              7px;
          }


          .iy-action {
            width:
              28px;

            height:
              28px;
          }


          .iy-home {
            padding:
              15px 12px 7px;
          }


          .iy-welcome {
            padding-bottom:
              13px;
          }


          .iy-welcome-icon {
            width:
              52px;

            height:
              52px;

            border-radius:
              16px;
          }


          .iy-welcome-title {
            font-size:
              19px;
          }


          .iy-welcome-text {
            font-size:
              10px;
          }


          .iy-capability {
            min-height:
              82px;

            padding:
              10px;
          }


          .iy-capability-title {
            font-size:
              10px;
          }


          .iy-capability-description {
            font-size:
              8px;
          }


          .iy-message {
            max-width:
              92%;

            font-size:
              11.5px;

            padding:
              9px 11px;
          }


          .iy-contact-grid {
            grid-template-columns:
              1fr 1fr;
          }


          .iy-input {
            font-size:
              16px;
          }


          .iy-footer {
            min-height:
              24px;
          }
        }


        /* =================================================
           SMALL PHONES
           ================================================= */

        @media (max-width: 380px) {

          .iy-window {
            width:
              calc(100vw - 10px);

            max-width:
              calc(100vw - 10px);

            height:
              calc(100dvh - 18px);

            max-height:
              calc(100dvh - 18px);

            border-radius:
              18px;
          }


          .iy-capabilities {
            gap:
              6px;
          }


          .iy-capability {
            min-height:
              78px;

            padding:
              8px;
          }


          .iy-capability-icon {
            width:
              26px;

            height:
              26px;

            margin-bottom:
              6px;
          }


          .iy-capability-title {
            font-size:
              9px;
          }


          .iy-capability-description {
            font-size:
              7.5px;
          }


          .iy-prompt-text {
            font-size:
              8.5px;
          }
        }


        /* =================================================
           REDUCED MOTION
           ================================================= */

        @media (
          prefers-reduced-motion: reduce
        ) {

          .iy-window,
          .iy-launcher-button,
          .iy-capability,
          .iy-prompt,
          .iy-contact-link {
            animation:
              none !important;

            transition:
              none !important;
          }
        }

      `}</style>
    </>
  );
}