/* global React, Icon, IOSDevice, BottomNav, AssistantOrb, FAB */
// KEYSTONE — screens 6-10: AI Assistant, Notifications, Follow-ups, Voice CRM, Matching Feed

const SW = 402, SH = 874;

// ───────────────────────────────────────────────
// 6) AI ASSISTANT
// ───────────────────────────────────────────────
function ScreenAssistant() {
  return (
    <IOSDevice width={SW} height={SH} dark>
      <div className="k-screen" style={{
        height: "100%", display: "flex", flexDirection: "column",
        background: "var(--g-0)", color: "var(--g-ink)", paddingTop: 54,
        position: "relative", overflow: "hidden",
      }}>
        {/* aurora atmosphere */}
        <div style={{
          position: "absolute", top: -40, left: -60, width: 320, height: 320, borderRadius: "50%",
          background: "var(--aurora)", filter: "blur(80px)", opacity: 0.45,
        }}/>
        <div style={{
          position: "absolute", bottom: -60, right: -40, width: 280, height: 280, borderRadius: "50%",
          background: "oklch(0.55 0.18 245)", filter: "blur(80px)", opacity: 0.35,
        }}/>

        {/* close */}
        <div style={{ position: "relative", padding: "12px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--aurora)" }}/>
            <span style={{ fontSize: 13, fontWeight: 500 }}>Keystone</span>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.08)", border: "1px solid var(--g-line)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}><Icon name="x" size={18} color="var(--g-ink-2)" /></div>
        </div>

        {/* Orb + greeting */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 24px 16px" }}>
          <AssistantOrb size={140} listening />
          <h1 style={{
            margin: "32px 0 10px", fontFamily: "var(--font-display)",
            fontSize: 28, fontWeight: 500, letterSpacing: "-0.03em",
            textAlign: "center", lineHeight: 1.15, maxWidth: 320,
          }}>What should we do next, Marie?</h1>
          <p style={{
            margin: 0, fontSize: 14, color: "var(--g-ink-3)", textAlign: "center", maxWidth: 280,
          }}>I've reviewed today's conversations. Three need you.</p>
        </div>

        {/* answer cards */}
        <div style={{ position: "relative", padding: "16px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 8, overflowY: "auto" }}>
          {[
            { t: "Reply to Sophia — confirm Sat 14:00", n: "1 · highest priority" },
            { t: "Share 2 new Marais matches with Théo", n: "2 · 92% + 88% match" },
            { t: "Follow up: Pierre's revised offer", n: "3 · 2 days quiet" },
          ].map((s, i) => (
            <button key={i} style={{
              padding: "14px 16px", borderRadius: 16,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              display: "flex", alignItems: "center", gap: 14,
              color: "var(--g-ink)", cursor: "pointer", textAlign: "left",
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, color: "var(--aurora-soft)", letterSpacing: "-0.02em", width: 12 }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{s.t}</div>
                <div className="k-mono" style={{ marginTop: 4, color: "var(--g-ink-3)" }}>{s.n}</div>
              </div>
              <Icon name="arrow" size={16} color="var(--g-ink-3)" />
            </button>
          ))}
        </div>

        {/* voice input dock */}
        <div style={{ position: "relative", padding: "12px 16px 28px" }}>
          <div style={{
            padding: "10px 14px", borderRadius: 22,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <Icon name="plus" size={20} color="var(--g-ink-2)" />
            <span style={{ flex: 1, fontSize: 14, color: "var(--g-ink-3)" }}>Ask anything…</span>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", background: "var(--aurora)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px oklch(0.62 0.18 270 / 0.6)",
            }}><Icon name="voice" size={18} color="#fff" stroke={2} /></div>
          </div>
        </div>
      </div>
    </IOSDevice>
  );
}

// ───────────────────────────────────────────────
// 7) NOTIFICATIONS CENTER
// ───────────────────────────────────────────────
function ScreenNotifications() {
  return (
    <IOSDevice width={SW} height={SH}>
      <div className="k-screen" style={{
        height: "100%", display: "flex", flexDirection: "column",
        background: "var(--paper)", paddingTop: 54,
      }}>
        {/* header */}
        <div style={{ padding: "12px 20px 16px" }}>
          <div className="k-mono" style={{ color: "var(--ink-4)" }}>21 NEW THIS WEEK</div>
          <h1 style={{
            margin: "2px 0 0", fontFamily: "var(--font-display)",
            fontSize: 32, fontWeight: 500, letterSpacing: "-0.035em", lineHeight: 1,
          }}>Activity</h1>
        </div>

        {/* tabs */}
        <div style={{ padding: "0 20px 12px", display: "flex", gap: 8, borderBottom: "1px solid var(--line)" }}>
          {[
            { t: "All", n: 21, active: true },
            { t: "AI", n: 8 },
            { t: "Replies", n: 9 },
            { t: "Visits", n: 4 },
          ].map((tab, i) => (
            <div key={i} style={{
              padding: "6px 4px 12px", display: "flex", alignItems: "center", gap: 6,
              borderBottom: tab.active ? "2px solid var(--ink-0)" : "2px solid transparent",
              margin: "0 8px -1px 0",
              color: tab.active ? "var(--ink-0)" : "var(--ink-4)",
              fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em",
            }}>{tab.t} <span className="k-mono">{tab.n}</span></div>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
          <SectionLabel>Today</SectionLabel>
          <NotifItem aurora time="now" icon="spark"
            title="AI drafted 3 follow-ups"
            body="For Sophia, Théo & Pierre — ready to send"
            actions={["Review"]}
          />
          <NotifItem time="14m" icon="message"
            title="Sophia replied · WhatsApp"
            body={'"Saturday at noon works. See you then."'} />
          <NotifItem time="1h" icon="cal"
            title="Visit reminder · 3:30 PM"
            body="Marais flat · Théo + Camille · property #M-128" />
          <NotifItem time="2h" icon="voice"
            title="Voice note transcribed"
            body="Léa — 3 fields added to her lead automatically" />

          <SectionLabel>Yesterday</SectionLabel>
          <NotifItem aurora time="18:42" icon="spark"
            title="Pierre may need a nudge"
            body="2 days since last reply. Sentiment: warm" />
          <NotifItem time="16:10" icon="home"
            title="New listing matches 4 leads"
            body="78 m² · Marais · € 1.095M · 92% Sophia · 84% Théo" />
          <NotifItem time="11:30" icon="bell"
            title="Camille opened your offer doc"
            body="Reviewed twice over 18 minutes" />
        </div>
        <BottomNav />
        <div style={{ height: 30 }} />
      </div>
    </IOSDevice>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      padding: "12px 8px 8px", fontSize: 11, fontWeight: 600,
      letterSpacing: "0.06em", textTransform: "uppercase",
      color: "var(--ink-4)",
    }}>{children}</div>
  );
}

function NotifItem({ aurora, title, body, time, icon, actions }) {
  return (
    <div style={{
      padding: 14, marginBottom: 8, borderRadius: 14,
      background: aurora ? "linear-gradient(180deg, oklch(0.97 0.03 285 / 0.7), #fff)" : "#fff",
      border: aurora ? "1px solid oklch(0.62 0.18 270 / 0.18)" : "1px solid var(--line)",
      display: "flex", flexDirection: "column", gap: actions ? 10 : 0,
    }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: aurora ? "var(--aurora)" : "var(--paper-2)",
          color: aurora ? "#fff" : "var(--ink-2)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}><Icon name={icon} size={18} color="currentColor" /></div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em" }}>{title}</span>
            <span className="k-mono">{time}</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 3, lineHeight: 1.4 }}>{body}</div>
        </div>
      </div>
      {actions && (
        <div style={{ display: "flex", gap: 6, marginLeft: 48 }}>
          {actions.map(a => (
            <button key={a} style={{
              height: 30, padding: "0 12px", borderRadius: 9999,
              background: "var(--ink-0)", color: "#fff", border: "none",
              fontSize: 12, fontWeight: 500,
            }}>{a}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// ───────────────────────────────────────────────
// 8) FOLLOW-UP CENTER
// ───────────────────────────────────────────────
function ScreenFollowUps() {
  return (
    <IOSDevice width={SW} height={SH}>
      <div className="k-screen" style={{
        height: "100%", display: "flex", flexDirection: "column",
        background: "var(--paper)", paddingTop: 54,
      }}>
        {/* header */}
        <div style={{ padding: "12px 20px 16px" }}>
          <div className="k-mono" style={{ color: "var(--ink-4)" }}>FOLLOW-UPS · DRAFTED BY AI</div>
          <h1 style={{
            margin: "2px 0 0", fontFamily: "var(--font-display)",
            fontSize: 32, fontWeight: 500, letterSpacing: "-0.035em", lineHeight: 1,
          }}>Ready to send</h1>
          <div style={{ marginTop: 10, fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5 }}>
            Six replies, one shortlist, one nudge. Approve in 1 tap — or send everything.
          </div>
        </div>

        {/* batch action */}
        <div style={{ padding: "0 20px 12px" }}>
          <button style={{
            width: "100%", height: 48, borderRadius: 14, border: "none",
            background: "var(--aurora)", color: "#fff",
            fontSize: 14, fontWeight: 500,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            boxShadow: "0 8px 24px oklch(0.62 0.18 270 / 0.4)",
          }}>
            <Icon name="check" size={18} color="#fff" stroke={2} />
            Send all 8 follow-ups
          </button>
        </div>

        {/* list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
          <FollowUp
            who="Sophia Marchetti" channel="WhatsApp"
            preview={'"Saturday 14:00 confirmed. Parking is one spot included — there\'s a second available at €120/month if you\'d like."'}
            because="She asked about parking · keeps Sat 14:00 visit on calendar"
            priority="high"
          />
          <FollowUp
            who="Pierre Aubert" channel="Email"
            preview={'"Following up on the revised offer — any thoughts? I can adjust the closing timeline if helpful."'}
            because="2 days quiet · last sentiment was warm"
            priority="med"
          />
          <FollowUp
            who="Camille Vidal" channel="WhatsApp"
            preview={'"Two new listings just dropped in the 5th — 68m² with terrace, and an 82m² near Jardin du Luxembourg. Sending photos."'}
            because="She asked for 5e options · two new matches today"
            priority="med"
          />
          <FollowUp
            who="Théo Beaumont" channel="WhatsApp"
            preview={'"Quick update — Marais flat at 12 Rue Vieille du Temple is now available for visits. Want to see it Friday?"'}
            because="92% match · he's been waiting on Marais"
            priority="high"
          />
        </div>
      </div>
    </IOSDevice>
  );
}

function FollowUp({ who, channel, preview, because, priority }) {
  const colors = {
    high: { dot: "oklch(0.62 0.18 25)", label: "high" },
    med: { dot: "oklch(0.72 0.14 75)", label: "med" },
  };
  const c = colors[priority];
  return (
    <div style={{
      padding: 14, borderRadius: 16, background: "#fff",
      border: "1px solid var(--line)",
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.dot }}/>
        <span style={{ fontSize: 14, fontWeight: 500 }}>{who}</span>
        <span className="k-mono">· {channel}</span>
        <span className="k-mono" style={{ marginLeft: "auto" }}>{c.label}</span>
      </div>
      <div style={{
        padding: 12, borderRadius: 12,
        background: "var(--paper-2)",
        fontSize: 13, color: "var(--ink-1)", lineHeight: 1.5, letterSpacing: "-0.005em",
      }}>{preview}</div>
      <div style={{
        fontSize: 11, color: "oklch(0.4 0.15 275)",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--aurora)" }}/>
        {because}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button style={{
          flex: 1, height: 38, borderRadius: 10, border: "none",
          background: "var(--ink-0)", color: "#fff", fontSize: 13, fontWeight: 500,
        }}>Send</button>
        <button style={{
          height: 38, padding: "0 14px", borderRadius: 10,
          background: "#fff", color: "var(--ink-2)", border: "1px solid var(--line)",
          fontSize: 13, fontWeight: 500,
        }}>Edit</button>
        <button style={{
          height: 38, padding: "0 14px", borderRadius: 10,
          background: "transparent", color: "var(--ink-4)", border: "none",
          fontSize: 13, fontWeight: 500,
        }}>Skip</button>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────
// 9) VOICE CRM
// ───────────────────────────────────────────────
function ScreenVoiceCRM() {
  return (
    <IOSDevice width={SW} height={SH} dark>
      <div className="k-screen" style={{
        height: "100%", display: "flex", flexDirection: "column",
        background: "var(--g-0)", color: "var(--g-ink)", paddingTop: 54,
        position: "relative", overflow: "hidden",
      }}>
        {/* atmosphere */}
        <div style={{
          position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)",
          width: 360, height: 360, borderRadius: "50%",
          background: "var(--aurora)", filter: "blur(80px)", opacity: 0.18,
        }}/>

        {/* header */}
        <div style={{ position: "relative", padding: "12px 20px 0", display: "flex", justifyContent: "space-between" }}>
          <Icon name="chevL" size={22} color="var(--g-ink)" />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "oklch(0.6 0.18 25)", animation: "k-pulse 1s infinite" }}/>
            <span className="k-mono" style={{ color: "oklch(0.7 0.13 25)" }}>RECORDING 0:42</span>
          </div>
          <Icon name="more" size={22} color="var(--g-ink)" />
        </div>

        {/* Orb + label */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 24px 0" }}>
          <AssistantOrb size={120} listening />
          <div style={{
            marginTop: 24, fontSize: 12, color: "var(--g-ink-3)",
            letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600,
          }}>Talking to Keystone about</div>
          <h2 style={{
            margin: "8px 0 0", fontFamily: "var(--font-display)",
            fontSize: 24, fontWeight: 500, letterSpacing: "-0.025em",
            textAlign: "center", lineHeight: 1.15,
          }}>New lead · Amélie L.</h2>
        </div>

        {/* live transcript + extraction */}
        <div style={{ position: "relative", padding: "24px 20px 16px", flex: 1, overflowY: "auto" }}>
          <div style={{ fontSize: 11, color: "var(--g-ink-3)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>Live transcript</div>
          <p style={{
            margin: 0, fontFamily: "var(--font-display)", fontSize: 18,
            letterSpacing: "-0.015em", lineHeight: 1.45, color: "var(--g-ink)",
          }}>
            "Amélie Laurent, met her at the Saint-Germain open house. Looking for{" "}
            <Hl>a 2-bedroom around 700 to 850 thousand</Hl>, ideally in the{" "}
            <Hl>6th or 7th arrondissement</Hl>. She's flexible on move-in but{" "}
            <Hl>wants an elevator</Hl> — top floor preferred. Call her back{" "}
            <Hl>Friday afternoon</Hl>."
            <span style={{
              display: "inline-block", width: 2, height: 16, background: "var(--aurora-violet)",
              verticalAlign: "middle", marginLeft: 2, animation: "k-pulse 1s infinite",
            }}/>
          </p>

          {/* extracted chips */}
          <div style={{ marginTop: 24, fontSize: 11, color: "var(--g-ink-3)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--aurora)" }}/>
              Keystone extracted
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <ExtractedChip k="Name" v="Amélie Laurent" />
            <ExtractedChip k="Source" v="Saint-Germain open house" />
            <ExtractedChip k="Budget" v="€ 700K – 850K" />
            <ExtractedChip k="Area" v="6e, 7e arrondissement" />
            <ExtractedChip k="Must-have" v="Elevator · top floor preferred" />
            <ExtractedChip k="Follow-up" v="Call Friday afternoon" />
          </div>
        </div>

        {/* big record stop */}
        <div style={{ position: "relative", padding: "16px 20px 32px", display: "flex", justifyContent: "center", gap: 16 }}>
          <button style={{
            width: 60, height: 60, borderRadius: "50%",
            background: "var(--g-2)", border: "1px solid var(--g-line)", color: "var(--g-ink-2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}><Icon name="x" size={22} color="currentColor" /></button>
          <button style={{
            height: 60, padding: "0 28px", borderRadius: 9999,
            background: "#fff", color: "var(--ink-0)", border: "none",
            fontSize: 15, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 10,
            boxShadow: "0 12px 32px rgba(255,255,255,0.15)",
          }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: "oklch(0.6 0.18 25)" }}/>
            Save · create lead
          </button>
        </div>
      </div>
    </IOSDevice>
  );
}

function Hl({ children }) {
  return (
    <span style={{
      background: "linear-gradient(180deg, transparent 60%, oklch(0.62 0.18 270 / 0.35) 60%)",
      color: "var(--g-ink)", fontWeight: 500,
    }}>{children}</span>
  );
}

function ExtractedChip({ k, v }) {
  return (
    <div style={{
      padding: "10px 14px", borderRadius: 12,
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", gap: 12,
    }}>
      <span style={{ fontSize: 11, color: "var(--g-ink-3)", width: 80, letterSpacing: "0.02em", textTransform: "uppercase" }}>{k}</span>
      <span style={{ fontSize: 13, fontWeight: 500, color: "var(--g-ink)", flex: 1, letterSpacing: "-0.005em" }}>{v}</span>
      <Icon name="check" size={14} color="oklch(0.7 0.13 155)" stroke={2.2} />
    </div>
  );
}

// ───────────────────────────────────────────────
// 10) SMART MATCHING FEED
// ───────────────────────────────────────────────
function ScreenMatching() {
  return (
    <IOSDevice width={SW} height={SH}>
      <div className="k-screen" style={{
        height: "100%", display: "flex", flexDirection: "column",
        background: "var(--paper)", paddingTop: 54,
      }}>
        {/* header */}
        <div style={{ padding: "12px 20px 16px" }}>
          <div className="k-mono" style={{ color: "var(--ink-4)" }}>FOR SOPHIA · 14 MATCHES TODAY</div>
          <h1 style={{
            margin: "2px 0 0", fontFamily: "var(--font-display)",
            fontSize: 32, fontWeight: 500, letterSpacing: "-0.035em", lineHeight: 1,
          }}>Matches</h1>
        </div>

        {/* lead selector */}
        <div style={{ padding: "0 20px 16px", display: "flex", gap: 8, overflowX: "auto" }}>
          {[
            { i: "SM", n: "Sophia", g: "0.75 0.10 320, 0.65 0.13 280", active: true, c: 14 },
            { i: "TB", n: "Théo", g: "0.78 0.07 80, 0.65 0.12 50", c: 6 },
            { i: "LK", n: "Léa", g: "0.78 0.10 150, 0.55 0.13 175", c: 9 },
            { i: "CV", n: "Camille", g: "0.75 0.08 0, 0.6 0.13 350", c: 4 },
          ].map((p, idx) => (
            <button key={idx} style={{
              height: 56, padding: "6px 14px 6px 6px", borderRadius: 9999,
              background: p.active ? "var(--ink-0)" : "#fff",
              border: p.active ? "none" : "1px solid var(--line)",
              color: p.active ? "#fff" : "var(--ink-1)",
              display: "flex", alignItems: "center", gap: 10, flexShrink: 0,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: `linear-gradient(135deg, oklch(${p.g.split(",")[0]}), oklch(${p.g.split(",")[1]}))`,
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 500,
              }}>{p.i}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{p.n}</div>
                <div className="k-mono" style={{
                  color: p.active ? "rgba(255,255,255,0.6)" : "var(--ink-4)",
                }}>{p.c} new</div>
              </div>
            </button>
          ))}
        </div>

        {/* card stack */}
        <div style={{ flex: 1, position: "relative", padding: "0 20px" }}>
          {/* back card */}
          <div style={{
            position: "absolute", left: 32, right: 32, top: 16, height: 420,
            borderRadius: 24, background: "#fff",
            border: "1px solid var(--line)", boxShadow: "var(--shadow-2)",
            transform: "scale(0.94) translateY(0)", opacity: 0.6,
          }}/>
          <div style={{
            position: "absolute", left: 26, right: 26, top: 8, height: 432,
            borderRadius: 24, background: "#fff",
            border: "1px solid var(--line)", boxShadow: "var(--shadow-2)",
            transform: "scale(0.97)", opacity: 0.85,
          }}/>
          {/* front card */}
          <div style={{
            position: "absolute", left: 20, right: 20, top: 0,
            borderRadius: 24, background: "#fff", overflow: "hidden",
            border: "1px solid var(--line)", boxShadow: "var(--shadow-3)",
            transform: "rotate(-1.5deg)",
          }}>
            <div className="k-placeholder" style={{ height: 240, borderRadius: 0, position: "relative" }}>
              <span style={{ fontSize: 11 }}>[ property hero · 12 photos ]</span>
              <div style={{
                position: "absolute", top: 12, left: 12, padding: "5px 10px", borderRadius: 9999,
                background: "var(--aurora)", color: "#fff", fontSize: 11, fontWeight: 600,
              }}>92% match</div>
              <div style={{
                position: "absolute", top: 12, right: 12, padding: "5px 10px", borderRadius: 9999,
                background: "rgba(11,11,15,0.85)", color: "#fff", fontSize: 11, fontWeight: 500,
              }}>New today</div>
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.025em" }}>€ 1,095,000</span>
                <span className="k-mono">78 m² · 3 bed</span>
              </div>
              <div style={{ fontSize: 14, color: "var(--ink-1)", marginBottom: 2 }}>12 Rue Vieille du Temple</div>
              <div style={{ fontSize: 12, color: "var(--ink-4)" }}>Marais · 75004</div>

              <div style={{
                marginTop: 14, padding: "10px 12px", borderRadius: 12,
                background: "linear-gradient(180deg, oklch(0.96 0.04 285 / 0.6), oklch(0.96 0.03 270 / 0.3))",
                border: "1px solid oklch(0.62 0.18 270 / 0.15)",
                fontSize: 12, color: "oklch(0.35 0.15 275)", display: "flex", alignItems: "center", gap: 8,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--aurora)" }}/>
                In budget · right area · parking included
              </div>
            </div>
          </div>
        </div>

        {/* swipe actions */}
        <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <SwipeBtn icon="x" color="var(--ink-3)" />
          <SwipeBtn icon="paperclip" color="var(--ink-1)" label="Save to shortlist" big />
          <SwipeBtn icon="send" aurora />
        </div>
        <div style={{ padding: "0 20px 8px", textAlign: "center", fontSize: 12, color: "var(--ink-4)" }}>
          Swipe ← skip · ↑ save · → share with Sophia
        </div>

        <BottomNav active="matches" />
        <div style={{ height: 30 }} />
      </div>
    </IOSDevice>
  );
}

function SwipeBtn({ icon, color = "var(--ink-1)", aurora, big, label }) {
  if (big) {
    return (
      <button style={{
        height: 56, padding: "0 22px", borderRadius: 9999,
        background: "var(--ink-0)", color: "#fff", border: "none",
        fontSize: 13, fontWeight: 500,
        display: "flex", alignItems: "center", gap: 10,
        boxShadow: "var(--shadow-3)",
      }}>
        <Icon name={icon} size={18} color="#fff" /> {label}
      </button>
    );
  }
  return (
    <button style={{
      width: 56, height: 56, borderRadius: "50%",
      background: aurora ? "var(--aurora)" : "#fff",
      border: aurora ? "none" : "1px solid var(--line)",
      color: aurora ? "#fff" : color,
      boxShadow: aurora ? "0 8px 20px oklch(0.62 0.18 270 / 0.4)" : "var(--shadow-1)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Icon name={icon} size={22} color="currentColor" stroke={2} />
    </button>
  );
}

Object.assign(window, {
  ScreenAssistant, ScreenNotifications, ScreenFollowUps, ScreenVoiceCRM, ScreenMatching,
});
