"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import { getSupabaseClient } from "@/lib/db/supabase";

export default function HeaderVisibility() {
  const pathname = usePathname();

  const [checkingAuth, setCheckingAuth] = useState(
    pathname === "/",
  );

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setCheckingAuth(false);
      return;
    }

    const supabase = getSupabaseClient();

    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(Boolean(user));
      setCheckingAuth(false);
    }

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(Boolean(session?.user));
        setCheckingAuth(false);
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname]);

  /*
   * Authenticated home/dashboard has its own
   * navigation, so hide the global Header.
   */
  if (pathname === "/") {
    if (checkingAuth) {
      return null;
    }

    if (isLoggedIn) {
      return null;
    }
  }

  /*
   * Authentication pages do not use the global header.
   */
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  if (isAuthPage) {
    return null;
  }

  return <Header />;
}