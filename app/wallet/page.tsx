"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getWallet } from "@/lib/wallet/walletService";
import type { Wallet } from "@/lib/wallet/walletTypes";

export default function WalletPage() {
    const [wallet, setWallet] =
        useState<Wallet | null>(null);

    useEffect(() => {
        getWallet().then(setWallet);
    }, []);

    if (!wallet) {
        return (
            <main className="min-h-screen bg-[#050712]" />
        );
    }

    return (
        <main className="min-h-screen bg-[#050712] text-white">
            <div className="mx-auto w-full max-w-[1000px] px-4 py-20 sm:px-6 lg:px-8 lg:py-10">
                <Link
                    href="/"
                    className="inline-flex items-center rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs font-medium text-slate-400 transition-all duration-200 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                >
                    ← Dashboard
                </Link>

                <div className="mt-5">
                    <h1 className="text-2xl font-bold">
                    Wallet
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your MyInviteVerse credits and payments.
                    </p>
                </div>

                {/* Balance */}
                <section className="mt-6 rounded-xl border border-violet-500/20 bg-gradient-to-br from-[#171338] to-[#0d1020] p-6 shadow-2xl shadow-violet-950/20">
                    <p className="text-xs text-violet-300">
                        Available Balance
                    </p>

                    <div className="mt-2 flex items-end gap-2">
                        <span className="text-3xl font-bold">
                            {wallet.balance.toFixed(2)}
                        </span>

                        <span className="mb-1 text-xs text-slate-500">
                            {wallet.currency}
                        </span>
                    </div>

                    <Link
                        href="/payment"
                        className="mt-5 inline-flex rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
                    >
                        Add Credits
                    </Link>
                </section>

                {/* Transactions */}
                <section className="mt-6 rounded-xl border border-white/[0.07] bg-[#0a0e1b] p-5">
                    <div>
                        <h2 className="text-sm font-semibold">
                            Recent Transactions
                        </h2>

                        <p className="mt-1 text-[10px] text-slate-500">
                            Your recent wallet activity.
                        </p>
                    </div>

                    {wallet.transactions.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="text-sm text-slate-500">
                                No transactions yet.
                            </p>

                            <p className="mt-1 text-[10px] text-slate-600">
                                Your payment activity will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-4">
                            {wallet.transactions.map(
                                (transaction) => (
                                    <div
                                        key={transaction.id}
                                        className="flex items-center justify-between border-t border-white/[0.06] py-4"
                                    >
                                        <div>
                                            <p className="text-xs font-medium">
                                                {transaction.description}
                                            </p>

                                            <p className="mt-1 text-[10px] text-slate-500">
                                                {transaction.createdAt}
                                            </p>
                                        </div>

                                        <span
                                            className={
                                                transaction.type === "credit"
                                                    ? "text-xs text-emerald-400"
                                                    : "text-xs text-red-400"
                                            }
                                        >
                                            {transaction.type === "credit"
                                                ? "+"
                                                : "-"}
                                            {transaction.amount.toFixed(2)}
                                        </span>
                                    </div>
                                ),
                            )}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}