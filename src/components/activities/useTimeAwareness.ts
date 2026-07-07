"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook that forces a re-render every `intervalMs` milliseconds.
 * Used to keep event statuses (upcoming/ongoing/past) in sync with real time.
 * Default: every 60 seconds.
 */
export function useTimeAwareness(intervalMs = 60_000): number {
  const [tick, setTick] = useState(() => Date.now());

  const refresh = useCallback(() => setTick(Date.now()), []);

  useEffect(() => {
    const id = setInterval(refresh, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, refresh]);

  return tick;
}
