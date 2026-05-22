import { useEffect, useMemo, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@keystone/db";

import { subscribeToConversation } from "./realtime";
import { getConversationThread, listConversations } from "./services";
import type { Conversation, ConversationThread } from "./types";

export function useConversations(
  supabase: SupabaseClient<Database>,
  options: { limit?: number; status?: Conversation["status"]; workspaceId?: string } = {},
) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const limit = options.limit;
  const status = options.status;
  const workspaceId = options.workspaceId;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    void listConversations(supabase, { limit, status, workspaceId })
      .then((next) => {
        if (!cancelled) {
          setConversations(next);
          setError(null);
        }
      })
      .catch((caught: unknown) => {
        if (!cancelled) {
          setError(caught instanceof Error ? caught : new Error("Failed to load conversations."));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [limit, status, supabase, workspaceId]);

  return { conversations, error, loading };
}

export function useConversationThread(
  supabase: SupabaseClient<Database>,
  conversationId: string | null,
) {
  const [thread, setThread] = useState<ConversationThread | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(Boolean(conversationId));

  useEffect(() => {
    if (!conversationId) {
      setThread(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    void getConversationThread(supabase, conversationId)
      .then((next) => {
        if (!cancelled) {
          setThread(next);
          setError(null);
        }
      })
      .catch((caught: unknown) => {
        if (!cancelled) {
          setError(caught instanceof Error ? caught : new Error("Failed to load conversation."));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    const channel = subscribeToConversation(supabase, conversationId, () => {
      void getConversationThread(supabase, conversationId).then((next) => {
        if (!cancelled) {
          setThread(next);
        }
      });
    });

    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, [conversationId, supabase]);

  const timeline = useMemo(() => {
    if (!thread) {
      return [];
    }

    return [
      ...thread.messages.map((item) => ({
        item,
        kind: "message" as const,
        occurredAt: item.created_at,
      })),
      ...thread.summaries.map((item) => ({
        item,
        kind: "summary" as const,
        occurredAt: item.created_at,
      })),
      ...thread.tasks.map((item) => ({ item, kind: "task" as const, occurredAt: item.created_at })),
      ...thread.events.map((item) => ({
        item,
        kind: "event" as const,
        occurredAt: item.created_at,
      })),
    ].sort((a, b) => a.occurredAt.localeCompare(b.occurredAt));
  }, [thread]);

  return { error, loading, thread, timeline };
}
