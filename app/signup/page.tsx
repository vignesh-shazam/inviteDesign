"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth/authService";
import SparkleButton from "@/components/ui/SparkleButton";
import CelebrationEffect from "@/components/ui/CelebrationEffect";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

  function handleNameChange(value: string) {
    setName(value);

    if (error) {
      setError("");
    }
  }

  function handleEmailChange(value: string) {
    setEmail(value);

    if (error) {
      setError("");
    }
  }

  function handlePasswordChange(value: string) {
    setPassword(value);

    if (error) {
      setError("");
    }

    if (
      confirmPassword.length > 0 &&
      password !== confirmPassword
    ) {
      setConfirmPasswordTouched(true);
    }
  }

  function handleConfirmPasswordChange(value: string) {
    setConfirmPassword(value);

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);

    /* =========================================================
       VALIDATION
    ========================================================== */

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!isEmailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isPasswordValid) {
      setError("Please meet all password requirements.");
      return;
    }

    if (!isConfirmPasswordValid) {
      setError("Passwords do not match.");
      return;
    }

    /* =========================================================
       SIGN UP
    ========================================================== */

    try {
      setIsLoading(true);

      const data = await signUp(
        name.trim(),
        email.trim(),
        password,
      );

      /* =======================================================
         SESSION CREATED
      ======================================================== */

      if (data.session) {
        setShowCelebration(true);

        window.setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1500);

        return;
      }

      /* =======================================================
         EMAIL CONFIRMATION REQUIRED
      ======================================================== */

      setSuccess(
        "Account created successfully. Please check your email to confirm your account.",
      );

      setIsLoading(false);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "";

      const normalizedMessage =
        message.toLowerCase();

      /* =======================================================
         DUPLICATE / EXISTING ACCOUNT
      ======================================================== */

      if (
        normalizedMessage.includes(
          "user already registered",
        ) ||
        normalizedMessage.includes(
          "already registered",
        ) ||
        normalizedMessage.includes(
          "email already exists",
        )
      ) {
        setError(
          "An account with this email already exists. Please log in instead.",
        );
      }

      /* =======================================================
         INVALID EMAIL
      ======================================================== */

      else if (
        normalizedMessage.includes("invalid email")
      ) {
        setError(
          "Please enter a valid email address.",
        );
      }

      /* =======================================================
         PASSWORD ERROR
      ======================================================== */

      else if (
        normalizedMessage.includes("password")
      ) {
        setError(
          "Your password does not meet the required security rules.",
        );
      }

      /* =======================================================
         GENERIC ERROR
      ======================================================== */

      else {
        setError(
          message ||
            "Something went wrong. Please try again.",
        );
      }

      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-slate-950 px-6 py-12 sm:py-16">

      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Left Glow */}
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[140px]" />

        {/* Right Glow */}
        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-fuchsia-600/10 blur-[140px]" />

        {/* Center Glow */}
        <div className="absolute left-1/2 top-1/3 h-[320px] w-[520px] -translate-x-1/2 rounded-full bg-violet-500/[0.04] blur-[120px]" />

        {/* Grid */}
        <div className="login-grid absolute inset-0 opacity-30" />

      </div>


      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="relative mx-auto flex min-h-[72vh] max-w-md items-center justify-center">

        <div className="w-full">

          {/* =====================================================
              BRAND + HEADING
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
              Create Your Account
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
              Start creating beautiful invitations and
              make every celebration memorable.
            </p>

          </div>


          {/* =====================================================
              SIGNUP CARD
          ====================================================== */}

          <div className="relative overflow-hidden rounded-2xl border border-violet-400/15 bg-slate-900/70 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-7">

            {/* Card Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/10 blur-[70px]" />

            <div className="relative">

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* =================================================
                    FULL NAME
                ================================================== */}

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
                    onChange={(event) =>
                      handleNameChange(
                        event.target.value,
                      )
                    }
                    onFocus={() =>
                      setNameTouched(true)
                    }
                    placeholder="Enter your full name"
                    autoComplete="name"
                    disabled={isLoading}
                    className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60 ${
                      nameTouched &&
                      !name.trim()
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-700 focus:border-violet-500"
                    }`}
                  />

                  {nameTouched &&
                    !name.trim() && (
                      <p className="mt-2 text-xs text-red-400">
                        Please enter your full name.
                      </p>
                    )}

                </div>


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
                      handleEmailChange(
                        event.target.value,
                      )
                    }
                    onFocus={() =>
                      setEmailTouched(true)
                    }
                    placeholder="Enter your email"
                    autoComplete="email"
                    disabled={isLoading}
                    className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60 ${
                      emailTouched &&
                      email.length > 0 &&
                      !isEmailValid
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-700 focus:border-violet-500"
                    }`}
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
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(event) =>
                        handlePasswordChange(
                          event.target.value,
                        )
                      }
                      onFocus={() =>
                        setPasswordTouched(true)
                      }
                      placeholder="Create a password"
                      autoComplete="new-password"
                      disabled={isLoading}
                      className={`w-full rounded-xl border bg-slate-950 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60 ${
                        passwordTouched &&
                        password.length > 0 &&
                        !isPasswordValid
                          ? "border-amber-500/70 focus:border-amber-500"
                          : "border-slate-700 focus:border-violet-500"
                      }`}
                    />

                    {/* Show / Hide */}
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


                  {/* =================================================
                      PASSWORD REQUIREMENTS
                  ================================================== */}

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
                      onChange={(event) =>
                        handleConfirmPasswordChange(
                          event.target.value,
                        )
                      }
                      onFocus={() =>
                        setConfirmPasswordTouched(true)
                      }
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      disabled={isLoading}
                      className={`w-full rounded-xl border bg-slate-950 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60 ${
                        confirmPasswordTouched &&
                        confirmPassword.length > 0 &&
                        !isConfirmPasswordValid
                          ? "border-red-500 focus:border-red-500"
                          : confirmPasswordTouched &&
                              isConfirmPasswordValid
                            ? "border-emerald-500/60 focus:border-emerald-500"
                            : "border-slate-700 focus:border-violet-500"
                      }`}
                    />


                    {/* Show / Hide */}
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
                    SUCCESS
                ================================================== */}

                {success && (
                  <div
                    role="status"
                    className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm leading-6 text-emerald-300"
                  >
                    {success}
                  </div>
                )}


                {/* =================================================
                    SIGN UP BUTTON
                ================================================== */}

                <SparkleButton
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading
                    ? "Creating Account..."
                    : "Create Account"}
                </SparkleButton>

              </form>


              {/* =================================================
                  DIVIDER
              ================================================== */}

              <div className="my-6 flex items-center gap-4">

                <div className="h-px flex-1 bg-slate-800" />

                <span className="text-xs text-slate-500">
                  OR
                </span>

                <div className="h-px flex-1 bg-slate-800" />

              </div>


              {/* =================================================
                  LOGIN
              ================================================== */}

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

          </div>


          {/* =====================================================
              BACK HOME
          ====================================================== */}

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