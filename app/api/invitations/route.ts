import { NextResponse } from "next/server";

import {
  createInvitation,
  getInvitations,
} from "@/lib/db/invitationRepository";
import type { Invitation } from "@/lib/db/database.types";
import type { InvitationAIDesignSnapshot } from "@/lib/db/database.types";

type CreateInvitationRequest = {
  title: string;
  person1Name?: string;
  person2Name?: string;
  templateId: string;
  category: string;
  eventDate?: string;
  eventTime?: string;
  venue?: string;
  venueAddress?: string;
  mapsUrl?: string;
  theme: Invitation["theme"];
  typography: Invitation["typography"];
  message?: string;
  aiDesign?: InvitationAIDesignSnapshot | null;
};

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as CreateInvitationRequest;

    if (!body.title?.trim()) {
      return NextResponse.json(
        { error: "Invitation title is required." },
        { status: 400 },
      );
    }

    if (!body.templateId?.trim()) {
      return NextResponse.json(
        { error: "Template ID is required." },
        { status: 400 },
      );
    }

    if (!body.category?.trim()) {
      return NextResponse.json(
        { error: "Invitation category is required." },
        { status: 400 },
      );
    }

    const invitation = await createInvitation({
      title: body.title,

      person1Name:
        body.category === "Wedding"
          ? body.person1Name?.trim() || null
          : null,

      person2Name:
        body.category === "Wedding"
          ? body.person2Name?.trim() || null
          : null,

      templateId: body.templateId,
      category: body.category,

      eventDate: body.eventDate,
      eventTime: body.eventTime,

      venue: body.venue,
      venueAddress: body.venueAddress,
      mapsUrl: body.mapsUrl,

      message: body.message,

      theme: body.theme,
      typography: body.typography,

      aiDesign: body.aiDesign ?? null,
    });

    return NextResponse.json(
      {
        message: "Invitation draft created successfully.",

        invitation: {
          id: invitation.id,
          cardId: invitation.cardId,
          slug: invitation.slug,
          title: invitation.title,
          person1Name: invitation.person1Name,
          person2Name: invitation.person2Name,
          templateId: invitation.templateId,
          category: invitation.category,
          eventDate: invitation.eventDate,
          eventTime: invitation.eventTime,
          venue: invitation.venue,
          venueAddress: invitation.venueAddress,
          mapsUrl: invitation.mapsUrl,
          message: invitation.message,
          theme: invitation.theme,
          typography: invitation.typography,
          aiDesign: invitation.aiDesign,
          status: invitation.status,
          createdAt: invitation.createdAt,
          updatedAt: invitation.updatedAt,

          draftId: `${invitation.slug}-${invitation.cardId}`,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create invitation error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create invitation.",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") ?? "50");
    const offset = Number(searchParams.get("offset") ?? "0");

    const invitations = await getInvitations({ limit, offset });

    return NextResponse.json({ invitations });
  } catch (error) {
    console.error("List invitations error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch invitations.",
      },
      { status: 500 },
    );
  }
}
