"use client";

import { motion } from "framer-motion";
import CommitteeCard from "@/components/committee/CommitteeCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { staggerContainer } from "@/lib/animations";
import type { CommitteeMember } from "@/types";

interface CommitteePageClientProps {
  members: CommitteeMember[];
}

export default function CommitteePageClient({ members }: CommitteePageClientProps) {
  return (
    <div className="min-h-screen bg-nyala-black pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-nyala-red">
            ~/nyala-labs/committee &gt;
          </span>
        </motion.div>

        <SectionHeading
          title="the people behind the trail"
          subtitle="meet the team that keeps Nyala Labs moving forward"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {members.map((member, i) => (
            <CommitteeCard key={member._id} member={member} index={i} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 border border-nyala-gray-light bg-nyala-gray p-8 text-center md:p-12"
        >
          <h3 className="font-mono text-xl font-bold text-nyala-white">
            want to be part of the team?
          </h3>
          <p className="mx-auto mt-3 max-w-md font-mono text-xs text-nyala-gray-muted">
            we&apos;re always looking for passionate individuals to join the
            committee. whether you&apos;re into tech, design, events, or
            marketing — there&apos;s a place for you.
          </p>
          <a
            href="https://forms.gle/f3g69MxUrquDFWQZ9"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block border border-nyala-red bg-nyala-red px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-nyala-white transition-all duration-300 hover:bg-nyala-red-dark hover:shadow-lg hover:shadow-nyala-red/20"
          >
            apply now →
          </a>
        </motion.div>
      </div>

      <div className="h-24" />
    </div>
  );
}
