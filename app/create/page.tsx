"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function CreateInvitationPage() {
  const [eventType, setEventType] = useState("Wedding");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({
      eventType,
      title,
      date,
      time,
      venue,
      message,
    });
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <Link
            href="/invitations"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            ← Back to My Invitations
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            Invitation Creator
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Create Invitation
          </h1>

          <p className="mt-3 text-slate-400">
            Add your event details and create a beautiful invitation.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8"
          >
            <div className="space-y-6">
              {/* Event Type */}
              <div>
                <label
                  htmlFor="eventType"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Event Type
                </label>

                <select
                  id="eventType"
                  value={eventType}
                  onChange={(event) => setEventType(event.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
                >
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Engagement</option>
                  <option>Anniversary</option>
                  <option>Baby Shower</option>
                  <option>Housewarming</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Event Title
                </label>

                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Arun & Priya Wedding"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-violet-500"
                />
              </div>

              {/* Date & Time */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="date"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Date
                  </label>

                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Time
                  </label>

                  <input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
                  />
                </div>
              </div>

              {/* Venue */}
              <div>
                <label
                  htmlFor="venue"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Venue
                </label>

                <input
                  id="venue"
                  type="text"
                  value={venue}
                  onChange={(event) => setVenue(event.target.value)}
                  placeholder="Chennai, Tamil Nadu"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-violet-500"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Invitation Message
                </label>

                <textarea
                  id="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="We would love to celebrate this special moment with you."
                  rows={5}
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition focus:border-violet-500"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="submit"
                  className="rounded-full bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400"
                >
                  Save Draft
                </button>

                <Link
                  href="/preview"
                  className="rounded-full border border-slate-700 px-6 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
                >
                  Preview
                </Link>
              </div>
            </div>
          </form>

          {/* Information Panel */}
          <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
              Next Steps
            </p>

            <h2 className="mt-3 text-xl font-semibold text-white">
              Build your invitation
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <span className="text-sm font-semibold text-white">
                  01. Add event details
                </span>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Tell your guests when and where your event will happen.
                </p>
              </div>

              <div>
                <span className="text-sm font-semibold text-white">
                  02. Choose a design
                </span>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Select a design that matches your celebration.
                </p>
              </div>

              <div>
                <span className="text-sm font-semibold text-white">
                  03. Publish and share
                </span>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Generate your invitation link and share it with your guests.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}