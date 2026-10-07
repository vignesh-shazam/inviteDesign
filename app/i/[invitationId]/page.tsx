import { notFound } from "next/navigation";

import CalendarButtons from "@/components/invitation/CalendarButtons";
import EventCountdown from "@/components/invitation/EventCountdown";
import InvitationOpening from "@/components/invitation/InvitationOpening";
import InvitationTemplate from "@/components/invitation/InvitationTemplate";
import InvitationScene from "@/components/invitation/3d/InvitationScene";
import RSVPForm from "@/components/invitation/RSVPForm";
import WhatsAppShareButton from "@/components/invitation/WhatsAppShareButton";
import { getInvitationByCardId } from "@/lib/db/invitationRepository";
import { getTemplateById } from "@/lib/templates";
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

type PublicInvitationPageProps = {
  params: Promise<{
    invitationId: string;
  }>;
};

function extractCardId(invitationId: string): string | null {
  const match = invitationId.match(/(cardid\d{6})$/);
  return match?.[1] ?? null;
}

export default async function PublicInvitationPage({
  params,
}: PublicInvitationPageProps) {
  const { invitationId } = await params;

  const cardId = extractCardId(invitationId);
  if (!cardId) notFound();

  const invitation = await getInvitationByCardId(cardId);
  if (!invitation) notFound();

  const template = getTemplateById(invitation.templateId);
  if (!template) notFound();

  // Resolve the visual theme: prefer AI design, fall back to template theme
  const aiTheme = isValidAIDesign(invitation.aiDesign)
    ? mapAIDesignToVisualTheme(invitation.aiDesign)
    : null;

  const resolvedTheme = {
    primaryColor: aiTheme?.primaryColor ?? template.theme.primaryColor,
    secondaryColor: aiTheme?.secondaryColor ?? template.theme.secondaryColor,
    backgroundColor: aiTheme?.backgroundColor ?? template.theme.backgroundColor,
    accentColor: aiTheme?.accentColor ?? template.theme.accentColor,
    textColor: aiTheme?.textColor ?? template.theme.textColor,
  };

  const invitationDate = invitation.eventDate
    ? `${invitation.eventDate}${
        invitation.eventTime ? ` • ${invitation.eventTime}` : ""
      }`
    : "Date to be announced";

  const invitationVenue = invitation.venue || "Venue to be announced";
  const invitationAddress = invitation.venueAddress || "Address to be announced";

  return (
    <InvitationOpening
      title={invitation.title}
      category={invitation.category}
      primaryColor={resolvedTheme.primaryColor}
      secondaryColor={resolvedTheme.secondaryColor}
      backgroundColor={resolvedTheme.backgroundColor}
      textColor={resolvedTheme.textColor}
    >
      <main
        className="min-h-screen px-6 py-12"
        style={{ backgroundColor: resolvedTheme.backgroundColor }}
      >
        <div className="mx-auto max-w-6xl">

          {/* Invitation Header */}
          <section className="mb-10 text-center">
            <p
              className="text-sm font-semibold uppercase tracking-[0.25em]"
              style={{ color: resolvedTheme.accentColor }}
            >
              You're Invited
            </p>

            <h1
              className="mt-4 text-3xl font-bold sm:text-5xl"
              style={{ color: resolvedTheme.textColor }}
            >
              {invitation.title}
            </h1>

            <p
              className="mx-auto mt-4 max-w-2xl text-sm leading-6 sm:text-base"
              style={{ color: resolvedTheme.secondaryColor }}
            >
              {invitation.category}
            </p>

            {/* AI design badges */}
            {invitation.aiDesign?.colorTheme && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <span
                  className="rounded-full border px-3 py-1 text-[10px] capitalize"
                  style={{
                    borderColor: `${resolvedTheme.primaryColor}30`,
                    backgroundColor: `${resolvedTheme.primaryColor}10`,
                    color: resolvedTheme.primaryColor,
                  }}
                >
                  {invitation.aiDesign.style}
                </span>

                <span
                  className="rounded-full border px-3 py-1 text-[10px] capitalize"
                  style={{
                    borderColor: `${resolvedTheme.accentColor}30`,
                    backgroundColor: `${resolvedTheme.accentColor}10`,
                    color: resolvedTheme.accentColor,
                  }}
                >
                  {invitation.aiDesign.colorTheme}
                </span>
              </div>
            )}
          </section>

          {/* 3D Invitation */}
          <section>
            <InvitationScene
              template={template}
              category={invitation.category}
              title={invitation.title}
              person1Name={invitation.person1Name}
              person2Name={invitation.person2Name}
              date={invitationDate}
              venue={invitationVenue}
            />
          </section>

          {/* Event Countdown */}
          <EventCountdown
            eventDate={invitation.eventDate}
            eventTime={invitation.eventTime}
            primaryColor={resolvedTheme.primaryColor}
            textColor={resolvedTheme.textColor}
          />

          {/* WhatsApp Sharing */}
          <section className="mt-8 flex justify-center">
            <WhatsAppShareButton
              title={invitation.title}
              category={invitation.category}
              date={invitationDate}
              venue={invitationVenue}
            />
          </section>

          {/* Event Details */}
          <section className="mt-10 grid gap-6 sm:grid-cols-3">
            <div
              className="rounded-2xl border p-6 text-center"
              style={{
                borderColor: `${resolvedTheme.primaryColor}55`,
                backgroundColor: `${resolvedTheme.primaryColor}12`,
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: resolvedTheme.accentColor }}
              >
                Date
              </p>

              <p
                className="mt-3 text-base font-semibold"
                style={{ color: resolvedTheme.textColor }}
              >
                {invitation.eventDate || "To be announced"}
              </p>
            </div>

            <div
              className="rounded-2xl border p-6 text-center"
              style={{
                borderColor: `${resolvedTheme.primaryColor}55`,
                backgroundColor: `${resolvedTheme.primaryColor}12`,
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: resolvedTheme.accentColor }}
              >
                Time
              </p>

              <p
                className="mt-3 text-base font-semibold"
                style={{ color: resolvedTheme.textColor }}
              >
                {invitation.eventTime || "To be announced"}
              </p>
            </div>

            <div
              className="rounded-2xl border p-6 text-center"
              style={{
                borderColor: `${resolvedTheme.primaryColor}55`,
                backgroundColor: `${resolvedTheme.primaryColor}12`,
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: resolvedTheme.accentColor }}
              >
                Venue
              </p>

              <p
                className="mt-3 break-words text-base font-semibold leading-7"
                style={{
                  color: resolvedTheme.textColor,
                  overflowWrap: "anywhere",
                }}
              >
                {invitation.venue || "To be announced"}
              </p>
            </div>
          </section>

          {/* Event Location */}
          <section className="mx-auto mt-6 max-w-4xl">
            <div
              className="rounded-2xl border p-6 text-center"
              style={{
                borderColor: `${resolvedTheme.primaryColor}55`,
                backgroundColor: `${resolvedTheme.primaryColor}12`,
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: resolvedTheme.accentColor }}
              >
                Event Location
              </p>

              <p
                className="mt-4 break-words text-base font-semibold leading-7"
                style={{
                  color: resolvedTheme.textColor,
                  overflowWrap: "anywhere",
                }}
              >
                {invitationAddress}
              </p>

              {invitation.mapsUrl && (
                <a
                  href={invitation.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-90"
                  style={{
                    backgroundColor: resolvedTheme.primaryColor,
                    color: resolvedTheme.textColor,
                  }}
                >
                  Open in Google Maps
                </a>
              )}
            </div>
          </section>

          {/* Calendar */}
          <CalendarButtons
            title={invitation.title}
            date={invitation.eventDate}
            time={invitation.eventTime}
            venue={invitation.venue}
            address={invitation.venueAddress}
            description={invitation.message}
            primaryColor={resolvedTheme.primaryColor}
            textColor={resolvedTheme.textColor}
          />

          {/* RSVP */}
          <RSVPForm
            invitationId={invitation.id}
            primaryColor={resolvedTheme.primaryColor}
            textColor={resolvedTheme.textColor}
          />

          {/* Invitation Message */}
          {invitation.message && (
            <section className="mx-auto mt-10 max-w-3xl">
              <div
                className="rounded-3xl border p-8 text-center"
                style={{
                  borderColor: `${resolvedTheme.primaryColor}55`,
                  backgroundColor: `${resolvedTheme.primaryColor}12`,
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: resolvedTheme.accentColor }}
                >
                  Message
                </p>

                <p
                  className="mt-4 text-base leading-7"
                  style={{ color: resolvedTheme.textColor }}
                >
                  {invitation.message}
                </p>
              </div>
            </section>
          )}

          {/* 2D Invitation Preview */}
          <section className="mt-12">
            <div className="mb-5 text-center">
              <p
                className="text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: resolvedTheme.accentColor }}
              >
                Invitation
              </p>

              <h2
                className="mt-2 text-2xl font-semibold"
                style={{ color: resolvedTheme.textColor }}
              >
                Event Details
              </h2>
            </div>

            {/* AI visual wrapper */}
            <div
              className="relative overflow-hidden rounded-2xl p-3"
              style={{
                backgroundColor: resolvedTheme.backgroundColor,
                boxShadow: `0 0 70px ${resolvedTheme.primaryColor}20`,
                border: `1px solid ${resolvedTheme.primaryColor}20`,
              }}
            >
              {aiTheme && (
                <>
                  <div
                    className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full blur-3xl"
                    style={{
                      backgroundColor: aiTheme.primaryColor,
                      opacity: 0.18,
                    }}
                  />

                  <div
                    className="pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full blur-3xl"
                    style={{
                      backgroundColor: aiTheme.accentColor,
                      opacity: 0.15,
                    }}
                  />
                </>
              )}

              <div className="relative">
                <InvitationTemplate
                  template={template}
                  category={invitation.category}
                  title={invitation.title}
                  person1Name={invitation.person1Name}
                  person2Name={invitation.person2Name}
                  date={invitationDate}
                  venue={invitationVenue}
                  venueAddress={invitationAddress}
                  message={invitation.message}
                />
              </div>
            </div>
          </section>

          {/* Card ID */}
          <footer className="mt-12 pb-6 text-center">
            <p
              className="text-xs"
              style={{ color: resolvedTheme.secondaryColor }}
            >
              Invitation ID: {invitation.cardId}
            </p>
          </footer>

        </div>
      </main>
    </InvitationOpening>
  );
}
