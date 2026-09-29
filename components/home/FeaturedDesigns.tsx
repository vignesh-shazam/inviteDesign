"use client";

import Image from "next/image";
import { useState } from "react";

import type { InvitationTemplate } from "@/types/template";

import SparkleButton from "@/components/ui/SparkleButton";

type FeaturedDesignsProps = {
    designs: InvitationTemplate[];
};

export default function FeaturedDesigns({
    designs,
}: FeaturedDesignsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (designs.length === 0) {
        return null;
    }

    const total = designs.length;

    function handlePrevious() {
        setCurrentIndex((current) =>
            current === 0 ? total - 1 : current - 1,
        );
    }

    function handleNext() {
        setCurrentIndex((current) =>
            current === total - 1 ? 0 : current + 1,
        );
    }

    const visibleDesigns = Array.from(
        {
            length: Math.min(3, total),
        },
        (_, offset) =>
            designs[
                (currentIndex + offset) % total
            ],
    );

    const currentDesign =
        designs[currentIndex];

    return (
        <div className="mt-12">
            {/* Desktop / Tablet */}
            <div className="relative hidden px-15 md:block">

                {/* Previous */}
                <SparkleButton
                    type="button"
                    onClick={handlePrevious}
                    aria-label="Previous designs"
                    className="group absolute -left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-600 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-violet-500 hover:bg-violet-500 hover:text-white hover:shadow-lg hover:shadow-violet-500/25"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:-translate-x-0.5"
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </SparkleButton>

                {/* Cards */}
                <div className="grid grid-cols-3 gap-6">
                    {visibleDesigns.map(
                        (design) => (
                            <article
                                key={design.id}
                                className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition duration-300 hover:-translate-y-1 hover:border-violet-500/50"
                            >
                                <div className="relative aspect-[2/3] overflow-hidden bg-slate-900">
                                    <Image
                                        src={
                                            design.previewImage
                                        }
                                        alt={`${design.title} invitation design`}
                                        fill
                                        sizes="(max-width: 1024px) 33vw, 33vw"
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <div className="p-6">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                                        {
                                            design.category
                                        }
                                    </p>

                                    <h3 className="mt-2 text-xl font-semibold text-white">
                                        {
                                            design.title
                                        }
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        {
                                            design.description
                                        }
                                    </p>
                                </div>
                            </article>
                        ),
                    )}
                </div>

                {/* Next */}
                <SparkleButton
                    type="button"
                    onClick={handleNext}
                    aria-label="Next designs"
                    className="group absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-600 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-violet-500 hover:bg-violet-500 hover:text-white hover:shadow-lg hover:shadow-violet-500/25"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </SparkleButton>
            </div>

            {/* Mobile */}
            <div className="md:hidden">
                <div className="relative">
                    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
                        <div className="relative aspect-[2/3] overflow-hidden bg-slate-900">
                            <Image
                                src={
                                    currentDesign.previewImage
                                }
                                alt={`${currentDesign.title} invitation design`}
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                        </div>

                        <div className="p-6">
                            <p className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                                {
                                    currentDesign.category
                                }
                            </p>

                            <h3 className="mt-2 text-xl font-semibold text-white">
                                {
                                    currentDesign.title
                                }
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                {
                                    currentDesign.description
                                }
                            </p>
                        </div>
                    </article>

                    {/* Mobile Previous */}
                    {/*
                    <SparkleButton
                        type="button"
                        onClick={handlePrevious}
                        aria-label="Previous design"
                        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-950/90 text-white shadow-lg transition hover:border-violet-500"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </SparkleButton>
                    */}

                    {/* Mobile Next */}
                    {/*
                    <SparkleButton
                        type="button"
                        onClick={handleNext}
                        aria-label="Next design"
                        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-950/90 text-white shadow-lg transition hover:border-violet-500"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </SparkleButton>
                    */}
                </div>
            </div>

            {/* Indicators */}
            <div className="mt-6 flex justify-center gap-2">
                {designs.map(
                    (design, index) => (
                        <button
                            key={design.id}
                            type="button"
                            aria-label={`Show ${design.title}`}
                            onClick={() =>
                                setCurrentIndex(
                                    index,
                                )
                            }
                            className={`h-2 rounded-full transition-all ${
                                index ===
                                currentIndex
                                    ? "w-6 bg-violet-400"
                                    : "w-2 bg-slate-700 hover:bg-slate-500"
                            }`}
                        />
                    ),
                )}
            </div>

            {/* Mobile Controls */}
            <div className="mt-6 flex justify-center gap-3 md:hidden">

                <SparkleButton
                    type="button"
                    onClick={handlePrevious}
                    className="rounded-full border border-slate-700 px-5 py-2 text-sm font-medium text-slate-300 transition hover:border-violet-500 hover:text-white"
                >
                    Previous
                </SparkleButton>

                <SparkleButton
                    type="button"
                    onClick={handleNext}
                    className="rounded-full border border-slate-700 px-5 py-2 text-sm font-medium text-slate-300 transition hover:border-violet-500 hover:text-white"
                >
                    Next
                </SparkleButton>
            </div>
        </div>
    );
}