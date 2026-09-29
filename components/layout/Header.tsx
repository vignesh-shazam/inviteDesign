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
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6">
          {/* Main Header */}
          <div className="flex h-16 items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center gap-3">
              {/* Menu Button - Logged In */}
              {isLoggedIn && (
                <button
                  type="button"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                  onClick={() => setIsMenuOpen((open) => !open)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-200 transition hover:bg-slate-900 hover:text-white"
                >
                  {isMenuOpen ? (
                    <svg
                      width="22"
                      height="22"
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
                      width="22"
                      height="22"
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
              )}

              {/* Logo */}
              <Link
                href="/"
                onClick={closeMenu}
                className="text-xl font-bold tracking-tight text-white"
              >
                My<span className="text-violet-400">InviteVerse</span>
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {!isLoggedIn ? (
                <>
                  {/* Login */}
                  <Link
                    href="/login"
                    className="text-sm font-medium text-slate-300 transition hover:text-white"
                  >
                    Login
                  </Link>

                  {/* Sign Up */}
                  <Link
                    href="/signup"
                    className="rounded-full bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  {/* Create Invitation */}
                  <Link
                    href="/create"
                    className="rounded-full bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400"
                  >
                    Create Invitation
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Created By */}
          {/*
          <div className="border-t border-slate-800/60 py-2 text-center text-xs text-slate-500">
            Created by{" "}
            <span className="font-semibold text-violet-400">
              VigneshDurai
            </span>
          </div>
          */}
        </div>
      </header>

      {/* Left Side Panel */}
      {isLoggedIn && isMenuOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Background Overlay */}
          <button
            type="button"
            aria-label="Close navigation"
            onClick={closeMenu}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Side Panel */}
          <aside className="absolute left-0 top-0 h-full w-[300px] max-w-[85vw] border-r border-slate-800 bg-slate-950 shadow-2xl">
            {/* Panel Header */}
            <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
              <span className="text-lg font-bold text-white">
                My<span className="text-violet-400">InviteVerse</span>
              </span>

              {/* Close Button */}
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition hover:bg-slate-900 hover:text-white"
              >
                <svg
                  width="22"
                  height="22"
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

            {/* Navigation */}
            <nav className="flex flex-col gap-2 p-5">
              {/* Profile */}
              <Link
                href="/profile"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
              >
                Profile
              </Link>

              {/* Home */}
              <Link
                href="/"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
              >
                Home
              </Link>

              {/* Designs */}
              <SparkleButton
                type="button"
                onClick={handleDesignsClick}
                className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
              >
                Designs
              </SparkleButton>

              {/* My Invitations */}
              <Link
                href="/invitations"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
              >
                My Invitations
              </Link>
            </nav>

            {/* Logout */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 p-5">
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-red-400 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}