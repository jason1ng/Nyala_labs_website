"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { getEventDates } from "@/lib/event-utils";

interface SmartCalendarProps {
  eventDates: string[];
  selectedDate: string | null;
  onSelectDate: (dateStr: string | null) => void;
  filterMode?: "all" | "upcoming" | "past";
  onFilterMode?: (mode: "all" | "upcoming" | "past") => void;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${pad2(month + 1)}-${pad2(day)}`;
}

export default function SmartCalendar({
  eventDates,
  selectedDate,
  onSelectDate,
  filterMode,
  onFilterMode,
}: SmartCalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [direction, setDirection] = useState(0);

  // Avoid SSR/client hydration mismatch: server and client may compute a
  // different "today" if their timezones differ, so only mark today's date
  // once mounted on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const todayStr = mounted
    ? toDateStr(today.getFullYear(), today.getMonth(), today.getDate())
    : "";
  const datesWithEvents = useMemo(() => getEventDates(eventDates), [eventDates]);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);
  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Previous month trailing days
  const prevMonthDays = getDaysInMonth(
    viewMonth === 0 ? viewYear - 1 : viewYear,
    viewMonth === 0 ? 11 : viewMonth - 1
  );

  const navigate = (dir: -1 | 1) => {
    setDirection(dir);
    const newMonth = viewMonth + dir;
    if (newMonth < 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else if (newMonth > 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(newMonth);
    }
  };

  const handleDayClick = (dateStr: string) => {
    if (selectedDate === dateStr) {
      onSelectDate(null); // toggle off
    } else {
      onSelectDate(dateStr);
    }
  };

  const calendarVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <div className="rounded-xl border border-nyala-gray-light bg-nyala-gray/80 p-5 backdrop-blur-sm">
      {/* Month Navigation */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-mono text-sm font-bold text-nyala-white">{monthLabel}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="flex h-7 w-7 items-center justify-center rounded-md
                       border border-nyala-gray-light text-nyala-gray-muted
                       transition-colors hover:border-nyala-red hover:text-nyala-red"
            aria-label="Previous month"
          >
            ‹
          </button>
          {/* Today dot */}
          <button
            onClick={() => {
              setViewMonth(today.getMonth());
              setViewYear(today.getFullYear());
              setDirection(0);
            }}
            className="h-2 w-2 rounded-full bg-nyala-red transition-transform hover:scale-150"
            aria-label="Go to today"
          />
          <button
            onClick={() => navigate(1)}
            className="flex h-7 w-7 items-center justify-center rounded-md
                       border border-nyala-gray-light text-nyala-gray-muted
                       transition-colors hover:border-nyala-red hover:text-nyala-red"
            aria-label="Next month"
          >
            ›
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center font-mono text-[10px] font-bold uppercase tracking-wider text-nyala-gray-muted"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${viewYear}-${viewMonth}`}
          custom={direction}
          variants={calendarVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="grid grid-cols-7 gap-1"
        >
          {/* Previous month trailing days */}
          {Array.from({ length: firstDay }).map((_, i) => {
            const day = prevMonthDays - firstDay + i + 1;
            return (
              <div
                key={`prev-${i}`}
                className="flex h-8 items-center justify-center font-mono text-[10px] text-nyala-gray-muted/30"
              >
                {day}
              </div>
            );
          })}

          {/* Current month days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = toDateStr(viewYear, viewMonth, day);
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDate;
            const hasEvents = datesWithEvents.has(dateStr);

            return (
              <button
                key={day}
                onClick={() => hasEvents && handleDayClick(dateStr)}
                disabled={!hasEvents}
                className={`relative flex h-8 flex-col items-center justify-center rounded-md
                           font-mono text-xs transition-all duration-200
                           ${isSelected
                    ? "bg-nyala-red text-nyala-white shadow-[0_0_12px_rgba(198,40,40,0.4)]"
                    : isToday
                      ? "bg-nyala-yellow/10 font-bold text-nyala-yellow"
                      : hasEvents
                        ? "text-nyala-white hover:bg-nyala-gray-light cursor-pointer"
                        : "text-nyala-gray-muted/40 cursor-default"
                  }`}
              >
                <span>{day}</span>
                {/* Event density dot */}
                {hasEvents && !isSelected && (
                  <div className="absolute bottom-1 flex">
                    <div
                      className={`h-[5px] w-[5px] rounded-full ${isToday ? "bg-nyala-yellow" : "bg-nyala-red"}`}
                    />
                  </div>
                )}
              </button>
            );
          })}

          {/* Next month leading days */}
          {(() => {
            const totalCells = firstDay + daysInMonth;
            const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
            return Array.from({ length: remaining }).map((_, i) => (
              <div
                key={`next-${i}`}
                className="flex h-8 items-center justify-center font-mono text-[10px] text-nyala-gray-muted/30"
              >
                {i + 1}
              </div>
            ));
          })()}
        </motion.div>
      </AnimatePresence>

      {/* Filter buttons */}
      {filterMode && onFilterMode && (
        <div className="mt-4 flex gap-2">
          {(["all", "upcoming", "past"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => onFilterMode(mode)}
              className={`flex-1 rounded-md border px-3 py-1.5 font-mono text-[10px]
                         uppercase tracking-wider transition-all duration-200
                         ${filterMode === mode
                  ? "border-nyala-red bg-nyala-red/10 text-nyala-red"
                  : "border-nyala-gray-light text-nyala-gray-muted hover:border-nyala-yellow/30 hover:text-nyala-yellow"
                }`}
            >
              {mode}
            </button>
          ))}
        </div>
      )}

      {/* Selected date label */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden"
          >
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-xs font-semibold text-nyala-white">
                {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <button
                onClick={() => onSelectDate(null)}
                className="flex h-6 w-6 items-center justify-center rounded-full
                           bg-nyala-gray-light text-nyala-white
                           transition-colors hover:bg-nyala-red hover:text-nyala-white"
              >
                <FiX size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
