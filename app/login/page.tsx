"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth/authService";
import SparkleButton from "@/components/ui/SparkleButton";
import CelebrationEffect from "@/components/ui/CelebrationEffect";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCelebration, setShowCelebration] =
    useState(false);

  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    setEmailTouched(true);
    setPasswordTouched(true);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!isEmailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setIsLoading(true);

      const data = await signIn(
        email.trim(),
        password,
      );

      if (data.session) {
        setShowCelebration(true);

        window.setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1500);

        return;
      }

      setError(
        "Unable to sign in. Please try again.",
      );

      setIsLoading(false);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "";

      if (
        message
          .toLowerCase()
          .includes("invalid login credentials") ||
        message
          .toLowerCase()
          .includes("invalid credentials")
      ) {
        setError("Invalid email or password.");
      } else {
        setError(
          "Unable to sign in. Please check your details and try again.",
        );
      }

      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-12 sm:py-16">

      {/* =========================================================
          VIDEO BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <video
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-[0.16]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src="/videos/invitation-showcase.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-slate-950/75" />

        {/* Violet overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(139,92,246,0.18),transparent_45%)]" />

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950" />

      </div>


      {/* =========================================================
          AMBIENT LIGHT
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[140px]" />

        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-fuchsia-600/10 blur-[140px]" />

        <div className="absolute left-1/2 top-1/3 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/[0.06] blur-[120px]" />

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
              Welcome Back
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Sign in to continue creating beautiful invitations.
            </p>

          </div>


          {/* =====================================================
              LOGIN CARD
          ====================================================== */}

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/65 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-7">

            {/* Card Glow */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-violet-500/15 blur-[80px]" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-[80px]" />

            <div className="relative">

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* =================================================
                    EMAIL
                ================================================== */}

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
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    onFocus={() =>
                      setEmailTouched(true)
                    }
                    placeholder="Enter your email"
                    autoComplete="email"
                    disabled={isLoading}
                    className={`w-full rounded-xl border bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60 ${
                      emailTouched &&
                      email &&
                      !isEmailValid
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/10 focus:border-violet-500"
                    } focus:ring-2 focus:ring-violet-500/20`}
                  />

                  {emailTouched &&
                    email.length > 0 &&
                    !isEmailValid && (
                      <p className="mt-2 text-xs text-red-400">
                        Please enter a valid email address.
                      </p>
                    )}

                </div>


                {/* =================================================
                    PASSWORD
                ================================================== */}

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-200"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs text-violet-400 transition hover:text-violet-300"
                    >
                      Forgot password?
                    </button>

                  </div>


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
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      onFocus={() =>
                        setPasswordTouched(true)
                      }
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={isLoading}
                      className={`w-full rounded-xl border bg-slate-950/80 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60 ${
                        passwordTouched &&
                        password.length === 0
                          ? "border-red-500"
                          : "border-white/10 focus:border-violet-500"
                      } focus:ring-2 focus:ring-violet-500/20`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (visible) => !visible,
                        )
                      }
                      disabled={isLoading}
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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


                  {passwordTouched &&
                    password.length === 0 && (
                      <p className="mt-2 text-xs text-red-400">
                        Please enter your password.
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

                    <div className="flex items-start gap-3">

                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 shrink-0"
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

                      <span>{error}</span>

                    </div>

                  </div>
                )}


                {/* =================================================
                    LOGIN BUTTON
                ================================================== */}

                <SparkleButton
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading
                    ? "Signing In..."
                    : "Login"}
                </SparkleButton>

              </form>


              {/* =================================================
                  DIVIDER
              ================================================== */}

              <div className="my-6 flex items-center gap-4">

                <div className="h-px flex-1 bg-white/10" />

                <span className="text-xs text-slate-500">
                  OR
                </span>

                <div className="h-px flex-1 bg-white/10" />

              </div>


              {/* =================================================
                  SIGN UP
              ================================================== */}

              <p className="text-center text-sm text-slate-400">

                Don&apos;t have an account?{" "}

                <Link
                  href="/signup"
                  className="font-semibold text-violet-400 transition hover:text-violet-300"
                >
                  Sign Up
                </Link>

              </p>

            </div>

          </div>


          {/* =====================================================
              BACK TO HOME
          ====================================================== */}

          <div className="mt-6 flex justify-center">

            <Link
              href="/"
              className="group inline-flex items-center rounded-full border border-violet-400/25 bg-slate-900/40 px-5 py-2.5 text-sm font-medium text-slate-400 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white hover:shadow-[0_10px_35px_rgba(139,92,246,0.18)]"
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