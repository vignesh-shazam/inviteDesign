import type {
    InvitationAIDesign,
} from "./aiTypes";

export type AIInvitationVisualTheme = {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    accentColor: string;
    textColor: string;
    mutedTextColor: string;

    headingFont: string;
    bodyFont: string;

    layoutClass: string;
    decorationClass: string;
};

const colorThemes: Record<
    InvitationAIDesign["colorTheme"],
    {
        primaryColor: string;
        secondaryColor: string;
        backgroundColor: string;
        accentColor: string;
        textColor: string;
        mutedTextColor: string;
    }
> = {
    "muted-romance": {
        primaryColor: "#f9a8d4",
        secondaryColor: "#fbcfe8",
        backgroundColor: "#1c1018",
        accentColor: "#f472b6",
        textColor: "#fff1f2",
        mutedTextColor: "#f5c2d9",
    },

    "botanical-green": {
        primaryColor: "#6ee7b7",
        secondaryColor: "#a7f3d0",
        backgroundColor: "#07130f",
        accentColor: "#34d399",
        textColor: "#ecfdf5",
        mutedTextColor: "#a7f3d0",
    },

    "pastel-confetti": {
        primaryColor: "#f9a8d4",
        secondaryColor: "#c4b5fd",
        backgroundColor: "#181525",
        accentColor: "#f472b6",
        textColor: "#ffffff",
        mutedTextColor: "#fbcfe8",
    },

    "dark-cinematic": {
        primaryColor: "#c4b5fd",
        secondaryColor: "#a78bfa",
        backgroundColor: "#08070d",
        accentColor: "#8b5cf6",
        textColor: "#ffffff",
        mutedTextColor: "#c4b5fd",
    },

    "jewel-tone": {
        primaryColor: "#f0abfc",
        secondaryColor: "#c4b5fd",
        backgroundColor: "#120b1c",
        accentColor: "#d946ef",
        textColor: "#ffffff",
        mutedTextColor: "#f5d0fe",
    },

    "lavender-milk": {
        primaryColor: "#ddd6fe",
        secondaryColor: "#c4b5fd",
        backgroundColor: "#14111d",
        accentColor: "#a78bfa",
        textColor: "#faf5ff",
        mutedTextColor: "#ddd6fe",
    },

    "metallic-night": {
        primaryColor: "#fcd34d",
        secondaryColor: "#fde68a",
        backgroundColor: "#111113",
        accentColor: "#f59e0b",
        textColor: "#fafafa",
        mutedTextColor: "#d4d4d8",
    },

    "coastal-blue": {
        primaryColor: "#67e8f9",
        secondaryColor: "#bae6fd",
        backgroundColor: "#07141c",
        accentColor: "#22d3ee",
        textColor: "#f0f9ff",
        mutedTextColor: "#bae6fd",
    },
};

const typographyMap: Record<
    InvitationAIDesign["typography"],
    {
        headingFont: string;
        bodyFont: string;
    }
> = {
    classic: {
        headingFont: "font-serif",
        bodyFont: "font-serif",
    },

    modern: {
        headingFont: "font-sans",
        bodyFont: "font-sans",
    },

    minimal: {
        headingFont: "font-sans",
        bodyFont: "font-sans",
    },

    elegant: {
        headingFont: "font-serif",
        bodyFont: "font-serif",
    },

    bold: {
        headingFont: "font-sans",
        bodyFont: "font-sans",
    },
};

const layoutMap: Record<
    InvitationAIDesign["layout"],
    string
> = {
    centered:
        "items-center justify-center text-center",

    editorial:
        "items-start justify-center text-left",

    framed:
        "items-center justify-center text-center",

    diagonal:
        "items-start justify-center text-left",

    emblem:
        "items-center justify-center text-center",

    minimal:
        "items-center justify-center text-center",
};

const decorationMap: Record<
    InvitationAIDesign["decoration"],
    string
> = {
    floral:
        "floral",

    "gold-accents":
        "gold-accents",

    geometric:
        "geometric",

    minimal:
        "minimal",

    sparkles:
        "sparkles",

    traditional:
        "traditional",

    cinematic:
        "cinematic",
};

export function mapAIDesignToVisualTheme(
    design: InvitationAIDesign,
): AIInvitationVisualTheme {
    const colors =
        colorThemes[design.colorTheme];

    const typography =
        typographyMap[design.typography];

    return {
        ...colors,

        ...typography,

        layoutClass:
            layoutMap[design.layout],

        decorationClass:
            decorationMap[
                design.decoration
            ],
    };
}