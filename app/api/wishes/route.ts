import { NextResponse } from "next/server";
import { createWish, getWishes } from "@/lib/db/wishRepository";
import type { CreateWishInput } from "@/lib/db/wishRepository";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateWishInput & { publish?: boolean };

    if (!body.recipientName?.trim()) {
      return NextResponse.json({ error: "Recipient name is required." }, { status: 400 });
    }
    if (!body.title?.trim()) {
      return NextResponse.json({ error: "Wish title is required." }, { status: 400 });
    }

    const wish = await createWish({
      ...body,
      status: body.publish ? "published" : "draft",
    });

    return NextResponse.json(
      {
        message: body.publish ? "Wish published successfully." : "Wish saved as draft.",
        wish: {
          id: wish.id,
          cardId: wish.cardId,
          title: wish.title,
          recipientName: wish.recipientName,
          occasion: wish.occasion,
          status: wish.status,
          publicUrl: `/w/${wish.cardId}`,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create wish error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save wish." },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as "draft" | "published" | null;
    const limit = Number(searchParams.get("limit") ?? "50");
    const offset = Number(searchParams.get("offset") ?? "0");

    const wishes = await getWishes({ status: status ?? undefined, limit, offset });
    return NextResponse.json({ wishes });
  } catch (error) {
    console.error("List wishes error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch wishes." },
      { status: 500 },
    );
  }
}
