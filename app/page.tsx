import Button from "@/components/ui/Button";


export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
            Digital Invitations
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Create Invitations
            <span className="block text-violet-400">
              They’ll Remember.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Create beautiful interactive invitations and share them instantly
            with your friends and family.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Button>Create Invitation</Button>

            <Button variant="secondary">
              Explore Designs
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}