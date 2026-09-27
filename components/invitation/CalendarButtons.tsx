"use client";

type CalendarButtonsProps = {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description?: string;
  primaryColor: string;
  textColor: string;
};

function formatGoogleCalendarDate(
  date: string,
  time: string,
): string | null {
  if (!date || !time) {
    return null;
  }

  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  if (
    !year ||
    !month ||
    !day ||
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return null;
  }

  const start = new Date(
    year,
    month - 1,
    day,
    hours,
    minutes,
  );

  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

  const formatDate = (value: Date) =>
    value
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}Z$/, "Z");

  return `${formatDate(start)}/${formatDate(end)}`;
}

function buildGoogleCalendarUrl({
  title,
  date,
  time,
  venue,
  address,
  description,
}: CalendarButtonsProps): string | null {
  const calendarDate = formatGoogleCalendarDate(date, time);

  if (!calendarDate) {
    return null;
  }

  const location = [venue, address]
    .filter(Boolean)
    .join(", ");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: calendarDate,
    location,
    details: description ?? "",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function formatIcsDate(
  date: string,
  time: string,
): string | null {
  if (!date || !time) {
    return null;
  }

  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  if (
    !year ||
    !month ||
    !day ||
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return null;
  }

  const start = new Date(
    year,
    month - 1,
    day,
    hours,
    minutes,
  );

  return start
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

function downloadIcsFile({
  title,
  date,
  time,
  venue,
  address,
  description,
}: CalendarButtonsProps) {
  const start = formatIcsDate(date, time);

  if (!start) {
    return;
  }

  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  const startDate = new Date(
    year,
    month - 1,
    day,
    hours,
    minutes,
  );

  const endDate = new Date(
    startDate.getTime() + 2 * 60 * 60 * 1000,
  );

  const formatDate = (value: Date) =>
    value
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}Z$/, "Z");

  const location = [venue, address]
    .filter(Boolean)
    .join(", ");

  const now = formatDate(new Date());

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//InviteDesign//Event Invitation//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID()}@invitedesign`,
    `DTSTAMP:${now}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${escapeIcsText(title)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `DESCRIPTION:${escapeIcsText(description ?? "")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], {
    type: "text/calendar;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "invitation"}.ics`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export default function CalendarButtons({
  title,
  date,
  time,
  venue,
  address,
  description,
  primaryColor,
  textColor,
}: CalendarButtonsProps) {
  const googleCalendarUrl = buildGoogleCalendarUrl({
    title,
    date,
    time,
    venue,
    address,
    description,
    primaryColor,
    textColor,
  });

  const hasCalendarDate = Boolean(
    date && time,
  );

  return (
    <section className="mx-auto mt-10 max-w-4xl">
      <div
        className="rounded-2xl border p-6 text-center"
        style={{
          borderColor: `${primaryColor}55`,
          backgroundColor: `${primaryColor}12`,
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{
            color: primaryColor,
          }}
        >
          Calendar
        </p>

        <h2
          className="mt-3 text-xl font-semibold"
          style={{
            color: textColor,
          }}
        >
          Save the Date
        </h2>

        <p
          className="mx-auto mt-2 max-w-xl text-sm leading-6"
          style={{
            color: textColor,
            opacity: 0.75,
          }}
        >
          Add this event to your calendar so you don't miss it.
        </p>

        {hasCalendarDate ? (
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            {googleCalendarUrl && (
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-90"
                style={{
                  backgroundColor: primaryColor,
                  color: textColor,
                }}
              >
                📅 Google Calendar
              </a>
            )}

            <button
              type="button"
              onClick={() =>
                downloadIcsFile({
                  title,
                  date,
                  time,
                  venue,
                  address,
                  description,
                  primaryColor,
                  textColor,
                })
              }
              className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition hover:opacity-90"
              style={{
                borderColor: `${primaryColor}88`,
                color: textColor,
              }}
            >
              📥 Download Calendar (.ics)
            </button>
          </div>
        ) : (
          <p
            className="mt-5 text-sm"
            style={{
              color: textColor,
              opacity: 0.7,
            }}
          >
            Calendar options will be available once the event date and
            time are added.
          </p>
        )}
      </div>
    </section>
  );
}