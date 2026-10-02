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

import type {
    InvitationAIContent,
    InvitationAIGeneratedResult,
    InvitationEventType,
    InvitationTone,
    InvitationDesignType,
} from "@/lib/ai/aiTypes";

import GoogleMapsLocationPicker from "@/components/invitation/GoogleMapsLocationPicker";
import ThemeCustomizer from "@/components/invitation/ThemeCustomizer";
import InvitationTemplate from "@/components/invitation/InvitationTemplate";
import InvitationScene from "@/components/invitation/3d/InvitationScene";
import AIVideoPreview from "@/components/invitation/video/AIVideoPreview";

import HomeButton from "@/components/ui/HomeButton";
import AIInvitationWriter from "@/components/ai/AIInvitationWriter";

const eventTitlePlaceholders: Record<
    string,
    string
> = {
    Wedding:
        "Arun & Priya Wedding",

    Birthday:
        "Rahul's Birthday Celebration",

    Engagement:
        "Arun & Priya Engagement",

    Anniversary:
        "25th Wedding Anniversary",

    "Baby Shower":
        "Baby Shower Celebration",

    Housewarming:
        "Housewarming Ceremony",

    "Special Event":
        "Special Event Celebration",

    Other:
        "Special Event Celebration",
};

const designTypes: {
    value: InvitationDesignType;
    label: string;
    description: string;
    icon: string;
}[] = [
    {
        value: "2d",
        label: "2D",
        description: "Classic invitation",
        icon: "▣",
    },
    {
        value: "3d",
        label: "3D",
        description: "Interactive experience",
        icon: "◇",
    },
    {
        value: "video",
        label: "Video",
        description: "Animated invitation",
        icon: "▶",
    },
];

const designStyles = [
    "Elegant",
    "Modern",
    "Traditional",
    "Minimal",
    "Luxury",
    "Playful",
    "Cinematic",
];

function SectionHeader({
    number,
    title,
    description,
}: {
    number: string;
    title: string;
    description?: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-xs font-semibold text-violet-300 ring-1 ring-violet-500/20">
                {number}
            </div>

            <div>
                <h2 className="text-sm font-semibold text-white">
                    {title}
                </h2>

                {description && (
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}

function PreviewIcon({
    type,
}: {
    type: InvitationDesignType;
}) {
    if (type === "video") {
        return (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
            >
                <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                />
                <path d="m10 9 5 3-5 3V9Z" />
            </svg>
        );
    }

    if (type === "3d") {
        return (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
            >
                <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
                <path d="m4.5 7.8 7.5 4.3 7.5-4.3" />
                <path d="M12 12.1V21" />
            </svg>
        );
    }

    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
        >
            <rect
                x="4"
                y="3"
                width="16"
                height="18"
                rx="2"
            />
            <path d="M8 7h8M8 11h8M8 15h5" />
        </svg>
    );
}

function SparklesIcon() {
    return (
        <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 3-1.5 6.5L4 11l6.5 1.5L12 19l1.5-6.5L20 11l-6.5-1.5Z" />
            <path d="m19 17-.7 2.3L16 20l2.3.7L19 23l.7-2.3L21 20l-2.3-.7Z" />
        </svg>
    );
}

function MapPinIcon() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
        >
            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle
                cx="12"
                cy="10"
                r="2.5"
            />
        </svg>
    );
}

function CreateInvitationPageContent() {
    const searchParams =
        useSearchParams();

    const templateId =
        searchParams.get("template") ??
        "elegant-wedding";

    const defaultTemplate =
        getTemplateById(
            templateId,
        );

    const [
        selectedTemplate,
        setSelectedTemplate,
    ] =
        useState<InvitationTemplateType>(
            defaultTemplate ??
                getTemplateById(
                    "elegant-wedding",
                )!,
        );

    const [
        eventType,
        setEventType,
    ] = useState(
        selectedTemplate.category,
    );

    const [
        title,
        setTitle,
    ] = useState("");

    const [
        person1Name,
        setPerson1Name,
    ] = useState("");

    const [
        person2Name,
        setPerson2Name,
    ] = useState("");

    const [
        date,
        setDate,
    ] = useState("");

    const [
        time,
        setTime,
    ] = useState("");

    const [
        venue,
        setVenue,
    ] = useState("");

    const [
        venueAddress,
        setVenueAddress,
    ] = useState("");

    const [
        mapsUrl,
        setMapsUrl,
    ] = useState("");

    const [
        isLocationPickerOpen,
        setIsLocationPickerOpen,
    ] = useState(false);

    const [
        selectedLocationName,
        setSelectedLocationName,
    ] = useState("");

    const [
        message,
        setMessage,
    ] = useState("");

    const [
        isSaving,
        setIsSaving,
    ] = useState(false);

    const [
        saveMessage,
        setSaveMessage,
    ] = useState("");

    const [
        savedSlug,
        setSavedSlug,
    ] = useState("");

    const [
        designType,
        setDesignType,
    ] =
        useState<InvitationDesignType>(
            "2d",
        );

    const [
        aiResult,
        setAiResult,
    ] =
        useState<InvitationAIGeneratedResult | null>(
            null,
        );

    const [
        selectedPreviewTab,
        setSelectedPreviewTab,
    ] =
        useState<InvitationDesignType>(
            "2d",
        );

    function handleAIContent(
        result: InvitationAIGeneratedResult,
    ) {
        const firstVariation =
            result.variations[0];

        if (!firstVariation) {
            return;
        }

        setTitle(
            firstVariation.title,
        );

        setMessage(
            firstVariation.invitationMessage,
        );

        setAiResult(result);

        setSelectedPreviewTab(
            result.design.type,
        );
    }

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

    const previewTemplate =
        selectedTemplate;

    const previewDate =
        date
            ? `${date}${
                  time
                      ? ` • ${time}`
                      : ""
              }`
            : "Saturday, 24 October 2026";

    const previewVenue =
        venue ||
        "Chennai, Tamil Nadu";

    return (
        <main className="min-h-screen bg-[#08090f] px-4 py-6 text-white sm:px-6 lg:px-8">

            <div className="mx-auto max-w-[1500px]">

                {/* Top Header */}
                <header className="mb-6 flex flex-col gap-4 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-4">

                        <HomeButton />

                        <div className="hidden h-5 w-px bg-white/[0.08] sm:block" />

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-violet-400">
                                AI Studio
                            </p>

                            <h1 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                                Create Invitation
                            </h1>
                        </div>

                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">

                        <span className="hidden sm:inline">
                            Create
                        </span>

                        <span className="text-slate-700">
                            /
                        </span>

                        <span className="text-slate-300">
                            Invitation
                        </span>

                    </div>

                </header>

                {/* Main Workspace */}
                <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(500px,1.05fr)]">

                    {/* ================================================== */}
                    {/* LEFT SIDE */}
                    {/* ================================================== */}

                    <div className="space-y-5">

                        {/* Event Details */}
                        <section className="rounded-2xl border border-white/[0.07] bg-[#0d0f17] p-5 sm:p-6">

                            <SectionHeader
                                number="1"
                                title="Event Details"
                                description="Tell us about your event."
                            />

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">

                                {/* Event Type */}
                                <div>
                                    <label
                                        htmlFor="eventType"
                                        className="mb-2 block text-xs font-medium text-slate-400"
                                    >
                                        Event Type
                                    </label>

                                    <select
                                        id="eventType"
                                        value={
                                            eventType
                                        }
                                        onChange={(
                                            event,
                                        ) =>
                                            handleEventTypeChange(
                                                event
                                                    .target
                                                    .value,
                                            )
                                        }
                                        className="w-full rounded-xl border border-white/[0.08] bg-[#080a10] px-3.5 py-3 text-sm text-white outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10"
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
                                            Special Event
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
                                        className="mb-2 block text-xs font-medium text-slate-400"
                                    >
                                        Event Title
                                    </label>

                                    <input
                                        id="title"
                                        type="text"
                                        value={
                                            title
                                        }
                                        onChange={(
                                            event,
                                        ) =>
                                            setTitle(
                                                event
                                                    .target
                                                    .value,
                                            )
                                        }
                                        placeholder={
                                            eventTitlePlaceholders[
                                                eventType
                                            ] ??
                                            "Enter event title"
                                        }
                                        className="w-full rounded-xl border border-white/[0.08] bg-[#080a10] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10"
                                    />
                                </div>

                                {/* Wedding Names */}
                                {eventType ===
                                    "Wedding" && (
                                    <>
                                        <div>
                                            <label
                                                htmlFor="person1Name"
                                                className="mb-2 block text-xs font-medium text-slate-400"
                                            >
                                                Person 1
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
                                                        event
                                                            .target
                                                            .value,
                                                    )
                                                }
                                                placeholder="Arun"
                                                className="w-full rounded-xl border border-white/[0.08] bg-[#080a10] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-violet-500/50"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="person2Name"
                                                className="mb-2 block text-xs font-medium text-slate-400"
                                            >
                                                Person 2
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
                                                        event
                                                            .target
                                                            .value,
                                                    )
                                                }
                                                placeholder="Priya"
                                                className="w-full rounded-xl border border-white/[0.08] bg-[#080a10] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-violet-500/50"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Date */}
                                <div>
                                    <label
                                        htmlFor="date"
                                        className="mb-2 block text-xs font-medium text-slate-400"
                                    >
                                        Date
                                    </label>

                                    <input
                                        id="date"
                                        type="date"
                                        value={
                                            date
                                        }
                                        onChange={(
                                            event,
                                        ) =>
                                            setDate(
                                                event
                                                    .target
                                                    .value,
                                            )
                                        }
                                        className="w-full rounded-xl border border-white/[0.08] bg-[#080a10] px-3.5 py-3 text-sm text-white outline-none transition focus:border-violet-500/50"
                                    />
                                </div>

                                {/* Time */}
                                <div>
                                    <label
                                        htmlFor="time"
                                        className="mb-2 block text-xs font-medium text-slate-400"
                                    >
                                        Time
                                    </label>

                                    <input
                                        id="time"
                                        type="time"
                                        value={
                                            time
                                        }
                                        onChange={(
                                            event,
                                        ) =>
                                            setTime(
                                                event
                                                    .target
                                                    .value,
                                            )
                                        }
                                        className="w-full rounded-xl border border-white/[0.08] bg-[#080a10] px-3.5 py-3 text-sm text-white outline-none transition focus:border-violet-500/50"
                                    />
                                </div>

                                {/* Venue */}
                                <div>
                                    <label
                                        htmlFor="venue"
                                        className="mb-2 block text-xs font-medium text-slate-400"
                                    >
                                        Venue
                                    </label>

                                    <input
                                        id="venue"
                                        type="text"
                                        value={
                                            venue
                                        }
                                        onChange={(
                                            event,
                                        ) =>
                                            setVenue(
                                                event
                                                    .target
                                                    .value,
                                            )
                                        }
                                        placeholder="Sri Kalyana Mandapam"
                                        className="w-full rounded-xl border border-white/[0.08] bg-[#080a10] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-violet-500/50"
                                    />
                                </div>

                                {/* Address */}
                                <div>
                                    <label
                                        htmlFor="venueAddress"
                                        className="mb-2 block text-xs font-medium text-slate-400"
                                    >
                                        Address
                                    </label>

                                    <input
                                        id="venueAddress"
                                        type="text"
                                        value={
                                            venueAddress
                                        }
                                        onChange={(
                                            event,
                                        ) =>
                                            setVenueAddress(
                                                event
                                                    .target
                                                    .value,
                                            )
                                        }
                                        placeholder="Venue address"
                                        className="w-full rounded-xl border border-white/[0.08] bg-[#080a10] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-violet-500/50"
                                    />
                                </div>

                            </div>

                            {/* Map */}
                            <div className="mt-4">

                                <label
                                    htmlFor="mapsLocation"
                                    className="mb-2 block text-xs font-medium text-slate-400"
                                >
                                    Event Location
                                </label>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsLocationPickerOpen(
                                            true,
                                        )
                                    }
                                    className="flex w-full items-center gap-3 rounded-xl border border-white/[0.08] bg-[#080a10] px-3.5 py-3 text-left transition hover:border-violet-500/30"
                                >
                                    <span className="text-violet-400">
                                        <MapPinIcon />
                                    </span>

                                    <span className="min-w-0 flex-1 truncate text-sm text-slate-300">
                                        {selectedLocationName ||
                                            (mapsUrl
                                                ? "Location selected"
                                                : "Select location on map")}
                                    </span>

                                    <span className="text-[10px] text-slate-600">
                                        Select
                                    </span>
                                </button>

                            </div>

                        </section>

                        {/* AI Design Options */}
                        <section className="rounded-2xl border border-white/[0.07] bg-[#0d0f17] p-5 sm:p-6">

                            <SectionHeader
                                number="2"
                                title="AI Design Options"
                                description="Choose the format for your invitation."
                            />

                            <div className="mt-5 grid grid-cols-3 gap-2">

                                {designTypes.map(
                                    (
                                        option,
                                    ) => {
                                        const selected =
                                            designType ===
                                            option.value;

                                        return (
                                            <button
                                                key={
                                                    option.value
                                                }
                                                type="button"
                                                onClick={() => {
                                                    setDesignType(
                                                        option.value,
                                                    );

                                                    setSelectedPreviewTab(
                                                        option.value,
                                                    );
                                                }}
                                                className={`rounded-xl border p-3 text-left transition ${
                                                    selected
                                                        ? "border-violet-500/50 bg-violet-500/10 shadow-lg shadow-violet-500/5"
                                                        : "border-white/[0.07] bg-white/[0.015] hover:border-white/[0.13] hover:bg-white/[0.03]"
                                                }`}
                                            >
                                                <div
                                                    className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg ${
                                                        selected
                                                            ? "bg-violet-500/15 text-violet-300"
                                                            : "bg-white/[0.04] text-slate-500"
                                                    }`}
                                                >
                                                    <PreviewIcon
                                                        type={
                                                            option.value
                                                        }
                                                    />
                                                </div>

                                                <p
                                                    className={`text-xs font-semibold ${
                                                        selected
                                                            ? "text-violet-300"
                                                            : "text-slate-300"
                                                    }`}
                                                >
                                                    {
                                                        option.label
                                                    }
                                                </p>

                                                <p className="mt-1 text-[9px] leading-4 text-slate-600">
                                                    {
                                                        option.description
                                                    }
                                                </p>
                                            </button>
                                        );
                                    },
                                )}

                            </div>

                            {/* Style */}
                            <div className="mt-5">

                                <p className="text-xs font-medium text-slate-400">
                                    Design Style
                                </p>

                                <div className="mt-2 flex flex-wrap gap-2">

                                    {designStyles.map(
                                        (
                                            style,
                                        ) => (
                                            <span
                                                key={
                                                    style
                                                }
                                                className={`rounded-full border px-3 py-1.5 text-[10px] ${
                                                    aiResult?.design.style.toLowerCase() ===
                                                    style.toLowerCase()
                                                        ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                                                        : "border-white/[0.06] bg-white/[0.02] text-slate-500"
                                                }`}
                                            >
                                                {
                                                    style
                                                }
                                            </span>
                                        ),
                                    )}

                                </div>

                            </div>

                        </section>

                        {/* AI Writer */}
                        <AIInvitationWriter
                            eventType={
                                eventType
                            }
                            eventName={
                                title
                            }
                            hostNames={
                                eventType ===
                                "Wedding"
                                    ? `${person1Name} and ${person2Name}`
                                    : undefined
                            }
                            eventDate={
                                date
                            }
                            eventTime={
                                time
                            }
                            venue={
                                venue
                            }
                            designType={
                                designType
                            }
                            onGenerated={(
                                result,
                            ) => {
                                setAiResult(
                                    result,
                                );

                                setSelectedPreviewTab(
                                    result.design.type,
                                );
                            }}
                            onUseContent={(
                                content,
                            ) => {
                                setTitle(
                                    content.title,
                                );

                                setMessage(
                                    content.invitationMessage,
                                );
                            }}
                        />

                        {/* Generated Design Information */}
                        {aiResult && (
                            <section className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] p-5">

                                <SectionHeader
                                    number="4"
                                    title="Generated Design"
                                    description="AI-generated visual direction for your invitation."
                                />

                                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

                                    <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
                                        <p className="text-[9px] uppercase tracking-wider text-slate-600">
                                            Format
                                        </p>

                                        <p className="mt-1 text-xs font-medium uppercase text-slate-300">
                                            {
                                                aiResult
                                                    .design
                                                    .type
                                            }
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
                                        <p className="text-[9px] uppercase tracking-wider text-slate-600">
                                            Layout
                                        </p>

                                        <p className="mt-1 text-xs font-medium capitalize text-slate-300">
                                            {
                                                aiResult
                                                    .design
                                                    .layout
                                            }
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
                                        <p className="text-[9px] uppercase tracking-wider text-slate-600">
                                            Theme
                                        </p>

                                        <p className="mt-1 text-xs font-medium capitalize text-slate-300">
                                            {
                                                aiResult
                                                    .design
                                                    .colorTheme
                                            }
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3">
                                        <p className="text-[9px] uppercase tracking-wider text-slate-600">
                                            Typography
                                        </p>

                                        <p className="mt-1 text-xs font-medium capitalize text-slate-300">
                                            {
                                                aiResult
                                                    .design
                                                    .typography
                                            }
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-white/[0.06] bg-black/20 p-3 sm:col-span-2">
                                        <p className="text-[9px] uppercase tracking-wider text-slate-600">
                                            Decoration
                                        </p>

                                        <p className="mt-1 text-xs font-medium capitalize text-slate-300">
                                            {
                                                aiResult
                                                    .design
                                                    .decoration
                                            }
                                        </p>
                                    </div>

                                </div>

                            </section>
                        )}

                        {/* Save / Message */}
                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className="rounded-2xl border border-white/[0.07] bg-[#0d0f17] p-5 sm:p-6"
                        >

                            <SectionHeader
                                number="5"
                                title="Save Invitation"
                                description="Save your invitation as a draft and continue customizing it."
                            />

                            {/* Message */}
                            <div className="mt-5">

                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-xs font-medium text-slate-400"
                                >
                                    Invitation Message
                                </label>

                                <textarea
                                    id="message"
                                    value={
                                        message
                                    }
                                    onChange={(
                                        event,
                                    ) =>
                                        setMessage(
                                            event
                                                .target
                                                .value,
                                        )
                                    }
                                    rows={4}
                                    placeholder="Your AI-generated invitation message will appear here..."
                                    className="w-full resize-none rounded-xl border border-white/[0.08] bg-[#080a10] px-3.5 py-3 text-sm leading-6 text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-violet-500/50"
                                />

                            </div>

                            {saveMessage && (
                                <div
                                    className={`mt-4 rounded-xl border px-4 py-3 text-xs ${
                                        savedSlug
                                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                                            : "border-red-500/20 bg-red-500/10 text-red-300"
                                    }`}
                                >
                                    {saveMessage}

                                    {savedSlug && (
                                        <p className="mt-1 text-[10px] text-emerald-400">
                                            Draft ID:{" "}
                                            {
                                                savedSlug
                                            }
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                                <button
                                    type="submit"
                                    disabled={
                                        isSaving
                                    }
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-violet-500/10 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSaving
                                        ? "Saving..."
                                        : "Save Draft"}
                                </button>

                                <Link
                                    href={`/preview?template=${selectedTemplate.id}`}
                                    className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-3 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                                >
                                    Preview
                                </Link>

                            </div>

                        </form>

                        {/* Theme Customizer */}
                        <ThemeCustomizer
                            template={
                                selectedTemplate
                            }
                            originalTemplate={
                                defaultTemplate ??
                                selectedTemplate
                            }
                            onChange={
                                setSelectedTemplate
                            }
                        />

                    </div>

                    {/* ================================================== */}
                    {/* RIGHT SIDE */}
                    {/* ================================================== */}

                    <aside className="h-fit xl:sticky xl:top-6">

                        <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0f17]">

                            {/* Preview Header */}
                            <div className="border-b border-white/[0.06] p-5">

                                <div className="flex items-start justify-between gap-4">

                                    <div>

                                        <div className="flex items-center gap-2">

                                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
                                                <SparklesIcon />
                                            </span>

                                            <p className="text-sm font-semibold text-white">
                                                AI Generated Preview
                                            </p>

                                        </div>

                                        <p className="mt-2 text-[10px] leading-4 text-slate-600">
                                            Preview your invitation
                                            in different formats.
                                        </p>

                                    </div>

                                    {aiResult && (
                                        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[9px] font-medium text-emerald-300">
                                            Generated
                                        </span>
                                    )}

                                </div>

                                {/* Preview Tabs */}
                                <div className="mt-5 grid grid-cols-3 rounded-xl border border-white/[0.06] bg-black/20 p-1">

                                    {designTypes.map(
                                        (
                                            option,
                                        ) => (
                                            <button
                                                key={
                                                    option.value
                                                }
                                                type="button"
                                                onClick={() =>
                                                    setSelectedPreviewTab(
                                                        option.value,
                                                    )
                                                }
                                                className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-[10px] font-medium transition ${
                                                    selectedPreviewTab ===
                                                    option.value
                                                        ? "bg-violet-500/15 text-violet-300 shadow-sm"
                                                        : "text-slate-600 hover:text-slate-400"
                                                }`}
                                            >
                                                <PreviewIcon
                                                    type={
                                                        option.value
                                                    }
                                                />

                                                {
                                                    option.label
                                                }
                                            </button>
                                        ),
                                    )}

                                </div>

                            </div>

                            {/* Preview Area */}
                            <div className="p-5">

                                {selectedPreviewTab ===
                                    "2d" && (
                                    <div>

                                        <div className="mx-auto max-w-[420px] rounded-2xl bg-black/20 p-3 ring-1 ring-white/[0.05]">

                                            <InvitationTemplate
                                                template={
                                                    previewTemplate
                                                }
                                                category={
                                                    eventType
                                                }
                                                title={
                                                    title ||
                                                    "You're Invited"
                                                }
                                                person1Name={
                                                    person1Name
                                                }
                                                person2Name={
                                                    person2Name
                                                }
                                                date={
                                                    previewDate
                                                }
                                                venue={
                                                    previewVenue
                                                }
                                            />

                                        </div>

                                    </div>
                                )}

                                {selectedPreviewTab ===
                                    "3d" && (
                                    <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-black/30">

                                        <InvitationScene
                                            template={
                                                previewTemplate
                                            }
                                            category={
                                                eventType
                                            }
                                            title={
                                                title ||
                                                "You're Invited"
                                            }
                                            person1Name={
                                                person1Name
                                            }
                                            person2Name={
                                                person2Name
                                            }
                                            date={
                                                previewDate
                                            }
                                            venue={
                                                previewVenue
                                            }
                                        />

                                    </div>
                                )}

                                {selectedPreviewTab === "video" && (
                                    <AIVideoPreview
                                        eventType={eventType}
                                        eventName={title}
                                        hostNames={
                                            eventType === "Wedding"
                                                ? `${person1Name} and ${person2Name}`
                                                : undefined
                                        }
                                        eventDate={date}
                                        eventTime={time}
                                        venue={venue}
                                        design={aiResult?.design}
                                        content={
                                            aiResult?.variations?.[0] ??
                                            null
                                        }
                                    />
                                )}

                                {/* Empty state */}
                                {!aiResult && (
                                    <div className="mt-4 rounded-xl border border-dashed border-white/[0.08] bg-white/[0.01] px-5 py-4 text-center">

                                        <p className="text-[10px] text-slate-600">
                                            Generate an invitation
                                            with AI to create
                                            design variations.
                                        </p>

                                    </div>
                                )}

                            </div>

                            {/* AI Variations */}
                            {aiResult && (
                                <div className="border-t border-white/[0.06] p-5">

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-xs font-semibold text-white">
                                                AI Design Variations
                                            </p>

                                            <p className="mt-1 text-[9px] text-slate-600">
                                                Generated invitation
                                                concepts
                                            </p>

                                        </div>

                                        <span className="text-[9px] text-slate-600">
                                            {
                                                aiResult
                                                    .variations
                                                    .length
                                            }{" "}
                                            variations
                                        </span>

                                    </div>

                                    <div className="mt-4 grid grid-cols-3 gap-2">

                                        {aiResult.variations.map(
                                            (
                                                variation,
                                                index,
                                            ) => (
                                                <button
                                                    key={
                                                        index
                                                    }
                                                    type="button"
                                                    onClick={() => {
                                                        setTitle(
                                                            variation.title,
                                                        );

                                                        setMessage(
                                                            variation.invitationMessage,
                                                        );
                                                    }}
                                                    className="group overflow-hidden rounded-xl border border-white/[0.07] bg-black/20 text-left transition hover:border-violet-500/30"
                                                >

                                                    <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-violet-950/40 via-slate-900 to-fuchsia-950/20 p-3">

                                                        <div className="text-center">

                                                            <p className="text-[8px] uppercase tracking-[0.15em] text-violet-300/70">
                                                                Invitation
                                                            </p>

                                                            <p className="mt-2 line-clamp-2 text-[10px] font-semibold leading-4 text-white">
                                                                {
                                                                    variation.title
                                                                }
                                                            </p>

                                                        </div>

                                                    </div>

                                                    <div className="p-2.5">

                                                        <p className="text-[9px] font-medium text-slate-400">
                                                            Variation{" "}
                                                            {
                                                                index +
                                                                1
                                                            }
                                                        </p>

                                                    </div>

                                                </button>
                                            ),
                                        )}

                                    </div>

                                </div>
                            )}

                            {/* Design Theme */}
                            {aiResult && (
                                <div className="border-t border-white/[0.06] p-5">

                                    <p className="text-xs font-semibold text-white">
                                        Design Theme
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">

                                        <span className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[9px] capitalize text-slate-400">
                                            {
                                                aiResult
                                                    .design
                                                    .style
                                            }
                                        </span>

                                        <span className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[9px] capitalize text-slate-400">
                                            {
                                                aiResult
                                                    .design
                                                    .layout
                                            }
                                        </span>

                                        <span className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[9px] capitalize text-slate-400">
                                            {
                                                aiResult
                                                    .design
                                                    .colorTheme
                                            }
                                        </span>

                                        <span className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[9px] capitalize text-slate-400">
                                            {
                                                aiResult
                                                    .design
                                                    .typography
                                            }
                                        </span>

                                        <span className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[9px] capitalize text-slate-400">
                                            {
                                                aiResult
                                                    .design
                                                    .decoration
                                            }
                                        </span>

                                    </div>

                                </div>
                            )}

                        </section>

                    </aside>

                </div>

            </div>

            {/* Google Maps */}
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