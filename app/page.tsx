import Link from "next/link";

import ComingSoonButton from "@/components/ui/ComingSoonButton";
import FeaturedDesigns from "@/components/home/FeaturedDesigns";
import FloatingTools from "@/components/ui/FloatingTools";
import { invitationTemplates } from "@/lib/templates";

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
      <FloatingTools />
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
                href="/signup"
                className="rounded-full bg-violet-500 px-7 py-3.5 font-semibold text-white transition hover:bg-violet-400"
              >
                Create Invitation
              </Link>

              <ComingSoonButton
                className="
              rounded-full
              border border-slate-300
              bg-white
              px-7 py-3.5
              font-semibold
              text-slate-900
              transition-all duration-300
              hover:border-slate-900
              hover:bg-slate-900
              hover:text-white
            "
              >
                Explore Designs
              </ComingSoonButton>
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
                Beautiful invitation experiences are coming to MyInviteVerse.
              </p>
            </div>

            <ComingSoonButton className="text-left text-sm font-semibold text-violet-400 transition hover:text-violet-300">
              View all designs →
            </ComingSoonButton>
          </div>

          {/* Featured Design Carousel */}
          <FeaturedDesigns designs={invitationTemplates} />
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
            <span className="block text-violet-400">
              a special invitation.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Create an invitation your guests will enjoy opening and sharing.
          </p>

          <Link
            href="/signup"
            className="mt-9 inline-block rounded-full bg-violet-500 px-8 py-3.5 font-semibold text-white transition hover:bg-violet-400"
          >
            Create Your Invitation
          </Link>
        </div>
      </section>
      {/* Final CTA */}
      <section className="border-t border-slate-800 py-24">
        {/* existing CTA content */}
      </section>

      <FloatingTools />
    </main>
  );
}