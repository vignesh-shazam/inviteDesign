"use client";

import Link from "next/link";

const notifications = [
    {
        id: 1,
        title: "Welcome to MyInviteVerse",
        message:
            "Your account is ready. Start creating your first invitation.",
        time: "Just now",
        unread: true,
    },
    {
        id: 2,
        title: "New invitation templates",
        message:
            "Explore new invitation designs available in MyInviteVerse.",
        time: "1 day ago",
        unread: false,
    },
];

export default function NotificationsPage() {
    return (
        <main className="min-h-screen bg-[#050712] text-white">
            <div className="mx-auto w-full max-w-[1000px] px-4 py-20 sm:px-6 lg:px-8 lg:py-10">
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs font-medium text-slate-400 transition-all duration-200 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                    >
                        <span className="text-sm leading-none">←</span>
                        <span>Dashboard</span>
                    </Link>

                    <h1 className="mt-4 text-2xl font-bold">
                        Notifications
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Stay updated with your MyInviteVerse activity.
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#0a0e1b]">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="flex gap-4 border-b border-white/[0.06] p-4 last:border-b-0 sm:p-5"
                        >
                            <div
                                className={`mt-1 h-9 w-9 shrink-0 rounded-full ${notification.unread
                                        ? "bg-violet-500/15"
                                        : "bg-white/[0.04]"
                                    } flex items-center justify-center text-violet-400`}
                            >
                                <span className="text-sm">●</span>
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-3">
                                    <h2 className="text-sm font-semibold text-white">
                                        {notification.title}
                                    </h2>

                                    {notification.unread && (
                                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet-400" />
                                    )}
                                </div>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    {notification.message}
                                </p>

                                <p className="mt-2 text-[10px] text-slate-600">
                                    {notification.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}