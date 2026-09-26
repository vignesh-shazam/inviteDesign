import { notFound } from "next/navigation";

import InvitationTemplate from "@/components/invitation/InvitationTemplate";
import InvitationScene from "@/components/invitation/3d/InvitationScene";
import WhatsAppShareButton from "@/components/invitation/WhatsAppShareButton";
import { getInvitationByCardId } from "@/lib/db/invitationRepository";
import { getTemplateById } from "@/lib/templates";

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

  if (!cardId) {
    notFound();
  }

  const invitation = await getInvitationByCardId(cardId);

  if (!invitation) {
    notFound();
  }

  const template = getTemplateById(invitation.templateId);

  if (!template) {
    notFound();
  }

  const invitationDate = invitation.eventDate
    ? `${invitation.eventDate}${
        invitation.eventTime
          ? ` \u2022 ${invitation.eventTime}`
          : ""
      }`
    : "Date to be announced";

  const invitationVenue =
    invitation.venue || "Venue to be announced";

  return (
    <main
      className="min-h-screen px-6 py-12"
      style={{
        backgroundColor: template.theme.backgroundColor,
      }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Invitation Header */}
        <section className="mb-10 text-center">
          <p
            className="text-sm font-semibold uppercase tracking-[0.25em]"
            style={{
              color: template.theme.accentColor,
            }}
          >
            You're Invited
          </p>

          <h1
            className="mt-4 text-3xl font-bold sm:text-5xl"
            style={{
              color: template.theme.textColor,
            }}
          >
            {invitation.title}
          </h1>

          <p
            className="mx-auto mt-4 max-w-2xl text-sm leading-6 sm:text-base"
            style={{
              color: template.theme.secondaryColor,
            }}
          >
            {invitation.category}
          </p>
        </section>

        {/* 3D Invitation */}
        <section>
          <InvitationScene
            template={template}
            title={invitation.title}
            date={invitationDate}
            venue={invitationVenue}
          />
        </section>

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
              borderColor: `${template.theme.primaryColor}55`,
              backgroundColor: `${template.theme.primaryColor}12`,
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                color: template.theme.accentColor,
              }}
            >
              Date
            </p>

            <p
              className="mt-3 text-base font-semibold"
              style={{
                color: template.theme.textColor,
              }}
            >
              {invitation.eventDate || "To be announced"}
            </p>
          </div>

          <div
            className="rounded-2xl border p-6 text-center"
            style={{
              borderColor: `${template.theme.primaryColor}55`,
              backgroundColor: `${template.theme.primaryColor}12`,
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                color: template.theme.accentColor,
              }}
            >
              Time
            </p>

            <p
              className="mt-3 text-base font-semibold"
              style={{
                color: template.theme.textColor,
              }}
            >
              {invitation.eventTime || "To be announced"}
            </p>
          </div>

          <div
            className="rounded-2xl border p-6 text-center"
            style={{
              borderColor: `${template.theme.primaryColor}55`,
              backgroundColor: `${template.theme.primaryColor}12`,
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                color: template.theme.accentColor,
              }}
            >
              Venue
            </p>

            <p
              className="mt-3 text-base font-semibold"
              style={{
                color: template.theme.textColor,
              }}
            >
              {invitation.venue || "To be announced"}
            </p>
          </div>
        </section>

        {/* Invitation Message */}
        {invitation.message && (
          <section className="mx-auto mt-10 max-w-3xl">
            <div
              className="rounded-3xl border p-8 text-center"
              style={{
                borderColor: `${template.theme.primaryColor}55`,
                backgroundColor: `${template.theme.primaryColor}12`,
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{
                  color: template.theme.accentColor,
                }}
              >
                Message
              </p>

              <p
                className="mt-4 text-base leading-7"
                style={{
                  color: template.theme.textColor,
                }}
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
              style={{
                color: template.theme.accentColor,
              }}
            >
              Invitation
            </p>

            <h2
              className="mt-2 text-2xl font-semibold"
              style={{
                color: template.theme.textColor,
              }}
            >
              Event Details
            </h2>
          </div>

          <InvitationTemplate
            template={template}
            title={invitation.title}
            date={invitationDate}
            venue={invitationVenue}
          />
        </section>

        {/* Card ID */}
        <footer className="mt-12 pb-6 text-center">
          <p
            className="text-xs"
            style={{
              color: template.theme.secondaryColor,
            }}
          >
            Invitation ID: {invitation.cardId}
          </p>
        </footer>
      </div>
    </main>
  );
}