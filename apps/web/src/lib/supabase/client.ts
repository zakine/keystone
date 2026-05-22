"use client";

import { createSupabaseBrowserClient } from "@keystone/db";

import { env } from "@/env";

export function createClient() {
  return createSupabaseBrowserClient({
    anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    url: env.NEXT_PUBLIC_SUPABASE_URL,
  });
}
