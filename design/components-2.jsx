/* global React, Icon */
// KEYSTONE — composite components: cards, nav, FAB, sheets, AI states

// ═══════ LEAD CARD ═══════
function LeadCard({ name = "Sophia Marchetti", status = "qualified",
  budget = "€ 950K – 1.1M", area = "Marais · 11e", source = "WhatsApp",
  avatar = "S", initials = "SM", lastMsg = "Can we move Saturday's viewing to noon?",
  time = "12m", aiAction = "Schedule visit · confirm property", unread = 2 }) {
  return (
    <div style={{
      padding: 16, borderRadius: 18, background: "#fff",
      border: "1px solid var(--line)",
      boxShadow: "var(--shadow-1)",
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "linear-gradient(135deg, oklch(0.75 0.10 320), oklch(0.65 0.13 280))",
          color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 500,
          letterSpacing: "-0.02em",
        }}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.01em" }}>{name}</span>
            <span className="k-pill" style={{
              height: 20, padding: "0 8px", fontSize: 11,
              background: "oklch(0.92 0.08 155 / 0.5)",
              color: "oklch(0.4 0.12 155)",
            }}>{status}</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 2 }}>
            {area} · {budget}
          </div>
        </div>
        <span className="k-mono">{time}</span>
      </div>

      <div style={{
        fontSize: 13, color: "var(--ink-2)", lineHeight: 1.45,
        letterSpacing: "-0.005em",
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>"{lastMsg}"</div>

      <div style={{
        padding: "10px 12px", borderRadius: 12,
        background: "linear-gradient(180deg, oklch(0.96 0.04 285 / 0.6), oklch(0.96 0.03 270 / 0.4))",
        border: "1px solid oklch(0.62 0.18 270 / 0.15)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%", background: "var(--aurora)",
          boxShadow: "0 0 8px oklch(0.62 0.18 270 / 0.5)",
        }} />
        <span style={{ fontSize: 12, color: "var(--ink-1)", flex: 1, fontWeight: 500 }}>{aiAction}</span>
        <Icon name="arrow" size={14} color="var(--ink-2)" />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11, color: "var(--ink-4)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Icon name="message" size={12} /> {source}
        </div>
        {unread > 0 && (
          <div style={{
            padding: "1px 6px", borderRadius: 9999,
            background: "var(--ink-0)", color: "#fff",
            fontSize: 10, fontWeight: 600,
          }}>{unread} new</div>
        )}
      </div>
    </div>
  );
}

// ═══════ PROPERTY CARD ═══════
function PropertyCard({
  price = "€ 1,095,000", area = "78 m²", beds = "3 bed",
  address = "12 Rue Vieille du Temple", zone = "Marais · 75004",
  matchPct = 92, tag = "New match",
}) {
  return (
    <div style={{
      borderRadius: 18, background: "#fff", overflow: "hidden",
      border: "1px solid var(--line)", boxShadow: "var(--shadow-1)",
    }}>
      <div className="k-placeholder" style={{
        height: 160, borderRadius: 0, position: "relative",
      }}>
        <span>[ apartment photo · interior ]</span>
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
          <div style={{
            padding: "5px 10px", borderRadius: 9999,
            background: "rgba(11,11,15,0.85)",
            backdropFilter: "blur(10px)",
            color: "#fff", fontSize: 11, fontWeight: 500,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <div style={{
              width: 5, height: 5, borderRadius: "50%", background: "var(--aurora)",
            }}/>
            {tag}
          </div>
        </div>
        <div style={{
          position: "absolute", top: 12, right: 12,
          padding: "5px 10px", borderRadius: 9999,
          background: "var(--aurora)", color: "#fff",
          fontSize: 11, fontWeight: 600, letterSpacing: "-0.01em",
        }}>{matchPct}% match</div>
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{
            fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500,
            letterSpacing: "-0.025em",
          }}>{price}</span>
          <span className="k-mono">{area} · {beds}</span>
        </div>
        <span style={{ fontSize: 14, color: "var(--ink-1)", letterSpacing: "-0.01em" }}>{address}</span>
        <span style={{ fontSize: 12, color: "var(--ink-4)" }}>{zone}</span>
      </div>
    </div>
  );
}

// ═══════ CONVERSATION CARD ═══════
function ConversationCard({ name = "Théo Beaumont", channel = "WhatsApp",
  snippet = "Sent voice · 0:42", time = "2h", aiTag = "Voice → 3 fields", unread = false }) {
  return (
    <div style={{
      padding: 14, borderRadius: 14, background: "#fff",
      border: "1px solid var(--line)",
      display: "flex", alignItems: "center", gap: 12,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: "50%",
        background: "linear-gradient(135deg, oklch(0.78 0.07 80), oklch(0.65 0.12 50))",
        color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 500,
      }}>TB</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>{name}</span>
          <span className="k-mono">· {channel}</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 3, display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="voice" size={12} color="var(--ink-4)" /> {snippet}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
        <span className="k-mono">{time}</span>
        {unread && <div style={{
          width: 8, height: 8, borderRadius: "50%", background: "var(--aurora)",
          boxShadow: "0 0 6px oklch(0.62 0.18 270 / 0.5)",
        }}/>}
      </div>
    </div>
  );
}

// ═══════ BOTTOM NAVIGATION ═══════
function BottomNav({ active = "inbox", dark = false }) {
  const items = [
    { id: "inbox", icon: "inbox", label: "Inbox" },
    { id: "leads", icon: "lead", label: "Leads" },
    { id: "ai", icon: "spark", label: "AI", ai: true },
    { id: "matches", icon: "home", label: "Matches" },
    { id: "cal", icon: "cal", label: "Today" },
  ];
  return (
    <div style={{
      padding: "10px 12px 14px",
      background: dark ? "rgba(15,15,20,0.85)" : "rgba(255,255,255,0.85)",
      backdropFilter: "blur(24px) saturate(180%)",
      borderTop: dark ? "1px solid var(--g-line)" : "1px solid var(--line)",
      display: "flex", justifyContent: "space-around", alignItems: "center",
    }}>
      {items.map(it => {
        const isActive = it.id === active;
        if (it.ai) {
          return (
            <button key={it.id} style={{
              width: 52, height: 52, borderRadius: "50%", border: "none",
              background: "var(--aurora)", color: "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 20px oklch(0.62 0.18 270 / 0.45)",
              marginTop: -16,
            }}>
              <Icon name="spark" size={22} color="#fff" stroke={2} />
            </button>
          );
        }
        return (
          <button key={it.id} style={{
            border: "none", background: "transparent", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            padding: "4px 10px",
            color: isActive ? (dark ? "#fff" : "var(--ink-0)") : (dark ? "var(--g-ink-3)" : "var(--ink-4)"),
          }}>
            <Icon name={it.icon} size={22} color="currentColor" stroke={isActive ? 1.8 : 1.5} />
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 500, letterSpacing: "-0.01em" }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ═══════ FLOATING ACTION BUTTON ═══════
function FAB({ size = 60 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "var(--aurora)",
      boxShadow: "0 12px 32px oklch(0.62 0.18 270 / 0.45), 0 0 0 8px rgba(255,255,255,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative",
    }}>
      {/* aurora ring */}
      <div style={{
        position: "absolute", inset: -4, borderRadius: "50%",
        background: "conic-gradient(from 0deg, oklch(0.78 0.14 285), oklch(0.62 0.18 270), oklch(0.66 0.15 240), oklch(0.78 0.14 285))",
        opacity: 0.4, filter: "blur(8px)",
      }} />
      <Icon name="voice" size={26} color="#fff" stroke={2} />
    </div>
  );
}

// ═══════ AI TYPING STATE ═══════
function AITyping({ dark = false }) {
  const fg = dark ? "var(--g-ink-2)" : "var(--ink-2)";
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      padding: "10px 14px", borderRadius: 14,
      background: dark ? "var(--g-2)" : "var(--paper-2)",
      border: dark ? "1px solid var(--g-line)" : "1px solid var(--line)",
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: "50%",
        background: "var(--aurora)",
      }} />
      <span style={{ fontSize: 13, color: fg, fontWeight: 500 }}>Keystone is thinking</span>
      <div style={{ display: "flex", gap: 4, alignItems: "center", height: 8 }}>
        <div className="k-typing-dot" />
        <div className="k-typing-dot" />
        <div className="k-typing-dot" />
      </div>
    </div>
  );
}

// ═══════ NOTIFICATION ═══════
function Notification({ title = "Sophia replied", body = "\"Saturday at noon works. See you then.\"",
  time = "now", icon = "message", aurora = false }) {
  return (
    <div style={{
      padding: 14, borderRadius: 14,
      background: aurora
        ? "linear-gradient(180deg, oklch(0.96 0.04 285 / 0.6), #fff)"
        : "#fff",
      border: aurora ? "1px solid oklch(0.62 0.18 270 / 0.2)" : "1px solid var(--line)",
      display: "flex", gap: 12, alignItems: "flex-start",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        background: aurora ? "var(--aurora)" : "var(--paper-2)",
        color: aurora ? "#fff" : "var(--ink-2)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon name={icon} size={18} color="currentColor" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>{title}</span>
          <span className="k-mono">{time}</span>
        </div>
        <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 4, lineHeight: 1.4 }}>{body}</div>
      </div>
    </div>
  );
}

// ═══════ TIMELINE ITEM ═══════
function TimelineItem({ when = "Yesterday · 14:32", who = "Sophia", channel = "WhatsApp",
  type = "message", content = "Can we visit the Marais flat this weekend?",
  ai = null, isFirst = false, isLast = false }) {
  const dotColors = {
    message: "var(--ink-4)",
    voice: "var(--aurora-violet)",
    visit: "oklch(0.65 0.13 155)",
    ai: "var(--aurora-violet)",
  };
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div style={{ width: 16, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {!isFirst && <div style={{ width: 1, height: 8, background: "var(--line)" }} />}
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: dotColors[type] || "var(--ink-4)",
          boxShadow: type === "ai" ? "0 0 8px oklch(0.62 0.18 270 / 0.5)" : "none",
        }} />
        {!isLast && <div style={{ width: 1, flex: 1, background: "var(--line)", minHeight: 24 }} />}
      </div>
      <div style={{ flex: 1, paddingBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>{who}</span>
          <span className="k-mono">· {channel}</span>
          <span className="k-mono" style={{ marginLeft: "auto" }}>{when}</span>
        </div>
        <div style={{
          fontSize: 14, lineHeight: 1.5, color: "var(--ink-1)",
          padding: type === "message" ? 0 : "10px 12px",
          borderRadius: 10,
          background: type !== "message" ? "var(--paper-2)" : "transparent",
        }}>{content}</div>
        {ai && (
          <div style={{
            marginTop: 8, fontSize: 12, color: "oklch(0.5 0.15 275)",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <div style={{
              width: 4, height: 4, borderRadius: "50%", background: "var(--aurora)",
            }}/>
            {ai}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════ EMPTY STATE ═══════
function EmptyState() {
  return (
    <div style={{
      padding: "48px 24px", textAlign: "center",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: 20,
        background: "linear-gradient(180deg, var(--paper-2), var(--paper-3))",
        border: "1px solid var(--line)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon name="inbox" size={28} color="var(--ink-4)" />
      </div>
      <div>
        <h3 style={{
          margin: 0, fontFamily: "var(--font-display)",
          fontSize: 20, fontWeight: 500, letterSpacing: "-0.025em",
        }}>Inbox zero.</h3>
        <p style={{
          margin: "6px 0 0", fontSize: 13, color: "var(--ink-3)", maxWidth: 240,
        }}>Keystone will surface conversations the moment they need you.</p>
      </div>
    </div>
  );
}

// ═══════ AI ASSISTANT ORB (big) ═══════
function AssistantOrb({ size = 96, listening = false }) {
  return (
    <div style={{
      width: size, height: size, position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {/* outer ring */}
      <div className="k-aurora-ring" style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        filter: "blur(8px)", opacity: 0.7,
      }} />
      {/* inner orb */}
      <div style={{
        width: size - 16, height: size - 16, borderRadius: "50%",
        background: "var(--aurora)",
        boxShadow: "inset 0 -8px 16px rgba(0,0,0,0.25), inset 0 8px 16px rgba(255,255,255,0.2)",
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {listening && (
          <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{
                width: 3, height: 6 + (i === 2 ? 22 : i === 1 || i === 3 ? 16 : 10),
                borderRadius: 2, background: "rgba(255,255,255,0.95)",
                animation: `k-pulse ${0.8 + i * 0.1}s ease-in-out infinite`,
              }}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  LeadCard, PropertyCard, ConversationCard, BottomNav, FAB,
  AITyping, Notification, TimelineItem, EmptyState, AssistantOrb,
});
