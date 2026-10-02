import {
  generateInvitationContent,
} from "./providers/geminiProvider";

import type {
  InvitationAIRequest,
  InvitationAIResponse,
} from "./aiTypes";

export async function generateInvitationAI(
  request: InvitationAIRequest
): Promise<InvitationAIResponse> {
  try {
    if (!request.eventType) {
      return {
        success: false,
        error: "Event type is required.",
      };
    }

    if (!request.eventName.trim()) {
      return {
        success: false,
        error: "Event name is required.",
      };
    }

    if (!request.tone) {
      return {
        success: false,
        error: "Invitation tone is required.",
      };
    }

    const content =
      await generateInvitationContent(request);

    return {
      success: true,
      data: content,
    };
  } catch (error) {
    console.error(
      "AI invitation generation failed:",
      error
    );

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to generate invitation content.",
    };
  }
}