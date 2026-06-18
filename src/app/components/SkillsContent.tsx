const CATS = [
  {
    label: "Backend",
    color: "#8B5CF6",
    items: [
      { n: "Node.js",    p: 93 },
      { n: "Python",     p: 88 },
      { n: "LLM Integration",    p: 91 },
      { n: "FastAPI",    p: 84 },
      { n: "Flask",    p: 78 },
    ],
  },
  {
    label: "Tools and Technologies",
    color: "#3B82F6",
    items: [
      { n: "ChatGPT",   p: 86 },
      { n: "GitHub Copilot",    p: 89 },
      { n: "Gemini",  p: 84 },
      { n: "Figma AI",    p: 80 },
      { n: "Claude",    p: 72 },
    ],
  },
  {
    label: "AI / ML",
    color: "#EC4899",
    items: [
      { n: "OpenAI API", p: 93 },
      { n: "Claude API", p: 88 },
      { n: "TensorFlow", p: 68 },
    ],
  },
  {
    label: "Frontend",
    color: "#06B6D4",
    items: [
      { n: "React.JS",      p: 90 },
      { n: "HTML CSS",    p: 87 },
      { n: "TypeScript", p: 88 },
      { n: "Tailwind",   p: 94 },
      { n: "Vite",       p: 85 },
    ],
  },
];

export function SkillsContent() {
  return (
    <div className="p-5 space-y-4 overflow-auto h-full" style={{ fontFamily: "'Inter', sans-serif", scrollbarWidth: "none" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CATS.map(c => (
          <div
            key={c.label}
            className="rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.028)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }} />
              <h3 className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: c.color }}>
                {c.label}
              </h3>
            </div>
            <div className="space-y-3">
              {c.items.map(item => (
                <div key={item.n}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[12px] text-white/75">{item.n}</span>
                    <span className="text-[10px] font-medium" style={{ color: c.color, fontFamily: "'JetBrains Mono', monospace" }}>
                      {item.p}%
                    </span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.p}%`,
                        background: `linear-gradient(90deg, ${c.color}bb, ${c.color})`,
                        boxShadow: `0 0 8px ${c.color}60`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
