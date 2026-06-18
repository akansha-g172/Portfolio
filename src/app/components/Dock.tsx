import { useState } from "react";
import type { ComponentType, CSSProperties } from "react";

interface DockItemDef {
  id: string;
  label: string;
  Icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  color: string;
  win: string | null;
  separator?: boolean;
}

interface Props {
  items: DockItemDef[];
  open: Set<string>;
  onOpen: (win: string) => void;
}

export function Dock({ items, open, onOpen }: Props) {
  const [hovIdx, setHovIdx] = useState<number | null>(null);

  const getScale = (i: number) => {
    if (hovIdx === null) return 1;
    const d = Math.abs(i - hovIdx);
    if (d === 0) return 1.65;
    if (d === 1) return 1.32;
    if (d === 2) return 1.12;
    return 1;
  };

  const getOffsetY = (i: number) => {
    if (hovIdx === null) return 0;
    const d = Math.abs(i - hovIdx);
    if (d === 0) return -13;
    if (d === 1) return -6;
    if (d === 2) return -2;
    return 0;
  };

  const BASE = 44;

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ zIndex: 150 }}>
      {/* Main dock bar */}
      <div
        className="flex items-end gap-1 px-2.5 py-1.5 rounded-2xl relative"
        style={{
          background: "rgba(255,255,255,0.055)",
          backdropFilter: "blur(30px) saturate(2.5)",
          WebkitBackdropFilter: "blur(30px) saturate(2.5)",
          border: "1px solid rgba(255,255,255,0.115)",
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {/* Inner top shine */}
        <div
          className="absolute top-0 left-6 right-6 h-px rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
        />

        {items.map(({ id, label, Icon, color, win, separator }, i) => {
          if (separator) {
            return (
              <div
                key={id}
                className="self-stretch mx-1"
                style={{ width: 1, background: "rgba(255,255,255,0.12)", margin: "4px 6px" }}
              />
            );
          }

          const s = getScale(i);
          const ty = getOffsetY(i);
          const isActive = win ? open.has(win) : false;
          const iconSize = Math.round(BASE * s);

          return (
            <div
              key={id}
              className="flex flex-col items-center"
              style={{ width: BASE + 8, minWidth: BASE + 8 }}
            >
              <button
                className="relative flex items-center justify-center rounded-xl"
                style={{
                  width: iconSize,
                  height: iconSize,
                  transform: `translateY(${ty}px)`,
                  transition: "width 0.12s cubic-bezier(0.34,1.56,0.64,1), height 0.12s cubic-bezier(0.34,1.56,0.64,1), transform 0.12s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.12s ease",
                  background: `linear-gradient(145deg, ${color}28, ${color}12)`,
                  border: `1px solid ${color}30`,
                  boxShadow:
                    hovIdx === i
                      ? `0 0 0 1px ${color}40, 0 0 20px ${color}30, 0 8px 20px rgba(0,0,0,0.35)`
                      : "0 2px 6px rgba(0,0,0,0.25)",
                }}
                onMouseEnter={() => setHovIdx(i)}
                onMouseLeave={() => setHovIdx(null)}
                onClick={() => win && onOpen(win)}
              >
                <Icon
                  className="transition-all"
                  style={{
                    color,
                    width: Math.round((iconSize * 0.52)),
                    height: Math.round((iconSize * 0.52)),
                  }}
                />

                {/* Tooltip */}
                {hovIdx === i && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[11px] font-medium text-white whitespace-nowrap pointer-events-none"
                    style={{
                      bottom: "calc(100% + 10px)",
                      background: "rgba(6, 10, 28, 0.95)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {label}
                    {/* Arrow */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-full"
                      style={{
                        width: 0, height: 0,
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: "5px solid rgba(6,10,28,0.95)",
                      }}
                    />
                  </div>
                )}
              </button>

              {/* Running indicator */}
              {isActive && (
                <div
                  className="rounded-full mt-0.5 shrink-0"
                  style={{ width: 4, height: 4, background: color, opacity: 0.8, boxShadow: `0 0 6px ${color}` }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Reflection */}
      <div
        className="relative overflow-hidden"
        style={{ width: "calc(100% - 2px)", height: 28, marginTop: 1 }}
      >
        <div
          className="flex items-start gap-1 px-2.5 pt-0 rounded-b-xl"
          style={{
            transform: "scaleY(-1)",
            background: "rgba(255,255,255,0.02)",
            paddingTop: 6,
            paddingBottom: 0,
            filter: "blur(0.5px)",
          }}
        >
          {items.map(({ id, Icon, color, separator }) => {
            if (separator) return <div key={id} className="w-3 shrink-0" />;
            return (
              <div
                key={id}
                className="flex items-center justify-center rounded-xl shrink-0"
                style={{
                  width: BASE, height: BASE,
                  background: `${color}10`,
                }}
              >
                <Icon style={{ color, width: 24, height: 24, opacity: 0.5 }} />
              </div>
            );
          })}
        </div>
        {/* Fade overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(2,6,23,0.25) 0%, rgba(2,6,23,0.98) 100%)" }}
        />
      </div>
    </div>
  );
}
