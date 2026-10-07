import { NextResponse } from "next/server";
import { getWishByCardId, addReaction, getReactionCount } from "@/lib/db/wishRepository";
import type { WishReactionType } from "@/lib/db/wishRepository";

type RouteContext = { params: Promise<{ cardId: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { cardId } = await params;
    const wish = await getWishByCardId(cardId);
    if (!wish) return NextResponse.json({ error: "Wish not found." }, { status: 404 });

    const count = await getReactionCount(wish.id);
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to get reactions." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { cardId } = await params;
    const wish = await getWishByCardId(cardId);
    if (!wish) return NextResponse.json({ error: "Wish not found." }, { status: 404 });

    const body = await request.json() as { reaction?: string; sessionId?: string };
    const reaction = (body.reaction ?? "like") as WishReactionType;
    const sessionId = body.sessionId?.trim() || undefined;

    const validReactions: WishReactionType[] = ["like", "love", "celebrate", "happy"];
    if (!validReactions.includes(reaction)) {
      return NextResponse.json({ error: "Invalid reaction type." }, { status: 400 });
    }

    const count = await addReaction(wish.id, reaction, sessionId);
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to add reaction." },
      { status: 500 },
    );
  }
}
