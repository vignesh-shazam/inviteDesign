import { getSupabaseAdminClient } from "@/lib/db/supabaseAdmin";
import type { Invitation } from "@/lib/db/database.types";

type CreateInvitationInput = {
  title: string;
  templateId: string;
  category: string;
  eventDate?: string;
  eventTime?: string;
  venue?: string;
  message?: string;
  theme: Invitation["theme"];
  typography: Invitation["typography"];
};

type InvitationRow = {
  id: string;
  card_id: string;
  slug: string;
  title: string;
  template_id: string;
  category: string;
  event_date: string | null;
  event_time: string | null;
  venue: string | null;
  message: string | null;
  theme: Invitation["theme"];
  typography: Invitation["typography"];
  status: Invitation["status"];
  created_at: string;
  updated_at: string;
};

function mapInvitationRow(
  row: InvitationRow,
): Invitation {
  return {
    id: row.id,
    cardId: row.card_id,
    slug: row.slug,
    title: row.title,
    templateId: row.template_id,
    category: row.category,
    eventDate: row.event_date ?? "",
    eventTime: row.event_time ?? "",
    venue: row.venue ?? "",
    message: row.message ?? "",
    theme: row.theme,
    typography: row.typography,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createInvitation(
  input: CreateInvitationInput,
): Promise<Invitation> {
  const supabase = getSupabaseAdminClient();

  const slug =
    input.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "invitation";

  const { data, error } = await supabase
    .from("invitations")
    .insert({
      slug,
      title: input.title.trim(),
      template_id: input.templateId,
      category: input.category,
      event_date: input.eventDate || null,
      event_time: input.eventTime || null,
      venue: input.venue?.trim() || null,
      message: input.message?.trim() || null,
      theme: input.theme,
      typography: input.typography,
      status: "draft",
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(
      `Failed to create invitation: ${error.message}`,
    );
  }

  return mapInvitationRow(data as InvitationRow);
}

export async function getInvitationByCardId(
  cardId: string,
): Promise<Invitation | null> {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("card_id", cardId)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch invitation: ${error.message}`,
    );
  }

  if (!data) {
    return null;
  }

  return mapInvitationRow(data as InvitationRow);
}