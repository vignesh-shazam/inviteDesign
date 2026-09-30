import Link from "next/link";
import SparkleLink from "@/components/ui/SparkleLink";
import SparkleButton from "@/components/ui/SparkleButton";

type UserHomePageProps = {
    userName?: string;
};

export default function UserHomePage({
    userName,
}: UserHomePageProps) {
    const displayName =
        userName?.trim() || "there";

    return (
        <main className="min-h-screen bg-slate-950">
            {/* Welcome Hero */}
            <section className="relative overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(139,92,246,0.18),_transparent_45%)]" />

                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
                            MyInviteVerse
                        </p>

                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            Welcome back, {displayName} 👋
                        </h1>

                        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
                            Create, customize, and share beautiful invitations
                            for your special moments.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <SparkleLink
                                href="/create"
                                className="inline-flex items-center justify-center rounded-full bg-violet-500 px-7 py-3.5 font-semibold text-white transition hover:bg-violet-400"
                            >
                                + Create Invitation
                            </SparkleLink>

                            <Link
                                href="/invitations"
                                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-7 py-3.5 font-semibold text-slate-200 transition hover:border-violet-500/50 hover:bg-violet-500/10"
                            >
                                My Invitations
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="mx-auto max-w-7xl px-6 py-12">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
                        Workspace
                    </p>

                    <h2 className="mt-3 text-2xl font-bold text-white">
                        Quick Actions
                    </h2>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <SparkleLink
                        href="/create"
                        className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-slate-900"
                    >
                        <span className="text-2xl">✦</span>

                        <h3 className="mt-4 text-lg font-semibold text-white">
                            Create Invitation
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Start a new invitation from a beautiful design.
                        </p>
                    </SparkleLink>

                    <Link
                        href="/invitations"
                        className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-slate-900"
                    >
                        <span className="text-2xl">◈</span>

                        <h3 className="mt-4 text-lg font-semibold text-white">
                            My Invitations
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Manage, edit, preview, and share your invitations.
                        </p>
                    </Link>

                    <Link
                        href="/designs"
                        className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-slate-900"
                    >
                        <span className="text-2xl">◇</span>

                        <h3 className="mt-4 text-lg font-semibold text-white">
                            Explore Designs
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Discover invitation designs for every occasion.
                        </p>
                    </Link>
                </div>
            </section>

            {/* Recent Invitations Placeholder */}
            <section className="mx-auto max-w-7xl px-6 pb-20">
                <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
                                Your Invitations
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-white">
                                Recent Invitations
                            </h2>

                            <p className="mt-2 text-sm text-slate-400">
                                Your invitation list will appear here.
                            </p>
                        </div>

                        <Link
                            href="/invitations"
                            className="text-sm font-semibold text-violet-400 transition hover:text-violet-300"
                        >
                            View All →
                        </Link>
                    </div>

                    <div className="mt-8 rounded-2xl border border-dashed border-slate-700 px-6 py-12 text-center">
                        <p className="text-slate-400">
                            Ready to create your first invitation?
                        </p>

                        <SparkleLink
                            href="/create"
                            className="mt-5 inline-flex rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
                        >
                            Create Your First Invitation
                        </SparkleLink>
                    </div>
                </div>
            </section>
        </main>
    );
}