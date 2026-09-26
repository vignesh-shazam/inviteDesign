"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getTemplateById } from "@/lib/templates";
import type { InvitationTemplate as InvitationTemplateType } from "@/types/template";
import ThemeCustomizer from "@/components/invitation/ThemeCustomizer";
import InvitationTemplate from "@/components/invitation/InvitationTemplate";

export default function CreateInvitationPage() {
    const searchParams = useSearchParams();

    const templateId =
        searchParams.get("template") ?? "elegant-wedding";

    const defaultTemplate = getTemplateById(templateId);

    const [selectedTemplate, setSelectedTemplate] =
        useState<InvitationTemplateType>(
            defaultTemplate ??
            getTemplateById("elegant-wedding")!,
        );

    const [eventType, setEventType] = useState(
        selectedTemplate.category,
    );

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [venue, setVenue] = useState("");
    const [message, setMessage] = useState("");

    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const [savedSlug, setSavedSlug] = useState("");

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setSaveMessage("");
        setSavedSlug("");

        if (!title.trim()) {
            setSaveMessage("Please enter an event title.");
            return;
        }

        setIsSaving(true);

        try {
            const response = await fetch("/api/invitations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title.trim(),
                    templateId: selectedTemplate.id,
                    category: eventType,
                    eventDate: date,
                    eventTime: time,
                    venue: venue.trim(),
                    theme: selectedTemplate.theme,
                    typography: selectedTemplate.typography,
                    message: message.trim(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setSaveMessage(
                    data.error ?? "Failed to save invitation.",
                );
                return;
            }

            setSavedSlug(data.invitation.draftId);

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

    return (
        <main className="min-h-screen bg-slate-950 px-6 py-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10">
                    <Link
                        href="/invitations"
                        className="text-sm text-slate-400 transition hover:text-white"
                    >
                        ← Back to My Invitations
                    </Link>

                    <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
                        Invitation Creator
                    </p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Create Invitation
                    </h1>

                    <p className="mt-3 text-slate-400">
                        Add your event details and customize your invitation.
                    </p>
                </div>

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

                <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
                    <div className="space-y-8">
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8"
                        >
                            <div className="space-y-6">
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
                                            setEventType(event.target.value)
                                        }
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
                                    >
                                        <option>Wedding</option>
                                        <option>Birthday</option>
                                        <option>Engagement</option>
                                        <option>Anniversary</option>
                                        <option>Baby Shower</option>
                                        <option>Housewarming</option>
                                        <option>Other</option>
                                    </select>
                                </div>

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
                                            setTitle(event.target.value)
                                        }
                                        placeholder="Arun & Priya Wedding"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-violet-500"
                                    />
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2">
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
                                                setDate(event.target.value)
                                            }
                                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
                                        />
                                    </div>

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
                                                setTime(event.target.value)
                                            }
                                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
                                        />
                                    </div>
                                </div>

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
                                            setVenue(event.target.value)
                                        }
                                        placeholder="Chennai, Tamil Nadu"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-violet-500"
                                    />
                                </div>

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
                                            setMessage(event.target.value)
                                        }
                                        placeholder="We would love to celebrate this special moment with you."
                                        rows={5}
                                        className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-violet-500"
                                    />
                                </div>

                                {saveMessage && (
                                    <div
                                        className={`rounded-xl border px-4 py-3 text-sm ${savedSlug
                                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                                                : "border-red-500/30 bg-red-500/10 text-red-300"
                                            }`}
                                    >
                                        <p>{saveMessage}</p>

                                        {savedSlug && (
                                            <p className="mt-1 text-xs text-emerald-400">
                                                Draft ID: {savedSlug}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="rounded-full bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isSaving
                                            ? "Saving..."
                                            : "Save Draft"}
                                    </button>

                                    <Link
                                        href={`/preview?template=${selectedTemplate.id}`}
                                        className="rounded-full border border-slate-700 px-6 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
                                    >
                                        Preview
                                    </Link>
                                </div>
                            </div>
                        </form>

                        <ThemeCustomizer
                            template={selectedTemplate}
                            originalTemplate={
                                defaultTemplate ?? selectedTemplate
                            }
                            onChange={setSelectedTemplate}
                        />
                    </div>

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
                                    title={
                                        title || "You're Invited"
                                    }
                                    date={
                                        date
                                            ? `${date}${time ? ` • ${time}` : ""}`
                                            : "Saturday, 24 October 2026"
                                    }
                                    venue={
                                        venue ||
                                        "Chennai, Tamil Nadu"
                                    }
                                />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}