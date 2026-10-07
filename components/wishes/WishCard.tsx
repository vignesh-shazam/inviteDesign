"use client";

import type { WishAIDesign, WishAIVariation } from "@/lib/ai/wishes/wishesTypes";

// ─── Color palette per theme ────────────────────────────────

const themeColors: Record<
  WishAIDesign["colorTheme"],
  { primary: string; secondary: string; accent: string; bg: string; text: string }
> = {
  "rose-gold": {
    primary:   "#f9a8d4",
    secondary: "#fcd34d",
    accent:    "#f472b6",
    bg:        "#1c0f14",
    text:      "#fff1f2",
  },
  lavender: {
    primary:   "#c4b5fd",
    secondary: "#e9d5ff",
    accent:    "#a78bfa",
    bg:        "#130f1e",
    text:      "#faf5ff",
  },
  midnight: {
    primary:   "#818cf8",
    secondary: "#a78bfa",
    accent:    "#6366f1",
    bg:        "#08070f",
    text:      "#ffffff",
  },
  sunset: {
    primary:   "#fb923c",
    secondary: "#fda4af",
    accent:    "#f43f5e",
    bg:        "#160a08",
    text:      "#fff7ed",
  },
  ocean: {
    primary:   "#38bdf8",
    secondary: "#bae6fd",
    accent:    "#22d3ee",
    bg:        "#07111c",
    text:      "#f0f9ff",
  },
  emerald: {
    primary:   "#34d399",
    secondary: "#6ee7b7",
    accent:    "#10b981",
    bg:        "#07130f",
    text:      "#ecfdf5",
  },
  golden: {
    primary:   "#fcd34d",
    secondary: "#fde68a",
    accent:    "#f59e0b",
    bg:        "#131007",
    text:      "#fafafa",
  },
  pastel: {
    primary:   "#f9a8d4",
    secondary: "#ddd6fe",
    accent:    "#c4b5fd",
    bg:        "#161222",
    text:      "#ffffff",
  },
  rainbow: {
    primary:   "#f472b6",
    secondary: "#60a5fa",
    accent:    "#a78bfa",
    bg:        "#0e0c18",
    text:      "#ffffff",
  },
};

// ─── Decoration element ─────────────────────────────────────

function DecorationLine({ color }: { color: string }) {
  return (
    <div
      className="mx-auto my-5 h-px w-16 rounded-full"
      style={{ backgroundColor: `${color}50` }}
    />
  );
}

// ─── Typography class helper ────────────────────────────────

function headingClass(typography: WishAIDesign["typography"]): string {
  switch (typography) {
    case "classic":
    case "elegant":
      return "font-serif";
    default:
      return "font-sans";
  }
}

// ─── Props ──────────────────────────────────────────────────

type WishCardProps = {
  variation: WishAIVariation;
  design: WishAIDesign;
  recipientName: string;
  /** Whether to run entrance animation */
  animate?: boolean;
};

// ─── Component ──────────────────────────────────────────────

export default function WishCard({
  variation,
  design,
  recipientName,
  animate = false,
}: WishCardProps) {
  const colors = themeColors[design.colorTheme] ?? themeColors["midnight"];
  const hFont = headingClass(design.typography);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 sm:p-10 text-center ${
        animate ? "wish-card-entrance" : ""
      }`}
      style={{
        backgroundColor: colors.bg,
        boxShadow: `0 0 80px ${colors.primary}18, 0 0 1px ${colors.primary}20`,
        border: `1px solid ${colors.primary}20`,
      }}
    >
      {/* Ambient orbs */}
      <div
        className="wish-ambient-orb pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full blur-3xl"
        style={{ backgroundColor: colors.primary, opacity: 0.18 }}
        aria-hidden="true"
      />
      <div
        className="wish-ambient-orb-reverse pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full blur-3xl"
        style={{ backgroundColor: colors.accent, opacity: 0.15 }}
        aria-hidden="true"
      />

      {/* Inner border accent */}
      <div
        className="pointer-events-none absolute inset-4 rounded-2xl"
        style={{ border: `1px solid ${colors.primary}12` }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative">
        {/* Eye-catcher label */}
        <p
          className="wish-reveal-item wish-reveal-delay-1 text-[10px] font-semibold uppercase tracking-[0.35em]"
          style={{ color: colors.primary }}
        >
          {design.decoration} · {design.animationStyle}
        </p>

        <DecorationLine color={colors.primary} />

        {/* Title */}
        <h1
          className={`wish-reveal-item wish-reveal-delay-2 text-2xl font-bold leading-snug sm:text-3xl ${hFont}`}
          style={{ color: colors.primary }}
        >
          {variation.title}
        </h1>

        {/* Recipient */}
        <p
          className="wish-reveal-item wish-reveal-delay-2 mt-2 text-sm font-medium"
          style={{ color: colors.secondary }}
        >
          For {recipientName}
        </p>

        <DecorationLine color={colors.accent} />

        {/* Main message */}
        <p
          className="wish-reveal-item wish-reveal-delay-3 mx-auto max-w-lg text-base leading-7 sm:text-lg"
          style={{ color: colors.text }}
        >
          {variation.message}
        </p>

        <DecorationLine color={colors.primary} />

        {/* Signature */}
        <p
          className={`wish-reveal-item wish-reveal-delay-4 text-sm italic ${hFont}`}
          style={{ color: colors.secondary }}
        >
          {variation.signature}
        </p>
      </div>
    </div>
  );
}
