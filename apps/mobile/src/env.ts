import Constants from "expo-constants";

type MobileEnv = {
  supabaseAnonKey: string;
  supabaseUrl: string;
};

const extra = Constants.expoConfig?.extra as Partial<MobileEnv> | undefined;

export function getMobileEnv(): MobileEnv {
  const supabaseAnonKey = extra?.supabaseAnonKey;
  const supabaseUrl = extra?.supabaseUrl;

  if (!supabaseAnonKey || !supabaseUrl) {
    throw new Error("Missing Expo public Supabase environment variables.");
  }

  return { supabaseAnonKey, supabaseUrl };
}
