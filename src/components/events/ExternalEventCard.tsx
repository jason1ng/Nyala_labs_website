"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { formatEventDateTime } from "@/lib/event-utils";
import HostAvatarStack from "./HostAvatarStack";
import type { ScrapedEvent } from "@/types";

interface ExternalEventCardProps {
  event: ScrapedEvent;
  index?: number;
}

export default function ExternalEventCard({ event, index = 0 }: ExternalEventCardProps) {
  return (
    <motion.a
      href={event.eventUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-nyala-yellow/20
                 bg-nyala-gray transition-all duration-300 hover:-translate-y-1 hover:border-nyala-yellow/50
                 hover:shadow-[0_0_30px_rgba(251,192,45,0.12)]"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-nyala-gray-light">
        {event.coverImageUrl && (
          <Image
            src={event.coverImageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-col gap-1 font-mono text-xs text-nyala-white/60">
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

        <h3 className="line-clamp-2 font-mono text-base font-bold leading-snug text-nyala-white transition-colors duration-300 group-hover:text-nyala-yellow">
          {event.title}
        </h3>

        <HostAvatarStack hosts={event.hosts} />

        <div className="mt-auto pt-2">
          <span className="inline-flex self-start items-center rounded-lg border border-nyala-red bg-nyala-red px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-nyala-white transition-all duration-300 group-hover:bg-nyala-red-dark group-hover:shadow-lg group-hover:shadow-nyala-red/20">
            view event
          </span>
        </div>
      </div>
    </motion.a>
  );
}
