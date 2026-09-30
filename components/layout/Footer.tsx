import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block text-xl font-bold tracking-tight"
            >
              <span className="text-white">My</span>
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                InviteVerse
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
              Create beautiful interactive invitations and share memorable
              moments with the people who matter.
            </p>

            <p className="mt-6 text-xs text-slate-500">
              Created by{" "}
              <span className="font-semibold text-violet-400">
                VigneshDurai
              </span>
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-slate-400 transition-colors hover:text-violet-300"
              >
                Home
              </Link>

              <Link
                href="/login"
                className="text-sm text-slate-400 transition-colors hover:text-violet-300"
              >
                Designs
              </Link>

              <a
                href="#how-it-works"
                className="text-sm text-slate-400 transition-colors hover:text-violet-300"
              >
                How It Works
              </a>
            </div>
          </div>

          {/* Create */}
          <div>
            <h3 className="text-sm font-semibold text-white">Create</h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/login"
                className="text-sm text-slate-400 transition-colors hover:text-violet-300"
              >
                Create Invitation
              </Link>

              <Link
                href="/login"
                className="text-sm text-slate-400 transition-colors hover:text-violet-300"
              >
                2D Invitations
              </Link>

              <Link
                href="/login"
                className="text-sm text-slate-400 transition-colors hover:text-violet-300"
              >
                3D Invitations
              </Link>

              <Link
                href="/login"
                className="text-sm text-slate-400 transition-colors hover:text-violet-300"
              >
                Video Invitations
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-white">Account</h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/login"
                className="text-sm text-slate-400 transition-colors hover:text-violet-300"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="text-sm text-slate-400 transition-colors hover:text-violet-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MyInviteVerse. All rights reserved.</p>

          <div className="flex gap-5">
            <span className="cursor-pointer transition-colors hover:text-slate-300">
              Privacy
            </span>

            <span className="cursor-pointer transition-colors hover:text-slate-300">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}