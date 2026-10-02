import { NextRequest, NextResponse } from "next/server";

import {
    getVeoVideoStatus,
    startVeoVideoGeneration,
} from "@/lib/ai/providers/veoProvider";

type VideoRequestBody = {
    eventType?: string;
    eventName?: string;
    hostNames?: string;
    eventDate?: string;
    eventTime?: string;
    venue?: string;
    content?: {
        title?: string;
        invitationMessage?: string;
        shortDescription?: string;
        rsvpMessage?: string;
        whatsappMessage?: string;
    };
    design?: {
        type?: string;
        style?: string;
        layout?: string;
        colorTheme?: string;
        typography?: string;
        decoration?: string;
    };
};

function buildVideoPrompt(
    body: VideoRequestBody,
): string {
    const eventType =
        body.eventType ||
        "special event";

    const eventName =
        body.eventName ||
        "Invitation";

    const hostNames =
        body.hostNames ||
        "";

    const eventDate =
        body.eventDate ||
        "";

    const eventTime =
        body.eventTime ||
        "";

    const venue =
        body.venue ||
        "";

    const design =
        body.design;

    const style =
        design?.style ||
        "elegant";

    const colorTheme =
        design?.colorTheme ||
        "dark-cinematic";

    const decoration =
        design?.decoration ||
        "cinematic";

    const title =
        body.content?.title ||
        eventName;

    const invitationMessage =
        body.content?.invitationMessage ||
        "";

    return `
Create a premium cinematic animated digital invitation video.

EVENT
Event type: ${eventType}
Event name: ${eventName}
Hosts: ${hostNames}
Date: ${eventDate}
Time: ${eventTime}
Venue: ${venue}

INVITATION
Title: ${title}
Message: ${invitationMessage}

VISUAL STYLE
Style: ${style}
Color theme: ${colorTheme}
Decoration: ${decoration}

VIDEO DIRECTION
Create a beautiful vertical 9:16 invitation video.

The video should feel like a premium cinematic wedding/event invitation,
not like a generic slideshow.

Use elegant cinematic motion:
- slow camera movement
- subtle depth
- realistic lighting
- beautiful particles
- gentle floating elements
- elegant transitions
- premium composition
- atmospheric background
- sophisticated visual effects
- smooth animation
- cinematic lighting
- high-end invitation aesthetic

For a wedding:
use romantic flowers, elegant golden particles,
soft light, beautiful ceremonial atmosphere,
luxury wedding decoration and graceful movement.

For a birthday:
use elegant celebratory lighting,
beautiful particles and refined decorations.

For a baby shower:
use soft pastel atmosphere,
delicate decorations and gentle floating elements.

For an engagement:
use romantic luxury styling,
subtle golden details and elegant ring-inspired elements.

For a housewarming:
use sophisticated home celebration visuals,
warm lighting and welcoming decoration.

For an anniversary:
use romantic cinematic styling,
soft lights and elegant decorative elements.

For a special event:
use sophisticated cinematic event styling.

IMPORTANT
Do not create a static image.

Create actual continuous animation throughout the video.

The camera and decorative elements should move naturally.
Use cinematic transitions between visual moments.

Avoid:
- cheap slideshow appearance
- UI elements
- website interfaces
- buttons
- play icons
- fake video-player frames
- watermarks
- logos
- distorted faces
- excessive text
- random unrelated objects

The final result should look like a professionally produced
premium digital invitation video suitable for sharing on WhatsApp.

If text is rendered, keep it minimal and elegant.
Do not invent names, dates, times, venues, or other event details.
`;
}

export async function POST(
    request: NextRequest,
) {
    try {
        const body =
            (await request.json()) as VideoRequestBody;

        if (
            !body.eventName?.trim() &&
            !body.content?.title?.trim()
        ) {
            return NextResponse.json(
                {
                    error:
                        "Event name or invitation title is required.",
                },
                {
                    status: 400,
                },
            );
        }

        const prompt =
            buildVideoPrompt(body);

        const operation =
            await startVeoVideoGeneration(
                prompt,
            );

        return NextResponse.json({
            success: true,
            operationName:
                operation.name,
        });
    } catch (error) {
        console.error(
            "AI video generation error:",
            error,
        );

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to start AI video generation.",
            },
            {
                status: 500,
            },
        );
    }
}

export async function GET(
    request: NextRequest,
) {
    try {
        const operationName =
            request.nextUrl.searchParams.get(
                "operation",
            );

        if (!operationName) {
            return NextResponse.json(
                {
                    error:
                        "Operation name is required.",
                },
                {
                    status: 400,
                },
            );
        }

        const result =
            await getVeoVideoStatus(
                operationName,
            );

        if (!result.done) {
            return NextResponse.json({
                status: "processing",
            });
        }

        if (result.error) {
            return NextResponse.json({
                status: "error",
                error: result.error,
            });
        }

        if (!result.videoUri) {
            return NextResponse.json({
                status: "error",
                error:
                    "Video was generated but no video URI was returned.",
            });
        }

        /*
         * Do not expose Google's video URI directly.
         * The browser should use our server-side
         * streaming endpoint so the Gemini API key
         * remains private.
         */
        const videoUrl =
            `/api/ai/video/stream?operation=${encodeURIComponent(
                operationName,
            )}`;

        return NextResponse.json({
            status: "completed",
            videoUrl,
        });
    } catch (error) {
        console.error(
            "AI video status error:",
            error,
        );

        return NextResponse.json(
            {
                status: "error",
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to check AI video status.",
            },
            {
                status: 500,
            },
        );
    }
}