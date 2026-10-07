"use client";

import type { WishOccasion } from "@/lib/ai/wishes/wishesTypes";

type WishIllustrationProps = {
  occasion: WishOccasion | string;
  primaryColor: string;
  secondaryColor: string;
  /** compact = small card thumbnail, full = large card background */
  size?: "compact" | "full";
};

// ─── Per-occasion SVG scenes ────────────────────────────────

function BirthdayScene({ p, s }: { p: string; s: string }) {
  return (
    <g>
      {/* Balloons */}
      <ellipse cx="30" cy="55" rx="14" ry="18" fill={p} opacity="0.85" />
      <ellipse cx="30" cy="55" rx="10" ry="13" fill={p} opacity="0.4" />
      <line x1="30" y1="73" x2="30" y2="90" stroke={p} strokeWidth="1.2" opacity="0.6" />

      <ellipse cx="55" cy="45" rx="16" ry="20" fill={s} opacity="0.8" />
      <ellipse cx="55" cy="45" rx="11" ry="15" fill={s} opacity="0.35" />
      <line x1="55" y1="65" x2="55" y2="90" stroke={s} strokeWidth="1.2" opacity="0.6" />

      <ellipse cx="80" cy="52" rx="13" ry="17" fill={p} opacity="0.7" />
      <line x1="80" y1="69" x2="80" y2="90" stroke={p} strokeWidth="1.2" opacity="0.5" />

      {/* Cake */}
      <rect x="28" y="75" width="44" height="20" rx="4" fill={s} opacity="0.9" />
      <rect x="28" y="65" width="44" height="12" rx="3" fill={p} opacity="0.9" />
      <rect x="33" y="75" width="6" height="12" fill={s} opacity="0.5" />
      <rect x="45" y="75" width="6" height="12" fill={s} opacity="0.5" />
      <rect x="61" y="75" width="6" height="12" fill={s} opacity="0.5" />
      {/* Candles */}
      <rect x="46" y="55" width="4" height="12" rx="2" fill="#fff" opacity="0.9" />
      <ellipse cx="48" cy="54" rx="3" ry="4" fill="#fcd34d" opacity="0.9" />

      {/* Confetti */}
      <rect x="10" y="20" width="5" height="8" rx="1" fill={p} opacity="0.7" transform="rotate(-25 10 20)" />
      <rect x="85" y="15" width="4" height="7" rx="1" fill={s} opacity="0.7" transform="rotate(20 85 15)" />
      <circle cx="20" cy="35" r="3" fill={s} opacity="0.6" />
      <circle cx="90" cy="40" r="2.5" fill={p} opacity="0.6" />
      <rect x="70" y="20" width="4" height="7" rx="1" fill={p} opacity="0.5" transform="rotate(-15 70 20)" />
      <rect x="15" y="55" width="3" height="6" rx="1" fill={s} opacity="0.5" transform="rotate(30 15 55)" />

      {/* Stars */}
      <text x="92" y="25" fontSize="10" fill={s} opacity="0.8">★</text>
      <text x="5" y="72" fontSize="8" fill={p} opacity="0.7">★</text>
    </g>
  );
}

function WeddingScene({ p, s }: { p: string; s: string }) {
  return (
    <g>
      {/* Rings */}
      <circle cx="42" cy="55" r="22" fill="none" stroke={p} strokeWidth="4" opacity="0.85" />
      <circle cx="42" cy="55" r="14" fill="none" stroke={p} strokeWidth="2" opacity="0.4" />
      <circle cx="58" cy="55" r="22" fill="none" stroke={s} strokeWidth="4" opacity="0.85" />
      <circle cx="58" cy="55" r="14" fill="none" stroke={s} strokeWidth="2" opacity="0.4" />

      {/* Diamond on top */}
      <polygon points="50,18 58,30 50,36 42,30" fill={s} opacity="0.9" />
      <polygon points="50,18 58,30 50,26" fill="#fff" opacity="0.5" />

      {/* Flowers */}
      <circle cx="15" cy="75" r="8" fill={p} opacity="0.6" />
      <circle cx="9" cy="69" r="5" fill={p} opacity="0.5" />
      <circle cx="21" cy="69" r="5" fill={p} opacity="0.5" />
      <circle cx="15" cy="63" r="5" fill={p} opacity="0.5" />
      <circle cx="15" cy="75" r="4" fill={s} opacity="0.8" />

      <circle cx="85" cy="75" r="8" fill={s} opacity="0.6" />
      <circle cx="79" cy="69" r="5" fill={s} opacity="0.5" />
      <circle cx="91" cy="69" r="5" fill={s} opacity="0.5" />
      <circle cx="85" cy="63" r="5" fill={s} opacity="0.5" />
      <circle cx="85" cy="75" r="4" fill={p} opacity="0.8" />

      {/* Heart */}
      <path d="M50 85 C50 85 35 72 35 63 C35 57 50 57 50 67 C50 57 65 57 65 63 C65 72 50 85 50 85Z"
        fill={p} opacity="0.7" />

      {/* Sparkles */}
      <text x="5" y="30" fontSize="12" fill={s} opacity="0.8">✦</text>
      <text x="88" y="35" fontSize="10" fill={p} opacity="0.8">✦</text>
      <text x="45" y="15" fontSize="8" fill={s} opacity="0.6">✦</text>
    </g>
  );
}

function AnniversaryScene({ p, s }: { p: string; s: string }) {
  return (
    <g>
      {/* Large heart */}
      <path d="M50 85 C50 85 20 65 20 45 C20 33 50 33 50 50 C50 33 80 33 80 45 C80 65 50 85 50 85Z"
        fill={p} opacity="0.75" />
      <path d="M50 78 C50 78 26 62 26 46 C26 37 50 37 50 52 C50 37 74 37 74 46 C74 62 50 78 50 78Z"
        fill={p} opacity="0.3" />

      {/* Number/text area */}
      <rect x="35" y="48" width="30" height="20" rx="4" fill="#00000030" />

      {/* Rose petals */}
      <ellipse cx="18" cy="80" rx="7" ry="4" fill={s} opacity="0.7" transform="rotate(-30 18 80)" />
      <ellipse cx="82" cy="80" rx="7" ry="4" fill={s} opacity="0.7" transform="rotate(30 82 80)" />
      <ellipse cx="12" cy="65" rx="5" ry="3" fill={s} opacity="0.5" transform="rotate(-20 12 65)" />
      <ellipse cx="88" cy="65" rx="5" ry="3" fill={s} opacity="0.5" transform="rotate(20 88 65)" />

      {/* Stars */}
      <text x="8" y="22" fontSize="14" fill={p} opacity="0.8">★</text>
      <text x="82" y="20" fontSize="12" fill={s} opacity="0.8">★</text>
      <text x="45" y="15" fontSize="10" fill={p} opacity="0.6">★</text>
      <text x="70" y="92" fontSize="8" fill={s} opacity="0.5">★</text>
    </g>
  );
}

function NewBabyScene({ p, s }: { p: string; s: string }) {
  return (
    <g>
      {/* Stars / clouds */}
      <ellipse cx="25" cy="30" rx="18" ry="12" fill={s} opacity="0.4" />
      <ellipse cx="38" cy="25" rx="14" ry="10" fill={s} opacity="0.4" />
      <ellipse cx="14" cy="26" rx="12" ry="8" fill={s} opacity="0.4" />

      <ellipse cx="75" cy="35" rx="16" ry="11" fill={p} opacity="0.35" />
      <ellipse cx="87" cy="30" rx="12" ry="9" fill={p} opacity="0.35" />
      <ellipse cx="65" cy="31" rx="10" ry="7" fill={p} opacity="0.35" />

      {/* Baby cradle */}
      <path d="M20 80 Q50 65 80 80" fill="none" stroke={p} strokeWidth="3" opacity="0.8" />
      <path d="M25 80 Q50 70 75 80" fill={p} opacity="0.2" />
      <rect x="22" y="60" width="56" height="22" rx="8" fill={s} opacity="0.7" />
      <rect x="28" y="64" width="44" height="14" rx="6" fill={p} opacity="0.5" />
      {/* Baby face */}
      <circle cx="50" cy="71" r="8" fill="#fde68a" opacity="0.9" />
      <circle cx="47" cy="70" r="1.2" fill="#92400e" opacity="0.8" />
      <circle cx="53" cy="70" r="1.2" fill="#92400e" opacity="0.8" />
      <path d="M47 74 Q50 76 53 74" fill="none" stroke="#92400e" strokeWidth="1.2" opacity="0.8" />

      {/* Stars */}
      <text x="8" y="55" fontSize="12" fill={p} opacity="0.7">★</text>
      <text x="88" y="58" fontSize="10" fill={s} opacity="0.7">★</text>
      <text x="48" y="15" fontSize="9" fill={p} opacity="0.6">★</text>
      <text x="20" y="15" fontSize="8" fill={s} opacity="0.6">✦</text>
      <text x="78" y="18" fontSize="8" fill={p} opacity="0.6">✦</text>
    </g>
  );
}

function FestivalScene({ p, s }: { p: string; s: string }) {
  return (
    <g>
      {/* Diya lamps */}
      <ellipse cx="30" cy="80" rx="16" ry="8" fill={s} opacity="0.8" />
      <ellipse cx="30" cy="77" rx="12" ry="6" fill={p} opacity="0.7" />
      <ellipse cx="30" cy="75" rx="5" ry="7" fill="#fcd34d" opacity="0.9" />
      <ellipse cx="30" cy="72" rx="3" ry="5" fill="#f97316" opacity="0.8" />

      <ellipse cx="70" cy="80" rx="16" ry="8" fill={p} opacity="0.8" />
      <ellipse cx="70" cy="77" rx="12" ry="6" fill={s} opacity="0.7" />
      <ellipse cx="70" cy="75" rx="5" ry="7" fill="#fcd34d" opacity="0.9" />
      <ellipse cx="70" cy="72" rx="3" ry="5" fill="#f97316" opacity="0.8" />

      <ellipse cx="50" cy="82" rx="14" ry="7" fill={s} opacity="0.7" />
      <ellipse cx="50" cy="79" rx="10" ry="5" fill={p} opacity="0.6" />
      <ellipse cx="50" cy="77" rx="4" ry="6" fill="#fcd34d" opacity="0.9" />

      {/* Rangoli / mandala hint */}
      <circle cx="50" cy="45" r="28" fill="none" stroke={p} strokeWidth="1.5" opacity="0.3" strokeDasharray="4 3" />
      <circle cx="50" cy="45" r="20" fill="none" stroke={s} strokeWidth="1.5" opacity="0.4" strokeDasharray="3 3" />
      <circle cx="50" cy="45" r="12" fill="none" stroke={p} strokeWidth="2" opacity="0.5" />
      <circle cx="50" cy="45" r="5" fill={p} opacity="0.7" />

      {/* Lights string */}
      <path d="M5 20 Q20 30 35 20 Q50 30 65 20 Q80 30 95 20" fill="none" stroke={s} strokeWidth="1.2" opacity="0.5" />
      {[10, 27, 43, 58, 74, 90].map((x, i) => (
        <circle key={i} cx={x} cy={i % 2 === 0 ? 22 : 26} r="3.5" fill={i % 2 === 0 ? p : s} opacity="0.9" />
      ))}
    </g>
  );
}

function CongratulationsScene({ p, s }: { p: string; s: string }) {
  return (
    <g>
      {/* Trophy */}
      <rect x="37" y="68" width="26" height="8" rx="2" fill={s} opacity="0.9" />
      <rect x="42" y="76" width="16" height="6" rx="2" fill={s} opacity="0.8" />
      <rect x="38" y="82" width="24" height="4" rx="2" fill={s} opacity="0.7" />
      <path d="M40 68 Q33 55 35 42 L65 42 Q67 55 60 68Z" fill={p} opacity="0.85" />
      <path d="M35 50 Q28 48 28 58 Q28 65 35 63" fill="none" stroke={p} strokeWidth="3" opacity="0.7" />
      <path d="M65 50 Q72 48 72 58 Q72 65 65 63" fill="none" stroke={p} strokeWidth="3" opacity="0.7" />
      <circle cx="50" cy="54" r="8" fill={s} opacity="0.4" />
      <text x="45" y="58" fontSize="10" fill={s} opacity="0.9">★</text>

      {/* Confetti burst */}
      {[[15, 30], [85, 25], [12, 60], [88, 55], [20, 15], [78, 18]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="5" height="8" rx="1"
          fill={i % 2 === 0 ? p : s} opacity="0.7"
          transform={`rotate(${(i * 37) % 360} ${x} ${y})`} />
      ))}
      <text x="8" y="85" fontSize="12" fill={p} opacity="0.6">🎊</text>
      <text x="82" y="88" fontSize="12" fill={s} opacity="0.6">🎊</text>
    </g>
  );
}

function HousewarmingScene({ p, s }: { p: string; s: string }) {
  return (
    <g>
      {/* House */}
      <polygon points="50,15 85,45 85,90 15,90 15,45" fill={p} opacity="0.3" />
      <polygon points="50,12 88,44 12,44" fill={s} opacity="0.8" />
      <rect x="18" y="44" width="64" height="46" rx="2" fill={p} opacity="0.7" />
      {/* Door */}
      <rect x="40" y="65" width="20" height="25" rx="3" fill={s} opacity="0.85" />
      <circle cx="57" cy="77" r="2" fill={p} opacity="0.9" />
      {/* Windows */}
      <rect x="22" y="52" width="16" height="14" rx="2" fill={s} opacity="0.6" />
      <rect x="62" y="52" width="16" height="14" rx="2" fill={s} opacity="0.6" />
      {/* Chimney smoke */}
      <path d="M68 14 Q72 8 68 2 Q72 -2 70 -6" fill="none" stroke={s} strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      {/* Flowers */}
      <circle cx="12" cy="85" r="5" fill={s} opacity="0.7" />
      <circle cx="88" cy="85" r="5" fill={p} opacity="0.7" />
      <text x="6" y="25" fontSize="10" fill={p} opacity="0.7">★</text>
      <text x="86" y="28" fontSize="10" fill={s} opacity="0.7">★</text>
    </g>
  );
}

function ThankYouScene({ p, s }: { p: string; s: string }) {
  return (
    <g>
      {/* Large hands / gesture */}
      <path d="M50 25 C50 25 30 40 30 60 C30 75 40 85 50 88 C60 85 70 75 70 60 C70 40 50 25 50 25Z"
        fill={p} opacity="0.25" />
      {/* Flower bouquet */}
      <circle cx="50" cy="50" r="20" fill={p} opacity="0.3" />
      <circle cx="36" cy="50" r="10" fill={p} opacity="0.6" />
      <circle cx="64" cy="50" r="10" fill={s} opacity="0.6" />
      <circle cx="50" cy="38" r="10" fill={s} opacity="0.6" />
      <circle cx="50" cy="62" r="10" fill={p} opacity="0.6" />
      <circle cx="36" cy="50" r="5" fill={s} opacity="0.8" />
      <circle cx="64" cy="50" r="5" fill={p} opacity="0.8" />
      <circle cx="50" cy="38" r="5" fill={p} opacity="0.8" />
      <circle cx="50" cy="62" r="5" fill={s} opacity="0.8" />
      <circle cx="50" cy="50" r="7" fill="#fcd34d" opacity="0.9" />
      {/* Stem */}
      <rect x="48" y="72" width="4" height="18" rx="2" fill="#22c55e" opacity="0.7" />
      {/* Sparkles */}
      <text x="8" y="28" fontSize="12" fill={s} opacity="0.8">✦</text>
      <text x="84" y="25" fontSize="10" fill={p} opacity="0.8">✦</text>
    </g>
  );
}

function FriendshipScene({ p, s }: { p: string; s: string }) {
  return (
    <g>
      {/* Two figures side by side */}
      <circle cx="35" cy="35" r="14" fill={p} opacity="0.7" />
      <rect x="25" y="47" width="20" height="28" rx="6" fill={p} opacity="0.6" />
      <circle cx="65" cy="35" r="14" fill={s} opacity="0.7" />
      <rect x="55" y="47" width="20" height="28" rx="6" fill={s} opacity="0.6" />
      {/* Linked hands */}
      <path d="M45 62 Q50 68 55 62" fill="none" stroke="#fcd34d" strokeWidth="3" opacity="0.9" strokeLinecap="round" />
      {/* Heart above */}
      <path d="M50 22 C50 22 42 15 42 10 C42 6 50 6 50 12 C50 6 58 6 58 10 C58 15 50 22 50 22Z"
        fill="#f472b6" opacity="0.8" />
      {/* Stars */}
      <text x="8" y="22" fontSize="10" fill={p} opacity="0.7">★</text>
      <text x="86" y="20" fontSize="10" fill={s} opacity="0.7">★</text>
      <text x="46" y="88" fontSize="10" fill={p} opacity="0.6">✦</text>
    </g>
  );
}

function GoodLuckScene({ p, s }: { p: string; s: string }) {
  return (
    <g>
      {/* Clover / 4 leaf */}
      <circle cx="50" cy="38" r="14" fill={p} opacity="0.7" />
      <circle cx="62" cy="50" r="14" fill={p} opacity="0.7" />
      <circle cx="38" cy="50" r="14" fill={p} opacity="0.7" />
      <circle cx="50" cy="62" r="14" fill={p} opacity="0.7" />
      <circle cx="50" cy="50" r="10" fill={s} opacity="0.8" />
      <rect x="48" y="74" width="4" height="16" rx="2" fill={p} opacity="0.7" />

      {/* Stars around */}
      <text x="10" y="28" fontSize="14" fill={s} opacity="0.8">★</text>
      <text x="82" y="30" fontSize="12" fill={p} opacity="0.8">★</text>
      <text x="14" y="78" fontSize="10" fill={s} opacity="0.6">✦</text>
      <text x="84" y="75" fontSize="10" fill={p} opacity="0.6">✦</text>
      <text x="46" y="14" fontSize="10" fill={s} opacity="0.7">✦</text>

      {/* Rainbow arc */}
      <path d="M10 85 Q50 50 90 85" fill="none" stroke={s} strokeWidth="3" opacity="0.4" />
      <path d="M15 87 Q50 55 85 87" fill="none" stroke={p} strokeWidth="2" opacity="0.3" />
    </g>
  );
}

function GetWellScene({ p, s }: { p: string; s: string }) {
  return (
    <g>
      {/* Heart with cross */}
      <path d="M50 80 C50 80 22 62 22 44 C22 32 50 32 50 50 C50 32 78 32 78 44 C78 62 50 80 50 80Z"
        fill={p} opacity="0.7" />
      <rect x="46" y="44" width="8" height="22" rx="2" fill="#fff" opacity="0.9" />
      <rect x="40" y="50" width="20" height="8" rx="2" fill="#fff" opacity="0.9" />

      {/* Flowers */}
      <circle cx="15" cy="75" r="8" fill={s} opacity="0.6" />
      <circle cx="15" cy="75" r="4" fill={p} opacity="0.8" />
      <circle cx="85" cy="72" r="7" fill={p} opacity="0.6" />
      <circle cx="85" cy="72" r="3.5" fill={s} opacity="0.8" />

      {/* Stars */}
      <text x="8" y="30" fontSize="11" fill={s} opacity="0.7">✦</text>
      <text x="85" y="28" fontSize="11" fill={p} opacity="0.7">✦</text>
      <text x="46" y="14" fontSize="9" fill={s} opacity="0.6">★</text>
    </g>
  );
}

function DefaultScene({ p, s }: { p: string; s: string }) {
  return (
    <g>
      {/* Abstract sparkle burst */}
      <circle cx="50" cy="50" r="30" fill={p} opacity="0.15" />
      <circle cx="50" cy="50" r="20" fill={p} opacity="0.2" />
      <circle cx="50" cy="50" r="12" fill={s} opacity="0.4" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 50 + 18 * Math.cos(rad);
        const y1 = 50 + 18 * Math.sin(rad);
        const x2 = 50 + 38 * Math.cos(rad);
        const y2 = 50 + 38 * Math.sin(rad);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={i % 2 === 0 ? p : s} strokeWidth="2.5" opacity="0.7" strokeLinecap="round" />
        );
      })}
      <text x="8" y="18" fontSize="12" fill={p} opacity="0.7">✦</text>
      <text x="82" y="16" fontSize="10" fill={s} opacity="0.7">✦</text>
      <text x="6" y="85" fontSize="10" fill={s} opacity="0.6">★</text>
      <text x="85" y="88" fontSize="10" fill={p} opacity="0.6">★</text>
    </g>
  );
}

// ─── Scene selector ─────────────────────────────────────────

function getScene(occasion: string, p: string, s: string) {
  switch (occasion) {
    case "birthday":       return <BirthdayScene p={p} s={s} />;
    case "wedding":        return <WeddingScene p={p} s={s} />;
    case "anniversary":    return <AnniversaryScene p={p} s={s} />;
    case "engagement":     return <WeddingScene p={p} s={s} />;
    case "new-baby":       return <NewBabyScene p={p} s={s} />;
    case "festival":       return <FestivalScene p={p} s={s} />;
    case "congratulations":return <CongratulationsScene p={p} s={s} />;
    case "housewarming":   return <HousewarmingScene p={p} s={s} />;
    case "thank-you":      return <ThankYouScene p={p} s={s} />;
    case "friendship":     return <FriendshipScene p={p} s={s} />;
    case "good-luck":      return <GoodLuckScene p={p} s={s} />;
    case "get-well-soon":  return <GetWellScene p={p} s={s} />;
    default:               return <DefaultScene p={p} s={s} />;
  }
}

// ─── Main component ─────────────────────────────────────────

export default function WishIllustration({
  occasion,
  primaryColor,
  secondaryColor,
  size = "compact",
}: WishIllustrationProps) {
  const dim = size === "full" ? 200 : 100;

  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {getScene(occasion, primaryColor, secondaryColor)}
    </svg>
  );
}
