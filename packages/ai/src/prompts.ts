import type { ConversationThread, Message } from "@keystone/conversations";

import type { AiPrompt, ConversationAiContext } from "./types";

const SYSTEM_PROMPT = [
  "You are Keystone AI, a reusable assistant for vertical SaaS products.",
  "Work only from the provided conversation context.",
  "Avoid CRM-specific assumptions unless they are explicitly present in the input.",
  "Prefer concise, structured, product-neutral outputs.",
  "When uncertain, lower confidence and explain the missing evidence.",
].join("\n");

function messageLabel(message: Message) {
  const body = message.body?.trim() || "[empty message]";
  const provider = message.provider ? ` provider=${message.provider}` : "";
  const channel = `channel=${message.channel}`;

  return `- ${message.created_at} role=${message.role} ${channel}${provider} id=${message.id}\n  ${body}`;
}

export function serializeConversation(thread: ConversationThread) {
  const participants = thread.participants
    .map((participant) => {
      const label =
        participant.display_name ??
        participant.handle ??
        participant.email ??
        participant.phone ??
        "Unknown";
      return `- ${participant.kind}: ${label}`;
    })
    .join("\n");

  const messages = thread.messages.map(messageLabel).join("\n");
  const latestSummary = thread.summaries[0]?.summary;
  const knownEntities = thread.entities
    .map((entity) => `- ${entity.entity_type}: ${entity.value} (${entity.confidence ?? "unknown"})`)
    .join("\n");
  const openTasks = thread.tasks
    .filter((task) => task.status !== "completed" && task.status !== "cancelled")
    .map((task) => `- ${task.title}${task.due_at ? ` due ${task.due_at}` : ""}`)
    .join("\n");

  return [
    `Conversation: ${thread.conversation.subject ?? thread.conversation.id}`,
    `Status: ${thread.conversation.status}`,
    `Primary channel: ${thread.conversation.primary_channel}`,
    participants ? `Participants:\n${participants}` : "Participants: none",
    latestSummary ? `Latest summary:\n${latestSummary}` : "Latest summary: none",
    knownEntities ? `Known entities:\n${knownEntities}` : "Known entities: none",
    openTasks ? `Open tasks:\n${openTasks}` : "Open tasks: none",
    messages ? `Messages:\n${messages}` : "Messages: none",
  ].join("\n\n");
}

export function buildConversationPrompt(
  name: string,
  context: ConversationAiContext,
  task: string,
): AiPrompt {
  const extra = [
    context.productContext ? `Product context: ${context.productContext}` : null,
    context.brandVoice ? `Brand voice: ${context.brandVoice}` : null,
    context.currentUserName ? `Current user: ${context.currentUserName}` : null,
    context.instructions?.length
      ? `Instructions:\n${context.instructions.map((item) => `- ${item}`).join("\n")}`
      : null,
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    messages: [
      { content: SYSTEM_PROMPT, role: "system" },
      {
        content: [
          extra,
          `Task:\n${task}`,
          `Conversation context:\n${serializeConversation(context.conversation)}`,
        ]
          .filter(Boolean)
          .join("\n\n"),
        role: "user",
      },
    ],
    name,
  };
}

export function buildFreeformPrompt(name: string, instructions: string, input: string): AiPrompt {
  return {
    messages: [
      { content: SYSTEM_PROMPT, role: "system" },
      { content: `${instructions}\n\nInput:\n${input}`, role: "user" },
    ],
    name,
  };
}
