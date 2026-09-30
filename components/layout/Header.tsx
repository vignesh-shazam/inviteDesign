"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/db/supabase";
import SparkleButton from "@/components/ui/SparkleButton";

export default function Header() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleDesignsClick() {
    closeMenu();
    router.push("/designs");
  }

  async function handleLogout() {
    try {
      setIsLoggingOut(true);

      const supabase = getSupabaseClient();

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setIsLoggedIn(false);
      closeMenu();

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  }

  useEffect(() => {
    const supabase = getSupabaseClient();

    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(!!user);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {/* =========================================================
          HEADER
      ========================================================== */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between">
            {/* =====================================================
                LOGO
            ====================================================== */}
            <Link
              href="/"
              onClick={closeMenu}
              className="
                text-xl
                font-bold
                tracking-tight
                transition-opacity
                duration-200
                hover:opacity-90
              "
            >
              <span className="text-white">My</span>

              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                InviteVerse
              </span>
            </Link>

            {/* =====================================================
                DESKTOP PUBLIC NAVIGATION
            ====================================================== */}
            {!isLoggedIn && (
              <nav className="hidden items-center gap-1 md:flex">
                {/* HOME */}
                <Link
                  href="/"
                  className="
                    rounded-lg
                    border border-transparent
                    px-4 py-2
                    text-sm font-medium text-slate-300
                    transition-all duration-200 ease-out
                    hover:border-violet-400/30
                    hover:bg-violet-500/10
                    hover:text-violet-300
                    active:scale-95
                    focus:outline-none
                    focus:ring-2
                    focus:ring-violet-400/30
                  "
                >
                  Home
                </Link>

                {/* DESIGNS */}
                <Link
                  href="/login"
                  className="
                    rounded-lg
                    border border-transparent
                    px-4 py-2
                    text-sm font-medium text-slate-300
                    transition-all duration-200 ease-out
                    hover:border-violet-400/30
                    hover:bg-violet-500/10
                    hover:text-violet-300
                    active:scale-95
                    focus:outline-none
                    focus:ring-2
                    focus:ring-violet-400/30
                  "
                >
                  Designs
                </Link>

                {/* HOW IT WORKS */}
                <a
                  href="/#how-it-works"
                  className="
                    rounded-lg
                    border border-transparent
                    px-4 py-2
                    text-sm font-medium text-slate-300
                    transition-all duration-200 ease-out
                    hover:border-violet-400/30
                    hover:bg-violet-500/10
                    hover:text-violet-300
                    active:scale-95
                    focus:outline-none
                    focus:ring-2
                    focus:ring-violet-400/30
                  "
                >
                  How It Works
                </a>
              </nav>
            )}

            {/* =====================================================
                RIGHT SIDE
            ====================================================== */}
            <div className="flex items-center gap-3">
              {!isLoggedIn ? (
                <>
                  {/* =================================================
                      LOGIN
                      Always visible
                  ================================================== */}
                  <Link
                    href="/login"
                    className="
                      rounded-full
                      border border-slate-700
                      bg-slate-950/40
                      px-5 py-2.5
                      text-sm font-semibold text-slate-300
                      transition-all duration-200 ease-out
                      hover:-translate-y-0.5
                      hover:border-violet-400
                      hover:bg-violet-500/10
                      hover:text-violet-300
                      hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]
                      active:translate-y-0
                      active:scale-95
                      focus:outline-none
                      focus:ring-2
                      focus:ring-violet-400/40
                    "
                  >
                    Login
                  </Link>

                  {/* =================================================
                      SIGN UP
                      Desktop only
                  ================================================== */}
                  <Link
                    href="/signup"
                    className="
                      hidden
                      rounded-full
                      border border-violet-300/50
                      bg-gradient-to-r from-violet-500 to-fuchsia-500
                      px-5 py-2.5
                      text-sm font-semibold text-white
                      shadow-[0_0_25px_rgba(139,92,246,0.20)]
                      transition-all duration-200 ease-out
                      hover:-translate-y-0.5
                      hover:border-violet-200
                      hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]
                      active:translate-y-0
                      active:scale-95
                      focus:outline-none
                      focus:ring-2
                      focus:ring-violet-400/40
                      md:inline-flex
                    "
                  >
                    Sign Up
                  </Link>

                  {/* =================================================
                      MOBILE HAMBURGER
                      Mobile only
                  ================================================== */}
                  <button
                    type="button"
                    aria-label={
                      isMenuOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                    }
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((open) => !open)}
                    className="
                      flex
                      h-10 w-10
                      items-center justify-center
                      rounded-xl
                      border border-slate-700
                      bg-slate-950/40
                      text-slate-300
                      transition-all duration-200 ease-out
                      hover:-translate-y-0.5
                      hover:border-violet-400
                      hover:bg-violet-500/10
                      hover:text-violet-300
                      hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]
                      active:translate-y-0
                      active:scale-90
                      focus:outline-none
                      focus:ring-2
                      focus:ring-violet-400/40
                      md:hidden
                    "
                  >
                    {isMenuOpen ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M4 6h16" />
                        <path d="M4 12h16" />
                        <path d="M4 18h16" />
                      </svg>
                    )}
                  </button>
                </>
              ) : (
                <>
                  {/* =================================================
                      LOGGED-IN MENU
                  ================================================== */}
                  <button
                    type="button"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((open) => !open)}
                    className="
                      flex
                      h-10 w-10
                      items-center justify-center
                      rounded-xl
                      border border-slate-700
                      bg-slate-950/40
                      text-slate-300
                      transition-all duration-200 ease-out
                      hover:-translate-y-0.5
                      hover:border-violet-400
                      hover:bg-violet-500/10
                      hover:text-violet-300
                      hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]
                      active:translate-y-0
                      active:scale-90
                      focus:outline-none
                      focus:ring-2
                      focus:ring-violet-400/40
                    "
                  >
                    {isMenuOpen ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M4 6h16" />
                        <path d="M4 12h16" />
                        <path d="M4 18h16" />
                      </svg>
                    )}
                  </button>

                  {/* CREATE INVITATION */}
                  <Link
                    href="/create"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border border-violet-300/40
                      bg-gradient-to-r from-violet-500 to-fuchsia-500
                      px-5 py-2.5
                      text-sm font-semibold text-white
                      shadow-[0_0_25px_rgba(139,92,246,0.2)]
                      transition-all duration-200 ease-out
                      hover:-translate-y-0.5
                      hover:border-violet-200/70
                      hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]
                      active:translate-y-0
                      active:scale-95
                      focus:outline-none
                      focus:ring-2
                      focus:ring-violet-400/40
                    "
                  >
                    <span className="text-lg leading-none">+</span>

                    <span className="hidden sm:inline">
                      Create Invitation
                    </span>

                    <span className="sm:hidden">Create</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================
          SIDE MENU
      ========================================================== */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* OVERLAY */}
          <button
            type="button"
            aria-label="Close navigation"
            onClick={closeMenu}
            className="
              absolute
              inset-0
              cursor-default
              bg-black/70
              backdrop-blur-sm
            "
          />

          {/* =====================================================
              SIDE PANEL
          ====================================================== */}
          <aside
            className="
              absolute
              left-0
              top-0
              flex
              h-full
              w-[310px]
              max-w-[85vw]
              flex-col
              border-r border-white/10
              bg-slate-950/95
              shadow-[20px_0_80px_rgba(0,0,0,0.5)]
              backdrop-blur-xl
            "
          >
            {/* PANEL HEADER */}
            <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-6">
              <Link
                href="/"
                onClick={closeMenu}
                className="text-lg font-bold tracking-tight"
              >
                <span className="text-white">My</span>

                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  InviteVerse
                </span>
              </Link>

              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                className="
                  flex
                  h-9 w-9
                  items-center justify-center
                  rounded-xl
                  border border-slate-700
                  bg-slate-950/40
                  text-slate-400
                  transition-all duration-200
                  hover:border-violet-400
                  hover:bg-violet-500/10
                  hover:text-violet-300
                  active:scale-90
                  focus:outline-none
                  focus:ring-2
                  focus:ring-violet-400/40
                "
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* =====================================================
                PUBLIC MENU
            ====================================================== */}
            {!isLoggedIn ? (
              <nav className="flex flex-1 flex-col gap-2 p-5 md:hidden">
                {/* HOME */}
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border border-violet-400/20
                    bg-violet-500/10
                    px-4 py-3.5
                    text-sm font-medium text-violet-300
                    transition-all duration-200
                    hover:border-violet-400/50
                    hover:bg-violet-500/20
                    hover:text-white
                    active:scale-[0.98]
                  "
                >
                  <span className="text-base">⌂</span>
                  Home
                </Link>

                {/* DESIGNS */}
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border border-transparent
                    px-4 py-3.5
                    text-sm font-medium text-slate-300
                    transition-all duration-200
                    hover:border-violet-400/30
                    hover:bg-violet-500/10
                    hover:text-violet-300
                    active:scale-[0.98]
                  "
                >
                  <span className="text-base">◇</span>
                  Designs
                </Link>

                {/* HOW IT WORKS */}
                <a
                  href="/#how-it-works"
                  onClick={closeMenu}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border border-transparent
                    px-4 py-3.5
                    text-sm font-medium text-slate-300
                    transition-all duration-200
                    hover:border-violet-400/30
                    hover:bg-violet-500/10
                    hover:text-violet-300
                    active:scale-[0.98]
                  "
                >
                  <span className="text-base">✦</span>
                  How It Works
                </a>

                {/* DIVIDER */}
                <div className="my-3 border-t border-white/10" />

                {/* SIGN UP */}
                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border border-violet-400/40
                    bg-violet-500/10
                    px-4 py-3.5
                    text-sm font-semibold text-violet-300
                    transition-all duration-200 ease-out
                    hover:-translate-y-0.5
                    hover:border-violet-300
                    hover:bg-violet-500
                    hover:text-white
                    hover:shadow-[0_0_25px_rgba(139,92,246,0.35)]
                    active:translate-y-0
                    active:scale-[0.97]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-violet-400/40
                  "
                >
                  <span>✦</span>
                  Sign Up
                </Link>
              </nav>
            ) : (
              /* ===================================================
                 LOGGED-IN MENU
              ==================================================== */
              <div className="flex flex-1 flex-col">
                <nav className="flex flex-1 flex-col gap-2 p-5">
                  {/* HOME */}
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border border-violet-400/20
                      bg-violet-500/10
                      px-4 py-3.5
                      text-sm font-medium text-violet-300
                      transition-all duration-200
                      hover:border-violet-400/50
                      hover:bg-violet-500/20
                      hover:text-white
                      active:scale-[0.98]
                    "
                  >
                    <span>⌂</span>
                    Home
                  </Link>

                  {/* MY INVITATIONS */}
                  <Link
                    href="/invitations"
                    onClick={closeMenu}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border border-transparent
                      px-4 py-3.5
                      text-sm font-medium text-slate-300
                      transition-all duration-200
                      hover:border-violet-400/30
                      hover:bg-violet-500/10
                      hover:text-violet-300
                      active:scale-[0.98]
                    "
                  >
                    <span>▣</span>
                    My Invitations
                  </Link>

                  {/* CREATE */}
                  <Link
                    href="/create"
                    onClick={closeMenu}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border border-transparent
                      px-4 py-3.5
                      text-sm font-medium text-slate-300
                      transition-all duration-200
                      hover:border-violet-400/30
                      hover:bg-violet-500/10
                      hover:text-violet-300
                      active:scale-[0.98]
                    "
                  >
                    <span>✎</span>
                    Create Invitation
                  </Link>

                  {/* DESIGNS */}
                  <SparkleButton
                    type="button"
                    onClick={handleDesignsClick}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      border border-transparent
                      px-4 py-3.5
                      text-left
                      text-sm font-medium text-slate-300
                      transition-all duration-200
                      hover:border-violet-400/30
                      hover:bg-violet-500/10
                      hover:text-violet-300
                      active:scale-[0.98]
                    "
                  >
                    <span>◇</span>
                    Designs
                  </SparkleButton>

                  {/* PROFILE */}
                  <Link
                    href="/profile"
                    onClick={closeMenu}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border border-transparent
                      px-4 py-3.5
                      text-sm font-medium text-slate-300
                      transition-all duration-200
                      hover:border-violet-400/30
                      hover:bg-violet-500/10
                      hover:text-violet-300
                      active:scale-[0.98]
                    "
                  >
                    <span>○</span>
                    Profile
                  </Link>

                  {/* SETTINGS */}
                  <Link
                    href="/settings"
                    onClick={closeMenu}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border border-transparent
                      px-4 py-3.5
                      text-sm font-medium text-slate-300
                      transition-all duration-200
                      hover:border-violet-400/30
                      hover:bg-violet-500/10
                      hover:text-violet-300
                      active:scale-[0.98]
                    "
                  >
                    <span>⚙</span>
                    Settings
                  </Link>
                </nav>

                {/* LOGOUT */}
                <div className="border-t border-white/10 p-5">
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="
                      w-full
                      rounded-xl
                      border border-slate-700
                      bg-slate-950/40
                      px-4 py-3.5
                      text-sm font-semibold text-slate-300
                      transition-all duration-200
                      hover:border-red-400
                      hover:bg-red-500/10
                      hover:text-red-400
                      active:scale-[0.98]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-red-400/30
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}