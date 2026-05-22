/* global React */
// KEYSTONE — primitives: buttons, inputs, chips, search, voice, FAB

// shared icon helper
function Icon({ name, size = 18, color = "currentColor", stroke = 1.5 }) {
  const paths = {
    inbox: <><path d="M4 13l3-8h10l3 8"/><path d="M4 13v6h16v-6"/><path d="M4 13h5l1 2h4l1-2h5"/></>,
    message: <><path d="M4 6h16v11H8l-4 3z"/></>,
    voice: <><rect x="10" y="3" width="4" height="12" rx="2"/><path d="M6 12a6 6 0 0012 0"/><path d="M12 18v3"/></>,
    lead: <><circle cx="12" cy="8" r="3.5"/><path d="M5 20c1-4 4-6 7-6s6 2 7 6"/></>,
    home: <><path d="M4 11l8-7 8 7v9h-5v-6h-6v6H4z"/></>,
    cal: <><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9h16M9 3v4M15 3v4"/></>,
    spark: <><path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z"/></>,
    search: <><circle cx="11" cy="11" r="6"/><path d="M16 16l4 4"/></>,
    filter: <><path d="M4 5h16l-6 8v6l-4-2v-4z"/></>,
    send: <><path d="M4 12l16-8-6 16-2-7z"/></>,
    cam: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7l2-3h2l2 3"/><circle cx="12" cy="13" r="3.5"/></>,
    pin: <><path d="M12 3c-3 0-5 2-5 5 0 4 5 12 5 12s5-8 5-12c0-3-2-5-5-5z"/><circle cx="12" cy="8" r="1.5"/></>,
    bell: <><path d="M6 16v-5a6 6 0 0112 0v5l2 2H4z"/><path d="M10 21a2 2 0 004 0"/></>,
    check: <><path d="M5 12l4 4 10-10"/></>,
    more: <><circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    x: <><path d="M6 6l12 12M18 6L6 18"/></>,
    paperclip: <><path d="M15 7l-7 7a3 3 0 004 4l8-8a5 5 0 00-7-7L5 11a7 7 0 0010 10l5-5"/></>,
    phone: <><path d="M5 4h4l2 5-3 2a11 11 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></>,
    chev: <><path d="M9 6l6 6-6 6"/></>,
    chevL: <><path d="M15 6l-6 6 6 6"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

// ═══════ BUTTONS ═══════
function ButtonRow() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        {/* primary aurora */}
        <button style={{
          height: 44, padding: "0 20px", borderRadius: 12, border: "none",
          background: "var(--aurora)", color: "#fff",
          fontFamily: "var(--font-text)", fontSize: 14, fontWeight: 500,
          letterSpacing: "-0.005em", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 8,
          boxShadow: "0 1px 0 rgba(255,255,255,0.2) inset, 0 6px 20px rgba(124,107,241,0.35)",
        }}>
          <Icon name="spark" size={16} stroke={1.8} /> Generate follow-up
        </button>
        {/* secondary ink */}
        <button style={{
          height: 44, padding: "0 20px", borderRadius: 12, border: "1px solid var(--ink-1)",
          background: "var(--ink-0)", color: "#fff",
          fontSize: 14, fontWeight: 500, cursor: "pointer",
        }}>Send message</button>
        {/* outline */}
        <button style={{
          height: 44, padding: "0 20px", borderRadius: 12, border: "1px solid var(--line)",
          background: "#fff", color: "var(--ink-1)",
          fontSize: 14, fontWeight: 500, cursor: "pointer",
        }}>Schedule visit</button>
        {/* ghost */}
        <button style={{
          height: 44, padding: "0 16px", borderRadius: 12, border: "none",
          background: "transparent", color: "var(--ink-2)",
          fontSize: 14, fontWeight: 500, cursor: "pointer",
        }}>Dismiss</button>
        {/* destructive */}
        <button style={{
          height: 44, padding: "0 20px", borderRadius: 12,
          border: "1px solid oklch(0.62 0.18 25 / 0.3)",
          background: "oklch(0.62 0.18 25 / 0.06)", color: "oklch(0.5 0.18 25)",
          fontSize: 14, fontWeight: 500, cursor: "pointer",
        }}>Archive</button>
      </div>

      {/* sizes */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button style={btnGhost(32, 12, 12)}>Compact</button>
        <button style={btnGhost(40, 14, 16)}>Default</button>
        <button style={btnGhost(52, 16, 24)}>Touch</button>
        {/* icon-only */}
        <div style={{ display: "flex", gap: 8, marginLeft: 24 }}>
          {["search", "filter", "more"].map(n => (
            <button key={n} style={{
              width: 40, height: 40, borderRadius: 12,
              border: "1px solid var(--line)", background: "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}><Icon name={n} size={18} color="var(--ink-2)" /></button>
          ))}
        </div>
      </div>
    </div>
  );
}
const btnGhost = (h, fs, px) => ({
  height: h, padding: `0 ${px}px`, borderRadius: 10,
  border: "1px solid var(--line)", background: "#fff", color: "var(--ink-1)",
  fontSize: fs, fontWeight: 500, cursor: "pointer",
});

// ═══════ INPUTS ═══════
function InputRow() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
      {/* text */}
      <div>
        <div className="k-label" style={{ marginBottom: 8 }}>Full name</div>
        <div style={{
          height: 48, padding: "0 16px", borderRadius: 12,
          border: "1px solid var(--line)", background: "#fff",
          display: "flex", alignItems: "center",
          fontSize: 15, color: "var(--ink-1)",
        }}>Amélie Laurent</div>
      </div>
      {/* focused */}
      <div>
        <div className="k-label" style={{ marginBottom: 8 }}>Phone</div>
        <div style={{
          height: 48, padding: "0 16px", borderRadius: 12,
          border: "1.5px solid oklch(0.62 0.18 270)", background: "#fff",
          boxShadow: "0 0 0 4px oklch(0.62 0.18 270 / 0.12)",
          display: "flex", alignItems: "center",
          fontSize: 15, color: "var(--ink-1)",
        }}>+33 6 12 34 56 78<span style={{
          width: 1.5, height: 18, background: "oklch(0.62 0.18 270)",
          marginLeft: 2, animation: "k-pulse 1s infinite",
        }}/></div>
      </div>
      {/* with hint */}
      <div>
        <div className="k-label" style={{ marginBottom: 8 }}>Budget</div>
        <div style={{
          height: 48, padding: "0 16px", borderRadius: 12,
          border: "1px solid var(--line)", background: "#fff",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontSize: 15, color: "var(--ink-4)",
        }}>
          <span>€ 850,000 – 1,100,000</span>
          <span className="k-mono">EUR</span>
        </div>
      </div>
    </div>
  );
}

// ═══════ AI PROMPT INPUT ═══════
function AIPromptInput() {
  return (
    <div style={{
      position: "relative", padding: 2, borderRadius: 18,
      background: "var(--aurora)",
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: "14px 16px",
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 24, height: 24, borderRadius: "50%",
            background: "var(--aurora)",
            boxShadow: "0 0 12px oklch(0.62 0.18 270 / 0.5)",
          }} />
          <span style={{ fontSize: 14, color: "var(--ink-3)", letterSpacing: "-0.01em" }}>
            Ask Keystone — or paste a message
          </span>
          <span className="k-mono" style={{ marginLeft: "auto" }}>⌘K</span>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Draft reply to Sophia", "Find 3-bed in Marais < €1.2M", "Recap yesterday"].map(t => (
            <button key={t} style={{
              height: 28, padding: "0 12px", borderRadius: 9999,
              border: "1px solid var(--line)", background: "var(--paper)",
              fontSize: 12, fontWeight: 500, color: "var(--ink-2)", cursor: "pointer",
            }}>{t}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════ VOICE INPUT ═══════
function VoiceInput() {
  return (
    <div style={{
      padding: 16, borderRadius: 18, background: "var(--ink-0)", color: "#fff",
      display: "flex", alignItems: "center", gap: 14,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: "var(--aurora)", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 0 24px oklch(0.7 0.17 290 / 0.6)",
      }}>
        <Icon name="voice" size={20} color="#fff" stroke={2} />
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 3 }}>
        {Array.from({ length: 32 }).map((_, i) => {
          const h = 4 + Math.abs(Math.sin(i * 0.7)) * 24;
          return <div key={i} style={{
            width: 3, height: h, borderRadius: 2,
            background: i < 22
              ? "linear-gradient(180deg, oklch(0.78 0.14 285), oklch(0.66 0.15 240))"
              : "rgba(255,255,255,0.18)",
          }}/>;
        })}
      </div>
      <span className="k-mono" style={{ color: "rgba(255,255,255,0.7)" }}>0:42</span>
    </div>
  );
}

// ═══════ SEARCH BAR ═══════
function SearchBar() {
  return (
    <div style={{
      height: 48, padding: "0 16px", borderRadius: 14,
      background: "var(--paper-2)", display: "flex", alignItems: "center", gap: 12,
    }}>
      <Icon name="search" size={18} color="var(--ink-3)" />
      <span style={{ fontSize: 15, color: "var(--ink-4)", flex: 1 }}>
        Leads, properties, conversations…
      </span>
      <span style={{
        padding: "3px 7px", borderRadius: 6,
        background: "#fff", border: "1px solid var(--line)",
        fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)",
      }}>⌘ F</span>
    </div>
  );
}

// ═══════ AI SUGGESTION CHIPS ═══════
function SuggestionChips() {
  const chips = [
    { t: "Reply: confirm Saturday viewing", ai: true },
    { t: "Add Sophia to Marais shortlist", ai: true },
    { t: "Mark as qualified", ai: false },
    { t: "Schedule callback · Tue 4pm", ai: true },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {chips.map((c, i) => (
        <div key={i} style={{
          padding: "10px 14px", borderRadius: 14,
          background: "#fff", border: "1px solid var(--line)",
          display: "flex", alignItems: "center", gap: 10,
          boxShadow: c.ai ? "0 0 0 1px oklch(0.62 0.18 270 / 0.10), 0 4px 16px oklch(0.62 0.18 270 / 0.06)" : "none",
        }}>
          {c.ai && <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "var(--aurora)",
            boxShadow: "0 0 8px oklch(0.62 0.18 270 / 0.6)",
          }}/>}
          <span style={{ fontSize: 14, color: "var(--ink-1)", flex: 1 }}>{c.t}</span>
          <Icon name="arrow" size={16} color="var(--ink-3)" />
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  Icon, ButtonRow, InputRow, AIPromptInput, VoiceInput, SearchBar, SuggestionChips,
});
