import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@keystone/db";
import { recordConversationEvent } from "@keystone/conversations";

import type { WorkflowEvent, WorkflowEventName } from "./events";
import { parseWorkflowEvent } from "./events";
import { createWorkflowRegistry, type WorkflowRegistry } from "./triggers";

export type WorkflowEngineOptions = {
  registry?: WorkflowRegistry;
  supabase?: SupabaseClient<Database>;
};

export type DispatchWorkflowEventOptions = {
  context?: {
    attempt?: number;
    runId?: string;
    source?: "local" | "trigger.dev";
  };
  persist?: boolean;
};

export function createWorkflowEngine(options: WorkflowEngineOptions = {}) {
  const registry = options.registry ?? createWorkflowRegistry();

  async function persistEvent(event: WorkflowEvent) {
    if (!options.supabase) {
      return;
    }

    await recordConversationEvent(options.supabase, {
      conversation_id: event.payload.conversationId ?? null,
      event_type: event.name,
      idempotency_key: event.payload.idempotencyKey ?? null,
      payload: event.payload,
    });
  }

  return {
    async dispatch<TName extends WorkflowEventName>(
      event: WorkflowEvent<TName>,
      dispatchOptions: DispatchWorkflowEventOptions = {},
    ) {
      const parsed = parseWorkflowEvent(event) as WorkflowEvent<TName>;

      if (dispatchOptions.persist ?? true) {
        await persistEvent(parsed);
      }

      const triggers = registry.get(parsed.name);
      const context = {
        attempt: dispatchOptions.context?.attempt,
        runId: dispatchOptions.context?.runId,
        source: dispatchOptions.context?.source ?? "local",
      } as const;

      await Promise.all(
        triggers.map(async (trigger) => {
          await trigger.action(parsed, context);
        }),
      );

      return {
        event: parsed,
        triggersRun: triggers.map((trigger) => trigger.id),
      };
    },
    registry,
  };
}
