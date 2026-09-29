"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import "leaflet/dist/leaflet.css";

type LocationResult = {
    name: string;
    address: string;
    mapsUrl: string;
};

type GoogleMapsLocationPickerProps = {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (
        location: LocationResult,
    ) => void;
};

export default function GoogleMapsLocationPicker({
    isOpen,
    onClose,
    onSelect,
}: GoogleMapsLocationPickerProps) {
    const mapContainerRef =
        useRef<HTMLDivElement | null>(null);

    const mapRef =
        useRef<import("leaflet").Map | null>(null);

    const markerRef =
        useRef<import("leaflet").Marker | null>(
            null,
        );

    const [search, setSearch] =
        useState("");

    const [selectedLocation, setSelectedLocation] =
        useState<LocationResult | null>(
            null,
        );

    const [isSearching, setIsSearching] =
        useState(false);

    const [isSelecting, setIsSelecting] =
        useState(false);

    const [error, setError] =
        useState("");

    /*
     * Initialize Leaflet only in browser
     */
    useEffect(() => {
        if (
            !isOpen ||
            !mapContainerRef.current ||
            mapRef.current
        ) {
            return;
        }

        let isMounted = true;

        async function initializeMap() {
            const L =
                await import("leaflet");

            if (
                !isMounted ||
                !mapContainerRef.current ||
                mapRef.current
            ) {
                return;
            }

            const map =
                L.map(
                    mapContainerRef.current,
                ).setView(
                    [20.5937, 78.9629],
                    5,
                );

            L.tileLayer(
                "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    maxZoom: 19,

                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
                },
            ).addTo(map);

            /*
             * Click directly on map
             */
            map.on(
                "click",
                async (event) => {
                    await selectCoordinates(
                        event.latlng.lat,
                        event.latlng.lng,
                        undefined,
                        L,
                    );
                },
            );

            mapRef.current = map;

            setTimeout(() => {
                map.invalidateSize();
            }, 150);
        }

        void initializeMap();

        return () => {
            isMounted = false;

            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }

            markerRef.current = null;
        };
    }, [isOpen]);

    /*
     * Search location
     */
    async function searchLocation() {
        const query =
            search.trim();

        if (!query) {
            setError(
                "Please enter a location.",
            );

            return;
        }

        setIsSearching(true);
        setError("");

        try {
            const response =
                await fetch(
                    `/api/geocode/search?q=${encodeURIComponent(
                        query,
                    )}`,
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ??
                    "Unable to search location.",
                );
            }

            if (
                !data.results ||
                data.results.length === 0
            ) {
                setError(
                    "Location not found. Try another search.",
                );

                return;
            }

            const result =
                data.results[0];

            const L =
                await import("leaflet");

            await selectCoordinates(
                Number(
                    result.latitude,
                ),
                Number(
                    result.longitude,
                ),
                result.displayName,
                L,
            );
        } catch (searchError) {
            setError(
                searchError instanceof Error
                    ? searchError.message
                    : "Unable to search location.",
            );
        } finally {
            setIsSearching(false);
        }
    }

    /*
     * Select coordinates
     * and retrieve address
     */
    async function selectCoordinates(
        latitude: number,
        longitude: number,
        selectedName?: string,
        L?: typeof import("leaflet"),
    ) {
        setIsSelecting(true);
        setError("");

        try {
            const response =
                await fetch(
                    `/api/geocode/reverse?lat=${latitude}&lon=${longitude}`,
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ??
                    "Unable to identify this location.",
                );
            }

            const address =
                data.address ||
                selectedName ||
                "Selected location";

            const name =
                data.name ||
                selectedName ||
                "Selected location";

            /*
             * Google Maps URL
             *
             * We don't store latitude/
             * longitude separately.
             */
            const mapsUrl =
                `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

            const location: LocationResult =
            {
                name,
                address,
                mapsUrl,
            };

            setSelectedLocation(
                location,
            );

            /*
             * Update map marker
             */
            if (
                mapRef.current
            ) {
                mapRef.current.setView(
                    [
                        latitude,
                        longitude,
                    ],
                    Math.max(
                        mapRef.current.getZoom(),
                        15,
                    ),
                );

                if (markerRef.current) {
                    markerRef.current.setLatLng([
                        latitude,
                        longitude,
                    ]);
                } else if (L) {
                    const locationIcon = L.divIcon({
                        className: "myinviteverse-location-marker",
                        html: `
            <div
                style="
                    width: 34px;
                    height: 34px;
                    border-radius: 50% 50% 50% 0;
                    background: #7c3aed;
                    border: 3px solid white;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.35);
                    transform: rotate(-45deg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                "
            >
                <div
                    style="
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background: white;
                    "
                ></div>
            </div>
        `,
                        iconSize: [34, 34],
                        iconAnchor: [17, 34],
                    });

                    markerRef.current =
                        L.marker(
                            [latitude, longitude],
                            {
                                icon: locationIcon,
                            },
                        ).addTo(
                            mapRef.current,
                        );
                }
            }
        } catch (selectionError) {
            setError(
                selectionError instanceof Error
                    ? selectionError.message
                    : "Unable to select this location.",
            );
        } finally {
            setIsSelecting(false);
        }
    }

    /*
     * Confirm location
     */
    function handleSelect() {
        if (
            !selectedLocation
        ) {
            setError(
                "Please select a location first.",
            );

            return;
        }

        onSelect(
            selectedLocation,
        );

        onClose();
    }

    /*
     * Close picker
     */
    function handleClose() {
        setSearch("");
        setError("");
        setSelectedLocation(
            null,
        );

        onClose();
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">

            <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-5 py-4">

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Select Event Location
                        </h2>

                        <p className="text-sm text-slate-500">
                            Search for a place or click directly on the map.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={
                            handleClose
                        }
                        className="rounded-full px-3 py-2 text-2xl leading-none text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        aria-label="Close location picker"
                    >
                        ×
                    </button>

                </div>

                {/* Search */}
                <div className="border-b bg-slate-50 p-4">

                    <div className="flex gap-2">

                        <input
                            type="text"
                            value={
                                search
                            }
                            onChange={(
                                event,
                            ) => {
                                setSearch(
                                    event
                                        .target
                                        .value,
                                );

                                setError(
                                    "",
                                );
                            }}
                            onKeyDown={(
                                event,
                            ) => {
                                if (
                                    event.key ===
                                    "Enter"
                                ) {
                                    event.preventDefault();

                                    void searchLocation();
                                }
                            }}
                            placeholder="Search venue, temple, hotel, city..."
                            className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                void searchLocation()
                            }
                            disabled={
                                isSearching
                            }
                            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSearching
                                ? "Searching..."
                                : "Search"}
                        </button>

                    </div>

                    {error && (
                        <p className="mt-2 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                </div>

                {/* Map */}
                <div className="relative min-h-0 flex-1">

                    <div
                        ref={
                            mapContainerRef
                        }
                        className="h-[50vh] min-h-[350px] w-full"
                    />

                    {isSelecting && (
                        <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-lg">
                            Finding location...
                        </div>
                    )}

                </div>

                {/* Selected Location */}
                <div className="border-t bg-white p-4">

                    {selectedLocation ? (
                        <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4">

                            <p className="text-sm font-semibold text-slate-900">
                                {
                                    selectedLocation.name
                                }
                            </p>

                            <p className="mt-1 break-words text-sm leading-5 text-slate-600">
                                {
                                    selectedLocation.address
                                }
                            </p>

                            <p className="mt-2 text-xs text-emerald-600">
                                Location selected
                            </p>

                        </div>
                    ) : (
                        <p className="mb-4 text-sm text-slate-500">
                            No location selected yet.
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={
                                handleClose
                            }
                            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={
                                handleSelect
                            }
                            disabled={
                                !selectedLocation
                            }
                            className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Select Location
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}