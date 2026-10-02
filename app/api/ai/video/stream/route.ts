import { NextRequest } from "next/server";

import {
    getVeoVideoStatus,
} from "@/lib/ai/providers/veoProvider";

export const dynamic = "force-dynamic";

export async function GET(
    request: NextRequest,
) {
    try {
        const operationName =
            request.nextUrl.searchParams.get(
                "operation",
            );

        if (!operationName) {
            return new Response(
                "Operation name is required.",
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
            return new Response(
                "Video is still being generated.",
                {
                    status: 202,
                },
            );
        }

        if (result.error) {
            return new Response(
                result.error,
                {
                    status: 500,
                },
            );
        }

        if (!result.videoUri) {
            return new Response(
                "Video URI was not returned.",
                {
                    status: 404,
                },
            );
        }

        const apiKey =
            process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return new Response(
                "GEMINI_API_KEY is not configured.",
                {
                    status: 500,
                },
            );
        }

        const videoResponse =
            await fetch(
                result.videoUri,
                {
                    headers: {
                        "x-goog-api-key":
                            apiKey,
                    },
                    cache: "no-store",
                },
            );

        if (!videoResponse.ok) {
            const errorText =
                await videoResponse.text();

            console.error(
                "Failed to download Veo video:",
                errorText,
            );

            return new Response(
                "Failed to retrieve generated video.",
                {
                    status: 502,
                },
            );
        }

        const headers =
            new Headers();

        headers.set(
            "Content-Type",
            videoResponse.headers.get(
                "content-type",
            ) || "video/mp4",
        );

        const contentLength =
            videoResponse.headers.get(
                "content-length",
            );

        if (contentLength) {
            headers.set(
                "Content-Length",
                contentLength,
            );
        }

        headers.set(
            "Cache-Control",
            "private, max-age=3600",
        );

        return new Response(
            videoResponse.body,
            {
                status: 200,
                headers,
            },
        );
    } catch (error) {
        console.error(
            "AI video streaming error:",
            error,
        );

        return new Response(
            error instanceof Error
                ? error.message
                : "Failed to stream video.",
            {
                status: 500,
            },
        );
    }
}