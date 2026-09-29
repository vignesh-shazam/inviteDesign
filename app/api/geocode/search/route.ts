import { NextRequest, NextResponse } from "next/server";

const NOMINATIM_URL =
    "https://nominatim.openstreetmap.org/search";

export async function GET(
    request: NextRequest,
) {
    const query =
        request.nextUrl.searchParams.get("q");

    if (!query?.trim()) {
        return NextResponse.json(
            {
                error:
                    "Search query is required.",
            },
            {
                status: 400,
            },
        );
    }

    try {
        const url =
            new URL(NOMINATIM_URL);

        url.searchParams.set(
            "q",
            query.trim(),
        );

        url.searchParams.set(
            "format",
            "jsonv2",
        );

        url.searchParams.set(
            "limit",
            "5",
        );

        url.searchParams.set(
            "addressdetails",
            "1",
        );

        const response =
            await fetch(
                url.toString(),
                {
                    headers: {
                        "User-Agent":
                            "MyInviteVerse/1.0 (+https://my-invite-verse.vercel.app)",
                        Referer:
                            "https://my-invite-verse.vercel.app/",
                    },
                    cache: "no-store",
                },
            );

        if (!response.ok) {
            return NextResponse.json(
                {
                    error:
                        "Location search service is temporarily unavailable.",
                },
                {
                    status: 502,
                },
            );
        }

        const results =
            await response.json();

        return NextResponse.json({
            results: results.map(
                (result: {
                    display_name: string;
                    lat: string;
                    lon: string;
                }) => ({
                    displayName:
                        result.display_name,

                    latitude:
                        result.lat,

                    longitude:
                        result.lon,
                }),
            ),
        });
    } catch {
        return NextResponse.json(
            {
                error:
                    "Unable to search location.",
            },
            {
                status: 500,
            },
        );
    }
}