import { Icon } from "./icon";

export function AIPromptInput({
  suggestions = ["Draft reply to Sophia", "Find 3-bed in Marais < €1.2M", "Recap yesterday"],
}: {
  suggestions?: string[];
}) {
  return (
    <div className="rounded-4 bg-aurora p-0.5">
      <div className="flex flex-col gap-3 rounded-[16px] bg-white px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="h-6 w-6 rounded-full bg-aurora shadow-[0_0_12px_oklch(0.62_0.18_270_/_0.5)]" />
          <span className="text-sm tracking-normal text-ink-3">Ask Keystone or paste a message</span>
          <span className="k-mono ml-auto">⌘K</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((suggestion) => (
            <button
              className="h-7 rounded-pill border border-line bg-paper px-3 text-xs font-medium text-ink-2"
              key={suggestion}
              type="button"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function VoiceInput({ seconds = "0:42" }: { seconds?: string }) {
  return (
    <div className="flex items-center gap-3.5 rounded-4 bg-ink-0 p-4 text-white">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-aurora shadow-[0_0_24px_oklch(0.7_0.17_290_/_0.6)]">
        <Icon color="#fff" name="voice" size={20} stroke={2} />
      </div>
      <div className="flex flex-1 items-center gap-[3px]">
        {Array.from({ length: 32 }).map((_, index) => {
          const height = 4 + Math.abs(Math.sin(index * 0.7)) * 24;

          return (
            <div
              className={
                index < 22
                  ? "w-[3px] rounded-[2px] bg-[linear-gradient(180deg,oklch(0.78_0.14_285),oklch(0.66_0.15_240))]"
                  : "w-[3px] rounded-[2px] bg-white/20"
              }
              key={index}
              style={{ height }}
            />
          );
        })}
      </div>
      <span className="k-mono text-white/70">{seconds}</span>
    </div>
  );
}

export function SuggestionChips({
  chips = [
    { ai: true, text: "Reply: confirm Saturday viewing" },
    { ai: true, text: "Add Sophia to Marais shortlist" },
    { ai: false, text: "Mark as qualified" },
    { ai: true, text: "Schedule callback · Tue 4pm" },
  ],
}: {
  chips?: Array<{ ai?: boolean; text: string }>;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {chips.map((chip) => (
        <button
          className="flex items-center gap-2.5 rounded-3 border border-line bg-white px-3.5 py-2.5 text-left shadow-[0_0_0_1px_oklch(0.62_0.18_270_/_0.10),0_4px_16px_oklch(0.62_0.18_270_/_0.06)]"
          key={chip.text}
          type="button"
        >
          {chip.ai ? (
            <span className="h-2 w-2 rounded-full bg-aurora shadow-[0_0_8px_oklch(0.62_0.18_270_/_0.6)]" />
          ) : null}
          <span className="flex-1 text-sm text-ink-1">{chip.text}</span>
          <Icon color="var(--ink-3)" name="arrow" size={16} />
        </button>
      ))}
    </div>
  );
}

export function AITyping({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={
        dark
          ? "inline-flex items-center gap-2.5 rounded-3 border border-graphite-line bg-graphite-2 px-3.5 py-2.5"
          : "inline-flex items-center gap-2.5 rounded-3 border border-line bg-paper-2 px-3.5 py-2.5"
      }
    >
      <span className="h-[18px] w-[18px] rounded-full bg-aurora" />
      <span className={dark ? "text-[13px] font-medium text-graphite-ink-2" : "text-[13px] font-medium text-ink-2"}>
        Keystone is thinking
      </span>
      <span className="flex h-2 items-center gap-1">
        <span className="k-typing-dot" />
        <span className="k-typing-dot" />
        <span className="k-typing-dot" />
      </span>
    </div>
  );
}

export function AssistantOrb({ listening = false, size = 96 }: { listening?: boolean; size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ height: size, width: size }}>
      <div className="k-aurora-ring absolute inset-0 rounded-full opacity-70 blur-lg" />
      <div
        className="relative flex items-center justify-center rounded-full bg-aurora shadow-[inset_0_-8px_16px_rgba(0,0,0,0.25),inset_0_8px_16px_rgba(255,255,255,0.2)]"
        style={{ height: size - 16, width: size - 16 }}
      >
        {listening ? (
          <div className="flex items-center gap-[3px]">
            {[10, 16, 28, 16, 10].map((height, index) => (
              <span
                className="rounded-[2px] bg-white/95 animate-[k-pulse_1s_var(--ease-in-out)_infinite]"
                key={`${height}-${index}`}
                style={{ height, width: 3 }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
