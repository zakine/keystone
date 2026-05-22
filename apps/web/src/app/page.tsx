import Link from "next/link";
import {
  AIPromptInput,
  BottomNav,
  Button,
  LeadCard,
  SearchBar,
  SuggestionChips,
} from "@keystone/ui";

export default function HomePage() {
  return (
    <main className="k-canvas-bg mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-6 sm:px-6">
      <nav className="flex h-12 items-center justify-between">
        <Link className="font-display text-sm font-semibold text-ink-0" href="/">
          Keystone Core
        </Link>
        <Button size="compact" variant="outline">
          Shell
        </Button>
      </nav>

      <section className="grid flex-1 content-center gap-6 py-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="k-mono text-ink-4">AI SAAS FACTORY</p>
            <h1 className="mt-3 max-w-2xl font-display text-[40px] font-medium leading-[1.02] tracking-normal text-ink-0 sm:text-5xl">
              Premium platform shell from the Keystone design system.
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-ink-3">
              Mobile-first navigation, aurora AI surfaces, paper/ink cards, and assistant patterns
              are now sourced from the shared UI package.
            </p>
          </div>
          <AIPromptInput />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-3">
            <SearchBar />
            <LeadCard />
          </div>
          <SuggestionChips />
        </div>
      </section>

      <div className="sticky bottom-0 -mx-4 sm:hidden">
        <BottomNav active="ai" />
      </div>
    </main>
  );
}
