"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatEventTime, getEventStatus } from "@/lib/event-utils";
import type { Activity } from "@/types";

interface EventFocusModalProps {
  event: Activity | null;
  onClose: () => void;
}

export default function EventFocusModal({ event, onClose }: EventFocusModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (event) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [event, handleKeyDown]);

  const status = event ? getEventStatus(event.startDate, event.endDate) : null;

  return (
    <AnimatePresence>
      {event && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-nyala-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-xl overflow-hidden
                       rounded-xl border border-nyala-gray-light bg-nyala-gray shadow-2xl
                       sm:inset-x-auto sm:w-full"
          >
            {/* Header image */}
            {event.image && event.image !== "/images/activity-1.jpg" && (
              <div className="relative h-48 overflow-hidden sm:h-56">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nyala-gray via-nyala-gray/40 to-transparent" />

                {/* Status indicator */}
                {status === "ongoing" && (
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full
                                  bg-nyala-red/20 px-3 py-1 backdrop-blur-sm">
                    <div className="relative">
                      <div className="h-2 w-2 rounded-full bg-nyala-red" />
                      <div className="absolute inset-0 animate-ping rounded-full bg-nyala-red opacity-60" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-nyala-red">
                      live
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {/* Title */}
              <h2 className="font-mono text-xl font-bold text-nyala-white sm:text-2xl">
                {event.title}
              </h2>

              {/* Meta row */}
              <div className="mt-3 flex flex-wrap gap-4 font-mono text-xs text-nyala-gray-muted">
                <span className="flex items-center gap-1.5">
                  <span className="text-nyala-yellow">📅</span>
                  {new Date(event.startDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-nyala-yellow">🕐</span>
                  {formatEventTime(event.startDate)} – {formatEventTime(event.endDate)}
                </span>
                {event.location && (
                  <span className="flex items-center gap-1.5">
                    <span className="text-nyala-yellow">📍</span>
                    {event.location}
                  </span>
                )}
              </div>

              {/* Speakers */}
              {event.speakers.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-nyala-red">
                    Speakers
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {event.speakers.map((speaker, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-nyala-gray-light bg-nyala-black/50
                                   px-3 py-1 font-mono text-xs text-nyala-white"
                      >
                        {speaker}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mt-4 border-t border-nyala-gray-light pt-4">
                <p className="font-mono text-xs leading-relaxed text-nyala-gray-muted">
                  {event.description}
                </p>
              </div>

              {/* Status bar */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      status === "ongoing"
                        ? "bg-nyala-red animate-pulse"
                        : status === "upcoming"
                        ? "bg-nyala-yellow"
                        : "bg-nyala-gray-muted"
                    }`}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nyala-gray-muted">
                    {status}
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="rounded-md border border-nyala-gray-light px-4 py-1.5
                             font-mono text-[10px] uppercase tracking-widest text-nyala-gray-muted
                             transition-colors hover:border-nyala-red hover:text-nyala-red"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
