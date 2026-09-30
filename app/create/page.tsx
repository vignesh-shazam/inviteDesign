"use client";

import {
    FormEvent,
    Suspense,
    useState,
} from "react";

import Link from "next/link";

import { useSearchParams } from "next/navigation";

import { getTemplateById } from "@/lib/templates";

import type {
    InvitationTemplate as InvitationTemplateType,
} from "@/types/template";

import GoogleMapsLocationPicker from "@/components/invitation/GoogleMapsLocationPicker";

import ThemeCustomizer from "@/components/invitation/ThemeCustomizer";

import InvitationTemplate from "@/components/invitation/InvitationTemplate";

import HomeButton from "@/components/ui/HomeButton";

import SparkleButton from "@/components/ui/SparkleButton";

const eventTitlePlaceholders: Record<string, string> = {
    Wedding: "Arun & Priya Wedding",

    Birthday: "Rahul's Birthday Celebration",

    Engagement: "Arun & Priya Engagement",

    Anniversary: "25th Wedding Anniversary",

    "Baby Shower": "Baby Shower Celebration",

    Housewarming: "Housewarming Ceremony",

    Other: "Special Event Celebration",
};

function CreateInvitationPageContent() {
    const searchParams = useSearchParams();

    const templateId =
        searchParams.get("template") ??
        "elegant-wedding";

    const defaultTemplate =
        getTemplateById(templateId);

    const [selectedTemplate, setSelectedTemplate] =
        useState<InvitationTemplateType>(
            defaultTemplate ??
            getTemplateById(
                "elegant-wedding",
            )!,
        );

    const [eventType, setEventType] =
        useState(
            selectedTemplate.category,
        );

    const [title, setTitle] =
        useState("");

    const [person1Name, setPerson1Name] =
        useState("");

    const [person2Name, setPerson2Name] =
        useState("");

    const [date, setDate] =
        useState("");

    const [time, setTime] =
        useState("");

    const [venue, setVenue] =
        useState("");

    const [venueAddress, setVenueAddress] =
        useState("");

    const [mapsUrl, setMapsUrl] =
        useState("");

    const [isLocationPickerOpen, setIsLocationPickerOpen] =
        useState(false);

    const [selectedLocationName, setSelectedLocationName] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [isSaving, setIsSaving] =
        useState(false);

    const [saveMessage, setSaveMessage] =
        useState("");

    const [savedSlug, setSavedSlug] =
        useState("");

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setSaveMessage("");
        setSavedSlug("");

        if (!title.trim()) {
            setSaveMessage(
                "Please enter an event title.",
            );

            return;
        }

        if (
            eventType === "Wedding" &&
            !person1Name.trim()
        ) {
            setSaveMessage(
                "Please enter Person 1 name.",
            );

            return;
        }

        if (
            eventType === "Wedding" &&
            !person2Name.trim()
        ) {
            setSaveMessage(
                "Please enter Person 2 name.",
            );

            return;
        }

        setIsSaving(true);

        try {
            const response =
                await fetch(
                    "/api/invitations",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            title:
                                title.trim(),

                            person1Name:
                                eventType ===
                                    "Wedding"
                                    ? person1Name.trim()
                                    : undefined,

                            person2Name:
                                eventType ===
                                    "Wedding"
                                    ? person2Name.trim()
                                    : undefined,

                            templateId:
                                selectedTemplate.id,

                            category:
                                eventType,

                            eventDate:
                                date,

                            eventTime:
                                time,

                            venue:
                                venue.trim(),

                            venueAddress:
                                venueAddress.trim(),

                            mapsUrl:
                                mapsUrl.trim(),

                            theme:
                                selectedTemplate.theme,

                            typography:
                                selectedTemplate.typography,

                            message:
                                message.trim(),
                        }),
                    },
                );

            const data =
                await response.json();

            if (!response.ok) {
                setSaveMessage(
                    data.error ??
                    "Failed to save invitation.",
                );

                return;
            }

            setSavedSlug(
                data.invitation.draftId,
            );

            setSaveMessage(
                "Invitation draft validated successfully.",
            );
        } catch {
            setSaveMessage(
                "Something went wrong while saving the invitation.",
            );
        } finally {
            setIsSaving(false);
        }
    }

    function handleEventTypeChange(
        nextEventType: string,
    ) {
        setEventType(
            nextEventType,
        );

        if (
            nextEventType !==
            "Wedding"
        ) {
            setPerson1Name("");
            setPerson2Name("");
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 px-6 py-16">
            <div className="mx-auto max-w-7xl">

                {/* Page Header */}
                <div className="mb-10">

                    {/* Home Navigation */}
                    <HomeButton />

                    <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
                        Invitation Creator
                    </p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Create Invitation
                    </h1>

                    <p className="mt-3 text-slate-400">
                        Add your event details and
                        customize your invitation.
                    </p>
                </div>

                {/* Selected Design */}
                <div className="mb-8 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                        Selected Design
                    </p>

                    <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                        <h2 className="text-lg font-semibold text-white">
                            {selectedTemplate.title}
                        </h2>

                        <span className="text-sm text-slate-400">
                            {selectedTemplate.category}
                        </span>

                    </div>
                </div>

                {/* Main Content */}
                <div className="grid gap-8 lg:grid-cols-[1fr_420px]">

                    {/* Left Side */}
                    <div className="space-y-8">

                        {/* Invitation Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8"
                        >
                            <div className="space-y-6">

                                {/* Event Type */}
                                <div>
                                    <label
                                        htmlFor="eventType"
                                        className="mb-2 block text-sm font-medium text-slate-200"
                                    >
                                        Event Type
                                    </label>

                                    <select
                                        id="eventType"
                                        value={eventType}
                                        onChange={(event) =>
                                            handleEventTypeChange(
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
                                    >
                                        <option>
                                            Wedding
                                        </option>

                                        <option>
                                            Birthday
                                        </option>

                                        <option>
                                            Engagement
                                        </option>

                                        <option>
                                            Anniversary
                                        </option>

                                        <option>
                                            Baby Shower
                                        </option>

                                        <option>
                                            Housewarming
                                        </option>

                                        <option>
                                            Other
                                        </option>
                                    </select>
                                </div>

                                {/* Event Title */}
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="mb-2 block text-sm font-medium text-slate-200"
                                    >
                                        Event Title
                                    </label>

                                    <input
                                        id="title"
                                        type="text"
                                        value={title}
                                        onChange={(event) =>
                                            setTitle(
                                                event.target.value,
                                            )
                                        }
                                        placeholder={
                                            eventTitlePlaceholders[
                                            eventType
                                            ] ??
                                            "Enter your event title"
                                        }
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-violet-500"
                                    />
                                </div>

                                {/* Wedding Person Names */}
                                {eventType ===
                                    "Wedding" && (
                                        <div className="grid gap-6 sm:grid-cols-2">

                                            {/* Person 1 */}
                                            <div>
                                                <label
                                                    htmlFor="person1Name"
                                                    className="mb-2 block text-sm font-medium text-slate-200"
                                                >
                                                    Person 1 Name
                                                </label>

                                                <input
                                                    id="person1Name"
                                                    type="text"
                                                    value={
                                                        person1Name
                                                    }
                                                    onChange={(
                                                        event,
                                                    ) =>
                                                        setPerson1Name(
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="Arun"
                                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-violet-500"
                                                />
                                            </div>

                                            {/* Person 2 */}
                                            <div>
                                                <label
                                                    htmlFor="person2Name"
                                                    className="mb-2 block text-sm font-medium text-slate-200"
                                                >
                                                    Person 2 Name
                                                </label>

                                                <input
                                                    id="person2Name"
                                                    type="text"
                                                    value={
                                                        person2Name
                                                    }
                                                    onChange={(
                                                        event,
                                                    ) =>
                                                        setPerson2Name(
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="Priya"
                                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-violet-500"
                                                />
                                            </div>
                                        </div>
                                    )}

                                {/* Date & Time */}
                                <div className="grid gap-6 sm:grid-cols-2">

                                    {/* Date */}
                                    <div>
                                        <label
                                            htmlFor="date"
                                            className="mb-2 block text-sm font-medium text-slate-200"
                                        >
                                            Date
                                        </label>

                                        <input
                                            id="date"
                                            type="date"
                                            value={date}
                                            onChange={(event) =>
                                                setDate(
                                                    event.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
                                        />
                                    </div>

                                    {/* Time */}
                                    <div>
                                        <label
                                            htmlFor="time"
                                            className="mb-2 block text-sm font-medium text-slate-200"
                                        >
                                            Time
                                        </label>

                                        <input
                                            id="time"
                                            type="time"
                                            value={time}
                                            onChange={(event) =>
                                                setTime(
                                                    event.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
                                        />
                                    </div>
                                </div>

                                {/* Venue */}
                                <div>
                                    <label
                                        htmlFor="venue"
                                        className="mb-2 block text-sm font-medium text-slate-200"
                                    >
                                        Venue
                                    </label>

                                    <input
                                        id="venue"
                                        type="text"
                                        value={venue}
                                        onChange={(event) =>
                                            setVenue(
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Sri Kalyana Mandapam"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-violet-500"
                                    />
                                </div>

                                {/* Venue Address */}
                                <div>
                                    <label
                                        htmlFor="venueAddress"
                                        className="mb-2 block text-sm font-medium text-slate-200"
                                    >
                                        Venue Address
                                    </label>

                                    <textarea
                                        id="venueAddress"
                                        value={venueAddress}
                                        onChange={(event) =>
                                            setVenueAddress(
                                                event.target.value,
                                            )
                                        }
                                        placeholder="123 Temple Road, Thiruvannamalai, Tamil Nadu"
                                        rows={3}
                                        className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-violet-500"
                                    />
                                </div>

                                {/* Event Location */}
                                <div>
                                    <label
                                        htmlFor="mapsLocation"
                                        className="mb-2 block text-sm font-medium text-slate-200"
                                    >
                                        Event Location
                                    </label>

                                    <input
                                        id="mapsLocation"
                                        type="text"
                                        readOnly
                                        value={
                                            selectedLocationName ||
                                            (mapsUrl
                                                ? "Location selected"
                                                : "")
                                        }
                                        onClick={() =>
                                            setIsLocationPickerOpen(
                                                true,
                                            )
                                        }
                                        onFocus={() =>
                                            setIsLocationPickerOpen(
                                                true,
                                            )
                                        }
                                        placeholder="Click to select location on map"
                                        className="w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition hover:border-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                                    />

                                    <p className="mt-2 text-xs text-slate-500">
                                        Search for your venue or select a location directly on the map.
                                    </p>
                                </div>

                                {/* Invitation Message */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="mb-2 block text-sm font-medium text-slate-200"
                                    >
                                        Invitation Message
                                    </label>

                                    <textarea
                                        id="message"
                                        value={message}
                                        onChange={(event) =>
                                            setMessage(
                                                event.target.value,
                                            )
                                        }
                                        placeholder="We would love to celebrate this special moment with you."
                                        rows={5}
                                        className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-violet-500"
                                    />
                                </div>

                                {/* Save Message */}
                                {saveMessage && (
                                    <div
                                        className={`rounded-xl border px-4 py-3 text-sm ${savedSlug
                                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                                                : "border-red-500/30 bg-red-500/10 text-red-300"
                                            }`}
                                    >
                                        <p>
                                            {saveMessage}
                                        </p>

                                        {savedSlug && (
                                            <p className="mt-1 text-xs text-emerald-400">
                                                Draft ID:{" "}
                                                {savedSlug}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex flex-col gap-3 pt-2 sm:flex-row">

                                    {/* Save Draft */}
                                    <SparkleButton
                                        type="submit"
                                        disabled={isSaving}
                                        className="rounded-full bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isSaving
                                            ? "Saving..."
                                            : "Save Draft"}
                                    </SparkleButton>

                                    {/* Preview */}
                                    <Link
                                        href={`/preview?template=${selectedTemplate.id}`}
                                        className="rounded-full border border-slate-700 px-6 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
                                    >
                                        Preview
                                    </Link>
                                </div>
                            </div>
                        </form>

                        {/* Theme Customizer */}
                        <ThemeCustomizer
                            template={selectedTemplate}
                            originalTemplate={
                                defaultTemplate ??
                                selectedTemplate
                            }
                            onChange={setSelectedTemplate}
                        />
                    </div>

                    {/* Live Preview */}
                    <aside className="h-fit lg:sticky lg:top-24">
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">

                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
                                Live Preview
                            </p>

                            <h2 className="mt-3 text-xl font-semibold text-white">
                                Your invitation
                            </h2>

                            <div className="mt-6">
                                <InvitationTemplate
                                    template={selectedTemplate}
                                    category={eventType}
                                    title={title || "You're Invited"}
                                    person1Name={person1Name}
                                    person2Name={person2Name}
                                    date={
                                        date
                                            ? `${date}${time ? ` • ${time}` : ""}`
                                            : "Saturday, 24 October 2026"
                                    }
                                    venue={venue || "Chennai, Tamil Nadu"}
                                    venueAddress={venueAddress}
                                    message={message}
                                />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Location Picker */}
            <GoogleMapsLocationPicker
                isOpen={
                    isLocationPickerOpen
                }
                onClose={() =>
                    setIsLocationPickerOpen(
                        false,
                    )
                }
                onSelect={(
                    location,
                ) => {
                    setSelectedLocationName(
                        location.name,
                    );

                    setVenue(
                        location.name,
                    );

                    setVenueAddress(
                        location.address,
                    );

                    setMapsUrl(
                        location.mapsUrl,
                    );
                }}
            />
        </main>
    );
}

export default function CreateInvitationPage() {
    return (
        <Suspense fallback={null}>
            <CreateInvitationPageContent />
        </Suspense>
    );
}