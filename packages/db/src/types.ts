export type Json = boolean | number | string | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      conversation_events: {
        Row: {
          actor_id: string | null;
          conversation_id: string | null;
          created_at: string;
          event_type: string;
          id: string;
          idempotency_key: string | null;
          message_id: string | null;
          payload: Json;
        };
        Insert: {
          actor_id?: string | null;
          conversation_id?: string | null;
          created_at?: string;
          event_type: string;
          id?: string;
          idempotency_key?: string | null;
          message_id?: string | null;
          payload?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["conversation_events"]["Insert"]>;
        Relationships: [];
      };
      conversation_participants: {
        Row: {
          avatar_url: string | null;
          conversation_id: string;
          created_at: string;
          display_name: string | null;
          email: string | null;
          external_participant_id: string | null;
          handle: string | null;
          id: string;
          kind: Database["public"]["Enums"]["participant_kind"];
          metadata: Json;
          phone: string | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          conversation_id: string;
          created_at?: string;
          display_name?: string | null;
          email?: string | null;
          external_participant_id?: string | null;
          handle?: string | null;
          id?: string;
          kind?: Database["public"]["Enums"]["participant_kind"];
          metadata?: Json;
          phone?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["conversation_participants"]["Insert"]>;
        Relationships: [];
      };
      conversation_summaries: {
        Row: {
          conversation_id: string;
          created_at: string;
          created_by: string | null;
          facts: Json;
          id: string;
          message_range: Json;
          model: string | null;
          summary: string;
        };
        Insert: {
          conversation_id: string;
          created_at?: string;
          created_by?: string | null;
          facts?: Json;
          id?: string;
          message_range?: Json;
          model?: string | null;
          summary: string;
        };
        Update: Partial<Database["public"]["Tables"]["conversation_summaries"]["Insert"]>;
        Relationships: [];
      };
      conversation_tasks: {
        Row: {
          assigned_to: string | null;
          conversation_id: string;
          created_at: string;
          created_by: string | null;
          description: string | null;
          due_at: string | null;
          id: string;
          message_id: string | null;
          metadata: Json;
          status: Database["public"]["Enums"]["task_status"];
          title: string;
          updated_at: string;
        };
        Insert: {
          assigned_to?: string | null;
          conversation_id: string;
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          due_at?: string | null;
          id?: string;
          message_id?: string | null;
          metadata?: Json;
          status?: Database["public"]["Enums"]["task_status"];
          title: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["conversation_tasks"]["Insert"]>;
        Relationships: [];
      };
      conversation_workflows: {
        Row: {
          conversation_id: string;
          created_at: string;
          error: string | null;
          id: string;
          input: Json;
          output: Json;
          provider_run_id: string | null;
          status: Database["public"]["Enums"]["workflow_status"];
          trigger_event_id: string | null;
          updated_at: string;
          workflow_name: string;
        };
        Insert: {
          conversation_id: string;
          created_at?: string;
          error?: string | null;
          id?: string;
          input?: Json;
          output?: Json;
          provider_run_id?: string | null;
          status?: Database["public"]["Enums"]["workflow_status"];
          trigger_event_id?: string | null;
          updated_at?: string;
          workflow_name: string;
        };
        Update: Partial<Database["public"]["Tables"]["conversation_workflows"]["Insert"]>;
        Relationships: [];
      };
      conversations: {
        Row: {
          created_at: string;
          external_thread_id: string | null;
          id: string;
          last_message_at: string | null;
          metadata: Json;
          owner_id: string | null;
          primary_channel: Database["public"]["Enums"]["conversation_channel"];
          status: Database["public"]["Enums"]["conversation_status"];
          subject: string | null;
          updated_at: string;
          workspace_id: string | null;
        };
        Insert: {
          created_at?: string;
          external_thread_id?: string | null;
          id?: string;
          last_message_at?: string | null;
          metadata?: Json;
          owner_id?: string | null;
          primary_channel?: Database["public"]["Enums"]["conversation_channel"];
          status?: Database["public"]["Enums"]["conversation_status"];
          subject?: string | null;
          updated_at?: string;
          workspace_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["conversations"]["Insert"]>;
        Relationships: [];
      };
      extracted_entities: {
        Row: {
          confidence: number | null;
          conversation_id: string;
          created_at: string;
          entity_type: string;
          id: string;
          message_id: string | null;
          metadata: Json;
          normalized_value: Json;
          source: string;
          value: string;
        };
        Insert: {
          confidence?: number | null;
          conversation_id: string;
          created_at?: string;
          entity_type: string;
          id?: string;
          message_id?: string | null;
          metadata?: Json;
          normalized_value?: Json;
          source?: string;
          value: string;
        };
        Update: Partial<Database["public"]["Tables"]["extracted_entities"]["Insert"]>;
        Relationships: [];
      };
      messages: {
        Row: {
          ai_annotations: Json;
          attachments: Json;
          body: string | null;
          channel: Database["public"]["Enums"]["conversation_channel"];
          conversation_id: string;
          created_at: string;
          external_message_id: string | null;
          id: string;
          participant_id: string | null;
          provider: string | null;
          provider_payload: Json;
          role: Database["public"]["Enums"]["message_role"];
          sent_at: string | null;
          status: Database["public"]["Enums"]["message_status"];
          updated_at: string;
        };
        Insert: {
          ai_annotations?: Json;
          attachments?: Json;
          body?: string | null;
          channel?: Database["public"]["Enums"]["conversation_channel"];
          conversation_id: string;
          created_at?: string;
          external_message_id?: string | null;
          id?: string;
          participant_id?: string | null;
          provider?: string | null;
          provider_payload?: Json;
          role?: Database["public"]["Enums"]["message_role"];
          sent_at?: string | null;
          status?: Database["public"]["Enums"]["message_status"];
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      conversation_channel: "in_app" | "email" | "sms" | "whatsapp" | "voice" | "web" | "api";
      conversation_status: "open" | "pending" | "closed" | "archived";
      message_role: "user" | "assistant" | "system" | "participant";
      message_status: "draft" | "queued" | "sent" | "delivered" | "read" | "failed";
      participant_kind: "user" | "contact" | "agent" | "system" | "external";
      task_status: "open" | "in_progress" | "completed" | "cancelled";
      workflow_status: "queued" | "running" | "completed" | "failed" | "cancelled";
    };
    CompositeTypes: Record<string, never>;
  };
};

export type SupabaseConfig = {
  anonKey: string;
  serviceRoleKey?: string;
  url: string;
};
