import type { WorkflowEvent, WorkflowEventName } from "./events";

export type WorkflowRunContext = {
  attempt?: number;
  runId?: string;
  source: "local" | "trigger.dev";
};

export type WorkflowAction = (
  event: WorkflowEvent,
  context: WorkflowRunContext,
) => Promise<void> | void;

export type WorkflowTrigger = {
  action: WorkflowAction;
  description?: string;
  event: WorkflowEventName;
  id: string;
};

export function defineWorkflowTrigger(trigger: WorkflowTrigger) {
  return trigger;
}

export class WorkflowRegistry {
  private readonly triggers = new Map<WorkflowEventName, WorkflowTrigger[]>();

  register(trigger: WorkflowTrigger) {
    const current = this.triggers.get(trigger.event) ?? [];
    this.triggers.set(trigger.event, [...current, trigger]);

    return this;
  }

  get(eventName: WorkflowEventName): WorkflowTrigger[] {
    return this.triggers.get(eventName) ?? [];
  }

  list() {
    return [...this.triggers.values()].flat();
  }
}

export function createWorkflowRegistry(triggers: WorkflowTrigger[] = []) {
  const registry = new WorkflowRegistry();
  triggers.forEach((trigger) => registry.register(trigger));

  return registry;
}

export const coreWorkflowTriggers = [
  defineWorkflowTrigger({
    description: "Fan out automation when a new conversation enters Keystone.",
    event: "conversation.created",
    id: "core.conversation.created",
    action: () => undefined,
  }),
  defineWorkflowTrigger({
    description: "Run message intake automation for provider-delivered messages.",
    event: "message.received",
    id: "core.message.received",
    action: () => undefined,
  }),
  defineWorkflowTrigger({
    description: "Start lead qualification automation when a reusable lead signal appears.",
    event: "lead.detected",
    id: "core.lead.detected",
    action: () => undefined,
  }),
  defineWorkflowTrigger({
    description: "Process newly created operational tasks.",
    event: "task.created",
    id: "core.task.created",
    action: () => undefined,
  }),
  defineWorkflowTrigger({
    description: "Queue follow-up automation when a conversation needs attention.",
    event: "followup.required",
    id: "core.followup.required",
    action: () => undefined,
  }),
] satisfies WorkflowTrigger[];
