import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@keystone/db";

import { getMobileEnv } from "@/env";

const env = getMobileEnv();

export const supabase = createClient<Database>(env.supabaseUrl, env.supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: false,
    persistSession: true,
    storage: AsyncStorage,
  },
});
