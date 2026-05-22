import type { ReactNode } from "react";

import { cn } from "../src/lib/cn";
import { Icon, type KeystoneIconName } from "./icon";

export type TimelineTone = "ai" | "message" | "summary" | "task" | "workflow";

const toneIcons: Record<TimelineTone, KeystoneIconName> = {
  ai: "spark",
  message: "message",
  summary: "inbox",
  task: "check",
  workflow: "filter",
};

const toneDotClass: Record<TimelineTone, string> = {
  ai: "bg-aurora-violet shadow-[0_0_8px_oklch(0.62_0.18_270_/_0.5)]",
  message: "bg-ink-4",
  summary: "bg-aurora-indigo",
  task: "bg-positive",
  workflow: "bg-warning",
};

export function ConversationTimeline({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("k-screen flex flex-col px-4 py-5", className)}>{children}</div>;
}

export function ConversationTimelineItem({
  action,
  children,
  isFirst = false,
  isLast = false,
  meta,
  title,
  tone = "message",
}: {
  action?: ReactNode;
  children: ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  meta?: string;
  title: string;
  tone?: TimelineTone;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex w-4 flex-col items-center">
        {!isFirst ? <div className="h-2 w-px bg-line" /> : null}
        <div className={cn("h-2.5 w-2.5 rounded-full", toneDotClass[tone])} />
        {!isLast ? <div className="min-h-6 flex-1 bg-line" /> : null}
      </div>
      <article className="flex-1 pb-5">
        <header className="mb-1.5 flex items-center gap-2">
          <Icon color="var(--ink-4)" name={toneIcons[tone]} size={13} />
          <span className="text-[13px] font-medium text-ink-1">{title}</span>
          {meta ? <span className="k-mono ml-auto">{meta}</span> : null}
        </header>
        <div
          className={cn(
            "rounded-2 text-sm leading-6 text-ink-1",
            tone === "message" ? "bg-transparent p-0" : "border border-line bg-paper-2 px-3 py-2.5",
          )}
        >
          {children}
        </div>
        {action ? (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[oklch(0.5_0.15_275)]">
            <span className="h-1 w-1 rounded-full bg-aurora" />
            {action}
          </div>
        ) : null}
      </article>
    </div>
  );
}

export function MessageBubble({
  children,
  from = "participant",
}: {
  children: ReactNode;
  from?: "assistant" | "participant" | "system" | "user";
}) {
  const isAssistant = from === "assistant";
  const isSystem = from === "system";

  return (
    <div
      className={cn(
        "max-w-[92%] rounded-4 px-3.5 py-3 text-[14px] leading-6 shadow-1",
        isAssistant
          ? "border border-[oklch(0.62_0.18_270_/_0.2)] bg-ai-surface text-ink-1"
          : isSystem
            ? "border border-line bg-paper-2 text-ink-3"
            : "border border-line bg-white text-ink-1",
      )}
    >
      {children}
    </div>
  );
}

export function ConversationComposer({
  placeholder = "Ask Keystone or write a reply...",
}: {
  placeholder?: string;
}) {
  return (
    <div className="rounded-5 border border-line bg-white/85 p-2 shadow-2 backdrop-blur-2xl">
      <div className="flex min-h-12 items-center gap-3 rounded-4 bg-paper-2 px-3">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-ink-3"
          type="button"
        >
          <Icon name="plus" size={18} />
        </button>
        <span className="flex-1 text-sm text-ink-4">{placeholder}</span>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-aurora text-white shadow-[0_8px_20px_oklch(0.62_0.18_270_/_0.35)]"
          type="button"
        >
          <Icon color="#fff" name="voice" size={18} stroke={2} />
        </button>
      </div>
    </div>
  );
}
