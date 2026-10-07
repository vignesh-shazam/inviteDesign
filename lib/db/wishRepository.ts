import { getSupabaseAdminClient } from "@/lib/db/supabaseAdmin";

// ─── Types ──────────────────────────────────────────────────

export type WishStatus = "draft" | "published";

export type WishReactionType = "like" | "love" | "celebrate" | "happy";

export type Wish = {
  id: string;
  cardId: string;
  recipientName: string;
  relationship: string;
  occasion: string;
  senderName: string;
  customMessage: string;
  aiPrompt: string;
  selectedStyle: string;
  selectedMood: string;
  selectedColorTheme: string;
  title: string;
  message: string;
  shortMessage: string;
  signature: string;
  designConfig: Record<string, unknown>;
  animationConfig: Record<string, unknown>;
  status: WishStatus;
  createdAt: string;
  updatedAt: string;
  reactionCount?: number;
};

type WishRow = {
  id: string;
  card_id: string;
  recipient_name: string;
  relationship: string;
  occasion: string;
  sender_name: string | null;
  custom_message: string | null;
  ai_prompt: string | null;
  selected_style: string;
  selected_mood: string;
  selected_color_theme: string;
  title: string;
  message: string;
  short_message: string;
  signature: string;
  design_config: Record<string, unknown>;
  animation_config: Record<string, unknown>;
  status: WishStatus;
  created_at: string;
  updated_at: string;
};

function mapRow(row: WishRow): Wish {
  return {
    id: row.id,
    cardId: row.card_id,
    recipientName: row.recipient_name,
    relationship: row.relationship,
    occasion: row.occasion,
    senderName: row.sender_name ?? "",
    customMessage: row.custom_message ?? "",
    aiPrompt: row.ai_prompt ?? "",
    selectedStyle: row.selected_style,
    selectedMood: row.selected_mood,
    selectedColorTheme: row.selected_color_theme,
    title: row.title,
    message: row.message,
    shortMessage: row.short_message,
    signature: row.signature,
    designConfig: row.design_config ?? {},
    animationConfig: row.animation_config ?? {},
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ─── Create ──────────────────────────────────────────────────

export type CreateWishInput = {
  recipientName: string;
  relationship: string;
  occasion: string;
  senderName?: string;
  customMessage?: string;
  aiPrompt?: string;
  selectedStyle: string;
  selectedMood: string;
  selectedColorTheme: string;
  title: string;
  message: string;
  shortMessage: string;
  signature: string;
  designConfig?: Record<string, unknown>;
  animationConfig?: Record<string, unknown>;
  status?: WishStatus;
};

export async function createWish(input: CreateWishInput): Promise<Wish> {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("wishes")
    .insert({
      recipient_name: input.recipientName.trim(),
      relationship: input.relationship,
      occasion: input.occasion,
      sender_name: input.senderName?.trim() || null,
      custom_message: input.customMessage?.trim() || null,
      ai_prompt: input.aiPrompt?.trim() || null,
      selected_style: input.selectedStyle,
      selected_mood: input.selectedMood,
      selected_color_theme: input.selectedColorTheme,
      title: input.title.trim(),
      message: input.message.trim(),
      short_message: input.shortMessage.trim(),
      signature: input.signature.trim(),
      design_config: input.designConfig ?? {},
      animation_config: input.animationConfig ?? {},
      status: input.status ?? "draft",
    })
    .select("*")
    .single();

  if (error) throw new Error(`Failed to create wish: ${error.message}`);
  return mapRow(data as WishRow);
}

// ─── Get by card ID ──────────────────────────────────────────

export async function getWishByCardId(cardId: string): Promise<Wish | null> {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("wishes")
    .select("*")
    .eq("card_id", cardId)
    .maybeSingle();

  if (error) throw new Error(`Failed to fetch wish: ${error.message}`);
  if (!data) return null;
  return mapRow(data as WishRow);
}

// ─── List ────────────────────────────────────────────────────

export async function getWishes(options?: {
  status?: WishStatus;
  limit?: number;
  offset?: number;
}): Promise<Wish[]> {
  const supabase = getSupabaseAdminClient();
  const limit = options?.limit ?? 50;
  const offset = options?.offset ?? 0;

  let query = supabase
    .from("wishes")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Failed to fetch wishes: ${error.message}`);
  return (data as WishRow[]).map(mapRow);
}

// ─── Update status ───────────────────────────────────────────

export async function updateWishStatus(
  id: string,
  status: WishStatus,
): Promise<void> {
  const supabase = getSupabaseAdminClient();

  const { error } = await supabase
    .from("wishes")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(`Failed to update wish status: ${error.message}`);
}

// ─── Delete ──────────────────────────────────────────────────

export async function deleteWish(id: string): Promise<void> {
  const supabase = getSupabaseAdminClient();

  const { error } = await supabase.from("wishes").delete().eq("id", id);
  if (error) throw new Error(`Failed to delete wish: ${error.message}`);
}

// ─── Reactions ───────────────────────────────────────────────

export async function getReactionCount(wishId: string): Promise<number> {
  const supabase = getSupabaseAdminClient();

  const { count, error } = await supabase
    .from("wish_reactions")
    .select("id", { count: "exact", head: true })
    .eq("wish_id", wishId);

  if (error) return 0;
  return count ?? 0;
}

export async function addReaction(
  wishId: string,
  reaction: WishReactionType,
  sessionId?: string,
): Promise<number> {
  const supabase = getSupabaseAdminClient();

  // Prevent duplicate reactions from same session
  if (sessionId) {
    const { data: existing } = await supabase
      .from("wish_reactions")
      .select("id")
      .eq("wish_id", wishId)
      .eq("session_id", sessionId)
      .eq("reaction", reaction)
      .maybeSingle();

    if (existing) {
      // Already reacted — remove it (toggle off)
      await supabase
        .from("wish_reactions")
        .delete()
        .eq("wish_id", wishId)
        .eq("session_id", sessionId)
        .eq("reaction", reaction);
    } else {
      await supabase
        .from("wish_reactions")
        .insert({ wish_id: wishId, reaction, session_id: sessionId });
    }
  } else {
    await supabase
      .from("wish_reactions")
      .insert({ wish_id: wishId, reaction, session_id: null });
  }

  return getReactionCount(wishId);
}
