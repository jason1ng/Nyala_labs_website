"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GrainOverlay from "@/components/ui/GrainOverlay";
import SplashCursor from "@/components/ui/SplashCursor";

type SiteShellProps = {
  children: ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  return (
    <>
      {isDesktop && <SplashCursor />}
      <GrainOverlay />
      <Navbar />
      <main className="relative z-0 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
