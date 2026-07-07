"use client";

import { motion } from "framer-motion";

/**
 * Glowing "NOW" indicator that sits between events in the timeline.
 * Pulses with a red/yellow glow to show the current moment.
 */
export default function NowIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="now-indicator relative my-4 flex items-center gap-3"
    >
      {/* Live dot */}
      <div className="relative flex-shrink-0">
        <div className="h-3 w-3 rounded-full bg-nyala-red" />
        <div className="absolute inset-0 animate-ping rounded-full bg-nyala-red opacity-40" />
      </div>

      {/* Glowing line */}
      <div className="relative h-[2px] flex-1 overflow-hidden rounded-full">
        <div className="now-line-glow absolute inset-0 bg-gradient-to-r from-nyala-red via-nyala-yellow to-nyala-red" />
      </div>

      {/* NOW label */}
      <span className="now-text-glow flex-shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-nyala-red">
        now
      </span>
    </motion.div>
  );
}
