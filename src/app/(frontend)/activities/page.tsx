import { getServerCollection } from "@/lib/payload";
import { mapPayloadActivity } from "@/lib/cms-client";
import ActivitiesPageClient from "./ActivitiesPageClient";

export const revalidate = 60;

export const metadata = {
  title: "Activities — Nyala Labs",
  description:
    "Explore Nyala Labs activities, workshops, and collaborations. A living timeline of everything we build, learn, and ignite.",
};

export default async function ActivitiesPage() {
  const docs = await getServerCollection("activities", {
    sort: "startDate",
    depth: 1,
    limit: 100,
  });

  const activities = docs.map(mapPayloadActivity);

  return <ActivitiesPageClient activities={activities} />;
}
