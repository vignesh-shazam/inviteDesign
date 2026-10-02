"use client";

import { useEffect, useMemo } from "react";

type CelebrationType =
    | "sparkles"
    | "rose-petals"
    | "confetti"
    | "fireworks"
    | "particles";

type CelebrationEffectProps = {
    type?: CelebrationType;
    duration?: number;
    onComplete?: () => void;
};

type Particle = {
    id: number;
    left: number;
    top: number;
    delay: number;
    duration: number;
    size: number;
    rotation: number;
};

const PARTICLE_COUNT = 28;

export default function CelebrationEffect({
    type = "sparkles",
    duration = 1500,
    onComplete,
}: CelebrationEffectProps) {
    const particles = useMemo<Particle[]>(
        () =>
            Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
                id: index,
                left: 35 + Math.random() * 30,
                top: 38 + Math.random() * 18,
                delay: Math.random() * 180,
                duration: 700 + Math.random() * 600,
                size: 6 + Math.random() * 8,
                rotation: Math.random() * 360,
            })),
        [],
    );

    useEffect(() => {
        const timer = window.setTimeout(() => {
            onComplete?.();
        }, duration);

        return () => window.clearTimeout(timer);
    }, [duration, onComplete]);

    const renderParticle = (particle: Particle) => {
        if (type === "rose-petals") {
            return (
                <span
                    key={particle.id}
                    className="celebration-particle celebration-rose-petal"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size * 0.65}px`,
                        animationDelay: `${particle.delay}ms`,
                        animationDuration: `${particle.duration + 700}ms`,
                        transform: `rotate(${particle.rotation}deg)`,
                    }}
                />
            );
        }

        if (type === "confetti") {
            return (
                <span
                    key={particle.id}
                    className="celebration-particle celebration-confetti"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        width: `${particle.size * 0.6}px`,
                        height: `${particle.size * 1.8}px`,
                        animationDelay: `${particle.delay}ms`,
                        animationDuration: `${particle.duration + 500}ms`,
                        transform: `rotate(${particle.rotation}deg)`,
                    }}
                />
            );
        }

        if (type === "fireworks") {
            return (
                <span
                    key={particle.id}
                    className="celebration-particle celebration-firework"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDelay: `${particle.delay}ms`,
                        animationDuration: `${particle.duration}ms`,
                    }}
                />
            );
        }

        if (type === "particles") {
            return (
                <span
                    key={particle.id}
                    className="celebration-particle celebration-particle-dot"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        width: `${particle.size * 0.7}px`,
                        height: `${particle.size * 0.7}px`,
                        animationDelay: `${particle.delay}ms`,
                        animationDuration: `${particle.duration}ms`,
                    }}
                />
            );
        }

        return (
            <span
                key={particle.id}
                className="celebration-particle celebration-sparkle"
                style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    animationDelay: `${particle.delay}ms`,
                    animationDuration: `${particle.duration}ms`,
                }}
            />
        );
    };

    return (
        <div
            className="celebration-effect pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
            aria-hidden="true"
        >
            <div className="celebration-center-glow" />

            {particles.map(renderParticle)}
        </div>
    );
}