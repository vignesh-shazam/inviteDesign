import { getSupabaseClient } from "@/lib/db/supabase";

/**
 * Create a new user account.
 */
export async function signUp(
  name: string,
  email: string,
  password: string,
) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Sign in an existing user.
 */
export async function signIn(
  email: string,
  password: string,
) {
  const supabase = getSupabaseClient();

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Sign out the current user.
 */
export async function signOut() {
  const supabase = getSupabaseClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

/**
 * Send a password reset email.
 */
export async function resetPassword(
  email: string,
) {
  const supabase = getSupabaseClient();

  const redirectTo =
    `${window.location.origin}/reset-password`;

  const { data, error } =
    await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo,
      },
    );

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Update the authenticated user's password.
 *
 * This is called after the user opens
 * the password recovery link.
 */
export async function updatePassword(
  password: string,
) {
  const supabase = getSupabaseClient();

  const { data, error } =
    await supabase.auth.updateUser({
      password,
    });

  if (error) {
    throw error;
  }

  return data;
}