import type { ReactNode } from "react";

import { cn } from "../src/lib/cn";
import { Icon, type KeystoneIconName } from "./icon";

export function KeystoneCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("k-card", className)}>{children}</div>;
}

export function LeadCard({
  aiAction = "Schedule visit · confirm property",
  area = "Marais · 11e",
  budget = "€ 950K - 1.1M",
  initials = "SM",
  lastMsg = "Can we move Saturday's viewing to noon?",
  name = "Sophia Marchetti",
  source = "WhatsApp",
  status = "qualified",
  time = "12m",
  unread = 2,
}: {
  aiAction?: string;
  area?: string;
  budget?: string;
  initials?: string;
  lastMsg?: string;
  name?: string;
  source?: string;
  status?: string;
  time?: string;
  unread?: number;
}) {
  return (
    <KeystoneCard className="flex flex-col gap-3 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,oklch(0.75_0.10_320),oklch(0.65_0.13_280))] font-display text-base font-medium text-white">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-medium tracking-normal text-ink-1">{name}</span>
            <span className="k-pill h-5 bg-[oklch(0.92_0.08_155_/_0.5)] px-2 text-[11px] text-[oklch(0.4_0.12_155)]">
              {status}
            </span>
          </div>
          <div className="mt-0.5 text-xs text-ink-4">
            {area} · {budget}
          </div>
        </div>
        <span className="k-mono">{time}</span>
      </div>
      <p className="line-clamp-2 text-[13px] leading-[1.45] tracking-normal text-ink-2">
        &quot;{lastMsg}&quot;
      </p>
      <div className="flex items-center gap-2.5 rounded-2 border border-[oklch(0.62_0.18_270_/_0.15)] bg-ai-surface px-3 py-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-aurora shadow-[0_0_8px_oklch(0.62_0.18_270_/_0.5)]" />
        <span className="flex-1 text-xs font-medium text-ink-1">{aiAction}</span>
        <Icon color="var(--ink-2)" name="arrow" size={14} />
      </div>
      <div className="flex items-center gap-3 text-[11px] text-ink-4">
        <span className="flex items-center gap-1">
          <Icon name="message" size={12} />
          {source}
        </span>
        {unread > 0 ? (
          <span className="rounded-pill bg-ink-0 px-1.5 py-px text-[10px] font-semibold text-white">
            {unread} new
          </span>
        ) : null}
      </div>
    </KeystoneCard>
  );
}

export function Notification({
  aurora = false,
  body = '"Saturday at noon works. See you then."',
  icon = "message",
  time = "now",
  title = "Sophia replied",
}: {
  aurora?: boolean;
  body?: string;
  icon?: KeystoneIconName;
  time?: string;
  title?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-3 border p-3.5",
        aurora
          ? "border-[oklch(0.62_0.18_270_/_0.2)] bg-[linear-gradient(180deg,oklch(0.96_0.04_285_/_0.6),#fff)]"
          : "border-line bg-white",
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-2",
          aurora ? "bg-aurora text-white" : "bg-paper-2 text-ink-2",
        )}
      >
        <Icon name={icon} size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-sm font-medium text-ink-1">{title}</span>
          <span className="k-mono">{time}</span>
        </div>
        <p className="mt-1 text-[13px] leading-[1.4] text-ink-3">{body}</p>
      </div>
    </div>
  );
}
