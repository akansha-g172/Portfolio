import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type MouseEvent,
  type ReactNode,
} from "react";
import { MobileApp } from "./components/MobileApp";
import {
  Folder,
  Terminal as TermIcon,
  Code2,
  Search,
  Wifi,
  Battery,
  Globe,
  Trash2,
  FileText,
  User,
  Bot,
  Layers,
  Mail,
  BookOpen,
} from "lucide-react";

import { FloatingWindow } from "./components/FloatingWindow";
import { Dock } from "./components/Dock";
import { SystemWidgets } from "./components/SystemWidgets";
import { BootScreen } from "./components/BootScreen";
import { AboutContent } from "./components/AboutContent";
import { TerminalContent } from "./components/TerminalContent";
import { AIContent } from "./components/AIContent";
import { ProjectsContent } from "./components/ProjectsContent";
import { SkillsContent } from "./components/SkillsContent";
import { ContactContent } from "./components/ContactContent";

/* ─── Window sizes (no hardcoded x/y — computed at runtime) ─────────────── */
const WIN_SIZE: Record<
  string,
  { w: number; h: number; accent: string }
> = {
  about: { w: 740, h: 520, accent: "#06B6D4" },
  terminal: { w: 560, h: 400, accent: "#10B981" },
  ai: { w: 420, h: 540, accent: "#8B5CF6" },
  projects: { w: 700, h: 500, accent: "#3B82F6" },
  skills: { w: 620, h: 460, accent: "#8B5CF6" },
  contact: { w: 540, h: 490, accent: "#EC4899" },
  resume: { w: 440, h: 340, accent: "#F59E0B" },
};

const WIN_TITLES: Record<string, string> = {
  about: "About Me — Akansha Gupta",
  terminal: "akansha@AkanshaOS — Terminal",
  ai: "AI Assistant — AkanshaOS",
  projects: "Projects — Portfolio",
  skills: "Skills & Stack",
  contact: "Contact — Akansha Gupta",
  resume: "Akansha Gupta's Resume",
};

/* Return a good default position for a window given current viewport */
function defaultPos(id: string, vw: number, vh: number) {
  const { w, h } = WIN_SIZE[id] ?? { w: 600, h: 450 };
  const usableW = vw - 100; // leave room for desktop icons
  const usableH = vh - 100; // leave room for menu bar + dock
  return {
    x: Math.max(95, Math.round((usableW - w) / 2) + 50),
    y: Math.max(36, Math.round((usableH - h) / 2) + 36),
  };
}

const DESKTOP_ICONS = [
  {
    id: "about",
    label: "About Me",
    Icon: User,
    glow: "#06B6D4",
  },
  {
    id: "projects",
    label: "Projects",
    Icon: Folder,
    glow: "#3B82F6",
  },
  {
    id: "skills",
    label: "Skills",
    Icon: Layers,
    glow: "#8B5CF6",
  },
  {
    id: "ai",
    label: "AI Assistant",
    Icon: Bot,
    glow: "#EC4899",
  },
  {
    id: "resume",
    label: "Resume",
    Icon: FileText,
    glow: "#F59E0B",
  },
  {
    id: "terminal",
    label: "Terminal",
    Icon: TermIcon,
    glow: "#10B981",
  },
  {
    id: "contact",
    label: "Contact",
    Icon: Mail,
    glow: "#EC4899",
  },
];

const DOCK_ITEMS = [
  {
    id: "finder",
    label: "Finder",
    Icon: Folder,
    color: "#3B82F6",
    win: "projects",
  },
  {
    id: "terminal",
    label: "Terminal",
    Icon: TermIcon,
    color: "#10B981",
    win: "terminal",
  },
  {
    id: "vscode",
    label: "VS Code",
    Icon: Code2,
    color: "#58A6FF",
    win: "skills",
  },
  {
    id: "chatgpt",
    label: "AI Assist",
    Icon: Bot,
    color: "#10A37F",
    win: "ai",
  },
  {
    id: "notion",
    label: "Notion",
    Icon: BookOpen,
    color: "#E2E8F0",
    win: "about",
  },
  {
    id: "browser",
    label: "Browser",
    Icon: Globe,
    color: "#4A90D9",
    win: "projects",
  },
  {
    id: "trash",
    label: "Trash",
    Icon: Trash2,
    color: "#6B7280",
    win: null,
  },
];

const MENU_ITEMS = [
  "AkanshaOS",
  "File",
  "Edit",
  "View",
  "Window",
  "Terminal",
  "Help",
];

/* ─── Main App ───────────────────────────────────────────────────────────── */
export default function App() {
  /* Responsive: render mobile layout on narrow screens */
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  if (isMobile) return <MobileApp />;

  /* Only About Me opens on boot — clean hero experience */
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [pos, setPos] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [zOrders, setZOrders] = useState<
    Record<string, number>
  >({});
  const [, setZCtr] = useState(100);
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [cascade, setCascade] = useState(0); // offset counter for new windows
  const [bootComplete, setBootComplete] = useState(false);
  const dragRef = useRef<{
    id: string;
    mx0: number;
    my0: number;
    wx0: number;
    wy0: number;
  } | null>(null);

  /* On mount: center About Me in the actual viewport */
  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const initial: Record<string, { x: number; y: number }> =
      {};
    for (const id of Object.keys(WIN_SIZE)) {
      initial[id] = defaultPos(id, vw, vh);
    }
    setPos(initial);
  }, []);

  /* Clock */
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* Document-level drag tracking */
  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      if (!dragRef.current) return;
      const { id, mx0, my0, wx0, wy0 } = dragRef.current;
      setPos((p) => ({
        ...p,
        [id]: {
          x: wx0 + e.clientX - mx0,
          y: Math.max(28, wy0 + e.clientY - my0),
        },
      }));
    };
    const onUp = () => {
      dragRef.current = null;
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  const bringToFront = useCallback((id: string) => {
    setZCtr((z) => {
      const nz = z + 1;
      setZOrders((zo) => ({ ...zo, [id]: nz }));
      return nz;
    });
  }, []);

  const openWin = (id: string) => {
    if (!bootComplete) return;
    setOpen((s) => {
      if (s.has(id)) {
        // Window already open — just bring to front
        bringToFront(id);
        return s;
      }
      /* Cascade new windows offset from viewport center */
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const base = defaultPos(id, vw, vh);
      const offset = (cascade % 5) * 24;
      setPos((p) => ({
        ...p,
        [id]: { x: base.x + offset, y: base.y + offset },
      }));
      setCascade((c) => c + 1);
      return new Set([...s, id]);
    });
    bringToFront(id);
  };

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
    setOpen(new Set(["about"]));
  }, []);

  const closeWin = (id: string) => {
    setOpen((s) => {
      const n = new Set(s);
      n.delete(id);
      return n;
    });
  };

  const startDrag = (
    id: string,
    e: MouseEvent<HTMLDivElement>,
  ) => {
    const p = pos[id];
    if (!p) return;
    dragRef.current = {
      id,
      mx0: e.clientX,
      my0: e.clientY,
      wx0: p.x,
      wy0: p.y,
    };
    bringToFront(id);
  };

  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  /* ── Window content ─────────────────────────────────────────────────────── */
  const WIN_CONTENT: Record<string, ReactNode> = {
    about: <AboutContent />,
    terminal: <TerminalContent />,
    ai: <AIContent />,
    projects: <ProjectsContent />,
    skills: <SkillsContent />,
    contact: <ContactContent />,
    resume: (
      <div
        className="flex flex-col items-center justify-center h-full gap-5 p-6"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg,rgba(245,158,11,0.2),rgba(239,68,68,0.14))",
            border: "1px solid rgba(245,158,11,0.3)",
            boxShadow: "0 0 32px rgba(245,158,11,0.1)",
          }}
        >
          <FileText
            className="w-9 h-9"
            style={{ color: "#F59E0B" }}
          />
        </div>
        <div className="text-center">
          <h3
            className="text-lg font-bold text-white mb-1"
            style={{ fontFamily: "'Space Grotesk',sans-serif" }}
          >
            Akansha Gupta
          </h3>
          <p
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Full Stack Developer · AI
          </p>
          <p
            className="text-xs mt-1"
            style={{
              color: "rgba(255,255,255,0.26)",
              fontFamily: "'JetBrains Mono',monospace",
            }}
          >
            Resume · 148 KB
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1t_os15LiX3rpOi7uqUxzXvTI24lUMC-J/view?usp=sharing",
                  "_blank"
                )
              }
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:brightness-110 transition-all"
              style={{
                background:
                  "linear-gradient(135deg,#F59E0B,#EF4444)",
              }}
          >
            Download PDF
          </button>
          <button
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/1t_os15LiX3rpOi7uqUxzXvTI24lUMC-J/preview",
                "_blank"
              )
            }
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium hover:text-white transition-colors"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            Preview
          </button>
        </div>
      </div>
    ),
  };

  return (
    <div
      className="w-full h-full relative overflow-hidden select-none"
      onClick={() => setMenuOpen(null)}
      style={{
        fontFamily: "'Inter',sans-serif",
        background: "#020617",
      }}
    >
      {/* ══ Wallpaper ══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1544894079-e81a9eb1da8b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="AkanshaOS wallpaper"
          className="w-full h-full object-cover"
        />
        {/* Multi-layer overlay for depth */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(2,6,23,0.52)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(2,6,23,0.72) 0%, transparent 22%, transparent 70%, rgba(2,6,23,0.85) 100%)",
          }}
        />
        {/* Purple ambient left */}
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: "-10%",
            left: "-5%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* Cyan ambient right-bottom */}
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            bottom: "-15%",
            right: "-5%",
            background:
              "radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ══ Menu Bar ═══════════════════════════════════════════════════════ */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center px-3"
        style={{
          zIndex: 500,
          height: 28,
          background: "rgba(5,8,22,0.92)",
          backdropFilter: "blur(24px) saturate(2)",
          WebkitBackdropFilter: "blur(24px) saturate(2)",
          borderBottom: "1px solid rgba(255,255,255,0.055)",
          gap: 2,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* OS logo */}
        <div
          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
          style={{
            background:
              "linear-gradient(135deg,#06B6D4,#8B5CF6)",
            marginRight: 6,
          }}
        >
          <div className="w-2 h-2 rounded-full bg-white opacity-90" />
        </div>

        {MENU_ITEMS.map((m) => (
          <button
            key={m}
            className="px-2 py-0.5 rounded text-[12px] transition-colors shrink-0"
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: m === "AkanshaOS" ? 600 : 450,
              color:
                menuOpen === m
                  ? "#06B6D4"
                  : m === "AkanshaOS"
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.68)",
              background:
                menuOpen === m
                  ? "rgba(6,182,212,0.1)"
                  : "transparent",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(menuOpen === m ? null : m);
            }}
          >
            {m}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2.5">
          <Wifi
            className="w-3.5 h-3.5 shrink-0"
            style={{ color: "rgba(255,255,255,0.62)" }}
          />
          <Battery
            className="w-4   h-4   shrink-0"
            style={{ color: "rgba(255,255,255,0.62)" }}
          />
          <Search
            className="w-3.5 h-3.5 shrink-0"
            style={{ color: "rgba(255,255,255,0.62)" }}
          />
          <div
            style={{
              width: 1,
              height: 13,
              background: "rgba(255,255,255,0.12)",
            }}
          />
          <span
            className="text-[11px] font-medium shrink-0"
            style={{
              color: "rgba(255,255,255,0.68)",
              fontFamily: "'Space Grotesk',sans-serif",
            }}
          >
            {dateStr}
          </span>
          <span
            className="text-[11px] font-semibold text-white shrink-0"
            style={{ fontFamily: "'Space Grotesk',sans-serif" }}
          >
            {timeStr}
          </span>
        </div>
      </div>

      {/* ══ Desktop Icons (left column) ════════════════════════════════════ */}
      <div
        className="absolute flex flex-col"
        style={{ top: 36, left: 8, zIndex: 10, gap: 2 }}
      >
        {DESKTOP_ICONS.map(({ id, label, Icon, glow }) => (
          <button
            key={id}
            onClick={() => openWin(id)}
            className="flex flex-col items-center p-1.5 rounded-xl w-[68px] group transition-all hover:bg-white/[0.07] active:scale-95"
            style={{ gap: 4 }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
              style={{
                background: `linear-gradient(145deg,${glow}20,${glow}0c)`,
                border: `1px solid ${glow}28`,
                boxShadow: `0 0 14px ${glow}12`,
              }}
            >
              <Icon
                className="w-5 h-5"
                style={{ color: glow }}
              />
            </div>
            <span
              className="text-[9.5px] font-medium text-center leading-tight text-white/68 group-hover:text-white/90 transition-colors"
              style={{
                fontFamily: "'Inter',sans-serif",
                textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                lineHeight: 1.25,
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* ══ System Widgets (top-right) ══════════════════════════════════════ */}
      <SystemWidgets time={time} />

      {/* ══ Floating Windows ════════════════════════════════════════════════ */}
      {Object.entries(WIN_CONTENT).map(([id, content]) => {
        const cfg = WIN_SIZE[id];
        if (!cfg) return null;
        const p = pos[id];
        if (!p)
          return null; /* wait for mount position computation */
        return (
          <FloatingWindow
            key={id}
            title={WIN_TITLES[id] ?? id}
            isOpen={open.has(id)}
            onClose={() => closeWin(id)}
            pos={p}
            onDragStart={(e) => startDrag(id, e)}
            onFocus={() => bringToFront(id)}
            z={zOrders[id] ?? 50}
            w={cfg.w}
            h={cfg.h}
            accentColor={cfg.accent}
          >
            {content}
          </FloatingWindow>
        );
      })}

      {/* ══ Dock ════════════════════════════════════════════════════════════ */}
      <Dock items={DOCK_ITEMS} open={open} onOpen={openWin} />
      <BootScreen active={!bootComplete} onComplete={handleBootComplete} />
    </div>
  );
}