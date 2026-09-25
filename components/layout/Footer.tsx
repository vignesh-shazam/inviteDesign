import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-white"
            >
              Invite<span className="text-violet-400">Design</span>
            </Link>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
              Create beautiful interactive invitations and share memorable
              moments with the people who matter.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <Link href="/designs" className="transition hover:text-white">
              Designs
            </Link>

            <Link
              href="/invitations"
              className="transition hover:text-white"
            >
              My Invitations
            </Link>

            <Link href="/create" className="transition hover:text-white">
              Create Invitation
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} InviteDesign. All rights reserved.
        </div>
      </div>
    </footer>
  );
}