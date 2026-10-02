import { NextResponse } from "next/server";

import {
  generateInvitationAI,
} from "@/lib/ai/aiService";

import type {
  InvitationAIRequest,
} from "@/lib/ai/aiTypes";

export async function POST(
  request: Request
) {
  try {
    const body =
      (await request.json()) as InvitationAIRequest;

    const result =
      await generateInvitationAI(body);

    if (!result.success) {
      return NextResponse.json(
        result,
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(
      "Invitation AI API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to process the AI invitation request.",
      },
      {
        status: 500,
      }
    );
  }
}