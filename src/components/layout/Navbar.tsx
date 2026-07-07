"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, px } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/activities", label: "Activities" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/blogs", label: "Blogs" },
  { href: "/committee", label: "Committee" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-nyala-black/90 py-3 shadow-lg shadow-nyala-red/5 backdrop-blur-xl"
            : "bg-transparent py-5"
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* logo */}
          <Link href="/" className="group flex items-center gap-3">
            <img
              src="/images/icons/21.svg"
              alt="brand icon"
              className="h-12 w-12 shrink-0 opacity-90 transition-transform duration-300 group-hover:scale-110"
            />
            <motion.span
              className="font-pixel text-xl font-bold tracking-tighter text-nyala-white"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-nyala-white">NYALA</span>
              <span className="text-nyala-red">LABS</span>
            </motion.span>
            <motion.span
              className="inline-block h-2 w-2 rounded-full bg-nyala-red"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </Link>

          {/* desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative font-mono text-sm text-nyala-gray-muted transition-colors duration-300 hover:text-nyala-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-nyala-red transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-px w-5 bg-nyala-white"
              animate={menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-px w-5 bg-nyala-white"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-px w-5 bg-nyala-white"
              animate={menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-nyala-black/98 backdrop-blur-xl"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-2xl text-nyala-white transition-colors hover:text-nyala-red"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
