"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/db/supabase";

const mainNavigation = [
  { label: "Home", icon: "home", href: "/" },
  { label: "My Invitations", icon: "file", href: "/invitations" },
  { label: "Wishes", icon: "sparkle", href: "/wishes" },
  { label: "Create Invitation", icon: "edit", href: "/create" },
  { label: "Events", icon: "calendar", href: "/events" },
  { label: "Designs", icon: "palette", href: "/designs" },
  { label: "Wallet", icon: "wallet", href: "/wallet" },
];

const accountNavigation = [
  { label: "Profile", icon: "user", href: "/profile" },
  { label: "Settings", icon: "settings", href: "/settings" },
];

function Icon({
  name,
  size = 16,
}: {
  name: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
          <path d="M9 21v-6h6v6" />
        </svg>
      );

    case "file":
      return (
        <svg {...common}>
          <path d="M6 3h9l4 4v14H6z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6" />
          <path d="M9 17h6" />
        </svg>
      );

    case "edit":
      return (
        <svg {...common}>
          <path d="m4 16 10.5-10.5a2.1 2.1 0 0 1 3 3L7 19l-4 1Z" />
          <path d="m13 7 4 4" />
        </svg>
      );

    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M16 2v4" />
          <path d="M8 2v4" />
          <path d="M3 10h18" />
          <path d="M8 14h2" />
          <path d="M14 14h2" />
          <path d="M8 17h2" />
          <path d="M14 17h2" />
        </svg>
      );

    case "palette":
      return (
        <svg {...common}>
          <path d="M12 3a9 9 0 0 0 0 18h1.2a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h2.5a6.5 6.5 0 0 0 0-13Z" />
          <circle cx="7.5" cy="10" r=".8" />
          <circle cx="9" cy="6.8" r=".8" />
          <circle cx="14" cy="6.5" r=".8" />
        </svg>
      );

    case "wallet":
      return (
        <svg {...common}>
          <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5z" />
          <path d="M4 8h15" />
          <path d="M16 13h5" />
          <circle
            cx="16"
            cy="13"
            r=".7"
            fill="currentColor"
          />
        </svg>
      );

    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 21a7 7 0 0 1 14 0" />
        </svg>
      );

    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.7-1.7.1-.1A1.7 1.7 0 0 0 8.4 15a1.7 1.7 0 0 0-1.5-1H6.7v-2.4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L8 8.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.5 1Z" />
        </svg>
      );

    case "notification":
      return (
        <svg {...common}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      );

    case "logout":
      return (
        <svg {...common}>
          <path d="M10 5H5v14h5" />
          <path d="M14 8l4 4-4 4" />
          <path d="M18 12H9" />
        </svg>
      );

    case "menu":
      return (
        <svg {...common}>
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </svg>
      );

    case "close":
      return (
        <svg {...common}>
          <path d="m6 6 12 12" />
          <path d="m18 6-12 12" />
        </svg>
      );

    case "sparkle":
      return (
        <svg {...common}>
          <path d="m12 2-1.4 5.6L5 9l5.6 1.4L12 16l1.4-5.6L19 9l-5.6-1.4Z" />
          <path d="m19 17-.7 2.3L16 20l2.3.7L19 23l.7-2.3L22 20l-2.3-.7Z" />
        </svg>
      );

    default:
      return null;
  }
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const supabase = getSupabaseClient();

      await supabase.auth.signOut();

      router.push("/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* =========================================================
          DESKTOP SIDEBAR
      ========================================================= */}
      <aside
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={`fixed left-0 top-0 z-50 hidden h-screen overflow-hidden border-r border-white/[0.06] bg-[#070914] transition-[width] duration-300 ease-in-out lg:flex lg:flex-col ${
          expanded ? "w-[210px]" : "w-[68px]"
        }`}
      >
        {/* Logo */}
        <div
          className={`flex h-[72px] shrink-0 items-center border-b border-white/[0.06] ${
            expanded
              ? "px-4"
              : "justify-center px-2"
          }`}
        >
          <Link
            href="/"
            className={`flex items-center ${
              expanded ? "gap-2.5" : ""
            }`}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold shadow-lg shadow-violet-500/20">
              M
            </div>

            <span
              className={`whitespace-nowrap text-sm font-bold tracking-tight transition-all duration-200 ${
                expanded
                  ? "opacity-100"
                  : "pointer-events-none absolute w-0 overflow-hidden opacity-0"
              }`}
            >
              MyInviteVerse
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-5">
          {/* Main navigation */}
          <div className="space-y-1">
            {mainNavigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  title={expanded ? undefined : item.label}
                  className={`relative flex items-center rounded-md py-2.5 text-xs transition ${
                    expanded
                      ? "gap-3 px-3"
                      : "justify-center px-0"
                  } ${
                    active
                      ? "border border-violet-500/20 bg-violet-500/10 text-violet-300"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <Icon
                    name={item.icon}
                    size={14}
                  />

                  <span
                    className={`whitespace-nowrap transition-all duration-200 ${
                      expanded
                        ? "opacity-100"
                        : "pointer-events-none absolute w-0 overflow-hidden opacity-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-5 h-px shrink-0 bg-white/[0.05]" />

          {/* Account navigation */}
          <div className="space-y-1">
            {accountNavigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  title={expanded ? undefined : item.label}
                  className={`flex items-center rounded-md py-2.5 text-xs transition ${
                    expanded
                      ? "gap-3 px-3"
                      : "justify-center px-0"
                  } ${
                    active
                      ? "border border-violet-500/20 bg-violet-500/10 text-violet-300"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <Icon
                    name={item.icon}
                    size={14}
                  />

                  <span
                    className={`whitespace-nowrap transition-all duration-200 ${
                      expanded
                        ? "opacity-100"
                        : "pointer-events-none absolute w-0 overflow-hidden opacity-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Logout */}
          <div className="mt-auto pt-5">
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              title={expanded ? undefined : "Logout"}
              className={`flex w-full items-center rounded-md py-2.5 text-xs text-slate-500 transition hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50 ${
                expanded
                  ? "gap-3 px-3"
                  : "justify-center px-0"
              }`}
            >
              <Icon
                name="logout"
                size={14}
              />

              <span
                className={`whitespace-nowrap transition-all duration-200 ${
                  expanded
                    ? "opacity-100"
                    : "pointer-events-none absolute w-0 overflow-hidden opacity-0"
                }`}
              >
                {loggingOut
                  ? "Logging out..."
                  : "Logout"}
              </span>
            </button>
          </div>
        </nav>
      </aside>

      {/* =========================================================
          MOBILE TOP HEADER
      ========================================================= */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/[0.06] bg-[#070914]/95 px-4 backdrop-blur-xl lg:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
            aria-label="Open navigation"
          >
            <Icon
              name="menu"
              size={17}
            />
          </button>

          <Link
            href="/"
            className="truncate text-sm font-bold tracking-tight text-white"
          >
            MyInviteVerse
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Link
            href="/notifications"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
          >
            <Icon
              name="notification"
              size={17}
            />

            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-violet-400" />
          </Link>

          <Link
            href="/profile"
            aria-label="Profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-semibold text-white shadow-lg shadow-violet-500/10"
          >
            V
          </Link>
        </div>
      </header>

      {/* =========================================================
          MOBILE DRAWER
      ========================================================= */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-[2px] lg:hidden"
          />

          {/* Drawer */}
          <aside className="fixed left-0 top-0 z-[70] flex h-screen w-[260px] flex-col overflow-hidden border-r border-white/10 bg-[#070914] shadow-2xl lg:hidden">
            {/* Drawer header */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] px-4">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold">
                  M
                </div>

                <span className="text-sm font-bold">
                  MyInviteVerse
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.05] hover:text-white"
                aria-label="Close navigation"
              >
                <Icon
                  name="close"
                  size={17}
                />
              </button>
            </div>

            {/* Drawer navigation */}
            <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-5">
              <div className="space-y-1">
                {mainNavigation.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                        active
                          ? "border border-violet-500/20 bg-violet-500/10 text-violet-300"
                          : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      <Icon
                        name={item.icon}
                        size={16}
                      />

                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="my-5 h-px shrink-0 bg-white/[0.05]" />

              {/* Account */}
              <div className="space-y-1">
                {accountNavigation.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                        active
                          ? "border border-violet-500/20 bg-violet-500/10 text-violet-300"
                          : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      <Icon
                        name={item.icon}
                        size={16}
                      />

                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="mt-auto flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-500 transition hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
              >
                <Icon
                  name="logout"
                  size={16}
                />

                {loggingOut
                  ? "Logging out..."
                  : "Logout"}
              </button>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}