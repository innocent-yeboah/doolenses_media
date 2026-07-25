"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import type { CalendarEvent } from "@/lib/admin/dashboard-data";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface MonthCalendarProps {
  year: number;
  month: number;
  events: CalendarEvent[];
}

export function MonthCalendar({ year, month, events }: MonthCalendarProps) {
  const router = useRouter();
  const current = new Date(year, month - 1, 1);
  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(current);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startPad = monthStart.getDay();
  const padCells = Array.from({ length: startPad }, (_, i) => i);

  function navigate(delta: number) {
    const next = delta > 0 ? addMonths(current, 1) : subMonths(current, 1);
    router.push(`/admin/calendar?year=${next.getFullYear()}&month=${next.getMonth() + 1}`);
  }

  function eventsForDay(date: Date) {
    const key = format(date, "yyyy-MM-dd");
    return events.filter((e) => e.date === key);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-md border border-white/10 px-3 py-1.5 text-sm text-brand-muted hover:text-white"
        >
          Previous
        </button>
        <h2 className="font-display text-xl font-semibold text-white">
          {format(current, "MMMM yyyy")}
        </h2>
        <button
          type="button"
          onClick={() => navigate(1)}
          className="rounded-md border border-white/10 px-3 py-1.5 text-sm text-brand-muted hover:text-white"
        >
          Next
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-brand-surface/40">
        <div className="grid grid-cols-7 border-b border-white/10 bg-brand-navy/60 text-center text-xs font-semibold uppercase tracking-wider text-brand-slate">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="px-2 py-3">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {padCells.map((i) => (
            <div key={`pad-${i}`} className="min-h-[100px] border-b border-r border-white/5 bg-brand-navy/20" />
          ))}
          {days.map((day) => {
            const dayEvents = eventsForDay(day);
            return (
              <div
                key={day.toISOString()}
                className={`min-h-[100px] border-b border-r border-white/5 p-2 ${
                  isToday(day) ? "bg-brand-gold/5" : ""
                } ${!isSameMonth(day, current) ? "opacity-40" : ""}`}
              >
                <p
                  className={`mb-1 text-xs font-medium ${
                    isToday(day) ? "text-brand-gold" : "text-brand-slate"
                  }`}
                >
                  {format(day, "d")}
                </p>
                <ul className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <li key={`${event.type}-${event.id}`}>
                      <Link
                        href={
                          event.type === "lead"
                            ? `/admin/leads/${event.id}`
                            : `/admin/projects/${event.id}`
                        }
                        className="block truncate rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-brand-muted hover:bg-brand-gold/10 hover:text-brand-gold"
                      >
                        {event.title}
                      </Link>
                    </li>
                  ))}
                  {dayEvents.length > 3 ? (
                    <li className="text-[10px] text-brand-slate">+{dayEvents.length - 3} more</li>
                  ) : null}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {events.length > 0 ? (
        <div className="rounded-lg border border-white/10 bg-brand-surface/40 p-4">
          <h3 className="mb-3 text-sm font-semibold text-white">All events this month</h3>
          <ul className="divide-y divide-white/10">
            {events.map((event) => (
              <li key={`${event.type}-${event.id}`} className="flex items-center justify-between py-2">
                <div>
                  <Link
                    href={
                      event.type === "lead"
                        ? `/admin/leads/${event.id}`
                        : `/admin/projects/${event.id}`
                    }
                    className="text-sm text-white hover:text-brand-gold"
                  >
                    {event.title}
                  </Link>
                  <p className="text-xs text-brand-slate">
                    {format(new Date(`${event.date}T00:00:00`), "d MMM yyyy")} · {event.type}
                  </p>
                </div>
                <StatusBadge status={event.status} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
