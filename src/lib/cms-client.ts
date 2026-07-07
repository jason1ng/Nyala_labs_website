import type {
  Activity,
  BlogPost,
  CommitteeMember,
  HeroMediaItem,
  HighlightItem,
} from "@/types";

const TIMEOUTS = {
  critical: 5_000,
  secondary: 8_000,
  background: 10_000,
} as const;

const fetchWithTimeout = async (url: string, timeoutMs: number): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
};

type PayloadMedia = {
  url?: string;
};

type PayloadDoc = {
  id?: string | number;
  [key: string]: unknown;
};

type PayloadListResponse<T extends PayloadDoc> = {
  docs?: T[];
};

const placeholderBlogImage = "/images/blog-1.jpg";
const placeholderCommitteeImage = "/images/committee/member-1.jpg";
const placeholderActivityImage = "/images/activity-1.jpg";

const resolveImageUrl = (media: unknown, fallback: string): string => {
  if (!media) return fallback;
  if (typeof media === "string") return media;
  const mediaDoc = media as PayloadMedia;
  return mediaDoc.url || fallback;
};

const parseIsoDate = (value: unknown, fallback?: string): string => {
  const fallbackIso = fallback ?? new Date().toISOString();
  const valueStr = typeof value === "string" ? value.trim() : String(value ?? "");
  const date = new Date(valueStr);
  return Number.isNaN(date.getTime()) ? fallbackIso : date.toISOString();
};

type PayloadMediaDoc = PayloadMedia & { mimeType?: string };

const isVideo = (media: unknown): boolean => {
  if (!media || typeof media !== "object") return false;
  const mime = (media as PayloadMediaDoc).mimeType || "";
  return mime.startsWith("video/");
};

export type HomepageData = {
  heroMedia: HeroMediaItem[];
  highlights: HighlightItem[];
};

export const fetchHomepage = async (): Promise<HomepageData> => {
  let response: Response;
  try {
    response = await fetchWithTimeout("/api/globals/homepage?depth=1", TIMEOUTS.critical);
  } catch {
    return { heroMedia: [], highlights: [] };
  }
  if (!response.ok) {
    return { heroMedia: [], highlights: [] };
  }
  const data = (await response.json()) as {
    heroMedia?: Array<{ media?: unknown; alt?: string }>;
    highlights?: Array<{ image?: unknown; caption?: string }>;
  };

  const heroMedia: HeroMediaItem[] = (data.heroMedia || [])
    .filter((item) => item.media)
    .map((item) => {
      const media = item.media as PayloadMediaDoc;
      const url = media?.url || "";
      const type: "image" | "video" = isVideo(media) ? "video" : "image";
      return { type, src: url, alt: item.alt } satisfies HeroMediaItem;
    })
    .filter((item) => Boolean(item.src));

  const defaultCaptions = [
    "hackathon night",
    "team workshop",
    "community meetup",
    "tech summit",
  ];
  const highlights: HighlightItem[] = (data.highlights || []).map(
    (item, i) => ({
      image: resolveImageUrl(item.image, ""),
      caption: item.caption || defaultCaptions[i] || "",
    })
  );

  return { heroMedia, highlights };
};

export const fetchPayloadCollection = async <T extends PayloadDoc>(
  collection: string,
  searchParams = "",
  timeout: number = TIMEOUTS.secondary
): Promise<T[]> => {
  const query = searchParams ? `?${searchParams}` : "";
  let response: Response;
  try {
    response = await fetchWithTimeout(`/api/${collection}${query}`, timeout);
  } catch {
    return [];
  }
  if (!response.ok) return [];

  const data = (await response.json()) as PayloadListResponse<T>;
  return data.docs || [];
};

export const mapPayloadBlogPost = (doc: PayloadDoc): BlogPost => ({
  _id: String(doc.id || ""),
  title: String(doc.title || ""),
  slug: String(doc.slug || ""),
  excerpt: String(doc.excerpt || ""),
  coverImage: resolveImageUrl(doc.coverImage, placeholderBlogImage),
  author: String(doc.author || "Nyala Labs"),
  categories: Array.isArray(doc.categories) ? (doc.categories as string[]) : [],
  publishedAt: parseIsoDate(doc.publishedAt),
  readingTime: Number(doc.readingTime || 1),
  featured: Boolean(doc.featured),
});

export const mapPayloadCommitteeMember = (doc: PayloadDoc): CommitteeMember => ({
  _id: String(doc.id || ""),
  name: String(doc.name || ""),
  role: String(doc.role || ""),
  image: resolveImageUrl(doc.image, placeholderCommitteeImage),
  bio: String(doc.bio || ""),
  linkedin: String(doc.linkedin || ""),
  order: Number(doc.order || 0),
});

export const mapPayloadActivity = (doc: PayloadDoc): Activity => {
  const startDate = parseIsoDate(doc.startDate || doc.date);
  const rawEnd = doc.endDate ? String(doc.endDate) : null;
  const endDate = rawEnd
    ? parseIsoDate(rawEnd, startDate)
    : (() => {
        const d = new Date(startDate);
        d.setHours(d.getHours() + 2);
        return d.toISOString();
      })();
  const speakers: string[] = Array.isArray(doc.speakers)
    ? (doc.speakers as Array<{ name?: string }>).map((s) => String(s.name || "")).filter(Boolean)
    : [];

  return {
    _id: String(doc.id || ""),
    title: String(doc.title || ""),
    description: String(doc.description || ""),
    startDate,
    endDate,
    location: String(doc.location || "TBA"),
    image: resolveImageUrl(doc.image, placeholderActivityImage),
    speakers,
  };
};
