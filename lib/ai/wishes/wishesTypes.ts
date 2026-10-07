// ============================================================
// AI Wishes — Type System
// ============================================================

export type WishOccasion =
  | "birthday"
  | "anniversary"
  | "wedding"
  | "engagement"
  | "congratulations"
  | "new-baby"
  | "housewarming"
  | "festival"
  | "thank-you"
  | "friendship"
  | "get-well-soon"
  | "good-luck"
  | "custom";

export type WishRelationship =
  | "friend"
  | "brother"
  | "sister"
  | "father"
  | "mother"
  | "husband"
  | "wife"
  | "partner"
  | "colleague"
  | "client"
  | "other";

export type WishStyle =
  | "elegant"
  | "romantic"
  | "cinematic"
  | "luxury"
  | "cute"
  | "playful"
  | "minimal"
  | "traditional"
  | "modern"
  | "festive"
  | "magical"
  | "emotional"
  | "funny";

export type WishMood =
  | "emotional"
  | "romantic"
  | "happy"
  | "funny"
  | "warm"
  | "inspirational"
  | "exciting"
  | "peaceful"
  | "celebration";

export type WishColorTheme =
  | "rose-gold"
  | "lavender"
  | "midnight"
  | "sunset"
  | "ocean"
  | "emerald"
  | "golden"
  | "pastel"
  | "rainbow";

export type WishLayout =
  | "centered"
  | "minimal"
  | "framed"
  | "editorial";

export type WishTypography =
  | "classic"
  | "modern"
  | "minimal"
  | "elegant"
  | "bold";

export type WishDecoration =
  | "floral"
  | "hearts"
  | "stars"
  | "confetti"
  | "sparkles"
  | "minimal"
  | "balloons"
  | "cinematic"
  | "traditional";

export type WishAnimationStyle =
  | "romantic"    // rose petals, soft glow, hearts
  | "birthday"    // confetti, balloons, sparkles
  | "luxury"      // gold particles, cinematic glow
  | "magical"     // stars, glowing trails
  | "festive"     // colorful particles, lights
  | "minimal"     // smooth fade, typography
  | "cinematic"   // dramatic slow reveal
  | "playful";    // bouncing, fun elements

export type WishOpeningStyle =
  | "envelope"    // envelope unfolds
  | "gift"        // gift box opens
  | "petals"      // petals scatter revealing card
  | "light"       // light burst reveals
  | "fade"        // simple elegant fade
  | "scroll";     // scroll unrolls

// ============================================================
// Request
// ============================================================

export type WishAIRequest = {
  recipientName: string;
  occasion: WishOccasion;
  relationship: WishRelationship;
  senderName?: string;
  customMessage?: string;
  aiPrompt?: string;
  style: WishStyle;
  mood: WishMood;
  colorTheme: WishColorTheme;
};

// ============================================================
// Generated Content
// ============================================================

export type WishAIVariation = {
  title: string;
  message: string;
  shortMessage: string;
  signature: string;
};

export type WishAIDesign = {
  style: WishStyle;
  mood: WishMood;
  colorTheme: WishColorTheme;
  layout: WishLayout;
  typography: WishTypography;
  decoration: WishDecoration;
  animationStyle: WishAnimationStyle;
  openingStyle: WishOpeningStyle;
};

export type WishAISharing = {
  whatsappMessage: string;
};

export type WishAIGeneratedResult = {
  variations: WishAIVariation[];
  design: WishAIDesign;
  sharing: WishAISharing;
};

// ============================================================
// API Response
// ============================================================

export type WishAIResponse = {
  success: boolean;
  data?: WishAIGeneratedResult;
  error?: string;
};
