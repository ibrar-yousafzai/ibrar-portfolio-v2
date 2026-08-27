"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";

/* =========================================================
   IY AI — PERSONAL PORTFOLIO ASSISTANT
   ========================================================= */

const API_URL = "https://iy-portfolio-chatbot.onrender.com/chat";
const FEEDBACK_URL =
  "https://iy-portfolio-chatbot.onrender.com/feedback";

const CONTACT_EMAIL =
  "ibrar.yousafzai.ai@gmail.com";

const LINKEDIN_URL =
  "https://pk.linkedin.com/in/ibrar-yousafzai";

const GITHUB_URL =
  "https://github.com/ibrar-yousafzai";

/*
  If your portfolio has a Contact section,
  keep "#contact".

  If you have a separate contact page,
  replace it with your real URL.
*/
const CONTACT_FORM_URL = "#contact";


function renderBotText(text) {

  if (!text)
    return null;


  const cleanText =
    String(text)
      .replace(/\\\*\\\*/g, "**")
      .replace(/\\n/g, "\n");

  const lines =
    cleanText.split("\n");


  return lines.map(
    (line, lineIndex) => {

      const parts =
        line.split(/(\*\*.*?\*\*)/g);


      return (

        <Fragment key={lineIndex}>

          {parts.map(
            (part, partIndex) => {

              if (
                part.startsWith("**") &&
                part.endsWith("**")
              ) {

                return (

                  <strong key={partIndex}>
                    {part.slice(2, -2)}
                  </strong>

                );

              }


              return (

                <Fragment key={partIndex}>
                  {part}
                </Fragment>

              );

            }
          )}


          {lineIndex < lines.length - 1 && (
            <br />
          )}

        </Fragment>

      );

    }
  );

}


export default function ChatWidget() {

  /* =======================================================
     STATE
     ======================================================= */

  const [open, setOpen] = useState(false);

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


  /* =======================================================
     SESSION
     ======================================================= */

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


  /* =======================================================
     AUTO SCROLL
     ======================================================= */

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


  /* =======================================================
     ESC KEY
     ======================================================= */

  useEffect(() => {

    const handleKeyDown =
      (event) => {

        if (
          event.key !== "Escape"
        )
          return;

        if (fullscreen) {

          setFullscreen(false);

          return;

        }

        if (open) {

          setOpen(false);

        }

      };


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


  /* =======================================================
     BODY LOCK WHEN FULLSCREEN
     ======================================================= */

  useEffect(() => {

    if (fullscreen) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "";

    }


    return () => {

      document.body.style.overflow =
        "";

    };

  }, [fullscreen]);


  /* =======================================================
     THEME
     ======================================================= */

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


  /* =======================================================
     QUICK PROMPTS
     ======================================================= */

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
        "Discuss freelance opportunities",
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


  /* =======================================================
     OPEN CHAT
     ======================================================= */

  function openChat() {

    setOpen(true);

    setFullscreen(false);

  }


  /* =======================================================
     CLOSE CHAT
     ======================================================= */

  function closeChat() {

    setOpen(false);

    setFullscreen(false);

  }


  /* =======================================================
     FULLSCREEN
     ======================================================= */

  function toggleFullscreen() {

    setFullscreen(
      (previous) =>
        !previous
    );

  }


  /* =======================================================
     CONTACT DETECTION
     ======================================================= */

  function detectsContactIntent(userText) {

  const text =
    (userText || "").toLowerCase();

  const contactWords = [

    "contact",

    "contact him",

    "contact ibar",

    "contact ibrar",

    "how can i contact",

    "how do i contact",

    "reach him",

    "reach ibrar",

    "reach out",

    "hire him",

    "hire ibrar",

    "hire",

    "freelance",

    "freelancing",

    "work with him",

    "work with ibrar",

    "email",

    "linkedin",

    "github",

    "connect with him",

    "connect with ibrar",

    "get in touch",

    "talk to him",

    "talk with him",

  ];

  return contactWords.some(
    (word) =>
      text.includes(word)
  );

}


  /* =======================================================
     SEND MESSAGE
     ======================================================= */

  async function sendMessage(
    text
  ) {

      text =
     (text || "").trim();

     if (!text || typing)
     return;
    const isContactQuestion = detectsContactIntent(text);


    setTab("chat");

    setInput("");

    const userMessage = {

      role: "user",

      text,

      time:
        new Date().toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),

    };


    const botIndex =
      messages.length + 1;


    setMessages(
      (previous) => [

        ...previous,

        userMessage,

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
    /* =======================================================
   SPECIAL CONTACT RESPONSE
   Do NOT send contact questions to the RAG response UI.
   This prevents URLs/contact information appearing
   inside the AI answer.
   ======================================================= */

if (isContactQuestion) {

  setTimeout(() => {

    setMessages(
      (previous) => {

        const copy =
          [...previous];

        const lastIndex =
          copy.length - 1;

        copy[lastIndex] = {

          ...copy[lastIndex],

          text:
            "Sure! Here are the best ways to connect with Ibrar.",

          time:
            new Date().toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            ),

          showContact:
            true,

        };

        return copy;

      }
    );

    setTyping(false);

  }, 350);

  return;
}

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

                message: text,

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


      while (true) {

        const {
          done,
          value,
        } =
          await reader.read();


        if (done)
          break;


        const chunk =
          decoder.decode(
            value,
            {
              stream: true,
            }
          );


        const lines =
          chunk.split("\n");


        for (
          const line of lines
        ) {

          if (
            !line.startsWith(
              "data: "
            )
          )
            continue;


          const data =
            line.slice(6);


          if (
            data ===
            "[DONE]"
          )
            continue;


          try {

            const parsed =
              JSON.parse(data);


            if (parsed.text) {

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

            /* Ignore malformed SSE chunks */

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


    setTyping(false);


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
              detectsContactIntent(
                text,
                fullText
              ),

          };

        }


        return copy;

      }
    );

  }


  /* =======================================================
     FEEDBACK
     ======================================================= */

  function sendFeedback(
    index,
    feedback
  ) {

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
              messages[index]
                ?.text || "",

            feedback,

          }),

      }
    ).catch(() => {});

  }


  /* =======================================================
     CLEAR CHAT
     ======================================================= */

  function clearChat() {

    setMessages([]);

    setTab("home");

  }


  /* =======================================================
     UI
     ======================================================= */

  return (

    <div className="iy-root">

      <style jsx global>{`

        /* ==================================================
           BASE
          /* =======================================================
             BODY LOCK WHILE CHAT IS OPEN
             ======================================================= */

          font-family:
            Inter,
            const previousOverflow =
              document.body.style.overflow;
            system-ui,
            if (open) {
            "Segoe UI",
              document.body.style.overflow =
                "hidden";


          text-rendering:
            optimizeLegibility;

        }

                previousOverflow;
        .iy-root *,
        .iy-root *::before,
        .iy-root *::after {
          }, [open]);
          box-sizing:
            border-box;

        }


        /* ==================================================
           LAUNCHER
           ================================================== */

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


        .iy-launcher-button {

          position:
            relative;

          width:
            62px;

          height:
            62px;

          border-radius:
            20px;

          border:
            1px solid
            rgba(255,255,255,.3);

          cursor:
            pointer;

          color:
            white;

          display:
            flex;

          flex-direction:
            column;

          align-items:
            center;

          justify-content:
            center;

          gap:
            1px;

          box-shadow:
            0 14px 35px
            rgba(0,0,0,.25);

          transition:
            transform .2s ease,
            box-shadow .2s ease;

        }


        .iy-launcher-button:hover {

          transform:
            translateY(-3px);

          box-shadow:
            0 18px 42px
            rgba(0,0,0,.3);

        }


        .iy-launcher-symbol {

          font-size:
            17px;

          line-height:
            1;

          font-weight:
            800;

        }


        .iy-launcher-text {

          font-size:
            9px;

          font-weight:
            700;

          letter-spacing:
            .2px;

          opacity:
            .9;

        }


        .iy-launcher-label {

          background:
            rgba(255,255,255,.97);

          color:
            #20242a;

          border:
            1px solid
            rgba(0,0,0,.06);

          padding:
            10px 14px;

          border-radius:
            16px;

          box-shadow:
            0 8px 25px
            rgba(0,0,0,.12);

          font-size:
            12px;

          font-weight:
            650;

          white-space:
            nowrap;

        }


        /* ==================================================
           CHAT WINDOW
           ================================================== */

        .iy-window {

          position:
            fixed;

          z-index:
            99989;

          width:
            430px;

          height:
            680px;

          max-width:
            calc(100vw - 40px);

          max-height:
            calc(100vh - 70px);

          left:
            50%;

          top:
            50%;

          transform:
            translate(-50%, -50%);

          background:
            #ffffff;

          border:
            1px solid
            rgba(15,23,42,.1);

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
            rgba(0,0,0,.27),

            0 8px 35px
            rgba(0,0,0,.12);

          animation:
            iy-window-in
            .25s ease-out;

          overscroll-behavior:
            contain;

        }


        @keyframes iy-window-in {

          from {

            opacity:
              0;

            transform:
              translate(-50%, -47%)
              scale(.96);

          }

          to {

            opacity:
              1;

            transform:
              translate(-50%, -50%)
              scale(1);

          }

        }


        /* ==================================================
           FULLSCREEN
           ================================================== */

        .iy-window.fullscreen {

          inset:
            0;

          width:
            100vw;

          height:
            100vh;

          max-width:
            100vw;

          max-height:
            100vh;

          left:
            0;

          top:
            0;

          transform:
            none;

          border-radius:
            0;

          border:
            none;

        }


        /* ==================================================
           HEADER
           ================================================== */

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


        .iy-header::before {

          content:
            "";

          position:
            absolute;

          width:
            160px;

          height:
            160px;

          right:
            -70px;

          top:
            -100px;

          border-radius:
            50%;

          background:
            rgba(255,255,255,.08);

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

          gap:
            10px;

          min-width:
            0;

        }


        .iy-logo {

          width:
            42px;

          height:
            42px;

          flex:
            0 0 42px;

          border-radius:
            13px;

          background:
            rgba(255,255,255,.14);

          border:
            1px solid
            rgba(255,255,255,.25);

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          font-size:
            13px;

          font-weight:
            850;

          letter-spacing:
            -.5px;

          box-shadow:
            inset 0 1px
            rgba(255,255,255,.12);

        }


        .iy-brand-info {

          min-width:
            0;

        }


        .iy-brand-title {

          margin:
            0;

          font-size:
            16px;

          line-height:
            1.15;

          font-weight:
            800;

          letter-spacing:
            -.3px;

        }


        .iy-brand-subtitle {

          margin:
            4px 0 0;

          font-size:
            10px;

          line-height:
            1.3;

          opacity:
            .72;

          white-space:
            nowrap;

          overflow:
            hidden;

          text-overflow:
            ellipsis;

        }


        .iy-online {

          display:
            flex;

          align-items:
            center;

          gap:
            5px;

          margin-top:
            4px;

          font-size:
            9px;

          opacity:
            .78;

        }


        .iy-online-dot {

          width:
            6px;

          height:
            6px;

          border-radius:
            50%;

          background:
            #4ade80;

          box-shadow:
            0 0 0 3px
            rgba(74,222,128,.12);

        }


        /* ==================================================
           HEADER ACTIONS
           ================================================== */

        .iy-actions {

          display:
            flex;

          align-items:
            center;

          gap:
            5px;

          flex-shrink:
            0;

        }


        .iy-action {

          width:
            34px;

          height:
            34px;

          border:
            1px solid
            rgba(255,255,255,.12);

          border-radius:
            10px;

          color:
            white;

          background:
            rgba(255,255,255,.09);

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          cursor:
            pointer;

          font-size:
            13px;

          transition:
            background .15s ease,
            transform .15s ease;

        }


        .iy-action:hover {

          background:
            rgba(255,255,255,.18);

          transform:
            translateY(-1px);

        }


        /* ==================================================
           NAVIGATION
           ================================================== */

        .iy-nav {

          display:
            flex;

          flex-shrink:
            0;

          background:
            #ffffff;

          border-bottom:
            1px solid #edf0f2;

        }


        .iy-nav-button {

          flex:
            1;

          height:
            45px;

          border:
            none;

          background:
            transparent;

          color:
            #8a919a;

          font-size:
            12px;

          font-weight:
            700;

          cursor:
            pointer;

          border-bottom:
            2px solid
            transparent;

        }


        /* ==================================================
           HOME
           ================================================== */

        .iy-home {

          flex:
            1;

          min-height:
            0;

          overflow-y:
            auto;

          padding:
            19px;

          background:
            linear-gradient(
              180deg,
              #ffffff 0%,
              #fbfcfd 100%
            );

        }


        .iy-welcome {

          text-align:
            center;

          padding:
            5px 5px 17px;

        }


        .iy-welcome-icon {

          width:
            58px;

          height:
            58px;

          margin:
            0 auto 12px;

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
            18px;

          font-weight:
            850;

          box-shadow:
            0 10px 25px
            rgba(0,0,0,.14);

        }


        .iy-welcome-title {

          margin:
            0;

          color:
            #111827;

          font-size:
            21px;

          font-weight:
            850;

          letter-spacing:
            -.5px;

        }


        .iy-welcome-title span {

          background:
            linear-gradient(
              90deg,
              var(--iy-primary),
              var(--iy-secondary)
            );

          -webkit-background-clip:
            text;

          background-clip:
            text;

          color:
            transparent;

        }


        .iy-welcome-text {

          max-width:
            340px;

          margin:
            8px auto 0;

          color:
            #737b86;

          font-size:
            12px;

          line-height:
            1.55;

        }


        /* ==================================================
           CAPABILITY CARDS
           ================================================== */

        .iy-section-label {

          margin:
            2px 0 9px;

          color:
            #9aa1aa;

          font-size:
            9px;

          font-weight:
            800;

          letter-spacing:
            1.3px;

          text-transform:
            uppercase;

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

          min-height:
            84px;

          padding:
            12px;

          border:
            1px solid #e8ebee;

          border-radius:
            14px;

          background:
            #ffffff;

          cursor:
            pointer;

          text-align:
            left;

          transition:
            transform .15s ease,
            border-color .15s ease,
            box-shadow .15s ease;

        }


        .iy-capability:hover {

          transform:
            translateY(-2px);

          border-color:
            #d6dde1;

          box-shadow:
            0 8px 22px
            rgba(0,0,0,.06);

        }


        .iy-capability-icon {

          width:
            31px;

          height:
            31px;

          border-radius:
            9px;

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
            800;

          margin-bottom:
            8px;

        }


        .iy-capability-title {

          color:
            #242932;

          font-size:
            11.5px;

          font-weight:
            750;

        }


        .iy-capability-description {

          margin-top:
            3px;

          color:
            #8a919a;

          font-size:
            9.5px;

          line-height:
            1.35;

        }


        /* ==================================================
           PROMPT AREA
           ================================================== */

        .iy-prompt-area {

          margin-top:
            18px;

        }


        .iy-prompt {

          width:
            100%;

          min-height:
            45px;

          display:
            flex;

          align-items:
            center;

          gap:
            10px;

          margin-bottom:
            7px;

          padding:
            9px 11px;

          background:
            #f8fafb;

          border:
            1px solid #e8ecef;

          border-radius:
            12px;

          cursor:
            pointer;

          text-align:
            left;

          transition:
            background .15s ease,
            transform .15s ease;

        }


        .iy-prompt:hover {

          background:
            white;

          transform:
            translateX(2px);

        }


        .iy-prompt-icon {

          width:
            27px;

          height:
            27px;

          border-radius:
            8px;

          background:
            white;

          border:
            1px solid #e4e8eb;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          color:
            var(--iy-primary);

          font-size:
            11px;

          font-weight:
            800;

          flex-shrink:
            0;

        }


        .iy-prompt-text {

          flex:
            1;

          color:
            #454b54;

          font-size:
            11.5px;

          line-height:
            1.35;

        }


        .iy-prompt-arrow {

          color:
            #a3a9b0;

          font-size:
            14px;

        }


        /* ==================================================
           HOME FOOTER
           ================================================== */

        .iy-created {

          text-align:
            center;

          padding:
            15px 0 4px;

          color:
            #9aa0a8;

          font-size:
            9.5px;

        }


        .iy-created strong {

          color:
            #59616b;

          font-weight:
            750;

        }


        .iy-created-logo {

          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            center;

          width:
            18px;

          height:
            18px;

          margin-left:
            4px;

          border-radius:
            6px;

          color:
            white;

          font-size:
            7px;

          font-weight:
            850;

        }


        /* ==================================================
           CHAT
           ================================================== */

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

          overscroll-behavior-y:
            contain;

          touch-action:
            pan-y;

        }


        .iy-message-row {

          display:
            flex;

          flex-direction:
            column;

          width:
            100%;

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
            12.5px;

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

          border-bottom-right-radius:
            4px;

        }


        .iy-message.bot {

          color:
            #252a31;

          border-bottom-left-radius:
            4px;

        }


        .iy-message strong {

          font-weight:
            800;

        }


        .iy-time {

          padding:
            3px 4px 0;

          color:
            #a2a7ae;

          font-size:
            9px;

        }


        /* ==================================================
           FEEDBACK
           ================================================== */

        .iy-feedback {

          display:
            flex;

          gap:
            2px;

          margin-top:
            2px;

        }


        .iy-feedback-button {

          border:
            none;

          background:
            transparent;

          cursor:
            pointer;

          font-size:
            12px;

          opacity:
            .5;

          padding:
            4px;

        }


        /* ==================================================
           CONTACT BUTTONS
           ================================================== */

        .iy-contact {

          display:
            flex;

          flex-wrap:
            wrap;

          gap:
            5px;

          margin-top:
            6px;

        }


        .iy-contact-link {

          display:
            inline-flex;

          align-items:
            center;

          gap:
            5px;

          min-height:
            31px;

          padding:
            6px 9px;

          border:
            1px solid #e1e5e8;

          background:
            white;

          border-radius:
            9px;

          text-decoration:
            none;

          color:
            #3d444d;

          font-size:
            10px;

          font-weight:
            650;

        }


        /* ==================================================
           TYPING
           ================================================== */

        .iy-typing {

          display:
            flex;

          align-items:
            center;

          gap:
            7px;

          color:
            #8e959e;

          font-size:
            10.5px;

          padding:
            3px 5px;

        }


        .iy-dots {

          display:
            flex;

          gap:
            3px;

        }


        .iy-dot {

          width:
            5px;

          height:
            5px;

          border-radius:
            50%;

          background:
            #9299a2;

          animation:
            iy-dot
            1.1s
            infinite
            ease-in-out;

        }


        .iy-dot:nth-child(2) {

          animation-delay:
            .15s;

        }


        .iy-dot:nth-child(3) {

          animation-delay:
            .3s;

        }


        @keyframes iy-dot {

          0%,
          60%,
          100% {

            opacity:
              .35;

            transform:
              translateY(0);

          }

          30% {

            opacity:
              1;

            transform:
              translateY(-3px);

          }

        }


        /* ==================================================
           CHAT SUGGESTIONS
           ================================================== */

        .iy-suggestions {

          display:
            flex;

          gap:
            6px;

          overflow-x:
            auto;

          padding:
            7px 11px;

          flex-shrink:
            0;

          scrollbar-width:
            none;

        }


        .iy-suggestions::-webkit-scrollbar {

          display:
            none;

        }


        .iy-suggestion {

          flex-shrink:
            0;

          border:
            1px solid #e2e6e9;

          background:
            white;

          border-radius:
            20px;

          padding:
            7px 10px;

          min-height:
            31px;

          cursor:
            pointer;

          color:
            #535a63;

          font-size:
            10px;

          font-weight:
            650;

        }


        /* ==================================================
           INPUT
           ================================================== */

        .iy-input-area {

          display:
            flex;

          align-items:
            center;

          gap:
            7px;

          padding:
            9px 10px;

          border-top:
            1px solid #eceff1;

          background:
            white;

          flex-shrink:
            0;

        }


        .iy-input {

          flex:
            1;

          min-width:
            0;

          height:
            43px;

          border:
            1px solid #dde2e6;

          border-radius:
            13px;

          outline:
            none;

          background:
            #f8fafb;

          padding:
            9px 12px;

          font-family:
            inherit;

          font-size:
            16px;

          color:
            #20242a;

        }


        .iy-input:focus {

          background:
            white;

          border-color:
            var(--iy-primary);

          box-shadow:
            0 0 0 3px
            rgba(20,184,166,.08);

        }


        .iy-send {

          width:
            43px;

          height:
            43px;

          min-width:
            43px;

          border:
            none;

          border-radius:
            13px;

          color:
            white;

          cursor:
            pointer;

          font-size:
            16px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

        }


        .iy-send:disabled {

          opacity:
            .45;

          cursor:
            not-allowed;

        }


        /* ==================================================
           CHAT FOOTER
           ================================================== */

        .iy-chat-footer {

          text-align:
            center;

          color:
            #a2a7ad;

          font-size:
            8.5px;

          padding:
            4px 0 7px;

          background:
            white;

          flex-shrink:
            0;

        }


        .iy-chat-footer strong {

          color:
            #656d76;

        }


        /* ==================================================
           MOBILE
           ================================================== */

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
              18px;

          }


          .iy-window {

            width:
              calc(100vw - 22px);

            height:
              min(
                680px,
                calc(100vh - 44px)
              );

            max-width:
              calc(100vw - 22px);

            max-height:
              calc(100vh - 44px);

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


          .iy-home {

            padding:
              15px 13px;

          }


          .iy-welcome {

            padding-bottom:
              14px;

          }


          .iy-welcome-title {

            font-size:
              19px;

          }


          .iy-welcome-text {

            font-size:
              11.5px;

          }


          .iy-capability {

            min-height:
              79px;

            padding:
              10px;

          }


          .iy-capability-title {

            font-size:
              11px;

          }


          .iy-capability-description {

            font-size:
              9px;

          }


          .iy-message {

            max-width:
              91%;

            font-size:
              12.5px;

          }

        }


        /* ==================================================
           SMALL PHONES
           ================================================== */

        @media (max-width: 380px) {

          .iy-window {

            width:
              calc(100vw - 14px);

            max-width:
              calc(100vw - 14px);

            height:
              calc(100vh - 28px);

            max-height:
              calc(100vh - 28px);

            border-radius:
              17px;

          }


          .iy-capabilities {

            gap:
              6px;

          }


          .iy-capability {

            min-height:
              75px;

          }


          .iy-brand-subtitle {

            display:
              none;

          }


          .iy-action {

            width:
              31px;

            height:
              31px;

          }

        }


        /* ==================================================
           LANDSCAPE
           ================================================== */

        @media (
          max-width: 900px
        ) and (
          orientation: landscape
        ) {

          .iy-window {

            width:
              calc(100vw - 28px);

            height:
              calc(100vh - 28px);

            max-height:
              calc(100vh - 28px);

          }


          .iy-window.fullscreen {

            width:
              100vw;

            height:
              100dvh;

          }

        }


        /* ==================================================
           REDUCED MOTION
           ================================================== */

        @media (
          prefers-reduced-motion: reduce
        ) {

          .iy-window,
          .iy-launcher-button,
          .iy-capability,
          .iy-prompt {

            animation:
              none !important;

            transition:
              none !important;

          }


          .iy-dot {

            animation:
              none !important;

          }

        }

      `}</style>


      {/* =====================================================
          FLOATING LAUNCHER
          ===================================================== */}

      <div className="iy-launcher">

        {!open && (

          <div
            className="iy-launcher-label"
            onClick={openChat}
          >

            ✦ Ask Ibrar AI

          </div>

        )}


        <button
          className="iy-launcher-button"
          onClick={() => {

            if (open) {

              closeChat();

            } else {

              openChat();

            }

          }}
          style={{

            background:
              `linear-gradient(
                135deg,
                ${theme.primary},
                ${theme.secondary}
              )`,

          }}
          aria-label={
            open
              ? "Close IY AI"
              : "Ask Ibrar AI"
          }
        >

          <span className="iy-launcher-symbol">

            {open ? "×" : "✦"}

          </span>

          <span className="iy-launcher-text">

            {open ? "CLOSE" : "IY AI"}

          </span>

        </button>

      </div>


      {/* =====================================================
          CHAT WINDOW
          ===================================================== */}

      {open && (

        <div
          className={`iy-window ${
            fullscreen
              ? "fullscreen"
              : ""
          }`}
          style={{

            "--iy-primary":
              theme.primary,

            "--iy-secondary":
              theme.secondary,

          }}
        >


          {/* =================================================
              HEADER
              ================================================= */}

          <header
            className="iy-header"
            style={{

              background:
                `linear-gradient(
                  135deg,
                  ${theme.dark},
                  #102b4d
                )`,

            }}
          >

            <div className="iy-header-content">


              <div className="iy-brand">

                <div className="iy-logo">

                  IY

                </div>


                <div className="iy-brand-info">

                  <h2 className="iy-brand-title">

                    IY AI ✦

                  </h2>


                  <p className="iy-brand-subtitle">

                    Personal Portfolio Intelligence

                  </p>


                  <div className="iy-online">

                    <span className="iy-online-dot" />

                    Online · Ready to help

                  </div>

                </div>

              </div>


              <div className="iy-actions">


                {/* THEME */}

                <button
                  className="iy-action"
                  onClick={() =>
                    setGenz(
                      (previous) =>
                        !previous
                    )
                  }
                  title="Change appearance"
                  aria-label="Change appearance"
                >

                  ◐

                </button>


                {/* FULLSCREEN */}

                <button
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


                {/* CLOSE */}

                <button
                  className="iy-action"
                  onClick={closeChat}
                  title="Close assistant"
                  aria-label="Close assistant"
                >

                  ×

                </button>

              </div>

            </div>

          </header>


          {/* =================================================
              NAV
              ================================================= */}

          <div className="iy-nav">

            <button
              className="iy-nav-button"
              onClick={() =>
                setTab("home")
              }
              style={{

                color:
                  tab === "home"
                    ? theme.accentDark
                    : "#8a919a",

                borderBottom:
                  tab === "home"
                    ? `2px solid ${theme.accent}`
                    : "2px solid transparent",

              }}
            >

              ✦ Discover

            </button>


            <button
              className="iy-nav-button"
              onClick={() =>
                setTab("chat")
              }
              style={{

                color:
                  tab === "chat"
                    ? theme.accentDark
                    : "#8a919a",

                borderBottom:
                  tab === "chat"
                    ? `2px solid ${theme.accent}`
                    : "2px solid transparent",

              }}
            >

              ◌ Conversation

            </button>

          </div>


          {/* =================================================
              HOME
              ================================================= */}

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

                  IY

                </div>


                <h1 className="iy-welcome-title">

                  Hi, I'm{" "}

                  <span>
                    IY AI
                  </span>{" "}

                  👋

                </h1>


                <p className="iy-welcome-text">

                  Your AI guide to Ibrar
                  Yousafzai's portfolio.
                  Ask about projects,
                  skills, experience,
                  technologies or working
                  together.

                </p>

              </section>


              <div className="iy-section-label">

                Explore

              </div>


              <div className="iy-capabilities">

                {prompts.map(
                  (item, index) => (

                    <button
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


                      <div className="iy-capability-title">

                        {item.title}

                      </div>


                      <div className="iy-capability-description">

                        {item.description}

                      </div>

                    </button>

                  )
                )}

              </div>


              <div className="iy-prompt-area">

                <div className="iy-section-label">

                  Try asking

                </div>


                {suggestedQuestions.map(
                  (question, index) => (

                    <button
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


              <div className="iy-created">

                Created by{" "}

                <strong>
                  Ibrar Yousafzai
                </strong>


                <span
                  className="iy-created-logo"
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

              </div>

            </main>

          )}


          {/* =================================================
              CHAT
              ================================================= */}

          {tab === "chat" && (

            <section className="iy-chat">


              {/* =============================================
                  MESSAGES
                  ============================================= */}

              <div
                className="iy-messages"
                ref={scrollRef}
              >

                {messages.length === 0 && (

                  <div className="iy-welcome">

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

                      IY

                    </div>


                    <h1 className="iy-welcome-title">

                      Ask{" "}

                      <span>
                        IY AI
                      </span>

                    </h1>


                    <p className="iy-welcome-text">

                      Ask me anything about
                      Ibrar's portfolio.

                    </p>

                  </div>

                )}


                {messages.map(
                  (message, index) => (

                    <div
                      key={index}
                      className={`iy-message-row ${message.role}`}
                    >


                      <div
                        className={`iy-message ${message.role}`}
                        style={{

                          background:
                            message.role ===
                            "user"

                              ? theme.dark

                              : theme.bot,

                        }}
                      >

                        {message.role === "bot"
                          ? renderBotText(message.text)
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

                          <div className="iy-feedback">

                            <button
                              className="iy-feedback-button"
                              onClick={() =>
                                sendFeedback(
                                  index,
                                  "up"
                                )
                              }
                              style={{
                                opacity:
                                  message.feedback ===
                                  "up"
                                    ? 1
                                    : .5,
                              }}
                            >

                              👍

                            </button>


                            <button
                              className="iy-feedback-button"
                              onClick={() =>
                                sendFeedback(
                                  index,
                                  "down"
                                )
                              }
                              style={{
                                opacity:
                                  message.feedback ===
                                  "down"
                                    ? 1
                                    : .5,
                              }}
                            >

                              👎

                            </button>

                          </div>

                        )}


                      {message.showContact && (

                        <div className="iy-contact">

                          <a
                            href={LINKEDIN_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="iy-contact-link"
                          >
                            ↗ LinkedIn
                          </a>

                          <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="iy-contact-link"
                          >
                            ◇ GitHub
                          </a>

                          <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="iy-contact-link"
                          >
                            @ Email
                          </a>

                          <a
                            href={CONTACT_FORM_URL}
                            className="iy-contact-link"
                          >
                            ✎ Contact Form
                          </a>

                        </div>

                      )}


                    </div>

                  )
                )}


                {typing && (

                  <div className="iy-typing">

                    <div className="iy-dots">

                      <span className="iy-dot" />

                      <span className="iy-dot" />

                      <span className="iy-dot" />

                    </div>

                    IY AI is thinking...

                  </div>

                )}

              </div>


              {/* =============================================
                  SUGGESTIONS
                  ============================================= */}

              <div className="iy-suggestions">

                {suggestedQuestions.map(
                  (question, index) => (

                    <button
                      key={index}
                      className="iy-suggestion"
                      onClick={() =>
                        sendMessage(
                          question
                        )
                      }
                      disabled={typing}
                    >

                      {question}

                    </button>

                  )
                )}

              </div>


              {/* =============================================
                  INPUT
                  ============================================= */}

              <div className="iy-input-area">

                <input
                  className="iy-input"
                  value={input}
                  disabled={typing}
                  placeholder="Ask IY anything..."
                  autoComplete="off"
                  autoCorrect="on"
                  enterKeyHint="send"
                  onChange={(event) =>
                    setInput(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {

                    if (
                      event.key ===
                        "Enter" &&
                      !event.shiftKey
                    ) {

                      event.preventDefault();

                      sendMessage(input);

                    }

                  }}
                />


                <button
                  className="iy-send"
                  disabled={
                    typing ||
                    !input.trim()
                  }
                  onClick={() =>
                    sendMessage(input)
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

                  ↑

                </button>

              </div>


              {/* =============================================
                  FOOTER
                  ============================================= */}

              <div className="iy-chat-footer">

                Created by{" "}

                <strong>
                  Ibrar Yousafzai
                </strong>

                {" · "}

                <strong>
                  IY
                </strong>

              </div>


            </section>

          )}

        </div>

      )}

    </div>

  );

}