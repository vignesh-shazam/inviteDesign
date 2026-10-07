import { generateWishContent } from "./wishesGeminiProvider";

import type {
  WishAIRequest,
  WishAIResponse,
} from "./wishesTypes";

export async function generateWishAI(
  request: WishAIRequest,
): Promise<WishAIResponse> {
  try {
    if (!request.recipientName?.trim()) {
      return {
        success: false,
        error: "Recipient name is required.",
      };
    }

    if (!request.occasion) {
      return {
        success: false,
        error: "Occasion is required.",
      };
    }

    if (!request.relationship) {
      return {
        success: false,
        error: "Relationship is required.",
      };
    }

    if (!request.style) {
      return {
        success: false,
        error: "Style is required.",
      };
    }

    if (!request.mood) {
      return {
        success: false,
        error: "Mood is required.",
      };
    }

    if (!request.colorTheme) {
      return {
        success: false,
        error: "Color theme is required.",
      };
    }

    const data = await generateWishContent(request);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("AI wish generation failed:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to generate wish content.",
    };
  }
}
