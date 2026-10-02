"use client";

import { useState } from "react";

type TestResult = {
  success: boolean;
  data?: {
    title: string;
    invitationMessage: string;
    shortDescription: string;
    rsvpMessage: string;
    whatsappMessage: string;
  };
  error?: string;
};

export default function AITestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] =
    useState<TestResult | null>(null);
  const [error, setError] = useState("");

  async function testAI() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "/api/ai/invitation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventType: "wedding",
            eventName: "Vignesh & Priya Wedding",
            hostNames: "Vignesh and Priya",
            eventDate: "15 December 2026",
            eventTime: "6:30 PM",
            venue: "Chennai",
            tone: "elegant",
            additionalDetails:
              "Family and friends are warmly invited to celebrate with us.",
          }),
        }
      );

      const data =
        (await response.json()) as TestResult;

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "AI request failed."
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#070914] px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-400">
            MyInviteVerse AI
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            AI Invitation Test
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Test Gemini invitation content generation before
            connecting it to the Create Invitation flow.
          </p>
        </div>

        {/* Test button */}
        <button
          type="button"
          onClick={testAI}
          disabled={loading}
          className="mt-6 inline-flex items-center rounded-lg bg-violet-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Generating..."
            : "Generate Invitation"}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-red-400">
              Error
            </p>

            <p className="mt-2 text-sm leading-6 text-red-300">
              {error}
            </p>
          </div>
        )}

        {/* Success */}
        {result?.success && result.data && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                Success
              </p>

              <p className="mt-1 text-sm text-emerald-300">
                Gemini generated the invitation successfully.
              </p>
            </div>

            {/* Title */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
                Title
              </p>

              <p className="mt-2 text-lg font-semibold text-white">
                {result.data.title}
              </p>
            </div>

            {/* Invitation message */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
                Invitation Message
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                {result.data.invitationMessage}
              </p>
            </div>

            {/* Short description */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
                Short Description
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {result.data.shortDescription}
              </p>
            </div>

            {/* RSVP */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
                RSVP Message
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {result.data.rsvpMessage}
              </p>
            </div>

            {/* WhatsApp */}
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
                WhatsApp Message
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {result.data.whatsappMessage}
              </p>
            </div>

            {/* Raw response */}
            <details className="rounded-xl border border-white/[0.07] bg-white/[0.02]">
              <summary className="cursor-pointer px-5 py-4 text-xs font-medium text-slate-500 transition hover:text-slate-300">
                View API Response
              </summary>

              <pre className="overflow-auto border-t border-white/[0.06] p-5 text-xs leading-6 text-slate-400">
                {JSON.stringify(
                  result,
                  null,
                  2
                )}
              </pre>
            </details>
          </div>
        )}
      </div>
    </main>
  );
}