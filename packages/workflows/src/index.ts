import { defineConfig } from "@trigger.dev/sdk/v3";
import Stripe from "stripe";

export type WorkflowRuntimeConfig = {
  projectId?: string;
  stripeSecretKey: string;
  triggerSecretKey: string;
};

export function createWorkflowRuntime(config: WorkflowRuntimeConfig) {
  return {
    stripe: new Stripe(config.stripeSecretKey, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    }),
    trigger: defineConfig({
      maxDuration: 300,
      project: config.projectId ?? "keystone-core",
      runtime: "node",
    }),
  };
}
