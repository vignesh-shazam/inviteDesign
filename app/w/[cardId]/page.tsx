import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWishByCardId, getReactionCount } from "@/lib/db/wishRepository";
import WishPublicView from "@/components/wishes/WishPublicView";

type Props = { params: Promise<{ cardId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { cardId } = await params;
    const wish = await getWishByCardId(cardId);
    if (!wish) return { title: "Wish | MyInviteVerse" };

    const title = `${wish.occasion.charAt(0).toUpperCase() + wish.occasion.slice(1)} Wish for ${wish.recipientName} | MyInviteVerse`;
    return {
      title,
      description: wish.shortMessage,
      openGraph: {
        title,
        description: wish.shortMessage,
        type: "website",
      },
    };
  } catch {
    return { title: "Wish | MyInviteVerse" };
  }
}

export default async function PublicWishPage({ params }: Props) {
  const { cardId } = await params;

  let wish;
  try {
    wish = await getWishByCardId(cardId);
  } catch {
    notFound();
  }

  if (!wish || wish.status !== "published") {
    notFound();
  }

  const reactionCount = await getReactionCount(wish.id).catch(() => 0);

  return (
    <WishPublicView
      wish={wish}
      initialReactionCount={reactionCount}
      cardId={cardId}
    />
  );
}
