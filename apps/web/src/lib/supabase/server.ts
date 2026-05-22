import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@keystone/db";

import { env } from "@/env";

export async function createClient() {
  const cookieStore = await cookies();

  return createSupabaseServerClient(
    {
      anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      url: env.NEXT_PUBLIC_SUPABASE_URL,
    },
    {
      get(name) {
        return cookieStore.get(name)?.value;
      },
      set(name, value, options) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name, options) {
        cookieStore.set({ name, value: "", ...options });
      },
    },
  );
}
