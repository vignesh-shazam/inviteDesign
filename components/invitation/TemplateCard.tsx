import Link from "next/link";
import type { InvitationTemplate } from "@/types/template";

type TemplateCardProps = {
  template: InvitationTemplate;
};

export default function TemplateCard({
  template,
}: TemplateCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition duration-200 hover:-translate-y-1 hover:border-violet-500/50">
      <div
        className="flex aspect-[4/3] items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${template.theme.backgroundColor}, ${template.theme.primaryColor}33, ${template.theme.backgroundColor})`,
        }}
      >
        <div className="text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{
              color: template.theme.accentColor,
            }}
          >
            {template.category}
          </p>

          <h2
            className="mt-4 px-6 text-2xl font-semibold"
            style={{
              color: template.theme.textColor,
              fontFamily: template.typography.headingFont,
            }}
          >
            {template.title}
          </h2>

          <div
            className="mx-auto mt-5 h-px w-16"
            style={{
              backgroundColor: template.theme.accentColor,
            }}
          />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-white">
          {template.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {template.description}
        </p>

        <Link
          href={`/create?template=${template.id}`}
          className="mt-6 block rounded-full bg-violet-500 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-violet-400"
        >
          Use This Design
        </Link>
      </div>
    </article>
  );
}