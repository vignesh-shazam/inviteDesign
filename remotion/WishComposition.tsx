import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ─── Types ──────────────────────────────────────────────────

export type WishCompositionProps = {
  recipientName: string;
  title: string;
  message: string;
  signature: string;
  occasion: string;
  colorTheme: string;
  animationStyle: string;
  decoration: string;
};

// ─── Theme colours ──────────────────────────────────────────

const THEMES: Record<string, { primary: string; secondary: string; bg: string; text: string; accent: string }> = {
  "rose-gold": { primary: "#f9a8d4", secondary: "#fcd34d", bg: "#1c0f14", text: "#fff1f2", accent: "#f472b6" },
  lavender:    { primary: "#c4b5fd", secondary: "#e9d5ff", bg: "#130f1e", text: "#faf5ff", accent: "#a78bfa" },
  midnight:    { primary: "#818cf8", secondary: "#a78bfa", bg: "#08070f", text: "#ffffff", accent: "#6366f1" },
  sunset:      { primary: "#fb923c", secondary: "#fda4af", bg: "#160a08", text: "#fff7ed", accent: "#f43f5e" },
  ocean:       { primary: "#38bdf8", secondary: "#bae6fd", bg: "#07111c", text: "#f0f9ff", accent: "#22d3ee" },
  emerald:     { primary: "#34d399", secondary: "#6ee7b7", bg: "#07130f", text: "#ecfdf5", accent: "#10b981" },
  golden:      { primary: "#fcd34d", secondary: "#fde68a", bg: "#131007", text: "#fafafa", accent: "#f59e0b" },
  pastel:      { primary: "#f9a8d4", secondary: "#ddd6fe", bg: "#161222", text: "#ffffff", accent: "#c4b5fd" },
};

// ─── Occasion emoji ──────────────────────────────────────────

const OCCASION_EMOJI: Record<string, string> = {
  birthday:        "🎂",
  anniversary:     "💍",
  wedding:         "💒",
  congratulations: "🎉",
  "new-baby":      "👶",
  housewarming:    "🏠",
  festival:        "🪔",
  "thank-you":     "🙏",
  friendship:      "🌸",
  "get-well-soon": "💚",
  "good-luck":     "🍀",
  custom:          "✨",
};

// ─── Particle ───────────────────────────────────────────────

function Particle({
  index,
  color,
  frame,
}: {
  index: number;
  color: string;
  frame: number;
}) {
  const x = 5 + ((index * 17) % 90);
  const startY = 80 + ((index * 13) % 20);
  const y = startY - ((frame * (0.5 + (index % 4) * 0.3)) % 100);
  const opacity = interpolate(y, [0, 30, 80], [0, 0.8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const size = 3 + (index % 4);

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        opacity,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
    />
  );
}

// ─── Main composition ────────────────────────────────────────

export function WishComposition({
  recipientName,
  title,
  message,
  signature,
  occasion,
  colorTheme,
  decoration,
}: WishCompositionProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const colors = THEMES[colorTheme] ?? THEMES["midnight"];
  const emoji = OCCASION_EMOJI[occasion] ?? "✨";

  // ── Animation timings (at 30fps) ────────────────────────

  // Bg fade in
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Emoji bounce
  const emojiScale = spring({ frame: frame - 10, fps, config: { damping: 8, stiffness: 80 } });
  const emojiOpacity = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp" });

  // Decoration label
  const decorationOpacity = interpolate(frame, [25, 40], [0, 1], { extrapolateRight: "clamp" });

  // Title slide up
  const titleY = interpolate(frame, [35, 55], [40, 0], { extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [35, 55], [0, 1], { extrapolateRight: "clamp" });

  // Recipient
  const recipientOpacity = interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp" });

  // Divider grow
  const dividerScale = interpolate(frame, [60, 75], [0, 1], { extrapolateRight: "clamp" });

  // Message fade
  const messageOpacity = interpolate(frame, [70, 95], [0, 1], { extrapolateRight: "clamp" });
  const messageY = interpolate(frame, [70, 95], [20, 0], { extrapolateRight: "clamp" });

  // Signature
  const signatureOpacity = interpolate(frame, [90, 110], [0, 1], { extrapolateRight: "clamp" });

  // Outro glow pulse (frame 120+)
  const glowPulse = interpolate(
    Math.sin((frame - 120) * 0.1),
    [-1, 1],
    [0.12, 0.25],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        opacity: bgOpacity,
        fontFamily: "'Georgia', serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background radial gradients */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 50% 20%, ${colors.primary}${Math.round(glowPulse * 255).toString(16).padStart(2, "0")}, transparent 45%), radial-gradient(circle at 80% 80%, ${colors.accent}20, transparent 40%)`,
      }} />

      {/* Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Particle key={i} index={i} color={colors.primary} frame={frame} />
      ))}

      {/* Animated border ring */}
      <div style={{
        position: "absolute", inset: 16,
        border: `1px solid ${colors.primary}20`,
        borderRadius: 24,
      }} />

      {/* Content */}
      <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "0 40px",
        zIndex: 2,
      }}>

        {/* Emoji */}
        <div style={{
          fontSize: 72,
          opacity: emojiOpacity,
          transform: `scale(${emojiScale})`,
          marginBottom: 16,
          filter: `drop-shadow(0 0 20px ${colors.primary}80)`,
        }}>
          {emoji}
        </div>

        {/* Decoration label */}
        <p style={{
          fontSize: 11,
          letterSpacing: 4,
          textTransform: "uppercase" as const,
          color: colors.primary,
          opacity: decorationOpacity,
          marginBottom: 16,
          fontFamily: "Arial, sans-serif",
        }}>
          {decoration} · {occasion.replace(/-/g, " ")}
        </p>

        {/* Title */}
        <h1 style={{
          fontSize: 36,
          fontWeight: "bold",
          color: colors.primary,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          marginBottom: 8,
          lineHeight: 1.2,
          textShadow: `0 0 30px ${colors.primary}60`,
        }}>
          {title}
        </h1>

        {/* Recipient */}
        <p style={{
          fontSize: 14,
          color: colors.secondary,
          opacity: recipientOpacity,
          marginBottom: 20,
          fontFamily: "Arial, sans-serif",
        }}>
          For {recipientName}
        </p>

        {/* Divider */}
        <div style={{
          width: `${60 * dividerScale}px`,
          height: 1,
          backgroundColor: `${colors.primary}50`,
          marginBottom: 20,
        }} />

        {/* Message */}
        <p style={{
          fontSize: 16,
          color: colors.text,
          opacity: messageOpacity,
          transform: `translateY(${messageY}px)`,
          lineHeight: 1.7,
          maxWidth: 360,
          marginBottom: 24,
          fontFamily: "Arial, sans-serif",
          fontStyle: "italic" as const,
        }}>
          {message}
        </p>

        {/* Divider 2 */}
        <div style={{
          width: `${60 * dividerScale}px`,
          height: 1,
          backgroundColor: `${colors.primary}40`,
          marginBottom: 16,
        }} />

        {/* Signature */}
        <p style={{
          fontSize: 14,
          color: colors.secondary,
          opacity: signatureOpacity,
          fontStyle: "italic" as const,
        }}>
          {signature}
        </p>
      </div>
    </AbsoluteFill>
  );
}
