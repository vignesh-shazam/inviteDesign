"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";

export default function HeaderVisibility() {
  const pathname = usePathname();

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