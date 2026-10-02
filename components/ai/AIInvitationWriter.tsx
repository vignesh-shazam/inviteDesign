"use client";

import { useState } from "react";

import type {
    InvitationAIContent,
    InvitationAIGeneratedResult,
    InvitationDesignType,
    InvitationTone,
} from "@/lib/ai/aiTypes";

type InvitationEventType =
    | "wedding"
    | "birthday"
    | "engagement"
    | "baby-shower"
    | "housewarming"
    | "anniversary"
    | "special-event";

type AIInvitationWriterProps = {
    eventType: string;
    eventName: string;
    hostNames?: string;
    eventDate?: string;
    eventTime?: string;
    venue?: string;
    designType: InvitationDesignType;

    onGenerated?: (
        result: InvitationAIGeneratedResult,
    ) => void;

    onUseContent: (
        content: InvitationAIContent,
    ) => void;
};

const eventTypeMap: Record<
    string,
    InvitationEventType
> = {
    Wedding: "wedding",
    Birthday: "birthday",
    Engagement: "engagement",
    "Baby Shower": "baby-shower",
    Housewarming: "housewarming",
    Anniversary: "anniversary",
    "Special Event": "special-event",
    Other: "special-event",
};

const tones: {
    value: InvitationTone;
    label: string;
    description: string;
}[] = [
    {
        value: "elegant",
        label: "Elegant",
        description:
            "Graceful and sophisticated",
    },
    {
        value: "modern",
        label: "Modern",
        description:
            "Fresh and stylish",
    },
    {
        value: "traditional",
        label: "Traditional",
        description:
            "Classic and warm",
    },
    {
        value: "fun",
        label: "Fun",
        description:
            "Friendly and cheerful",
    },
];

function SparkleIcon() {
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
            <path d="m12 3-1.4 5.6L5 10l5.6 1.4L12 17l1.4-5.6L19 10l-5.6-1.4Z" />
            <path d="m19 16-.7 2.3L16 19l2.3.7L19 22l.7-2.3L22 19l-2.3-.7Z" />
        </svg>
    );
}

function RefreshIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 11a8.1 8.1 0 0 0-14.7-4L3 10" />
            <path d="M3 5v5h5" />
            <path d="M4 13a8.1 8.1 0 0 0 14.7 4L21 14" />
            <path d="M21 19v-5h-5" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m5 12 4 4L19 6" />
        </svg>
    );
}

function ChevronLeftIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}

function ChevronRightIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}

export default function AIInvitationWriter({
    eventType,
    eventName,
    hostNames,
    eventDate,
    eventTime,
    venue,
    designType,
    onGenerated,
    onUseContent,
}: AIInvitationWriterProps) {
    const [tone, setTone] =
        useState<InvitationTone>(
            "elegant",
        );

    const [
        additionalDetails,
        setAdditionalDetails,
    ] = useState("");

    const [
        result,
        setResult,
    ] =
        useState<InvitationAIGeneratedResult | null>(
            null,
        );

    const [
        selectedVariation,
        setSelectedVariation,
    ] = useState(0);

    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");

    const [
        used,
        setUsed,
    ] = useState(false);

    async function generateContent() {
        setLoading(true);
        setError("");
        setUsed(false);

        try {
            const mappedEventType =
                eventTypeMap[eventType] ??
                "special-event";

            const response =
                await fetch(
                    "/api/ai/invitation",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify({
                                eventType:
                                    mappedEventType,

                                eventName:
                                    eventName.trim() ||
                                    "My Special Event",

                                hostNames:
                                    hostNames?.trim() ||
                                    undefined,

                                eventDate:
                                    eventDate?.trim() ||
                                    undefined,

                                eventTime:
                                    eventTime?.trim() ||
                                    undefined,

                                venue:
                                    venue?.trim() ||
                                    undefined,

                                tone,

                                designType,

                                additionalDetails:
                                    additionalDetails.trim() ||
                                    undefined,
                            }),
                    },
                );

            const data =
                await response.json();

            if (
                !response.ok ||
                !data.success
            ) {
                throw new Error(
                    data.error ||
                        "Unable to generate invitation content.",
                );
            }

            const generatedResult =
                data.data as InvitationAIGeneratedResult;

            if (
                !generatedResult ||
                !generatedResult.variations ||
                generatedResult.variations.length ===
                    0
            ) {
                throw new Error(
                    "AI did not return any invitation variations.",
                );
            }

            if (
                !generatedResult.design
            ) {
                throw new Error(
                    "AI did not return a design specification.",
                );
            }

            setResult(
                generatedResult,
            );

            setSelectedVariation(0);

            onGenerated?.(
                generatedResult,
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong while generating content.",
            );
        } finally {
            setLoading(false);
        }
    }

    function updateCurrentContent(
        field: keyof InvitationAIContent,
        value: string,
    ) {
        if (!result) {
            return;
        }

        const updatedVariations =
            result.variations.map(
                (
                    variation,
                    index,
                ) =>
                    index ===
                    selectedVariation
                        ? {
                              ...variation,
                              [field]:
                                  value,
                          }
                        : variation,
            );

        const updatedResult: InvitationAIGeneratedResult =
            {
                ...result,
                variations:
                    updatedVariations,
            };

        setResult(
            updatedResult,
        );

        setUsed(false);

        /*
         * Keep the parent preview/content
         * synchronized while editing.
         */
        onGenerated?.(
            updatedResult,
        );
    }

    function handlePrevious() {
        if (
            !result ||
            result.variations.length <= 1
        ) {
            return;
        }

        setUsed(false);

        setSelectedVariation(
            (current) =>
                current === 0
                    ? result.variations
                          .length -
                      1
                    : current - 1,
        );
    }

    function handleNext() {
        if (
            !result ||
            result.variations.length <= 1
        ) {
            return;
        }

        setUsed(false);

        setSelectedVariation(
            (current) =>
                current ===
                result.variations.length -
                    1
                    ? 0
                    : current + 1,
        );
    }

    function handleUseContent() {
        if (!result) {
            return;
        }

        const currentVariation =
            result.variations[
                selectedVariation
            ];

        if (!currentVariation) {
            return;
        }

        onUseContent(
            currentVariation,
        );

        setUsed(true);
    }

    const currentVariation =
        result?.variations[
            selectedVariation
        ] ?? null;

    return (
        <section className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.07] via-fuchsia-500/[0.03] to-transparent p-5 sm:p-6">

            {/* ================================================== */}
            {/* STEP 3 */}
            {/* ================================================== */}

            <div className="flex items-start gap-3">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500 text-[11px] font-semibold text-white">
                    3
                </div>

                <div className="min-w-0">

                    <div className="flex items-center gap-2">

                        <h2 className="text-sm font-semibold text-white">
                            Generate with AI
                        </h2>

                        <span className="hidden text-[10px] text-slate-600 sm:inline">
                            Create content and design based on your details
                        </span>

                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        Let AI create invitation content
                        based on your event.
                    </p>

                </div>

            </div>

            {/* ================================================== */}
            {/* WRITING STYLE */}
            {/* ================================================== */}

            <div className="mt-5">

                <label className="text-xs font-medium text-slate-400">
                    Writing Style
                </label>

                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">

                    {tones.map(
                        (
                            item,
                        ) => {

                            const selected =
                                tone ===
                                item.value;

                            return (
                                <button
                                    key={
                                        item.value
                                    }
                                    type="button"
                                    onClick={() =>
                                        setTone(
                                            item.value,
                                        )
                                    }
                                    className={`rounded-lg border p-3 text-left transition ${
                                        selected
                                            ? "border-violet-500/40 bg-violet-500/10"
                                            : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"
                                    }`}
                                >

                                    <span
                                        className={`block text-xs font-medium ${
                                            selected
                                                ? "text-violet-300"
                                                : "text-slate-300"
                                        }`}
                                    >
                                        {
                                            item.label
                                        }
                                    </span>

                                    <span className="mt-1 block text-[9px] leading-4 text-slate-600">
                                        {
                                            item.description
                                        }
                                    </span>

                                </button>
                            );
                        },
                    )}

                </div>

            </div>

            {/* ================================================== */}
            {/* ADDITIONAL DETAILS */}
            {/* ================================================== */}

            <div className="mt-5">

                <label
                    htmlFor="ai-additional-details"
                    className="text-xs font-medium text-slate-400"
                >
                    Additional Details

                    <span className="ml-1 font-normal text-slate-600">
                        Optional
                    </span>
                </label>

                <textarea
                    id="ai-additional-details"
                    value={
                        additionalDetails
                    }
                    onChange={(
                        event,
                    ) =>
                        setAdditionalDetails(
                            event.target.value,
                        )
                    }
                    rows={3}
                    maxLength={500}
                    placeholder="Example: Please join us for dinner after the ceremony..."
                    className="mt-2 w-full resize-none rounded-lg border border-white/[0.08] bg-black/20 px-3 py-2.5 text-xs leading-5 text-slate-200 outline-none transition placeholder:text-slate-700 focus:border-violet-500/40"
                />

                <div className="mt-1 text-right text-[9px] text-slate-700">
                    {
                        additionalDetails.length
                    }
                    /500
                </div>

            </div>

            {/* ================================================== */}
            {/* GENERATE ACTIONS */}
            {/* ================================================== */}

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">

                <button
                    type="button"
                    onClick={
                        generateContent
                    }
                    disabled={
                        loading
                    }
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 text-xs font-semibold text-white shadow-lg shadow-violet-500/10 transition hover:from-violet-400 hover:to-fuchsia-400 disabled:cursor-not-allowed disabled:opacity-50"
                >

                    <SparkleIcon />

                    {loading
                        ? "Generating..."
                        : "Generate with AI"}

                </button>

                <button
                    type="button"
                    onClick={
                        generateContent
                    }
                    disabled={
                        loading ||
                        !result
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.09] bg-white/[0.02] px-5 py-3 text-xs font-medium text-slate-400 transition hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300 disabled:cursor-not-allowed disabled:opacity-40"
                >

                    <RefreshIcon />

                    Regenerate

                </button>

            </div>

            {/* ================================================== */}
            {/* ERROR */}
            {/* ================================================== */}

            {error && (
                <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3">

                    <p className="text-xs leading-5 text-red-300">
                        {error}
                    </p>

                </div>
            )}

            {/* ================================================== */}
            {/* STEP 4 GENERATED CONTENT */}
            {/* ================================================== */}

            {result &&
                currentVariation && (
                    <div className="mt-6 border-t border-white/[0.06] pt-6">

                        {/* Header */}
                        <div className="flex items-start gap-3">

                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500 text-[11px] font-semibold text-white">
                                4
                            </div>

                            <div className="min-w-0">

                                <div className="flex items-center gap-2">

                                    <h3 className="text-sm font-semibold text-white">
                                        Generated Content
                                    </h3>

                                    <span className="hidden text-[10px] text-slate-600 sm:inline">
                                        Review and edit the AI-generated invitation content
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* ================================================== */}
                        {/* CONTENT LABELS */}
                        {/* ================================================== */}

                        <div className="mt-5 grid grid-cols-5 overflow-hidden rounded-t-lg border border-white/[0.06] bg-black/20">

                            <div className="border-r border-white/[0.05] px-2 py-2 text-[8px] font-medium text-slate-500 sm:px-3">
                                Title
                            </div>

                            <div className="border-r border-white/[0.05] px-2 py-2 text-[8px] font-medium text-slate-400 sm:px-3">
                                Invitation Message
                            </div>

                            <div className="border-r border-white/[0.05] px-2 py-2 text-[8px] font-medium text-slate-500 sm:px-3">
                                Short Description
                            </div>

                            <div className="border-r border-white/[0.05] px-2 py-2 text-[8px] font-medium text-slate-500 sm:px-3">
                                RSVP Message
                            </div>

                            <div className="px-2 py-2 text-[8px] font-medium text-slate-500 sm:px-3">
                                WhatsApp Message
                            </div>

                        </div>

                        {/* ================================================== */}
                        {/* PREVIOUS / NEXT */}
                        {/* DIRECTLY ABOVE INPUT */}
                        {/* ================================================== */}

                        <div className="flex items-center justify-between border-x border-white/[0.06] bg-black/10 px-3 py-2.5">

                            <button
                                type="button"
                                onClick={
                                    handlePrevious
                                }
                                disabled={
                                    result
                                        .variations
                                        .length <=
                                    1
                                }
                                className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[10px] font-medium text-slate-400 transition hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300 disabled:cursor-not-allowed disabled:opacity-30"
                            >

                                <ChevronLeftIcon />

                                Previous

                            </button>

                            <div className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[9px] text-slate-500">

                                Variation{" "}
                                {selectedVariation +
                                    1}{" "}
                                /{" "}
                                {
                                    result
                                        .variations
                                        .length
                                }

                            </div>

                            <button
                                type="button"
                                onClick={
                                    handleNext
                                }
                                disabled={
                                    result
                                        .variations
                                        .length <=
                                    1
                                }
                                className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[10px] font-medium text-slate-400 transition hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300 disabled:cursor-not-allowed disabled:opacity-30"
                            >

                                Next

                                <ChevronRightIcon />

                            </button>

                        </div>

                        {/* ================================================== */}
                        {/* TITLE */}
                        {/* ================================================== */}

                        <div className="border-x border-white/[0.06] bg-black/10 px-3 pb-2">

                            <input
                                value={
                                    currentVariation.title
                                }
                                onChange={(
                                    event,
                                ) =>
                                    updateCurrentContent(
                                        "title",
                                        event
                                            .target
                                            .value,
                                    )
                                }
                                className="w-full rounded-lg border border-white/[0.07] bg-[#090b11] px-3 py-2.5 text-xs font-medium text-white outline-none transition focus:border-violet-500/40"
                            />

                        </div>

                        {/* ================================================== */}
                        {/* INVITATION MESSAGE */}
                        {/* ================================================== */}

                        <div className="border-x border-white/[0.06] bg-black/10 px-3 py-2">

                            <textarea
                                value={
                                    currentVariation.invitationMessage
                                }
                                onChange={(
                                    event,
                                ) =>
                                    updateCurrentContent(
                                        "invitationMessage",
                                        event
                                            .target
                                            .value,
                                    )
                                }
                                rows={4}
                                className="w-full resize-none rounded-lg border border-white/[0.07] bg-[#090b11] px-3 py-2.5 text-xs leading-5 text-slate-300 outline-none transition focus:border-violet-500/40"
                            />

                        </div>

                        {/* ================================================== */}
                        {/* SHORT DESCRIPTION */}
                        {/* ================================================== */}

                        <div className="border-x border-white/[0.06] bg-black/10 px-3 py-2">

                            <label className="mb-1 block text-[9px] font-medium text-slate-600">
                                Short Description
                            </label>

                            <textarea
                                value={
                                    currentVariation.shortDescription
                                }
                                onChange={(
                                    event,
                                ) =>
                                    updateCurrentContent(
                                        "shortDescription",
                                        event
                                            .target
                                            .value,
                                    )
                                }
                                rows={2}
                                className="w-full resize-none rounded-lg border border-white/[0.07] bg-[#090b11] px-3 py-2.5 text-xs leading-5 text-slate-300 outline-none transition focus:border-violet-500/40"
                            />

                        </div>

                        {/* ================================================== */}
                        {/* RSVP */}
                        {/* ================================================== */}

                        <div className="border-x border-white/[0.06] bg-black/10 px-3 py-2">

                            <label className="mb-1 block text-[9px] font-medium text-slate-600">
                                RSVP Message
                            </label>

                            <textarea
                                value={
                                    currentVariation.rsvpMessage
                                }
                                onChange={(
                                    event,
                                ) =>
                                    updateCurrentContent(
                                        "rsvpMessage",
                                        event
                                            .target
                                            .value,
                                    )
                                }
                                rows={2}
                                className="w-full resize-none rounded-lg border border-white/[0.07] bg-[#090b11] px-3 py-2.5 text-xs leading-5 text-slate-300 outline-none transition focus:border-violet-500/40"
                            />

                        </div>

                        {/* ================================================== */}
                        {/* WHATSAPP */}
                        {/* ================================================== */}

                        <div className="border-x border-white/[0.06] bg-black/10 px-3 py-2">

                            <label className="mb-1 block text-[9px] font-medium text-slate-600">
                                WhatsApp Message
                            </label>

                            <textarea
                                value={
                                    currentVariation.whatsappMessage
                                }
                                onChange={(
                                    event,
                                ) =>
                                    updateCurrentContent(
                                        "whatsappMessage",
                                        event
                                            .target
                                            .value,
                                    )
                                }
                                rows={3}
                                className="w-full resize-none rounded-lg border border-white/[0.07] bg-[#090b11] px-3 py-2.5 text-xs leading-5 text-slate-300 outline-none transition focus:border-violet-500/40"
                            />

                        </div>

                        {/* ================================================== */}
                        {/* ACTION BUTTONS */}
                        {/* ================================================== */}

                        <div className="border-x border-b border-white/[0.06] bg-black/10 px-3 pb-3 pt-2">

                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

                                <button
                                    type="button"
                                    onClick={
                                        handleUseContent
                                    }
                                    className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition ${
                                        used
                                            ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/20"
                                            : "bg-gradient-to-r from-violet-500 to-cyan-400 text-white shadow-lg shadow-violet-500/10 hover:from-violet-400 hover:to-cyan-300"
                                    }`}
                                >

                                    <CheckIcon />

                                    {used
                                        ? "Content & Design Applied"
                                        : "Use This Content & Design"}

                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        generateContent
                                    }
                                    disabled={
                                        loading
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-[10px] font-medium text-slate-400 transition hover:bg-white/[0.04] hover:text-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                                >

                                    <RefreshIcon />

                                    Edit & Regenerate

                                </button>

                            </div>

                        </div>

                    </div>
                )}

        </section>
    );
}