"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { resetPassword } from "@/lib/auth/authService";
import SparkleButton from "@/components/ui/SparkleButton";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setEmailTouched(true);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!isEmailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setIsLoading(true);

      await resetPassword(email.trim());

      setSuccess(
        "If an account exists with this email, a password reset link has been sent. Please check your inbox.",
      );

      setEmail("");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "";

      setError(
        message ||
          "Unable to send the reset email. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-12 sm:py-16">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[140px]" />

        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-fuchsia-600/10 blur-[140px]" />

        <div className="absolute left-1/2 top-1/3 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/[0.06] blur-[120px]" />

        <div className="login-grid absolute inset-0 opacity-30" />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-md items-center justify-center">
        <div className="w-full">
          {/* =====================================================
              BRAND
          ====================================================== */}

          <div className="mb-8 text-center">
            <Link
              href="/"
              className="inline-block text-2xl font-bold tracking-tight text-white transition hover:opacity-90"
            >
              My
              <span className="text-violet-400">
                InviteVerse
              </span>
            </Link>

            <h1 className="mt-8 text-3xl font-bold text-white">
              Forgot Password?
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
              Enter your email and we&apos;ll send you a
              secure link to reset your password.
            </p>
          </div>

          {/* =====================================================
              CARD
          ====================================================== */}

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/65 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-7">
            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-violet-500/15 blur-[80px]" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-[80px]" />

            <div className="relative">
              {!success ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Email */}

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-200"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);

                        if (error) {
                          setError("");
                        }
                      }}
                      onFocus={() =>
                        setEmailTouched(true)
                      }
                      placeholder="Enter your email"
                      autoComplete="email"
                      disabled={isLoading}
                      className={`w-full rounded-xl border bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60 ${
                        emailTouched &&
                        email.length > 0 &&
                        !isEmailValid
                          ? "border-red-500 focus:border-red-500"
                          : "border-white/10 focus:border-violet-500"
                      } focus:ring-2 focus:ring-violet-500/20`}
                    />

                    {emailTouched &&
                      email.length > 0 &&
                      !isEmailValid && (
                        <p className="mt-2 text-xs text-red-400">
                          Please enter a valid email
                          address.
                        </p>
                      )}
                  </div>

                  {/* Error */}

                  {error && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                    >
                      {error}
                    </div>
                  )}

                  {/* Button */}

                  <SparkleButton
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading
                      ? "Sending Reset Link..."
                      : "Send Reset Link"}
                  </SparkleButton>
                </form>
              ) : (
                /* =================================================
                   SUCCESS STATE
                ================================================== */

                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-emerald-400"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>

                  <h2 className="mt-5 text-lg font-semibold text-white">
                    Check Your Email
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {success}
                  </p>

                  <Link
                    href="/login"
                    className="mt-6 inline-flex rounded-xl border border-violet-400/25 bg-violet-500/10 px-5 py-2.5 text-sm font-medium text-violet-300 transition hover:border-violet-400/50 hover:bg-violet-500/20 hover:text-white"
                  >
                    Back to Login
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* =====================================================
              BACK HOME
          ====================================================== */}

          <div className="mt-6 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-violet-400/25 bg-slate-900/40 px-5 py-2.5 text-sm font-medium text-slate-400 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white hover:shadow-[0_10px_35px_rgba(139,92,246,0.18)]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}