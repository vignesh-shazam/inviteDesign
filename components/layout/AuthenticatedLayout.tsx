"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { getSupabaseClient } from "@/lib/db/supabase";

type AuthState =
    | "loading"
    | "logged-in"
    | "logged-out";

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const [authState, setAuthState] =
        useState<AuthState>("loading");

    useEffect(() => {
        const supabase = getSupabaseClient();

        async function checkAuth() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            setAuthState(
                user ? "logged-in" : "logged-out",
            );
        }

        checkAuth();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setAuthState(
                    session?.user
                        ? "logged-in"
                        : "logged-out",
                );
            },
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    /*
     * Authentication pages
     */
    const isAuthPage =
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname === "/forgot-password" ||
        pathname === "/reset-password";

    /*
     * Public invitation pages
     */
    const isPublicInvitation =
        pathname === "/i" ||
        pathname.startsWith("/i/");

    /*
     * Public 3D test page
     */
    const isPublic3DTest =
        pathname === "/3d-test";

    /*
     * Public preview page
     */
    const isPublicPreview =
        pathname === "/preview" ||
        pathname.startsWith("/preview/");

    /*
     * While auth is loading, avoid flashing the old header.
     */
    if (authState === "loading") {
        return (
            <main className="min-h-screen bg-[#050712]" />
        );
    }

    /*
     * Authentication pages:
     *
     * No header
     * No sidebar
     * No footer
     */
    if (isAuthPage) {
        return <>{children}</>;
    }

    /*
     * Public invitation / preview pages:
     *
     * Keep them independent from dashboard navigation.
     */
    if (
        isPublicInvitation ||
        isPublic3DTest ||
        isPublicPreview
    ) {
        return (
            <>
                {children}
                <Footer />
            </>
        );
    }

    /*
     * Logged-in user:
     *
     * NO old Header
     * NO public Footer
     * Shared hover sidebar
     */
    if (authState === "logged-in") {
        return (
            <div className="min-h-screen overflow-x-hidden bg-[#050712]">
                <DashboardSidebar />

                <div className="min-h-screen min-w-0 pl-0 pt-16 lg:pl-[68px] lg:pt-0">
                    {children}
                </div>
            </div>
        );
    }

    /*
     * Logged-out public website:
     *
     * Existing public Header + Footer.
     */
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}