import Link from "next/link";

const eventTypes = [
  {
    title: "Wedding",
    description: "Create beautiful wedding invitations.",
    icon: "💍",
  },
  {
    title: "Birthday",
    description: "Celebrate with a personalized invitation.",
    icon: "🎂",
  },
  {
    title: "Engagement",
    description: "Share your special engagement moment.",
    icon: "💎",
  },
  {
    title: "Baby Shower",
    description: "Create a memorable baby shower invite.",
    icon: "🍼",
  },
  {
    title: "Housewarming",
    description: "Invite family and friends to your new home.",
    icon: "🏠",
  },
  {
    title: "Anniversary",
    description: "Celebrate your special milestone.",
    icon: "❤️",
  },
  {
    title: "Special Event",
    description: "Create an invitation for any occasion.",
    icon: "✨",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="17"
        rx="2"
      />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  );
}

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#070914] px-4 pb-16 pt-20 text-white sm:px-6 lg:px-8 lg:pt-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-violet-400">
                <CalendarIcon />

                <span className="text-xs font-medium uppercase tracking-[0.18em]">
                  Event Management
                </span>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Events
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Create and manage invitations for your special
                moments and celebrations.
              </p>
            </div>

            <Link
              href="/create"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            >
              Create Event
              <ArrowIcon />
            </Link>
          </div>
        </section>

        {/* Event types */}
        <section>
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-white">
              Choose an Event
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              Select an event type to start creating your invitation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {eventTypes.map((event) => (
              <Link
                key={event.title}
                href="/create"
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-violet-500/[0.04]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-xl transition group-hover:border-violet-500/20 group-hover:bg-violet-500/10">
                  {event.icon}
                </div>

                <h3 className="mt-4 text-sm font-semibold text-white">
                  {event.title}
                </h3>

                <p className="mt-1.5 min-h-[40px] text-xs leading-5 text-slate-500">
                  {event.description}
                </p>

                <div className="mt-5 flex items-center gap-1.5 text-[11px] font-medium text-slate-600 transition group-hover:text-violet-300">
                  Create Invitation
                  <ArrowIcon />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Custom event */}
        <section className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-base font-semibold text-white">
                Planning something different?
              </h2>

              <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
                Create a custom invitation for any event that
                doesn't fit the categories above.
              </p>
            </div>

            <Link
              href="/create"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300"
            >
              Custom Event
              <ArrowIcon />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}