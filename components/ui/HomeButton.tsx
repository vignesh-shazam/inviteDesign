"use client";

import { useRouter } from "next/navigation";
import SparkleButton from "@/components/ui/SparkleButton";

export default function HomeButton() {
    const router = useRouter();

    function handleClick() {
        window.setTimeout(() => {
            router.push("/");
        }, 350);
    }

    return (
        <SparkleButton
            type="button"
            onClick={handleClick}
            sparkleDuration={350}
            aria-label="Go to Home"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-300 shadow-sm transition-all duration-200 hover:border-violet-500/60 hover:bg-violet-500/10 hover:text-violet-400 active:scale-95 active:bg-violet-500/20"
        >
            <span className="text-lg leading-none transition-transform duration-200">
                ←
            </span>

            <span>Home</span>
        </SparkleButton>
    );
}