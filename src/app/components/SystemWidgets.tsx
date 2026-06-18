import { useMemo } from "react";

interface Props { time: Date; }

const STATUS_ITEMS = [
  { l: "AI-ML Engineer",    v: 69,  color: "#10B981" },
  { l: "System Design",    v: 80, color: "#06B6D4" },
  { l: "Full Stack Web Development",   v: 100,  color: "#8B5CF6" },
  { l: "MindBloom",     v: 57,  color: "#F59E0B" },
];

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export function SystemWidgets({ time }: Props) {
  const today    = time.getDate();
  const weekDay  = time.getDay();
  const month    = time.toLocaleDateString("en", { month: "long" });

  const heatmap  = useMemo(() => Array.from({ length: 35 }, () => Math.random()), []);
  const sparkline = useMemo(() => Array.from({ length: 18 }, () => 30 + Math.random() * 70), []);

  return (
    <div
      className="absolute flex flex-col gap-2 pointer-events-none"
      style={{ top: 36, right: 10, zIndex: 6, width: 132 }}
    >

      {/* ── Date widget ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(6, 10, 28, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
        }}
      >
        {/* Month header */}
        <div
          className="px-3 py-1.5 flex items-center justify-between"
          style={{ background: "rgba(6,182,212,0.12)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="text-[11px] font-semibold" style={{ color: "#06B6D4", fontFamily: "'Space Grotesk', sans-serif" }}>
            {month}
          </span>
          <span className="text-[11px] font-semibold" style={{ color: "#06B6D4", fontFamily: "'Space Grotesk', sans-serif" }}>
            2025
          </span>
        </div>

        <div className="px-3 py-2.5">
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {WEEK_DAYS.map((d, i) => (
              <span
                key={i}
                className="text-center"
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: i === weekDay ? "#06B6D4" : "rgba(255,255,255,0.25)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {d}
              </span>
            ))}
          </div>
          {/* Date number */}
          <div
            className="text-center"
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "white",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}
          >
            {today}
          </div>
        </div>
      </div>

      {/* ── DSA problem solving stats heatmap ── */}
      <div
        className="rounded-2xl p-3"
        style={{
          background: "rgba(6, 10, 28, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif" }}>
            LeetCode + GFG
          </span>
          <span className="text-[10px] font-semibold" style={{ color: "#10B981", fontFamily: "'JetBrains Mono', monospace" }}>
            +250
          </span>
        </div>
        <div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
          {heatmap.map((v, i) => (
            <div
              key={i}
              className="rounded-[2px]"
              style={{
                height: 10,
                background:
                  v > 0.8 ? "#06B6D4" :
                  v > 0.6 ? "#0891B2" :
                  v > 0.35 ? "#164e63" :
                  v > 0.1 ? "#0c2233" :
                  "rgba(255,255,255,0.04)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Learning Status ── */}
      <div
        className="rounded-2xl p-3"
        style={{
          background: "rgba(6, 10, 28, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(139,92,246,0.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
        }}
      >
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif" }}>
            Learning Status
          </span>
        </div>
        <div className="space-y-2">
          {STATUS_ITEMS.map(s => (
            <div key={s.l}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono', monospace" }}>
                  {s.l}
                </span>
                <span className="text-[9px] font-semibold" style={{ color: s.color, fontFamily: "'JetBrains Mono', monospace" }}>
                  {s.v}%
                </span>
              </div>
              <div className="h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full" style={{ width: `${s.v}%`, background: `linear-gradient(90deg, ${s.color}88, ${s.color})` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Sparkline */}
        <div className="mt-3 pt-2.5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'JetBrains Mono', monospace" }}>
            CPU activity
          </span>
          <svg className="w-full mt-1" height={28}>
            <defs>
              <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {sparkline.map((v, i, arr) => {
              if (i === 0) return null;
              const w = 100 / (arr.length - 1);
              const x1 = (i - 1) * w;
              const x2 = i * w;
              const y1 = 28 - (arr[i - 1] / 100) * 24;
              const y2 = 28 - (v / 100) * 24;
              return (
                <line
                  key={i}
                  x1={`${x1}%`} y1={y1}
                  x2={`${x2}%`} y2={y2}
                  stroke="#8B5CF6"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
