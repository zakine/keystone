import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

import type { CookieOptions } from "@supabase/ssr";
import type { Database, SupabaseConfig } from "./types";

export function createSupabaseBrowserClient(config: SupabaseConfig) {
  return createBrowserClient<Database>(config.url, config.anonKey);
}

export function createSupabaseServerClient(
  config: SupabaseConfig,
  cookies: {
    get(name: string): string | undefined;
    set(name: string, value: string, options: CookieOptions): void;
    remove(name: string, options: CookieOptions): void;
  },
) {
  return createServerClient<Database>(config.url, config.anonKey, { cookies });
}

export function createSupabaseServiceClient(config: Required<SupabaseConfig>) {
  return createClient<Database>(config.url, config.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
