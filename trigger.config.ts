import { defineConfig } from "@trigger.dev/sdk/v3";

export default defineConfig({
  maxDuration: 300,
  project: process.env.TRIGGER_PROJECT_ID ?? "keystone-core",
  runtime: "node",
});
