import Link from "next/link";

type EventCategory = {
    title: string;
    description: string;
    image: string;
};

type DesignModel = {
    title: string;
    description: string;
    image: string;
};

const eventCategories: EventCategory[] = [
    {
        title: "Love Proposals",
        description: "Create an invitation for anything special.",
        image: "/images/templates/loveproposal.webp",
    },
    {
        title: "Engagement",
        description: "Celebrate your special beginning.",
        image: "/images/templates/engagement.webp",
    },
    {
        title: "Wedding",
        description: "Create a memorable wedding invitation.",
        image: "/images/templates/wedding.webp",
    },
    {
        title: "Baby Shower",
        description: "Welcome a beautiful new beginning.",
        image: "/images/templates/babyshower.webp",
    },
    {
        title: "Birthday",
        description: "Make their special day unforgettable.",
        image: "/images/templates/birthday.webp",
    },
    {
        title: "House Warming",
        description: "Celebrate your new home.",
        image: "/images/templates/housewarming.webp",
    },
    {
        title: "Occasions",
        description: "Celebrate every special moment.",
        image: "/images/templates/occasions.webp",
    },
];

const designModels: DesignModel[] = [
    {
        title: "2D Invitations",
        description: "Elegant and modern digital invitations.",
        image: "/images/designs/2d.webp",
    },
    {
        title: "3D Invitations",
        description: "Immersive and interactive 3D experiences.",
        image: "/images/designs/3d.webp",
    },
    {
        title: "Video Invitations",
        description: "Engaging video invitations with animations.",
        image: "/images/designs/video.webp",
    },
];

const steps = [
    {
        number: "01",
        title: "Choose a Design",
        description: "Pick a beautiful invitation style for your occasion.",
    },
    {
        number: "02",
        title: "Customize",
        description: "Add your event details and make it uniquely yours.",
    },
    {
        number: "03",
        title: "Preview",
        description: "See how your invitation looks before sharing.",
    },
    {
        number: "04",
        title: "Share",
        description: "Send your invitation instantly with one simple link.",
    },
];

export default function PublicLandingPage() {
    return (
        <main className="overflow-hidden bg-slate-950 text-white">

            {/* =========================================================
                HERO
            ========================================================== */}
            <section className="relative border-b border-white/10">

                {/* Background */}
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

                    <div className="landing-hero-orb landing-hero-orb-left absolute left-[5%] top-0 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[140px]" />

                    <div className="landing-hero-orb landing-hero-orb-right absolute right-[5%] top-[20%] h-[450px] w-[450px] rounded-full bg-fuchsia-600/10 blur-[140px]" />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_45%)]" />

                    <div className="landing-grid absolute inset-0 opacity-40" />

                </div>

                <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8">

                    {/* =================================================
                        HERO CONTENT
                    ================================================== */}
                    <div className="max-w-2xl">

                        {/* Label */}
                        <div className="landing-hero-item landing-delay-1 mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-300 backdrop-blur">

                            <span className="landing-status-dot h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.9)]" />

                            Create • Celebrate • Share

                        </div>

                        {/* Heading */}
                        <h1 className="landing-hero-item landing-delay-2 text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">

                            Beautiful Invitations

                            <span className="mt-3 block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-300 bg-clip-text text-transparent">
                                for Your Special Moments
                            </span>

                        </h1>

                        {/* Description */}
                        <p className="landing-hero-item landing-delay-3 mt-7 max-w-xl text-lg leading-8 text-slate-300">

                            Create stunning 2D, 3D, and video invitations in minutes.
                            Make every celebration memorable with MyInviteVerse.

                        </p>

                        {/* CTA */}
                        <div className="landing-hero-item landing-delay-4 mt-9 flex flex-col gap-4 sm:flex-row">

                            <Link
                                href="/login"
                                className="group inline-flex items-center justify-center rounded-full border border-violet-300/50 bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_0_45px_rgba(139,92,246,0.4)] active:translate-y-0 active:scale-95"
                            >
                                Create Invitation

                                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>

                            </Link>

                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-violet-500/10 active:translate-y-0 active:scale-95"
                            >
                                Explore Designs
                            </Link>

                        </div>

                        {/* Features */}
                        <div className="landing-hero-item landing-delay-5 mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">

                            <span className="transition-colors duration-300 hover:text-violet-300">
                                ✦ Easy to Customize
                            </span>

                            <span className="transition-colors duration-300 hover:text-violet-300">
                                ✦ Stunning Designs
                            </span>

                            <span className="transition-colors duration-300 hover:text-violet-300">
                                ✦ Share Instantly
                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        HERO VISUAL - VIDEO SHOWCASE
                    ================================================== */}
                    <div className="relative mx-auto w-full max-w-xl">

                        {/* Video Glow */}
                        <div className="landing-video-glow pointer-events-none absolute inset-10 rounded-full bg-violet-600/20 blur-[100px]" />

                        {/* Floating Preview */}
                        <div className="landing-preview-float relative">

                            {/* Outer Card */}
                            <div className="relative rounded-[2rem] border border-violet-400/25 bg-white/[0.035] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 hover:border-violet-300/40 hover:shadow-[0_35px_110px_rgba(139,92,246,0.2)]">

                                {/* Inner Card */}
                                <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/90 p-4">

                                    {/* Preview Header */}
                                    <div className="mb-4 flex items-center justify-between">

                                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                                            Invitation Preview
                                        </span>

                                        <span className="landing-live-badge inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold text-emerald-300">

                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

                                            Live Preview

                                        </span>

                                    </div>


                                    {/* Video Container */}
                                    <div className="landing-video-container relative overflow-hidden rounded-2xl border border-violet-400/20 bg-slate-950">

                                        <video
                                            className="landing-showcase-video aspect-[4/5] w-full object-cover"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                            aria-label="MyInviteVerse invitation showcase"
                                        >

                                            <source
                                                src="/videos/invitation-showcase.mp4"
                                                type="video/mp4"
                                            />

                                            Your browser does not support the video element.

                                        </video>


                                        {/* Video Overlay */}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-violet-950/10" />


                                        {/* Inner Glow */}
                                        <div className="landing-video-inner-glow pointer-events-none absolute inset-0" />


                                        {/* Bottom Label */}
                                        <div className="absolute bottom-5 left-5 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur-xl">
                                            Interactive Invitation
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================================
                EVENT CATEGORIES
            ========================================================== */}
            <section className="relative border-b border-white/10 py-24">

                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.10),transparent_45%)]" />

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    {/* Section Heading */}
                    <div className="landing-section-heading mx-auto max-w-2xl text-center">

                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
                            Explore by Event
                        </p>

                        <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                            Choose Your Event
                        </h2>

                        <p className="mt-5 text-slate-400">
                            Start with the occasion you are celebrating and discover the
                            right invitation experience.
                        </p>

                    </div>


                    {/* Event Cards */}
                    <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        {eventCategories.map((event, index) => (
                            <Link
                                key={event.title}
                                href="/login"
                                className={`landing-card landing-card-delay-${Math.min(index + 1, 5)} group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-3 transition-all duration-500 hover:-translate-y-2 hover:border-violet-400/50 hover:bg-violet-500/[0.06] hover:shadow-[0_18px_50px_rgba(139,92,246,0.14)] active:translate-y-0 active:scale-[0.98]`}
                            >

                                {/* Thumbnail */}
                                <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-slate-900">

                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />

                                </div>


                                {/* Content */}
                                <div className="px-2 pb-2 pt-4">

                                    <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-violet-300">
                                        {event.title}
                                    </h3>

                                    <p className="mt-2 min-h-10 text-sm leading-5 text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                                        {event.description}
                                    </p>

                                    <div className="mt-3 flex items-center text-xs font-medium text-violet-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                                        Explore
                                        <span className="ml-1">→</span>
                                    </div>

                                </div>

                            </Link>
                        ))}

                    </div>

                </div>

            </section>


            {/* =========================================================
                DESIGN MODELS
            ========================================================== */}
            <section className="relative border-b border-white/10 py-24">

                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.12),transparent_45%)]" />

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    {/* Section Heading */}
                    <div className="landing-section-heading mx-auto max-w-2xl text-center">

                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
                            Explore Invitation Experiences
                        </p>

                        <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                            Choose Your Designs
                        </h2>

                        <p className="mt-5 text-slate-400">
                            Choose the format that brings your special moment to life.
                            More designs are coming soon.
                        </p>

                    </div>


                    {/* Design Cards */}
                    <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">

                        {designModels.map((model, index) => (
                            <div
                                key={model.title}
                                className={`landing-card landing-card-delay-${index + 2} group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-3 transition-all duration-500 hover:-translate-y-2 hover:border-violet-400/60 hover:bg-violet-500/[0.05] hover:shadow-[0_20px_60px_rgba(139,92,246,0.16)]`}
                            >

                                {/* Thumbnail */}
                                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900">

                                    <img
                                        src={model.image}
                                        alt={model.title}
                                        className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />

                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                </div>


                                {/* Content */}
                                <div className="px-2 pb-2 pt-5 text-center">

                                    <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-violet-300">
                                        {model.title}
                                    </h3>

                                    <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
                                        {model.description}
                                    </p>


                                    {/* Coming Soon */}
                                    <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400 transition-all duration-300 group-hover:border-violet-400/30 group-hover:bg-violet-500/[0.06] group-hover:text-violet-300">

                                        <span className="transition-transform duration-300 group-hover:scale-110">
                                            🔒
                                        </span>

                                        <span>
                                            Coming Soon
                                        </span>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </section>


            {/* =========================================================
                HOW IT WORKS
            ========================================================== */}
            <section
                id="how-it-works"
                className="relative border-b border-white/10 py-24"
            >

                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.08),transparent_45%)]" />

                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    {/* Heading */}
                    <div className="landing-section-heading mx-auto max-w-2xl text-center">

                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
                            Simple Steps
                        </p>

                        <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                            How It Works
                        </h2>

                        <p className="mt-5 text-slate-400">
                            Create and share your invitation in just a few simple steps.
                        </p>

                    </div>


                    {/* Steps */}
                    <div className="relative mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-4">

                        {steps.map((step, index) => (
                            <div
                                key={step.number}
                                className={`landing-step landing-card-delay-${index + 1} group relative rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-violet-400/40 hover:bg-violet-500/[0.04] hover:shadow-[0_20px_50px_rgba(139,92,246,0.10)]`}
                            >

                                {/* Number */}
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/10 text-sm font-bold text-violet-300 transition-all duration-300 group-hover:scale-110 group-hover:border-violet-300/70 group-hover:bg-violet-500/20 group-hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]">
                                    {step.number}
                                </span>

                                <h3 className="mt-6 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-violet-300">
                                    {step.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-400">
                                    {step.description}
                                </p>

                                {/* Small Hover Indicator */}
                                <div className="absolute bottom-0 left-7 right-7 h-px origin-left scale-x-0 bg-gradient-to-r from-violet-400 to-fuchsia-400 transition-transform duration-500 group-hover:scale-x-100" />

                            </div>
                        ))}

                    </div>

                </div>

            </section>


            {/* =========================================================
                FINAL CTA
            ========================================================== */}
            <section className="px-6 py-24">

                <div className="landing-cta-card relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-violet-400/30 bg-gradient-to-br from-violet-950/80 via-slate-900 to-fuchsia-950/60 px-6 py-16 text-center shadow-[0_20px_80px_rgba(139,92,246,0.12)] sm:px-12">

                    {/* Glow */}
                    <div className="landing-cta-glow pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />

                    {/* Decorative Glow */}
                    <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-[90px]" />

                    <div className="relative">

                        <p className="landing-cta-item text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">
                            Ready to Get Started?
                        </p>

                        <h2 className="landing-cta-item landing-delay-2 mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                            Create Your First Invitation
                        </h2>

                        <p className="landing-cta-item landing-delay-3 mx-auto mt-5 max-w-2xl text-slate-300">
                            Turn your special moment into an invitation your guests will
                            remember.
                        </p>

                        <div className="landing-cta-item landing-delay-4 mt-8 flex flex-col justify-center gap-4 sm:flex-row">

                            <Link
                                href="/signup"
                                className="rounded-full border border-violet-300/60 bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_0_35px_rgba(139,92,246,0.35)] active:translate-y-0 active:scale-95"
                            >
                                Sign Up Now
                            </Link>

                            <Link
                                href="/login"
                                className="rounded-full border border-white/15 bg-white/[0.04] px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:bg-white/[0.08] active:translate-y-0 active:scale-95"
                            >
                                Login
                            </Link>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}