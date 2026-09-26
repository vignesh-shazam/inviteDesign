import Link from "next/link";

const invitations = [
  {
    id: "wedding-001",
    title: "Arun & Priya",
    type: "Wedding",
    date: "24 October 2026",
    status: "Published",
  },
  {
    id: "birthday-001",
    title: "Rahul's Birthday",
    type: "Birthday",
    date: "15 November 2026",
    status: "Draft",
  },
  {
    id: "engagement-001",
    title: "Vijay & Anu",
    type: "Engagement",
    date: "06 December 2026",
    status: "Published",
  },
];

export default function InvitationsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
              Dashboard
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              My Invitations
            </h1>

            <p className="mt-3 text-slate-400">
              Create, manage, and share your invitations.
            </p>
          </div>

          <Link
            href="/create"
            className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400"
          >
            + Create Invitation
          </Link>
        </div>

        {/* Invitation Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {invitations.map((invitation) => (
            <article
              key={invitation.id}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition hover:-translate-y-1 hover:border-violet-500/40"
            >
              {/* Preview */}
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-violet-950 via-slate-900 to-slate-950">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.25em] text-violet-400">
                    {invitation.type}
                  </p>

                  <h2 className="mt-3 px-6 text-2xl font-semibold text-white">
                    {invitation.title}
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    {invitation.date}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    {invitation.type}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      invitation.status === "Published"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {invitation.status}
                  </span>
                </div>

                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/preview?id=${invitation.id}`}
                    className="flex-1 rounded-full border border-slate-700 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    View
                  </Link>

                  <Link
                    href={`/create?id=${invitation.id}`}
                    className="flex-1 rounded-full bg-violet-500 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-violet-400"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}