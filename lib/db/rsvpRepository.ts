import { getSupabaseAdminClient } from "@/lib/db/supabaseAdmin";
import type {
  RSVP,
  RSVPAttendance,
} from "@/lib/db/database.types";

type CreateRSVPInput = {
  invitationId: string;
  guestName: string;
  attendance: RSVPAttendance;
  guestCount: number;
  message?: string;
};

type RSVPRow = {
  id: string;
  invitation_id: string;
  guest_name: string;
  attendance: RSVPAttendance;
  guest_count: number;
  message: string | null;
  created_at: string;
  updated_at: string;
};

function mapRSVPRow(row: RSVPRow): RSVP {
  return {
    id: row.id,
    invitationId: row.invitation_id,
    guestName: row.guest_name,
    attendance: row.attendance,
    guestCount: row.guest_count,
    message: row.message ?? "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createRSVP(
  input: CreateRSVPInput,
): Promise<RSVP> {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("rsvps")
    .insert({
      invitation_id: input.invitationId,
      guest_name: input.guestName.trim(),
      attendance: input.attendance,
      guest_count: input.guestCount,
      message: input.message?.trim() || null,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(
      `Failed to create RSVP: ${error.message}`,
    );
  }

  return mapRSVPRow(data as RSVPRow);
}