import { useState, useEffect, type ReactNode } from "react";
import {
  User, Folder, Bot, Terminal as TermIcon, LayoutGrid,
  Layers, Mail, FileText, Wifi, Battery,
  ChevronLeft, ChevronRight,
} from "lucide-react";

import { AboutContent }      from "./AboutContent";
import { TerminalContent }   from "./TerminalContent";
import { AIContent }         from "./AIContent";
import { ProjectsContent }   from "./ProjectsContent";
import { SkillsContent }     from "./SkillsContent";
import { ContactContent }    from "./ContactContent";

/* ─── Tab / section definitions ──────────────────────────────────────────── */
const MAIN_TABS = [
  { id: "about",    label: "About",    Icon: User,      color: "#06B6D4" },
  { id: "projects", label: "Projects", Icon: Folder,    color: "#3B82F6" },
  { id: "ai",       label: "AI",       Icon: Bot,       color: "#8B5CF6" },
  { id: "terminal", label: "Terminal", Icon: TermIcon,   color: "#10B981" },
  { id: "more",     label: "More",     Icon: LayoutGrid, color: "#F59E0B" },
];

const MORE_ITEMS = [
  { id: "skills",     label: "Skills",      Icon: Layers,   color: "#8B5CF6" },
  { id: "contact",    label: "Contact",     Icon: Mail,     color: "#EC4899" },
  { id: "resume",     label: "Resume",      Icon: FileText, color: "#F59E0B" },
];

function getContent(id: string): ReactNode {
  switch (id) {
    case "about":      return <AboutContent />;
    case "projects":   return <ProjectsContent />;
    case "ai":         return <AIContent />;
    case "terminal":   return <TerminalContent />;
    case "skills":     return <SkillsContent />;
    case "contact":    return <ContactContent />;
    case "resume":
      return (
        <div className="flex flex-col items-center justify-center h-full gap-5 p-6"
          style={{ fontFamily: "'Inter', sans-serif" }}>
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,rgba(245,158,11,0.2),rgba(239,68,68,0.14))", border: "1px solid rgba(245,158,11,0.3)" }}>
            <FileText className="w-9 h-9" style={{ color: "#F59E0B" }} />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Akansha Gupta
            </h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Backend Developer · Blockchain · AI
            </p>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'JetBrains Mono',monospace" }}>
              resume-akansha-gupta-2025.pdf · 148 KB
            </p>
          </div>
          <button className="px-6 py-3 rounded-xl text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#F59E0B,#EF4444)" }}>
            Download PDF
          </button>
        </div>
      );
    default: return null;
  }
}

/* ─── MobileApp ──────────────────────────────────────────────────────────── */
export function MobileApp() {
  const [activeTab,  setActiveTab]  = useState("about");
  const [subSection, setSubSection] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: false,
  });

  const isShowingMore = activeTab === "more";
  const contentId     = subSection ?? (isShowingMore ? null : activeTab);

  const subSectionLabel =
    subSection ? (MORE_ITEMS.find(i => i.id === subSection)?.label ?? subSection) : null;

  const tabColor = MAIN_TABS.find(t => t.id === activeTab)?.color ?? "#06B6D4";

  const goToTab = (id: string) => {
    setActiveTab(id);
    setSubSection(null);
  };

  return (
    <div
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ background: "#020617", fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Wallpaper ──────────────────────────────────────────────────── */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1565021369192-33ec8e3899da?w=800&h=1600&fit=crop&auto=format&q=80"
          alt="wallpaper"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(2,6,23,0.78)" }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.4) 35%, rgba(2,6,23,0.4) 65%, rgba(2,6,23,0.92) 100%)",
        }} />
        {/* Ambient glow */}
        <div className="absolute rounded-full pointer-events-none" style={{
          width: 400, height: 400, top: "-10%", left: "-15%",
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }} />
        <div className="absolute rounded-full pointer-events-none" style={{
          width: 450, height: 450, bottom: "-10%", right: "-15%",
          background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
        }} />
      </div>

      {/* ── Status bar ─────────────────────────────────────────────────── */}
      <div
        className="relative flex items-center justify-between shrink-0"
        style={{
          zIndex: 100, height: 50,
          background: "rgba(4,7,20,0.94)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          paddingLeft: 20, paddingRight: 20,
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg,#06B6D4,#8B5CF6)" }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-white opacity-90" />
          </div>
          <span
            className="text-[15px] font-semibold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            AkanshaOS
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Wifi    className="w-4 h-4" style={{ color: "rgba(255,255,255,0.6)" }} />
          <Battery className="w-4 h-4" style={{ color: "rgba(255,255,255,0.6)" }} />
          <span
            className="text-[14px] font-semibold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {timeStr}
          </span>
        </div>
      </div>

      {/* ── Section breadcrumb (when drilling into More → sub-section) ── */}
      {subSection && (
        <div
          className="relative flex items-center gap-3 shrink-0"
          style={{
            zIndex: 100, height: 44,
            background: "rgba(4,7,20,0.8)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            paddingLeft: 16, paddingRight: 16,
          }}
        >
          <button
            onClick={() => setSubSection(null)}
            className="flex items-center gap-1 text-sm font-medium active:opacity-60 transition-opacity"
            style={{ color: "#06B6D4" }}
          >
            <ChevronLeft className="w-4 h-4" />
            More
          </button>
          <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.15)" }} />
          <span className="text-[14px] font-semibold text-white">{subSectionLabel}</span>
        </div>
      )}

      {/* ── Section title bar (for main tabs, not More) ──────────────── */}
      {!isShowingMore && !subSection && (
        <div
          className="relative flex items-center shrink-0"
          style={{
            zIndex: 100, height: 44,
            background: "rgba(4,7,20,0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            paddingLeft: 20,
          }}
        >
          <span
            className="text-[15px] font-semibold"
            style={{ color: tabColor, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {MAIN_TABS.find(t => t.id === activeTab)?.label}
          </span>
          <div
            className="ml-2 w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: tabColor }}
          />
        </div>
      )}

      {/* ── Main content ──────────────────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden" style={{ zIndex: 1 }}>

        {/* "More" grid */}
        {isShowingMore && !subSection && (
          <div
            className="h-full overflow-auto"
            style={{ padding: "20px 16px 8px", scrollbarWidth: "none" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif" }}>
              All Sections
            </p>
            <div className="grid grid-cols-2 gap-3">
              {MORE_ITEMS.map(({ id, label, Icon, color }) => (
                <button
                  key={id}
                  onClick={() => setSubSection(id)}
                  className="flex flex-col items-center gap-3 rounded-2xl p-5 transition-all active:scale-95 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(145deg,${color}18,${color}08)`,
                    border: `1px solid ${color}28`,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: `${color}1e`, border: `1px solid ${color}32` }}
                  >
                    <Icon className="w-7 h-7" style={{ color }} />
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[13px] font-medium text-white/80">{label}</span>
                    <ChevronRight className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content panel */}
        {contentId && (
          <div
            key={contentId}
            className="h-full"
            style={{
              background: "rgba(6,10,26,0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              animation: "mobileSlideIn 0.22s cubic-bezier(0.25,0.46,0.45,0.94) both",
            }}
          >
            {getContent(contentId)}
          </div>
        )}
      </div>

      {/* ── Bottom tab bar ────────────────────────────────────────────── */}
      <div
        className="relative shrink-0"
        style={{ zIndex: 100 }}
      >
        {/* Top separator with glow */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />

        <div
          className="flex items-stretch"
          style={{
            background: "rgba(4,7,20,0.94)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            paddingBottom: "env(safe-area-inset-bottom, 8px)",
          }}
        >
          {MAIN_TABS.map(({ id, label, Icon, color }) => {
            const isActive = activeTab === id && !subSection;
            return (
              <button
                key={id}
                onClick={() => goToTab(id)}
                className="flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-all active:scale-90"
              >
                <div
                  className="w-11 h-9 rounded-xl flex items-center justify-center transition-all"
                  style={{
                    background: isActive ? `${color}20` : "transparent",
                    boxShadow: isActive ? `0 0 14px ${color}25` : "none",
                  }}
                >
                  <Icon
                    className="w-[22px] h-[22px] transition-colors"
                    style={{ color: isActive ? color : "rgba(255,255,255,0.36)" }}
                  />
                </div>
                <span
                  className="text-[10px] font-medium transition-colors"
                  style={{
                    color: isActive ? color : "rgba(255,255,255,0.33)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes mobileSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
    </div>
  );
}
