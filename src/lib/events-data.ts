import clientPromise from "@/lib/mongodb";
import type { ScrapedEvent } from "@/types";

const DB_NAME = "luma_monitor";
const COLLECTION_NAME = "events";

function mapDoc(doc: Record<string, any>): ScrapedEvent {
  return {
    id: doc.dedupKey,
    title: doc.name ?? "",
    coverImageUrl: doc.coverImageUrl ?? "",
    eventUrl: doc.eventUrl,
    startAt: new Date(doc.startAt).toISOString(),
    endAt: doc.endAt ? new Date(doc.endAt).toISOString() : null,
    timezone: doc.timezone,
    locationName: doc.location?.address || doc.location?.fullAddress || doc.location?.city || "",
    hosts: (doc.hosts?.length ? doc.hosts : doc.organizer ? [doc.organizer] : []).map(
      (h: any) => ({
        name: h.name,
        avatarUrl: h.avatarUrl ?? null,
      })
    ),
    source: doc.target_profile ?? "other",
  };
}

/**
 * Single integration seam for scraped (Luma/GDG) events.
 */
export async function getUpcomingScrapedEvents(): Promise<ScrapedEvent[]> {
  try {
    const client = await clientPromise;
    const docs = await client
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .find({})
      .toArray();

    const now = Date.now();
    return docs
      .map(mapDoc)
      .filter((event) => new Date(event.startAt).getTime() >= now)
      .sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
      );
  } catch (err) {
    console.error("getUpcomingScrapedEvents failed:", err);
    return [];
  }
}

/**
 * All distinct target profiles in the collection, regardless of whether they
 * currently have any upcoming events — lets the UI keep showing a profile as
 * a filter option even when it has zero upcoming events right now.
 */
export async function getAllTargetProfiles(): Promise<string[]> {
  try {
    const client = await clientPromise;
    const profiles = await client
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .distinct("target_profile");

    return profiles.filter((p): p is string => Boolean(p)).sort();
  } catch (err) {
    console.error("getAllTargetProfiles failed:", err);
    return [];
  }
}
