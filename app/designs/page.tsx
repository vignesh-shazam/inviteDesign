"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { invitationTemplates } from "@/lib/templates";
import SparkleButton from "@/components/ui/SparkleButton";

export default function DesignsPage() {
  const router = useRouter();

  function handleUseDesign(templateId: string) {
    router.push(
      `/create?template=${encodeURIComponent(templateId)}`,
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            MyInviteVerse Designs
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Choose Your Invitation
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400">
            Choose a design you love and customize it with your
            own event details, names, date, venue, and message.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {invitationTemplates.map((template) => (
            <article
              key={template.id}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-violet-500/50"
            >
              {/* Template Preview */}
              <div className="relative aspect-[2/3] overflow-hidden bg-slate-900">
                <Image
                  src={template.previewImage}
                  alt={`${template.title} invitation design`}
                  fill
                  priority={template.id === "elegant-wedding"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Category */}
                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet-300 backdrop-blur">
                  {template.category}
                </div>
              </div>

              {/* Template Details */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-white">
                  {template.title}
                </h2>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-400">
                  {template.description}
                </p>

                {/* Use Design */}
                <SparkleButton
                  type="button"
                  onClick={() =>
                    handleUseDesign(template.id)
                  }
                  className="mt-5 w-full rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
                >
                  Use This Design
                </SparkleButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}