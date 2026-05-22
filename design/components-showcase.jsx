/* global React, Icon, ButtonRow, InputRow, AIPromptInput, VoiceInput, SearchBar, SuggestionChips,
   LeadCard, PropertyCard, ConversationCard, BottomNav, FAB, AITyping, Notification,
   TimelineItem, EmptyState, AssistantOrb */
// KEYSTONE — component showcase frames

function CompFrame({ title, w = 580, h, dark = false, children, label }) {
  return (
    <div style={{
      width: w, padding: 32,
      background: dark ? "var(--g-1)" : "#fff",
      border: dark ? "1px solid var(--g-line)" : "1px solid var(--line)",
      borderRadius: 20,
      color: dark ? "var(--g-ink)" : "var(--ink-1)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
        <h3 style={{
          margin: 0, fontFamily: "var(--font-display)",
          fontSize: 18, fontWeight: 500, letterSpacing: "-0.02em",
        }}>{title}</h3>
        {label && <span className="k-mono" style={{ color: dark ? "var(--g-ink-3)" : "var(--ink-4)" }}>{label}</span>}
      </div>
      <div style={{ minHeight: h }}>{children}</div>
    </div>
  );
}

function ButtonsShowcase()  { return <CompFrame title="Buttons" w={760} label="primary · secondary · outline · ghost · destructive"><ButtonRow/></CompFrame>; }
function InputsShowcase()   { return <CompFrame title="Inputs" w={540} label="text · focused · with hint"><InputRow/></CompFrame>; }
function PromptShowcase()   { return <CompFrame title="AI prompt input" w={620} label="aurora border indicates AI surface"><AIPromptInput/></CompFrame>; }
function VoiceShowcase()    { return <CompFrame title="Voice input" w={620} label="active recording state" dark><VoiceInput/></CompFrame>; }
function SearchShowcase()   { return <CompFrame title="Search" w={540} label="global search bar"><SearchBar/></CompFrame>; }
function ChipsShowcase()    { return <CompFrame title="AI suggestion chips" w={540} label="aurora dot · AI-generated"><SuggestionChips/></CompFrame>; }
function LeadCardShowcase() { return <CompFrame title="Lead card" w={420}><LeadCard/></CompFrame>; }
function PropCardShowcase() { return <CompFrame title="Property card" w={420}><PropertyCard/></CompFrame>; }
function ConvShowcase()     { return <CompFrame title="Conversation card" w={500}><div style={{ display:"flex", flexDirection:"column", gap:10 }}><ConversationCard unread/><ConversationCard name="Léa Khoury" channel="iMessage" snippet="3 photos · garden + facade" time="5h" /><ConversationCard name="Pierre Aubert" channel="Email" snippet="Reviewed term sheet, two notes" time="1d" /></div></CompFrame>; }
function NavShowcase()      {
  return (
    <CompFrame title="Bottom navigation" w={760} label="floating glass · FAB center (AI)">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          <div className="k-label" style={{ marginBottom: 12 }}>Light</div>
          <div style={{ background: "var(--paper)", padding: 0, borderRadius: 14, overflow: "hidden" }}>
            <BottomNav active="inbox" />
          </div>
        </div>
        <div>
          <div className="k-label" style={{ marginBottom: 12 }}>Dark</div>
          <div style={{ background: "var(--g-0)", padding: 0, borderRadius: 14, overflow: "hidden" }}>
            <BottomNav active="inbox" dark />
          </div>
        </div>
      </div>
    </CompFrame>
  );
}
function FABShowcase() {
  return (
    <CompFrame title="FAB · voice CRM" w={300} label="aurora glow ring">
      <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
        <FAB />
      </div>
    </CompFrame>
  );
}
function TypingShowcase() {
  return (
    <CompFrame title="AI states" w={620} label="thinking · listening · idle">
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
        <AITyping />
        <div style={{ display: "flex", gap: 24, alignItems: "center", marginTop: 8 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <AssistantOrb size={72} />
            <span className="k-mono">idle</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <AssistantOrb size={72} listening />
            <span className="k-mono">listening</span>
          </div>
        </div>
      </div>
    </CompFrame>
  );
}
function NotifShowcase() {
  return (
    <CompFrame title="Notifications" w={500}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Notification aurora title="AI follow-up ready" body="Drafted reply for Sophia · review in 1 tap" icon="spark" time="now" />
        <Notification title="Pierre replied" body={'"Sending revised offer this evening."'} />
        <Notification title="Visit reminder" body="Marais flat · today 3:30 PM with Théo" icon="cal" time="2h" />
      </div>
    </CompFrame>
  );
}
function TimelineShowcase() {
  return (
    <CompFrame title="Conversation timeline" w={560} label="messages · voice · AI · visit">
      <div style={{ paddingLeft: 4 }}>
        <TimelineItem isFirst when="Mon · 10:14" who="Sophia" channel="WhatsApp"
          content="Can we visit the Marais flat this weekend?" />
        <TimelineItem when="Mon · 10:14" who="Keystone" channel="AI" type="ai"
          content="Detected: visit request · property #M-128 · weekend"
          ai="Proposed Sat 11:00, Sat 14:00, Sun 10:00 — sent as quick reply" />
        <TimelineItem when="Mon · 10:42" who="Sophia" channel="WhatsApp" type="voice"
          content="Voice note · 0:38 — confirms Saturday, asks about parking" />
        <TimelineItem isLast when="Sat · 14:00" who="You + Sophia" channel="In-person" type="visit"
          content="Property visit · Marais · 12 Rue Vieille du Temple"
          ai="3 photos auto-attached · voice memo transcribed to lead notes" />
      </div>
    </CompFrame>
  );
}
function EmptyShowcase() {
  return (
    <CompFrame title="Empty state" w={360}>
      <EmptyState />
    </CompFrame>
  );
}

Object.assign(window, {
  ButtonsShowcase, InputsShowcase, PromptShowcase, VoiceShowcase, SearchShowcase, ChipsShowcase,
  LeadCardShowcase, PropCardShowcase, ConvShowcase, NavShowcase, FABShowcase, TypingShowcase,
  NotifShowcase, TimelineShowcase, EmptyShowcase,
});
