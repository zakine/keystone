"use client";

import * as React from "react";
import { TamaguiProvider } from "tamagui";

import { tamaguiConfig } from "./tamagui.config";

export function KeystoneProvider({ children }: { children: React.ReactNode }) {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      {children}
    </TamaguiProvider>
  );
}
