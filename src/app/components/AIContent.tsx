import { useState, useEffect, useRef } from "react";
import { Bot, Send, Mic, Sparkles } from "lucide-react";
import Reactmarkdown from "react-markdown";

interface ChatMsg { role: "user" | "ai"; text: string; }

// const AI_ANSWERS: Record<string, string> = {
//   "Tell me about Akansha":
//     "Akansha Gupta is a Full Stack Developer and AI enthusiast based in India. She builds AI-powered web applications and full-stack systems, specializing in Node.js, Python, flask, and modern AI frameworks. She's passionate about large language models and emerging technologies.",
//   "Show some of her projects":
//     "Here are Akansha's top projects:\n\n• AkanshaOS — React+Tailwind CSS based personal portfolio website\n• MindBloom — AI-powered mental health support app(In Progress)\n• GharPayy CRM — Python-based Lead management system for PG accommodation",
//   "Explain backend skills":
//     "Akansha's backend expertise:\n\n• Node.js — RESTful APIs\n• Python & FastAPI — High-performance async APIs for AI/ML workloads\n• Databases — PostgreSQL, MongoDB\n• Cloud & DevOps — Docker, GitHub Actions\n• API Design — REST, WebSocket",
//   "What technologies does she use?":
//     "Akansha's full tech arsenal:\n\nBackend: Node.js, Python, Flask, FastAPI\nAI/ML: OpenAI API, Claude API, Tensorflow\n Cloud: Vercel, Railway, Render\nFrontend: React, JavaScript, TypeScript, Tailwind CSS\n Databases: PostgreSQL, MongoDB,",
// };

const PROMPTS = [
  "Tell me about Akansha",
  "Show some of her projects",
  "Explain backend skills",
  "What technologies does she use?",
];

export function AIContent() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    {
      role: "ai",
      text: "Hello! I'm the AkanshaOS AI Assistant, powered by advanced language models.\n\nAsk me anything about Akansha's skills, projects, or experience — or try one of the suggested prompts below.",
    },
  ]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll the nearest scrollable container to the bottom instead of
    // calling scrollIntoView on the element itself (which can cause the
    // page to jump when the floating window is offscreen).
    const el = bottomRef.current;
    if (!el) return;
    // Find the closest ancestor that is scrollable
    let container: HTMLElement | null = el.parentElement as HTMLElement | null;
    while (container) {
      const cs = window.getComputedStyle(container);
      const overflowY = cs.overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll') break;
      container = container.parentElement as HTMLElement | null;
    }
    if (container && typeof container.scrollTo === 'function') {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    } else {
      // Fallback: smooth scroll the element without affecting page flow
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [msgs]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setMsgs(prev => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch(
        "https://portfolio-qyn8.onrender.com/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
          }),
        }
      );

      const data = await response.json();

      setMsgs(prev => [
        ...prev,
        {
          role: "ai",
          text: data.response,
        },
      ]);
    }
    catch (error) {
      setMsgs(prev => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, I'm currently unavailable.",
        },
    ]);
    }
    finally {
      setLoading(false);
    }
  }; 

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #06B6D4, #8B5CF6)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
        >
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            AkanshaOS AI
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.38)" }}>Online · Powered by Gemini</span>
          </div>
        </div>
        <div className="ml-auto">
          <Sparkles className="w-4 h-4" style={{ color: "rgba(139,92,246,0.6)" }} />
        </div>
      </div>

      {/* Suggested prompts */}
      <div className="px-4 pt-3 pb-2 shrink-0">
        <div className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>
          Suggested
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {PROMPTS.map(p => (
            <button
              key={p}
              onClick={() => send(p)}
              className="text-left px-3 py-2 rounded-xl text-[11px] font-medium transition-all hover:brightness-125"
              style={{
                background: "rgba(6,182,212,0.07)",
                border: "1px solid rgba(6,182,212,0.14)",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.4,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 16px 0" }} />

      {/* Messages */}
      <div className="flex-1 overflow-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: "none" }}>
        {msgs.map((m, i) => (
          <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "ai" && (
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "linear-gradient(135deg, #06B6D4, #8B5CF6)" }}
              >
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <div
              className="max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[12.5px] leading-relaxed whitespace-pre-line"
              style={{
                background:
                  m.role === "user"
                    ? "linear-gradient(135deg, rgba(6,182,212,0.22), rgba(139,92,246,0.22))"
                    : "rgba(255,255,255,0.05)",
                border:
                  m.role === "user"
                    ? "1px solid rgba(6,182,212,0.28)"
                    : "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.85)",
                borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              }}
            >
              <Reactmarkdown>
              {m.text}
              </Reactmarkdown>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-2.5 justify-start">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #06B6D4, #8B5CF6)" }}
            >
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <div
              className="px-4 py-3 rounded-2xl flex items-center gap-1.5"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px 16px 16px 4px" }}
            >
              {[0, 1, 2].map(d => (
                <div
                  key={d}
                  className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                  style={{ animationDelay: `${d * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 shrink-0">
        <div
          className="flex items-center gap-2 rounded-2xl px-3.5 py-2.5"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.11)",
            boxShadow: "0 0 0 0 rgba(6,182,212,0)",
            transition: "box-shadow 0.2s",
          }}
        >
          <input
            className="flex-1 bg-transparent outline-none text-[13px] text-white placeholder-white/25"
            placeholder="Ask anything about Akansha…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") send(input); }}
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
          <Mic className="w-4 h-4 shrink-0" style={{ color: "rgba(255,255,255,0.28)" }} />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, #06B6D4, #8B5CF6)" }}
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
