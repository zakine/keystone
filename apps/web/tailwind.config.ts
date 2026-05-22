import preset from "@keystone/ui/tailwind";
import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  presets: [preset],
} satisfies Config;

export default config;
