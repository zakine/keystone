import OpenAI from "openai";
import type { z } from "zod";

import type { AiPrompt, AiProvider } from "./types";

export type OpenAiProviderConfig = {
  apiKey: string;
  defaultModel?: string;
  organization?: string;
  project?: string;
};

function toOpenAiMessages(prompt: AiPrompt) {
  return prompt.messages.map((message) => ({
    content: message.content,
    role: message.role,
  }));
}

function schemaInstruction(promptName: string) {
  return [
    "Return only valid JSON.",
    `The JSON must match the validated output contract for ${promptName}.`,
    "Do not include Markdown, comments, or explanatory prose outside JSON.",
  ].join("\n");
}

function parseStructured<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  value: unknown,
): z.infer<TSchema> {
  const result = schema.safeParse(value);

  if (!result.success) {
    throw result.error;
  }

  const data = result.data as z.infer<TSchema>;

  return data;
}

export function createOpenAiProvider(config: OpenAiProviderConfig): AiProvider {
  const client = new OpenAI({
    apiKey: config.apiKey,
    organization: config.organization,
    project: config.project,
  });
  const defaultModel = config.defaultModel ?? "gpt-4.1-mini";

  return {
    async complete(prompt, options) {
      const response = await client.chat.completions.create({
        max_tokens: options?.maxTokens,
        messages: toOpenAiMessages(prompt),
        model: options?.model ?? defaultModel,
        temperature: options?.temperature ?? 0.2,
      });

      return response.choices[0]?.message.content ?? "";
    },

    async *stream(prompt, options) {
      const stream = await client.chat.completions.create({
        max_tokens: options?.maxTokens,
        messages: toOpenAiMessages(prompt),
        model: options?.model ?? defaultModel,
        stream: true,
        temperature: options?.temperature ?? 0.2,
      });

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta.content;

        if (delta) {
          yield delta;
        }
      }
    },

    async structured(prompt, schema, options) {
      const response = await client.chat.completions.create({
        max_tokens: options?.maxTokens,
        messages: [
          ...toOpenAiMessages(prompt),
          { content: schemaInstruction(prompt.name), role: "system" },
        ],
        model: options?.model ?? defaultModel,
        response_format: { type: "json_object" },
        temperature: options?.temperature ?? 0.1,
      });

      const content = response.choices[0]?.message.content;

      if (!content) {
        throw new Error(`OpenAI returned an empty response for ${prompt.name}.`);
      }

      const parsed: unknown = JSON.parse(content);

      return parseStructured(schema, parsed);
    },
  };
}
