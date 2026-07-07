"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { formatEventDateTime } from "@/lib/event-utils";
import HostAvatarStack from "./HostAvatarStack";
import type { ScrapedEvent } from "@/types";

interface ExternalEventListItemProps {
  event: ScrapedEvent;
  index?: number;
}

export default function ExternalEventListItem({ event, index = 0 }: ExternalEventListItemProps) {
  return (
    <motion.a
      href={event.eventUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex gap-4 py-8 pr-6 transition-colors duration-300 hover:bg-nyala-gray/40"
    >
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-nyala-gray-light sm:h-32 sm:w-32">
        {event.coverImageUrl && (
          <Image
            src={event.coverImageUrl}
            alt={event.title}
            fill
            sizes="128px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-[1fr_200px]">
          <div className="flex min-w-0 flex-col gap-2">
            <h3 className="line-clamp-2 font-mono text-base font-bold leading-snug text-nyala-white transition-colors duration-300 group-hover:text-nyala-yellow">
              {event.title}
            </h3>
            <HostAvatarStack hosts={event.hosts} />
          </div>

          <div className="flex min-w-0 flex-col gap-1 font-mono text-xs text-nyala-white/60">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="shrink-0 text-nyala-yellow" size={14} />
              {formatEventDateTime(event.startAt, event.timezone)}
            </span>
            {event.locationName && (
              <span className="flex min-w-0 items-center gap-1.5" title={event.locationName}>
                <FiMapPin className="shrink-0 text-nyala-yellow" size={14} />
                <span className="truncate">{event.locationName}</span>
              </span>
            )}
          </div>
        </div>

        <span className="mt-auto inline-flex self-start items-center rounded-lg border border-nyala-red bg-nyala-red px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-nyala-white transition-all duration-300 group-hover:bg-nyala-red-dark group-hover:shadow-lg group-hover:shadow-nyala-red/20">
          view event
        </span>
      </div>
    </motion.a>
  );
}
