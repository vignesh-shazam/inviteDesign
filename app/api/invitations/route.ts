import { NextResponse } from "next/server";

import { createInvitation } from "@/lib/db/invitationRepository";
import type { Invitation } from "@/lib/db/database.types";

type CreateInvitationRequest = {
  title: string;
  templateId: string;
  category: string;
  eventDate?: string;
  eventTime?: string;
  venue?: string;
  theme: Invitation["theme"];
  typography: Invitation["typography"];
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as CreateInvitationRequest;

    if (!body.title?.trim()) {
      return NextResponse.json(
        {
          error: "Invitation title is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!body.templateId?.trim()) {
      return NextResponse.json(
        {
          error: "Template ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!body.category?.trim()) {
      return NextResponse.json(
        {
          error: "Invitation category is required.",
        },
        {
          status: 400,
        },
      );
    }

    const invitation = await createInvitation({
      title: body.title,
      templateId: body.templateId,
      category: body.category,
      eventDate: body.eventDate,
      eventTime: body.eventTime,
      venue: body.venue,
      message: body.message,
      theme: body.theme,
      typography: body.typography,
    });

    return NextResponse.json(
      {
        message: "Invitation draft created successfully.",
        invitation: {
          id: invitation.id,
          cardId: invitation.cardId,
          slug: invitation.slug,
          title: invitation.title,
          templateId: invitation.templateId,
          category: invitation.category,
          eventDate: invitation.eventDate,
          eventTime: invitation.eventTime,
          venue: invitation.venue,
          message: invitation.message,
          theme: invitation.theme,
          typography: invitation.typography,
          status: invitation.status,
          createdAt: invitation.createdAt,
          updatedAt: invitation.updatedAt,
          draftId: `${invitation.slug}-${invitation.cardId}`,
        },
      },
      {
        status: 201,
      },
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
      {
        status: 500,
      },
    );
  }
}