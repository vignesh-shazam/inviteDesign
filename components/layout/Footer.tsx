import Link from "next/link";

import ComingSoonButton from "@/components/ui/ComingSoonButton";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-white"
            >
              My<span className="text-violet-400">InviteVerse</span>
            </Link>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
              Create beautiful interactive invitations and share memorable
              moments with the people who matter.
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Created by VigneshDurai
            </p>
          </div>

          {/* Public Navigation */}
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <ComingSoonButton className="text-sm text-slate-400 transition hover:text-white">
              Designs
            </ComingSoonButton>

            <Link href="/login" className="transition hover:text-white">
              Login
            </Link>

            <Link href="/signup" className="transition hover:text-white">
              Sign Up
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} MyInviteVerse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}