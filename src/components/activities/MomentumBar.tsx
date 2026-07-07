"use client";

import { motion } from "framer-motion";
import {
  getEventsThisWeek,
  getOngoingEvents,
  getNextEvent,
  getTimeUntilNext,
} from "@/lib/event-utils";
import type { Activity } from "@/types";

interface MomentumBarProps {
  events: Activity[];
  tick: number; // from useTimeAwareness, ensures reactivity
}

export default function MomentumBar({ events, tick: _tick }: MomentumBarProps) {
  const thisWeek = getEventsThisWeek(events);
  const ongoing = getOngoingEvents(events);
  const next = getNextEvent(events);

  const items = [
    {
      emoji: "🔥",
      value: thisWeek.length,
      label: thisWeek.length === 1 ? "activity this week" : "activities this week",
      show: true,
    },
    {
      emoji: "⚡",
      value: ongoing.length,
      label: "happening now",
      show: ongoing.length > 0,
    },
    {
      emoji: "🚀",
      value: next ? getTimeUntilNext(next) : null,
      label: next ? `next: ${next.title.slice(0, 24)}${next.title.length > 24 ? '…' : ''}` : "no upcoming activities",
      show: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8 flex flex-wrap items-center gap-4 sm:gap-6"
    >
      {items
        .filter((i) => i.show)
        .map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
            className="flex items-center gap-2 rounded-full border border-nyala-gray-light
                       bg-nyala-gray/60 px-4 py-2 backdrop-blur-sm"
          >
            <span className="text-base">{item.emoji}</span>
            {item.value !== null && typeof item.value === "number" && (
              <span className="font-mono text-sm font-bold text-nyala-yellow">
                {item.value}
              </span>
            )}
            {item.value !== null && typeof item.value === "string" && (
              <span className="font-mono text-sm font-bold text-nyala-yellow">
                {item.value}
              </span>
            )}
            <span className="font-mono text-xs text-nyala-gray-muted">
              {item.label}
            </span>
          </motion.div>
        ))}
    </motion.div>
  );
}
