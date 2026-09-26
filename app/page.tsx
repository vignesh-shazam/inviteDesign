import Link from "next/link";

const featuredDesigns = [
  {
    title: "Elegant Wedding",
    category: "Wedding",
    description: "A timeless invitation for your special day.",
  },
  {
    title: "Royal Celebration",
    category: "Birthday",
    description: "A grand design for an unforgettable celebration.",
  },
  {
    title: "Modern Minimal",
    category: "Special Event",
    description: "A clean and modern invitation for every occasion.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose a Design",
    description:
      "Explore beautiful invitation designs and choose the style that fits your event.",
  },
  {
    number: "02",
    title: "Add Your Details",
    description:
      "Enter your event information, venue, date, time, and personal message.",
  },
  {
    number: "03",
    title: "Share Your Invitation",
    description:
      "Publish your invitation and share the unique link with your guests.",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.18),_transparent_45%)]" />

        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">
              Digital Invitations
            </p>

            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Create Invitations
              <span className="block text-violet-400">
                They&apos;ll Remember.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Create beautiful interactive invitations for weddings,
              birthdays, celebrations, and special moments. Share your
              invitation instantly with a simple link.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/create"
                className="rounded-full bg-violet-500 px-7 py-3.5 font-semibold text-white transition hover:bg-violet-400"
              >
                Create Invitation
              </Link>

              <Link
                href="/designs"
                className="rounded-full border border-slate-700 px-7 py-3.5 font-semibold text-white transition hover:bg-slate-900"
              >
                Explore Designs
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              No app installation required for your guests.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Designs */}
      <section className="border-t border-slate-800 bg-slate-950/60 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
                Featured Designs
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Designs for every occasion
              </h2>

              <p className="mt-4 max-w-2xl text-slate-400">
                Start with a beautiful design and make it your own.
              </p>
            </div>

            <Link
              href="/designs"
              className="text-sm font-semibold text-violet-400 transition hover:text-violet-300"
            >
              View all designs →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredDesigns.map((design) => (
              <article
                key={design.title}
                className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition hover:-translate-y-1 hover:border-violet-500/50"
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-violet-950 via-slate-900 to-slate-950">
                  <span className="text-5xl font-bold text-violet-400/40">
                    ID
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                    {design.category}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {design.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {design.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
              Simple Process
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Create and share in three steps
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8"
              >
                <span className="text-sm font-bold text-violet-400">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-800 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Your special moment deserves
            <span className="block text-violet-400">a special invitation.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Create an invitation your guests will enjoy opening and sharing.
          </p>

          <Link
            href="/create"
            className="mt-9 inline-block rounded-full bg-violet-500 px-8 py-3.5 font-semibold text-white transition hover:bg-violet-400"
          >
            Create Your Invitation
          </Link>
        </div>
      </section>
    </main>
  );
}