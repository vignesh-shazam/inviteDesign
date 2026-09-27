"use client";

import type { ReactNode } from "react";
import { useState } from "react";

type InvitationOpeningProps = {
  title: string;
  category: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  children: ReactNode;
};

type ButtonPosition = {
  top: string;
  left: string;
};

const buttonPositions: ButtonPosition[] = [
  {
    top: "50%",
    left: "50%",
  },
  {
    top: "10%",
    left: "10%",
  },
  {
    top: "10%",
    left: "60%",
  },
  {
    top: "55%",
    left: "10%",
  },
  {
    top: "55%",
    left: "60%",
  },
];

export default function InvitationOpening({
  title,
  primaryColor,
  secondaryColor,
  backgroundColor,
  textColor,
  children,
}: InvitationOpeningProps) {
  const [isOpened, setIsOpened] = useState(false);

  const [dontOpenPosition, setDontOpenPosition] =
    useState<ButtonPosition>(buttonPositions[0]);

  function handleOpenInvitation() {
    setIsOpened(true);
  }

  function moveDontOpenButton() {
    setDontOpenPosition((currentPosition) => {
      const currentIndex = buttonPositions.findIndex(
        (position) =>
          position.top === currentPosition.top &&
          position.left === currentPosition.left,
      );

      let nextIndex =
        Math.floor(Math.random() * buttonPositions.length);

      if (nextIndex === currentIndex) {
        nextIndex =
          (nextIndex + 1) % buttonPositions.length;
      }

      return buttonPositions[nextIndex];
    });
  }

  return (
    <div className="relative min-h-screen">
      {/* Invitation Opening Screen */}
      {!isOpened && (
        <section
          className="fixed inset-0 z-50 flex min-h-screen items-center justify-center px-4 sm:px-6"
          style={{
            backgroundColor,
          }}
        >
          <div className="w-full max-w-lg text-center">
            <div
              className="rounded-3xl border p-7 shadow-xl sm:p-12"
              style={{
                borderColor: `${primaryColor}55`,
                backgroundColor: `${primaryColor}10`,
              }}
            >
              {/* Heading */}
              <p
                className="text-xs font-semibold uppercase tracking-[0.3em]"
                style={{
                  color: secondaryColor,
                }}
              >
                You're Invited
              </p>

              {/* Invitation Title */}
              <h1
                className="mt-6 text-3xl font-bold leading-tight sm:text-5xl"
                style={{
                  color: textColor,
                }}
              >
                {title}
              </h1>

              {/* Description */}
              <p
                className="mx-auto mt-6 max-w-sm text-sm leading-6"
                style={{
                  color: secondaryColor,
                }}
              >
                A special invitation has been created for you.
              </p>

              {/* Buttons */}
              <div className="mx-auto mt-8 grid w-full max-w-md grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {/* Open Invitation Zone */}
                <div className="flex h-14 items-center justify-center">
                  <button
                    type="button"
                    onClick={handleOpenInvitation}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-md transition-all duration-200 hover:scale-[1.03] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto"
                    style={{
                      backgroundColor: primaryColor,
                      color: backgroundColor,
                    }}
                  >
                    Open Invitation
                  </button>
                </div>

                {/* Don't Open Zone */}
                <div className="relative h-14 w-full">
                  <button
                    type="button"
                    onMouseEnter={moveDontOpenButton}
                    onClick={moveDontOpenButton}
                    className="absolute min-h-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-5 py-2 text-xs font-medium transition-all duration-200"
                    style={{
                      top: dontOpenPosition.top,
                      left: dontOpenPosition.left,
                      borderColor: `${primaryColor}55`,
                      color: secondaryColor,
                      backgroundColor,
                    }}
                  >
                    Don't Open
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Invitation Content */}
      <div
        className={
          isOpened
            ? "animate-in fade-in duration-700"
            : "pointer-events-none h-screen overflow-hidden opacity-0"
        }
      >
        {children}
      </div>
    </div>
  );
}