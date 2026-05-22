import type { PropsWithChildren } from "react";
import { KeystoneProvider } from "@keystone/ui/provider";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <KeystoneProvider>{children}</KeystoneProvider>
    </SafeAreaProvider>
  );
}
