"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/db/supabase";
import PublicLandingPage from "@/components/home/PublicLandingPage";
import UserHomePage from "@/components/home/UserHomePage";

type HomeState =
  | "loading"
  | "logged-out"
  | "logged-in";

export default function Home() {
  const [homeState, setHomeState] =
    useState<HomeState>("loading");

  const [userName, setUserName] =
    useState("");

  useEffect(() => {
    const supabase = getSupabaseClient();

    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserName(
        user?.user_metadata?.full_name ||
          user?.email?.split("@")[0] ||
          "",
      );

      setHomeState(
        user
          ? "logged-in"
          : "logged-out",
      );
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const user = session?.user;

        setUserName(
          user?.user_metadata?.full_name ||
            user?.email?.split("@")[0] ||
            "",
        );

        setHomeState(
          user
            ? "logged-in"
            : "logged-out",
        );
      },
    );

    return () =>
      subscription.unsubscribe();
  }, []);

  if (homeState === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050712]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-violet-400" />

          <p className="mt-4 text-sm text-slate-500">
            Loading MyInviteVerse...
          </p>
        </div>
      </main>
    );
  }

  if (homeState === "logged-in") {
    return (
      <UserHomePage
        userName={userName}
      />
    );
  }

  return <PublicLandingPage />;
}