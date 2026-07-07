"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import MomentumBar from "@/components/activities/MomentumBar";
import Timeline from "@/components/activities/Timeline";
import SmartCalendar from "@/components/ui/SmartCalendar";
import EventFocusModal from "@/components/activities/EventFocusModal";
import { useTimeAwareness } from "@/components/activities/useTimeAwareness";
import {
  sortEventsByTime,
  filterEventsByDate,
  filterEventsByStatus,
} from "@/lib/event-utils";
import type { Activity } from "@/types";

interface ActivitiesPageClientProps {
  activities: Activity[];
}

export default function ActivitiesPageClient({
  activities,
}: ActivitiesPageClientProps) {
  // ─── State ──────────────────────────────────────
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<"all" | "upcoming" | "past">("all");
  const [focusedEvent, setFocusedEvent] = useState<Activity | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Time awareness: forces re-render every 60s for live status updates
  const tick = useTimeAwareness(60_000);

  // ─── Derived data ───────────────────────────────
  const sorted = useMemo(() => sortEventsByTime(activities), [activities]);

  const filtered = useMemo(() => {
    let result = sorted;

    // Date filter from calendar
    if (selectedDate) {
      result = filterEventsByDate(result, selectedDate);
    }

    // Status filter
    if (filterMode === "upcoming") {
      result = filterEventsByStatus(result, "upcoming");
    } else if (filterMode === "past") {
      result = filterEventsByStatus(result, "past");
    }

    return result;
  }, [sorted, selectedDate, filterMode]);

  // ─── Handlers ───────────────────────────────────
  const handleEventClick = useCallback((event: Activity) => {
    setFocusedEvent(event);
  }, []);

  const handleCloseModal = useCallback(() => {
    setFocusedEvent(null);
  }, []);

  const handleSelectDate = useCallback((dateStr: string | null) => {
    setSelectedDate(dateStr);
  }, []);

  const handleFilterMode = useCallback((mode: "all" | "upcoming" | "past") => {
    setFilterMode(mode);
    setSelectedDate(null); // clear date filter when switching mode
  }, []);

  return (
    <div className="min-h-screen bg-nyala-black pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-nyala-red">
            ~/nyala-labs/activities &gt;
          </span>
        </motion.div>

        {/* Section Heading */}
        <SectionHeading
          title="activities"
          subtitle="a living timeline of everything we build, learn, and ignite"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-6"
        >
          <div className="group relative overflow-hidden border border-nyala-gray-light bg-nyala-gray/80 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-nyala-red/60 hover:shadow-[0_0_24px_rgba(198,40,40,0.15)] md:p-6">
            <div className="pointer-events-none absolute -left-16 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-nyala-red/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-nyala-yellow/10 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-nyala-red">
                  latest spotlight
                </p>
                <h3 className="mt-2 font-mono text-xl font-bold text-nyala-yellow md:text-2xl">
                  SunFest 2026: Harvest of Wonders
                </h3>
                <p className="mt-1 font-mono text-xs text-nyala-gray-muted md:text-sm">
                  July 7 - 10, 2026 with interactive booths, games, and a special opening ceremony.
                </p>
              </div>
              <a
                href="/sunfest"
                className="w-fit rounded-none border border-nyala-red bg-nyala-red px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-nyala-white transition-all duration-300 hover:bg-nyala-red-dark hover:shadow-lg hover:shadow-nyala-red/20"
              >
                View SunFest Details
              </a>
            </div>
          </div>

          <div className="mt-4 rounded-none border border-nyala-gray-light/80 bg-nyala-gray/70 p-4 md:p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-nyala-gray-muted">
              history record
            </p>
            <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-mono text-base font-semibold text-nyala-white">
                  Chutes Hack Malaysia 2026
                </h4>
                <p className="mt-1 font-mono text-xs leading-relaxed text-nyala-gray-muted">
                  A past hybrid AI hackathon that remains part of Nyala Labs&apos; story and is now shown as a historical milestone.
                </p>
              </div>
              <a
                href="/chutes-hackathon"
                className="w-fit border border-nyala-gray-light px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-nyala-gray-muted transition-all duration-300 hover:border-nyala-yellow hover:text-nyala-yellow"
              >
                View Past Event
              </a>
            </div>
          </div>
        </motion.div>

        {/* Momentum Bar */}
        <MomentumBar events={filtered} tick={tick} />

        {/* Mobile calendar toggle */}
        <div className="mb-4 lg:hidden">
          <button
            onClick={() => setCalendarOpen(!calendarOpen)}
            className="flex w-full items-center justify-between rounded-lg border
                       border-nyala-gray-light bg-nyala-gray/60 px-4 py-3
                       font-mono text-xs text-nyala-gray-muted transition-colors
                       hover:border-nyala-red"
          >
            <span>📅 Calendar {selectedDate ? `· ${selectedDate}` : ""}</span>
            <motion.span
              animate={{ rotate: calendarOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▾
            </motion.span>
          </button>

          {calendarOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 overflow-hidden"
            >
              <SmartCalendar
                eventDates={activities.map((activity) => activity.startDate)}
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
                filterMode={filterMode}
                onFilterMode={handleFilterMode}
              />
            </motion.div>
          )}
        </div>

        {/* Main Layout: Timeline + Calendar sidebar */}
        <div className="flex gap-8">
          {/* LEFT: Timeline */}
          <div className="min-w-0 flex-1">
            <Timeline
              events={filtered}
              tick={tick}
              onEventClick={handleEventClick}
            />
          </div>

          {/* RIGHT: Calendar (desktop only) */}
          <div className="hidden w-72 flex-shrink-0 lg:block xl:w-80">
            <div className="sticky top-28">
              <SmartCalendar
                eventDates={activities.map((activity) => activity.startDate)}
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
                filterMode={filterMode}
                onFilterMode={handleFilterMode}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Focus Mode Modal */}
      <EventFocusModal event={focusedEvent} onClose={handleCloseModal} />
    </div>
  );
}
