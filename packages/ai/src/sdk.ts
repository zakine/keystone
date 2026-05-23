import type { ConversationAiContext, AiProvider, AiRequestOptions } from "./types";
import { buildConversationPrompt } from "./prompts";
import {
  ConversationClassificationSchema,
  ConversationSummarySchema,
  ExtractEntitiesSchema,
  FollowUpSchema,
  GeneratedReplySchema,
  GenerateTasksSchema,
  IntentSchema,
  LeadScoreSchema,
} from "./schemas";

export type KeystoneAiSdk = ReturnType<typeof createKeystoneAiSdk>;

export function createKeystoneAiSdk(provider: AiProvider) {
  function runStructured<TSchema extends Parameters<AiProvider["structured"]>[1]>(
    context: ConversationAiContext,
    name: string,
    task: string,
    schema: TSchema,
    options?: AiRequestOptions,
  ) {
    return provider.structured(buildConversationPrompt(name, context, task), schema, options);
  }

  return {
    classifyConversation(context: ConversationAiContext, options?: AiRequestOptions) {
      return runStructured(
        context,
        "classifyConversation",
        "Classify this conversation for routing and prioritization. Use product-neutral categories.",
        ConversationClassificationSchema,
        options,
      );
    },

    detectIntent(context: ConversationAiContext, options?: AiRequestOptions) {
      return runStructured(
        context,
        "detectIntent",
        "Detect the participant's primary current intent. Return a short reusable intent name.",
        IntentSchema,
        options,
      );
    },

    extractEntities(context: ConversationAiContext, options?: AiRequestOptions) {
      return runStructured(
        context,
        "extractEntities",
        "Extract reusable entities explicitly present in the conversation. Do not invent missing values.",
        ExtractEntitiesSchema,
        options,
      );
    },

    generateFollowUp(context: ConversationAiContext, options?: AiRequestOptions) {
      return runStructured(
        context,
        "generateFollowUp",
        "Generate the next follow-up message and recommended timing. Keep it applicable across vertical SaaS products.",
        FollowUpSchema,
        options,
      );
    },

    generateReply(context: ConversationAiContext, options?: AiRequestOptions) {
      return runStructured(
        context,
        "generateReply",
        "Draft a reply from the current user to the conversation participant. Match the conversation channel and brand voice.",
        GeneratedReplySchema,
        options,
      );
    },

    generateReplyStream(context: ConversationAiContext, options?: AiRequestOptions) {
      return provider.stream(
        buildConversationPrompt(
          "generateReplyStream",
          context,
          "Stream a polished reply from the current user. Return only the reply text.",
        ),
        options,
      );
    },

    generateTasks(context: ConversationAiContext, options?: AiRequestOptions) {
      return runStructured(
        context,
        "generateTasks",
        "Generate operational tasks implied by this conversation. Keep task titles short and concrete.",
        GenerateTasksSchema,
        options,
      );
    },

    scoreLead(context: ConversationAiContext, options?: AiRequestOptions) {
      return runStructured(
        context,
        "scoreLead",
        "Score the participant's readiness and fit using only conversation evidence. Keep scoring reusable for any vertical.",
        LeadScoreSchema,
        options,
      );
    },

    summarizeConversation(context: ConversationAiContext, options?: AiRequestOptions) {
      return runStructured(
        context,
        "summarizeConversation",
        "Summarize the conversation, key facts, open action items, tone, and next best action.",
        ConversationSummarySchema,
        options,
      );
    },
  };
}
