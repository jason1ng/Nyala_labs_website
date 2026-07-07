"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TypingTagline from "./TypingTagline";
import { taglines } from "@/data/mock";
import { fetchHomepage } from "@/lib/cms-client";
import type { HeroMediaItem } from "@/types";

const fallbackHeroMedia: HeroMediaItem[] = [
  { type: "image", src: "/images/hero-1.jpg", alt: "Nyala Labs hackathon" },
  { type: "image", src: "/images/hero-2.jpg", alt: "Nyala Labs workshop" },
  { type: "image", src: "/images/hero-3.jpg", alt: "Nyala Labs community event" },
];

interface HeroVideoSectionProps {
  initialHeroMedia?: HeroMediaItem[];
}

export default function HeroVideoSection({ initialHeroMedia }: HeroVideoSectionProps = {}) {
  const [heroMedia, setHeroMedia] = useState<HeroMediaItem[]>(
    initialHeroMedia?.length ? initialHeroMedia : fallbackHeroMedia
  );
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  useEffect(() => {
    if (initialHeroMedia?.length) return;
    fetchHomepage().then((data) => {
      if (data.heroMedia.length > 0) {
        setHeroMedia(data.heroMedia);
      }
    });
  }, [initialHeroMedia]);

  useEffect(() => {
    if (heroMedia.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % heroMedia.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroMedia.length]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !parallaxRef.current) return;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
        parallaxRef.current!.style.transform = `translate(${x}px, ${y}px)`;
      });
    },
    []
  );

  const firstImage = heroMedia.find((m) => m.type === "image");

  return (
    <section
      ref={containerRef}
      onMouseMove={isDesktop ? handleMouseMove : undefined}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {isDesktop ? (
        <div ref={parallaxRef} className="absolute inset-0 -m-4 will-change-transform">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMediaIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ opacity: { duration: 1.5 }, scale: { duration: 1.5 } }}
              className="absolute inset-0"
            >
              {heroMedia[currentMediaIndex]?.type === "image" ? (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${heroMedia[currentMediaIndex]?.src})`,
                    filter: "brightness(0.3) contrast(1.1) saturate(0.8)",
                  }}
                />
              ) : (
                <video
                  src={heroMedia[currentMediaIndex]?.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="h-full w-full object-cover"
                  style={{
                    filter: "brightness(0.3) contrast(1.1) saturate(0.8)",
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: firstImage ? `url(${firstImage.src})` : undefined,
            filter: "brightness(0.3) contrast(1.1) saturate(0.8)",
          }}
        />
      )}

      {/* gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-nyala-black/60 via-transparent to-nyala-black" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-nyala-black/40 via-transparent to-nyala-black/40" />

      {/* scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      {/* content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* terminal prefix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-4 font-mono text-xs tracking-[0.3em] text-nyala-red uppercase"
        >
          ~/nyala-labs &gt; init
        </motion.div>

        {/* main tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <TypingTagline
            taglines={taglines}
            typingSpeed={100}
            deletingSpeed={50}
            pauseDuration={3000}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl"
          />
        </motion.div>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mx-auto mt-8 max-w-xl font-mono text-sm leading-relaxed text-nyala-gray-muted md:text-base"
        >
          A recognised youth society for builders, creators, and innovators.
          <br />
          Reject the ordinary. Build something real.
        </motion.p>

        {/* cta buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="https://forms.gle/f3g69MxUrquDFWQZ9"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-nyala-red bg-nyala-red px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-nyala-white transition-all duration-300 hover:bg-nyala-red-dark hover:shadow-lg hover:shadow-nyala-red/20"
          >
            Join us →
          </a>
          <a
            href="/about"
            className="border border-nyala-gray-light px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-nyala-gray-muted transition-all duration-300 hover:border-nyala-yellow hover:text-nyala-yellow"
          >
            Learn More
          </a>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-nyala-gray-muted">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-nyala-gray-muted to-transparent" />
        </motion.div>
      </motion.div>

      {/* media counter */}
      <div className="absolute bottom-8 right-6 flex items-center gap-2">
        {heroMedia.map((_, i) => (
          <motion.div
            key={i}
            className={`h-px transition-all duration-500 ${i === currentMediaIndex
              ? "w-8 bg-nyala-red"
              : "w-4 bg-nyala-gray-muted"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
