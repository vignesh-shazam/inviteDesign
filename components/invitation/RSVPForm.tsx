"use client";

import { FormEvent, useState } from "react";

import type { RSVPAttendance } from "@/lib/db/database.types";

type RSVPFormProps = {
  invitationId: string;
  primaryColor: string;
  textColor: string;
};

export default function RSVPForm({
  invitationId,
  primaryColor,
  textColor,
}: RSVPFormProps) {
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] =
    useState<RSVPAttendance>("attending");
  const [guestCount, setGuestCount] = useState("1");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSubmitMessage("");
    setIsSuccess(false);

    const trimmedName = guestName.trim();
    const parsedGuestCount = Number(guestCount);

    if (!trimmedName) {
      setSubmitMessage("Please enter your name.");
      return;
    }

    if (
      !Number.isInteger(parsedGuestCount) ||
      parsedGuestCount < 1 ||
      parsedGuestCount > 20
    ) {
      setSubmitMessage(
        "Guest count must be between 1 and 20.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/rsvps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invitationId,
          guestName: trimmedName,
          attendance,
          guestCount: parsedGuestCount,
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitMessage(
          data.error ?? "Failed to submit RSVP.",
        );
        return;
      }

      setIsSuccess(true);
      setSubmitMessage(
        "Thank you! Your RSVP has been submitted successfully.",
      );

      setGuestName("");
      setAttendance("attending");
      setGuestCount("1");
      setMessage("");
    } catch {
      setSubmitMessage(
        "Something went wrong while submitting your RSVP.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto mt-10 max-w-4xl">
      <div
        className="rounded-3xl border p-6 sm:p-8"
        style={{
          borderColor: `${primaryColor}55`,
          backgroundColor: `${primaryColor}12`,
        }}
      >
        <div className="text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              color: primaryColor,
            }}
          >
            RSVP
          </p>

          <h2
            className="mt-3 text-2xl font-semibold"
            style={{
              color: textColor,
            }}
          >
            Will you join us?
          </h2>

          <p
            className="mx-auto mt-2 max-w-xl text-sm leading-6"
            style={{
              color: textColor,
              opacity: 0.75,
            }}
          >
            Please let us know if you will be able to attend.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 max-w-2xl space-y-6"
        >
          {/* Guest Name */}
          <div>
            <label
              htmlFor="guestName"
              className="mb-2 block text-sm font-medium"
              style={{
                color: textColor,
              }}
            >
              Your Name
            </label>

            <input
              id="guestName"
              type="text"
              value={guestName}
              onChange={(event) =>
                setGuestName(event.target.value)
              }
              placeholder="Enter your name"
              maxLength={100}
              required
              className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition placeholder:opacity-50 focus:ring-2"
              style={{
                borderColor: `${primaryColor}55`,
                color: textColor,
              }}
            />
          </div>

          {/* Attendance */}
          <fieldset>
            <legend
              className="mb-3 block text-sm font-medium"
              style={{
                color: textColor,
              }}
            >
              Will you attend?
            </legend>

            <div className="grid gap-3 sm:grid-cols-3">
              <label
                className="cursor-pointer rounded-xl border p-4 transition"
                style={{
                  borderColor:
                    attendance === "attending"
                      ? primaryColor
                      : `${primaryColor}55`,
                  backgroundColor:
                    attendance === "attending"
                      ? `${primaryColor}18`
                      : "transparent",
                }}
              >
                <input
                  type="radio"
                  name="attendance"
                  value="attending"
                  checked={attendance === "attending"}
                  onChange={() =>
                    setAttendance("attending")
                  }
                  className="sr-only"
                />

                <span
                  className="block text-center text-sm font-semibold"
                  style={{
                    color: textColor,
                  }}
                >
                  I'll Attend
                </span>
              </label>

              <label
                className="cursor-pointer rounded-xl border p-4 transition"
                style={{
                  borderColor:
                    attendance === "maybe"
                      ? primaryColor
                      : `${primaryColor}55`,
                  backgroundColor:
                    attendance === "maybe"
                      ? `${primaryColor}18`
                      : "transparent",
                }}
              >
                <input
                  type="radio"
                  name="attendance"
                  value="maybe"
                  checked={attendance === "maybe"}
                  onChange={() =>
                    setAttendance("maybe")
                  }
                  className="sr-only"
                />

                <span
                  className="block text-center text-sm font-semibold"
                  style={{
                    color: textColor,
                  }}
                >
                  Maybe
                </span>
              </label>

              <label
                className="cursor-pointer rounded-xl border p-4 transition"
                style={{
                  borderColor:
                    attendance === "not_attending"
                      ? primaryColor
                      : `${primaryColor}55`,
                  backgroundColor:
                    attendance === "not_attending"
                      ? `${primaryColor}18`
                      : "transparent",
                }}
              >
                <input
                  type="radio"
                  name="attendance"
                  value="not_attending"
                  checked={attendance === "not_attending"}
                  onChange={() =>
                    setAttendance("not_attending")
                  }
                  className="sr-only"
                />

                <span
                  className="block text-center text-sm font-semibold"
                  style={{
                    color: textColor,
                  }}
                >
                  Can't Attend
                </span>
              </label>
            </div>
          </fieldset>

          {/* Guest Count */}
          <div>
            <label
              htmlFor="guestCount"
              className="mb-2 block text-sm font-medium"
              style={{
                color: textColor,
              }}
            >
              Number of Guests
            </label>

            <select
              id="guestCount"
              value={guestCount}
              onChange={(event) =>
                setGuestCount(event.target.value)
              }
              className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition"
              style={{
                borderColor: `${primaryColor}55`,
                color: textColor,
              }}
            >
              {Array.from({ length: 20 }, (_, index) => {
                const count = index + 1;

                return (
                  <option
                    key={count}
                    value={count}
                    className="bg-slate-900 text-white"
                  >
                    {count}{" "}
                    {count === 1 ? "Guest" : "Guests"}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="rsvpMessage"
              className="mb-2 block text-sm font-medium"
              style={{
                color: textColor,
              }}
            >
              Message{" "}
              <span className="opacity-60">
                (Optional)
              </span>
            </label>

            <textarea
              id="rsvpMessage"
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Add a message for the host..."
              rows={4}
              maxLength={500}
              className="w-full resize-none rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition placeholder:opacity-50"
              style={{
                borderColor: `${primaryColor}55`,
                color: textColor,
              }}
            />
          </div>

          {/* Submit Message */}
          {submitMessage && (
            <div
              className="rounded-xl border px-4 py-3 text-sm"
              style={{
                borderColor: isSuccess
                  ? "rgba(16, 185, 129, 0.35)"
                  : "rgba(239, 68, 68, 0.35)",
                backgroundColor: isSuccess
                  ? "rgba(16, 185, 129, 0.10)"
                  : "rgba(239, 68, 68, 0.10)",
                color: isSuccess
                  ? "#6ee7b7"
                  : "#fca5a5",
              }}
            >
              {submitMessage}
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-w-44 items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundColor: primaryColor,
                color: textColor,
              }}
            >
              {isSubmitting
                ? "Submitting..."
                : "Submit RSVP"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}