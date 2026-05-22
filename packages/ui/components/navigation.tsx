import { cn } from "../src/lib/cn";
import { Icon, type KeystoneIconName } from "./icon";

export type BottomNavItem = {
  ai?: boolean;
  icon: KeystoneIconName;
  id: string;
  label: string;
};

export const defaultBottomNavItems: BottomNavItem[] = [
  { icon: "inbox", id: "inbox", label: "Inbox" },
  { icon: "lead", id: "leads", label: "Leads" },
  { ai: true, icon: "spark", id: "ai", label: "AI" },
  { icon: "home", id: "matches", label: "Matches" },
  { icon: "cal", id: "cal", label: "Today" },
];

export function BottomNav({
  active = "inbox",
  dark = false,
  items = defaultBottomNavItems,
}: {
  active?: string;
  dark?: boolean;
  items?: BottomNavItem[];
}) {
  return (
    <nav
      className={cn(
        "flex items-center justify-around px-3 pb-3.5 pt-2.5 backdrop-blur-2xl",
        dark
          ? "border-t border-graphite-line bg-graphite-1/85"
          : "border-t border-line bg-white/85",
      )}
    >
      {items.map((item) => {
        const isActive = item.id === active;

        if (item.ai) {
          return (
            <button
              className="-mt-4 flex h-[52px] w-[52px] items-center justify-center rounded-full border-0 bg-aurora text-white shadow-[0_8px_20px_oklch(0.62_0.18_270_/_0.45)]"
              key={item.id}
              type="button"
            >
              <Icon color="#fff" name={item.icon} size={22} stroke={2} />
            </button>
          );
        }

        return (
          <button
            className={cn(
              "flex flex-col items-center gap-[3px] border-0 bg-transparent px-2.5 py-1",
              isActive
                ? dark
                  ? "text-white"
                  : "text-ink-0"
                : dark
                  ? "text-graphite-ink-3"
                  : "text-ink-4",
            )}
            key={item.id}
            type="button"
          >
            <Icon name={item.icon} size={22} stroke={isActive ? 1.8 : 1.5} />
            <span
              className={cn(
                "text-[10px] tracking-normal",
                isActive ? "font-semibold" : "font-medium",
              )}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
