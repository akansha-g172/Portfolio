import { Star, GitBranch, Network, Brain, Github, ExternalLink, MapPin, Zap } from "lucide-react";

const STATS = [
  { label: "Experience",  val: "1+ Years",    Icon: Star,     color: "#F59E0B" },
  { label: "Projects",    val: "10+ Built",   Icon: GitBranch,color: "#3B82F6" },
  { label: "AI Models",   val: "2 Integrated",Icon: Brain,    color: "#EC4899" },
];

const TECHS = [
  { name: "Node.js",     color: "#68A063" },
  { name: "Python",      color: "#3572A5" },
  { name: "Tailwind CSS",    color: "#AA6746" },
  { name: "React",       color: "#61DAFB" },
  { name: "Next.js",     color: "#E2E8F0" },
  { name: "FastAPI",     color: "#009688" },
  { name: "MongoDB",     color: "#F16822" },
  { name: "TensorFlow",   color: "#1C3C3C" },
  { name: "Docker",      color: "#2496ED" },
  { name: "Git-Github",         color: "#FF9900" },
  { name: "TypeScript",  color: "#3178C6" },
  { name: "PostgreSQL",  color: "#336791" },
];

const TIMELINE = [
  { year: "May, 2026-present", role: "Full Stack Developer", org: "Hero MotoCorp", color: "#06B6D4" },
];

export function AboutContent() {
  return (
    <div className="p-5 space-y-4 overflow-auto h-full" style={{ fontFamily: "'Inter', sans-serif", scrollbarWidth: "none" }}>

      {/* Profile header */}
      <div className="flex items-start gap-5">
        <div className="relative shrink-0">
          <div
            className="w-[88px] h-[88px] rounded-[20px] overflow-hidden"
            style={{
              boxShadow: "0 0 0 2px rgba(6,182,212,0.35), 0 0 30px rgba(6,182,212,0.15)",
            }}
          >
            <img
              src="https://lh3.googleusercontent.com/d/1494ZghnNnPNUgB9r681wNIXMb0CsLSBT"
              alt="Akansha Gupta"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full border-[2.5px] border-[#07080f] flex items-center justify-center"
            style={{ background: "#10B981" }}
          >
            <Zap className="w-2.5 h-2.5 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h2
            className="text-[22px] font-bold text-white mb-1 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.3px" }}
          >
            Akansha Gupta
          </h2>
          <div className="flex flex-col gap-0.5 mb-3">
            {[
              { label: "Full Stack Developer",  color: "#06B6D4" },
              { label: "AI Enthusiast",      color: "#EC4899" },
            ].map(({ label, color }) => (
              <span key={label} className="text-[13px] font-medium" style={{ color }}>
                {label}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mb-3">
            <MapPin className="w-3 h-3" style={{ color: "rgba(255,255,255,0.35)" }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>India · Open to work</span>
          </div>
          <div className="flex gap-2">
            {[
              { label: "GitHub",    val: "github.com/akansha-g172", Icon: Github,        color: "#06B6D4" },
              { label: "Codolio", val: "codolio.com/profile/AkanshaGupta/card",             Icon: ExternalLink,  color: "#8B5CF6" },
            ].map(({ label, val, Icon, color }) => (
              <button
                key={label}
                onClick={() => {
                  window.open(
                    "https://" + val.replace(/^https?:\/\//, ""),
                    "_blank"
                  )
                }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-white/70 hover:text-white transition-colors"
                style={{ background: `${color}14`, border: `1px solid ${color}28` }}
              >
                <Icon className="w-3 h-3" style={{ color }} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {STATS.map(({ label, val, Icon, color }) => (
          <div
            key={label}
            className="rounded-xl p-3 text-center"
            style={{
              background: `linear-gradient(145deg, ${color}0e, ${color}06)`,
              border: `1px solid ${color}22`,
            }}
          >
            <Icon className="w-4 h-4 mx-auto mb-1.5" style={{ color }} />
            <div className="text-sm font-bold text-white leading-tight">{val}</div>
            <div className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div
        className="rounded-xl p-4"
        style={{ background: "rgba(255,255,255,0.028)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-2.5" style={{ color: "rgba(255,255,255,0.28)" }}>
          About
        </h3>
        <p className="text-[13px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.62)" }}>
          Passionate full stack developer at the intersection of blockchain and AI. I build scalable APIs,
          deploy smart contracts on multiple chains, and integrate large language models into production
          systems. Currently exploring AI-ML.
        </p>
      </div>

      {/* Timeline */}
      <div
        className="rounded-xl p-4"
        style={{ background: "rgba(255,255,255,0.028)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.28)" }}>
          Experience
        </h3>
        <div className="space-y-3">
          {TIMELINE.map(({ year, role, org, color }) => (
            <div key={year} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white/85">{role}</div>
                <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>{org}</div>
              </div>
              <span className="text-[11px] font-medium shrink-0" style={{ color, fontFamily: "'JetBrains Mono', monospace" }}>{year}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div
        className="rounded-xl p-4"
        style={{ background: "rgba(255,255,255,0.028)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.28)" }}>
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {TECHS.map(({ name, color }) => (
            <span
              key={name}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium"
              style={{
                background: `${color}12`,
                border: `1px solid ${color}30`,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
