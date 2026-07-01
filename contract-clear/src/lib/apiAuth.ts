import { User } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function requireApiUser(): Promise<User | null> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
