  "use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroVideoSection from "@/components/hero/HeroVideoSection";
import BlogCard from "@/components/blog/BlogCard";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedDivider from "@/components/ui/AnimatedDivider";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PartnershipsSection from "@/components/partnerships/PartnershipsSection";
import { formatDate } from "@/lib/utils";
import { getEventStatus } from "@/lib/event-utils";
import { staggerContainer, fadeUp } from "@/lib/animations";
import type { Activity, BlogPost, HeroMediaItem, HighlightItem } from "@/types";

const defaultHighlightCaptions = [
  "hackathon night",
  "team workshop",
  "community meetup",
  "tech summit",
];

interface HomePageClientProps {
  latestPosts: BlogPost[];
  upcomingActivities: Activity[];
  highlights: HighlightItem[];
  heroMedia: HeroMediaItem[];
}

export default function HomePageClient({
  latestPosts,
  upcomingActivities,
  highlights,
  heroMedia,
}: HomePageClientProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  return (
    <>
      <HeroVideoSection initialHeroMedia={heroMedia} />

      {/* ─── sunfest spotlight ───────────── */}
      <section className="relative bg-nyala-black py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="group relative overflow-hidden border border-nyala-gray-light bg-nyala-gray p-6 transition-all duration-500 hover:border-nyala-red/50 hover:shadow-[0_0_30px_rgba(198,40,40,0.15)] md:p-8">
            <div className="pointer-events-none absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-nyala-red/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-nyala-yellow/10 blur-3xl" />
            <div className="relative z-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-nyala-red">
                  latest spotlight
                </p>
                <h2 className="mt-2 font-mono text-2xl font-bold tracking-tight text-nyala-yellow md:text-3xl">
                  SunFest 2026: Harvest of Wonders
                </h2>
                <p className="mt-2 font-mono text-xs text-nyala-gray-muted md:text-sm">
                  July 7 - 10, 2026 | Sunway College | Booths, games, and community celebration
                </p>
              </div>
              <a
                href="/sunfest"
                className="w-fit rounded-none border border-nyala-red bg-nyala-red px-6 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-nyala-white transition-all duration-300 hover:bg-nyala-red-dark hover:shadow-lg hover:shadow-nyala-red/20"
              >
                View SunFest Details
              </a>
            </div>
          </div>

          <div className="mt-4 rounded-none border border-nyala-gray-light/80 bg-nyala-gray/70 p-5 md:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-nyala-gray-muted">
              history record
            </p>
            <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-mono text-lg font-semibold text-nyala-white">
                  Chutes Hack Malaysia 2026
                </h3>
                <p className="mt-1 font-mono text-xs leading-relaxed text-nyala-gray-muted">
                  Our earlier hybrid AI hackathon remains part of Nyala Labs&apos; story and is now presented as a past milestone.
                </p>
              </div>
              <a
                href="/chutes-hackathon"
                className="w-fit border border-nyala-gray-light px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-nyala-gray-muted transition-all duration-300 hover:border-nyala-yellow hover:text-nyala-yellow"
              >
                View Past Event
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── upcoming activities ─────────────────── */}
      <section className="relative bg-nyala-black py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="Upcoming Activities"
            subtitle="What's next on the trail"
            glow
          />

          {isDesktop ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid gap-6 md:grid-cols-3"
              >
                <motion.div variants={fadeUp} custom={0}>
                  <HackathonActivityCard />
                </motion.div>
                {upcomingActivities.map((activity, i) => (
                  <motion.div key={activity._id} variants={fadeUp} custom={i + 1}>
                    <ActivityCard activity={activity} />
                  </motion.div>
                ))}
              </motion.div>
          ) : (
            <div className="grid gap-6">
              <div className="reveal-up">
                <HackathonActivityCard />
              </div>
              {upcomingActivities.map((activity, i) => (
                <div key={activity._id} className="reveal-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <ActivityCard activity={activity} />
                </div>
              ))}
            </div>
          )}
          {upcomingActivities.length === 0 && (
            <p className="mt-4 font-mono text-xs text-nyala-gray-muted">
              No upcoming activities published yet.
            </p>
          )}
        </div>
      </section>

      <AnimatedDivider />

      {/* ─── latest blogs ────────────────────────── */}
      <section className="bg-nyala-black py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-end justify-between">
            <SectionHeading
              title="latest from the trail"
              subtitle="stories, guides, and insights from the community"
              className="mb-0"
            />
            <ScrollReveal delay={0.3}>
              <a
                href="/blogs"
                className="hidden font-mono text-xs uppercase tracking-widest text-nyala-gray-muted transition-colors hover:text-nyala-red md:block"
              >
                View All →
              </a>
            </ScrollReveal>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {latestPosts.map((post, i) => (
                <BlogCard key={post._id} post={post} index={i} />
              ))}
            </div>
          ) : (
            <p className="font-mono text-xs text-nyala-gray-muted">
              No blog posts published yet.
            </p>
          )}

          <div className="mt-8 text-center md:hidden">
            <a
              href="/blogs"
              className="font-mono text-xs uppercase tracking-widest text-nyala-gray-muted transition-colors hover:text-nyala-red"
            >
              View all posts →
            </a>
          </div>
        </div>
      </section>

      <AnimatedDivider />

      {/* ─── highlight moments ───────────────────── */}
      <section className="bg-nyala-black py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="highlight moments"
            subtitle="snapshots from our journey"
            align="center"
          />

          {isDesktop ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3 md:grid-cols-4"
            >
              {highlights.slice(0, 4).map((item, n) => (
                <motion.div key={n} variants={fadeUp} custom={n}>
                  <HighlightCard item={item} index={n} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {highlights.slice(0, 4).map((item, n) => (
                <div key={n} className="scale-in" style={{ animationDelay: `${n * 0.08}s` }}>
                  <HighlightCard item={item} index={n} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatedDivider />

      {/* ─── partnerships ────────────────────────────── */}
      <PartnershipsSection />

      <AnimatedDivider />

      {/* ─── cta ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-nyala-gray py-24">
        {/* background glow — only on desktop (blur is expensive on mobile GPU) */}
        {isDesktop && (
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nyala-red/5 blur-[100px]" />
            <div className="absolute right-1/4 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nyala-yellow/5 blur-[100px]" />
          </div>
        )}

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2 className="glow-text font-mono text-3xl font-bold tracking-tight text-nyala-yellow md:text-4xl">
              Ready to blaze the trail?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-md font-mono text-sm text-nyala-gray-muted">
              Join a community of builders who ship real projects, not just
              tutorials. Your journey starts here.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://forms.gle/f3g69MxUrquDFWQZ9"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-nyala-red bg-nyala-red px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-nyala-white transition-all duration-300 hover:bg-nyala-red-dark hover:shadow-lg hover:shadow-nyala-red/20"
              >
                Join Nyala →
              </a>
              <a
                href="/about"
                className="border border-nyala-gray-light px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-nyala-gray-muted transition-all duration-300 hover:border-nyala-yellow hover:text-nyala-yellow"
              >
                Our Story
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

function HackathonActivityCard() {
  return (
    <div className="group relative overflow-hidden border border-nyala-gray-light bg-nyala-gray p-6 transition-all duration-500 hover:-translate-y-2 hover:border-nyala-red/50 hover:shadow-[0_0_30px_rgba(198,40,40,0.1)]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 w-[200%] bg-gradient-to-r from-nyala-red via-nyala-yellow to-nyala-red opacity-0 transition-opacity duration-500 group-hover:animate-shimmer group-hover:opacity-100" />
      <div className="relative z-10 mb-4 flex items-center gap-3">
        <span className="inline-block h-2 w-2 rounded-full bg-nyala-red" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-nyala-red">
          featured
        </span>
      </div>
      <h3 className="font-mono text-lg font-semibold text-nyala-white">
        SunFest 2026: Harvest of Wonders
      </h3>
      <p className="mt-2 font-mono text-xs leading-relaxed text-nyala-gray-muted">
        Community festival with NGO booths, interactive games, QR-based activities, and a special opening ceremony.
      </p>
      <div className="mt-4 space-y-1 font-mono text-[10px] text-nyala-gray-muted">
        <div className="flex items-center gap-2">
          <span className="text-nyala-yellow">📅</span>
          <span>July 7 - 10, 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-nyala-yellow">📍</span>
          <span>Sunway College Building, Observation Deck & Booth Zones</span>
        </div>
      </div>
    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="group relative overflow-hidden border border-nyala-gray-light bg-nyala-gray p-6 transition-all duration-500 hover:-translate-y-2 hover:border-nyala-red/50 hover:shadow-[0_0_30px_rgba(198,40,40,0.1)]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 w-[200%] bg-gradient-to-r from-nyala-red via-nyala-yellow to-nyala-red opacity-0 transition-opacity duration-500 group-hover:animate-shimmer group-hover:opacity-100" />
      <div className="relative z-10 mb-4 flex items-center gap-3">
        <span className="inline-block h-2 w-2 rounded-full bg-nyala-red" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-nyala-red">
          {getEventStatus(activity.startDate, activity.endDate)}
        </span>
      </div>
      <h3 className="font-mono text-lg font-semibold text-nyala-white">{activity.title}</h3>
      <p className="mt-2 font-mono text-xs leading-relaxed text-nyala-gray-muted">{activity.description}</p>
      <div className="mt-4 space-y-1 font-mono text-[10px] text-nyala-gray-muted">
        <div className="flex items-center gap-2">
          <span className="text-nyala-yellow">📅</span>
          <span>{formatDate(activity.startDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-nyala-yellow">📍</span>
          <span>{activity.location}</span>
        </div>
      </div>
    </div>
  );
}

function HighlightCard({ item, index }: { item: HighlightItem; index: number }) {
  return (
    <div className="group relative aspect-square overflow-hidden border border-nyala-gray-light bg-nyala-gray transition-all duration-500 hover:-translate-y-2 hover:border-nyala-white/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
      <div
        className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: item.image ? `url(${item.image})` : undefined,
          filter: "brightness(0.6)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-nyala-black/80 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-end p-4">
        <span className="font-mono text-xs text-nyala-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {item.caption || defaultHighlightCaptions[index] || ""}
        </span>
      </div>
    </div>
  );
}
