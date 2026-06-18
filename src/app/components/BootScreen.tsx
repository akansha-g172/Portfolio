import { useEffect, useState } from "react";

const BOOT_MESSAGES = [
  { text: "Initializing AkanshaOS...", progress: 14 },
  { text: "Loading modules...", progress: 38 },
  { text: "Starting AI systems...", progress: 62 },
  { text: "Preparing workspace...", progress: 86 },
  { text: "System Ready.", progress: 100 },
];

interface Props {
  onComplete: () => void;
  active: boolean;
}

export function BootScreen({ active, onComplete }: Props) {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!active) return;

    let isMounted = true;
    let lineIndex = 0;
    let charIndex = 0;
    const timers: number[] = [];

    const schedule = (fn: () => void, delay: number) => {
      const id = window.setTimeout(fn, delay);
      timers.push(id);
      return id;
    };

    const typeNextChar = () => {
      if (!isMounted) return;
      const currentLine = BOOT_MESSAGES[lineIndex].text;
      if (charIndex < currentLine.length) {
        setCurrentText(currentLine.slice(0, charIndex + 1));
        charIndex += 1;
        schedule(typeNextChar, 40);
        return;
      }

      setTypedLines((prev) => [...prev, currentLine]);
      setProgress(BOOT_MESSAGES[lineIndex].progress);
      lineIndex += 1;
      charIndex = 0;
      setCurrentText("");

      if (lineIndex >= BOOT_MESSAGES.length) {
        schedule(() => {
          if (!isMounted) return;
          setExiting(true);
          schedule(() => {
            if (!isMounted) return;
            onComplete();
          }, 600);
        }, 600);
        return;
      }

      schedule(typeNextChar, 420);
    };

    typeNextChar();

    return () => {
      isMounted = false;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div
      className={`fixed inset-0 z-[1200] flex items-center justify-center bg-[#020617] transition-opacity duration-700 ${exiting ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="w-full max-w-3xl p-6 mx-4 rounded-3xl border border-white/10 bg-black/90 shadow-2xl backdrop-blur-xl">
        <div className="font-mono text-sm leading-6 text-white"> 
          <div className="mb-4 text-xs uppercase tracking-[0.35em] text-cyan-300/80">Boot Sequence</div>
          {typedLines.map((line, index) => (
            <div key={index} className="flex gap-2">
              <span className="text-cyan-300">&gt;</span>
              <span>{line}</span>
            </div>
          ))}
          <div className="flex gap-2">
            <span className="text-cyan-300">&gt;</span>
            <span>{currentText}</span>
            <span className="inline-block h-4 w-0.5 bg-white animate-pulse" />
          </div>
        </div>

        <div className="mt-6">
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-cyan-400 transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-white/60">
            <span>Loading...</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
