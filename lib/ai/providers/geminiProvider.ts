import {
    GoogleGenAI,
    Type,
} from "@google/genai";

import type {
    InvitationAIRequest,
    InvitationAIGeneratedResult,
} from "../aiTypes";

const apiKey =
    process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error(
        "GEMINI_API_KEY is not configured.",
    );
}

const ai = new GoogleGenAI({
    apiKey,
});

function buildPrompt(
    request: InvitationAIRequest,
): string {
    return `
You are an expert digital invitation designer
and invitation copywriter for MyInviteVerse.

Create invitation content and a design specification
for the following event.

EVENT INFORMATION
-----------------

Event type:
${request.eventType}

Event name:
${request.eventName}

Host names:
${request.hostNames || "Not provided"}

Event date:
${request.eventDate || "Not provided"}

Event time:
${request.eventTime || "Not provided"}

Venue:
${request.venue || "Not provided"}

Writing tone:
${request.tone}

Requested design type:
${request.designType || "2d"}

Additional details:
${request.additionalDetails || "None"}


CONTENT VARIATIONS
------------------

Generate EXACTLY 3 different invitation content variations.

Variation 1:
Elegant and emotional.

Variation 2:
Modern and concise.

Variation 3:
Warm and traditional.

Each variation must contain:

- title
- invitationMessage
- shortDescription
- rsvpMessage
- whatsappMessage


DESIGN
------

Generate ONE design specification that can be used
by the MyInviteVerse rendering system.

Generate:

- design type
- visual style
- layout
- color theme
- typography
- decoration


SUPPORTED DESIGN TYPES

2d
3d
video


SUPPORTED VISUAL STYLES

elegant
modern
traditional
minimal
luxury
playful
cinematic


SUPPORTED LAYOUTS

centered
editorial
framed
diagonal
emblem
minimal


SUPPORTED COLOR THEMES

muted-romance
botanical-green
pastel-confetti
dark-cinematic
jewel-tone
lavender-milk
metallic-night
coastal-blue


SUPPORTED TYPOGRAPHY

classic
modern
minimal
elegant
bold


SUPPORTED DECORATIONS

floral
gold-accents
geometric
minimal
sparkles
traditional
cinematic


RULES
-----

- Generate exactly 3 content variations.
- Keep the event information accurate.
- Do not invent missing personal information.
- Do not invent dates, locations, names, or times.
- Keep each variation meaningfully different.
- Match the requested writing tone.
- Keep the invitation natural and ready to use.
- Select a design suitable for the event.
- Respect the requested design type.
- Do not mention AI.
- Do not explain your choices.
- Return only the requested JSON structure.
`;
}

export async function generateInvitationContent(
    request: InvitationAIRequest,
): Promise<InvitationAIGeneratedResult> {

    const prompt =
        buildPrompt(request);

    const response =
        await ai.models.generateContent({
            model:
                "gemini-3.5-flash-lite",

            contents: prompt,

            config: {
                responseMimeType:
                    "application/json",

                responseSchema: {
                    type: Type.OBJECT,

                    properties: {

                        variations: {
                            type: Type.ARRAY,

                            minItems: 3,
                            maxItems: 3,

                            items: {
                                type: Type.OBJECT,

                                properties: {

                                    title: {
                                        type: Type.STRING,
                                    },

                                    invitationMessage: {
                                        type: Type.STRING,
                                    },

                                    shortDescription: {
                                        type: Type.STRING,
                                    },

                                    rsvpMessage: {
                                        type: Type.STRING,
                                    },

                                    whatsappMessage: {
                                        type: Type.STRING,
                                    },
                                },

                                required: [
                                    "title",
                                    "invitationMessage",
                                    "shortDescription",
                                    "rsvpMessage",
                                    "whatsappMessage",
                                ],
                            },
                        },

                        design: {
                            type: Type.OBJECT,

                            properties: {

                                type: {
                                    type: Type.STRING,

                                    enum: [
                                        "2d",
                                        "3d",
                                        "video",
                                    ],
                                },

                                style: {
                                    type: Type.STRING,

                                    enum: [
                                        "elegant",
                                        "modern",
                                        "traditional",
                                        "minimal",
                                        "luxury",
                                        "playful",
                                        "cinematic",
                                    ],
                                },

                                layout: {
                                    type: Type.STRING,

                                    enum: [
                                        "centered",
                                        "editorial",
                                        "framed",
                                        "diagonal",
                                        "emblem",
                                        "minimal",
                                    ],
                                },

                                colorTheme: {
                                    type: Type.STRING,

                                    enum: [
                                        "muted-romance",
                                        "botanical-green",
                                        "pastel-confetti",
                                        "dark-cinematic",
                                        "jewel-tone",
                                        "lavender-milk",
                                        "metallic-night",
                                        "coastal-blue",
                                    ],
                                },

                                typography: {
                                    type: Type.STRING,

                                    enum: [
                                        "classic",
                                        "modern",
                                        "minimal",
                                        "elegant",
                                        "bold",
                                    ],
                                },

                                decoration: {
                                    type: Type.STRING,

                                    enum: [
                                        "floral",
                                        "gold-accents",
                                        "geometric",
                                        "minimal",
                                        "sparkles",
                                        "traditional",
                                        "cinematic",
                                    ],
                                },
                            },

                            required: [
                                "type",
                                "style",
                                "layout",
                                "colorTheme",
                                "typography",
                                "decoration",
                            ],
                        },
                    },

                    required: [
                        "variations",
                        "design",
                    ],
                },
            },
        });

    if (!response.text) {
        throw new Error(
            "Gemini returned an empty response.",
        );
    }

    try {
        const result =
            JSON.parse(
                response.text,
            ) as InvitationAIGeneratedResult;

        if (
            !result.variations ||
            result.variations.length !== 3
        ) {
            throw new Error(
                "Gemini did not return exactly 3 invitation variations.",
            );
        }

        if (!result.design) {
            throw new Error(
                "Gemini did not return a design specification.",
            );
        }

        return result;

    } catch (error) {

        if (
            error instanceof Error &&
            error.message.includes(
                "exactly 3 invitation",
            )
        ) {
            throw error;
        }

        if (
            error instanceof Error &&
            error.message.includes(
                "design specification",
            )
        ) {
            throw error;
        }

        throw new Error(
            "Gemini returned an invalid JSON response.",
        );
    }
}