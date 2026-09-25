import InvitationTemplate from "@/components/invitation/InvitationTemplate";
import { getTemplateById } from "@/lib/templates";

type PreviewPageProps = {
  searchParams: Promise<{
    template?: string;
  }>;
};

export default async function PreviewPage({
  searchParams,
}: PreviewPageProps) {
  const params = await searchParams;

  const templateId = params.template ?? "elegant-wedding";
  const template = getTemplateById(templateId);

  if (!template) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            Invitation Preview
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white">
            Template not found
          </h1>

          <p className="mt-4 text-slate-400">
            The invitation template you selected does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            Invitation Preview
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {template.title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Preview how your invitation can appear to your guests.
          </p>
        </div>

        <InvitationTemplate
          template={template}
          title="You're Invited"
          date="Saturday, 24 October 2026"
          venue="Chennai, Tamil Nadu"
        />
      </div>
    </main>
  );
}