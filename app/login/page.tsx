"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth/authService";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPasswordValid = password.length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
        router.push("/");
        router.refresh();
        return;
      }

      setError("Unable to sign in. Please try again.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "";

      if (
        message.toLowerCase().includes("invalid login credentials") ||
        message.toLowerCase().includes("invalid credentials")
      ) {
        setError("Invalid email or password.");
      } else {
        setError(
          "Unable to sign in. Please check your details and try again.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-950 px-6 py-16">
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
        <div className="w-full">
          {/* Heading */}
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-white"
            >
              My<span className="text-violet-400">InviteVerse</span>
            </Link>

            <h1 className="mt-8 text-3xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Sign in to continue creating beautiful invitations.
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
            <form onSubmit={handleSubmit} className="space-y-5">
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
                  onChange={(event) => setEmail(event.target.value)}
                  onFocus={() => setEmailTouched(true)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={isLoading}
                  className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60 ${
                    emailTouched && email && !isEmailValid
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-700 focus:border-violet-500"
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

              {/* Password */}
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
                      showPassword ? "text" : "password"
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
                    className={`w-full rounded-xl border bg-slate-950 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60 ${
                      passwordTouched &&
                      password.length === 0
                        ? "border-red-500"
                        : "border-slate-700 focus:border-violet-500"
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
                        <circle cx="12" cy="12" r="3" />
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

                {passwordTouched && password.length === 0 && (
                  <p className="mt-2 text-xs text-red-400">
                    Please enter your password.
                  </p>
                )}
              </div>

              {/* Inline Error */}
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
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>

                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Signing In..." : "Login"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-800" />

              <span className="text-xs text-slate-500">
                OR
              </span>

              <div className="h-px flex-1 bg-slate-800" />
            </div>

            {/* Sign Up */}
            <p className="text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-violet-400 transition hover:text-violet-300"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Back Home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-slate-500 transition hover:text-slate-300"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Invalid Credentials Popup */}
      {error === "Invalid email or password." && (
        <div className="pointer-events-none fixed inset-x-0 top-6 z-[100] flex justify-center px-4">
          <div
            role="alert"
            className="pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-xl border border-red-500/40 bg-slate-900 px-5 py-4 text-sm text-red-300 shadow-2xl shadow-black/40"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 shrink-0 text-red-400"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>

            <div>
              <p className="font-semibold text-white">
                Login failed
              </p>

              <p className="mt-1 text-red-300">
                Invalid email or password. Please check your
                credentials and try again.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}