import { NextResponse } from "next/server";

import { generateWishAI } from "@/lib/ai/wishes/wishesService";

import type { WishAIRequest } from "@/lib/ai/wishes/wishesTypes";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WishAIRequest;

    const result = await generateWishAI(body);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Wishes AI API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to process the AI wish request.",
      },
      { status: 500 },
    );
  }
}
