"use client";

import { useMemo } from "react";

import type { WishAnimationStyle } from "@/lib/ai/wishes/wishesTypes";

type Particle = {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  rotation: number;
};

const COUNTS: Record<WishAnimationStyle, number> = {
  romantic:  22,
  birthday:  30,
  luxury:    18,
  magical:   24,
  festive:   28,
  minimal:   8,
  cinematic: 12,
  playful:   32,
};

// Colour palettes per style
const PALETTES: Record<WishAnimationStyle, string[]> = {
  romantic:  ["#f9a8d4", "#f472b6", "#fda4af", "#fb7185"],
  birthday:  ["#a78bfa", "#f472b6", "#34d399", "#fcd34d", "#60a5fa", "#f97316"],
  luxury:    ["#fcd34d", "#f59e0b", "#fbbf24", "#ffffff"],
  magical:   ["#c4b5fd", "#818cf8", "#67e8f9", "#a5f3fc", "#ddd6fe"],
  festive:   ["#f97316", "#f472b6", "#34d399", "#a78bfa", "#fcd34d", "#60a5fa"],
  minimal:   ["#94a3b8", "#cbd5e1"],
  cinematic: ["#c4b5fd", "#a78bfa", "#818cf8", "#6366f1"],
  playful:   ["#f472b6", "#fcd34d", "#34d399", "#60a5fa", "#f97316", "#a78bfa"],
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function buildParticles(
  style: WishAnimationStyle,
  count: number,
): Particle[] {
  const palette = PALETTES[style];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: randomBetween(2, 98),
    top: randomBetween(0, 100),
    delay: randomBetween(0, 2200),
    duration: randomBetween(1800, 4200),
    size: randomBetween(6, 18),
    color: palette[Math.floor(Math.random() * palette.length)],
    rotation: randomBetween(0, 360),
  }));
}

// ─── Per-style particle renderers ──────────────────────────

function ConfettiParticle({ p }: { p: Particle }) {
  return (
    <span
      className="wish-particle wish-particle-confetti"
      style={{
        left: `${p.left}%`,
        top: `-${p.size}px`,
        width: `${p.size * 0.55}px`,
        height: `${p.size * 1.7}px`,
        backgroundColor: p.color,
        animationDelay: `${p.delay}ms`,
        animationDuration: `${p.duration}ms`,
        transform: `rotate(${p.rotation}deg)`,
      }}
    />
  );
}

function HeartParticle({ p }: { p: Particle }) {
  return (
    <span
      className="wish-particle wish-particle-heart"
      style={{
        left: `${p.left}%`,
        bottom: `-${p.size}px`,
        animationDelay: `${p.delay}ms`,
        animationDuration: `${p.duration}ms`,
        fontSize: `${p.size}px`,
        color: p.color,
      }}
    >
      ♥
    </span>
  );
}

function StarParticle({ p }: { p: Particle }) {
  return (
    <span
      className="wish-particle wish-particle-star"
      style={{
        left: `${p.left}%`,
        top: `${p.top}%`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        backgroundColor: p.color,
        boxShadow: `0 0 ${p.size * 1.5}px ${p.color}80`,
        animationDelay: `${p.delay}ms`,
        animationDuration: `${p.duration}ms`,
      }}
    />
  );
}

function SparkleParticle({ p }: { p: Particle }) {
  return (
    <span
      className="wish-particle wish-particle-sparkle"
      style={{
        left: `${p.left}%`,
        top: `${p.top}%`,
        width: `${p.size * 0.7}px`,
        height: `${p.size * 0.7}px`,
        backgroundColor: p.color,
        boxShadow: `0 0 ${p.size}px ${p.color}`,
        animationDelay: `${p.delay}ms`,
        animationDuration: `${p.duration}ms`,
      }}
    />
  );
}

function PetalParticle({ p }: { p: Particle }) {
  return (
    <span
      className="wish-particle wish-particle-petal"
      style={{
        left: `${p.left}%`,
        top: `${p.top}%`,
        width: `${p.size}px`,
        height: `${p.size * 0.65}px`,
        background: `linear-gradient(135deg, ${p.color}, ${p.color}aa)`,
        animationDelay: `${p.delay}ms`,
        animationDuration: `${p.duration}ms`,
      }}
    />
  );
}

function BalloonParticle({ p }: { p: Particle }) {
  return (
    <span
      className="wish-particle wish-particle-balloon"
      style={{
        left: `${p.left}%`,
        bottom: 0,
        width: `${p.size * 1.2}px`,
        height: `${p.size * 1.6}px`,
        backgroundColor: p.color,
        opacity: 0.8,
        animationDelay: `${p.delay}ms`,
        animationDuration: `${p.duration}ms`,
      }}
    />
  );
}

// ─── Main component ─────────────────────────────────────────

type WishParticlesProps = {
  animationStyle: WishAnimationStyle;
  /** Override number of particles */
  count?: number;
};

export default function WishParticles({
  animationStyle,
  count,
}: WishParticlesProps) {
  const resolvedCount = count ?? COUNTS[animationStyle];

  const particles = useMemo(
    () => buildParticles(animationStyle, resolvedCount),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [animationStyle, resolvedCount],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => {
        switch (animationStyle) {
          case "romantic":
            return <HeartParticle key={p.id} p={p} />;

          case "birthday":
          case "festive":
          case "playful":
            return <ConfettiParticle key={p.id} p={p} />;

          case "luxury":
          case "cinematic":
            return <SparkleParticle key={p.id} p={p} />;

          case "magical":
            return <StarParticle key={p.id} p={p} />;

          case "minimal":
            return <SparkleParticle key={p.id} p={p} />;

          default:
            return <PetalParticle key={p.id} p={p} />;
        }
      })}
    </div>
  );
}
