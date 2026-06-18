import { Star, Github, ExternalLink, Users, Activity, TrendingUp } from "lucide-react";

const FEATURED = {
  name: "MindBloom",
  desc: "MindBloom is an AI-powered mental wellness platform that helps users track moods, manage medications, and access personalized emotional support through an intelligent chatbot.",
  techs: ["React JS", "TailwindCSS", "FastAPI", "PostgreSQL", "OpenAI API", "Docker"],
  link: "https://github.com/akansha-g172/MindBloom",
  gradient: "linear-gradient(135deg, rgba(6,182,212,0.18) 0%, rgba(139,92,246,0.12) 60%, rgba(59,130,246,0.08) 100%)",
  border: "rgba(6,182,212,0.25)",
  accentColor: "#06B6D4",
  metrics: [
    { label: "Building...",      val: "56%",  Icon: Activity,   color: "#8B5CF6" },
  ],
};

const PROJECTS = [
  {
    name: "GharPayy CRM",
    desc: "A centralized CRM platform for managing leads, tracking pipeline stages, and scheduling property visits.",
    techs: ["Python", "FastAPI", "PostgreSQL"],
    link: "https://gharpayy-crm-jw9j.onrender.com/",
    color: "#10B981",
    gradient: "from-[#10B981]/10 to-[#06B6D4]/5",
  },
//   {
//     name: "AI Code Reviewer",
//     desc: "Automated PR review bot using Claude API to detect bugs, suggest improvements, and enforce coding standards.",
//     techs: ["Python", "FastAPI", "Claude", "GitHub API"],
//     color: "#8B5CF6",
//     gradient: "from-[#8B5CF6]/10 to-[#EC4899]/5",
//   },
  {
    name: "DisasterShield",
    desc: "AI-enabled flood risk prediction and emergency alert platform for disaster response. As a backend developer, I contributed to building the API and integrating AI models for accurate flood predictions.",
    techs: ["Python", "Flask", "OpenWeather API", "PostgreSQL"],
    link: "https://github.com/swarno-tech/DisasterShield",
    color: "#8B5CF6",
    gradient: "from-[#8B5CF6]/10 to-[#EC4899]/5",
  },
  {
    name: "Axis IDE",
    desc: "Academic Project: An Alternative IDE for Scilab with syntax highlighting, code completion, and debugging features.",
    techs: ["Java"],
    link: "https://github.com/akansha-g172/axis_ide",
    color: "#F59E0B",
    gradient: "from-[#F59E0B]/10 to-[#EF4444]/5",
  },
];

export function ProjectsContent() {
  return (
    <div className="p-5 space-y-4 overflow-auto h-full" style={{ fontFamily: "'Inter', sans-serif", scrollbarWidth: "none" }}>

      {/* ── Featured project ── */}
      <div
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{
          background: FEATURED.gradient,
          border: `1px solid ${FEATURED.border}`,
          boxShadow: `0 0 40px rgba(6,182,212,0.05)`,
        }}
      >
        {/* Glow orb */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.12), transparent 70%)" }}
        />

        <div className="flex items-start justify-between mb-3">
          <div>
            <span
              className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 inline-block"
              style={{ background: "rgba(6,182,212,0.15)", color: "#06B6D4", border: "1px solid rgba(6,182,212,0.3)" }}
            >
              Featured
            </span>
            <h3
              className="text-[17px] font-bold text-white mt-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.3px" }}
            >
              {FEATURED.name}
            </h3>
          </div>
        </div>

        <p className="text-[12.5px] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
          {FEATURED.desc}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {FEATURED.metrics.map(({ label, val, Icon, color }) => (
            <div
              key={label}
              className="rounded-xl p-2.5 text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <Icon className="w-3.5 h-3.5 mx-auto mb-1" style={{ color }} />
              <div className="text-sm font-bold text-white">{val}</div>
              <div className="text-[9px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {FEATURED.techs.map(t => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium"
              style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.22)", color: "#a5f3fc" }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2.5">
          <a
            href={FEATURED.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white/70 hover:text-white transition-colors"
            style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            }}
        >
            <Github className="w-3 h-3" />
            GitHub
        </a>
        </div>
      </div>

      {/* ── Other projects ── */}
      <div className="grid grid-cols-1 gap-3">
        {PROJECTS.map(p => (
          <div
            key={p.name}
            className={`rounded-xl p-4 bg-gradient-to-r ${p.gradient}`}
            style={{ border: `1px solid ${p.color}20` }}
          >
            {/* <div className="flex items-start justify-between mb-2">
              <h3 className="text-[13px] font-semibold text-white">{p.name}</h3>
              <div className="flex items-center gap-1 text-[11px]" style={{ color: "rgba(255,255,255,0.38)" }}>
                <Star className="w-3 h-3" style={{ color: "#F59E0B" }} />
                {p.stars}
              </div>
            </div> */}
            <p className="text-[11.5px] leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.52)" }}>
              {p.desc}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                {p.techs.map(t => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-medium"
                    style={{ background: `${p.color}15`, border: `1px solid ${p.color}28`, color: p.color }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 shrink-0">
                <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-cyan-400 hover:text-cyan-300 break-all"
                    >
                    {p.link}
                    <ExternalLink className="w-3 h-3" />
                        Link
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
