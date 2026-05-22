"use client";

import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
      }
    } catch (err) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: "Sorry, I couldn’t reach the Gemini API. Try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[500px] flex-col rounded-xl border border-slate-800 bg-slate-900/60">
      <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
        {messages.length === 0 && (
          <p className="text-xs text-slate-400">
            Ask anything about your Monash study: explain a concept, draft a study plan, or break down an assignment.
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wide text-slate-400">
              {m.role === "user" ? "You" : "Assistant"}
            </span>
            <div
              className={
                m.role === "user"
                  ? "self-end max-w-[80%] rounded-lg bg-blue-600 px-3 py-2 text-xs"
                  : "self-start max-w-[80%] rounded-lg bg-slate-800 px-3 py-2 text-xs"
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <p className="text-xs text-slate-400">Thinking with Gemini…</p>
        )}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2 border-t border-slate-800 p-3">
        <input
          className="flex-1 rounded-lg bg-slate-950 px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Ask a question about your Monash studies…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-500 disabled:opacity-60"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
}