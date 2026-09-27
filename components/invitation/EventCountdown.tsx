"use client";

import { useEffect, useState } from "react";

type EventCountdownProps = {
  eventDate: string;
  eventTime: string;
  primaryColor: string;
  textColor: string;
};

type CountdownValues = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(
  eventDate: string,
  eventTime: string,
): CountdownValues | null {
  const targetDate = new Date(
    `${eventDate}T${eventTime || "00:00"}:00`,
  );

  if (Number.isNaN(targetDate.getTime())) {
    return null;
  }

  const difference = targetDate.getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const totalSeconds = Math.floor(difference / 1000);

  return {
    days: Math.floor(totalSeconds / (24 * 60 * 60)),
    hours: Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60)),
    minutes: Math.floor((totalSeconds % (60 * 60)) / 60),
    seconds: totalSeconds % 60,
  };
}

function formatNumber(value: number) {
  return value.toString().padStart(2, "0");
}

export default function EventCountdown({
  eventDate,
  eventTime,
  primaryColor,
  textColor,
}: EventCountdownProps) {
  const [countdown, setCountdown] = useState<CountdownValues | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    function updateCountdown() {
      const targetDate = new Date(
        `${eventDate}T${eventTime || "00:00"}:00`,
      );

      if (Number.isNaN(targetDate.getTime())) {
        setCountdown(null);
        setHasStarted(false);
        return;
      }

      const difference = targetDate.getTime() - Date.now();

      if (difference <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        setHasStarted(true);
        return;
      }

      setHasStarted(false);
      setCountdown(getCountdown(eventDate, eventTime));
    }

    updateCountdown();

    const interval = window.setInterval(updateCountdown, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [eventDate, eventTime]);

  if (!eventDate) {
    return null;
  }

  if (countdown === null) {
    return (
      <section className="mx-auto w-full max-w-4xl px-4 py-8">
        <div
          className="rounded-2xl border bg-white/80 p-6 text-center shadow-sm backdrop-blur-sm"
          style={{
            borderColor: `${primaryColor}40`,
            color: textColor,
          }}
        >
          <p className="text-lg font-semibold">
            Event date and time to be announced
          </p>
        </div>
      </section>
    );
  }

  if (hasStarted) {
    return (
      <section className="mx-auto w-full max-w-4xl px-4 py-8">
        <div
          className="rounded-2xl border bg-white/80 p-6 text-center shadow-sm backdrop-blur-sm"
          style={{
            borderColor: `${primaryColor}40`,
            color: textColor,
          }}
        >
          <p
            className="text-2xl font-bold"
            style={{ color: primaryColor }}
          >
            The event has started!
          </p>

          <p className="mt-2 text-sm opacity-70">
            We hope you have a wonderful time.
          </p>
        </div>
      </section>
    );
  }

  const countdownItems = [
    {
      label: "Days",
      value: countdown.days,
    },
    {
      label: "Hours",
      value: countdown.hours,
    },
    {
      label: "Minutes",
      value: countdown.minutes,
    },
    {
      label: "Seconds",
      value: countdown.seconds,
    },
  ];

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-8">
      <div
        className="overflow-hidden rounded-3xl border bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:p-7"
        style={{
          borderColor: `${primaryColor}40`,
          color: textColor,
        }}
      >
        <div className="text-center">
          <p
            className="text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: primaryColor }}
          >
            Countdown
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            The celebration begins in
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {countdownItems.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border p-4 text-center sm:p-5"
              style={{
                borderColor: `${primaryColor}30`,
                backgroundColor: `${primaryColor}08`,
              }}
            >
              <div
                className="text-3xl font-bold tabular-nums sm:text-4xl"
                style={{ color: primaryColor }}
              >
                {item.label === "Days"
                  ? item.value
                  : formatNumber(item.value)}
              </div>

              <div className="mt-1 text-xs font-medium uppercase tracking-wider opacity-70 sm:text-sm">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}