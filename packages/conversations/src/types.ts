import type { Database, Json } from "@keystone/db";

type Tables = Database["public"]["Tables"];
type Enums = Database["public"]["Enums"];

export type Conversation = Tables["conversations"]["Row"];
export type ConversationInsert = Tables["conversations"]["Insert"];
export type ConversationUpdate = Tables["conversations"]["Update"];
export type ConversationParticipant = Tables["conversation_participants"]["Row"];
export type ConversationParticipantInsert = Tables["conversation_participants"]["Insert"];
export type Message = Tables["messages"]["Row"];
export type MessageInsert = Tables["messages"]["Insert"];
export type ConversationSummary = Tables["conversation_summaries"]["Row"];
export type ConversationSummaryInsert = Tables["conversation_summaries"]["Insert"];
export type ExtractedEntity = Tables["extracted_entities"]["Row"];
export type ExtractedEntityInsert = Tables["extracted_entities"]["Insert"];
export type ConversationTask = Tables["conversation_tasks"]["Row"];
export type ConversationTaskInsert = Tables["conversation_tasks"]["Insert"];
export type ConversationEvent = Tables["conversation_events"]["Row"];
export type ConversationEventInsert = Tables["conversation_events"]["Insert"];
export type ConversationWorkflow = Tables["conversation_workflows"]["Row"];
export type ConversationWorkflowInsert = Tables["conversation_workflows"]["Insert"];

export type ConversationChannel = Enums["conversation_channel"];
export type ConversationStatus = Enums["conversation_status"];
export type MessageRole = Enums["message_role"];
export type MessageStatus = Enums["message_status"];
export type ParticipantKind = Enums["participant_kind"];
export type TaskStatus = Enums["task_status"];
export type WorkflowStatus = Enums["workflow_status"];

export type ConversationTimelineItem =
  | { item: Message; kind: "message"; occurredAt: string }
  | { item: ConversationSummary; kind: "summary"; occurredAt: string }
  | { item: ConversationTask; kind: "task"; occurredAt: string }
  | { item: ConversationEvent; kind: "event"; occurredAt: string };

export type ConversationThread = {
  conversation: Conversation;
  entities: ExtractedEntity[];
  events: ConversationEvent[];
  messages: Message[];
  participants: ConversationParticipant[];
  summaries: ConversationSummary[];
  tasks: ConversationTask[];
  workflows: ConversationWorkflow[];
};

export type ProviderEnvelope = {
  channel: ConversationChannel;
  externalConversationId?: string;
  externalMessageId?: string;
  from?: string;
  provider: "twilio" | "email" | "in_app" | "api" | (string & {});
  raw?: Json;
  text?: string;
  to?: string;
};

export type CreateConversationInput = {
  externalThreadId?: string;
  metadata?: Json;
  ownerId?: string;
  primaryChannel?: ConversationChannel;
  subject?: string;
  workspaceId?: string;
};

export type CreateMessageInput = {
  aiAnnotations?: Json;
  attachments?: Json;
  body?: string;
  channel?: ConversationChannel;
  conversationId: string;
  externalMessageId?: string;
  participantId?: string;
  provider?: string;
  providerPayload?: Json;
  role?: MessageRole;
  sentAt?: string;
  status?: MessageStatus;
};

export type CreateTaskInput = {
  assignedTo?: string;
  conversationId: string;
  createdBy?: string;
  description?: string;
  dueAt?: string;
  messageId?: string;
  metadata?: Json;
  title: string;
};
