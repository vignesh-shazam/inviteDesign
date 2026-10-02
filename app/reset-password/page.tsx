"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/db/supabase";
import { updatePassword } from "@/lib/auth/authService";
import SparkleButton from "@/components/ui/SparkleButton";
import CelebrationEffect from "@/components/ui/CelebrationEffect";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [passwordTouched, setPasswordTouched] =
    useState(false);

  const [confirmPasswordTouched, setConfirmPasswordTouched] =
    useState(false);

  const [isCheckingSession, setIsCheckingSession] =
    useState(true);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showCelebration, setShowCelebration] =
    useState(false);

  /* =========================================================
     PASSWORD RULES
  ========================================================== */

  const passwordRules = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const isPasswordValid =
    passwordRules.minLength &&
    passwordRules.uppercase &&
    passwordRules.lowercase &&
    passwordRules.number &&
    passwordRules.special;

  const isConfirmPasswordValid =
    confirmPassword.length > 0 &&
    password === confirmPassword;

  /* =========================================================
     CHECK RECOVERY SESSION
  ========================================================== */

  useEffect(() => {
    const supabase = getSupabaseClient();

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsAuthenticated(Boolean(session));
      setIsCheckingSession(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(Boolean(session));
        setIsCheckingSession(false);
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /* =========================================================
     SUBMIT
  ========================================================== */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    setPasswordTouched(true);
    setConfirmPasswordTouched(true);

    if (!isAuthenticated) {
      setError(
        "Your password reset session is invalid or has expired. Please request a new reset link.",
      );
      return;
    }

    if (!isPasswordValid) {
      setError(
        "Please meet all password requirements.",
      );
      return;
    }

    if (!isConfirmPasswordValid) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      await updatePassword(password);

      setSuccess(
        "Your password has been updated successfully.",
      );

      setShowCelebration(true);

      window.setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 1800);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "";

      setError(
        message ||
          "Unable to update your password. Please try again.",
      );

      setIsLoading(false);
    }
  }

  /* =========================================================
     SESSION CHECK LOADING
  ========================================================== */

  if (isCheckingSession) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[140px]" />

          <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-fuchsia-600/10 blur-[140px]" />
        </div>

        <div className="relative text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-violet-400" />

          <p className="mt-4 text-sm text-slate-500">
            Verifying reset session...
          </p>
        </div>
      </main>
    );
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
              Create New Password
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
              Choose a strong password to keep your
              MyInviteVerse account secure.
            </p>
          </div>

          {/* =====================================================
              INVALID SESSION
          ====================================================== */}

          {!isAuthenticated ? (
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/65 p-6 text-center shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-7">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/30 bg-amber-500/10">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-400"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                  />

                  <line
                    x1="12"
                    y1="8"
                    x2="12"
                    y2="12"
                  />

                  <line
                    x1="12"
                    y1="16"
                    x2="12.01"
                    y2="16"
                  />
                </svg>
              </div>

              <h2 className="mt-5 text-lg font-semibold text-white">
                Reset Link Expired
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                This password reset link is invalid or
                has expired. Please request a new one.
              </p>

              <Link
                href="/forgot-password"
                className="mt-6 inline-flex rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400"
              >
                Request New Link
              </Link>
            </div>
          ) : (
            /* ===================================================
               RESET FORM
            ==================================================== */

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/65 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-7">
              <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-violet-500/15 blur-[80px]" />

              <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-[80px]" />

              <div className="relative">
                {!success ? (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* =================================================
                        NEW PASSWORD
                    ================================================== */}

                    <div>
                      <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-slate-200"
                      >
                        New Password
                      </label>

                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          value={password}
                          onChange={(event) => {
                            setPassword(
                              event.target.value,
                            );

                            if (error) {
                              setError("");
                            }
                          }}
                          onFocus={() =>
                            setPasswordTouched(true)
                          }
                          placeholder="Create a new password"
                          autoComplete="new-password"
                          disabled={isLoading}
                          className={`w-full rounded-xl border bg-slate-950/80 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60 ${
                            passwordTouched &&
                            password.length > 0 &&
                            !isPasswordValid
                              ? "border-amber-500/70"
                              : "border-white/10 focus:border-violet-500"
                          } focus:ring-2 focus:ring-violet-500/20`}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              (visible) =>
                                !visible,
                            )
                          }
                          disabled={isLoading}
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
                        >
                          {showPassword ? (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />

                              <circle
                                cx="12"
                                cy="12"
                                r="3"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m3 3 18 18" />

                              <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />

                              <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c6.5 0 10 8 10 8a18.5 18.5 0 0 1-3.1 4.4" />

                              <path d="M6.6 6.6C3.6 8.7 2 12 2 12s3.5 8 10 8a10.8 10.8 0 0 0 2.1-.2" />
                            </svg>
                          )}
                        </button>
                      </div>

                      {/* Password Rules */}

                      {passwordTouched && (
                        <div className="mt-3 space-y-1.5 rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs">
                          <p className="mb-2 font-medium text-slate-400">
                            Password requirements
                          </p>

                          <p
                            className={
                              passwordRules.minLength
                                ? "text-emerald-400"
                                : "text-slate-500"
                            }
                          >
                            {passwordRules.minLength
                              ? "✓"
                              : "○"}{" "}
                            At least 8 characters
                          </p>

                          <p
                            className={
                              passwordRules.uppercase
                                ? "text-emerald-400"
                                : "text-slate-500"
                            }
                          >
                            {passwordRules.uppercase
                              ? "✓"
                              : "○"}{" "}
                            One uppercase letter
                          </p>

                          <p
                            className={
                              passwordRules.lowercase
                                ? "text-emerald-400"
                                : "text-slate-500"
                            }
                          >
                            {passwordRules.lowercase
                              ? "✓"
                              : "○"}{" "}
                            One lowercase letter
                          </p>

                          <p
                            className={
                              passwordRules.number
                                ? "text-emerald-400"
                                : "text-slate-500"
                            }
                          >
                            {passwordRules.number
                              ? "✓"
                              : "○"}{" "}
                            One number
                          </p>

                          <p
                            className={
                              passwordRules.special
                                ? "text-emerald-400"
                                : "text-slate-500"
                            }
                          >
                            {passwordRules.special
                              ? "✓"
                              : "○"}{" "}
                            One special character
                          </p>
                        </div>
                      )}
                    </div>

                    {/* =================================================
                        CONFIRM PASSWORD
                    ================================================== */}

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="mb-2 block text-sm font-medium text-slate-200"
                      >
                        Confirm Password
                      </label>

                      <div className="relative">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          value={confirmPassword}
                          onChange={(event) => {
                            setConfirmPassword(
                              event.target.value,
                            );

                            if (error) {
                              setError("");
                            }
                          }}
                          onFocus={() =>
                            setConfirmPasswordTouched(
                              true,
                            )
                          }
                          placeholder="Confirm your new password"
                          autoComplete="new-password"
                          disabled={isLoading}
                          className={`w-full rounded-xl border bg-slate-950/80 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60 ${
                            confirmPasswordTouched &&
                            confirmPassword.length > 0 &&
                            !isConfirmPasswordValid
                              ? "border-red-500"
                              : confirmPasswordTouched &&
                                  isConfirmPasswordValid
                                ? "border-emerald-500/60"
                                : "border-white/10 focus:border-violet-500"
                          } focus:ring-2 focus:ring-violet-500/20`}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(
                              (visible) =>
                                !visible,
                            )
                          }
                          disabled={isLoading}
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirm password"
                              : "Show confirm password"
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
                        >
                          {showConfirmPassword ? (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />

                              <circle
                                cx="12"
                                cy="12"
                                r="3"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m3 3 18 18" />

                              <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />

                              <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c6.5 0 10 8 10 8a18.5 18.5 0 0 1-3.1 4.4" />

                              <path d="M6.6 6.6C3.6 8.7 2 12 2 12s3.5 8 10 8a10.8 10.8 0 0 0 2.1-.2" />
                            </svg>
                          )}
                        </button>
                      </div>

                      {confirmPasswordTouched &&
                        confirmPassword.length > 0 && (
                          <p
                            className={`mt-2 text-xs ${
                              isConfirmPasswordValid
                                ? "text-emerald-400"
                                : "text-red-400"
                            }`}
                          >
                            {isConfirmPasswordValid
                              ? "✓ Passwords match"
                              : "✕ Passwords do not match"}
                          </p>
                        )}
                    </div>

                    {/* =================================================
                        ERROR
                    ================================================== */}

                    {error && (
                      <div
                        role="alert"
                        className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                      >
                        {error}
                      </div>
                    )}

                    {/* =================================================
                        BUTTON
                    ================================================== */}

                    <SparkleButton
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isLoading
                        ? "Updating Password..."
                        : "Update Password"}
                    </SparkleButton>
                  </form>
                ) : (
                  /* =================================================
                     SUCCESS
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
                      Password Updated
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Your password has been updated
                      successfully. Redirecting you to
                      login...
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

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

      {/* =========================================================
          SUCCESS CELEBRATION
      ========================================================== */}

      {showCelebration && (
        <CelebrationEffect
          type="sparkles"
          duration={1500}
        />
      )}
    </main>
  );
}