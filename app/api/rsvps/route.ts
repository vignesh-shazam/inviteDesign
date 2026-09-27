import { NextResponse } from "next/server";

import { createRSVP } from "@/lib/db/rsvpRepository";
import type {
  RSVPAttendance,
} from "@/lib/db/database.types";

type CreateRSVPRequest = {
  invitationId: string;
  guestName: string;
  attendance: RSVPAttendance;
  guestCount: number;
  message?: string;
};

const allowedAttendance: RSVPAttendance[] = [
  "attending",
  "maybe",
  "not_attending",
];

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as CreateRSVPRequest;

    if (!body.invitationId?.trim()) {
      return NextResponse.json(
        {
          error: "Invitation ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!body.guestName?.trim()) {
      return NextResponse.json(
        {
          error: "Guest name is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!allowedAttendance.includes(body.attendance)) {
      return NextResponse.json(
        {
          error: "Please select a valid attendance option.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !Number.isInteger(body.guestCount) ||
      body.guestCount < 1 ||
      body.guestCount > 20
    ) {
      return NextResponse.json(
        {
          error: "Guest count must be between 1 and 20.",
        },
        {
          status: 400,
        },
      );
    }

    const rsvp = await createRSVP({
      invitationId: body.invitationId,
      guestName: body.guestName,
      attendance: body.attendance,
      guestCount: body.guestCount,
      message: body.message,
    });

    return NextResponse.json(
      {
        message: "RSVP submitted successfully.",
        rsvp: {
          id: rsvp.id,
          invitationId: rsvp.invitationId,
          guestName: rsvp.guestName,
          attendance: rsvp.attendance,
          guestCount: rsvp.guestCount,
          message: rsvp.message,
          createdAt: rsvp.createdAt,
          updatedAt: rsvp.updatedAt,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Create RSVP error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to submit RSVP.",
      },
      {
        status: 500,
      },
    );
  }
}