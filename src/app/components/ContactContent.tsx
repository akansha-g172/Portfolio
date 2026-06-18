import { useState } from "react";
import { Github, Mail, Linkedin, Send, CheckCircle, MapPin, Clock } from "lucide-react";
import emailjs from "@emailjs/browser";

const LINKS = [
  { label: "Email",    val: "akansha6500@gmail.com",          Icon: Mail,     color: "#06B6D4", href: "mailto:akansha6500@gmail.com" },
  { label: "GitHub",   val: "github.com/akansha-g172",      Icon: Github,   color: "#E2E8F0", href: "#" },
  { label: "LinkedIn", val: "linkedin.com/in/akansha-gupta-b16972324", Icon: Linkedin, color: "#0A66C2", href: "#" },
];

export function ContactContent() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSending(true);

    // Read EmailJS config from Vite env variables. Replace these with
    // your actual EmailJS service/template/public key in a .env file:
    // VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

    const templateParams = {
      name,
      email,
      message,
    };

    // Try to send via EmailJS (client-side). If not configured, fallback to simulation.
    if (SERVICE_ID.startsWith("YOUR_") || TEMPLATE_ID.startsWith("YOUR_") || PUBLIC_KEY.startsWith("YOUR_")) {
      console.warn("EmailJS not configured — message not actually sent. Set VITE_EMAILJS_* env vars to enable live sending.");
      setTimeout(() => {
        setSent(true);
        setSending(false);
      }, 900);
      return;
    }

    // Dynamically import EmailJS so the app doesn't crash if the package isn't installed.
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setSent(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send email");
    } finally {
      setSending(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.10)",
    color: "white",
    borderRadius: 12,
    padding: "10px 14px",
    fontSize: 13,
    outline: "none",
    width: "100%",
    fontFamily: "'Inter', sans-serif",
    transition: "border-color 0.2s",
  };

  return (
    <div className="p-5 overflow-auto h-full space-y-5" style={{ fontFamily: "'Inter', sans-serif", scrollbarWidth: "none" }}>

      {/* Header */}
      <div>
        <h2
          className="text-lg font-bold text-white mb-1"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Get in Touch
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.35)" }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>India</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.35)" }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>IST (UTC +5:30)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Available for work</span>
          </div>
        </div>
      </div>

      {/* Social links */}
      <div className="grid grid-cols-2 gap-2.5">
        {LINKS.map(({ label, val, Icon, color, href }) => (
          <a
            key={label}
            href={href}
            className="flex items-center gap-3 rounded-xl p-3 group transition-all hover:brightness-125"
            style={{ background: `${color}0d`, border: `1px solid ${color}20`, textDecoration: "none" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${color}18`, border: `1px solid ${color}28` }}
            >
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                {label}
              </div>
              <div className="text-[11px] font-medium truncate" style={{ color: "rgba(255,255,255,0.72)" }}>
                {val}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Contact form */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        {sent ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
            <CheckCircle className="w-12 h-12" style={{ color: "#10B981" }} />
            <h3 className="text-base font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Message Sent!
            </h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Thanks for reaching out. I usually respond within 24 hours.
            </p>
            <button
              onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }}
              className="text-xs font-medium px-4 py-2 rounded-lg mt-1"
              style={{ background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.25)", color: "#06B6D4" }}
            >
              Send another
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <h3
              className="text-[10px] font-semibold uppercase tracking-widest mb-1"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              Send a Message
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Your Name
                </label>
                <input
                  style={inputStyle}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Email
                </label>
                <input
                  style={inputStyle}
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                Message
              </label>
              <textarea
                style={{ ...inputStyle, resize: "none", height: 100 }}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Hi Akansha, I'd love to collaborate on…"
              />
            </div>

            <button
              onClick={handleSend}
              disabled={!name.trim() || !email.trim() || !message.trim() || sending}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40 hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #06B6D4, #8B5CF6)" }}
            >
              {sending ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
