export const API_URL = process.env.NEXT_PUBLIC_CHATBOT_URL || "https://iy-portfolio-chatbot.onrender.com/chat";
export const FEEDBACK_URL = "https://iy-portfolio-chatbot.onrender.com/feedback";
export const CONTACT_EMAIL = "ibrar.yousafzai.ai@gmail.com";
export const LINKEDIN_URL = "https://pk.linkedin.com/in/ibrar-yousafzai";
export const GITHUB_URL = "https://github.com/ibrar-yousafzai";
export const CONTACT_FORM_URL = "#contact";
export const WAKE_MESSAGE = "Waking up the assistant, this can take up to a minute on the first message…";
export const ERROR_MESSAGE = "I’m sorry, I’m having trouble connecting to the assistant right now. Please try again in a moment.";
export const SUGGESTIONS = [
  "What AI projects has Ibrar built?",
  "What is RAG and how can it help my business?",
  "Which tech stack do you use?",
  "How can I work with you?",
];
export const DEMOS = [
  {
    icon: "▤",
    title: "Document Q&A RAG",
    description: "Answers from PDFs and policies, with sources.",
    bestFor: "Best for: policies, handbooks, and internal documents",
    prompt: "How could a policy document assistant help my team?",
    live: false,
    messages: [
      ["user", "How could a policy document assistant help my team?"],
      ["bot", "It can answer questions from approved PDFs and policies, then point to the relevant source."],
      ["user", "Would it replace our policy owners?"],
      ["bot", "No. It can make information easier to find while policy owners remain responsible for decisions and updates."],
    ],
  },
  {
    icon: "⌕",
    title: "Hybrid search RAG",
    description: "Keyword + vector search for better accuracy.",
    bestFor: "Best for: technical knowledge bases and mixed terminology",
    prompt: "Why combine keyword and vector search?",
    live: false,
    messages: [
      ["user", "Why combine keyword and vector search?"],
      ["bot", "Keyword search helps with exact names and codes; vector search helps with meaning and related wording."],
      ["user", "What is the benefit?"],
      ["bot", "Using both can give retrieval more useful context, especially when users phrase questions differently."],
    ],
  },
  {
    icon: "▣",
    title: "E-commerce assistant",
    description: "Product recommendations grounded in catalog data.",
    bestFor: "Best for: product discovery and support",
    prompt: "How could a product assistant guide shoppers?",
    live: false,
    messages: [
      ["user", "How could a product assistant guide shoppers?"],
      ["bot", "It can ask about needs, search catalog information, and explain why a product may fit."],
      ["user", "Can it use current product data?"],
      ["bot", "It can be connected to catalog and policy data so answers reflect the information provided to it."],
    ],
  },
  {
    icon: "◉",
    title: "Banking / support assistant",
    description: "FAQ answers with a safe handoff to a human.",
    bestFor: "Best for: service FAQs and guided support",
    prompt: "What makes a support assistant safer?",
    live: false,
    messages: [
      ["user", "What makes a support assistant safer?"],
      ["bot", "It can stay focused on approved FAQ content and clearly hand tricky or sensitive questions to a person."],
      ["user", "Does it make final decisions?"],
      ["bot", "It should not be presented as a replacement for qualified staff or formal review."],
    ],
  },
  {
    icon: "⌁",
    title: "Data / analytics assistant",
    description: "Answers from tables and connected APIs.",
    bestFor: "Best for: exploring business data and operational metrics",
    prompt: "What could a data assistant help a team explore?",
    live: false,
    messages: [
      ["user", "What could a data assistant help a team explore?"],
      ["bot", "It can help users ask questions about connected tables or APIs in more natural language."],
      ["user", "How should answers be checked?"],
      ["bot", "Important figures should still be verified against the underlying data and business definitions."],
    ],
  },
];
