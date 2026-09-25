import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

export function getSupabaseAdminClient() {
  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "Supabase server environment variables are not configured.",
    );
  }

  return createClient(
    supabaseUrl,
    supabaseSecretKey,
  );
}