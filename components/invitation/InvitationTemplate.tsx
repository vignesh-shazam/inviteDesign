import type { InvitationTemplate as InvitationTemplateType } from "@/types/template";

type InvitationTemplateProps = {
  template: InvitationTemplateType;
  title?: string;
  date?: string;
  venue?: string;
};

export default function InvitationTemplate({
  template,
  title = "You're Invited",
  date = "Saturday, 24 October 2026",
  venue = "Chennai, Tamil Nadu",
}: InvitationTemplateProps) {
  return (
    <div
      className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border shadow-2xl"
      style={{
        backgroundColor: template.theme.backgroundColor,
        borderColor: `${template.theme.primaryColor}66`,
      }}
    >
      <div
        className="relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden px-8 py-12 text-center"
        style={{
          background: `radial-gradient(circle at center, ${template.theme.primaryColor}33, transparent 55%)`,
        }}
      >
        <div className="relative">
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{
              color: template.theme.accentColor,
            }}
          >
            {template.category}
          </p>

          <h2
            className="mt-6 text-4xl font-semibold"
            style={{
              color: template.theme.textColor,
              fontFamily: template.typography.headingFont,
            }}
          >
            {title}
          </h2>

          <div
            className="mx-auto my-8 h-px w-20"
            style={{
              backgroundColor: template.theme.accentColor,
            }}
          />

          <p
            className="text-sm uppercase tracking-wider"
            style={{
              color: template.theme.secondaryColor,
              fontFamily: template.typography.bodyFont,
            }}
          >
            {date}
          </p>

          <p
            className="mt-3 text-sm"
            style={{
              color: template.theme.secondaryColor,
              fontFamily: template.typography.bodyFont,
            }}
          >
            {venue}
          </p>

          <button
            type="button"
            className="mt-10 rounded-full border px-6 py-3 text-sm font-semibold transition hover:opacity-80"
            style={{
              borderColor: `${template.theme.accentColor}80`,
              color: template.theme.accentColor,
            }}
          >
            View Invitation
          </button>
        </div>
      </div>
    </div>
  );
}