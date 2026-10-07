"use client";

import { useState } from "react";

import WishParticles from "@/components/wishes/WishParticles";
import WishCard from "@/components/wishes/WishCard";

import type {
  WishAIDesign,
  WishAIVariation,
  WishAnimationStyle,
} from "@/lib/ai/wishes/wishesTypes";

// ─── Theme colours (matches WishCard) ──────────────────────

const themeColors: Record<
  WishAIDesign["colorTheme"],
  { primary: string; secondary: string; accent: string; bg: string; text: string }
> = {
  "rose-gold": { primary: "#f9a8d4", secondary: "#fcd34d", accent: "#f472b6", bg: "#1c0f14", text: "#fff1f2" },
  lavender:    { primary: "#c4b5fd", secondary: "#e9d5ff", accent: "#a78bfa", bg: "#130f1e", text: "#faf5ff" },
  midnight:    { primary: "#818cf8", secondary: "#a78bfa", accent: "#6366f1", bg: "#08070f", text: "#ffffff" },
  sunset:      { primary: "#fb923c", secondary: "#fda4af", accent: "#f43f5e", bg: "#160a08", text: "#fff7ed" },
  ocean:       { primary: "#38bdf8", secondary: "#bae6fd", accent: "#22d3ee", bg: "#07111c", text: "#f0f9ff" },
  emerald:     { primary: "#34d399", secondary: "#6ee7b7", accent: "#10b981", bg: "#07130f", text: "#ecfdf5" },
  golden:      { primary: "#fcd34d", secondary: "#fde68a", accent: "#f59e0b", bg: "#131007", text: "#fafafa" },
  pastel:      { primary: "#f9a8d4", secondary: "#ddd6fe", accent: "#c4b5fd", bg: "#161222", text: "#ffffff" },
  rainbow:     { primary: "#f472b6", secondary: "#60a5fa", accent: "#a78bfa", bg: "#0e0c18", text: "#ffffff" },
};

// ─── Opening icon per style ─────────────────────────────────

function OpeningIcon({ openingStyle, color }: { openingStyle: WishAIDesign["openingStyle"]; color: string }) {
  const cls = "wish-opening-item wish-opening-delay-2";

  switch (openingStyle) {
    case "gift":
      return <div className={`${cls} text-6xl`} aria-hidden="true">🎁</div>;
    case "envelope":
      return <div className={`${cls} text-6xl`} aria-hidden="true">💌</div>;
    case "petals":
      return <div className={`${cls} text-6xl`} aria-hidden="true">🌸</div>;
    case "light":
      return (
        <div className={`${cls} relative flex h-20 w-20 items-center justify-center rounded-full`}
          style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}>
          <div className="wish-opening-glow absolute inset-0 rounded-full"
            style={{ backgroundColor: color, opacity: 0.12 }} aria-hidden="true" />
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
          </svg>
        </div>
      );
    case "scroll":
      return <div className={`${cls} text-6xl`} aria-hidden="true">📜</div>;
    default: // fade
      return (
        <div className={`${cls} flex h-20 w-20 items-center justify-center rounded-full`}
          style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
            <path d="m12 2-1.4 5.6L5 9l5.6 1.4L12 16l1.4-5.6L19 9l-5.6-1.4Z" />
            <path d="m19 17-.7 2.3L16 20l2.3.7L19 23l.7-2.3L22 20l-2.3-.7Z" />
          </svg>
        </div>
      );
  }
}

// ─── Reaction button ────────────────────────────────────────

type ReactionState = { count: number; active: boolean; bursting: boolean };

function ReactionButton({
  state,
  primaryColor,
  onClick,
}: {
  state: ReactionState;
  primaryColor: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={state.active ? "Unlike this wish" : "Like this wish"}
      aria-pressed={state.active}
      className="relative inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        borderColor: state.active ? `${primaryColor}50` : `${primaryColor}25`,
        backgroundColor: state.active ? `${primaryColor}18` : `${primaryColor}08`,
        color: state.active ? primaryColor : `${primaryColor}99`,
      }}
    >
      {/* Burst emoji on click */}
      {state.bursting && (
        <span className="wish-reaction-burst text-lg" aria-hidden="true">❤️</span>
      )}

      <span
        className={state.active ? "wish-heart-beat" : ""}
        aria-hidden="true"
      >
        {state.active ? "❤️" : "🤍"}
      </span>

      <span>{state.count}</span>
    </button>
  );
}

// ─── Props ──────────────────────────────────────────────────

type WishOpeningExperienceProps = {
  variation: WishAIVariation;
  design: WishAIDesign;
  recipientName: string;
  /** Initial like count from DB */
  initialLikeCount?: number;
  /** Called when user likes/unlikes so parent can persist */
  onReact?: (liked: boolean) => void;
  /** If true, skip the opening screen and show the card directly */
  skipOpening?: boolean;
};

// ─── States ─────────────────────────────────────────────────

type OpenState =
  | "pre"    // ambient background + particles + teaser
  | "tapped" // opening animation
  | "open";  // wish fully revealed

// ─── Component ──────────────────────────────────────────────

export default function WishOpeningExperience({
  variation,
  design,
  recipientName,
  initialLikeCount = 0,
  onReact,
  skipOpening = false,
}: WishOpeningExperienceProps) {
  const [openState, setOpenState] = useState<OpenState>(
    skipOpening ? "open" : "pre",
  );

  const [reaction, setReaction] = useState<ReactionState>({
    count: initialLikeCount,
    active: false,
    bursting: false,
  });

  const colors = themeColors[design.colorTheme] ?? themeColors["midnight"];

  // ── Helpers ──────────────────────────────────────────────

  function handleOpen() {
    setOpenState("tapped");
    // Short delay so the tap animation is visible, then reveal
    setTimeout(() => setOpenState("open"), 600);
  }

  function handleReaction() {
    const willLike = !reaction.active;

    setReaction((prev) => ({
      count: willLike ? prev.count + 1 : Math.max(0, prev.count - 1),
      active: willLike,
      bursting: willLike,
    }));

    if (willLike) {
      // Clear the burst after the animation plays
      setTimeout(() => {
        setReaction((prev) => ({ ...prev, bursting: false }));
      }, 700);
    }

    onReact?.(willLike);
  }

  // Particle count override for tapped state (brief burst)
  const particleCount: number | undefined =
    openState === "tapped" ? 40 : undefined;

  // ── Opening screen ────────────────────────────────────────

  if (openState === "pre" || openState === "tapped") {
    const isTapped = openState === "tapped";

    return (
      <div
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8"
        style={{ backgroundColor: colors.bg }}
      >
        {/* Particles layer */}
        <WishParticles
          animationStyle={design.animationStyle as WishAnimationStyle}
          count={particleCount}
        />

        {/* Ambient background orbs */}
        <div
          className="wish-opening-glow pointer-events-none absolute left-1/4 top-1/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: colors.primary, opacity: 0.14 }}
          aria-hidden="true"
        />
        <div
          className="wish-opening-glow pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: colors.accent, opacity: 0.10 }}
          aria-hidden="true"
        />

        {/* Card */}
        <div
          className="relative z-10 w-full max-w-sm text-center"
          style={{
            opacity: isTapped ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Teaser line */}
          <p
            className="wish-opening-item wish-opening-delay-1 text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: colors.secondary }}
          >
            Someone has a special wish for you
          </p>

          {/* Opening icon */}
          <div className="mt-6 flex justify-center">
            <OpeningIcon openingStyle={design.openingStyle} color={colors.primary} />
          </div>

          {/* Recipient name */}
          <h1
            className="wish-opening-item wish-opening-delay-3 mt-6 text-3xl font-bold sm:text-4xl"
            style={{ color: colors.text }}
          >
            {recipientName}
          </h1>

          <p
            className="wish-opening-item wish-opening-delay-4 mt-3 text-sm leading-6"
            style={{ color: `${colors.text}99` }}
          >
            A {design.style} {design.mood} wish is waiting for you.
          </p>

          {/* Tap to open */}
          <div className="wish-opening-item wish-opening-delay-5 mt-8">
            <button
              type="button"
              onClick={handleOpen}
              className="wish-tap-btn inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold shadow-lg transition-all duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95"
              style={{
                backgroundColor: colors.primary,
                color: colors.bg,
              }}
            >
              <span aria-hidden="true">✨</span>
              Open Your Wish
            </button>
          </div>

          <p
            className="wish-opening-item wish-opening-delay-5 mt-4 text-[11px]"
            style={{ color: `${colors.text}40` }}
          >
            Tap to reveal
          </p>
        </div>
      </div>
    );
  }

  // ── Open / revealed state ─────────────────────────────────

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: colors.bg }}
    >
      {/* Subtle background particles after opening */}
      <WishParticles
        animationStyle={design.animationStyle as WishAnimationStyle}
        count={10}
      />

      <div className="relative z-10 mx-auto max-w-xl px-4 py-12 sm:py-16">

        {/* Occasion chip */}
        <div className="wish-reveal-item wish-reveal-delay-1 mb-6 flex justify-center">
          <span
            className="rounded-full border px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{
              borderColor: `${colors.primary}30`,
              backgroundColor: `${colors.primary}10`,
              color: colors.primary,
            }}
          >
            {design.style} · {design.mood}
          </span>
        </div>

        {/* Wish card */}
        <WishCard
          variation={variation}
          design={design}
          recipientName={recipientName}
          animate
        />

        {/* Short message */}
        <p
          className="wish-reveal-item wish-reveal-delay-5 mt-6 text-center text-sm leading-6"
          style={{ color: `${colors.text}80` }}
        >
          {variation.shortMessage}
        </p>

        {/* Reaction */}
        <div className="wish-reveal-item wish-reveal-delay-5 mt-8 flex flex-col items-center gap-3">
          <p
            className="text-[11px] uppercase tracking-[0.2em]"
            style={{ color: `${colors.text}50` }}
          >
            Did this make you smile?
          </p>

          <ReactionButton
            state={reaction}
            primaryColor={colors.primary}
            onClick={handleReaction}
          />
        </div>

      </div>
    </div>
  );
}
