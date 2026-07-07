"use client";

import { motion } from "framer-motion";
import { getEventStatus, formatEventTime } from "@/lib/event-utils";
import type { EventStatus } from "@/lib/event-utils";
import type { Activity } from "@/types";

interface EventCardProps {
  event: Activity;
  index: number;
  onClick: (event: Activity) => void;
}

const statusStyles: Record<EventStatus, {
  border: string;
  bg: string;
  opacity: string;
  imageClass: string;
}> = {
  upcoming: {
    border: "border-nyala-yellow/20 hover:border-nyala-yellow/50",
    bg: "bg-nyala-gray",
    opacity: "opacity-100",
    imageClass: "",
  },
  ongoing: {
    border: "border-nyala-red ongoing-pulse-border",
    bg: "bg-nyala-gray",
    opacity: "opacity-100",
    imageClass: "",
  },
  past: {
    border: "border-nyala-gray-light/30",
    bg: "bg-nyala-gray/60",
    opacity: "opacity-50",
    imageClass: "grayscale",
  },
};

export default function EventCard({ event, index, onClick }: EventCardProps) {
  const status = getEventStatus(event.startDate, event.endDate);
  const style = statusStyles[status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => onClick(event)}
      className={`group relative cursor-pointer overflow-hidden rounded-lg border
                  transition-all duration-300 hover:-translate-y-1
                  hover:shadow-[0_0_30px_rgba(198,40,40,0.12)]
                  ${style.border} ${style.bg} ${style.opacity}`}
    >
      {/* Ongoing glow overlay */}
      {status === "ongoing" && (
        <div className="pointer-events-none absolute inset-0 z-0 rounded-lg bg-nyala-red/5" />
      )}

      {/* Upcoming subtle glow */}
      {status === "upcoming" && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity
                        duration-500 group-hover:opacity-100 bg-gradient-to-br from-nyala-yellow/5 to-transparent rounded-lg" />
      )}

      <div className="relative z-10 flex gap-4 p-4">
        {/* Time column */}
        <div className="flex flex-col items-center gap-1 pt-1">
          <span className="font-mono text-sm font-bold text-nyala-yellow">
            {formatEventTime(event.startDate)}
          </span>
          {status === "ongoing" && (
            <div className="relative mt-1">
              <div className="h-2 w-2 rounded-full bg-nyala-red" />
              <div className="absolute inset-0 animate-ping rounded-full bg-nyala-red opacity-60" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="font-mono text-sm font-semibold text-nyala-white
                         transition-colors duration-300 group-hover:text-nyala-yellow">
            {event.title}
          </h3>

          {event.speakers.length > 0 && (
            <p className="mt-1 font-mono text-[10px] text-nyala-gray-muted">
              By {event.speakers.join(", ")}
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-3">
            {event.location && (
              <span className="flex items-center gap-1 font-mono text-[10px] text-nyala-gray-muted">
                <span className="text-nyala-yellow">📍</span>
                {event.location}
              </span>
            )}
          </div>
        </div>

        {/* Image thumbnail */}
        {event.image && event.image !== "/images/activity-1.jpg" && (
          <div className={`hidden aspect-square w-16 flex-shrink-0 overflow-hidden rounded-md sm:block ${style.imageClass}`}>
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${event.image})` }}
            />
          </div>
        )}
      </div>

      {/* Bottom accent line for ongoing */}
      {status === "ongoing" && (
        <div className="h-[2px] bg-gradient-to-r from-transparent via-nyala-red to-transparent" />
      )}
    </motion.div>
  );
}
