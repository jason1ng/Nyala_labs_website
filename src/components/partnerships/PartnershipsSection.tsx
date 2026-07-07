'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import LogoLoop from '@/components/ui/LogoLoop';
import '@/components/ui/LogoLoop.css';

// Partnership logo data - easily swap URLs here
const partnerships = [
  {
    id: 1,
    name: 'Partner One',
    logo: './images/partners/chutes-logo.webp',
    url: 'https://chutes.ai/',
  },
  {
    id: 2,
    name: 'Partner Two',
    logo: './images/partners/partner2.png',
    url: '#',
  },
];

// Convert partnerships to LogoLoop format
const logoLoopData = partnerships.map(partner => ({
  src: partner.logo,
  alt: partner.name,
  href: partner.url,
}));

/**
 * PartnershipsSection Component
 * 
 * Features:
 * - Staggered slide-in animation triggered on scroll
 * - Grayscale to color transition on hover
 * - Glow and lift effects for visual depth
 * - Fully responsive (mobile-optimized)
 * - Hardware-accelerated animations (60fps)
 * 
 * To customize:
 * 1. Update the `partnerships` array with your logo URLs
 * 2. Adjust animation timing in `containerVariants` and `itemVariants`
 * 3. Modify grid columns in the responsive classes
 */

const PartnershipsSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-120px' });

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-nyala-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="glow-text text-3xl md:text-4xl lg:text-5xl font-bold text-nyala-yellow mb-4"
          >
            Our Partners
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Collaborating with industry leaders to deliver excellence.
          </motion.p>
        </div>

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="overflow-hidden rounded-[32px]"
        >
          <div className="py-4">
            <LogoLoop
              logos={logoLoopData}
              speed={100}
              direction="left"
              logoHeight={60}
              gap={60}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#0b0b0b"
              ariaLabel="Our partners"
            />
          </div>
        </motion.div>

        <div className="mt-10 text-center">
          <p className="text-white/60 mb-4">Interested in partnering with us?</p>
          <button className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-nyala-red to-red-700 text-white rounded-lg font-semibold shadow-lg shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02]">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default PartnershipsSection;
