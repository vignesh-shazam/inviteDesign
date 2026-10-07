"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import WishIllustration from "@/components/wishes/WishIllustration";
import WishParticles from "@/components/wishes/WishParticles";

import type {
  WishAIGeneratedResult, WishAIVariation,
  WishOccasion, WishRelationship, WishStyle, WishMood,
  WishColorTheme, WishAnimationStyle,
} from "@/lib/ai/wishes/wishesTypes";

// ── Types ────────────────────────────────────────────────────
type Mode = "ai" | "upload";

// ── Data ─────────────────────────────────────────────────────
const occasionPrompts: Record<WishOccasion, string> = {
  birthday:        "Create a warm and cheerful birthday wish. Make it feel personal and celebratory.",
  anniversary:     "Create a heartfelt anniversary wish that celebrates love and togetherness.",
  wedding:         "Create a beautiful wedding wish full of joy and blessings for the couple.",
  congratulations: "Create an enthusiastic congratulations message that feels genuine and uplifting.",
  "new-baby":      "Create a warm and tender new baby wish full of love and excitement.",
  housewarming:    "Create a warm housewarming wish that feels homey and welcoming.",
  festival:        "Create a festive and joyful festival wish full of warmth and celebration.",
  "thank-you":     "Create a sincere and heartfelt thank you message that feels genuine.",
  friendship:      "Create a warm friendship wish that celebrates the bond between friends.",
  "get-well-soon": "Create a caring and comforting get well soon message full of warmth.",
  "good-luck":     "Create an encouraging and uplifting good luck wish full of positivity.",
  engagement:      "Create a joyful and romantic engagement wish for the happy couple.",
  custom:          "Create a special personalised wish that feels heartfelt and unique.",
};

const occasions: { value: WishOccasion; label: string; emoji: string }[] = [
  { value: "birthday",        label: "Birthday",     emoji: "🎂" },
  { value: "anniversary",     label: "Anniversary",  emoji: "💍" },
  { value: "wedding",         label: "Wedding",      emoji: "💒" },
  { value: "congratulations", label: "Congrats",     emoji: "🎉" },
  { value: "new-baby",        label: "New Baby",     emoji: "👶" },
  { value: "housewarming",    label: "Housewarming", emoji: "🏠" },
  { value: "festival",        label: "Festival",     emoji: "🪔" },
  { value: "thank-you",       label: "Thank You",    emoji: "🙏" },
  { value: "custom",          label: "Custom",       emoji: "✨" },
];

const relationships: { value: WishRelationship; label: string }[] = [
  { value: "friend", label: "Best Friend" }, { value: "brother", label: "Brother" },
  { value: "sister", label: "Sister" },      { value: "father", label: "Father" },
  { value: "mother", label: "Mother" },      { value: "husband", label: "Husband" },
  { value: "wife", label: "Wife" },          { value: "partner", label: "Partner" },
  { value: "colleague", label: "Colleague" },{ value: "other", label: "Other" },
];

const themeColors: Record<string, { primary: string; secondary: string; bg: string; text: string; accent: string }> = {
  "rose-gold": { primary: "#f9a8d4", secondary: "#fcd34d", bg: "#1c0f14", text: "#fff1f2", accent: "#f472b6" },
  lavender:    { primary: "#c4b5fd", secondary: "#e9d5ff", bg: "#130f1e", text: "#faf5ff", accent: "#a78bfa" },
  midnight:    { primary: "#818cf8", secondary: "#a78bfa", bg: "#08070f", text: "#ffffff", accent: "#6366f1" },
  sunset:      { primary: "#fb923c", secondary: "#fda4af", bg: "#160a08", text: "#fff7ed", accent: "#f43f5e" },
  ocean:       { primary: "#38bdf8", secondary: "#bae6fd", bg: "#07111c", text: "#f0f9ff", accent: "#22d3ee" },
  emerald:     { primary: "#34d399", secondary: "#6ee7b7", bg: "#07130f", text: "#ecfdf5", accent: "#10b981" },
  golden:      { primary: "#fcd34d", secondary: "#fde68a", bg: "#131007", text: "#fafafa", accent: "#f59e0b" },
  pastel:      { primary: "#f9a8d4", secondary: "#ddd6fe", bg: "#161222", text: "#ffffff", accent: "#c4b5fd" },
};

const onlineMusicOptions = [
  { label: "🎵 Happy Birthday (Piano)", url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" },
  { label: "🎻 Romantic Strings", url: "" },
  { label: "🎹 Soft Wedding Piano", url: "" },
  { label: "🥁 Celebration Beat", url: "" },
  { label: "🌸 Peaceful Melody", url: "" },
];

// ── Text style presets for overlay ──────────────────────────
const textStylePresets = [
  { label: "Gold Classic", color: "#fcd34d", shadow: "2px 2px 8px #000", fontSize: 48, fontFamily: "Georgia, serif" },
  { label: "White Modern", color: "#ffffff", shadow: "0 0 20px rgba(0,0,0,0.8)", fontSize: 44, fontFamily: "Arial, sans-serif" },
  { label: "Pink Romantic", color: "#f9a8d4", shadow: "0 0 16px rgba(244,114,182,0.6)", fontSize: 46, fontFamily: "Georgia, serif" },
  { label: "Cyan Cinematic", color: "#67e8f9", shadow: "0 0 24px rgba(6,182,212,0.7)", fontSize: 42, fontFamily: "Arial, sans-serif" },
];

// ── Progress bar ─────────────────────────────────────────────
function ProgressBar({ step, mode }: { step: number; mode: Mode | null }) {
  const aiSteps = ["Details", "Review", "Publish"];
  const uploadSteps = ["Upload & Edit", "Review", "Publish"];
  const steps = mode === "upload" ? uploadSteps : aiSteps;

  return (
    <div className="mb-8 flex items-center justify-center">
      {steps.map((label, i) => {
        const num = i + 1;
        const done = num < step;
        const active = num === step;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                done ? "bg-violet-600 text-white" :
                active ? "bg-white text-slate-900 shadow-lg shadow-violet-500/30" :
                "border border-white/10 bg-white/[0.04] text-slate-600"
              }`}>{done ? "✓" : num}</div>
              <span className={`text-[10px] font-medium whitespace-nowrap ${active ? "text-white" : done ? "text-violet-400" : "text-slate-600"}`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="mx-1 mb-4 h-px w-20 sm:w-28" style={{ backgroundColor: done ? "#7c3aed" : "rgba(255,255,255,0.07)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Animated video card (AI mode) ────────────────────────────
function AnimatedWishVideo({ variation, design, occasion, recipientName, playing }: {
  variation: WishAIVariation; design: WishAIGeneratedResult["design"] | null;
  occasion: WishOccasion; recipientName: string; playing: boolean;
}) {
  const colorTheme = (design?.colorTheme as WishColorTheme) ?? "rose-gold";
  const colors = themeColors[colorTheme] ?? themeColors["midnight"];
  const animStyle = (design?.animationStyle ?? "birthday") as WishAnimationStyle;
  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-2xl border shadow-2xl"
      style={{ backgroundColor: colors.bg, borderColor: `${colors.primary}30` }}>
      {playing && <WishParticles animationStyle={animStyle} count={18} />}
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 25%, ${colors.primary}25, transparent 50%), radial-gradient(circle at 80% 80%, ${colors.accent}15, transparent 40%)` }} />
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        <div className={`mb-3 transition-all duration-700 ${playing ? "scale-110" : "scale-100"}`}>
          <WishIllustration occasion={occasion} primaryColor={colors.primary} secondaryColor={colors.secondary} size="full" />
        </div>
        <p className="text-[8px] font-semibold uppercase tracking-[0.3em]" style={{ color: colors.primary }}>{design?.decoration ?? "sparkles"}</p>
        <h2 className={`mt-2 text-base font-bold leading-snug transition-all duration-700 ${playing ? "opacity-100" : "opacity-70"}`} style={{ color: colors.primary }}>{variation.title}</h2>
        <p className="mt-1 text-[10px]" style={{ color: colors.secondary }}>For {recipientName}</p>
        <div className="my-3 h-px w-10 rounded-full" style={{ backgroundColor: `${colors.primary}40` }} />
        <p className={`text-[11px] leading-5 transition-all duration-1000 delay-300 ${playing ? "opacity-100" : "opacity-50"}`} style={{ color: colors.text }}>{variation.message}</p>
        <p className="mt-3 text-[10px] italic" style={{ color: colors.secondary }}>{variation.signature}</p>
      </div>
    </div>
  );
}

// ── Step 0: Mode selection ────────────────────────────────────
function Step0({ onSelect }: { onSelect: (mode: Mode) => void }) {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white">How would you like to create your wish?</h2>
        <p className="mt-2 text-sm text-slate-500">Choose a method to get started.</p>
      </div>

      <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
        {/* AI Generate */}
        <button type="button" onClick={() => onSelect("ai")}
          className="group relative overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/[0.05] p-6 text-left transition-all duration-200 hover:border-violet-500/60 hover:shadow-xl hover:shadow-violet-500/10">
          {/* Glow */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-violet-500/20 blur-2xl transition-all group-hover:opacity-100" />

          <div className="relative">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-2xl shadow-lg shadow-violet-500/25">
              🎬
            </div>

            <h3 className="text-base font-bold text-white">Generate with AI</h3>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Enter details and let AI create a beautiful animated video wish — complete with personalised message, animations, and design.
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {["AI message", "Auto animation", "5s video"].map((tag) => (
                <span key={tag} className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-[10px] text-violet-300">{tag}</span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-violet-300">
              Get started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6" /></svg>
            </div>
          </div>
        </button>

        {/* Upload */}
        <button type="button" onClick={() => onSelect("upload")}
          className="group relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/[0.05] p-6 text-left transition-all duration-200 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10">
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-500/20 blur-2xl transition-all group-hover:opacity-100" />

          <div className="relative">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-2xl shadow-lg shadow-blue-500/25">
              📁
            </div>

            <h3 className="text-base font-bold text-white">Upload Your Video</h3>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Upload any video from your device. AI will personalise it by burning the recipient name, message, and style into the video.
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {["Your video", "Text burn-in", "FFmpeg"].map((tag) => (
                <span key={tag} className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] text-blue-300">{tag}</span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-blue-300">
              Upload video
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6" /></svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

// ── Step 1 AI: Details + right preview ───────────────────────
function Step1AI({ recipientName, setRecipientName, relationship, setRelationship, occasion, setOccasion,
  senderName, setSenderName, customMessage, setCustomMessage, loading, error, result, onGenerate, onNext }: {
  recipientName: string; setRecipientName: (v: string) => void;
  relationship: WishRelationship; setRelationship: (v: WishRelationship) => void;
  occasion: WishOccasion; setOccasion: (v: WishOccasion) => void;
  senderName: string; setSenderName: (v: string) => void;
  customMessage: string; setCustomMessage: (v: string) => void;
  loading: boolean; error: string;
  result: WishAIGeneratedResult | null;
  onGenerate: () => void; onNext: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const hasGenerated = result !== null;
  const variation = result?.variations[0] ?? null;
  const colors = themeColors[(result?.design?.colorTheme as WishColorTheme) ?? "rose-gold"] ?? themeColors["midnight"];

  function handleOccasionChange(occ: WishOccasion) {
    setOccasion(occ);
    const isAutoFill = Object.values(occasionPrompts).includes(customMessage);
    if (!customMessage.trim() || isAutoFill) setCustomMessage(occasionPrompts[occ] ?? "");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
      {/* Left */}
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-300">✨ AI Prompt <span className="text-slate-600">(Optional)</span></label>
          <textarea value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} rows={2} maxLength={300}
            placeholder='e.g. "Make it funny, he loves cricket."'
            className="w-full resize-none rounded-xl border border-violet-500/20 bg-[#13141f] px-3.5 py-2.5 text-sm leading-6 text-slate-300 outline-none placeholder:text-slate-600 focus:border-violet-500/60" />
          <p className="mt-1 text-right text-[10px] text-slate-600">{customMessage.length}/300</p>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-slate-300">Occasion <span className="text-violet-400">*</span></label>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
            {occasions.map((occ) => {
              const sel = occasion === occ.value;
              return (
                <button key={occ.value} type="button" onClick={() => handleOccasionChange(occ.value)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition ${sel ? "border-violet-500 bg-violet-500/15" : "border-white/[0.07] bg-white/[0.02] hover:border-white/15"}`}>
                  <span className="text-xl leading-none">{occ.emoji}</span>
                  <span className={`text-[10px] font-medium ${sel ? "text-violet-300" : "text-slate-400"}`}>{occ.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">Recipient Name <span className="text-violet-400">*</span></label>
            <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Arun" maxLength={80}
              className="w-full rounded-xl border border-white/[0.08] bg-[#13141f] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500/60" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-300">Relationship <span className="text-violet-400">*</span></label>
            <select value={relationship} onChange={(e) => setRelationship(e.target.value as WishRelationship)}
              className="w-full rounded-xl border border-white/[0.08] bg-[#13141f] px-3.5 py-2.5 text-sm text-white outline-none focus:border-violet-500/60">
              {relationships.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-300">Sender Name <span className="text-slate-600">(Optional)</span></label>
          <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="Vignesh" maxLength={80}
            className="w-full rounded-xl border border-white/[0.08] bg-[#13141f] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-500/60" />
        </div>

        {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3"><p className="text-xs text-red-300">{error}</p></div>}

        <button type="button" onClick={onGenerate} disabled={loading || !recipientName.trim()}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:from-violet-500 hover:to-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? (
            <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Generating...</>
          ) : hasGenerated ? (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 11a8.1 8.1 0 0 0-14.7-4L3 10" /><path d="M3 5v5h5" /><path d="M4 13a8.1 8.1 0 0 0 14.7 4L21 14" /><path d="M21 19v-5h-5" /></svg>Regenerate</>
          ) : (
            <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="m12 2-1.4 5.6L5 9l5.6 1.4L12 16l1.4-5.6L19 9l-5.6-1.4Z" /><path d="m19 17-.7 2.3L16 20l2.3.7L19 23l.7-2.3L22 20l-2.3-.7Z" /></svg>Generate Video Wish with AI ✨</>
          )}
        </button>

        <div className="flex justify-end border-t border-white/[0.06] pt-4">
          <button type="button" onClick={onNext} disabled={!hasGenerated || loading}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:from-violet-500 hover:to-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-40">
            Next →
          </button>
        </div>
      </div>

      {/* Right: preview */}
      <div className="flex flex-col items-center gap-4">
        {!hasGenerated && !loading && (
          <div className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01] px-6 py-16 text-center">
            <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400/40">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m12 2-1.4 5.6L5 9l5.6 1.4L12 16l1.4-5.6L19 9l-5.6-1.4Z" /></svg>
            </div>
            <p className="text-sm text-slate-500">Video preview will appear here after generation.</p>
          </div>
        )}
        {loading && (
          <div className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] px-6 py-16 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500/20 border-t-violet-500" />
            <p className="text-sm text-slate-400">Generating your video wish...</p>
          </div>
        )}
        {hasGenerated && variation && result && (
          <>
            <div className="flex w-full items-center justify-between">
              <p className="text-xs font-semibold text-white">Video Preview</p>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[9px] font-medium text-emerald-300">✓ Generated</span>
            </div>
            <AnimatedWishVideo variation={variation} design={result.design} occasion={occasion} recipientName={recipientName || "You"} playing={playing} />
            <button type="button" onClick={() => setPlaying((p) => !p)}
              className="flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold shadow-lg transition active:scale-95"
              style={{ backgroundColor: colors.primary, color: colors.bg }}>
              {playing
                ? <><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>Pause</>
                : <><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8V4z" /></svg>Play Preview</>}
            </button>
            <div className="flex flex-wrap justify-center gap-1.5">
              {[result.design?.style, result.design?.mood, result.design?.colorTheme].filter(Boolean).map((tag) => (
                <span key={tag} className="rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-[9px] capitalize text-violet-300">{tag}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


// ── AI overlay style type ────────────────────────────────────
type OverlayStyle = {
  nameColor: string; nameFontSize: number; nameFontFamily: string;
  nameShadow: string; namePosition: "center" | "top" | "bottom";
  messageColor: string; messageFontSize: number; messageFontFamily: string;
  messageShadow: string; messagePosition: "center" | "top" | "bottom";
};

type OverlayVariation = {
  title: string; message: string; shortMessage: string; signature: string;
};

// ── Step 1 Upload: Upload + text overlay editor ──────────────
function Step1Upload({ recipientName, setRecipientName, overlayMessage, setOverlayMessage,
  videoFile, setVideoFile, selectedStyle, setSelectedStyle, onNext }: {
  recipientName: string; setRecipientName: (v: string) => void;
  overlayMessage: string; setOverlayMessage: (v: string) => void;
  videoFile: File | null; setVideoFile: (f: File | null) => void;
  selectedStyle: number; setSelectedStyle: (i: number) => void;
  onNext: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [occasion, setOccasion] = useState<WishOccasion>("birthday");
  const [relationship, setRelationship] = useState<WishRelationship>("friend");
  const [senderName, setSenderName] = useState("");

  // AI message generation
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");
  const [variations, setVariations] = useState<OverlayVariation[]>([]);
  const [aiStyle, setAiStyle] = useState<OverlayStyle | null>(null);
  const [varIndex, setVarIndex] = useState(0);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else { setVideoUrl(""); }
  }, [videoFile]);

  function handleFile(file: File) {
    if (file.type.startsWith("video/")) { setVideoFile(file); setVariations([]); setSelected(false); }
  }

  async function generateMessages() {
    if (!videoFile) { setGenError("Please upload a video first."); return; }
    setGenerating(true); setGenError(""); setSelected(false);
    try {
      const res = await fetch("/api/wishes/overlay", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientName: recipientName.trim() || "Someone special", occasion, relationship, senderName: senderName.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Generation failed.");
      setVariations(data.variations);
      setAiStyle(data.overlayStyle);
      setVarIndex(0);
      // Auto-fill with first variation
      setOverlayMessage(data.variations[0]?.message ?? "");
    } catch (e) { setGenError(e instanceof Error ? e.message : "Failed to generate messages."); }
    finally { setGenerating(false); }
  }

  function useVariation(i: number) {
    setOverlayMessage(variations[i]?.message ?? "");
    setSelected(true);
  }

  function prevVar() { const i = (varIndex - 1 + variations.length) % variations.length; setVarIndex(i); setOverlayMessage(variations[i]?.message ?? ""); setSelected(false); }
  function nextVar() { const i = (varIndex + 1) % variations.length; setVarIndex(i); setOverlayMessage(variations[i]?.message ?? ""); setSelected(false); }

  const currentVar = variations[varIndex];
  const activeStyle = aiStyle ?? textStylePresets[selectedStyle];

  // Resolve overlay style for preview
  const nameColor = aiStyle?.nameColor ?? textStylePresets[selectedStyle].color;
  const nameShadow = aiStyle?.nameShadow ?? textStylePresets[selectedStyle].shadow;
  const nameFontFamily = aiStyle?.nameFontFamily ?? textStylePresets[selectedStyle].fontFamily;
  const nameFontSize = aiStyle ? aiStyle.nameFontSize * 0.55 : textStylePresets[selectedStyle].fontSize * 0.55;
  const msgColor = aiStyle?.messageColor ?? "rgba(255,255,255,0.95)";
  const msgShadow = aiStyle?.messageShadow ?? "1px 1px 6px #000";
  const msgFontFamily = aiStyle?.messageFontFamily ?? "Arial, sans-serif";
  const msgFontSize = aiStyle ? aiStyle.messageFontSize * 0.55 : 12;

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
      {/* Left: form */}
      <div className="space-y-5">

        {/* Upload zone */}
        <div>
          <label className="mb-2 block text-xs font-medium text-slate-300">
            1. Upload Video <span className="text-blue-400">*</span>
          </label>
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            onClick={() => fileRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed p-8 text-center transition ${
              isDragging ? "border-blue-400 bg-blue-500/10" :
              videoFile ? "border-emerald-500/40 bg-emerald-500/[0.04]" :
              "border-white/[0.1] bg-white/[0.01] hover:border-blue-500/40 hover:bg-blue-500/[0.03]"
            }`}>
            {videoFile ? (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-2xl">✓</div>
                <div>
                  <p className="text-sm font-semibold text-white">{videoFile.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{(videoFile.size / 1024 / 1024).toFixed(1)} MB · Click to change</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 text-2xl">📁</div>
                <div>
                  <p className="text-sm font-semibold text-white">Drop your video here</p>
                  <p className="mt-1 text-xs text-slate-500">or click to browse · MP4, MOV, WebM</p>
                </div>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>

        {/* Recipient + details */}
        <div>
          <label className="mb-2 block text-xs font-medium text-slate-300">
            2. Recipient Details <span className="text-slate-600">(Optional)</span>
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[10px] text-slate-500">Recipient Name</label>
              <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Arun" maxLength={80}
                className="w-full rounded-xl border border-white/[0.08] bg-[#13141f] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500/60" />
            </div>
            <div>
              <label className="mb-1 block text-[10px] text-slate-500">Relationship</label>
              <select value={relationship} onChange={(e) => setRelationship(e.target.value as WishRelationship)}
                className="w-full rounded-xl border border-white/[0.08] bg-[#13141f] px-3.5 py-2.5 text-sm text-white outline-none focus:border-blue-500/60">
                {relationships.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[10px] text-slate-500">Occasion</label>
              <select value={occasion} onChange={(e) => setOccasion(e.target.value as WishOccasion)}
                className="w-full rounded-xl border border-white/[0.08] bg-[#13141f] px-3.5 py-2.5 text-sm text-white outline-none focus:border-blue-500/60">
                {occasions.map((o) => <option key={o.value} value={o.value}>{o.emoji} {o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[10px] text-slate-500">Sender Name <span className="text-slate-600">(optional)</span></label>
              <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="Vignesh" maxLength={80}
                className="w-full rounded-xl border border-white/[0.08] bg-[#13141f] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500/60" />
            </div>
          </div>
        </div>

        {/* AI generate messages */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-medium text-slate-300">3. Generate Message with AI</label>
            {variations.length > 0 && <span className="text-[10px] text-slate-500">{variations.length} variations</span>}
          </div>

          {genError && <p className="mb-2 text-xs text-red-400">{genError}</p>}

          <button type="button" onClick={generateMessages}
            disabled={generating || !videoFile}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-blue-500 hover:to-cyan-500 disabled:cursor-not-allowed disabled:opacity-50">
            {generating ? (
              <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Generating messages...</>
            ) : variations.length > 0 ? (
              <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 11a8.1 8.1 0 0 0-14.7-4L3 10" /><path d="M3 5v5h5" /><path d="M4 13a8.1 8.1 0 0 0 14.7 4L21 14" /><path d="M21 19v-5h-5" /></svg>Regenerate Messages</>
            ) : (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="m12 2-1.4 5.6L5 9l5.6 1.4L12 16l1.4-5.6L19 9l-5.6-1.4Z" /><path d="m19 17-.7 2.3L16 20l2.3.7L19 23l.7-2.3L22 20l-2.3-.7Z" /></svg>Generate Messages with AI ✨</>
            )}
          </button>
        </div>

        {/* Message carousel */}
        {variations.length > 0 && (
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.04] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-white">AI Generated Messages</p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={prevVar}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-slate-400 transition hover:text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <span className="text-[10px] text-slate-500">{varIndex + 1} / {variations.length}</span>
                <button type="button" onClick={nextVar}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-slate-400 transition hover:text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              </div>
            </div>

            {currentVar && (
              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
                <p className="text-xs font-semibold text-blue-300">{currentVar.title}</p>
                <p className="mt-2 text-[11px] leading-5 text-slate-300">{currentVar.message}</p>
                {currentVar.signature && <p className="mt-2 text-[10px] italic text-slate-500">{currentVar.signature}</p>}
              </div>
            )}

            <button type="button" onClick={() => useVariation(varIndex)}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition ${
                selected ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "bg-blue-600 text-white hover:bg-blue-500"
              }`}>
              {selected ? "✓ Message Selected" : "Use This Message"}
            </button>
          </div>
        )}

        {/* AI style info */}
        {aiStyle && (
          <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600">AI Recommended Text Style</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-white/[0.03] p-2 text-center">
                <div className="mx-auto mb-1 h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: aiStyle.nameColor }} />
                <p className="text-[9px] text-slate-500">Name Color</p>
              </div>
              <div className="rounded-lg bg-white/[0.03] p-2 text-center">
                <p className="text-[11px] font-bold text-slate-300">{aiStyle.nameFontSize}px</p>
                <p className="text-[9px] text-slate-500">Font Size</p>
              </div>
              <div className="rounded-lg bg-white/[0.03] p-2 text-center">
                <p className="text-[11px] capitalize text-slate-300">{aiStyle.namePosition}</p>
                <p className="text-[9px] text-slate-500">Position</p>
              </div>
            </div>
          </div>
        )}

        {/* Manual message override */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-300">
            Edit Message <span className="text-slate-600">(or type your own)</span>
          </label>
          <textarea value={overlayMessage} onChange={(e) => setOverlayMessage(e.target.value)} rows={3} maxLength={500}
            placeholder="Message will appear here after AI generation, or type your own..."
            className="w-full resize-none rounded-xl border border-white/[0.08] bg-[#13141f] px-3.5 py-2.5 text-sm leading-6 text-slate-300 outline-none placeholder:text-slate-600 focus:border-blue-500/60" />
          <p className="mt-1 text-right text-[10px] text-slate-600">{overlayMessage.length}/500</p>
        </div>

        <div className="flex justify-end border-t border-white/[0.06] pt-4">
          <button type="button" onClick={onNext}
            disabled={!videoFile}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:from-blue-500 hover:to-cyan-500 disabled:cursor-not-allowed disabled:opacity-40">
            Next →
          </button>
        </div>
      </div>

      {/* Right: live preview */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full items-center justify-between">
          <p className="text-xs font-semibold text-white">Live Preview</p>
          {videoFile && aiStyle && (
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[9px] text-blue-300">AI Styled</span>
          )}
        </div>

        {!videoFile ? (
          <div className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01] px-6 py-16 text-center">
            <div className="text-4xl opacity-30">🎬</div>
            <p className="text-sm text-slate-500">Upload a video to see the live preview.</p>
          </div>
        ) : (
          <div className="relative w-full max-w-[300px] overflow-hidden rounded-2xl bg-black shadow-2xl">
            <video ref={videoRef} src={videoUrl} className="w-full" controls muted loop playsInline />

            {/* Text overlay preview */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 px-4">
              {recipientName && (
                <p style={{
                  color: nameColor, textShadow: nameShadow, fontFamily: nameFontFamily,
                  fontSize: `${nameFontSize}px`, fontWeight: "bold", textAlign: "center",
                }}>
                  {recipientName}
                </p>
              )}
              {overlayMessage && (
                <p style={{
                  color: msgColor, textShadow: msgShadow, fontFamily: msgFontFamily,
                  fontSize: `${msgFontSize}px`, textAlign: "center", lineHeight: 1.5,
                }}>
                  {overlayMessage.length > 80 ? overlayMessage.slice(0, 80) + "…" : overlayMessage}
                </p>
              )}
            </div>

            <p className="absolute bottom-2 left-0 right-0 text-center text-[9px] text-white/40">
              Preview — final MP4 will have burned-in text
            </p>
          </div>
        )}

        {/* Color/style indicator */}
        {aiStyle && (
          <div className="flex items-center gap-3 text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full border border-white/20" style={{ backgroundColor: aiStyle.nameColor }} />
              Name
            </span>
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full border border-white/20" style={{ backgroundColor: aiStyle.messageColor }} />
              Message
            </span>
            <span className="capitalize">{aiStyle.namePosition} position</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Step 2: Review (shared) ───────────────────────────────────
function Step2({ variation, design, occasion, recipientName, musicUrl, setMusicUrl, musicFile, setMusicFile,
  onEdit, mode, uploadVideoFile, overlayMessage, overlayStyle }: {
  variation: WishAIVariation | null; design: WishAIGeneratedResult["design"] | null;
  occasion: WishOccasion; recipientName: string;
  musicUrl: string; setMusicUrl: (v: string) => void;
  musicFile: File | null; setMusicFile: (f: File | null) => void;
  onEdit: (f: keyof WishAIVariation, v: string) => void;
  mode: Mode;
  uploadVideoFile: File | null;
  overlayMessage: string;
  overlayStyle: number;
}) {
  const [playing, setPlaying] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [renderError, setRenderError] = useState("");
  const [renderProgress, setRenderProgress] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadVideoUrl = useRef<string>("");

  useEffect(() => {
    if (uploadVideoFile) {
      uploadVideoUrl.current = URL.createObjectURL(uploadVideoFile);
      return () => URL.revokeObjectURL(uploadVideoUrl.current);
    }
  }, [uploadVideoFile]);

  const colorTheme = (design?.colorTheme as WishColorTheme) ?? "rose-gold";
  const colors = themeColors[colorTheme] ?? themeColors["midnight"];
  const style = textStylePresets[overlayStyle];

  function togglePlay() {
    setPlaying((p) => { if (!p) audioRef.current?.play().catch(() => {}); else audioRef.current?.pause(); return !p; });
  }

  async function handleAIRender() {
    if (!variation) return;
    setRendering(true); setRenderError(""); setRenderProgress("Bundling composition...");
    try {
      const res = await fetch("/api/wishes/render", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientName, title: variation.title, message: variation.message,
          signature: variation.signature, occasion,
          colorTheme: design?.colorTheme ?? colorTheme,
          animationStyle: design?.animationStyle ?? "birthday",
          decoration: design?.decoration ?? "sparkles",
        }),
      });
      setRenderProgress("Rendering frames...");
      if (!res.ok) throw new Error((await res.json()).error ?? "Render failed.");
      setRenderProgress("Encoding MP4...");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `wish-${recipientName.replace(/\s+/g, "-")}.mp4`;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(url);
    } catch (e) { setRenderError(e instanceof Error ? e.message : "Failed to render."); }
    finally { setRendering(false); setRenderProgress(""); }
  }

  async function handleUploadRender() {
    if (!uploadVideoFile) return;
    setRendering(true); setRenderError(""); setRenderProgress("Loading FFmpeg...");
    try {
      // Dynamic import of ffmpeg (browser-side)
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const { fetchFile, toBlobURL } = await import("@ffmpeg/util");

      const ffmpeg = new FFmpeg();

      ffmpeg.on("progress", ({ progress }) => {
        setRenderProgress(`Encoding: ${Math.round(progress * 100)}%`);
      });

      setRenderProgress("Loading FFmpeg WASM core...");
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      });

      setRenderProgress("Reading video file...");
      await ffmpeg.writeFile("input.mp4", await fetchFile(uploadVideoFile));

      // Build drawtext filter for name
      const nameText = recipientName.replace(/'/g, "\\'").replace(/:/g, "\\:").replace(/,/g, "\\,");
      const msgText = overlayMessage.replace(/'/g, "\\'").replace(/:/g, "\\:").replace(/,/g, "\\,");
      const fontColor = style.color.replace("#", "");

      const nameFilter = `drawtext=text='${nameText}':fontsize=${style.fontSize}:fontcolor=${fontColor}:borderw=2:bordercolor=black:x=(w-text_w)/2:y=(h/2)-60:enable='1'`;
      const msgFilter = msgText
        ? `drawtext=text='${msgText}':fontsize=20:fontcolor=white:borderw=2:bordercolor=black:x=(w-text_w)/2:y=(h/2)+40:enable='1'`
        : null;

      const filterStr = msgFilter ? `${nameFilter},${msgFilter}` : nameFilter;

      setRenderProgress("Burning text into video...");
      await ffmpeg.exec(["-i", "input.mp4", "-vf", filterStr, "-codec:a", "copy", "output.mp4"]);

      setRenderProgress("Preparing download...");
      const data = await ffmpeg.readFile("output.mp4") as Uint8Array;
      const blob = new Blob([data.buffer as ArrayBuffer], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `wish-${recipientName.replace(/\s+/g, "-")}.mp4`;
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(url);
    } catch (e) { setRenderError(e instanceof Error ? e.message : "Failed to process video."); }
    finally { setRendering(false); setRenderProgress(""); }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      {/* Left: preview + controls */}
      <div className="flex flex-col items-center gap-4">

        {mode === "ai" && variation ? (
          <>
            <AnimatedWishVideo variation={variation} design={design} occasion={occasion} recipientName={recipientName} playing={playing} />
            <button type="button" onClick={togglePlay}
              className="flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold shadow-lg transition active:scale-95"
              style={{ backgroundColor: colors.primary, color: colors.bg }}>
              {playing ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>Pause</> : <><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8V4z" /></svg>Play</>}
            </button>
          </>
        ) : mode === "upload" && uploadVideoFile ? (
          <div className="relative w-full max-w-[300px] overflow-hidden rounded-2xl bg-black shadow-2xl">
            <video src={uploadVideoUrl.current} className="w-full" controls muted loop playsInline />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/15">
              {recipientName && (
                <p style={{ color: style.color, textShadow: style.shadow, fontSize: `${style.fontSize * 0.6}px`, fontFamily: style.fontFamily, fontWeight: "bold", textAlign: "center", padding: "0 16px" }}>
                  {recipientName}
                </p>
              )}
              {overlayMessage && (
                <p style={{ color: "rgba(255,255,255,0.9)", textShadow: "1px 1px 6px #000", fontSize: "11px", fontFamily: style.fontFamily, textAlign: "center", padding: "0 16px", maxWidth: "260px" }}>
                  {overlayMessage}
                </p>
              )}
            </div>
          </div>
        ) : null}

        <audio ref={audioRef} loop />

        {/* Render button */}
        <button type="button" onClick={mode === "ai" ? handleAIRender : handleUploadRender} disabled={rendering}
          className={`flex items-center gap-2 rounded-xl border px-5 py-2.5 text-xs font-semibold transition hover:opacity-90 disabled:opacity-50 ${
            mode === "ai" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-blue-500/30 bg-blue-500/10 text-blue-300"
          }`}>
          {rendering ? (
            <><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current/30 border-t-current" />{renderProgress || "Processing..."}</>
          ) : (
            <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            {mode === "ai" ? "Download as Real MP4 (Remotion)" : "Burn Text & Download MP4 (FFmpeg)"}</>
          )}
        </button>
        {renderError && <p className="text-xs text-red-400">{renderError}</p>}

        {/* Music */}
        <button type="button" onClick={() => setShowMusic((s) => !s)}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-violet-300 transition">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
          {musicFile ? `🎵 ${musicFile.name}` : musicUrl ? "🎵 Online music" : "Add Background Music (Optional)"}
        </button>

        {showMusic && (
          <div className="w-full max-w-[300px] rounded-2xl border border-white/[0.08] bg-[#0d0f17] p-4 space-y-3">
            <p className="text-xs font-semibold text-white">Background Music</p>
            <div>
              <p className="mb-1.5 text-[10px] text-slate-500">Upload from device</p>
              <button type="button" onClick={() => fileRef.current?.click()}
                className="flex w-full items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-xs text-slate-400 hover:text-violet-300 transition">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                {musicFile ? musicFile.name : "Choose MP3 / M4A"}
              </button>
              <input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0] ?? null; setMusicFile(f); if (f && audioRef.current) audioRef.current.src = URL.createObjectURL(f); setMusicUrl(""); }} />
            </div>
            <div>
              <p className="mb-1.5 text-[10px] text-slate-500">Online suggestions</p>
              {onlineMusicOptions.map((opt) => (
                <button key={opt.label} type="button" onClick={() => { if (opt.url) { setMusicUrl(opt.url); setMusicFile(null); if (audioRef.current) audioRef.current.src = opt.url; } }}
                  className={`mb-1 flex w-full items-center justify-between rounded-lg border px-3 py-2 text-[11px] transition ${musicUrl === opt.url && opt.url ? "border-violet-500/40 bg-violet-500/15 text-violet-300" : "border-white/[0.06] text-slate-400 hover:border-white/[0.12]"} ${!opt.url ? "cursor-default opacity-40" : ""}`}>
                  <span>{opt.label}</span>
                  {!opt.url && <span className="text-[9px] text-slate-600">Coming soon</span>}
                </button>
              ))}
            </div>
            {(musicUrl || musicFile) && (
              <button type="button" onClick={() => { setMusicUrl(""); setMusicFile(null); if (audioRef.current) audioRef.current.src = ""; }}
                className="text-[10px] text-slate-600 hover:text-red-400 transition">✕ Remove music</button>
            )}
          </div>
        )}
      </div>

      {/* Right: edit fields */}
      <div className="space-y-4">
        {mode === "ai" && variation ? (
          <>
            <p className="text-xs font-semibold text-white">Edit Wish Content</p>
            <div>
              <label className="mb-1 block text-[10px] text-slate-500">Title</label>
              <input value={variation.title} onChange={(e) => onEdit("title", e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-[#0d0f17] px-3.5 py-2.5 text-sm font-semibold text-white outline-none focus:border-violet-500/50" />
            </div>
            <div>
              <label className="mb-1 block text-[10px] text-slate-500">Message</label>
              <textarea value={variation.message} onChange={(e) => onEdit("message", e.target.value)} rows={4}
                className="w-full resize-none rounded-xl border border-white/[0.08] bg-[#0d0f17] px-3.5 py-2.5 text-sm leading-6 text-slate-300 outline-none focus:border-violet-500/50" />
            </div>
            <div>
              <label className="mb-1 block text-[10px] text-slate-500">Signature</label>
              <input value={variation.signature} onChange={(e) => onEdit("signature", e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-[#0d0f17] px-3.5 py-2.5 text-sm italic text-slate-400 outline-none focus:border-violet-500/50" />
            </div>
            {design && (
              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">AI Design</p>
                <div className="grid grid-cols-2 gap-2">
                  {[{ label: "Style", value: design.style }, { label: "Mood", value: design.mood }, { label: "Animation", value: design.animationStyle }, { label: "Opening", value: design.openingStyle }].map((item) => (
                    <div key={item.label} className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-2">
                      <p className="text-[8px] uppercase tracking-wider text-slate-600">{item.label}</p>
                      <p className="mt-0.5 text-[10px] font-medium capitalize text-slate-300">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-xl border border-white/[0.06] bg-[#0d0f17] p-4">
            <p className="mb-3 text-xs font-semibold text-white">Upload Details</p>
            <div className="space-y-2 text-xs text-slate-400">
              <p><span className="text-slate-600">Name:</span> {recipientName || "—"}</p>
              <p><span className="text-slate-600">Message:</span> {overlayMessage || "—"}</p>
              <p><span className="text-slate-600">Text style:</span> {textStylePresets[overlayStyle]?.label}</p>
            </div>
            <p className="mt-4 text-[10px] leading-5 text-slate-600">
              Click "Burn Text & Download MP4" to process the video with FFmpeg.wasm in your browser. No upload needed — everything runs locally.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Step 3: Publish (shared) ──────────────────────────────────
function Step3({ recipientName, variation, design, occasion }: {
  recipientName: string; variation: WishAIVariation | null;
  design: WishAIGeneratedResult["design"] | null; occasion: WishOccasion;
}) {
  const [copied, setCopied] = useState(false);
  const mockUrl = "https://myinviteverse.com/w/abc123";
  const colorTheme = (design?.colorTheme as WishColorTheme) ?? "rose-gold";
  const colors = themeColors[colorTheme] ?? themeColors["midnight"];

  function copyLink() { navigator.clipboard.writeText(mockUrl).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  const wa = encodeURIComponent(`🎉 A special animated video wish for you, ${recipientName}! Open here: ${mockUrl}`);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] py-10 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-5" /></svg>
          <div>
            <h3 className="text-lg font-bold text-white">Your Video Wish is Ready!</h3>
            <p className="mt-1 text-sm text-slate-400">Share it on WhatsApp for a cinematic opening experience.</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-[#0d0f17] p-5">
          <p className="mb-3 text-xs font-semibold text-white">Share with {recipientName}</p>
          <div className="flex gap-2 rounded-xl border border-white/[0.08] bg-black/20 px-3.5 py-2.5">
            <span className="flex-1 truncate text-xs text-slate-400">{mockUrl}</span>
            <button onClick={copyLink} className="shrink-0 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] text-slate-300 hover:bg-white/[0.08] transition">{copied ? "Copied!" : "Copy Link"}</button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a href={`https://wa.me/?text=${wa}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25d366] py-3 text-sm font-semibold text-white transition hover:bg-[#22be5b]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
              Share on WhatsApp
            </a>
            <a href={mockUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10 py-3 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20">Open Wish ↗</a>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[["⬇", "Download\nVideo"], ["✏️", "Edit\nWish"], ["🔗", "Copy\nLink"], ["🗑", "Delete\nWish"]].map(([icon, label]) => (
            <button key={label} type="button" className="flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.02] py-3 text-slate-500 transition hover:text-white">
              <span className="text-lg">{icon}</span>
              <span className="whitespace-pre-line text-center text-[9px] leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>
      {variation && (
        <div className="h-fit overflow-hidden rounded-2xl border" style={{ borderColor: `${colors.primary}20`, background: `linear-gradient(160deg, ${colors.bg}, ${colors.primary}15)` }}>
          <div className="relative flex h-36 items-center justify-center overflow-hidden">
            <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(circle, ${colors.primary}25, transparent 70%)` }} />
            <WishIllustration occasion={occasion} primaryColor={colors.primary} secondaryColor={colors.secondary} />
          </div>
          <div className="p-4 text-center">
            <p className="text-sm font-bold" style={{ color: colors.primary }}>{variation.title}</p>
            <p className="mt-1 line-clamp-2 text-[11px] text-slate-400">{variation.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────
function CreateWishContent() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode | null>(null);
  const [step, setStep] = useState(1);

  // AI state
  const [recipientName, setRecipientName] = useState("");
  const [relationship, setRelationship] = useState<WishRelationship>("friend");
  const [occasion, setOccasion] = useState<WishOccasion>((searchParams.get("occasion") as WishOccasion) ?? "birthday");
  const [senderName, setSenderName] = useState("");
  const [customMessage, setCustomMessage] = useState(occasionPrompts[(searchParams.get("occasion") as WishOccasion) ?? "birthday"] ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<WishAIGeneratedResult | null>(null);

  // Upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [overlayMessage, setOverlayMessage] = useState("");
  const [overlayStyle, setOverlayStyle] = useState(0);

  // Shared
  const [musicUrl, setMusicUrl] = useState("");
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [selectedVariation] = useState(0);

  function selectMode(m: Mode) { setMode(m); setStep(1); }

  async function generate() {
    if (!recipientName.trim()) { setError("Please enter the recipient's name."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/ai/wishes", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientName: recipientName.trim(), occasion, relationship,
          senderName: senderName.trim() || undefined,
          customMessage: customMessage.trim() || undefined,
          style: "playful" as WishStyle, mood: "happy" as WishMood, colorTheme: "rose-gold" as WishColorTheme,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Unable to generate wish.");
      const gen = data.data as WishAIGeneratedResult;
      if (!gen?.variations?.length) throw new Error("No variations returned.");
      setResult(gen);
    } catch (e) { setError(e instanceof Error ? e.message : "Something went wrong."); }
    finally { setLoading(false); }
  }

  async function handlePublish() {
    const cv = result?.variations[selectedVariation];
    if (!cv || !result) { setStep(3); return; }
    try {
      await fetch("/api/wishes", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientName, relationship, occasion,
          senderName: senderName || undefined, customMessage: customMessage || undefined,
          selectedStyle: result.design?.style ?? "playful", selectedMood: result.design?.mood ?? "happy",
          selectedColorTheme: result.design?.colorTheme ?? "rose-gold",
          title: cv.title, message: cv.message, shortMessage: cv.shortMessage, signature: cv.signature,
          designConfig: result.design ?? {}, publish: true,
        }),
      });
    } catch { /* proceed regardless */ }
    setStep(3);
  }

  function editVariation(f: keyof WishAIVariation, v: string) {
    if (!result) return;
    setResult({ ...result, variations: result.variations.map((vv, i) => i === selectedVariation ? { ...vv, [f]: v } : vv) });
  }

  const cv = result?.variations[selectedVariation] ?? null;

  // For upload mode, create a synthetic variation for shared steps
  const uploadVariation: WishAIVariation | null = uploadFile ? {
    title: `For ${recipientName}`,
    message: overlayMessage,
    shortMessage: overlayMessage.slice(0, 80),
    signature: "",
  } : null;

  const activeVariation = mode === "upload" ? uploadVariation : cv;
  const activeOccasion = occasion;

  return (
    <main className="min-h-screen bg-[#08090f] text-white">
      <div className={`mx-auto px-4 py-6 sm:px-6 ${mode === null || (mode === "ai" && step === 1) ? "max-w-5xl" : "max-w-4xl"}`}>

        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <button type="button"
            onClick={() => { if (mode === null) { /* already at root */ } else if (step === 1) { setMode(null); } else { setStep((s) => s - 1); } }}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] text-slate-400 hover:bg-white/[0.05] hover:text-white transition">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">
              {mode === null ? "Create a Video Wish" : mode === "ai" ? "Create with AI" : "Upload Your Video"}
            </h1>
            <p className="text-xs text-slate-500">
              {mode === null ? "Choose how you want to create your wish." :
               mode === "ai" ? "AI creates a beautiful animated video wish." :
               "Upload any video and personalise it with text."}
            </p>
          </div>
        </div>

        {/* Progress bar — only when mode is selected */}
        {mode !== null && <ProgressBar step={step} mode={mode} />}

        {/* Content */}
        <div className="min-h-[380px]">
          {mode === null && <Step0 onSelect={selectMode} />}

          {mode === "ai" && step === 1 && (
            <Step1AI
              recipientName={recipientName} setRecipientName={setRecipientName}
              relationship={relationship} setRelationship={setRelationship}
              occasion={occasion} setOccasion={setOccasion}
              senderName={senderName} setSenderName={setSenderName}
              customMessage={customMessage} setCustomMessage={setCustomMessage}
              loading={loading} error={error} result={result}
              onGenerate={generate} onNext={() => setStep(2)}
            />
          )}

          {mode === "upload" && step === 1 && (
            <Step1Upload
              recipientName={recipientName} setRecipientName={setRecipientName}
              overlayMessage={overlayMessage} setOverlayMessage={setOverlayMessage}
              videoFile={uploadFile} setVideoFile={setUploadFile}
              selectedStyle={overlayStyle} setSelectedStyle={setOverlayStyle}
              onNext={() => setStep(2)}
            />
          )}

          {mode !== null && step === 2 && (
            <Step2
              variation={activeVariation} design={result?.design ?? null}
              occasion={activeOccasion} recipientName={recipientName || "You"}
              musicUrl={musicUrl} setMusicUrl={setMusicUrl}
              musicFile={musicFile} setMusicFile={setMusicFile}
              onEdit={editVariation} mode={mode}
              uploadVideoFile={uploadFile}
              overlayMessage={overlayMessage}
              overlayStyle={overlayStyle}
            />
          )}

          {mode !== null && step === 3 && (
            <Step3 recipientName={recipientName || "You"} variation={activeVariation}
              design={result?.design ?? null} occasion={activeOccasion} />
          )}
        </div>

        {/* Bottom nav — Steps 2 & 3 */}
        {mode !== null && step > 1 && (
          <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-5">
            <button type="button" onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-sm text-slate-400 transition hover:text-white">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6" /></svg>Back
            </button>
            {step === 2 && (
              <button type="button" onClick={handlePublish}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:from-violet-500 hover:to-fuchsia-500">
                Save & Publish →
              </button>
            )}
            {step === 3 && (
              <Link href="/wishes" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-2.5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20">
                Done ✓
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function CreateWishPage() {
  return <Suspense fallback={null}><CreateWishContent /></Suspense>;
}
