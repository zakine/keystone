/* global React, Icon, IOSDevice, IOSStatusBar, BottomNav, LeadCard, PropertyCard,
   AssistantOrb, AITyping, FAB */
// KEYSTONE — screens 1-5: AI Inbox, Timeline, Lead Detail, Property Detail, Visit Mode

// shared layout: screen w 402, content under status (top 54), above bottom nav (~80)
const SCR_W = 402, SCR_H = 874;

function ScreenShell({ children, dark = false, hideNav = false, navActive }) {
  return (
    <IOSDevice width={SCR_W} height={SCR_H} dark={dark}>
      <div className="k-screen" style={{
        height: "100%", display: "flex", flexDirection: "column",
        background: dark ? "var(--g-0)" : "var(--paper)",
        paddingTop: 54, // under status bar
      }}>
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {children}
        </div>
        {!hideNav && <BottomNav active={navActive} dark={dark} />}
        <div style={{ height: 30 }} /> {/* clear home indicator */}
      </div>
    </IOSDevice>
  );
}

// ───────────────────────────────────────────────
// 1) AI INBOX
// ───────────────────────────────────────────────
function ScreenAIInbox() {
  return (
    <ScreenShell navActive="inbox">
      {/* Header */}
      <div style={{ padding: "12px 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="k-mono" style={{ color: "var(--ink-4)" }}>WEDNESDAY · MAY 21</div>
          <h1 style={{
            margin: "2px 0 0", fontFamily: "var(--font-display)",
            fontSize: 32, fontWeight: 500, letterSpacing: "-0.035em", lineHeight: 1,
          }}>Inbox</h1>
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "linear-gradient(135deg, oklch(0.7 0.1 60), oklch(0.55 0.13 30))",
          color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 500,
        }}>MN</div>
      </div>

      {/* Aurora morning brief */}
      <div style={{ padding: "12px 20px 16px" }}>
        <div style={{
          padding: "16px 16px", borderRadius: 18,
          background: "linear-gradient(160deg, oklch(0.96 0.04 290), oklch(0.97 0.02 250))",
          border: "1px solid oklch(0.62 0.18 270 / 0.15)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%",
            background: "var(--aurora)", filter: "blur(40px)", opacity: 0.5,
          }}/>
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--aurora)" }} />
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "oklch(0.35 0.15 275)" }}>Morning brief</span>
          </div>
          <p style={{
            margin: 0, fontFamily: "var(--font-display)", fontSize: 19,
            letterSpacing: "-0.022em", lineHeight: 1.3, fontWeight: 500, position: "relative",
          }}>3 leads need a reply. Sophia confirmed Saturday. The Marais offer is being countered.</p>
          <div style={{ marginTop: 14, display: "flex", gap: 8, position: "relative" }}>
            <button style={btnGhostSm}>Open brief</button>
            <button style={btnLink}>Skip · 4 more</button>
          </div>
        </div>
      </div>

      {/* Filter row */}
      <div style={{ padding: "0 20px 8px", display: "flex", gap: 8, overflowX: "auto" }}>
        {[
          { t: "All", n: 12, active: true },
          { t: "Needs reply", n: 3 },
          { t: "Hot", n: 2 },
          { t: "Visits", n: 1 },
        ].map((f, i) => (
          <button key={i} style={{
            height: 30, padding: "0 12px", borderRadius: 9999, border: "none",
            background: f.active ? "var(--ink-0)" : "var(--paper-2)",
            color: f.active ? "#fff" : "var(--ink-2)",
            fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
          }}>{f.t}<span style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: f.active ? "rgba(255,255,255,0.6)" : "var(--ink-4)",
          }}>{f.n}</span></button>
        ))}
      </div>

      {/* Conversation list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        <InboxRow name="Sophia Marchetti" initials="SM" gradient="0.75 0.10 320, 0.65 0.13 280"
          snippet={'"Saturday at noon works."'} time="12m" aiHint="Visit confirmed · 1 follow-up drafted"
          unread />
        <InboxRow name="Théo Beaumont" initials="TB" gradient="0.78 0.07 80, 0.65 0.12 50"
          snippet="Voice note · 0:42 · ‘budget around 1.1, prefer Marais’" time="2h"
          aiHint="3 fields extracted · added to shortlist" voice />
        <InboxRow name="Léa Khoury" initials="LK" gradient="0.78 0.10 150, 0.55 0.13 175"
          snippet="3 photos of garden + facade" time="5h" />
        <InboxRow name="Pierre Aubert" initials="PA" gradient="0.7 0.12 230, 0.55 0.14 260"
          snippet="Reviewed term sheet, two small notes" time="1d" />
        <InboxRow name="Camille Vidal" initials="CV" gradient="0.75 0.08 0, 0.6 0.13 350"
          snippet={'"Can we tour 5th arrondissement too?"'} time="2d"
          aiHint="2 properties matched · ready to share" />
      </div>
    </ScreenShell>
  );
}

const btnGhostSm = {
  height: 32, padding: "0 14px", borderRadius: 10,
  background: "var(--ink-0)", color: "#fff", border: "none",
  fontSize: 13, fontWeight: 500, cursor: "pointer",
};
const btnLink = {
  height: 32, padding: "0 8px", borderRadius: 10,
  background: "transparent", color: "var(--ink-3)", border: "none",
  fontSize: 13, fontWeight: 500, cursor: "pointer",
};

function InboxRow({ name, initials, gradient, snippet, time, aiHint, unread, voice }) {
  return (
    <div style={{
      padding: 14, borderRadius: 16, background: "#fff",
      border: "1px solid var(--line)",
      display: "flex", flexDirection: "column", gap: aiHint ? 10 : 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: `linear-gradient(135deg, oklch(${gradient.split(",")[0]}), oklch(${gradient.split(",")[1]}))`,
          color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 500, flexShrink: 0,
        }}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.01em" }}>{name}</span>
            {unread && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--aurora)" }}/>}
          </div>
          <div style={{
            fontSize: 13, color: "var(--ink-3)", marginTop: 2,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            {voice && <Icon name="voice" size={12} color="var(--ink-4)" />}
            {snippet}
          </div>
        </div>
        <span className="k-mono" style={{ flexShrink: 0 }}>{time}</span>
      </div>
      {aiHint && (
        <div style={{
          padding: "8px 10px", borderRadius: 10,
          background: "oklch(0.62 0.18 270 / 0.06)",
          fontSize: 12, color: "oklch(0.4 0.15 275)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--aurora)" }}/>
          {aiHint}
        </div>
      )}
    </div>
  );
}

// ───────────────────────────────────────────────
// 2) CONVERSATION TIMELINE
// ───────────────────────────────────────────────
function ScreenConversation() {
  return (
    <IOSDevice width={SCR_W} height={SCR_H}>
      <div className="k-screen" style={{
        height: "100%", display: "flex", flexDirection: "column",
        background: "var(--paper)", paddingTop: 54,
      }}>
        {/* Top bar */}
        <div style={{
          padding: "10px 16px 14px", display: "flex", alignItems: "center", gap: 12,
          borderBottom: "1px solid var(--line)",
          background: "rgba(250,250,247,0.85)",
          backdropFilter: "blur(20px)",
        }}>
          <Icon name="chevL" size={22} color="var(--ink-1)" />
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, oklch(0.75 0.10 320), oklch(0.65 0.13 280))",
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 500,
          }}>SM</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Sophia Marchetti</div>
            <div className="k-mono" style={{ color: "oklch(0.5 0.13 155)" }}>● qualified · marais shortlist</div>
          </div>
          <Icon name="phone" size={20} color="var(--ink-2)" />
          <Icon name="more" size={22} color="var(--ink-2)" />
        </div>

        {/* Pinned AI extract */}
        <div style={{ padding: "12px 16px 8px" }}>
          <div style={{
            padding: 14, borderRadius: 14,
            background: "linear-gradient(180deg, oklch(0.97 0.03 285), #fff)",
            border: "1px solid oklch(0.62 0.18 270 / 0.15)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--aurora)" }}/>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "oklch(0.4 0.15 275)" }}>From this conversation</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 8, columnGap: 12 }}>
              <ExtractField k="Budget" v="€ 950K – 1.1M" />
              <ExtractField k="Beds" v="3" />
              <ExtractField k="Area" v="Marais · 11e" />
              <ExtractField k="Move-in" v="Sept 2026" />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
          <DayDivider label="Today" />
          <Bubble side="them" channel="WhatsApp" time="11:24"
            text="Hi! Still good for Saturday? Also, is parking included or is it extra?" />
          <Bubble side="ai"
            text="Two questions detected · visit time + parking. Draft a reply?"
            ai />
          <Bubble side="me" time="11:26"
            text="Saturday 14:00 still works. Parking is one spot included in the lot below — €120/month for a second." />
          <Bubble side="them" channel="Voice" time="11:31"
            voice="0:38" preview="Confirms Saturday, asks about Sunday backup, mentions her partner Marco will join." />
          <Bubble side="ai"
            text="Added Marco as joint contact · Sunday 10:00 reserved as backup"
            ai />
        </div>

        {/* AI Compose */}
        <div style={{ padding: "10px 12px 14px", borderTop: "1px solid var(--line)", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 10, overflowX: "auto" }}>
            <QR>Confirm Sat 14:00</QR>
            <QR>Send shortlist (3)</QR>
            <QR>Suggest backup</QR>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 8px 8px 16px", borderRadius: 22,
            background: "#fff", border: "1px solid var(--line)",
          }}>
            <Icon name="plus" size={20} color="var(--ink-3)" />
            <span style={{ flex: 1, fontSize: 14, color: "var(--ink-4)" }}>Message Sophia…</span>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", background: "var(--aurora)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px oklch(0.62 0.18 270 / 0.4)",
            }}><Icon name="voice" size={18} color="#fff" stroke={2} /></div>
          </div>
        </div>
        <div style={{ height: 16 }} />
      </div>
    </IOSDevice>
  );
}

function DayDivider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 8px" }}>
      <div style={{ flex: 1, height: 1, background: "var(--line)" }}/>
      <span className="k-mono">{label}</span>
      <div style={{ flex: 1, height: 1, background: "var(--line)" }}/>
    </div>
  );
}

function ExtractField({ k, v }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: "var(--ink-4)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 2 }}>{k}</div>
      <div style={{ fontSize: 13, color: "var(--ink-1)", fontWeight: 500, letterSpacing: "-0.01em" }}>{v}</div>
    </div>
  );
}

function Bubble({ side, channel, time, text, ai, voice, preview }) {
  if (side === "ai") {
    return (
      <div style={{ display: "flex", justifyContent: "center", margin: "4px 0" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "8px 14px", borderRadius: 9999,
          background: "oklch(0.62 0.18 270 / 0.06)",
          border: "1px solid oklch(0.62 0.18 270 / 0.15)",
          fontSize: 12, color: "oklch(0.35 0.15 275)", fontWeight: 500,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--aurora)" }}/>
          {text}
        </div>
      </div>
    );
  }
  const isMe = side === "me";
  return (
    <div style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
      <div style={{ maxWidth: "78%", display: "flex", flexDirection: "column", gap: 4, alignItems: isMe ? "flex-end" : "flex-start" }}>
        <div style={{
          padding: voice ? "10px 12px" : "10px 14px",
          borderRadius: 18,
          borderBottomRightRadius: isMe ? 6 : 18,
          borderBottomLeftRadius: !isMe ? 6 : 18,
          background: isMe ? "var(--ink-0)" : "#fff",
          color: isMe ? "#fff" : "var(--ink-1)",
          border: isMe ? "none" : "1px solid var(--line)",
          fontSize: 14, lineHeight: 1.45, letterSpacing: "-0.005em",
        }}>
          {voice ? (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="voice" size={16} color="var(--aurora-violet)" stroke={1.8} />
                <div style={{ display: "flex", gap: 2, alignItems: "center", flex: 1 }}>
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div key={i} style={{
                      width: 2, height: 4 + Math.abs(Math.sin(i)) * 14,
                      borderRadius: 1,
                      background: i < 12 ? "var(--aurora-violet)" : "var(--ink-5)",
                    }}/>
                  ))}
                </div>
                <span className="k-mono">{voice}</span>
              </div>
              <div style={{
                marginTop: 8, fontSize: 12, color: "var(--ink-3)", fontStyle: "italic",
                lineHeight: 1.4,
              }}>{preview}</div>
            </div>
          ) : text}
        </div>
        <span className="k-mono" style={{ padding: "0 4px" }}>{channel ? `${channel} · ` : ""}{time}</span>
      </div>
    </div>
  );
}

function QR({ children }) {
  return (
    <button style={{
      height: 32, padding: "0 12px", borderRadius: 9999,
      border: "1px solid oklch(0.62 0.18 270 / 0.2)",
      background: "oklch(0.62 0.18 270 / 0.05)",
      color: "oklch(0.35 0.15 275)", fontSize: 12, fontWeight: 500,
      whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 6,
    }}>
      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--aurora)" }}/>
      {children}
    </button>
  );
}

// ───────────────────────────────────────────────
// 3) LEAD DETAIL
// ───────────────────────────────────────────────
function ScreenLeadDetail() {
  return (
    <IOSDevice width={SCR_W} height={SCR_H}>
      <div className="k-screen" style={{
        height: "100%", display: "flex", flexDirection: "column",
        background: "var(--paper)", paddingTop: 54, overflowY: "auto",
      }}>
        {/* nav */}
        <div style={{ padding: "12px 20px 0", display: "flex", justifyContent: "space-between" }}>
          <Icon name="chevL" size={22} color="var(--ink-1)" />
          <Icon name="more" size={22} color="var(--ink-1)" />
        </div>

        {/* Hero */}
        <div style={{ padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "linear-gradient(135deg, oklch(0.75 0.10 320), oklch(0.65 0.13 280))",
              color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500,
            }}>SM</div>
            <div style={{ flex: 1 }}>
              <h1 style={{
                margin: 0, fontFamily: "var(--font-display)",
                fontSize: 26, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.1,
              }}>Sophia<br/>Marchetti</h1>
              <div style={{ marginTop: 6, fontSize: 13, color: "var(--ink-3)" }}>+ Marco · joint buyer</div>
            </div>
          </div>

          {/* AI score */}
          <div style={{
            padding: 14, borderRadius: 14,
            background: "#fff", border: "1px solid var(--line)",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{ position: "relative", width: 48, height: 48 }}>
              <svg width="48" height="48" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" stroke="var(--line)" strokeWidth="3" fill="none"/>
                <circle cx="24" cy="24" r="20" stroke="url(#auroraGrad)" strokeWidth="3" fill="none"
                  strokeDasharray={`${0.84 * 125.6} 125.6`} transform="rotate(-90 24 24)" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="auroraGrad">
                    <stop offset="0" stopColor="oklch(0.7 0.17 295)"/>
                    <stop offset="1" stopColor="oklch(0.66 0.15 240)"/>
                  </linearGradient>
                </defs>
              </svg>
              <div style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600,
              }}>84</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Likely to close · 4-6 weeks</div>
              <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 2 }}>Confidence based on 18 conversations</div>
            </div>
            <Icon name="chev" size={18} color="var(--ink-4)" />
          </div>
        </div>

        {/* Extracted fields */}
        <div style={{ padding: "0 16px 12px" }}>
          <div className="k-label" style={{ padding: "0 8px 10px" }}>Extracted from conversations</div>
          <div style={{
            background: "#fff", borderRadius: 18, border: "1px solid var(--line)", overflow: "hidden",
          }}>
            <FieldRow k="Budget" v="€ 950,000 – 1,100,000" source="WhatsApp · May 12" />
            <FieldRow k="Bedrooms" v="3, ideally 4" source="Voice · May 14" />
            <FieldRow k="Area" v="Marais (11e, 4e) · open to 3e" source="WhatsApp · May 18" />
            <FieldRow k="Move-in" v="September 2026" source="WhatsApp · May 18" />
            <FieldRow k="Must-have" v="Balcony · parking · quiet street" source="Voice · May 20" last />
          </div>
        </div>

        {/* AI suggested next */}
        <div style={{ padding: "8px 16px 16px" }}>
          <div className="k-label" style={{ padding: "0 8px 10px" }}>Suggested next</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { t: "Share 3 new Marais matches", h: "All within budget, 2 with parking", icon: "home" },
              { t: "Confirm Saturday viewing time", h: "Sophia + Marco · property #M-128", icon: "cal" },
              { t: "Request mortgage pre-approval doc", h: "Needed before offer · standard form", icon: "paperclip" },
            ].map((s, i) => (
              <div key={i} style={{
                padding: 14, borderRadius: 14, background: "#fff",
                border: "1px solid var(--line)",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "linear-gradient(135deg, oklch(0.97 0.03 290), oklch(0.95 0.04 270))",
                  border: "1px solid oklch(0.62 0.18 270 / 0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "oklch(0.4 0.15 275)",
                }}><Icon name={s.icon} size={18} color="currentColor" /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{s.t}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 2 }}>{s.h}</div>
                </div>
                <Icon name="arrow" size={18} color="var(--ink-3)" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </IOSDevice>
  );
}

function FieldRow({ k, v, source, last }) {
  return (
    <div style={{
      padding: "14px 16px", display: "flex", alignItems: "center", gap: 16,
      borderBottom: last ? "none" : "1px solid var(--line-soft)",
    }}>
      <div style={{ width: 90, fontSize: 12, color: "var(--ink-4)", flexShrink: 0 }}>{k}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, color: "var(--ink-1)", fontWeight: 500, letterSpacing: "-0.01em" }}>{v}</div>
        <div className="k-mono" style={{ marginTop: 2 }}>{source}</div>
      </div>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--aurora)", opacity: 0.6, flexShrink: 0 }}/>
    </div>
  );
}

// ───────────────────────────────────────────────
// 4) PROPERTY DETAIL
// ───────────────────────────────────────────────
function ScreenProperty() {
  return (
    <IOSDevice width={SCR_W} height={SCR_H}>
      <div className="k-screen" style={{
        height: "100%", display: "flex", flexDirection: "column",
        background: "var(--paper)", overflowY: "auto",
      }}>
        {/* Photo hero */}
        <div className="k-placeholder" style={{
          height: 360, borderRadius: 0, position: "relative",
          paddingTop: 54,
        }}>
          {/* overlays */}
          <div style={{
            position: "absolute", top: 54, left: 16, right: 16,
            display: "flex", justifyContent: "space-between",
            zIndex: 5,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}><Icon name="chevL" size={20} color="var(--ink-1)" /></div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{
                padding: "8px 14px", borderRadius: 9999,
                background: "rgba(11,11,15,0.85)", backdropFilter: "blur(12px)",
                color: "#fff", fontSize: 12, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--aurora)" }}/>
                92% match · Sophia
              </div>
            </div>
          </div>
          <span style={{ fontSize: 11 }}>[ apartment hero · 3 photos · 360° tour ]</span>
          {/* dot indicator */}
          <div style={{
            position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: 5,
          }}>
            {[0,1,2,3,4].map(i => (
              <div key={i} style={{
                width: i === 0 ? 16 : 5, height: 5, borderRadius: 4,
                background: i === 0 ? "#fff" : "rgba(255,255,255,0.5)",
              }}/>
            ))}
          </div>
        </div>

        {/* Header */}
        <div style={{ padding: "20px 24px 16px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <h1 style={{
              margin: 0, fontFamily: "var(--font-display)",
              fontSize: 30, fontWeight: 500, letterSpacing: "-0.035em", lineHeight: 1,
            }}>€ 1,095,000</h1>
            <span className="k-mono">78 m² · 3 bed</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 15, color: "var(--ink-1)", letterSpacing: "-0.01em" }}>
            12 Rue Vieille du Temple
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-4)", marginTop: 2 }}>Marais · 75004 Paris</div>
        </div>

        {/* AI match reasons */}
        <div style={{ padding: "0 16px 16px" }}>
          <div style={{
            padding: 16, borderRadius: 18,
            background: "linear-gradient(180deg, oklch(0.97 0.03 285), #fff)",
            border: "1px solid oklch(0.62 0.18 270 / 0.15)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", background: "var(--aurora)" }}/>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "oklch(0.4 0.15 275)" }}>Why it matches Sophia</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <MatchReason ok="In budget" detail="€ 1.095M sits in her € 950K – 1.1M range" />
              <MatchReason ok="Right area" detail="Marais was her #1 stated preference (3 mentions)" />
              <MatchReason ok="Parking included" detail="One underground spot · matches must-have" />
              <MatchReason warn="Bedrooms" detail="3 bed listed — she preferred 3, ideally 4" />
            </div>
          </div>
        </div>

        {/* Specs grid */}
        <div style={{ padding: "0 16px 16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[["78 m²", "surface"], ["3", "bedrooms"], ["1", "bathroom"], ["4e", "floor"], ["1850", "built"], ["DPE B", "energy"]].map(([v, k], i) => (
              <div key={i} style={{
                padding: 14, borderRadius: 12, background: "#fff",
                border: "1px solid var(--line)",
              }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, letterSpacing: "-0.02em" }}>{v}</div>
                <div className="k-mono" style={{ marginTop: 4 }}>{k}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA bottom */}
        <div style={{
          padding: "12px 16px 28px", display: "flex", gap: 8,
          position: "sticky", bottom: 0,
          background: "linear-gradient(180deg, transparent, var(--paper) 30%)",
        }}>
          <button style={{
            flex: 1, height: 52, borderRadius: 14, border: "1px solid var(--line)",
            background: "#fff", fontSize: 14, fontWeight: 500,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}><Icon name="cal" size={18} /> Schedule visit</button>
          <button style={{
            flex: 1.2, height: 52, borderRadius: 14, border: "none",
            background: "var(--aurora)", color: "#fff",
            fontSize: 14, fontWeight: 500,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            boxShadow: "0 8px 24px oklch(0.62 0.18 270 / 0.4)",
          }}><Icon name="send" size={18} color="#fff" /> Share with Sophia</button>
        </div>
      </div>
    </IOSDevice>
  );
}

function MatchReason({ ok, warn, detail }) {
  const isOk = !!ok;
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <div style={{
        width: 18, height: 18, borderRadius: "50%", marginTop: 1, flexShrink: 0,
        background: isOk ? "oklch(0.65 0.13 155 / 0.15)" : "oklch(0.72 0.14 75 / 0.18)",
        color: isOk ? "oklch(0.45 0.13 155)" : "oklch(0.5 0.14 75)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 600,
      }}>{isOk ? "✓" : "!"}</div>
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>{ok || warn}</span>
        <span style={{ fontSize: 13, color: "var(--ink-3)" }}> · {detail}</span>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────
// 5) VISIT MODE
// ───────────────────────────────────────────────
function ScreenVisit() {
  return (
    <IOSDevice width={SCR_W} height={SCR_H} dark>
      <div className="k-screen" style={{
        height: "100%", display: "flex", flexDirection: "column",
        background: "var(--g-0)", color: "var(--g-ink)", paddingTop: 54,
      }}>
        {/* header */}
        <div style={{ padding: "12px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(0.6 0.18 25)", animation: "k-pulse 1s infinite" }}/>
            <span style={{ fontSize: 11, color: "oklch(0.7 0.13 25)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>VISIT IN PROGRESS · 0:14:32</span>
          </div>
          <h1 style={{
            margin: "8px 0 4px", fontFamily: "var(--font-display)",
            fontSize: 26, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.05,
          }}>12 Rue Vieille du Temple</h1>
          <div style={{ fontSize: 13, color: "var(--g-ink-3)" }}>with Sophia + Marco · property #M-128</div>
        </div>

        {/* live listening pane */}
        <div style={{ padding: 20 }}>
          <div style={{
            padding: 20, borderRadius: 20, background: "var(--g-2)",
            border: "1px solid var(--g-line)", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%",
              background: "var(--aurora)", filter: "blur(40px)", opacity: 0.25 }}/>
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <AssistantOrb size={48} listening />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>Listening</div>
                <div style={{ fontSize: 11, color: "var(--g-ink-3)", marginTop: 2 }}>Capturing every word · stored to lead notes</div>
              </div>
            </div>
            {/* live waveform */}
            <div style={{ display: "flex", gap: 2, alignItems: "center", height: 36, marginBottom: 12, position: "relative" }}>
              {Array.from({ length: 48 }).map((_, i) => {
                const h = 4 + Math.abs(Math.sin(i * 0.5 + 1)) * 28;
                return <div key={i} style={{
                  width: 3, height: h, borderRadius: 2,
                  background: i < 36
                    ? "linear-gradient(180deg, oklch(0.78 0.14 285), oklch(0.66 0.15 240))"
                    : "rgba(255,255,255,0.1)",
                }}/>;
              })}
            </div>
            <div style={{
              padding: 12, borderRadius: 10, background: "var(--g-1)",
              fontSize: 13, lineHeight: 1.5, color: "var(--g-ink-2)",
              fontStyle: "italic",
              position: "relative",
            }}>
              "…the kitchen is smaller than the listing suggested, but the
              <span style={{ color: "var(--g-ink)", fontStyle: "normal", fontWeight: 500 }}> light is incredible </span>
              in the afternoon. Sophia mentioned she'd want to repaint the second bedroom"
              <span style={{
                display: "inline-block", width: 2, height: 14, background: "var(--aurora-violet)",
                verticalAlign: "middle", marginLeft: 2, animation: "k-pulse 1s infinite",
              }}/>
            </div>
          </div>
        </div>

        {/* live extraction chips */}
        <div style={{ padding: "0 20px 16px" }}>
          <div style={{ fontSize: 11, color: "var(--g-ink-3)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Captured so far</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              "Kitchen: smaller than listing",
              "Strong afternoon light",
              "Bedroom 2: needs repaint",
              "Liked: parquet floors",
              "Question: building HOA fees",
            ].map((t, i) => (
              <div key={i} style={{
                padding: "8px 12px", borderRadius: 9999,
                background: "var(--g-2)", border: "1px solid var(--g-line)",
                fontSize: 12, color: "var(--g-ink-2)",
              }}>
                <span style={{ color: "var(--aurora-soft)", marginRight: 6 }}>·</span>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* quick capture */}
        <div style={{ padding: "0 20px", flex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <CaptureBtn icon="cam" label="Photo" sub="Auto-tag" />
            <CaptureBtn icon="pin" label="Note" sub="Voice memo" />
          </div>
        </div>

        {/* big stop button */}
        <div style={{ padding: "16px 20px 32px", display: "flex", justifyContent: "center" }}>
          <button style={{
            height: 60, padding: "0 40px", borderRadius: 9999,
            background: "#fff", color: "var(--ink-0)", border: "none",
            fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em",
            display: "flex", alignItems: "center", gap: 12,
            boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
          }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: "oklch(0.6 0.18 25)" }}/>
            End visit · save to Sophia
          </button>
        </div>
      </div>
    </IOSDevice>
  );
}

function CaptureBtn({ icon, label, sub }) {
  return (
    <button style={{
      height: 80, borderRadius: 18,
      background: "var(--g-2)", border: "1px solid var(--g-line)",
      display: "flex", alignItems: "center", gap: 12,
      padding: "0 16px", color: "var(--g-ink)", cursor: "pointer",
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: "var(--g-3)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}><Icon name={icon} size={20} color="var(--g-ink)" /></div>
      <div style={{ textAlign: "left" }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{label}</div>
        <div className="k-mono" style={{ color: "var(--g-ink-3)" }}>{sub}</div>
      </div>
    </button>
  );
}

Object.assign(window, {
  ScreenAIInbox, ScreenConversation, ScreenLeadDetail, ScreenProperty, ScreenVisit,
});
