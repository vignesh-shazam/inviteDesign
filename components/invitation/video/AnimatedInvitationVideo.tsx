"use client";

import type {
    InvitationAIContent,
    InvitationAIDesign,
} from "@/lib/ai/aiTypes";

type AnimatedInvitationVideoProps = {
    eventName: string;
    hostNames?: string;
    eventDate?: string;
    eventTime?: string;
    venue?: string;
    content?: InvitationAIContent | null;
    design?: InvitationAIDesign;
};

export default function AnimatedInvitationVideo({
    eventName,
    hostNames,
    eventDate,
    eventTime,
    venue,
    content,
    design,
}: AnimatedInvitationVideoProps) {
    const title =
        content?.title ||
        eventName ||
        "You're Invited";

    const message =
        content?.invitationMessage ||
        "Join us for a beautiful celebration.";

    const style =
        design?.style ||
        "elegant";

    const isDark =
        design?.colorTheme ===
            "dark-cinematic" ||
        design?.colorTheme ===
            "metallic-night";

    return (
        <div
            className={`relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl ${
                isDark
                    ? "bg-[#09070d]"
                    : "bg-[#f8f3ed]"
            }`}
        >
            {/* Background */}
            <div
                className={`absolute inset-0 ${
                    isDark
                        ? "bg-[radial-gradient(circle_at_50%_25%,rgba(139,92,246,0.22),transparent_38%),radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.12),transparent_35%),#09070d]"
                        : "bg-[radial-gradient(circle_at_50%_25%,rgba(251,191,36,0.20),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.10),transparent_35%),#f8f3ed]"
                }`}
            />

            {/* Cinematic glow */}
            <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.08),transparent_45%)]" />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({
                    length: 18,
                }).map((_, index) => (
                    <span
                        key={index}
                        className={`absolute h-1 w-1 rounded-full ${
                            isDark
                                ? "bg-amber-200/60"
                                : "bg-amber-500/50"
                        }`}
                        style={{
                            left: `${8 + ((index * 17) % 84)}%`,
                            top: `${5 + ((index * 29) % 90)}%`,
                            animation:
                                `inviteFloat ${
                                    4 +
                                    (index % 4)
                                }s ease-in-out ${
                                    (index % 5) *
                                    0.6
                                }s infinite`,
                        }}
                    />
                ))}
            </div>

            {/* Decorative circles */}
            <div className="absolute left-1/2 top-[18%] h-44 w-44 -translate-x-1/2 rounded-full border border-amber-300/20 animate-[inviteRotate_18s_linear_infinite]" />

            <div className="absolute left-1/2 top-[18%] h-32 w-32 -translate-x-1/2 rounded-full border border-white/10 animate-[inviteRotateReverse_14s_linear_infinite]" />

            {/* Decorative flowers */}
            <div className="absolute left-5 top-8 text-4xl opacity-40 animate-[inviteSway_5s_ease-in-out_infinite]">
                ✿
            </div>

            <div className="absolute right-5 top-20 text-3xl opacity-30 animate-[inviteSway_6s_ease-in-out_1s_infinite]">
                ❀
            </div>

            <div className="absolute bottom-20 left-6 text-3xl opacity-30 animate-[inviteSway_5s_ease-in-out_2s_infinite]">
                ✿
            </div>

            <div className="absolute bottom-10 right-8 text-4xl opacity-30 animate-[inviteSway_7s_ease-in-out_infinite]">
                ❀
            </div>

            {/* Main content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
                {/* Top label */}
                <div className="animate-[inviteFadeDown_2s_ease-out_both]">
                    <p
                        className={`text-[9px] uppercase tracking-[0.45em] ${
                            isDark
                                ? "text-amber-200/70"
                                : "text-amber-700/70"
                        }`}
                    >
                        You are invited
                    </p>
                </div>

                {/* Divider */}
                <div className="my-6 h-px w-16 animate-[inviteExpand_2s_ease-out_0.5s_both] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

                {/* Hosts */}
                {hostNames && (
                    <p
                        className={`mb-5 text-[11px] tracking-[0.2em] animate-[inviteFadeUp_2s_ease-out_0.8s_both] ${
                            isDark
                                ? "text-slate-300"
                                : "text-slate-600"
                        }`}
                    >
                        {hostNames}
                    </p>
                )}

                {/* Title */}
                <h2
                    className={`max-w-[280px] text-3xl font-serif leading-tight animate-[inviteTitleReveal_2.5s_ease-out_1s_both] ${
                        isDark
                            ? "text-white"
                            : "text-slate-900"
                    }`}
                >
                    {title}
                </h2>

                {/* Message */}
                <p
                    className={`mt-6 max-w-[250px] text-[11px] leading-6 animate-[inviteFadeUp_2s_ease-out_1.7s_both] ${
                        isDark
                            ? "text-slate-400"
                            : "text-slate-600"
                    }`}
                >
                    {message}
                </p>

                {/* Event details */}
                <div className="mt-8 space-y-2 animate-[inviteFadeUp_2s_ease-out_2.2s_both]">
                    {eventDate && (
                        <p
                            className={`text-[10px] tracking-[0.15em] ${
                                isDark
                                    ? "text-amber-200/80"
                                    : "text-amber-700"
                            }`}
                        >
                            {eventDate}
                        </p>
                    )}

                    {eventTime && (
                        <p
                            className={`text-[9px] ${
                                isDark
                                    ? "text-slate-500"
                                    : "text-slate-500"
                            }`}
                        >
                            {eventTime}
                        </p>
                    )}

                    {venue && (
                        <p
                            className={`text-[9px] ${
                                isDark
                                    ? "text-slate-500"
                                    : "text-slate-500"
                            }`}
                        >
                            {venue}
                        </p>
                    )}
                </div>

                {/* Bottom ornament */}
                <div className="absolute bottom-12 animate-[inviteFadeUp_2s_ease-out_3s_both]">
                    <span
                        className={`text-xl ${
                            style ===
                            "luxury"
                                ? "text-amber-300"
                                : isDark
                                  ? "text-amber-200/70"
                                  : "text-amber-700/60"
                        }`}
                    >
                        ✦
                    </span>
                </div>
            </div>

            {/* Vignette */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.30)_100%)]" />

            <style jsx>{`
                @keyframes inviteFloat {
                    0%,
                    100% {
                        transform: translateY(0)
                            scale(1);
                        opacity: 0.25;
                    }

                    50% {
                        transform: translateY(-28px)
                            scale(1.5);
                        opacity: 0.8;
                    }
                }

                @keyframes inviteRotate {
                    from {
                        transform: translateX(-50%)
                            rotate(0deg);
                    }

                    to {
                        transform: translateX(-50%)
                            rotate(360deg);
                    }
                }

                @keyframes inviteRotateReverse {
                    from {
                        transform: translateX(-50%)
                            rotate(360deg);
                    }

                    to {
                        transform: translateX(-50%)
                            rotate(0deg);
                    }
                }

                @keyframes inviteSway {
                    0%,
                    100% {
                        transform: rotate(-5deg)
                            translateY(0);
                    }

                    50% {
                        transform: rotate(8deg)
                            translateY(-10px);
                    }
                }

                @keyframes inviteFadeDown {
                    from {
                        opacity: 0;
                        transform: translateY(-18px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes inviteFadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(18px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes inviteExpand {
                    from {
                        opacity: 0;
                        width: 0;
                    }

                    to {
                        opacity: 1;
                        width: 4rem;
                    }
                }

                @keyframes inviteTitleReveal {
                    from {
                        opacity: 0;
                        transform: scale(0.92)
                            translateY(15px);
                        filter: blur(8px);
                    }

                    to {
                        opacity: 1;
                        transform: scale(1)
                            translateY(0);
                        filter: blur(0);
                    }
                }
            `}</style>
        </div>
    );
}