"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export default function ChatPill() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleState = (event) => setOpen(Boolean(event.detail?.open));
    window.addEventListener("chat-state", handleState);
    return () => window.removeEventListener("chat-state", handleState);
  }, []);

  if (open) return null;

  return (
    <button
      type="button"
      className="chat-pill"
      onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
      aria-label="Open IY AI chat"
    >
      <MessageCircle size={20} aria-hidden="true" />
      <span>Chat with IY AI</span>
    </button>
  );
}
