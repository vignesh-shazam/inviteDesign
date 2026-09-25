import InvitationScene from "@/components/invitation/3d/InvitationScene";
import { getTemplateById } from "@/lib/templates";

export default function ThreeDTestPage() {
  const template = getTemplateById("elegant-wedding");

  if (!template) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            Phase 4 — 3D Engine
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            3D Invitation Preview
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Testing the Three.js invitation scene with the selected template.
          </p>
        </div>

        <InvitationScene
          template={template}
          title="You're Invited"
          date="Saturday, 24 October 2026"
          venue="Chennai, Tamil Nadu"
        />
      </div>
    </main>
  );
}