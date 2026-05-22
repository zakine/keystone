import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json } from "@keystone/db";

import type {
  Conversation,
  ConversationEvent,
  ConversationEventInsert,
  ConversationParticipant,
  ConversationParticipantInsert,
  ConversationThread,
  CreateConversationInput,
  CreateMessageInput,
  CreateTaskInput,
  ExtractedEntity,
  ExtractedEntityInsert,
  Message,
} from "./types";

export type ConversationClient = SupabaseClient<Database>;

function assertData<T>(data: T | null, error: { message: string } | null): T {
  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Expected Supabase to return data.");
  }

  return data;
}

export async function createConversation(
  supabase: ConversationClient,
  input: CreateConversationInput,
): Promise<Conversation> {
  const { data, error } = await supabase
    .from("conversations")
    .insert({
      external_thread_id: input.externalThreadId,
      metadata: input.metadata,
      owner_id: input.ownerId,
      primary_channel: input.primaryChannel,
      subject: input.subject,
      workspace_id: input.workspaceId,
    })
    .select()
    .single();

  return assertData(data, error);
}

export async function listConversations(
  supabase: ConversationClient,
  options: { limit?: number; status?: Conversation["status"]; workspaceId?: string } = {},
): Promise<Conversation[]> {
  let query = supabase
    .from("conversations")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(options.limit ?? 50);

  if (options.status) {
    query = query.eq("status", options.status);
  }

  if (options.workspaceId) {
    query = query.eq("workspace_id", options.workspaceId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function addParticipant(
  supabase: ConversationClient,
  participant: ConversationParticipantInsert,
): Promise<ConversationParticipant> {
  const { data, error } = await supabase
    .from("conversation_participants")
    .insert(participant)
    .select()
    .single();

  return assertData(data, error);
}

export async function createMessage(
  supabase: ConversationClient,
  input: CreateMessageInput,
): Promise<Message> {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      ai_annotations: input.aiAnnotations,
      attachments: input.attachments,
      body: input.body,
      channel: input.channel,
      conversation_id: input.conversationId,
      external_message_id: input.externalMessageId,
      participant_id: input.participantId,
      provider: input.provider,
      provider_payload: input.providerPayload,
      role: input.role,
      sent_at: input.sentAt,
      status: input.status,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  await supabase
    .from("conversations")
    .update({ last_message_at: data.created_at, updated_at: data.created_at })
    .eq("id", input.conversationId);

  await recordConversationEvent(supabase, {
    conversation_id: input.conversationId,
    event_type: "message.created",
    message_id: data.id,
    payload: {
      channel: data.channel,
      provider: data.provider,
      role: data.role,
      status: data.status,
    },
  });

  return data;
}

export async function recordConversationEvent(
  supabase: ConversationClient,
  event: ConversationEventInsert,
): Promise<ConversationEvent> {
  const { data, error } = await supabase
    .from("conversation_events")
    .insert(event)
    .select()
    .single();

  return assertData(data, error);
}

export async function createTask(supabase: ConversationClient, input: CreateTaskInput) {
  const { data, error } = await supabase
    .from("conversation_tasks")
    .insert({
      assigned_to: input.assignedTo,
      conversation_id: input.conversationId,
      created_by: input.createdBy,
      description: input.description,
      due_at: input.dueAt,
      message_id: input.messageId,
      metadata: input.metadata,
      title: input.title,
    })
    .select()
    .single();

  return assertData(data, error);
}

export async function upsertExtractedEntities(
  supabase: ConversationClient,
  entities: ExtractedEntityInsert[],
): Promise<ExtractedEntity[]> {
  const { data, error } = await supabase.from("extracted_entities").insert(entities).select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getConversationThread(
  supabase: ConversationClient,
  conversationId: string,
): Promise<ConversationThread> {
  const [conversation, participants, messages, summaries, entities, tasks, events, workflows] =
    await Promise.all([
      supabase.from("conversations").select("*").eq("id", conversationId).single(),
      supabase.from("conversation_participants").select("*").eq("conversation_id", conversationId),
      supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at"),
      supabase
        .from("conversation_summaries")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: false }),
      supabase.from("extracted_entities").select("*").eq("conversation_id", conversationId),
      supabase.from("conversation_tasks").select("*").eq("conversation_id", conversationId),
      supabase
        .from("conversation_events")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: false }),
      supabase.from("conversation_workflows").select("*").eq("conversation_id", conversationId),
    ]);

  return {
    conversation: assertData(conversation.data, conversation.error),
    entities: entities.data ?? [],
    events: events.data ?? [],
    messages: messages.data ?? [],
    participants: participants.data ?? [],
    summaries: summaries.data ?? [],
    tasks: tasks.data ?? [],
    workflows: workflows.data ?? [],
  };
}

export function toProviderMessage(input: {
  conversationId: string;
  envelope: {
    channel: CreateMessageInput["channel"];
    externalMessageId?: string;
    provider: string;
    raw?: Json;
    text?: string;
  };
  participantId?: string;
}): CreateMessageInput {
  return {
    body: input.envelope.text,
    channel: input.envelope.channel,
    conversationId: input.conversationId,
    externalMessageId: input.envelope.externalMessageId,
    participantId: input.participantId,
    provider: input.envelope.provider,
    providerPayload: input.envelope.raw,
    role: "participant",
    status: "delivered",
  };
}
