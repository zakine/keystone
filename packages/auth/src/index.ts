import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Database } from "@keystone/db";

export type AuthUser = Pick<User, "app_metadata" | "email" | "id" | "user_metadata">;

export type SessionState =
  | { status: "anonymous"; user: null }
  | { status: "authenticated"; user: AuthUser };

export async function getSessionState(supabase: SupabaseClient<Database>): Promise<SessionState> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { status: "anonymous", user: null };
  }

  return { status: "authenticated", user };
}

export async function signOut(supabase: SupabaseClient<Database>) {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}
