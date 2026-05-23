import { z } from "zod";
import type { PlatformEvent } from "@keystone/events";

const WorkflowEventBaseSchema = z.object({
  conversationId: z.string().uuid().optional(),
  eventId: z.string().uuid().optional(),
  idempotencyKey: z.string().optional(),
  occurredAt: z.string().datetime(),
  workspaceId: z.string().uuid().optional(),
});

export const MessageReceivedPayloadSchema = WorkflowEventBaseSchema.extend({
  channel: z.enum(["in_app", "email", "sms", "whatsapp", "voice", "web", "api"]),
  messageId: z.string().uuid(),
  participantId: z.string().uuid().optional(),
  provider: z.string().optional(),
});

export const ConversationCreatedPayloadSchema = WorkflowEventBaseSchema.extend({
  conversationId: z.string().uuid(),
  ownerId: z.string().uuid().optional(),
  primaryChannel: z.enum(["in_app", "email", "sms", "whatsapp", "voice", "web", "api"]),
});

export const LeadDetectedPayloadSchema = WorkflowEventBaseSchema.extend({
  confidence: z.number().min(0).max(1),
  entityIds: z.array(z.string().uuid()).default([]),
  reason: z.string(),
});

export const TaskCreatedPayloadSchema = WorkflowEventBaseSchema.extend({
  assignedTo: z.string().uuid().optional(),
  dueAt: z.string().datetime().optional(),
  taskId: z.string().uuid(),
  title: z.string(),
});

export const FollowupRequiredPayloadSchema = WorkflowEventBaseSchema.extend({
  channel: z.enum(["in_app", "email", "sms", "whatsapp", "voice", "web", "api"]).optional(),
  reason: z.string(),
  suggestedSendAt: z.string().datetime().optional(),
});

export const WorkflowEventPayloadSchemas = {
  "conversation.created": ConversationCreatedPayloadSchema,
  "followup.required": FollowupRequiredPayloadSchema,
  "lead.detected": LeadDetectedPayloadSchema,
  "message.received": MessageReceivedPayloadSchema,
  "task.created": TaskCreatedPayloadSchema,
} as const;

export type WorkflowEventName = keyof typeof WorkflowEventPayloadSchemas;
export type WorkflowEventPayload<TName extends WorkflowEventName = WorkflowEventName> = z.infer<
  (typeof WorkflowEventPayloadSchemas)[TName]
>;

export type WorkflowEvent<TName extends WorkflowEventName = WorkflowEventName> = PlatformEvent<
  WorkflowEventPayload<TName>
> & {
  name: TName;
  topic: "workflow";
};

export function createWorkflowEvent<TName extends WorkflowEventName>(
  name: TName,
  payload: Omit<WorkflowEventPayload<TName>, "occurredAt"> & { occurredAt?: string },
): WorkflowEvent<TName> {
  const schema = WorkflowEventPayloadSchemas[name];
  const parsed = schema.parse({
    occurredAt: new Date().toISOString(),
    ...payload,
  }) as WorkflowEventPayload<TName>;

  return {
    id: parsed.eventId ?? crypto.randomUUID(),
    name,
    payload: parsed,
    topic: "workflow",
  };
}

export function parseWorkflowEvent(event: WorkflowEvent): WorkflowEvent {
  const schema = WorkflowEventPayloadSchemas[event.name];

  return {
    ...event,
    payload: schema.parse(event.payload),
  };
}
