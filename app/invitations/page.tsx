import Link from "next/link";

import SparkleLink from "@/components/ui/SparkleLink";
import { getInvitations } from "@/lib/db/invitationRepository";
import { mapAIDesignToVisualTheme } from "@/lib/ai/aiDesignMapper";
import type {
  InvitationColorTheme,
  InvitationDesignStyle,
  InvitationDesignLayout,
  InvitationTypography,
  InvitationDecoration,
  InvitationDesignType,
} from "@/lib/ai/aiTypes";
import type { InvitationAIDesignSnapshot } from "@/lib/db/database.types";

function isValidAIDesign(
  d: InvitationAIDesignSnapshot | null | undefined,
): d is {
  type: InvitationDesignType;
  style: InvitationDesignStyle;
  layout: InvitationDesignLayout;
  colorTheme: InvitationColorTheme;
  typography: InvitationTypography;
  decoration: InvitationDecoration;
} {
  return (
    d != null &&
    typeof d.type === "string" &&
    typeof d.style === "string" &&
    typeof d.layout === "string" &&
    typeof d.colorTheme === "string" &&
    typeof d.typography === "string" &&
    typeof d.decoration === "string"
  );
}

export const dynamic = "force-dynamic";

export default async function InvitationsPage() {
  let invitations: Awaited<ReturnType<typeof getInvitations>> = [];

  try {
    invitations = await getInvitations({ limit: 50 });
  } catch {
    // Supabase may not be configured in this environment; render empty state
  }

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

          <SparkleLink
            href="/create"
            className="rounded-full bg-violet-500 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-violet-400"
          >
            Create Invitation
          </SparkleLink>
        </div>

        {/* Empty state */}
        {invitations.length === 0 && (
          <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] py-16 text-center">
            <p className="text-sm text-slate-400">
              No invitations yet.
            </p>

            <SparkleLink
              href="/create"
              className="rounded-full bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400"
            >
              Create your first invitation
            </SparkleLink>
          </div>
        )}

        {/* Invitation Cards */}
        {invitations.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {invitations.map((invitation) => {
              const aiTheme =
                isValidAIDesign(invitation.aiDesign)
                  ? mapAIDesignToVisualTheme(invitation.aiDesign)
                  : null;

              const cardBg =
                aiTheme?.backgroundColor ?? "#0f0a1a";

              const cardAccent =
                aiTheme?.primaryColor ?? "#8b5cf6";

              const cardMuted =
                aiTheme?.mutedTextColor ?? "#94a3b8";

              const viewHref =
                `/i/${invitation.slug}-${invitation.cardId}`;

              return (
                <article
                  key={invitation.id}
                  className="overflow-hidden rounded-2xl border transition hover:-translate-y-1"
                  style={{
                    borderColor: `${cardAccent}30`,
                    backgroundColor: `${cardBg}cc`,
                  }}
                >
                  {/* Preview thumbnail */}
                  <div
                    className="flex aspect-[4/3] items-center justify-center"
                    style={{
                      background: aiTheme
                        ? `linear-gradient(135deg, ${aiTheme.backgroundColor} 0%, ${aiTheme.primaryColor}18 100%)`
                        : "linear-gradient(135deg, #1a0f2e 0%, #0f0720 100%)",
                    }}
                  >
                    {/* Ambient glow */}
                    {aiTheme && (
                      <div
                        className="pointer-events-none absolute h-24 w-24 rounded-full blur-3xl opacity-30"
                        style={{ backgroundColor: aiTheme.primaryColor }}
                      />
                    )}

                    <div className="relative text-center px-6">
                      <p
                        className="text-[10px] font-semibold uppercase tracking-[0.25em]"
                        style={{ color: cardAccent }}
                      >
                        {invitation.category}
                      </p>

                      <h2
                        className="mt-3 text-xl font-semibold leading-snug"
                        style={{
                          color: aiTheme?.textColor ?? "#ffffff",
                        }}
                      >
                        {invitation.title}
                      </h2>

                      {invitation.eventDate && (
                        <p
                          className="mt-2 text-xs"
                          style={{ color: cardMuted }}
                        >
                          {invitation.eventDate}
                          {invitation.eventTime
                            ? ` · ${invitation.eventTime}`
                            : ""}
                        </p>
                      )}

                      {/* AI design badge */}
                      {invitation.aiDesign?.colorTheme && (
                        <span
                          className="mt-3 inline-block rounded-full border px-2.5 py-1 text-[9px] capitalize"
                          style={{
                            borderColor: `${cardAccent}30`,
                            backgroundColor: `${cardAccent}10`,
                            color: cardAccent,
                          }}
                        >
                          {invitation.aiDesign.colorTheme}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card footer */}
                  <div
                    className="border-t p-5"
                    style={{ borderColor: `${cardAccent}15` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {invitation.aiDesign?.style
                          ? `${invitation.aiDesign.style} · ${invitation.category}`
                          : invitation.category}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                          invitation.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {invitation.status.charAt(0).toUpperCase() +
                          invitation.status.slice(1)}
                      </span>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <Link
                        href={viewHref}
                        className="flex-1 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-center text-xs font-semibold text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        View
                      </Link>

                      <SparkleLink
                        href={`/create?template=${invitation.templateId}`}
                        className="flex-1 rounded-full px-4 py-2 text-center text-xs font-semibold text-white transition"
                        style={{
                          backgroundColor: cardAccent,
                        }}
                      >
                        New
                      </SparkleLink>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}
