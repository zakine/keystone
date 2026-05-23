import type { SupabaseClient } from "@supabase/supabase-js";
import type { GenerateTasksOutput, KeystoneAiSdk, LeadScoreOutput } from "@keystone/ai";
import type { ConversationThread } from "@keystone/conversations";
import { createTask } from "@keystone/conversations";
import type { Database } from "@keystone/db";
import { createFollowupAutomation, enqueueAutomation } from "@keystone/workflows";

import type { CreateCrmLeadInput, CrmLead, CrmPipelineStage, CrmPropertyMatch } from "./types";

export type CrmClient = SupabaseClient<Database>;

function assertData<T>(data: T | null, error: { message: string } | null): T {
  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Expected Supabase to return CRM data.");
  }

  return data;
}

export async function createCrmLead(
  supabase: CrmClient,
  input: CreateCrmLeadInput,
): Promise<CrmLead> {
  const { data, error } = await supabase
    .from("crm_leads")
    .insert({
      conversation_id: input.conversationId,
      display_name: input.displayName,
      email: input.email,
      location_query: input.locationQuery,
      metadata: input.metadata,
      owner_id: input.ownerId,
      phone: input.phone,
      pipeline_stage_id: input.pipelineStageId,
      requirements: input.requirements,
      source: input.source,
      workspace_id: input.workspaceId,
    })
    .select()
    .single();

  return assertData(data, error);
}

export async function listCrmLeads(
  supabase: CrmClient,
  options: { limit?: number; stageId?: string; workspaceId?: string } = {},
): Promise<CrmLead[]> {
  let query = supabase
    .from("crm_leads")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(options.limit ?? 50);

  if (options.stageId) {
    query = query.eq("pipeline_stage_id", options.stageId);
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

export async function listPipelineStages(
  supabase: CrmClient,
  workspaceId?: string,
): Promise<CrmPipelineStage[]> {
  let query = supabase.from("crm_pipeline_stages").select("*").order("position");

  if (workspaceId) {
    query = query.eq("workspace_id", workspaceId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function scoreCrmLead(
  ai: KeystoneAiSdk,
  conversation: ConversationThread,
): Promise<LeadScoreOutput> {
  return ai.scoreLead({
    conversation,
    instructions: [
      "Score the lead for CRM prioritization.",
      "Use only evidence in the conversation.",
      "Do not assume property preference fields unless explicitly stated.",
    ],
    productContext:
      "Keystone CRM template with leads, pipeline, conversations, follow-ups, reminders, and property matching.",
  });
}

export async function generateCrmFollowUp(ai: KeystoneAiSdk, conversation: ConversationThread) {
  return ai.generateFollowUp({
    conversation,
    instructions: [
      "Draft a follow-up suitable for the current channel.",
      "Keep it concise and action-oriented.",
    ],
    productContext: "CRM follow-up workflow.",
  });
}

export async function generateCrmReminderTasks(
  ai: KeystoneAiSdk,
  conversation: ConversationThread,
): Promise<GenerateTasksOutput> {
  return ai.generateTasks({
    conversation,
    instructions: ["Generate reminders and next actions for the CRM user."],
    productContext: "CRM reminders should be task-backed and reusable.",
  });
}

export async function createReminderFromTaskSuggestion(
  supabase: CrmClient,
  input: {
    conversationId: string;
    createdBy?: string;
    leadId?: string;
    suggestion: GenerateTasksOutput["tasks"][number];
  },
) {
  const task = await createTask(supabase, {
    conversationId: input.conversationId,
    createdBy: input.createdBy,
    dueAt: input.suggestion.dueAt ?? undefined,
    title: input.suggestion.title,
  });

  const { data, error } = await supabase
    .from("crm_reminders")
    .insert({
      conversation_id: input.conversationId,
      due_at: input.suggestion.dueAt,
      lead_id: input.leadId,
      task_id: task.id,
      title: input.suggestion.title,
    })
    .select()
    .single();

  return assertData(data, error);
}

export async function enqueueCrmFollowUp(input: {
  channel?: "in_app" | "email" | "sms" | "whatsapp" | "voice" | "web" | "api";
  conversationId: string;
  reason: string;
  suggestedSendAt?: string;
  workspaceId?: string;
}) {
  return enqueueAutomation(createFollowupAutomation(input));
}

export async function listPropertyMatches(
  supabase: CrmClient,
  leadId: string,
): Promise<CrmPropertyMatch[]> {
  const { data, error } = await supabase
    .from("crm_property_matches")
    .select("*")
    .eq("lead_id", leadId)
    .order("score", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
