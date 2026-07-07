"use client";

import { useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  sortEventsByTime,
  groupEventsByDate,
  getEventStatus,
} from "@/lib/event-utils";
import EventCard from "./EventCard";
import NowIndicator from "./NowIndicator";
import type { Activity } from "@/types";

interface TimelineProps {
  events: Activity[];
  tick: number;
  onEventClick: (event: Activity) => void;
}

export default function Timeline({ events, tick: _tick, onEventClick }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const nowRef = useRef<HTMLDivElement>(null);
  const hasScrolled = useRef(false);

  const sorted = useMemo(() => sortEventsByTime(events), [events]);
  const groups = useMemo(() => groupEventsByDate(sorted), [sorted]);

  // Find where "NOW" should be inserted
  const now = Date.now();

  // Auto-scroll to NOW indicator or next upcoming event on mount
  useEffect(() => {
    if (hasScrolled.current) return;
    const timer = setTimeout(() => {
      if (nowRef.current) {
        nowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        hasScrolled.current = true;
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [groups]);

  // Check if NOW should appear between two groups or within a group
  const getNowPosition = (groupIdx: number, eventIdx: number): boolean => {
    const flatEvents = sorted;
    let flatIdx = 0;
    for (let g = 0; g < groups.length; g++) {
      for (let e = 0; e < groups[g].events.length; e++) {
        if (g === groupIdx && e === eventIdx) {
          // NOW goes BEFORE this event if:
          // - the previous event is past/ongoing AND this event is upcoming
          if (flatIdx === 0) {
            return getEventStatus(flatEvents[0].startDate, flatEvents[0].endDate) === "upcoming" && now < new Date(flatEvents[0].startDate).getTime();
          }
          const prevStatus = getEventStatus(
            flatEvents[flatIdx - 1].startDate,
            flatEvents[flatIdx - 1].endDate
          );
          const currStatus = getEventStatus(
            flatEvents[flatIdx].startDate,
            flatEvents[flatIdx].endDate
          );
          return (
            (prevStatus === "past" || prevStatus === "ongoing") &&
            currStatus === "upcoming"
          );
        }
        flatIdx++;
      }
    }
    return false;
  };

  // Check if NOW should go at the end (all events are past)
  const allPast =
    sorted.length > 0 &&
    sorted.every(
      (e) => getEventStatus(e.startDate, e.endDate) === "past"
    );

  // Check if NOW should go at the beginning (all events are upcoming)
  const allUpcoming =
    sorted.length > 0 &&
    sorted.every(
      (e) => getEventStatus(e.startDate, e.endDate) === "upcoming"
    );

  if (events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-[200px] items-center justify-center rounded-xl
                   border border-dashed border-nyala-gray-light p-8"
      >
        <p className="font-mono text-sm text-nyala-gray-muted">
          No activities found for this selection
        </p>
      </motion.div>
    );
  }

  return (
    <div ref={timelineRef} className="relative">
      {/* Vertical timeline line */}
      <div className="absolute bottom-0 left-[7px] top-0 w-[2px] bg-gradient-to-b from-nyala-red via-nyala-gray-light to-transparent" />

      {/* NOW at the very beginning if all events are upcoming */}
      {allUpcoming && (
        <div ref={nowRef} className="ml-6">
          <NowIndicator />
        </div>
      )}

      <AnimatePresence mode="popLayout">
        {groups.map((group, gIdx) => (
          <motion.div
            key={group.dateKey}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, delay: gIdx * 0.08 }}
            className="mb-8"
          >
            {/* Date header */}
            <div className="mb-3 flex items-center gap-3">
              {/* Timeline dot */}
              <div className="relative z-10 flex h-4 w-4 items-center justify-center">
                <div className="h-3 w-3 rounded-full border-2 border-nyala-red bg-nyala-black" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-nyala-red">
                {group.dateLabel}
              </span>
            </div>

            {/* Events in this group */}
            <div className="ml-6 space-y-3">
              {group.events.map((event, eIdx) => (
                <div key={event._id}>
                  {/* NOW indicator between events */}
                  {getNowPosition(gIdx, eIdx) && (
                    <div ref={nowRef}>
                      <NowIndicator />
                    </div>
                  )}
                  <EventCard
                    event={event}
                    index={gIdx * 10 + eIdx}
                    onClick={onEventClick}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* NOW at the very end if all events are past */}
      {allPast && (
        <div ref={nowRef} className="ml-6">
          <NowIndicator />
        </div>
      )}
    </div>
  );
}
