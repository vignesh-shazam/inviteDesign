"use client";

import Link from "next/link";

type UserHomePageProps = {
    userName: string;
};

type Invitation = {
    id: number;
    title: string;
    category: string;
    date: string;
    image: string;
    status: "Published" | "Draft";
};

/*
 * Temporary dashboard data.
 * Replace with Supabase data after the UI is finalized.
 */
const invitations: Invitation[] = [
    {
        id: 1,
        title: "Arun & Priya",
        category: "Wedding",
        date: "24 October 2026",
        image: "/images/templates/elegant-wedding.webp",
        status: "Published",
    },
    {
        id: 2,
        title: "Rahul's Birthday",
        category: "Birthday",
        date: "15 November 2026",
        image: "/images/templates/modern-birthday.webp",
        status: "Draft",
    },
    {
        id: 3,
        title: "Vijay & Anu",
        category: "Engagement",
        date: "06 December 2026",
        image: "/images/templates/classic-engagement.webp",
        status: "Published",
    },
];

const quickActions = [
    {
        title: "Create Invitation",
        description: "Start a new design",
        icon: "plus",
        href: "/create",
    },
    {
        title: "My Invitations",
        description: "View all invitations",
        icon: "file",
        href: "/invitations",
    },
    {
        title: "Explore Designs",
        description: "Browse templates",
        icon: "palette",
        href: "/designs",
    },
    {
        title: "Profile Settings",
        description: "Manage your account",
        icon: "user",
        href: "/profile",
    },
];

/* =================================================
   ICON
================================================= */

function Icon({
    name,
    size = 16,
}: {
    name: string;
    size?: number;
}) {
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    };

    switch (name) {
        case "plus":
            return (
                <svg {...common}>
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                </svg>
            );

        case "file":
            return (
                <svg {...common}>
                    <path d="M6 3h9l4 4v14H6z" />
                    <path d="M14 3v5h5" />
                    <path d="M9 13h6" />
                    <path d="M9 17h6" />
                </svg>
            );

        case "palette":
            return (
                <svg {...common}>
                    <path d="M12 3a9 9 0 0 0 0 18h1.2a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h2.5a6.5 6.5 0 0 0 0-13Z" />
                    <circle cx="7.5" cy="10" r=".8" />
                    <circle cx="9" cy="6.8" r=".8" />
                    <circle cx="14" cy="6.5" r=".8" />
                </svg>
            );

        case "user":
            return (
                <svg {...common}>
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 21a7 7 0 0 1 14 0" />
                </svg>
            );

        case "search":
            return (
                <svg {...common}>
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="m16 16 4 4" />
                </svg>
            );

        case "bell":
            return (
                <svg {...common}>
                    <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                    <path d="M10 21h4" />
                </svg>
            );

        case "arrow":
            return (
                <svg {...common}>
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                </svg>
            );

        case "eye":
            return (
                <svg {...common}>
                    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                    <circle cx="12" cy="12" r="2.5" />
                </svg>
            );

        case "edit":
            return (
                <svg {...common}>
                    <path d="m4 16 10.5-10.5a2.1 2.1 0 0 1 3 3L7 19l-4 1Z" />
                    <path d="m13 7 4 4" />
                </svg>
            );

        case "more":
            return (
                <svg {...common}>
                    <circle
                        cx="5"
                        cy="12"
                        r="1"
                        fill="currentColor"
                    />
                    <circle
                        cx="12"
                        cy="12"
                        r="1"
                        fill="currentColor"
                    />
                    <circle
                        cx="19"
                        cy="12"
                        r="1"
                        fill="currentColor"
                    />
                </svg>
            );

        default:
            return null;
    }
}

/* =================================================
   MAIN DASHBOARD
================================================= */

export default function UserHomePage({
    userName,
}: UserHomePageProps) {
    const displayName = userName || "Vignesh";

    return (
        <main className="min-h-screen overflow-x-hidden bg-[#050712] text-white">
            {/* =================================================
                BACKGROUND EFFECTS
            ================================================= */}

            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-700/10 blur-[140px]" />

                <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-indigo-600/8 blur-[160px]" />
            </div>

            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <section className="relative min-w-0">
                {/* =================================================
                    DESKTOP TOP BAR

                    Mobile header is handled by DashboardSidebar.
                ================================================= */}

                <div className="hidden h-[72px] items-center justify-between border-b border-white/[0.06] px-5 lg:flex xl:px-8">
                    {/* Brand */}
                    <Link
                        href="/"
                        className="flex shrink-0 items-center gap-2.5"
                    >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold shadow-lg shadow-violet-500/20">
                            M
                        </div>

                        <span className="whitespace-nowrap text-sm font-bold tracking-tight text-white">
                            MyInviteVerse
                        </span>
                    </Link>

                    {/* Right side */}
                    <div className="flex min-w-0 items-center gap-3 xl:gap-4">
                        {/* Notification */}
                        <Link
                            href="/notifications"
                            aria-label="Notifications"
                            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
                        >
                            <Icon name="bell" size={17} />

                            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-violet-500" />
                        </Link>
                    <div className="hidden h-6 w-px bg-white/[0.08] xl:block" />

                    {/* User */}
                    <Link
                        href="/profile"
                        className="flex shrink-0 items-center gap-2 rounded-lg px-1.5 py-1 transition hover:bg-white/[0.04]"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 text-xs font-bold shadow-lg shadow-violet-900/20">
                            {displayName
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div className="hidden xl:block">
                            <p className="text-[10px] text-slate-500">
                                Welcome back,
                            </p>

                            <p className="max-w-[120px] truncate text-xs font-medium text-white">
                                {displayName}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* =================================================
                    DASHBOARD CONTENT
                ================================================= */}

            <div className="mx-auto w-full max-w-[1180px] px-4 py-5 sm:px-6 md:py-6 lg:px-8 lg:py-7">
                {/* =================================================
                        HERO
                    ================================================= */}

                <section className="relative overflow-hidden rounded-xl border border-violet-400/15 bg-gradient-to-r from-[#171338] via-[#151332] to-[#0e1021] p-5 shadow-2xl shadow-violet-950/20 sm:p-6 md:p-7">
                    {/* Glow */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute right-[-60px] top-[-100px] h-64 w-64 rounded-full bg-violet-500/15 blur-[90px]" />

                        <div className="absolute bottom-[-100px] right-[20%] h-52 w-52 rounded-full bg-fuchsia-500/10 blur-[90px]" />
                    </div>

                    <div className="relative z-10 flex min-h-[170px] items-center sm:min-h-[150px]">
                        <div className="relative z-10 max-w-[600px]">
                            <p className="mb-1 text-[11px] font-medium text-violet-300 sm:text-xs">
                                MyInviteVerse
                            </p>

                            <h1 className="text-[20px] font-bold leading-tight tracking-tight text-white sm:text-2xl md:text-[26px]">
                                Welcome back,{" "}
                                {displayName}{" "}
                                <span>👋</span>
                            </h1>

                            <p className="mt-2 max-w-[280px] text-xs leading-5 text-slate-400 sm:max-w-none sm:text-sm">
                                Create something memorable
                                today.
                            </p>

                            <Link
                                href="/create"
                                className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:scale-[1.02] hover:shadow-violet-700/30 focus:outline-none focus:ring-2 focus:ring-violet-400/40"
                            >
                                <Icon
                                    name="plus"
                                    size={13}
                                />

                                Create Invitation
                            </Link>
                        </div>

                        {/* Invitation artwork */}
                        <div className="pointer-events-none absolute right-[-18px] top-1/2 hidden -translate-y-1/2 sm:block md:right-0">
                            <div className="relative h-[110px] w-[145px] rotate-[-5deg] md:h-[125px] md:w-[175px]">
                                <div className="absolute right-2 top-4 h-[88px] w-[110px] rotate-[9deg] rounded-lg border border-violet-300/30 bg-gradient-to-br from-violet-500/80 via-purple-500/60 to-fuchsia-500/70 shadow-2xl shadow-violet-800/40 md:h-[100px] md:w-[125px]">
                                    <div className="absolute inset-3 rounded border border-white/20" />

                                    <div className="absolute left-4 top-5 h-2 w-14 rounded-full bg-white/70 md:w-16" />

                                    <div className="absolute left-4 top-10 h-1.5 w-10 rounded-full bg-white/30 md:w-12" />

                                    <div className="absolute bottom-4 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 rounded-md bg-gradient-to-br from-pink-300 to-violet-200 shadow-lg md:bottom-5 md:h-7 md:w-7" />
                                </div>

                                <div className="absolute left-2 top-8 h-16 w-20 rotate-[-15deg] rounded-md border border-white/10 bg-white/10 backdrop-blur-md md:h-20 md:w-24" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* =================================================
                        STATS
                    ================================================= */}

                <section className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    <StatCard
                        value="3"
                        label="Invitations"
                        icon="file"
                        iconClass="bg-violet-500/10 text-violet-400"
                    />

                    <StatCard
                        value="2"
                        label="Published"
                        icon="eye"
                        iconClass="bg-emerald-500/10 text-emerald-400"
                    />

                    <StatCard
                        value="1"
                        label="Drafts"
                        icon="edit"
                        iconClass="bg-amber-500/10 text-amber-400"
                    />

                    <StatCard
                        value="—"
                        label="Views"
                        icon="eye"
                        iconClass="bg-fuchsia-500/10 text-fuchsia-400"
                    />
                </section>

                {/* =================================================
                        QUICK ACTIONS
                    ================================================= */}

                <section className="mt-6 rounded-xl border border-white/[0.07] bg-[#0a0e1b]/80 p-4 sm:p-5">
                    <div>
                        <h2 className="text-sm font-semibold text-white sm:text-[15px]">
                            Quick Actions
                        </h2>

                        <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-[11px]">
                            Things you can do quickly.
                        </p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {quickActions.map(
                            (action) => (
                                <Link
                                    key={action.title}
                                    href={action.href}
                                    className="group flex min-h-[118px] flex-col items-center justify-center rounded-lg border border-white/[0.06] bg-[#111729] p-3 text-center transition hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-[#141a30] focus:outline-none focus:ring-2 focus:ring-violet-400/30 sm:min-h-[120px]"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-500/20">
                                        <Icon
                                            name={action.icon}
                                            size={16}
                                        />
                                    </div>

                                    <p className="mt-2.5 text-[10px] font-semibold leading-4 text-white sm:text-[11px]">
                                        {action.title}
                                    </p>

                                    <p className="mt-0.5 text-[9px] leading-4 text-slate-500 sm:text-[10px]">
                                        {action.description}
                                    </p>
                                </Link>
                            ),
                        )}
                    </div>
                </section>

                {/* =================================================
                        RECENT INVITATIONS
                    ================================================= */}

                <section className="mt-6 rounded-xl border border-white/[0.07] bg-[#0a0e1b]/80 p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <h2 className="text-sm font-semibold text-white sm:text-[15px]">
                                Recent Invitations
                            </h2>

                            <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-[11px]">
                                Your latest invitation
                                designs.
                            </p>
                        </div>

                        <Link
                            href="/invitations"
                            className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-medium text-violet-400 transition hover:bg-violet-500/10 hover:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
                        >
                            View All

                            <Icon
                                name="arrow"
                                size={11}
                            />
                        </Link>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {invitations.map(
                            (invitation) => (
                                <InvitationCard
                                    key={invitation.id}
                                    invitation={invitation}
                                />
                            ),
                        )}
                    </div>
                </section>

                {/* =================================================
                        EXPLORE INVITATION STYLES
                    ================================================= */}

                <section className="mt-6 rounded-xl border border-white/[0.07] bg-[#0a0e1b]/80 p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <h2 className="text-sm font-semibold text-white sm:text-[15px]">
                                Explore Invitation Styles
                            </h2>

                            <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-[11px]">
                                More designs and templates
                                coming soon!
                            </p>
                        </div>

                        <Link
                            href="/designs"
                            className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-medium text-violet-400 transition hover:bg-violet-500/10 hover:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
                        >
                            View All

                            <Icon
                                name="arrow"
                                size={11}
                            />
                        </Link>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <DesignCard
                            title="2D Invitations"
                            image="/images/templates/modern-minimal.webp"
                        />

                        <DesignCard
                            title="3D Invitations"
                            image="/images/templates/elegant-wedding.webp"
                        />

                        <DesignCard
                            title="Video Invitations"
                            image="/images/templates/classic-engagement.webp"
                        />
                    </div>
                </section>
            </div>
        </section>
        </main >
    );
}

/* =================================================
   STAT CARD
================================================= */

function StatCard({
    value,
    label,
    icon,
    iconClass,
}: {
    value: string;
    label: string;
    icon: string;
    iconClass: string;
}) {
    return (
        <div className="flex min-h-[74px] items-center justify-between rounded-lg border border-white/[0.06] bg-[#0a0e1b] px-3.5 py-3 transition hover:border-white/[0.1] sm:min-h-[78px] sm:px-4">
            <div className="min-w-0">
                <p className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    {value}
                </p>

                <p className="mt-1 truncate text-[9px] text-slate-500 sm:text-[10px]">
                    {label}
                </p>
            </div>

            <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${iconClass}`}
            >
                <Icon
                    name={icon}
                    size={14}
                />
            </div>
        </div>
    );
}

/* =================================================
   INVITATION CARD
================================================= */

function InvitationCard({
    invitation,
}: {
    invitation: Invitation;
}) {
    return (
        <div className="group overflow-hidden rounded-lg border border-white/[0.07] bg-[#101625] transition hover:-translate-y-0.5 hover:border-violet-500/30">
            {/* Image */}
            <div className="relative aspect-[1.55/1] overflow-hidden bg-slate-900">
                <img
                    src={invitation.image}
                    alt={invitation.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* More */}
                <button
                    type="button"
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                    aria-label={`More options for ${invitation.title}`}
                >
                    <Icon
                        name="more"
                        size={13}
                    />
                </button>
            </div>

            {/* Details */}
            <div className="p-3.5">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <h3 className="truncate text-xs font-semibold text-white sm:text-[13px]">
                            {invitation.title}
                        </h3>

                        <p className="mt-1 text-[9px] text-slate-500 sm:text-[10px]">
                            {invitation.category}
                        </p>
                    </div>

                    <span
                        className={`shrink-0 rounded-full px-2 py-1 text-[8px] font-medium sm:text-[9px] ${invitation.status ===
                            "Published"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-amber-500/10 text-amber-400"
                            }`}
                    >
                        {invitation.status}
                    </span>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="truncate text-[9px] text-slate-500 sm:text-[10px]">
                        {invitation.date}
                    </span>

                    <Link
                        href={`/invitations/${invitation.id}`}
                        className="shrink-0 rounded px-1 text-[9px] font-medium text-violet-400 opacity-100 transition hover:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400/30 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                        Open
                    </Link>
                </div>
            </div>
        </div>
    );
}

/* =================================================
   DESIGN CARD
================================================= */

function DesignCard({
    title,
    image,
}: {
    title: string;
    image: string;
}) {
    return (
        <div className="group overflow-hidden rounded-lg border border-violet-500/25 bg-[#111426] transition hover:-translate-y-0.5 hover:border-violet-400/50">
            {/* Image */}
            <div className="relative aspect-[1.75/1] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#080a16] via-transparent to-transparent" />
            </div>

            {/* Bottom */}
            <div className="px-3 pb-3.5 pt-2.5">
                <p className="text-center text-[10px] font-semibold text-white sm:text-[11px]">
                    {title}
                </p>

                <div className="mx-auto mt-2 w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[8px] text-slate-400">
                    Coming Soon
                </div>
            </div>
        </div>
    );
}