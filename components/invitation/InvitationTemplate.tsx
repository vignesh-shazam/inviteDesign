import type { InvitationTemplate as InvitationTemplateType } from "@/types/template";

type InvitationTemplateProps = {
    template: InvitationTemplateType;
    title?: string;
    person1Name?: string;
    person2Name?: string;
    date?: string;
    venue?: string;
};

export default function InvitationTemplate({
    template,
    title = "You're Invited",
    person1Name = "Person 1",
    person2Name = "Person 2",
    date = "Saturday, 24 October 2026",
    venue = "Chennai, Tamil Nadu",
}: InvitationTemplateProps) {
    const hasPersonNames =
        person1Name.trim() &&
        person2Name.trim();

    const displayNames =
        hasPersonNames
            ? `${person1Name.trim()} & ${person2Name.trim()}`
            : "Person 1 & Person 2";

    return (
        <div
            className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border shadow-2xl"
            style={{
                backgroundColor:
                    template.theme
                        .backgroundColor,
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

                    {/* Event Category */}
                    <p
                        className="text-xs font-semibold uppercase tracking-[0.3em]"
                        style={{
                            color: template
                                .theme
                                .accentColor,
                        }}
                    >
                        {template.category}
                    </p>

                    {/* Event Title */}
                    <h2
                        className="mt-6 text-4xl font-semibold"
                        style={{
                            color: template
                                .theme
                                .textColor,
                            fontFamily:
                                template.typography
                                    .headingFont,
                        }}
                    >
                        {title}
                    </h2>

                    {/* Divider */}
                    <div
                        className="mx-auto my-8 h-px w-20"
                        style={{
                            backgroundColor:
                                template.theme
                                    .accentColor,
                        }}
                    />

                    {/* Person Names */}
                    {template.category ===
                        "Wedding" && (
                        <p
                            className="text-lg font-semibold"
                            style={{
                                color: template
                                    .theme
                                    .textColor,
                                fontFamily:
                                    template
                                        .typography
                                        .headingFont,
                            }}
                        >
                            {displayNames}
                        </p>
                    )}

                    {/* Date */}
                    <p
                        className={`text-sm uppercase tracking-wider ${
                            template.category ===
                            "Wedding"
                                ? "mt-6"
                                : ""
                        }`}
                        style={{
                            color: template
                                .theme
                                .secondaryColor,
                            fontFamily:
                                template.typography
                                    .bodyFont,
                        }}
                    >
                        {date}
                    </p>

                    {/* Venue */}
                    <p
                        className="mt-3 text-sm"
                        style={{
                            color: template
                                .theme
                                .secondaryColor,
                            fontFamily:
                                template.typography
                                    .bodyFont,
                        }}
                    >
                        {venue}
                    </p>

                    {/* View Invitation */}
                    <button
                        type="button"
                        className="mt-10 rounded-full border px-6 py-3 text-sm font-semibold transition hover:opacity-80"
                        style={{
                            borderColor: `${template.theme.accentColor}80`,
                            color: template.theme
                                .accentColor,
                        }}
                    >
                        View Invitation
                    </button>
                </div>
            </div>
        </div>
    );
}