import { Icon } from "./icon";

export function SearchBar({
  shortcut = "⌘ F",
  value = "Leads, properties, conversations...",
}: {
  shortcut?: string;
  value?: string;
}) {
  return (
    <div className="flex h-12 items-center gap-3 rounded-3 bg-paper-2 px-4">
      <Icon color="var(--ink-3)" name="search" size={18} />
      <span className="flex-1 text-[15px] text-ink-4">{value}</span>
      <span className="rounded-1 border border-line bg-white px-[7px] py-[3px] font-mono text-[10px] text-ink-3">
        {shortcut}
      </span>
    </div>
  );
}
