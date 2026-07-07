"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = [
  { href: "/about", label: "About Us" },
  { href: "/blogs", label: "Blogs" },
  { href: "/committee", label: "Committee" },
  { href: "/activities", label: "Activities" },
];

const socialLinks = [
  { href: "https://discord.gg/zxHk5u85wN", label: "Discord" },
  { href: "https://www.instagram.com/nyalalabs/", label: "Instagram" },
  { href: "https://www.linkedin.com/company/nyalalabs", label: "Linkedin" },
  { href: "https://github.com/Nyala-Labs", label: "Github" },
];

export default function Footer() {
  return (
    <footer className="border-t border-nyala-gray-light bg-nyala-black">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* brand */}
          <div>
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/images/icons/21.svg"
                alt="brand icon"
                className="h-12 w-12 shrink-0 opacity-90"
              />
              <span className="font-pixel text-xl font-bold tracking-tighter">
                <span className="text-nyala-white">NYALA</span>
                <span className="text-nyala-red">LABS</span>
              </span>
            </motion.div>
            <p className="mt-3 font-mono text-xs leading-relaxed text-nyala-gray-muted">
              Nyala Labs is a Malaysia-based recognised youth society under the Ministry of
              Youth and Sports—a community for builders, creators, and innovators passionate
              about technology, especially AI. We learn and grow together.
            </p>
          </div>

          {/* links */}
          <div className="flex gap-16">
            <div>
              <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-nyala-gray-muted">
                Pages
              </h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-mono text-sm text-nyala-gray-muted transition-colors hover:text-nyala-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-nyala-gray-muted">
                Social
              </h4>
              <ul className="space-y-2">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-nyala-gray-muted transition-colors hover:text-nyala-red"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* cta */}
          <div className="flex flex-col justify-between">
            <p className="font-mono text-xs text-nyala-gray-muted">
              Want to join?
            </p>
            <a
              href="https://forms.gle/f3g69MxUrquDFWQZ9"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block w-fit border border-nyala-red bg-nyala-red px-5 py-2 tracking-widest font-mono text-xs uppercase text-nyala-white transition-all duration-300 hover:bg-nyala-red-dark hover:shadow-lg hover:shadow-nyala-red/20"
            >
              Apply now →
            </a>
          </div>
        </div>

        {/* bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-nyala-gray-light pt-6 md:flex-row">
          <p className="font-mono text-[10px] text-nyala-gray-muted">
            © {new Date().getFullYear()} Nyala Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
