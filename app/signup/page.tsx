"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth/authService";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!isPasswordValid) {
      setPasswordTouched(true);
      setError("Please meet all password requirements.");
      return;
    }

    if (!isConfirmPasswordValid) {
      setConfirmPasswordTouched(true);
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      const data = await signUp(
        name.trim(),
        email.trim(),
        password,
      );

      if (data.session) {
        router.push("/");
        router.refresh();
        return;
      }

      setSuccess(
        "Account created successfully. Please check your email to confirm your account.",
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
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
              Create Your Account
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Start creating beautiful invitations today.
            </p>
          </div>

          {/* Sign Up Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  disabled={isLoading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

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
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={isLoading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onFocus={() => setPasswordTouched(true)}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((visible) => !visible)
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

                {/* Password Requirements */}
                {passwordTouched && (
                  <div className="mt-3 space-y-1.5 rounded-lg bg-slate-950/60 p-3 text-xs">
                    <p
                      className={
                        passwordRules.minLength
                          ? "text-emerald-400"
                          : "text-slate-500"
                      }
                    >
                      {passwordRules.minLength ? "✓" : "○"} At least 8
                      characters
                    </p>

                    <p
                      className={
                        passwordRules.uppercase
                          ? "text-emerald-400"
                          : "text-slate-500"
                      }
                    >
                      {passwordRules.uppercase ? "✓" : "○"} One uppercase
                      letter
                    </p>

                    <p
                      className={
                        passwordRules.lowercase
                          ? "text-emerald-400"
                          : "text-slate-500"
                      }
                    >
                      {passwordRules.lowercase ? "✓" : "○"} One lowercase
                      letter
                    </p>

                    <p
                      className={
                        passwordRules.number
                          ? "text-emerald-400"
                          : "text-slate-500"
                      }
                    >
                      {passwordRules.number ? "✓" : "○"} One number
                    </p>

                    <p
                      className={
                        passwordRules.special
                          ? "text-emerald-400"
                          : "text-slate-500"
                      }
                    >
                      {passwordRules.special ? "✓" : "○"} One special
                      character
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
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
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    onFocus={() =>
                      setConfirmPasswordTouched(true)
                    }
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (visible) => !visible,
                      )
                    }
                    disabled={isLoading}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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

                {/* Confirm Password Validation */}
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

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  {success}
                </div>
              )}

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading
                  ? "Creating Account..."
                  : "Sign Up"}
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

            {/* Login */}
            <p className="text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-violet-400 transition hover:text-violet-300"
              >
                Login
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
    </main>
  );
}