import "../src/styles/global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AppProvider } from "@/providers/app-provider";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Keystone" }} />
        <Stack.Screen name="(auth)/login" options={{ title: "Sign in" }} />
      </Stack>
      <StatusBar style="auto" />
    </AppProvider>
  );
}
