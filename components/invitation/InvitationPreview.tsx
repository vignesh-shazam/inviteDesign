type InvitationPreviewProps = {
  title?: string;
  eventType?: string;
  date?: string;
  venue?: string;
};

export default function InvitationPreview({
  title = "You're Invited",
  eventType = "A Special Celebration",
  date = "Saturday, 24 October 2026",
  venue = "Chennai, Tamil Nadu",
}: InvitationPreviewProps) {
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">
      <div className="relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden px-8 py-12 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.2),_transparent_55%)]" />

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
            {eventType}
          </p>

          <h2 className="mt-6 font-serif text-4xl font-semibold text-white">
            {title}
          </h2>

          <div className="mx-auto my-8 h-px w-20 bg-violet-400/60" />

          <p className="text-sm uppercase tracking-wider text-slate-300">
            {date}
          </p>

          <p className="mt-3 text-sm text-slate-400">{venue}</p>

          <button
            type="button"
            className="mt-10 rounded-full border border-violet-400/50 px-6 py-3 text-sm font-semibold text-violet-300 transition hover:bg-violet-500 hover:text-white"
          >
            View Invitation
          </button>
        </div>
      </div>
    </div>
  );
}