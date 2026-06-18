import { X } from "lucide-react";
import type { ReactNode, MouseEvent } from "react";

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  pos: { x: number; y: number };
  onDragStart: (e: MouseEvent<HTMLDivElement>) => void;
  onFocus: () => void;
  z: number;
  w: number;
  h: number;
  children: ReactNode;
  accentColor?: string;
}

export function FloatingWindow({
  title, isOpen, onClose, pos, onDragStart, onFocus, z, w, h, children, accentColor = "#06B6D4",
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute flex flex-col rounded-2xl overflow-hidden"
      style={{
        left: pos.x, top: pos.y, width: w, height: h, zIndex: z,
        background: "rgba(7, 11, 28, 0.88)",
        backdropFilter: "blur(32px) saturate(2.2)",
        WebkitBackdropFilter: "blur(32px) saturate(2.2)",
        boxShadow: `0 0 0 0.5px rgba(255,255,255,0.10), 0 4px 20px rgba(0,0,0,0.55), 0 24px 64px rgba(0,0,0,0.45), 0 0 80px ${accentColor}08, inset 0 1px 0 rgba(255,255,255,0.07)`,
        animation: "windowAppear 0.18s cubic-bezier(0.34,1.1,0.64,1) both",
      }}
      onMouseDown={onFocus}
    >
      {/* Animated border glow on top edge */}
      <div className="absolute top-0 left-4 right-4 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)` }} />

      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 h-10 shrink-0 select-none"
        style={{
          background: "rgba(10, 14, 36, 0.97)",
          borderBottom: "1px solid rgba(255,255,255,0.055)",
          cursor: "grab",
        }}
        onMouseDown={onDragStart}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <button
            onMouseDown={(e) => e.stopPropagation()}
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-115 active:brightness-90 transition-all group relative shrink-0"
          >
            <X className="absolute inset-0 m-auto w-1.5 h-1.5 text-[#6B0000] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shrink-0" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] shrink-0" />
        </div>
        <span
          className="flex-1 text-center text-[11px] font-medium tracking-wide"
          style={{ color: "rgba(255,255,255,0.32)", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {title}
        </span>
        {/* Right spacer matches traffic lights width */}
        <div className="w-12 shrink-0" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto" style={{ scrollbarWidth: "none" }}>
        {children}
      </div>

      <style>{`
        @keyframes windowAppear {
          from { opacity: 0; transform: scale(0.97) translateY(6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0px); }
        }
      `}</style>
    </div>
  );
}
