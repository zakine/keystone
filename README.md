# Keystone Core

Reusable AI SaaS factory starter built as a strict TypeScript monorepo.

## Workspace

- `apps/web` - Next.js app router web shell with Supabase auth scaffolding.
- `apps/mobile` - Expo Router mobile shell with NativeWind and Tamagui providers.
- `packages/ui` - shared design primitives, Tailwind preset, Tamagui config, shadcn-style components.
- `packages/ai` - OpenAI SDK client factory and AI runtime contracts.
- `packages/db` - Supabase browser, server, service-role, and typed database scaffolding.
- `packages/auth` - shared auth contracts and Supabase session helpers.
- `packages/conversations` - reusable conversation engine domain services, realtime hooks, and provider-ready contracts.
- `packages/events` - realtime/event channel contracts.
- `packages/workflows` - Trigger.dev and Stripe workflow integration scaffolding.

## Commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

## Environment

Copy `.env.example` to `.env.local` for local web development. Expo reads public values through `EXPO_PUBLIC_*`; mirror `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as needed for native builds.

No business features are included yet. This repo is intentionally platform-only.
