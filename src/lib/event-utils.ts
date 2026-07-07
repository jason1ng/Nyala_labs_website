import type { Activity } from "@/types";

// ─── Status Types ────────────────────────────────────────
export type EventStatus = "upcoming" | "ongoing" | "past";

// ─── Core Status Logic ──────────────────────────────────
/** Compute event status purely from dates — no CMS status field needed. */
export function getEventStatus(startDate: string, endDate: string): EventStatus {
  const now = Date.now();
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  if (isNaN(start) || isNaN(end)) return "past"; // invalid dates treated as past

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "ongoing";
  return "past";
}

// ─── Sorting ─────────────────────────────────────────────
/** Sort events chronologically by startDate (ascending). */
export function sortEventsByTime(events: Activity[]): Activity[] {
  return [...events].sort(
    (a, b) => {
      const aTime = new Date(a.startDate).getTime();
      const bTime = new Date(b.startDate).getTime();
      if (isNaN(aTime) && isNaN(bTime)) return 0;
      if (isNaN(aTime)) return 1; // invalid dates go to end
      if (isNaN(bTime)) return -1;
      return aTime - bTime;
    }
  );
}

// ─── Filtering ───────────────────────────────────────────
/** Filter events whose startDate falls on a specific calendar date (YYYY-MM-DD). */
export function filterEventsByDate(events: Activity[], dateStr: string): Activity[] {
  return events.filter((e) => e.startDate.slice(0, 10) === dateStr);
}

/** Filter events by computed status. */
export function filterEventsByStatus(events: Activity[], status: EventStatus): Activity[] {
  return events.filter((e) => getEventStatus(e.startDate, e.endDate) === status);
}

// ─── Grouping ────────────────────────────────────────────
export type DateGroup = {
  dateKey: string; // YYYY-MM-DD
  dateLabel: string; // e.g. "14 Apr Monday"
  events: Activity[];
};

/** Group sorted events by their start date. */
export function groupEventsByDate(events: Activity[]): DateGroup[] {
  const map = new Map<string, Activity[]>();

  for (const event of events) {
    const dateStr = event.startDate.slice(0, 10);
    if (!dateStr || dateStr.length !== 10) continue; // skip invalid dates
    const existing = map.get(dateStr) || [];
    existing.push(event);
    map.set(dateStr, existing);
  }

  const groups: DateGroup[] = [];
  for (const [dateKey, evts] of map.entries()) {
    const d = new Date(dateKey + "T00:00:00");
    if (isNaN(d.getTime())) continue; // skip invalid dates
    const day = d.getDate();
    const month = d.toLocaleDateString("en-US", { month: "short" });
    const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
    groups.push({
      dateKey,
      dateLabel: `${day} ${month} ${weekday}`,
      events: evts,
    });
  }

  return groups;
}

// ─── Momentum Helpers ────────────────────────────────────
/** Get events happening within the current calendar week (Mon–Sun). */
export function getEventsThisWeek(events: Activity[]): Activity[] {
  const now = new Date();
  const day = now.getDay();
  const diffToMon = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() + diffToMon);

  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return events.filter((e) => {
    const s = new Date(e.startDate).getTime();
    return !isNaN(s) && s >= monday.getTime() && s <= sunday.getTime();
  });
}

/** Get all currently-ongoing events. */
export function getOngoingEvents(events: Activity[]): Activity[] {
  return events.filter(
    (e) => getEventStatus(e.startDate, e.endDate) === "ongoing"
  );
}

/** Get the next upcoming event (nearest in the future). */
export function getNextEvent(events: Activity[]): Activity | null {
  const now = Date.now();
  const upcoming = events
    .filter((e) => {
      const time = new Date(e.startDate).getTime();
      return !isNaN(time) && time > now;
    })
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  return upcoming[0] || null;
}

/** Human-readable countdown to an event. */
export function getTimeUntilNext(event: Activity): string {
  const now = Date.now();
  const start = new Date(event.startDate).getTime();
  if (isNaN(start)) return "unknown";

  const diff = start - now;

  if (diff <= 0) return "now";

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `in ${days}d ${hours % 24}h`;
  if (hours > 0) return `in ${hours}h ${minutes % 60}m`;
  return `in ${minutes}m`;
}

// ─── Calendar Helpers ────────────────────────────────────
/** Get set of date strings (YYYY-MM-DD) that have events, from a list of ISO date strings. */
export function getEventDates(eventDates: string[]): Set<string> {
  return new Set(eventDates.map((d) => d.slice(0, 10)));
}

/** Count events on a specific date, from a list of ISO date strings. */
export function getEventCountOnDate(eventDates: string[], dateStr: string): number {
  return eventDates.filter((d) => d.slice(0, 10) === dateStr).length;
}

/** Format a time string from ISO date. */
export function formatEventTime(isoDate: string): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/** Format a full date + time string in a given IANA timezone (used for scraped external events). */
export function formatEventDateTime(isoDate: string, timezone: string): string {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "";
  const datePart = d.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: timezone,
  });
  const timePart = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  });
  return `${datePart} · ${timePart}`;
}

/** Format a scraped event's target_profile into a display label. */
export function formatSourceLabel(source: string): string {
  return source.toLowerCase() === "gdgutm" ? "GDG UTM" : source;
}

/** Resolve endDate: if blank, default to startDate + 2 hours. */
export function resolveEndDate(startDate: string, endDate?: string | null): string {
  const start = new Date(startDate);
  if (isNaN(start.getTime())) {
    return new Date().toISOString();
  }
  if (endDate) {
    const end = new Date(endDate);
    return isNaN(end.getTime()) ? start.toISOString() : end.toISOString();
  }
  start.setHours(start.getHours() + 2);
  return start.toISOString();
}
