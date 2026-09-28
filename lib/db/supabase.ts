import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient() {
  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "Supabase environment variables are not configured.",
    );
  }

  if (!supabaseClient) {
    supabaseClient = createClient(
      supabaseUrl,
      supabasePublishableKey,
    );
  }

  return supabaseClient;
}