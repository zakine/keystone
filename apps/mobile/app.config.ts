import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Keystone Core",
  slug: "keystone-core",
  scheme: "keystone",
  version: "0.1.0",
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  experiments: {
    typedRoutes: true,
  },
  plugins: ["expo-router", "expo-secure-store"],
  extra: {
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  },
};

export default config;
