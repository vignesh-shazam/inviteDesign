"use client";

import { useState, useEffect, useRef } from "react";
import WishIllustration from "@/components/wishes/WishIllustration";
import WishParticles from "@/components/wishes/WishParticles";
import type { Wish } from "@/lib/db/wishRepository";
import type { WishAnimationStyle, WishColorTheme, WishOccasion } from "@/lib/ai/wishes/wishesTypes";

// ─── Theme colours ──────────────────────────────────────────

const themeColors: Record<string, { primary: string; secondary: string; bg: string; text: string; accent: string }> = {
  "rose-gold": { primary: "#f9a8d4", secondary: "#fcd34d", bg: "#1c0f14", text: "#fff1f2", accent: "#f472b6" },
  lavender:    { primary: "#c4b5fd", secondary: "#e9d5ff", bg: "#130f1e", text: "#faf5ff", accent: "#a78bfa" },
  midnight:    { primary: "#818cf8", secondary: "#a78bfa", bg: "#08070f", text: "#ffffff", accent: "#6366f1" },
  sunset:      { primary: "#fb923c", secondary: "#fda4af", bg: "#160a08", text: "#fff7ed", accent: "#f43f5e" },
  ocean:       { primary: "#38bdf8", secondary: "#bae6fd", bg: "#07111c", text: "#f0f9ff", accent: "#22d3ee" },
  emerald:     { primary: "#34d399", secondary: "#6ee7b7", bg: "#07130f", text: "#ecfdf5", accent: "#10b981" },
  golden:      { primary: "#fcd34d", secondary: "#fde68a", bg: "#131007", text: "#fafafa", accent: "#f59e0b" },
  pastel:      { primary: "#f9a8d4", secondary: "#ddd6fe", bg: "#161222", text: "#ffffff", accent: "#c4b5fd" },
  rainbow:     { primary: "#f472b6", secondary: "#60a5fa", bg: "#0e0c18", text: "#ffffff", accent: "#a78bfa" },
};

function getColors(colorTheme: string) {
  return themeColors[colorTheme] ?? themeColors["midnight"];
}

// ─── Reaction emojis ────────────────────────────────────────

const REACTIONS = [
  { type: "like", emoji: "❤️", label: "Love" },
  { type: "happy", emoji: "😊", label: "Happy" },
  { type: "celebrate", emoji: "🎉", label: "Celebrate" },
  { type: "love", emoji: "😍", label: "Wow" },
] as const;

// ─── Opening states ──────────────────────────────────────────

type OpenState = "pre" | "opening" | "open";

// ─── Component ──────────────────────────────────────────────

export default function WishPublicView({
  wish,
  initialReactionCount,
  cardId,
}: {
  wish: Wish;
  initialReactionCount: number;
  cardId: string;
}) {
  const colorTheme = (wish.designConfig?.colorTheme as WishColorTheme) ?? wish.selectedColorTheme;
  const animationStyle = (wish.designConfig?.animationStyle as WishAnimationStyle) ?? "birthday";
  const openingStyle = (wish.designConfig?.openingStyle as string) ?? "envelope";
  const colors = getColors(colorTheme);

  const [openState, setOpenState] = useState<OpenState>("pre");
  const [reactionCount, setReactionCount] = useState(initialReactionCount);
  const [activeReaction, setActiveReaction] = useState<string | null>(null);
  const [reactionBurst, setReactionBurst] = useState(false);
  const sessionId = useRef<string>("");

  // Generate a stable anonymous session ID
  useEffect(() => {
    const stored = sessionStorage.getItem("wish_session");
    if (stored) { sessionId.current = stored; return; }
    const id = `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem("wish_session", id);
    sessionId.current = id;
  }, []);

  function handleOpen() {
    setOpenState("opening");
    setTimeout(() => setOpenState("open"), 700);
  }

  async function handleReaction(type: string) {
    const was = activeReaction === type;
    setActiveReaction(was ? null : type);
    if (!was) { setReactionBurst(true); setTimeout(() => setReactionBurst(false), 600); }

    try {
      const res = await fetch(`/api/wishes/${cardId}/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction: type, sessionId: sessionId.current }),
      });
      if (res.ok) {
        const data = await res.json();
        setReactionCount(data.count ?? reactionCount);
      }
    } catch { /* optimistic update already applied */ }
  }

  // ── Opening screen ──────────────────────────────────────────

  if (openState !== "open") {
    const fading = openState === "opening";
    return (
      <div
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
        style={{ backgroundColor: colors.bg }}
      >
        <WishParticles animationStyle={animationStyle} />

        {/* Ambient orbs */}
        <div className="wish-opening-glow pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: colors.primary, opacity: 0.15 }} />
        <div className="wish-opening-glow pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: colors.accent, opacity: 0.12 }} />

        <div
          className="relative z-10 w-full max-w-xs text-center transition-opacity duration-500"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {/* Opening icon */}
          <div className="wish-opening-item wish-opening-delay-1 flex justify-center mb-6">
            {openingStyle === "envelope" ? (
              <div className="flex h-24 w-32 flex-col items-center justify-center rounded-2xl border-2"
                style={{ borderColor: `${colors.primary}50`, backgroundColor: `${colors.primary}12` }}>
                <div className="text-5xl">💌</div>
              </div>
            ) : openingStyle === "gift" ? (
              <div className="text-6xl wish-opening-item wish-opening-delay-2">🎁</div>
            ) : openingStyle === "petals" ? (
              <div className="text-6xl wish-opening-item wish-opening-delay-2">🌸</div>
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{ backgroundColor: `${colors.primary}18`, border: `1px solid ${colors.primary}30` }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.5">
                  <path d="m12 2-1.4 5.6L5 9l5.6 1.4L12 16l1.4-5.6L19 9l-5.6-1.4Z" />
                  <path d="m19 17-.7 2.3L16 20l2.3.7L19 23l.7-2.3L22 20l-2.3-.7Z" />
                </svg>
              </div>
            )}
          </div>

          <p
            className="wish-opening-item wish-opening-delay-2 text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: colors.secondary }}
          >
            Someone has a special wish for you
          </p>

          <h1
            className="wish-opening-item wish-opening-delay-3 mt-4 text-3xl font-bold sm:text-4xl"
            style={{ color: colors.text }}
          >
            {wish.recipientName}
          </h1>

          <p
            className="wish-opening-item wish-opening-delay-4 mt-3 text-sm leading-6"
            style={{ color: `${colors.text}80` }}
          >
            A {wish.selectedStyle} {wish.selectedMood} wish is waiting for you.
          </p>

          <div className="wish-opening-item wish-opening-delay-5 mt-8">
            <button
              type="button"
              onClick={handleOpen}
              className="wish-tap-btn inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold shadow-xl transition-all active:scale-95 focus:outline-none"
              style={{ backgroundColor: colors.primary, color: colors.bg }}
            >
              <span aria-hidden="true">✨</span>
              Click to Open
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Revealed state ──────────────────────────────────────────

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: colors.bg }}>
      <WishParticles animationStyle={animationStyle} count={12} />

      <div className="relative z-10 mx-auto max-w-lg px-4 py-12 sm:py-16">

        {/* Occasion badge */}
        <div className="wish-reveal-item wish-reveal-delay-1 mb-6 flex justify-center">
          <span
            className="rounded-full border px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ borderColor: `${colors.primary}30`, backgroundColor: `${colors.primary}10`, color: colors.primary }}
          >
            {wish.occasion.replace(/-/g, " ")} · {wish.selectedStyle}
          </span>
        </div>

        {/* Card */}
        <div
          className="wish-card-entrance relative overflow-hidden rounded-3xl p-6 sm:p-10 text-center"
          style={{
            backgroundColor: `${colors.bg}ee`,
            boxShadow: `0 0 80px ${colors.primary}20`,
            border: `1px solid ${colors.primary}20`,
          }}
        >
          {/* Ambient glows */}
          <div className="wish-ambient-orb pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full blur-3xl"
            style={{ backgroundColor: colors.primary, opacity: 0.18 }} />
          <div className="wish-ambient-orb-reverse pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full blur-3xl"
            style={{ backgroundColor: colors.accent, opacity: 0.15 }} />
          <div className="pointer-events-none absolute inset-4 rounded-2xl"
            style={{ border: `1px solid ${colors.primary}10` }} />

          <div className="relative">
            {/* Illustration */}
            <div className="wish-reveal-item wish-reveal-delay-1 mb-4 flex justify-center">
              <WishIllustration
                occasion={wish.occasion as WishOccasion}
                primaryColor={colors.primary}
                secondaryColor={colors.secondary}
                size="full"
              />
            </div>

            <div className="mx-auto h-px w-12 rounded-full mb-5" style={{ backgroundColor: `${colors.primary}40` }} />

            <p
              className="wish-reveal-item wish-reveal-delay-1 text-[9px] font-semibold uppercase tracking-[0.35em]"
              style={{ color: colors.primary }}
            >
              {(wish.designConfig?.decoration as string) ?? "sparkles"} · {animationStyle}
            </p>

            <h1
              className="wish-reveal-item wish-reveal-delay-2 mt-3 text-2xl font-bold leading-snug sm:text-3xl"
              style={{ color: colors.primary }}
            >
              {wish.title}
            </h1>

            <p
              className="wish-reveal-item wish-reveal-delay-2 mt-2 text-sm font-medium"
              style={{ color: colors.secondary }}
            >
              For {wish.recipientName}
            </p>

            <div className="mx-auto mt-4 h-px w-10 rounded-full" style={{ backgroundColor: `${colors.accent}40` }} />

            <p
              className="wish-reveal-item wish-reveal-delay-3 mx-auto mt-5 max-w-md text-base leading-7 sm:text-lg"
              style={{ color: colors.text }}
            >
              {wish.message}
            </p>

            <div className="mx-auto mt-5 h-px w-10 rounded-full" style={{ backgroundColor: `${colors.primary}40` }} />

            <p
              className="wish-reveal-item wish-reveal-delay-4 mt-4 text-sm italic"
              style={{ color: colors.secondary }}
            >
              {wish.signature}
            </p>
          </div>
        </div>

        {/* Short message */}
        <p
          className="wish-reveal-item wish-reveal-delay-5 mt-6 text-center text-sm leading-6"
          style={{ color: `${colors.text}70` }}
        >
          {wish.shortMessage}
        </p>

        {/* Reactions */}
        <div className="wish-reveal-item wish-reveal-delay-5 mt-8 flex flex-col items-center gap-4">
          <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: `${colors.text}50` }}>
            Did this make you smile?
          </p>

          {/* Like count */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">❤️</span>
            <span className="text-lg font-bold" style={{ color: colors.primary }}>
              {reactionCount}
            </span>
            <span className="text-xs" style={{ color: `${colors.text}60` }}>Likes</span>
          </div>

          {/* Reaction bar */}
          <div className="flex items-center gap-2">
            {REACTIONS.map((r) => {
              const isActive = activeReaction === r.type;
              return (
                <button
                  key={r.type}
                  type="button"
                  onClick={() => handleReaction(r.type)}
                  aria-label={r.label}
                  aria-pressed={isActive}
                  className={`relative flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2 active:scale-90 ${
                    isActive
                      ? "scale-110 shadow-lg"
                      : "opacity-70 hover:opacity-100 hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: isActive ? `${colors.primary}20` : `${colors.primary}08`,
                    border: `1px solid ${isActive ? colors.primary + "40" : colors.primary + "18"}`,
                  }}
                >
                  {isActive && reactionBurst && (
                    <span className="wish-reaction-burst text-xl absolute" aria-hidden="true">{r.emoji}</span>
                  )}
                  <span className={isActive ? "wish-heart-beat" : ""}>{r.emoji}</span>
                </button>
              );
            })}
          </div>

          <p className="text-[10px] text-center" style={{ color: `${colors.text}40` }}>
            Thank you for making this wish special!
          </p>
        </div>

        {/* Footer */}
        <p className="mt-12 text-center text-[10px]" style={{ color: `${colors.text}30` }}>
          Created with MyInviteVerse · Wish ID: {wish.cardId}
        </p>

      </div>
    </div>
  );
}
