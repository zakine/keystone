import OpenAI from "openai";

export type AiRuntimeConfig = {
  apiKey: string;
  defaultModel?: string;
};

export type AiRuntime = {
  client: OpenAI;
  defaultModel: string;
};

export function createAiRuntime(config: AiRuntimeConfig): AiRuntime {
  return {
    client: new OpenAI({ apiKey: config.apiKey }),
    defaultModel: config.defaultModel ?? "gpt-4.1-mini",
  };
}
