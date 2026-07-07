import { getAllTargetProfiles, getUpcomingScrapedEvents } from "@/lib/events-data";
import EventsPageClient from "./EventsPageClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events — Nyala Labs",
  description:
    "Discover upcoming tech events from the wider community — Luma, GDG, and more.",
};

export default async function EventsPage() {
  const [events, profiles] = await Promise.all([
    getUpcomingScrapedEvents(),
    getAllTargetProfiles(),
  ]);

  return <EventsPageClient events={events} profiles={profiles} />;
}
