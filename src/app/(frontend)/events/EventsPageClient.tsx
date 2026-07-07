"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiChevronDown, FiGrid, FiList, FiSearch } from "react-icons/fi";
import ExternalEventCard from "@/components/events/ExternalEventCard";
import ExternalEventListItem from "@/components/events/ExternalEventListItem";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartCalendar from "@/components/ui/SmartCalendar";
import { staggerContainer } from "@/lib/animations";
import { formatSourceLabel } from "@/lib/event-utils";
import type { ScrapedEvent } from "@/types";

// target_profile values that are actually Luma "discover" place feeds, not
// real campaign/community profiles — grouped separately in the filter dropdown.
const PLACE_PROFILES = new Set(["Kuala Lumpur"]);

interface EventsPageClientProps {
  events: ScrapedEvent[];
  profiles: string[];
}

type ViewMode = "card" | "list";

export default function EventsPageClient({ events, profiles }: EventsPageClientProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileGroup = profiles.filter((p) => !PLACE_PROFILES.has(p));
  const placeGroup = profiles.filter((p) => PLACE_PROFILES.has(p));

  const profileFiltered = selectedProfile
    ? events.filter((e) => e.source === selectedProfile)
    : events;

  const q = searchQuery.trim().toLowerCase();
  const searchFiltered = q
    ? profileFiltered.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.locationName.toLowerCase().includes(q) ||
          e.hosts.some((h) => h.name.toLowerCase().includes(q))
      )
    : profileFiltered;

  const filteredEvents = selectedDate
    ? searchFiltered.filter((e) => e.startAt.slice(0, 10) === selectedDate)
    : searchFiltered;

  const dateLabel = selectedDate
    ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  const profileLabel = selectedProfile ? formatSourceLabel(selectedProfile) : null;

  const emptyMessage =
    q && dateLabel
      ? `no events matching "${searchQuery}" on ${dateLabel}.`
      : q
        ? `no events matching "${searchQuery}".`
        : dateLabel
          ? `no events on ${dateLabel} — try another day.`
          : profileLabel
            ? `no upcoming events for ${profileLabel} right now.`
            : "no upcoming events right now — check back soon.";

  const searchInput = (
    <div className="relative">
      <FiSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-nyala-gray-muted"
        size={13}
      />
      <input
        type="text"
        placeholder="search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-lg border border-nyala-gray-light bg-nyala-gray/80
                   py-2 pl-8 pr-3 font-mono text-xs text-nyala-white
                   placeholder-nyala-gray-muted outline-none transition-colors
                   focus:border-nyala-red"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-nyala-black pt-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-nyala-red">
            ~/nyala-labs/events &gt;
          </span>
        </motion.div>

        {/* Mobile search (always visible) */}
        <div className="mb-3 lg:hidden">{searchInput}</div>

        {/* Mobile calendar toggle */}
        <div className="mb-4 lg:hidden">
          <button
            onClick={() => setCalendarOpen(!calendarOpen)}
            className="flex w-full items-center justify-between rounded-lg border
                       border-nyala-gray-light bg-nyala-gray/60 px-4 py-3
                       font-mono text-xs text-nyala-gray-muted transition-colors
                       hover:border-nyala-red"
          >
            <span className="flex items-center gap-2 leading-none">
              <FiCalendar size={14} className="shrink-0" />
              <span>Calendar {selectedDate ? `· ${selectedDate}` : ""}</span>
            </span>
            <motion.span
              animate={{ rotate: calendarOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              <FiChevronDown size={14} />
            </motion.span>
          </button>

          <AnimatePresence>
            {calendarOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 overflow-hidden"
              >
                <SmartCalendar
                  eventDates={searchFiltered.map((e) => e.startAt)}
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Heading (full width, own row) */}
        <SectionHeading
          title="discover what's happening"
          subtitle="upcoming tech events from the wider community — tap a card to head over and grab your spot"
        />

        {/* Main layout — toggle row + grid on the left, search + calendar on the right, both starting here */}
        <div className="flex gap-8">
          {/* LEFT: view toggle + card/list grid */}
          <div className="min-w-0 flex-1">
            {events.length > 0 && (
              <div className="mb-4 flex items-center justify-between gap-3">
                {profiles.length > 1 ? (
                  <div className="relative">
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 rounded-md border border-nyala-gray-light
                                 bg-nyala-gray px-3 py-2 font-mono text-xs text-nyala-white
                                 transition-colors hover:border-nyala-yellow/50"
                    >
                      <span>{profileLabel ?? "All Events"}</span>
                      <motion.span
                        animate={{ rotate: profileOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center text-nyala-gray-muted"
                      >
                        <FiChevronDown size={14} />
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {profileOpen && (
                        <>
                          <button
                            className="fixed inset-0 z-10"
                            onClick={() => setProfileOpen(false)}
                            aria-label="Close profile filter"
                          />
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 top-full z-20 mt-1 min-w-[10rem] overflow-hidden
                                       rounded-md border border-nyala-gray-light bg-nyala-gray shadow-lg"
                          >
                            <button
                              onClick={() => {
                                setSelectedProfile(null);
                                setProfileOpen(false);
                              }}
                              className={`block w-full px-3 py-2 text-left font-mono text-xs transition-colors ${
                                !selectedProfile
                                  ? "bg-nyala-red/10 text-nyala-red"
                                  : "text-nyala-white/70 hover:bg-nyala-gray-light hover:text-nyala-white"
                              }`}
                            >
                              All Events
                            </button>

                            {profileGroup.length > 0 && (
                              <>
                                <div className="border-t border-nyala-gray-light px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-wider text-nyala-gray-muted">
                                  Profile
                                </div>
                                {profileGroup.map((profile) => (
                                  <button
                                    key={profile}
                                    onClick={() => {
                                      setSelectedProfile(profile);
                                      setProfileOpen(false);
                                    }}
                                    className={`block w-full px-3 py-2 text-left font-mono text-xs transition-colors ${
                                      selectedProfile === profile
                                        ? "bg-nyala-red/10 text-nyala-red"
                                        : "text-nyala-white/70 hover:bg-nyala-gray-light hover:text-nyala-white"
                                    }`}
                                  >
                                    {formatSourceLabel(profile)}
                                  </button>
                                ))}
                              </>
                            )}

                            {placeGroup.length > 0 && (
                              <>
                                <div className="border-t border-nyala-gray-light px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-wider text-nyala-gray-muted">
                                  Places
                                </div>
                                {placeGroup.map((profile) => (
                                  <button
                                    key={profile}
                                    onClick={() => {
                                      setSelectedProfile(profile);
                                      setProfileOpen(false);
                                    }}
                                    className={`block w-full px-3 py-2 text-left font-mono text-xs transition-colors ${
                                      selectedProfile === profile
                                        ? "bg-nyala-red/10 text-nyala-red"
                                        : "text-nyala-white/70 hover:bg-nyala-gray-light hover:text-nyala-white"
                                    }`}
                                  >
                                    {formatSourceLabel(profile)}
                                  </button>
                                ))}
                              </>
                            )}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div />
                )}

                <div className="inline-flex gap-0.5 rounded-md border border-nyala-gray-light bg-nyala-gray p-0.5">
                  <button
                    onClick={() => setViewMode("card")}
                    className={`relative flex items-center rounded px-2.5 py-2 transition-colors duration-200
                               ${viewMode === "card"
                        ? "text-nyala-white"
                        : "text-nyala-gray-muted hover:text-nyala-yellow"
                      }`}
                  >
                    {viewMode === "card" && (
                      <motion.div
                        layoutId="events-view-toggle"
                        className="absolute inset-0 rounded bg-nyala-red"
                        transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center">
                      <FiGrid size={14} />
                    </span>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`relative flex items-center rounded px-2.5 py-2 transition-colors duration-200
                               ${viewMode === "list"
                        ? "text-nyala-white"
                        : "text-nyala-gray-muted hover:text-nyala-yellow"
                      }`}
                  >
                    {viewMode === "list" && (
                      <motion.div
                        layoutId="events-view-toggle"
                        className="absolute inset-0 rounded bg-nyala-red"
                        transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center">
                      <FiList size={14} />
                    </span>
                  </button>
                </div>
              </div>
            )}

            {filteredEvents.length > 0 ? (
              viewMode === "card" ? (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredEvents.map((event, i) => (
                    <ExternalEventCard key={event.id} event={event} index={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col divide-y divide-nyala-gray-light"
                >
                  {filteredEvents.map((event, i) => (
                    <ExternalEventListItem key={event.id} event={event} index={i} />
                  ))}
                </motion.div>
              )
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-8 border border-nyala-gray-light bg-nyala-gray p-8 text-center md:p-12"
              >
                <p className="font-mono text-sm text-nyala-gray-muted">
                  {emptyMessage}
                </p>
              </motion.div>
            )}
          </div>

          {/* RIGHT: search + calendar sidebar (desktop only) */}
          <div className="hidden w-72 flex-shrink-0 lg:block xl:w-80">
            <div className="sticky top-28 flex flex-col gap-4">
              {searchInput}
              <SmartCalendar
                eventDates={searchFiltered.map((e) => e.startAt)}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-24" />
    </div>
  );
}
