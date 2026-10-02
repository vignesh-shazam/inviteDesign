"use client";

import Link from "next/link";
import { useState } from "react";

const creditOptions = [
    {
        amount: 10,
    },
    {
        amount: 25,
    },
    {
        amount: 50,
    },
    {
        amount: 75,
    },
];

export default function PaymentPage() {
    const [selectedAmount, setSelectedAmount] =
        useState(500);

    return (
        <main className="min-h-screen bg-[#050712] text-white">
            <div className="mx-auto w-full max-w-[900px] px-4 py-20 sm:px-6 lg:px-8 lg:py-10">
                <Link
                    href="/wallet"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs font-medium text-slate-400 transition-all duration-200 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                >
                    <span className="text-sm leading-none">←</span>
                    Wallet
                </Link>

                <div className="mt-5">
                    <h1 className="text-2xl font-bold">
                        Add Credits
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Choose an amount to add to your MyInviteVerse wallet.
                    </p>
                </div>

                <section className="mt-6 rounded-xl border border-white/[0.07] bg-[#0a0e1b] p-5 sm:p-6">
                    <h2 className="text-sm font-semibold">
                        Select Amount
                    </h2>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {creditOptions.map((option) => {
                            const selected =
                                selectedAmount === option.amount;

                            return (
                                <button
                                    key={option.amount}
                                    type="button"
                                    onClick={() =>
                                        setSelectedAmount(option.amount)
                                    }
                                    className={`rounded-lg border p-4 text-left transition ${selected
                                        ? "border-violet-500/50 bg-violet-500/10"
                                        : "border-white/[0.07] bg-[#111729] hover:border-violet-500/30"
                                        }`}
                                >
                                    <p className="text-lg font-semibold">
                                        ₹{option.amount}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-6 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                                Amount
                            </span>

                            <span className="text-sm font-semibold">
                                ₹{selectedAmount}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="mt-5 w-full rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-3 text-xs font-semibold text-white transition hover:opacity-90"
                    >
                        Continue to Payment
                    </button>

                    <p className="mt-3 text-center text-[10px] text-slate-600">
                        Payment gateway integration will be connected in the next payment phase.
                    </p>
                </section>
            </div>
        </main>
    );
}