import Link from "next/link";

const designCategories = [
  {
    id: "2d",
    title: "2D Designs",
    description:
      "Elegant and modern invitation templates for every occasion.",
    badge: "2D",
    gradient:
      "from-violet-500/25 via-fuchsia-500/10 to-transparent",
    border:
      "hover:border-violet-500/40",
    templates: [
      {
        title: "Elegant Wedding",
        type: "Wedding",
        style: "Classic",
      },
      {
        title: "Modern Birthday",
        type: "Birthday",
        style: "Modern",
      },
      {
        title: "Classic Engagement",
        type: "Engagement",
        style: "Elegant",
      },
      {
        title: "Baby Shower",
        type: "Baby Shower",
        style: "Soft",
      },
    ],
  },
  {
    id: "3d",
    title: "3D Designs",
    description:
      "Interactive invitation experiences with immersive 3D visuals.",
    badge: "3D",
    gradient:
      "from-cyan-500/25 via-blue-500/10 to-transparent",
    border:
      "hover:border-cyan-500/40",
    templates: [
      {
        title: "3D Wedding",
        type: "Wedding",
        style: "Immersive",
      },
      {
        title: "3D Birthday",
        type: "Birthday",
        style: "Interactive",
      },
      {
        title: "3D Engagement",
        type: "Engagement",
        style: "Premium",
      },
      {
        title: "3D Celebration",
        type: "Special Event",
        style: "Luxury",
      },
    ],
  },
  {
    id: "video",
    title: "Video Designs",
    description:
      "Animated invitation templates designed for sharing and social media.",
    badge: "VIDEO",
    gradient:
      "from-rose-500/25 via-orange-500/10 to-transparent",
    border:
      "hover:border-rose-500/40",
    templates: [
      {
        title: "Wedding Story",
        type: "Wedding",
        style: "Cinematic",
      },
      {
        title: "Birthday Celebration",
        type: "Birthday",
        style: "Animated",
      },
      {
        title: "Save the Date",
        type: "Wedding",
        style: "Minimal",
      },
      {
        title: "Baby Shower Video",
        type: "Baby Shower",
        style: "Cute",
      },
    ],
  },
];

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.4 5.6L5 10l5.6 1.4L12 17l1.4-5.6L19 10l-5.6-1.4Z" />
      <path d="m19 16-.7 2.3L16 19l2.3.7L19 22l.7-2.3L22 19l-2.3-.7Z" />
    </svg>
  );
}

function TemplatePreview({
  category,
  index,
}: {
  category: string;
  index: number;
}) {
  const styles = [
    "from-violet-500/30 via-fuchsia-500/20 to-slate-950",
    "from-blue-500/30 via-cyan-500/20 to-slate-950",
    "from-rose-500/30 via-orange-500/20 to-slate-950",
    "from-emerald-500/25 via-teal-500/20 to-slate-950",
  ];

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br ${
        styles[index % styles.length]
      }`}
    >
      {/* Decorative shapes */}
      <div className="absolute left-1/2 top-1/2 h-24 w-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/20 bg-white/[0.06] shadow-2xl backdrop-blur-sm">
        <div className="absolute left-1/2 top-5 h-1 w-8 -translate-x-1/2 rounded-full bg-white/50" />

        <div className="absolute left-1/2 top-9 w-12 -translate-x-1/2 text-center text-[7px] font-semibold uppercase tracking-[0.18em] text-white/70">
          {category}
        </div>

        <div className="absolute bottom-7 left-1/2 h-px w-10 -translate-x-1/2 bg-white/20" />

        <div className="absolute bottom-4 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-white/40" />
      </div>

      <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/20 px-2 py-1 text-[8px] uppercase tracking-wider text-white/60 backdrop-blur">
        Preview
      </div>
    </div>
  );
}

export default function DesignsPage() {
  return (
    <main className="min-h-screen bg-[#070914] px-4 pb-16 pt-20 text-white sm:px-6 lg:px-8 lg:pt-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-violet-400">
                <SparkleIcon />

                <span className="text-xs font-medium uppercase tracking-[0.18em]">
                  Design Library
                </span>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Designs
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Explore beautiful invitation templates and choose
                the perfect style for your next event.
              </p>
            </div>

            <Link
              href="/create"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            >
              Create Invitation
              <ArrowIcon />
            </Link>
          </div>
        </section>

        {/* Category cards */}
        <section className="grid gap-5 lg:grid-cols-3">
          {designCategories.map((category) => (
            <div
              key={category.id}
              className={`group overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] transition-all duration-300 ${category.border}`}
            >
              {/* Category visual */}
              <div
                className={`relative h-48 overflow-hidden bg-gradient-to-br ${category.gradient}`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_35%)]" />

                <div className="absolute left-6 top-6">
                  <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur">
                    {category.badge}
                  </span>
                </div>

                <div className="absolute bottom-5 left-6">
                  <h2 className="text-xl font-semibold text-white">
                    {category.title}
                  </h2>

                  <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
                    {category.description}
                  </p>
                </div>

                {/* Decorative card stack */}
                <div className="absolute -right-2 top-7 h-32 w-24 rotate-12 rounded-xl border border-white/10 bg-white/[0.04] shadow-xl" />

                <div className="absolute right-8 top-5 h-32 w-24 -rotate-6 rounded-xl border border-white/15 bg-white/[0.08] shadow-xl backdrop-blur-sm">
                  <div className="mx-auto mt-7 h-1 w-8 rounded-full bg-white/30" />
                  <div className="mx-auto mt-3 h-px w-10 bg-white/15" />
                  <div className="mx-auto mt-2 h-px w-7 bg-white/15" />
                </div>
              </div>

              {/* Templates */}
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">
                    Featured Templates
                  </span>

                  <span className="text-[10px] text-slate-600">
                    {category.templates.length} templates
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {category.templates.map(
                    (template, index) => (
                      <Link
                        key={template.title}
                        href="/create"
                        className="group/template overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition hover:border-white/[0.12] hover:bg-white/[0.04]"
                      >
                        <TemplatePreview
                          category={template.type}
                          index={index}
                        />

                        <div className="p-3">
                          <h3 className="truncate text-xs font-medium text-slate-200">
                            {template.title}
                          </h3>

                          <div className="mt-1 flex items-center justify-between gap-2">
                            <span className="truncate text-[10px] text-slate-600">
                              {template.style}
                            </span>

                            <span className="shrink-0 text-slate-600 transition group-hover/template:text-violet-400">
                              <ArrowIcon />
                            </span>
                          </div>
                        </div>
                      </Link>
                    )
                  )}
                </div>

                <Link
                  href="/create"
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] py-2.5 text-xs font-medium text-slate-400 transition hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300"
                >
                  View All {category.title}
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Bottom CTA */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-violet-500/10 bg-gradient-to-r from-violet-500/[0.08] via-fuchsia-500/[0.04] to-transparent p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-base font-semibold text-white sm:text-lg">
                Looking for something unique?
              </h2>

              <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
                Start with a blank invitation and create your own
                design from scratch.
              </p>
            </div>

            <Link
              href="/create"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-violet-500/30 bg-violet-500/10 px-4 py-2.5 text-xs font-semibold text-violet-300 transition hover:bg-violet-500/20 hover:text-violet-200"
            >
              Start From Scratch
              <ArrowIcon />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}