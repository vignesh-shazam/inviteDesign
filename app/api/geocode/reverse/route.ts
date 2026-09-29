import { NextRequest, NextResponse } from "next/server";

const NOMINATIM_URL =
    "https://nominatim.openstreetmap.org/reverse";

export async function GET(
    request: NextRequest,
) {
    const latitude =
        request.nextUrl.searchParams.get(
            "lat",
        );

    const longitude =
        request.nextUrl.searchParams.get(
            "lon",
        );

    if (!latitude || !longitude) {
        return NextResponse.json(
            {
                error:
                    "Location coordinates are required.",
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
            "lat",
            latitude,
        );

        url.searchParams.set(
            "lon",
            longitude,
        );

        url.searchParams.set(
            "format",
            "jsonv2",
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
                        "Location service is temporarily unavailable.",
                },
                {
                    status: 502,
                },
            );
        }

        const result =
            await response.json();

        const address =
            result.display_name ||
            "Selected location";

        const name =
            result.name ||
            result.address?.amenity ||
            result.address?.building ||
            result.address?.shop ||
            result.address?.hotel ||
            result.address?.town ||
            result.address?.city ||
            result.address?.village ||
            "Selected location";

        return NextResponse.json({
            name,
            address,
        });
    } catch {
        return NextResponse.json(
            {
                error:
                    "Unable to identify this location.",
            },
            {
                status: 500,
            },
        );
    }
}