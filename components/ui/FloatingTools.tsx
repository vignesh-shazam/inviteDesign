"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "glass";
type OpenPanel = "theme" | "chat" | null;

const THEME_STORAGE_KEY = "myinviteverse-theme";

export default function FloatingTools() {
  const [openPanel, setOpenPanel] =
    useState<OpenPanel>(null);

  const [theme, setTheme] =
    useState<ThemeMode>("dark");

  const [isThemeLoaded, setIsThemeLoaded] =
    useState(false);

  const isThemeOpen = openPanel === "theme";
  const isChatOpen = openPanel === "chat";

  /*
   * Load saved theme
   */
  useEffect(() => {
    try {
      const savedTheme =
        window.localStorage.getItem(
          THEME_STORAGE_KEY,
        );

      if (
        savedTheme === "light" ||
        savedTheme === "dark" ||
        savedTheme === "glass"
      ) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error(
        "Unable to load saved theme:",
        error,
      );
    } finally {
      setIsThemeLoaded(true);
    }
  }, []);

  /*
   * Apply theme to the document
   */
  useEffect(() => {
    if (!isThemeLoaded) {
      return;
    }

    document.documentElement.dataset.theme =
      theme;

    try {
      window.localStorage.setItem(
        THEME_STORAGE_KEY,
        theme,
      );
    } catch (error) {
      console.error(
        "Unable to save theme:",
        error,
      );
    }
  }, [theme, isThemeLoaded]);

  /*
   * Escape key closes any open panel
   */
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenPanel(null);
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  /*
   * Theme toggle
   */
  function toggleTheme() {
    setOpenPanel((current) =>
      current === "theme"
        ? null
        : "theme",
    );
  }

  /*
   * AI chat toggle
   *
   * If Theme is open:
   * Theme closes
   * Chat opens
   */
  function toggleChat() {
    setOpenPanel((current) =>
      current === "chat"
        ? null
        : "chat",
    );
  }

  /*
   * Close currently opened panel
   */
  function closePanel() {
    setOpenPanel(null);
  }

  /*
   * Change theme
   */
  function handleThemeChange(
    nextTheme: ThemeMode,
  ) {
    setTheme(nextTheme);

    // Close theme panel automatically
    setOpenPanel(null);
  }

  return (
    <>
      {/* =====================================================
          OUTSIDE CLICK BACKDROP
          ===================================================== */}

      {openPanel !== null && (
        <button
          type="button"
          aria-label="Close open panel"
          onClick={closePanel}
          className="fixed inset-0 z-[80] cursor-default bg-transparent"
        />
      )}

      {/* =====================================================
          FLOATING TOOLS
          ===================================================== */}

      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
        {/* ===================================================
            THEME PANEL
            =================================================== */}

        {isThemeOpen && (
          <div
            className="w-56 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Title */}
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Theme
            </p>

            {/* ===============================
                LIGHT
                =============================== */}

            <button
              type="button"
              onClick={() =>
                handleThemeChange("light")
              }
              className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition ${
                theme === "light"
                  ? "bg-sky-500 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  ☀
                </span>

                <span className="text-sm font-semibold">
                  Light
                </span>
              </span>

              {theme === "light" && (
                <span>✓</span>
              )}
            </button>

            {/* ===============================
                DARK
                =============================== */}

            <button
              type="button"
              onClick={() =>
                handleThemeChange("dark")
              }
              className={`mt-2 flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition ${
                theme === "dark"
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  ◐
                </span>

                <span className="text-sm font-semibold">
                  Dark
                </span>
              </span>

              {theme === "dark" && (
                <span>✓</span>
              )}
            </button>

            {/* ===============================
                GLASS
                =============================== */}

            <button
              type="button"
              onClick={() =>
                handleThemeChange("glass")
              }
              className={`mt-2 flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition ${
                theme === "glass"
                  ? "bg-violet-500 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  ▦
                </span>

                <span className="text-sm font-semibold">
                  Glass
                </span>
              </span>

              {theme === "glass" && (
                <span>✓</span>
              )}
            </button>
          </div>
        )}

        {/* ===================================================
            AI CHAT PANEL
            =================================================== */}

        {isChatOpen && (
          <div
            className="mb-1 w-[340px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-white">
                  MyInviteVerse AI
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Invitation assistant
                </p>
              </div>

              <button
                type="button"
                onClick={closePanel}
                aria-label="Close AI chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Chat Content */}
            <div className="min-h-[220px] px-5 py-5">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-800 px-4 py-3">
                <p className="text-sm leading-6 text-slate-200">
                  Hi! 👋
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-300">
                  I can help you create your
                  invitation, choose a design,
                  write invitation text, and more.
                </p>
              </div>
            </div>

            {/* Chat Input */}
            <div className="border-t border-slate-800 p-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">
                <input
                  type="text"
                  placeholder="Ask something..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                />

                <button
                  type="button"
                  aria-label="Send message"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500 text-white transition hover:bg-violet-400"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================
            THEME BUTTON
            =================================================== */}

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            isThemeOpen
              ? "Close theme settings"
              : "Open theme settings"
          }
          aria-expanded={isThemeOpen}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 text-xl text-white shadow-xl transition hover:scale-105"
        >
          {isThemeOpen ? "✕" : "☀"}
        </button>

        {/* ===================================================
            AI CHAT BUTTON
            =================================================== */}

        <button
          type="button"
          onClick={toggleChat}
          aria-label={
            isChatOpen
              ? "Close AI assistant"
              : "Open AI assistant"
          }
          aria-expanded={isChatOpen}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl text-white shadow-xl transition hover:scale-105 hover:bg-blue-500"
        >
          {isChatOpen ? "✕" : "◯"}
        </button>
      </div>
    </>
  );
}