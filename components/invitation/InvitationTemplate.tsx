import type {
    InvitationTemplate as InvitationTemplateType,
} from "@/types/template";

type InvitationTemplateProps = {
    template: InvitationTemplateType;
    category?: string;
    title?: string;
    person1Name?: string;
    person2Name?: string;
    date?: string;
    venue?: string;
    venueAddress?: string;
    message?: string;
};

export default function InvitationTemplate({
    template,
    category,
    title = "You're Invited",
    person1Name = "",
    person2Name = "",
    date = "Saturday, 24 October 2026",
    venue = "Chennai, Tamil Nadu",
    venueAddress = "",
    message = "",
}: InvitationTemplateProps) {
    const displayCategory =
        category || template.category;

    const hasPersonNames =
        displayCategory === "Wedding" &&
        Boolean(person1Name.trim()) &&
        Boolean(person2Name.trim());

    const displayNames = hasPersonNames
        ? `${person1Name.trim()} & ${person2Name.trim()}`
        : "";

    return (
        <div
            className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border shadow-2xl"
            style={{
                backgroundColor:
                    template.theme.backgroundColor,
                borderColor:
                    `${template.theme.primaryColor}66`,
            }}
        >
            <div
                className="relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden px-8 py-12 text-center"
                style={{
                    background: `radial-gradient(circle at center, ${template.theme.primaryColor}33, transparent 55%)`,
                }}
            >
                <div className="relative w-full">

                    {/* Event Category */}
                    <p
                        className="text-xs font-semibold uppercase tracking-[0.3em]"
                        style={{
                            color:
                                template.theme.accentColor,
                        }}
                    >
                        {displayCategory}
                    </p>

                    {/* Event Title */}
                    <h2
                        className="mt-6 break-words text-4xl font-semibold"
                        style={{
                            color:
                                template.theme.textColor,
                            fontFamily:
                                template.typography.headingFont,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {title}
                    </h2>

                    {/* Decorative Divider */}
                    <div
                        className="mx-auto my-8 h-px w-20"
                        style={{
                            backgroundColor:
                                template.theme.accentColor,
                        }}
                    />

                    {/* Person Names - Wedding Only */}
                    {hasPersonNames && (
                        <p
                            className="break-words text-lg font-semibold"
                            style={{
                                color:
                                    template.theme.textColor,
                                fontFamily:
                                    template.typography.headingFont,
                                overflowWrap: "anywhere",
                            }}
                        >
                            {displayNames}
                        </p>
                    )}

                    {/* Date */}
                    <p
                        className={`break-words text-sm uppercase tracking-wider ${
                            hasPersonNames ? "mt-6" : ""
                        }`}
                        style={{
                            color:
                                template.theme.secondaryColor,
                            fontFamily:
                                template.typography.bodyFont,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {date}
                    </p>

                    {/* Venue */}
                    <p
                        className="mt-3 break-words px-2 text-sm leading-6"
                        style={{
                            color:
                                template.theme.secondaryColor,
                            fontFamily:
                                template.typography.bodyFont,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {venue}
                    </p>

                    {/* Venue Address */}
                    {venueAddress.trim() && (
                        <p
                            className="mt-2 break-words px-2 text-xs leading-5"
                            style={{
                                color:
                                    template.theme.secondaryColor,
                                fontFamily:
                                    template.typography.bodyFont,
                                opacity: 0.8,
                                overflowWrap: "anywhere",
                            }}
                        >
                            {venueAddress}
                        </p>
                    )}

                    {/* Invitation Message */}
                    {message.trim() && (
                        <p
                            className="mx-auto mt-6 max-w-sm break-words px-2 text-sm leading-6"
                            style={{
                                color:
                                    template.theme.textColor,
                                fontFamily:
                                    template.typography.bodyFont,
                                overflowWrap: "anywhere",
                            }}
                        >
                            {message}
                        </p>
                    )}

                    {/* View Invitation */}
                    <button
                        type="button"
                        className="mt-10 rounded-full border px-6 py-3 text-sm font-semibold transition hover:opacity-80"
                        style={{
                            borderColor:
                                `${template.theme.accentColor}80`,
                            color:
                                template.theme.accentColor,
                        }}
                    >
                        View Invitation
                    </button>
                </div>
            </div>
        </div>
    );
}