"use client";

import type {
    InvitationAIContent,
    InvitationAIDesign,
} from "@/lib/ai/aiTypes";

import AnimatedInvitationVideo from "./AnimatedInvitationVideo";

type AIVideoPreviewProps = {
    eventType: string;
    eventName: string;
    hostNames?: string;
    eventDate?: string;
    eventTime?: string;
    venue?: string;
    design?: InvitationAIDesign;
    content?: InvitationAIContent | null;
};

export default function AIVideoPreview({
    eventName,
    hostNames,
    eventDate,
    eventTime,
    venue,
    design,
    content,
}: AIVideoPreviewProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-black/20">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                <div>
                    <p className="text-xs font-semibold text-white">
                        Animated Invitation
                    </p>

                    <p className="mt-1 text-[9px] text-slate-600">
                        Live cinematic invitation preview
                    </p>
                </div>

                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[9px] font-medium text-emerald-300">
                    Preview
                </span>
            </div>

            <div className="p-4">
                <AnimatedInvitationVideo
                    eventName={eventName}
                    hostNames={hostNames}
                    eventDate={eventDate}
                    eventTime={eventTime}
                    venue={venue}
                    content={content}
                    design={design}
                />

                <div className="mt-4 rounded-xl border border-violet-500/10 bg-violet-500/[0.04] p-3 text-center">
                    <p className="text-[10px] leading-5 text-slate-500">
                        This animated preview uses
                        your AI-generated invitation
                        content.
                    </p>
                </div>
            </div>
        </div>
    );
}