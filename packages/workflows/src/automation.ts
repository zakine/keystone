import type { WorkflowEvent } from "./events";
import { createWorkflowEvent } from "./events";
import { enqueueWorkflowEvent } from "./jobs";

export type AutomationSchedule = {
  delayMs?: number;
  idempotencyKey?: string;
};

export async function enqueueAutomation(event: WorkflowEvent, schedule: AutomationSchedule = {}) {
  const scheduledEvent = {
    ...event,
    payload: {
      ...event.payload,
      idempotencyKey: schedule.idempotencyKey ?? event.payload.idempotencyKey,
    },
  };

  if (schedule.delayMs && schedule.delayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, schedule.delayMs));
  }

  return enqueueWorkflowEvent(scheduledEvent);
}

export function createFollowupAutomation(input: {
  channel?: "in_app" | "email" | "sms" | "whatsapp" | "voice" | "web" | "api";
  conversationId: string;
  reason: string;
  suggestedSendAt?: string;
  workspaceId?: string;
}) {
  return createWorkflowEvent("followup.required", {
    channel: input.channel,
    conversationId: input.conversationId,
    reason: input.reason,
    suggestedSendAt: input.suggestedSendAt,
    workspaceId: input.workspaceId,
  });
}
