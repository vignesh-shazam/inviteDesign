import Link from "next/link";
import WishIllustration from "@/components/wishes/WishIllustration";
import { getWishes } from "@/lib/db/wishRepository";

export const dynamic = "force-dynamic";

// ─── Theme per occasion ─────────────────────────────────────
const occasionThemes: Record<string, { primary: string; secondary: string; bg: string }> = {
  birthday:        { primary: "#f59e0b", secondary: "#fcd34d", bg: "#1a1005" },
  anniversary:     { primary: "#f472b6", secondary: "#f9a8d4", bg: "#1a0a12" },
  wedding:         { primary: "#a78bfa", secondary: "#ddd6fe", bg: "#110d1e" },
  engagement:      { primary: "#e879f9", secondary: "#f0abfc", bg: "#160b1c" },
  congratulations: { primary: "#34d399", secondary: "#6ee7b7", bg: "#071310" },
  "new-baby":      { primary: "#67e8f9", secondary: "#a5f3fc", bg: "#071318" },
  housewarming:    { primary: "#fb923c", secondary: "#fdba74", bg: "#180d05" },
  festival:        { primary: "#f97316", secondary: "#fcd34d", bg: "#160c03" },
  "thank-you":     { primary: "#4ade80", secondary: "#86efac", bg: "#071510" },
  friendship:      { primary: "#60a5fa", secondary: "#93c5fd", bg: "#07101a" },
  "get-well-soon": { primary: "#86efac", secondary: "#bbf7d0", bg: "#071510" },
  "good-luck":     { primary: "#fde68a", secondary: "#fcd34d", bg: "#141007" },
  custom:          { primary: "#c4b5fd", secondary: "#ddd6fe", bg: "#110d1e" },
};

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function SparkleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 2-1.4 5.6L5 9l5.6 1.4L12 16l1.4-5.6L19 9l-5.6-1.4Z" />
      <path d="m19 17-.7 2.3L16 20l2.3.7L19 23l.7-2.3L22 20l-2.3-.7Z" />
    </svg>
  );
}

export default async function WishesPage() {
  let wishes: Awaited<ReturnType<typeof getWishes>> = [];
  try { wishes = await getWishes({ limit: 50 }); } catch { /* Supabase may not be set up yet */ }

  type WishItem = { id: string; recipientName: string; occasion: string; title: string; status: "published" | "draft"; date: string; cardId: string };
  const displayWishes: WishItem[] = wishes.map((w) => ({
    id: w.id, cardId: w.cardId,
    recipientName: w.recipientName, occasion: w.occasion,
    title: w.title, status: w.status,
    date: new Date(w.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
  }));

  const total = displayWishes.length;
  const published = displayWishes.filter((w) => w.status === "published").length;
  const drafts = displayWishes.filter((w) => w.status === "draft").length;

  return (
    <main className="min-h-screen bg-[#08090f] px-4 py-6 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">

        {/* ── Page header ── */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Wishes</h1>
            <p className="mt-1 text-xs text-slate-500">Create beautiful AI-powered wishes for your loved ones</p>
          </div>

          <Link
            href="/wishes/create"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-500"
          >
            <PlusIcon />
            Create New Wish
          </Link>
        </div>

        {/* ── Hero banner ── */}
        <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 p-6 sm:p-8">
          {/* Background glow orbs */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-8 left-1/3 h-32 w-32 rounded-full bg-fuchsia-400/20 blur-2xl" />

          {/* Floating envelope illustration */}
          <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 opacity-20 sm:opacity-30">
            <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
              <rect x="5" y="20" width="110" height="75" rx="8" fill="white" />
              <path d="M5 22 L60 58 L115 22" stroke="#a855f7" strokeWidth="3" fill="none" />
              <path d="M5 95 L42 62" stroke="#a855f7" strokeWidth="2" opacity="0.5" />
              <path d="M115 95 L78 62" stroke="#a855f7" strokeWidth="2" opacity="0.5" />
              <circle cx="90" cy="8" r="6" fill="#fcd34d" opacity="0.8" />
              <circle cx="105" cy="18" r="4" fill="#f9a8d4" opacity="0.7" />
              <circle cx="78" cy="5" r="3" fill="#86efac" opacity="0.7" />
            </svg>
          </div>

          <div className="relative max-w-xs">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              AI Powered
            </p>
            <h2 className="mt-2 text-xl font-bold leading-snug text-white sm:text-2xl">
              Turn your feelings into beautiful wishes
            </h2>
            <p className="mt-2 text-sm leading-5 text-white/70">
              Let AI create a personalised, animated wish that makes their day special.
            </p>
            <Link
              href="/wishes/create"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-violet-700 shadow-lg transition hover:bg-violet-50"
            >
              <SparkleIcon size={14} />
              Create New Wish
            </Link>
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-1 rounded-xl border border-white/[0.07] bg-white/[0.03] p-1">
            {[
              { label: `All (${total})`, value: "all" },
              { label: `Drafts (${drafts})`, value: "drafts" },
              { label: `Published (${published})`, value: "published" },
            ].map((tab, i) => (
              <button
                key={tab.value}
                type="button"
                className={`rounded-lg px-3.5 py-1.5 text-[11px] font-medium transition ${
                  i === 0
                    ? "bg-violet-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <select className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[11px] text-slate-400 outline-none">
            <option>Sort by Latest</option>
            <option>Sort by Name</option>
          </select>
        </div>

        {/* ── Wish cards grid ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {displayWishes.map((wish) => {
            const theme = occasionThemes[wish.occasion] ?? occasionThemes["custom"];
            return (
              <Link
                key={wish.id}
                href={wish.status === "published" ? `/w/${wish.cardId}` : `/wishes/create`}
                className="group overflow-hidden rounded-2xl border transition hover:-translate-y-1 hover:shadow-xl"
                style={{
                  borderColor: `${theme.primary}25`,
                  backgroundColor: theme.bg,
                }}
              >
                {/* Illustration area */}
                <div
                  className="relative flex aspect-[4/3] items-center justify-center overflow-hidden"
                  style={{
                    background: `radial-gradient(circle at 60% 40%, ${theme.primary}30, ${theme.bg} 70%)`,
                  }}
                >
                  {/* Ambient glow */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 30% 60%, ${theme.secondary}15, transparent 60%)`,
                    }}
                  />

                  <WishIllustration
                    occasion={wish.occasion}
                    primaryColor={theme.primary}
                    secondaryColor={theme.secondary}
                    size="compact"
                  />

                  {/* Status badge */}
                  <span
                    className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                      wish.status === "published"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    {wish.status === "published" ? "Published" : "Draft"}
                  </span>
                </div>

                {/* Card info */}
                <div className="p-3">
                  <p className="truncate text-xs font-semibold text-white">
                    {wish.title}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <span
                      className="text-[10px] capitalize"
                      style={{ color: theme.primary }}
                    >
                      {wish.occasion.replace("-", " ")}
                    </span>
                    <span className="text-[10px] text-slate-600">{wish.date}</span>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Create new card */}
          <Link
            href="/wishes/create"
            className="flex aspect-auto min-h-[160px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] transition hover:border-violet-500/40 hover:bg-violet-500/[0.04]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <PlusIcon />
            </div>
            <p className="text-xs font-medium text-slate-500">New Wish</p>
          </Link>
        </div>

        {/* ── How it works ── */}
        <section className="mt-8 rounded-2xl border border-white/[0.06] bg-[#0d0f17] p-6">
          <h2 className="text-sm font-semibold text-white">How AI Wishes work</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { step: "1", title: "Describe the occasion", body: "Enter the recipient's name, occasion, and relationship. Add a personal prompt to make it unique.", accent: "#8b5cf6" },
              { step: "2", title: "AI generates 3 variations", body: "Gemini creates 3 beautifully written wish variations with a matching visual design and animation style.", accent: "#f472b6" },
              { step: "3", title: "Share the magic", body: "Publish your wish. The recipient gets a cinematic opening experience when they open the link from WhatsApp.", accent: "#34d399" },
            ].map((item) => (
              <div key={item.step} className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
                <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold"
                  style={{ backgroundColor: `${item.accent}15`, color: item.accent }}>
                  {item.step}
                </div>
                <p className="text-xs font-semibold text-white">{item.title}</p>
                <p className="mt-1.5 text-[11px] leading-5 text-slate-500">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Quick start ── */}
        <section className="mt-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">Popular occasions</p>
          <div className="flex flex-wrap gap-2">
            {[
              ["🎂 Birthday", "birthday"], ["💍 Anniversary", "anniversary"],
              ["💒 Wedding", "wedding"], ["🎉 Congratulations", "congratulations"],
              ["👶 New Baby", "new-baby"], ["🏠 Housewarming", "housewarming"],
              ["🌸 Friendship", "friendship"], ["🙏 Thank You", "thank-you"],
            ].map(([label, occasion]) => {
              const t = occasionThemes[occasion] ?? occasionThemes["custom"];
              return (
                <Link key={occasion} href={`/wishes/create?occasion=${occasion}`}
                  className="rounded-full border px-3 py-1.5 text-[11px] font-medium transition hover:opacity-90"
                  style={{ borderColor: `${t.primary}25`, backgroundColor: `${t.primary}0d`, color: t.primary }}>
                  {label}
                </Link>
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
}
