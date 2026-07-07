import { getHomepageData, getServerCollection } from "@/lib/payload";
import { mapPayloadBlogPost, mapPayloadActivity } from "@/lib/cms-client";
import HomePageClient from "./HomePageClient";
import type { HighlightItem } from "@/types";

export const revalidate = 60;

const defaultHighlightCaptions = [
  "hackathon night",
  "team workshop",
  "community meetup",
];

export default async function HomePage() {
  const [blogDocs, activityDocs, homepageData] = await Promise.all([
    getServerCollection("blog-posts", { sort: "-publishedAt", limit: 3, depth: 1 }),
    getServerCollection("activities", { sort: "startDate", depth: 1 }),
    getHomepageData(),
  ]);

  const latestPosts = blogDocs.map(mapPayloadBlogPost);
  const now = Date.now();
  const upcomingActivities = activityDocs
    .map(mapPayloadActivity)
    .filter((a) => new Date(a.startDate).getTime() > now)
    .slice(0, 3);

  const highlights: HighlightItem[] =
    homepageData.highlights.length > 0
      ? homepageData.highlights
      : defaultHighlightCaptions.map((caption) => ({ image: "", caption }));

  return (
    <HomePageClient
      latestPosts={latestPosts}
      upcomingActivities={upcomingActivities}
      highlights={highlights}
      heroMedia={homepageData.heroMedia}
    />
  );
}
