import type { ConversationThread } from "@keystone/conversations";
import type { Database, Json } from "@keystone/db";

type Tables = Database["public"]["Tables"];
type Enums = Database["public"]["Enums"];

export type CrmLeadStatus = Enums["crm_lead_status"];
export type CrmPipelineStageKind = Enums["crm_pipeline_stage_kind"];
export type CrmMatchStatus = Enums["crm_match_status"];
export type CrmReminderStatus = Enums["crm_reminder_status"];

export type CrmLead = Tables["crm_leads"]["Row"];
export type CrmLeadInsert = Tables["crm_leads"]["Insert"];
export type CrmPipelineStage = Tables["crm_pipeline_stages"]["Row"];
export type CrmProperty = Tables["crm_properties"]["Row"];
export type CrmPropertyMatch = Tables["crm_property_matches"]["Row"];
export type CrmReminder = Tables["crm_reminders"]["Row"];

export type CrmLeadWithConversation = CrmLead & {
  conversation?: ConversationThread;
};

export type CreateCrmLeadInput = {
  conversationId?: string;
  displayName: string;
  email?: string;
  locationQuery?: string;
  metadata?: Json;
  ownerId?: string;
  phone?: string;
  pipelineStageId?: string;
  requirements?: Json;
  source?: string;
  workspaceId?: string;
};

export type PropertyMatchCandidate = {
  attributes?: Json;
  id: string;
  label: string;
  price?: number;
};
