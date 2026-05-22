"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";

interface Message {
  role: "user" | "assistant" | "search";
  content: string;
}

export function AiWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I’m your Monash study copilot. Ask me about units, assessments, or anything you’re learning.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  async function handleSend(textToSubmit: string) {
    const text = textToSubmit.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });

      const data = await res.json();

      if (data.searchSummary) {
        nextMessages.push({
          role: "search",
          content: data.searchSummary,
        });
      }

      if (data.reply) {
        nextMessages.push({
          role: "assistant",
          content: data.reply,
        });
      }

      setMessages([...nextMessages]);
    } catch (err) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "Something went wrong talking to Gemini. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    handleSend(input);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    // Submit on Enter (unless Shift is held for a new line)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="neon-button flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white shadow-lg shadow-blue-500/30 transition-transform duration-200 hover:scale-110 active:scale-95"
          aria-label="Open AI study assistant"
        >
          ✦
        </button>
      )}

      {/* Widget panel */}
      {open && (
        <div className="glow-card card-hover flex flex-col rounded-3xl p-[1px] shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-300 w-[calc(100vw-2rem)] h-[500px] max-h-[85vh] sm:w-[380px]">
          <div className="flex flex-1 flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-slate-950/95 backdrop-blur-xl">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-xs text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                  M
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                    Monash AI
                  </p>
                  <p className="text-xs font-medium text-slate-100">
                    Gemini Copilot
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </header>

            {/* Chat Area */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-4 py-4 scroll-smooth"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-1.5 ${
                    m.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-[0.25em] text-slate-500">
                    {m.role === "user"
                      ? "You"
                      : m.role === "search"
                      ? "Web Search"
                      : "Assistant"}
                  </span>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed tracking-wide ${
                      m.role === "user"
                        ? "bg-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.25)] rounded-tr-sm"
                        : m.role === "search"
                        ? "border border-cyan-400/30 bg-cyan-500/10 text-cyan-100 rounded-tl-sm text-[11px]"
                        : "bg-slate-800/80 text-slate-100 border border-white/5 rounded-tl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-[11px] text-slate-400 animate-pulse">
                  <span className="flex gap-1">
                    <span className="h-1 w-1 rounded-full bg-blue-500"></span>
                    <span className="h-1 w-1 rounded-full bg-violet-500"></span>
                    <span className="h-1 w-1 rounded-full bg-pink-500"></span>
                  </span>
                  Processing with Gemini...
                </div>
              )}
            </div>

            {/* Input Area */}
            <form
              onSubmit={onSubmit}
              className="border-t border-white/10 bg-white/[0.01] p-3"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-slate-950/50 p-1 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
                <textarea
                  rows={1}
                  className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-3 py-2.5 text-[13px] text-slate-100 outline-none placeholder:text-slate-500"
                  placeholder="Ask about a unit or topic..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="neon-button m-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:grayscale"
                >
                  ↑
                </button>
              </div>
              <p className="mt-2 text-center text-[9px] text-slate-500">
                Press <kbd className="rounded border border-slate-700 bg-slate-800 px-1">Enter</kbd> to send
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}