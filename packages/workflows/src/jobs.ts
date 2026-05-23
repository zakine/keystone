import { logger, task } from "@trigger.dev/sdk/v3";

import { createWorkflowEngine } from "./engine";
import type { WorkflowEvent } from "./events";
import { parseWorkflowEvent } from "./events";
import { createWorkflowRegistry, coreWorkflowTriggers } from "./triggers";

const coreRegistry = createWorkflowRegistry(coreWorkflowTriggers);

export const workflowEventTask = task({
  id: "keystone.workflow.event",
  retry: {
    maxAttempts: 3,
  },
  run: async (payload: WorkflowEvent, { ctx }) => {
    const event = parseWorkflowEvent(payload);

    logger.info("Dispatching Keystone workflow event", {
      event: event.name,
      id: event.id,
    });

    const engine = createWorkflowEngine({ registry: coreRegistry });

    return engine.dispatch(event, {
      context: {
        runId: ctx.run.id,
        source: "trigger.dev",
      },
      persist: false,
    });
  },
});

export async function enqueueWorkflowEvent(event: WorkflowEvent) {
  return workflowEventTask.trigger(event, {
    idempotencyKey: event.payload.idempotencyKey,
    tags: [event.name, event.payload.conversationId ?? "global"],
  });
}
