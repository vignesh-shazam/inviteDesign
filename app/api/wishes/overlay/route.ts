import { NextResponse } from "next/server";
import { generateWishAI } from "@/lib/ai/wishes/wishesService";
import type { WishAIRequest } from "@/lib/ai/wishes/wishesTypes";

// ── Overlay style recommendation ────────────────────────────

type OverlayStyle = {
  nameColor: string;
  nameFontSize: number;
  nameFontFamily: string;
  nameShadow: string;
  namePosition: "center" | "top" | "bottom";
  messageColor: string;
  messageFontSize: number;
  messageFontFamily: string;
  messageShadow: string;
  messagePosition: "center" | "top" | "bottom";
};

const occasionStyles: Record<string, OverlayStyle> = {
  birthday: {
    nameColor: "#fcd34d", nameFontSize: 52, nameFontFamily: "Impact, sans-serif",
    nameShadow: "2px 2px 10px rgba(0,0,0,0.9)", namePosition: "center",
    messageColor: "#ffffff", messageFontSize: 22, messageFontFamily: "Arial, sans-serif",
    messageShadow: "1px 1px 6px rgba(0,0,0,0.8)", messagePosition: "bottom",
  },
  wedding: {
    nameColor: "#f9f3e3", nameFontSize: 48, nameFontFamily: "Georgia, serif",
    nameShadow: "1px 1px 12px rgba(0,0,0,0.6)", namePosition: "center",
    messageColor: "#fce8d5", messageFontSize: 20, messageFontFamily: "Georgia, serif",
    messageShadow: "1px 1px 8px rgba(0,0,0,0.6)", messagePosition: "bottom",
  },
  anniversary: {
    nameColor: "#f9a8d4", nameFontSize: 50, nameFontFamily: "Georgia, serif",
    nameShadow: "0 0 16px rgba(244,114,182,0.8)", namePosition: "center",
    messageColor: "#fce7f3", messageFontSize: 20, messageFontFamily: "Georgia, serif",
    messageShadow: "1px 1px 8px rgba(0,0,0,0.7)", messagePosition: "bottom",
  },
  festival: {
    nameColor: "#fcd34d", nameFontSize: 54, nameFontFamily: "Impact, sans-serif",
    nameShadow: "2px 2px 12px rgba(251,146,60,0.9)", namePosition: "center",
    messageColor: "#fed7aa", messageFontSize: 22, messageFontFamily: "Arial, sans-serif",
    messageShadow: "1px 1px 6px rgba(0,0,0,0.8)", messagePosition: "bottom",
  },
  congratulations: {
    nameColor: "#86efac", nameFontSize: 50, nameFontFamily: "Arial Black, sans-serif",
    nameShadow: "0 0 14px rgba(34,197,94,0.7)", namePosition: "center",
    messageColor: "#dcfce7", messageFontSize: 20, messageFontFamily: "Arial, sans-serif",
    messageShadow: "1px 1px 6px rgba(0,0,0,0.8)", messagePosition: "bottom",
  },
  default: {
    nameColor: "#ffffff", nameFontSize: 48, nameFontFamily: "Arial, sans-serif",
    nameShadow: "2px 2px 10px rgba(0,0,0,0.9)", namePosition: "center",
    messageColor: "#f1f5f9", messageFontSize: 20, messageFontFamily: "Arial, sans-serif",
    messageShadow: "1px 1px 6px rgba(0,0,0,0.8)", messagePosition: "bottom",
  },
};

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      recipientName: string;
      occasion: string;
      relationship?: string;
      senderName?: string;
    };

    if (!body.recipientName?.trim()) {
      return NextResponse.json({ error: "Recipient name is required." }, { status: 400 });
    }

    // Use existing wishes AI service
    const aiRequest: WishAIRequest = {
      recipientName: body.recipientName.trim(),
      occasion: (body.occasion as WishAIRequest["occasion"]) ?? "custom",
      relationship: (body.relationship as WishAIRequest["relationship"]) ?? "friend",
      senderName: body.senderName,
      style: "playful",
      mood: "happy",
      colorTheme: "golden",
    };

    const result = await generateWishAI(aiRequest);

    if (!result.success || !result.data) {
      return NextResponse.json({ error: result.error ?? "Failed to generate messages." }, { status: 400 });
    }

    // Return 3 message variations + AI-recommended overlay style
    const variations = result.data.variations.map((v) => ({
      title: v.title,
      message: v.message,
      shortMessage: v.shortMessage,
      signature: v.signature,
    }));

    const overlayStyle = occasionStyles[body.occasion] ?? occasionStyles["default"];

    return NextResponse.json({
      success: true,
      variations,
      overlayStyle,
      whatsappMessage: result.data.sharing.whatsappMessage,
    });
  } catch (error) {
    console.error("Overlay generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate overlay text." },
      { status: 500 },
    );
  }
}
