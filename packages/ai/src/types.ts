import type { z } from "zod";
import type { ConversationThread } from "@keystone/conversations";

export type AiMessage = {
  content: string;
  role: "assistant" | "system" | "user";
};

export type AiPrompt = {
  messages: AiMessage[];
  name: string;
};

export type AiRequestOptions = {
  maxTokens?: number;
  model?: string;
  temperature?: number;
};

export type AiProvider = {
  complete(prompt: AiPrompt, options?: AiRequestOptions): Promise<string>;
  stream(prompt: AiPrompt, options?: AiRequestOptions): AsyncIterable<string>;
  structured<TSchema extends z.ZodTypeAny>(
    prompt: AiPrompt,
    schema: TSchema,
    options?: AiRequestOptions,
  ): Promise<z.infer<TSchema>>;
};

export type AiSdkConfig = {
  defaultModel?: string;
  provider: AiProvider;
};

export type ConversationAiContext = {
  brandVoice?: string;
  conversation: ConversationThread;
  currentUserName?: string;
  instructions?: string[];
  productContext?: string;
};

export type StreamableAiResult<TOutput> = {
  output: Promise<TOutput>;
  stream: AsyncIterable<string>;
};
