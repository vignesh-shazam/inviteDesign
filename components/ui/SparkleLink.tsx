"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    AnchorHTMLAttributes,
    MouseEvent,
    ReactNode,
    useState,
} from "react";

type SparkleLinkProps =
    AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
        children: ReactNode;
        sparkleDuration?: number;
    };

export default function SparkleLink({
    href,
    children,
    sparkleDuration = 350,
    onClick,
    className = "",
    ...props
}: SparkleLinkProps) {
    const router = useRouter();
    const [isSparkling, setIsSparkling] = useState(false);

    function handleClick(
        event: MouseEvent<HTMLAnchorElement>,
    ) {
        onClick?.(event);

        // Allow modified clicks and prevented clicks
        // to behave normally.
        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        setIsSparkling(true);

        // For internal navigation, show the sparkle
        // before navigating to the next page.
        if (href.startsWith("/")) {
            event.preventDefault();

            window.setTimeout(() => {
                router.push(href);
            }, sparkleDuration);

            return;
        }

        // External links keep their normal behavior.
        window.setTimeout(() => {
            setIsSparkling(false);
        }, sparkleDuration);
    }

    return (
        <Link
            href={href}
            {...props}
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
                    animation: sparkle-burst ${sparkleDuration}ms ease-out
                        forwards;
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
                        transform: scale(0.3) translate(0, 0);
                    }

                    25% {
                        opacity: 1;
                        transform: scale(1) translate(0, 0);
                    }

                    100% {
                        opacity: 0;
                        transform: scale(1.4) translate(
                            var(--x),
                            var(--y)
                        );
                    }
                }
            `}</style>
        </Link>
    );
}