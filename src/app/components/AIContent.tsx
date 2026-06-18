import { useState, useEffect, useRef } from "react";
import { Bot, Send, Mic, Sparkles } from "lucide-react";

interface ChatMsg { role: "user" | "ai"; text: string; }

const AI_ANSWERS: Record<string, string> = {
  "Tell me about Akansha":
    "Akansha Gupta is a Full Stack Developer and AI enthusiast based in India. She builds AI-powered web applications and full-stack systems, specializing in Node.js, Python, flask, and modern AI frameworks. She's passionate about large language models and emerging technologies.",
  "Show blockchain projects":
    "Here are Akansha's top projects:\n\n• Web3 AI Chat Platform — GPT-4 + Polygon smart contracts for on-chain message verification\n• DeFi Analytics Dashboard — Real-time portfolio tracker with Chainlink price feeds\n• NFT Marketplace — IPFS storage, lazy minting, Hardhat-deployed ERC-721 contracts\n• DAO Governance Tool — On-chain voting with gasless transaction support",
  "Explain backend skills":
    "Akansha's backend expertise:\n\n• Node.js & Express — RESTful APIs, microservices, middleware design\n• Python & FastAPI — High-performance async APIs for AI/ML workloads\n• Databases — PostgreSQL, MongoDB\n• Cloud & DevOps — Docker, GitHub Actions\n• API Design — REST, WebSocket",
  "What technologies does she use?":
    "Akansha's full tech arsenal:\n\nBackend: Node.js, Python, Flask, FastAPI\nAI/ML: OpenAI API, Claude API, Tensorflow\n Cloud: Vercel, Railway, Render\nFrontend: React, JavaScript, TypeScript, Tailwind CSS\n🗄️ Databases: PostgreSQL, MongoDB,",
};

const PROMPTS = [
  "Tell me about Akansha",
  "Show blockchain projects",
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
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = (text: string) => {
    if (!text.trim() || loading) return;
    setMsgs(prev => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const answer =
        AI_ANSWERS[text] ??
        "Great question! I can help with information about Akansha's development work, blockchain projects, and AI integrations. Try one of the suggested prompts for the best experience, or ask me something specific!";
      setMsgs(prev => [...prev, { role: "ai", text: answer }]);
      setLoading(false);
    }, 800);
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
            <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.38)" }}>Online · Powered by Claude</span>
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
              {m.text}
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
