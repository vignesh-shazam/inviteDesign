import InvitationPreview from "@/components/invitation/InvitationPreview";

export default function PreviewPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            Invitation Preview
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Preview your invitation
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            This is how your invitation can appear to your guests.
          </p>
        </div>

        <InvitationPreview
          title="You're Invited"
          eventType="Wedding Celebration"
          date="Saturday, 24 October 2026"
          venue="Chennai, Tamil Nadu"
        />
      </div>
    </main>
  );
}