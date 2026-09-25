import Link from "next/link";

const designs = [
  {
    id: "elegant-wedding",
    title: "Elegant Wedding",
    category: "Wedding",
    description: "A timeless design for an elegant wedding celebration.",
  },
  {
    id: "royal-wedding",
    title: "Royal Celebration",
    category: "Wedding",
    description: "A luxurious invitation for a grand celebration.",
  },
  {
    id: "modern-birthday",
    title: "Modern Birthday",
    category: "Birthday",
    description: "A stylish and modern design for a memorable birthday.",
  },
  {
    id: "classic-engagement",
    title: "Classic Engagement",
    category: "Engagement",
    description: "A sophisticated invitation for your engagement ceremony.",
  },
  {
    id: "baby-shower",
    title: "Little Celebration",
    category: "Baby Shower",
    description: "A beautiful invitation for a joyful baby shower.",
  },
  {
    id: "minimal-event",
    title: "Modern Minimal",
    category: "Special Event",
    description: "A clean and minimal invitation for any special occasion.",
  },
];

const categories = [
  "All",
  "Wedding",
  "Birthday",
  "Engagement",
  "Baby Shower",
  "Special Event",
];

export default function DesignsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            Invitation Designs
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Find a design for your occasion
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Explore our collection of invitation styles and choose the one
            that fits your celebration.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                index === 0
                  ? "bg-violet-500 text-white"
                  : "border border-slate-700 text-slate-300 hover:border-violet-400 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Design Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {designs.map((design) => (
            <article
              key={design.id}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition duration-200 hover:-translate-y-1 hover:border-violet-500/50"
            >
              {/* Design Preview */}
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-violet-950 via-slate-900 to-slate-950">
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
                    {design.category}
                  </p>

                  <h2 className="mt-4 px-6 text-2xl font-semibold text-white">
                    {design.title}
                  </h2>

                  <div className="mx-auto mt-5 h-px w-16 bg-violet-400/50" />
                </div>
              </div>

              {/* Design Details */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">
                  {design.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {design.description}
                </p>

                <Link
                  href={`/create?template=${design.id}`}
                  className="mt-6 block rounded-full bg-violet-500 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-violet-400"
                >
                  Use This Design
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}