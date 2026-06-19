import { useState, useEffect, useRef } from "react";

interface TermLine {
  kind: "prompt" | "out" | "head" | "item" | "err" | "blank";
  text: string;
}

const CMDS: Record<string, TermLine[]> = {
  help: [
    { kind: "head",  text: "Available Commands:" },
    { kind: "item",  text: "  about       - Learn about Akansha" },
    { kind: "item",  text: "  projects    - View portfolio projects" },
    { kind: "item",  text: "  skills      - Full tech stack" },
    { kind: "item",  text: "  coding      - View Coding Profile" },
    { kind: "item",  text: "  ai          - AI-ML Learner" },
    { kind: "item",  text: "  resume      - Download resume" },
    { kind: "item",  text: "  contact     - Get in touch" },
    { kind: "item",  text: "  clear       - Clear terminal" },
    { kind: "blank", text: "" },
  ],
  about: [
    { kind: "head",  text: "◆ Akansha Gupta — Developer Profile" },
    { kind: "out",   text: "  Role:        Full-Stack Developer · AI-ML Enthusiast" },
    { kind: "out",   text: "  Location:    Gurgaon, India  ·  Open to remote/On-Site opportunities" },
    { kind: "out",   text: "  Experience:  1+ years building full-stack websites" },
    { kind: "item",  text: "  GitHub:      @akansha-g172" },
    { kind: "item",  text: "  LinkedIn:    /in/akansha-gupta-b16972324" },
    { kind: "blank", text: "" },
  ],
  projects: [
    { kind: "head",  text: "◆ Featured Projects" },
    { kind: "item",  text: "  [1]  AkanshaOS             ·  React  Tailwind CSS  Vite  " },
    { kind: "item",  text: "  [2]  MindBloom             ·  Python  FastAPI  Docker  ReactJS" },
    { kind: "item",  text: "  [3]  GharPayy CRM          ·  Python  FastAPI  PostgreSQL" },
    { kind: "item",  text: "  [4]  DisasterShield        ·  Python  Flask  Openweather API" },
    { kind: "blank", text: "" },
  ],
  skills: [
    { kind: "head",  text: "◆ Technical Skills" },
    { kind: "out",   text: "  Backend:     Node.js  Python  Flask  FastAPI  PHP" },
    { kind: "out",   text: "  AI / ML:     OpenAI  TensorFlow  Kaggle" },
    { kind: "out",   text: "  DevOps:      Docker  Vercel  Railway  GitHub Actions  Linux" },
    { kind: "out",   text: "  Frontend:    React  TypeScript  TailwindCSS  Vite  HTML  CSS JavaScript" },
    { kind: "out",   text: "  Databases:   PostgreSQL  MongoDB" },
    { kind: "out",   text: "  Tools and Technologies:  C++  Java  ChatGPT  Claude  Github-CoPilot  Antigravity  Cursor FigmaAI" },
    { kind: "blank", text: "" },
  ],
  coding: [
    { kind: "head",  text: "◆ Coding Profile" },
    { kind: "out",   text: "  Languages:  C++ DSA" },
    { kind: "out",   text: "  Codeforces Rating:  624(Newbie)" },
    { kind: "out",   text: "  GFG+LeetCode:        250+ Problems Solved" },
    { kind: "item",  text: "  Topics Covered:        Arrays, Strings, Linked Lists, DP" },
    { kind: "blank", text: "" },
  ],
  ai: [
    { kind: "head",  text: "◆ AI-ML" },
    { kind: "out",   text: "  Models:     OpenAI · Claude  " },
    { kind: "out",   text: "  Frameworks: TensorFlow  PyTorch" },
    { kind: "out",   text: "  Projects:   AI chatbot" },
    { kind: "blank", text: "" },
  ],
  resume: [
    { kind: "head", text: "◆ Resume" },
    { kind: "out", text: "Run: open resume" },
    { kind: "blank", text: "" },
  ],
  contact: [
    { kind: "head",  text: "◆ Contact" },
    { kind: "item",  text: "  Email:     akansha6500@gmail.com" },
    { kind: "item",  text: "  GitHub:    github.com/akansha-g172" },
    { kind: "item",  text: "  LinkedIn:  linkedin.com/in/akansha-gupta-b16972324" },
    { kind: "item",  text: "  Codolio:   https://codolio.com/profile/AkanshaGupta/card" },
    { kind: "out",   text: "  Response time: usually within 24 hours" },
    { kind: "blank", text: "" },
  ],
};

const WELCOME: TermLine[] = [
  { kind: "head",  text: "AkanshaOS Terminal  v2.5.1  — Futuristic Dev Environment" },
  { kind: "out",   text: "  © 2025 Akansha Gupta  ·  All systems operational" },
  { kind: "blank", text: "" },
  { kind: "out",   text: "  Type  help  to see available commands." },
  { kind: "blank", text: "" },
];

function lineColor(kind: TermLine["kind"]) {
  if (kind === "head")   return "#22d3ee";
  if (kind === "item")   return "#a5f3fc";
  if (kind === "prompt") return "#4ade80";
  if (kind === "err")    return "#f87171";
  if (kind === "blank")  return "transparent";
  return "rgba(255,255,255,0.68)";
}

export function TerminalContent() {
  const [lines, setLines] = useState<TermLine[]>(WELCOME);
  const [input, setInput]   = useState("");
  const [cursor, setCursor] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Blinking cursor
  useEffect(() => {
    const t = setInterval(() => setCursor(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // Scroll the nearest inner scrollable container instead of the page.
    const el = bottomRef.current;
    if (!el) return;
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
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [lines]);

  // Focus the input without causing the browser to scroll the viewport.
  useEffect(() => {
    try {
      inputRef.current?.focus({ preventScroll: true } as FocusOptions);
    } catch (e) {
      // Some environments may not support the options object; fallback
      try { inputRef.current?.focus(); } catch (_) {}
    }
  }, []);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const promptLine: TermLine = { kind: "prompt", text: `akansha@AkanshaOS ~ % ${raw}` };
    if (cmd === "resume") {
        window.open(
            "https://drive.google.com/file/d/1tfkDudBXpjQo5sxBNPLKeoNzozW6H_pQ/view?usp=sharing",
            "_blank"
        );
        return;
    }
    if (cmd === "clear") { setLines([]); return; }
    const resp = CMDS[cmd] ?? [
      { kind: "err" as const, text: `  command not found: ${raw}  (type 'help' for commands)` },
      { kind: "blank" as const, text: "" },
    ];
    setLines(prev => [...prev, promptLine, ...resp]);
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, lineHeight: 1.65 }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output area */}
      <div className="flex-1 overflow-auto px-5 pt-4 space-y-0" style={{ scrollbarWidth: "none" }}>
        {lines.map((l, i) => (
          <div
            key={i}
            style={{
              color: lineColor(l.kind),
              whiteSpace: "pre",
              height: l.kind === "blank" ? 8 : "auto",
            }}
          >
            {l.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 20px" }} />

      {/* Input row */}
      <div className="flex items-center gap-2 px-5 py-3">
        <span style={{ color: "#4ade80", userSelect: "none" }}>akansha@AkanshaOS ~ %</span>
        <div className="relative flex-1 flex items-center">
          <input
            ref={inputRef}
            className="flex-1 bg-transparent outline-none text-white caret-transparent"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5 }}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && input.trim()) {
                run(input);
                setInput("");
              }
            }}
            /* focus without scrolling the page */
            autoFocus={false}
            spellCheck={false}
            autoComplete="off"
          />
          {/* focus handled in useEffect with preventScroll */}
          {/* Custom blinking cursor rendered after text */}
          <span
            className="absolute pointer-events-none"
            style={{
              left: `${input.length}ch`,
              top: "50%",
              transform: "translateY(-50%)",
              width: "0.55em",
              height: "1.1em",
              background: "#06B6D4",
              opacity: cursor ? 0.9 : 0,
              transition: "opacity 0.08s",
              borderRadius: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}
