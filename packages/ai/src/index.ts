import OpenAI from "openai";

import { createOpenAiProvider } from "./openai";
import { createKeystoneAiSdk } from "./sdk";

export * from "./openai";
export * from "./prompts";
export * from "./schemas";
export * from "./sdk";
export type * from "./types";

export type AiRuntimeConfig = {
  apiKey: string;
  defaultModel?: string;
};

export type AiRuntime = {
  client: OpenAI;
  defaultModel: string;
  sdk: ReturnType<typeof createKeystoneAiSdk>;
};

export function createAiRuntime(config: AiRuntimeConfig): AiRuntime {
  const provider = createOpenAiProvider(config);

  return {
    client: new OpenAI({ apiKey: config.apiKey }),
    defaultModel: config.defaultModel ?? "gpt-4.1-mini",
    sdk: createKeystoneAiSdk(provider),
  };
}
