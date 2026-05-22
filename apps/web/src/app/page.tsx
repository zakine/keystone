import Link from "next/link";
import { Button } from "@keystone/ui/button";

const platformAreas = ["Auth", "Realtime", "AI", "Billing", "Workflows"];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-6 sm:px-6">
      <nav className="flex h-12 items-center justify-between">
        <Link className="text-sm font-semibold" href="/">
          Keystone Core
        </Link>
        <Button size="sm" variant="outline">
          Platform Shell
        </Button>
      </nav>

      <section className="grid flex-1 content-center gap-8 py-10">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-accent">AI SaaS factory starter</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">
            Production-grade platform architecture before product features.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-foreground/70">
            Web, mobile, database, auth, realtime, AI, billing, and workflows are separated into
            reusable packages so new products can start from a durable foundation.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-5">
          {platformAreas.map((area) => (
            <div className="rounded-md border border-border p-4 text-sm font-medium" key={area}>
              {area}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
