"use client";

import { useState } from "react";

import SparkleButton from "@/components/ui/SparkleButton";

type ComingSoonButtonProps = {
    children: React.ReactNode;
    className?: string;
};

export default function ComingSoonButton({
    children,
    className = "",
}: ComingSoonButtonProps) {
    const [showMessage, setShowMessage] =
        useState(false);

    function handleClick() {
        setShowMessage(true);

        window.setTimeout(() => {
            setShowMessage(false);
        }, 2500);
    }

    return (
        <>
            <SparkleButton
                type="button"
                onClick={handleClick}
                className={className}
            >
                {children}
            </SparkleButton>

            {showMessage && (
                <div className="fixed left-1/2 top-20 z-[60] -translate-x-1/2">
                    <div className="rounded-full border border-violet-400/30 bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-xl shadow-black/30">
                        Designs are coming soon.
                    </div>
                </div>
            )}
        </>
    );
}