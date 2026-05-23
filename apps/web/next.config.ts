import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@keystone/ai",
    "@keystone/auth",
    "@keystone/crm",
    "@keystone/db",
    "@keystone/events",
    "@keystone/ui",
    "@keystone/workflows",
    "tamagui",
  ],
};

export default nextConfig;
