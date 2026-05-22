import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@keystone/db";

export type EventTopic = "system" | "auth" | "ai" | "billing" | "conversation" | "workflow";

export type PlatformEvent<TPayload extends Record<string, unknown> = Record<string, unknown>> = {
  id: string;
  name: string;
  payload: TPayload;
  topic: EventTopic;
  userId?: string;
};

export function createRealtimeChannel(supabase: SupabaseClient<Database>, topic: EventTopic) {
  return supabase.channel(`keystone:${topic}`);
}
