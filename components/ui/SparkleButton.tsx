"use client";

import {
    ButtonHTMLAttributes,
    MouseEvent,
    ReactNode,
    useState,
} from "react";

type SparkleButtonProps =
    ButtonHTMLAttributes<HTMLButtonElement> & {
        children: ReactNode;
        sparkleDuration?: number;
    };

export default function SparkleButton({
    children,
    onClick,
    sparkleDuration = 350,
    className = "",
    disabled = false,
    ...props
}: SparkleButtonProps) {
    const [isSparkling, setIsSparkling] =
        useState(false);

    function handleClick(
        event: MouseEvent<HTMLButtonElement>,
    ) {
        if (disabled) {
            return;
        }

        setIsSparkling(true);

        window.setTimeout(() => {
            setIsSparkling(false);
        }, sparkleDuration);

        onClick?.(event);
    }

    return (
        <button
            {...props}
            type={props.type ?? "button"}
            disabled={disabled}
            onClick={handleClick}
            className={`group relative overflow-visible ${className}`}
        >
            {isSparkling && (
                <>
                    <span className="sparkle sparkle-1">
                        ✦
                    </span>

                    <span className="sparkle sparkle-2">
                        ✧
                    </span>

                    <span className="sparkle sparkle-3">
                        ✦
                    </span>

                    <span className="sparkle sparkle-4">
                        ✧
                    </span>

                    <span className="sparkle sparkle-5">
                        ✦
                    </span>

                    <span className="sparkle sparkle-6">
                        ✧
                    </span>
                </>
            )}

            {children}

            <style jsx>{`
                .sparkle {
                    position: absolute;
                    pointer-events: none;
                    z-index: 20;
                    font-size: 12px;
                    color: #a78bfa;
                    animation: sparkle-burst ${sparkleDuration}ms
                        ease-out forwards;
                }

                .sparkle-1 {
                    top: -8px;
                    left: 20%;
                    --x: -12px;
                    --y: -14px;
                }

                .sparkle-2 {
                    top: 5px;
                    right: -10px;
                    --x: 16px;
                    --y: -5px;
                }

                .sparkle-3 {
                    bottom: -8px;
                    left: 35%;
                    --x: -8px;
                    --y: 14px;
                }

                .sparkle-4 {
                    top: -10px;
                    right: 25%;
                    --x: 12px;
                    --y: -16px;
                }

                .sparkle-5 {
                    bottom: 5px;
                    left: -10px;
                    --x: -15px;
                    --y: 6px;
                }

                .sparkle-6 {
                    bottom: -5px;
                    right: 15%;
                    --x: 15px;
                    --y: 12px;
                }

                @keyframes sparkle-burst {
                    0% {
                        opacity: 0;
                        transform: scale(0.3)
                            translate(0, 0);
                    }

                    25% {
                        opacity: 1;
                        transform: scale(1)
                            translate(0, 0);
                    }

                    100% {
                        opacity: 0;
                        transform: scale(1.4)
                            translate(
                                var(--x),
                                var(--y)
                            );
                    }
                }
            `}</style>
        </button>
    );
}