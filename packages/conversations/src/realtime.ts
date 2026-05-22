import type { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@keystone/db";

import type {
  ConversationEvent,
  ConversationParticipant,
  ConversationSummary,
  ConversationTask,
  ConversationWorkflow,
  ExtractedEntity,
  Message,
} from "./types";

export type ConversationRealtimePayload =
  | { event: "participant"; row: ConversationParticipant }
  | { event: "message"; row: Message }
  | { event: "summary"; row: ConversationSummary }
  | { event: "entity"; row: ExtractedEntity }
  | { event: "task"; row: ConversationTask }
  | { event: "event"; row: ConversationEvent }
  | { event: "workflow"; row: ConversationWorkflow };

export function subscribeToConversation(
  supabase: SupabaseClient<Database>,
  conversationId: string,
  onChange: (payload: ConversationRealtimePayload) => void,
): RealtimeChannel {
  return supabase
    .channel(`keystone:conversation:${conversationId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        filter: `conversation_id=eq.${conversationId}`,
        schema: "public",
        table: "conversation_participants",
      },
      (payload) => onChange({ event: "participant", row: payload.new as ConversationParticipant }),
    )
    .on(
      "postgres_changes",
      {
        event: "*",
        filter: `conversation_id=eq.${conversationId}`,
        schema: "public",
        table: "messages",
      },
      (payload) => onChange({ event: "message", row: payload.new as Message }),
    )
    .on(
      "postgres_changes",
      {
        event: "*",
        filter: `conversation_id=eq.${conversationId}`,
        schema: "public",
        table: "conversation_summaries",
      },
      (payload) => onChange({ event: "summary", row: payload.new as ConversationSummary }),
    )
    .on(
      "postgres_changes",
      {
        event: "*",
        filter: `conversation_id=eq.${conversationId}`,
        schema: "public",
        table: "extracted_entities",
      },
      (payload) => onChange({ event: "entity", row: payload.new as ExtractedEntity }),
    )
    .on(
      "postgres_changes",
      {
        event: "*",
        filter: `conversation_id=eq.${conversationId}`,
        schema: "public",
        table: "conversation_tasks",
      },
      (payload) => onChange({ event: "task", row: payload.new as ConversationTask }),
    )
    .on(
      "postgres_changes",
      {
        event: "*",
        filter: `conversation_id=eq.${conversationId}`,
        schema: "public",
        table: "conversation_events",
      },
      (payload) => onChange({ event: "event", row: payload.new as ConversationEvent }),
    )
    .on(
      "postgres_changes",
      {
        event: "*",
        filter: `conversation_id=eq.${conversationId}`,
        schema: "public",
        table: "conversation_workflows",
      },
      (payload) => onChange({ event: "workflow", row: payload.new as ConversationWorkflow }),
    )
    .subscribe();
}
