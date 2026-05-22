/* global React */
// KEYSTONE — foundations: brand, color, type, space, radii, shadows, motion

// ═══════════════════════════════════════════════════════════════
// BRAND MARK — the keystone (an arch wedge / faceted diamond)
// ═══════════════════════════════════════════════════════════════
function KeystoneMark({ size = 40, light = false }) {
  const aurora = "url(#k-aurora-grad)";
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="k-aurora-grad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="oklch(0.74 0.17 295)" />
          <stop offset="50%" stopColor="oklch(0.62 0.18 270)" />
          <stop offset="100%" stopColor="oklch(0.66 0.15 240)" />
        </linearGradient>
        <linearGradient id="k-aurora-grad-light" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="oklch(0.82 0.13 295)" />
          <stop offset="100%" stopColor="oklch(0.72 0.14 250)" />
        </linearGradient>
      </defs>
      {/* keystone: a wedge / trapezoid stack forming an arch keystone */}
      <path
        d="M20 3 L33 14 L33 30 L20 37 L7 30 L7 14 Z"
        fill={light ? "url(#k-aurora-grad-light)" : aurora}
      />
      <path
        d="M20 3 L33 14 L20 21 L7 14 Z"
        fill="rgba(255,255,255,0.20)"
      />
      <path
        d="M20 21 L33 14 L33 30 L20 37 Z"
        fill="rgba(0,0,0,0.12)"
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// COVER / BRAND DIRECTION
// ═══════════════════════════════════════════════════════════════
function BrandCover() {
  return (
    <div style={{
      width: 1200, height: 720, position: "relative", overflow: "hidden",
      background: "var(--ink-0)", color: "#fff", borderRadius: 24,
    }}>
      {/* aurora background */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(80% 60% at 20% 30%, oklch(0.45 0.18 290 / 0.45), transparent 60%), radial-gradient(70% 50% at 90% 80%, oklch(0.45 0.16 250 / 0.45), transparent 60%)",
      }} />
      {/* grain / grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.4,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      {/* top bar */}
      <div style={{
        position: "absolute", top: 40, left: 56, right: 56,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "var(--font-mono)", fontSize: 11,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.5)",
      }}>
        <span>KEYSTONE / DESIGN SYSTEM v1.0</span>
        <span>2026 · MOBILE-FIRST</span>
      </div>

      {/* center */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <KeystoneMark size={56} />
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: 36, fontWeight: 500, letterSpacing: "-0.04em",
          }}>Keystone</span>
        </div>

        <h1 style={{
          fontFamily: "var(--font-display)", margin: 0,
          fontSize: 88, lineHeight: 0.95, fontWeight: 500,
          letterSpacing: "-0.045em", maxWidth: 900,
        }}>
          The operating system<br/>
          <span style={{
            background: "var(--aurora)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>for real estate.</span>
        </h1>

        <p style={{
          marginTop: 32, maxWidth: 560,
          fontSize: 19, lineHeight: 1.55, color: "rgba(255,255,255,0.65)",
          letterSpacing: "-0.01em",
        }}>
          The CRM disappears behind conversations and AI. Talk, message, record,
          photograph — Keystone listens, extracts, files, follows up.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 44 }}>
          {["AI-native", "Mobile-first", "Conversation-first", "WhatsApp-centric"].map(t => (
            <div key={t} style={{
              padding: "6px 14px", borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.04)",
              fontSize: 12, fontWeight: 500, letterSpacing: "-0.01em",
              color: "rgba(255,255,255,0.85)",
            }}>{t}</div>
          ))}
        </div>
      </div>

      {/* bottom corner — version chip */}
      <div style={{
        position: "absolute", bottom: 40, right: 56,
        display: "flex", alignItems: "center", gap: 10,
        fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.5)",
      }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "oklch(0.7 0.16 155)" }} />
        LIVE · KS-2026.05
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DESIGN PRINCIPLES
// ═══════════════════════════════════════════════════════════════
function Principles() {
  const ps = [
    { n: "01", t: "Conversation creates the CRM",
      d: "Records are a byproduct of talking. Users never fill forms; AI extracts structure from messages, voice, and photos." },
    { n: "02", t: "Thumb-first, one-handed",
      d: "Every primary action sits in the lower third. Nav, compose, and AI are all reachable without a grip shift." },
    { n: "03", t: "AI is ambient, not announced",
      d: "Suggestions surface as soft glows and gentle chips. We avoid robot icons, sparkles in every corner, and verbose copy." },
    { n: "04", t: "Calm by default, fast on demand",
      d: "Generous whitespace, restrained motion. When work happens, it happens instantly — under 200ms perceived latency." },
    { n: "05", t: "Truth lives in the timeline",
      d: "The conversation is the source of truth. Every CRM field links back to the message, voice note, or photo that created it." },
    { n: "06", t: "Premium, not corporate",
      d: "Editorial typography, ink-and-paper palette, aurora accent. We aim for a luxury productivity tool, not enterprise software." },
  ];
  return (
    <div style={{
      width: 1200, padding: 48, background: "#fff",
      border: "1px solid var(--line)", borderRadius: 24,
    }}>
      <div className="k-section-title" style={{ marginBottom: 32 }}>Design principles</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32 }}>
        {ps.map(p => (
          <div key={p.n}>
            <div className="k-mono" style={{ marginBottom: 12 }}>{p.n}</div>
            <h3 style={{
              fontFamily: "var(--font-display)", margin: "0 0 10px",
              fontSize: 22, fontWeight: 500, letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}>{p.t}</h3>
            <p style={{
              margin: 0, fontSize: 14, lineHeight: 1.55,
              color: "var(--ink-3)", letterSpacing: "-0.005em",
            }}>{p.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// COLOR
// ═══════════════════════════════════════════════════════════════
function Swatch({ name, value, hex, dark = false, big = false }) {
  return (
    <div>
      <div style={{
        height: big ? 120 : 80,
        borderRadius: 14,
        background: value,
        border: "1px solid var(--line)",
        boxShadow: dark ? "var(--shadow-1)" : "none",
      }} />
      <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "-0.01em" }}>{name}</span>
        <span className="k-mono">{hex}</span>
      </div>
    </div>
  );
}

function ColorSystem() {
  return (
    <div style={{
      width: 1200, padding: 48, background: "#fff",
      border: "1px solid var(--line)", borderRadius: 24,
    }}>
      <div className="k-section-title" style={{ marginBottom: 32 }}>Color</div>

      {/* Aurora hero */}
      <div style={{
        display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32, marginBottom: 48,
      }}>
        <div style={{
          height: 280, borderRadius: 20, position: "relative", overflow: "hidden",
          background: "var(--aurora)",
        }}>
          <div style={{ position: "absolute", inset: 0,
            background: "radial-gradient(60% 40% at 70% 30%, rgba(255,255,255,0.25), transparent 60%)" }} />
          <div style={{
            position: "absolute", bottom: 24, left: 24, color: "#fff",
            fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500,
            letterSpacing: "-0.025em",
          }}>Aurora</div>
          <div style={{
            position: "absolute", bottom: 24, right: 24,
            fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.7)",
          }}>linear-gradient · 135°</div>
        </div>
        <div>
          <h3 style={{
            fontFamily: "var(--font-display)", margin: "0 0 12px",
            fontSize: 22, fontWeight: 500, letterSpacing: "-0.025em",
          }}>The aurora signature</h3>
          <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-3)", margin: "0 0 20px" }}>
            One gradient does all the AI lifting. Violet→indigo→blue, used sparingly:
            on the AI orb, suggestion borders, primary CTAs, and progress states.
            Never as a flat background.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["violet", "oklch(0.70 0.17 295)", "#9B7DFF"],
              ["indigo", "oklch(0.62 0.18 270)", "#7C6BF1"],
              ["blue",   "oklch(0.66 0.15 240)", "#5F92E8"],
            ].map(([n, c, h]) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: c }} />
                <span style={{ fontSize: 13, fontWeight: 500, width: 60 }}>{n}</span>
                <span className="k-mono">{c}</span>
                <span className="k-mono" style={{ marginLeft: "auto" }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Paper scale */}
      <div className="k-label" style={{ marginBottom: 16 }}>Paper · light surfaces</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, marginBottom: 40 }}>
        <Swatch name="paper" value="#FAFAF7" hex="#FAFAF7" />
        <Swatch name="paper-2" value="#F4F3EE" hex="#F4F3EE" />
        <Swatch name="paper-3" value="#ECEAE3" hex="#ECEAE3" />
        <Swatch name="ink-5" value="#B7B8C5" hex="#B7B8C5" />
        <Swatch name="ink-4" value="#8A8C9C" hex="#8A8C9C" />
        <Swatch name="ink-3" value="#56586A" hex="#56586A" />
      </div>

      {/* Graphite scale */}
      <div className="k-label" style={{ marginBottom: 16 }}>Graphite · dark surfaces</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, marginBottom: 40 }}>
        <Swatch name="g-0" value="#0A0A0E" hex="#0A0A0E" dark />
        <Swatch name="g-1" value="#0F0F14" hex="#0F0F14" dark />
        <Swatch name="g-2" value="#15151C" hex="#15151C" dark />
        <Swatch name="g-3" value="#1D1D26" hex="#1D1D26" dark />
        <Swatch name="g-4" value="#2A2A35" hex="#2A2A35" dark />
        <Swatch name="ink-1" value="#16161C" hex="#16161C" dark />
      </div>

      {/* Semantic */}
      <div className="k-label" style={{ marginBottom: 16 }}>Semantic</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <Swatch name="accent" value="oklch(0.62 0.18 275)" hex="aurora" />
        <Swatch name="positive" value="oklch(0.65 0.13 155)" hex="confirmed" />
        <Swatch name="warning" value="oklch(0.72 0.14 75)" hex="follow-up" />
        <Swatch name="danger" value="oklch(0.62 0.18 25)" hex="overdue" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TYPOGRAPHY
// ═══════════════════════════════════════════════════════════════
function Typography() {
  const scale = [
    ["Display XL", 64, 500, -0.045, "Display"],
    ["Display L",  44, 500, -0.04, "Display"],
    ["Title 1",    28, 500, -0.025, "Display"],
    ["Title 2",    22, 500, -0.02, "Display"],
    ["Title 3",    18, 500, -0.015, "Display"],
    ["Body L",     17, 400, -0.01, "Text"],
    ["Body",       15, 400, -0.005, "Text"],
    ["Body S",     13, 400, 0, "Text"],
    ["Caption",    11, 500, 0.02, "Text"],
    ["Mono",       11, 400, 0.05, "Mono"],
  ];
  return (
    <div style={{
      width: 1200, padding: 48, background: "#fff",
      border: "1px solid var(--line)", borderRadius: 24,
    }}>
      <div className="k-section-title" style={{ marginBottom: 32 }}>Typography</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 48 }}>
        <div style={{ background: "var(--paper)", borderRadius: 16, padding: 32, border: "1px solid var(--line)" }}>
          <div className="k-mono" style={{ marginBottom: 12 }}>DISPLAY · Inter Tight</div>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: 88, fontWeight: 500,
            letterSpacing: "-0.045em", lineHeight: 0.95,
          }}>Aa</div>
          <div style={{
            marginTop: 16, fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5,
          }}>Used for screen titles, hero numbers, AI summaries. Optical sizing on,
          tight tracking, weight 500. Never 700+ — Keystone is editorial, not loud.</div>
        </div>
        <div style={{ background: "var(--paper)", borderRadius: 16, padding: 32, border: "1px solid var(--line)" }}>
          <div className="k-mono" style={{ marginBottom: 12 }}>TEXT · Inter</div>
          <div style={{
            fontFamily: "var(--font-text)", fontSize: 88, fontWeight: 400,
            letterSpacing: "-0.02em", lineHeight: 0.95,
          }}>Aa</div>
          <div style={{
            marginTop: 16, fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5,
          }}>Body, captions, metadata. Regular & medium weights only. Mono cut
          ("JetBrains Mono") used for timestamps, status, ID-like data.</div>
        </div>
      </div>

      {/* Scale */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {scale.map(([name, sz, w, tr, fam]) => (
          <div key={name} style={{
            display: "grid", gridTemplateColumns: "120px 80px 60px 80px 1fr",
            alignItems: "baseline", padding: "14px 0",
            borderBottom: "1px solid var(--line-soft)",
            gap: 16,
          }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{name}</span>
            <span className="k-mono">{sz}px</span>
            <span className="k-mono">w {w}</span>
            <span className="k-mono">{tr}em</span>
            <span style={{
              fontFamily: fam === "Display" ? "var(--font-display)" : fam === "Mono" ? "var(--font-mono)" : "var(--font-text)",
              fontSize: Math.min(sz, 32), fontWeight: w, letterSpacing: `${tr}em`,
              color: "var(--ink-1)",
              textTransform: name === "Caption" ? "uppercase" : "none",
            }}>The keystone of every deal</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SPACING / RADII / SHADOWS / MOTION
// ═══════════════════════════════════════════════════════════════
function SpaceRadiiShadows() {
  return (
    <div style={{
      width: 1200, padding: 48, background: "#fff",
      border: "1px solid var(--line)", borderRadius: 24,
    }}>
      <div className="k-section-title" style={{ marginBottom: 32 }}>Spacing · Radii · Shadows · Motion</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        {/* SPACING */}
        <div>
          <div className="k-label" style={{ marginBottom: 16 }}>Spacing — 4px base</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[[1,4],[2,8],[3,12],[4,16],[5,20],[6,24],[7,32],[8,40],[9,56],[10,72]].map(([i, px]) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span className="k-mono" style={{ width: 28 }}>s-{i}</span>
                <span className="k-mono" style={{ width: 40 }}>{px}px</span>
                <div style={{ height: 8, width: px, background: "var(--aurora)", borderRadius: 2 }} />
              </div>
            ))}
          </div>
        </div>

        {/* RADII */}
        <div>
          <div className="k-label" style={{ marginBottom: 16 }}>Radii</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {[["r-1",6],["r-2",10],["r-3",14],["r-4",18],["r-5",22],["r-6",28]].map(([n,r]) => (
              <div key={n} style={{
                aspectRatio: "1", background: "var(--paper-2)",
                border: "1px solid var(--line)",
                borderRadius: r,
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                padding: 12,
              }}>
                <span className="k-mono">{n}</span>
                <span className="k-mono">{r}px</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: "var(--ink-4)", lineHeight: 1.5 }}>
            r-4 (18) is default for cards. r-6 (28) for sheets & modals. r-pill for chips & FAB.
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: "var(--line)", margin: "40px 0" }} />

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40 }}>
        {/* SHADOWS */}
        <div>
          <div className="k-label" style={{ marginBottom: 16 }}>Elevation</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              ["shadow-1", "rest"],
              ["shadow-2", "card"],
              ["shadow-3", "sheet"],
              ["shadow-4", "modal"],
            ].map(([n, label]) => (
              <div key={n}>
                <div style={{
                  height: 80, background: "#fff", borderRadius: 14,
                  boxShadow: `var(--${n})`,
                }} />
                <div className="k-mono" style={{ marginTop: 10 }}>{n}</div>
                <div style={{ fontSize: 12, color: "var(--ink-4)" }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <div style={{
              height: 80, background: "#fff", borderRadius: 14,
              boxShadow: "var(--shadow-glow)",
            }} />
            <div className="k-mono" style={{ marginTop: 10 }}>shadow-glow</div>
            <div style={{ fontSize: 12, color: "var(--ink-4)" }}>used only on the AI orb & primary CTA hover</div>
          </div>
        </div>

        {/* MOTION */}
        <div>
          <div className="k-label" style={{ marginBottom: 16 }}>Motion</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["dur-1", "120ms", "micro · tap, hover"],
              ["dur-2", "200ms", "small · chips, toggles"],
              ["dur-3", "320ms", "medium · sheets, modals"],
              ["dur-4", "520ms", "large · screen transitions"],
            ].map(([n, ms, use]) => (
              <div key={n} style={{ display: "grid", gridTemplateColumns: "80px 80px 1fr", alignItems: "center", gap: 12 }}>
                <span className="k-mono">{n}</span>
                <span className="k-mono">{ms}</span>
                <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{use}</span>
              </div>
            ))}
            <div style={{ height: 1, background: "var(--line)", margin: "8px 0" }} />
            {[
              ["ease-out", "0.2, 0.8, 0.2, 1", "default"],
              ["ease-in-out", "0.65, 0, 0.35, 1", "transitions"],
              ["ease-spring", "0.34, 1.56, 0.64, 1", "AI suggestions appear"],
            ].map(([n, c, use]) => (
              <div key={n} style={{ display: "grid", gridTemplateColumns: "100px 1fr 130px", alignItems: "center", gap: 12 }}>
                <span className="k-mono">{n}</span>
                <span className="k-mono">{c}</span>
                <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{use}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ICONOGRAPHY
// ═══════════════════════════════════════════════════════════════
function Iconography() {
  const icons = [
    { n: "inbox", svg: <><path d="M4 13l3-8h10l3 8" /><path d="M4 13v6h16v-6" /><path d="M4 13h5l1 2h4l1-2h5" /></> },
    { n: "message", svg: <><path d="M4 6h16v11H8l-4 3z" /></> },
    { n: "voice", svg: <><rect x="10" y="3" width="4" height="12" rx="2" /><path d="M6 12a6 6 0 0012 0" /><path d="M12 18v3" /></> },
    { n: "lead", svg: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1-4 4-6 7-6s6 2 7 6" /></> },
    { n: "home", svg: <><path d="M4 11l8-7 8 7v9h-5v-6h-6v6H4z" /></> },
    { n: "calendar", svg: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 9h16M9 3v4M15 3v4" /></> },
    { n: "spark", svg: <><path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z" /></> },
    { n: "search", svg: <><circle cx="11" cy="11" r="6" /><path d="M16 16l4 4" /></> },
    { n: "filter", svg: <><path d="M4 5h16l-6 8v6l-4-2v-4z" /></> },
    { n: "send", svg: <><path d="M4 12l16-8-6 16-2-7z" /></> },
    { n: "camera", svg: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7l2-3h2l2 3" /><circle cx="12" cy="13" r="3.5" /></> },
    { n: "pin", svg: <><path d="M12 3c-3 0-5 2-5 5 0 4 5 12 5 12s5-8 5-12c0-3-2-5-5-5z" /><circle cx="12" cy="8" r="1.5" /></> },
    { n: "bell", svg: <><path d="M6 16v-5a6 6 0 0112 0v5l2 2H4z" /><path d="M10 21a2 2 0 004 0" /></> },
    { n: "check", svg: <><path d="M5 12l4 4 10-10" /></> },
    { n: "more", svg: <><circle cx="6" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="18" cy="12" r="1.5" /></> },
    { n: "arrow", svg: <><path d="M5 12h14M13 6l6 6-6 6" /></> },
  ];
  return (
    <div style={{
      width: 1200, padding: 48, background: "#fff",
      border: "1px solid var(--line)", borderRadius: 24,
    }}>
      <div className="k-section-title" style={{ marginBottom: 8 }}>Iconography</div>
      <p style={{ margin: "0 0 32px", fontSize: 13, color: "var(--ink-3)", maxWidth: 560 }}>
        Custom stroke set. 24×24 grid, 1.5px stroke, round caps & joins, no fills.
        Built to read at 20px on a phone. Aurora accent reserved for AI-only icons.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 1, background: "var(--line)" }}>
        {icons.map(({ n, svg }) => (
          <div key={n} style={{
            background: "#fff", aspectRatio: "1",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="var(--ink-1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {svg}
            </svg>
            <span className="k-mono">{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  KeystoneMark, BrandCover, Principles, ColorSystem, Typography, SpaceRadiiShadows, Iconography,
});
