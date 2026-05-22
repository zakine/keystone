import type { Metadata } from "next";
import type { ReactNode } from "react";
import { KeystoneProvider } from "@keystone/ui/provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Keystone Core",
  description: "Reusable AI SaaS factory starter.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <KeystoneProvider>{children}</KeystoneProvider>
      </body>
    </html>
  );
}
