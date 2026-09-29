import { getSupabaseAdminClient } from "@/lib/db/supabaseAdmin";
import type { Invitation } from "@/lib/db/database.types";

type CreateInvitationInput = {
  title: string;
  person1Name?: string | null;
  person2Name?: string | null;
  templateId: string;
  category: string;
  eventDate?: string;
  eventTime?: string;
  venue?: string;
  venueAddress?: string;
  mapsUrl?: string;
  message?: string;
  theme: Invitation["theme"];
  typography: Invitation["typography"];
};

type InvitationRow = {
  id: string;
  card_id: string;
  slug: string;
  title: string;
  person1_name: string | null;
  person2_name: string | null;
  template_id: string;
  category: string;
  event_date: string | null;
  event_time: string | null;
  venue: string | null;
  venue_address: string | null;
  maps_url: string | null;
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

    person1Name:
      row.person1_name ?? "",

    person2Name:
      row.person2_name ?? "",

    templateId: row.template_id,
    category: row.category,

    eventDate:
      row.event_date ?? "",

    eventTime:
      row.event_time ?? "",

    venue:
      row.venue ?? "",

    venueAddress:
      row.venue_address ?? "",

    mapsUrl:
      row.maps_url ?? "",

    message:
      row.message ?? "",

    theme:
      row.theme,

    typography:
      row.typography,

    status:
      row.status,

    createdAt:
      row.created_at,

    updatedAt:
      row.updated_at,
  };
}

export async function createInvitation(
  input: CreateInvitationInput,
): Promise<Invitation> {
  const supabase =
    getSupabaseAdminClient();

  const slug =
    input.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") ||
    "invitation";

  const { data, error } =
    await supabase
      .from("invitations")
      .insert({
        slug,

        title:
          input.title.trim(),

        person1_name:
          input.person1Name?.trim() ||
          null,

        person2_name:
          input.person2Name?.trim() ||
          null,

        template_id:
          input.templateId,

        category:
          input.category,

        event_date:
          input.eventDate || null,

        event_time:
          input.eventTime || null,

        venue:
          input.venue?.trim() ||
          null,

        venue_address:
          input.venueAddress?.trim() ||
          null,

        maps_url:
          input.mapsUrl?.trim() ||
          null,

        message:
          input.message?.trim() ||
          null,

        theme:
          input.theme,

        typography:
          input.typography,

        status:
          "draft",
      })
      .select("*")
      .single();

  if (error) {
    throw new Error(
      `Failed to create invitation: ${error.message}`,
    );
  }

  return mapInvitationRow(
    data as InvitationRow,
  );
}

export async function getInvitationByCardId(
  cardId: string,
): Promise<Invitation | null> {
  const supabase =
    getSupabaseAdminClient();

  const { data, error } =
    await supabase
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

  return mapInvitationRow(
    data as InvitationRow,
  );
}