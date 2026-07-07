"use client";

import { motion } from "framer-motion";
import AnimatedDivider from "@/components/ui/AnimatedDivider";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

const tracks = [
  {
    num: "01",
    name: "GenAI Productivity",
    desc: "Build AI tools that automate tasks, summarize data, or enhance workflows using state-of-the-art LLMs.",
    tags: ["LLMs", "Automation", "Agents"],
  },
  {
    num: "02",
    name: "On-chain Inference",
    desc: "Leverage Chutes for verifiable, decentralized AI model execution directly integrated with blockchain state.",
    tags: ["Web3", "Verifiable AI", "DePIN"],
  },
  {
    num: "03",
    name: "UX for AI",
    desc: "Create the next-generation interface for interacting with LLMs, moving beyond simple chat boxes.",
    tags: ["UI/UX", "Canvas", "Multi-modal"],
  },
];

const prizeTracks = [
  {
    title: "University",
    prizes: ["1st: RM 500", "2nd: RM 300", "3rd: RM 200"],
  },
  {
    title: "Corporate",
    prizes: ["1st: RM 1000", "2nd: RM 500", "3rd: RM 200"],
  },
  {
    title: 'Special Track ("Sign in with Chutes")',
    prizes: ["RM 1000"],
  },
];

const detailedSchedule = [
  {
    day: "01",
    label: "MAY 18 – JUN 30",
    events: [
      {
        time: "Building Period",
        name: "Team development window",
        note: "Participants build in their own time and submit on Devpost by June 30, 11:59 PM.",
        highlight: true,
      },
      {
        time: "Ongoing",
        name: "Weekly workshops",
        note: "Recorded sessions available on Nyala Labs YouTube.",
      },
      {
        time: "Ongoing",
        name: "Discord support",
        note: "Stay updated via Discord and ask questions there.",
      },
    ],
  },
  {
    day: "02",
    label: "JUL 4",
    events: [
      {
        time: "12:00 PM",
        name: "Finalists announced",
        note: "Top 5 teams per category revealed on Discord.",
        highlight: true,
      },
      {
        time: "Afternoon",
        name: "Finalist prep window",
        note: "Teams continue polishing pitches for closing ceremony.",
      },
    ],
  },
  {
    day: "03",
    label: "JUL 7",
    events: [
      {
        time: "Hybrid",
        name: "Closing Ceremony",
        note: "WORQ Subang in person; judges join online.",
        highlight: true,
      },
      {
        time: "Live",
        name: "Finalist pitches",
        note: "5-minute demos and Q&A for judges.",
      },
      {
        time: "Evening",
        name: "Winner announcements",
        note: "Prizes awarded for University, Corporate, and Chutes tracks.",
      },
    ],
  },
];

const judgingCriteria = [
  {
    title: "Technical Execution",
    points: 25,
    description: "Code quality, clean architecture, and a functional end-to-end demo.",
  },
  {
    title: "Use of Chutes",
    points: 25,
    description: "Deep, non-trivial integration of Chutes compute and on-chain inference.",
  },
  {
    title: "Innovation & Creativity",
    points: 20,
    description: "Fresh angles and novel problem framing for productivity.",
  },
  {
    title: "Impact & Relevance",
    points: 20,
    description: "Solves a clear pain point for a defined target user.",
  },
  {
    title: "Presentation",
    points: 10,
    description: "Clarity of the 5-minute video and live pitch.",
  },
];

const faqs = [
  {
    q: "Is there a registration fee?",
    a: "No, the hackathon is completely free for all participants.",
  },
  {
    q: "Can I participate remotely?",
    a: "Yes! While we have a physical venue at INFINITY8, the hackathon is hybrid and open to online participants.",
  },
  {
    q: "What is the maximum team size?",
    a: "Teams can have between 1 to 4 members.",
  },
  {
    q: "What are 'Chutes'?",
    a: "Chutes is a decentralized compute layer for AI. All projects must use it for their model inference.",
  },
];

const eligibility = [
  {
    title: "Builders We Love",
    items: [
      "Developers (Fullstack, AI, Blockchain)",
      "Designers & UX Thinkers",
      "Students looking to build real products",
      "Professionals exploring GenAI",
    ],
    isPro: true,
  },
  {
    title: "This might not be for you if",
    items: [
      "You only want to build generic wrappers",
      "You aren't interested in decentralized compute",
      "You prefer working alone without mentor feedback",
    ],
    isPro: false,
  },
];

export default function ChutesHackathonPage() {
  return (
    <div className="relative min-h-screen bg-nyala-black selection:bg-nyala-red selection:text-white">
      {/* Premium Grid Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(155,152,144,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(155,152,144,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(198,40,40,0.07)_0%,transparent_70%)] opacity-50" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="bg-nyala-yellow px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-nyala-black">
                  Hybrid Hackathon
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-nyala-gray-muted uppercase">
                  Nyala Labs × Chutes
                </span>
              </div>
              <h1 className="font-glacial text-6xl font-bold leading-[0.9] tracking-tighter text-nyala-white md:text-8xl lg:text-9xl">
                CHUTES<br />
                HACK<br />
                <span className="text-nyala-red">MALAYSIA</span><br />
                2026
              </h1>
              <div className="my-8 h-1 w-20 bg-nyala-red" />
              <p className="max-w-md font-mono text-lg leading-relaxed text-nyala-gray-muted">
                A youth-led AI hackathon that runs from May 18 to June 30, with a closing ceremony on July 7.
                <strong className="block text-nyala-white mt-2 font-normal">
                  Use Chutes as your required compute provider, build hybrid-ready productivity solutions, and compete for cash prizes.
                </strong>
              </p>

              <div className="mt-10 flex flex-col gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <svg className="h-5 w-5 text-nyala-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-mono text-sm text-nyala-white">May 18 – June 30, 2026 · <span className="text-nyala-gray-muted text-xs">Hybrid Build Window</span></span>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg className="h-5 w-5 text-nyala-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-mono text-sm text-nyala-white">INFINITY8 Reserve, Sunway Square & Online</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg className="h-5 w-5 text-nyala-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-mono text-sm text-nyala-white">Free Entry · All skill levels welcome</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <a
                    href="https://luma.com/gdre3p9z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-3 bg-nyala-red px-10 py-5 font-mono text-sm font-bold uppercase tracking-widest text-nyala-black transition-all hover:opacity-90"
                  >
                    Register Now
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a href="#tracks" className="font-mono text-xs uppercase tracking-widest text-nyala-gray-muted underline underline-offset-8 transition-colors hover:text-nyala-white">
                    Learn more ↓
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-px bg-nyala-gray-light border border-nyala-gray-light">
                <div className="bg-nyala-black/50 p-10 backdrop-blur-sm">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nyala-gray-muted">Prize Pool</span>
                  <p className="mt-2 font-glacial text-6xl font-bold text-nyala-red">RM 4K+</p>
                </div>
                <div className="bg-nyala-black/50 p-10 backdrop-blur-sm border-l border-nyala-gray-light">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nyala-gray-muted">Duration</span>
                  <p className="mt-2 font-glacial text-6xl font-bold text-nyala-white">6 WEEKS</p>
                </div>
                <div className="bg-nyala-black/50 p-10 backdrop-blur-sm border-t border-nyala-gray-light">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nyala-gray-muted">Format</span>
                  <p className="mt-2 font-glacial text-4xl font-bold text-nyala-white">HYBRID</p>
                </div>
                <div className="bg-nyala-black/50 p-10 backdrop-blur-sm border-t border-l border-nyala-gray-light">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nyala-red">Requirement</span>
                  <p className="mt-2 font-glacial text-4xl font-bold text-nyala-yellow">CHUTES</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-nyala-red/10 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatedDivider />

      {/* Tracks Section */}
      <section id="tracks" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="Focus Tracks" subtitle="Choose your path and build the future of AI" />
          
          <div className="mt-16 grid gap-px bg-nyala-gray-light border border-nyala-gray-light md:grid-cols-3">
            {tracks.map((track, idx) => (
              <motion.div
                key={track.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-nyala-black p-10 transition-colors hover:bg-nyala-gray/30"
              >
                <span className="font-mono text-xs text-nyala-red tracking-widest mb-6 block">{track.num}</span>
                <h3 className="font-glacial text-3xl font-bold text-nyala-white mb-4">{track.name}</h3>
                <p className="text-nyala-gray-muted text-sm leading-relaxed mb-8">{track.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {track.tags.map(tag => (
                    <span key={tag} className="bg-nyala-yellow/10 border border-nyala-yellow/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-nyala-yellow">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-nyala-red transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedDivider />

      {/* Prize Tracks Section */}
      <section className="relative py-24 bg-nyala-black/50">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="Prize Pools" subtitle="Compete across categories for cash rewards" />
          
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {prizeTracks.map((track, idx) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group border border-nyala-gray-light bg-nyala-gray p-8 transition-all hover:-translate-y-2 hover:border-nyala-red/50"
              >
                <h3 className="font-mono text-xl font-bold text-nyala-yellow mb-6 uppercase tracking-wider">{track.title}</h3>
                <ul className="space-y-4">
                  {track.prizes.map((prize, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-3">
                      <div className="h-1 w-1 rounded-full bg-nyala-red" />
                      <span className="font-mono text-sm text-nyala-white">{prize}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedDivider />

      {/* Detailed Schedule */}
      <section id="schedule" className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="Full Schedule" subtitle="From kickoff to closing ceremony — a multi-week build journey" />
          
          <div className="mt-16 grid gap-px bg-nyala-gray-light border border-nyala-gray-light md:grid-cols-3">
            {detailedSchedule.map((day, idx) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-nyala-black min-h-[400px]"
              >
                <div className="bg-nyala-gray/50 p-6 border-b border-nyala-gray-light">
                  <span className="font-glacial text-4xl font-bold text-nyala-red block leading-none">{day.day}</span>
                  <span className="font-mono text-[10px] text-nyala-gray-muted tracking-[0.2em] mt-1 block uppercase">{day.label}</span>
                </div>
                <div className="p-6 space-y-8">
                  {day.events.map((event, eIdx) => (
                    <div key={eIdx} className={`relative pl-4 border-l ${event.highlight ? 'border-nyala-red' : 'border-nyala-gray-light'}`}>
                      <span className="font-mono text-[10px] text-nyala-red block mb-1">{event.time}</span>
                      <h4 className="font-glacial text-sm font-bold text-nyala-white leading-tight">{event.name}</h4>
                      <p className="text-[10px] text-nyala-gray-muted mt-1 uppercase tracking-wider">{event.note}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedDivider />

      {/* Eligibility Section */}
      <section id="eligibility" className="relative py-24 bg-nyala-black/50">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="Who Should Join" subtitle="We're looking for builders who think differently" />
          
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            {eligibility.map((group, idx) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <h3 className={`font-mono text-xs uppercase tracking-[0.2em] mb-8 pb-4 border-b border-nyala-gray-light ${group.isPro ? 'text-nyala-white' : 'text-nyala-gray-muted'}`}>
                  {group.title}
                </h3>
                <ul className="space-y-6">
                  {group.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-4">
                      <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${group.isPro ? 'bg-nyala-red' : 'bg-nyala-gray-muted opacity-50'}`} />
                      <span className={`font-mono text-sm ${group.isPro ? 'text-nyala-white' : 'text-nyala-gray-muted line-through opacity-60'}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedDivider />

      {/* Judging Criteria */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="Judging Rubric" subtitle="The 100-point path to victory" />
          
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {judgingCriteria.map((criterion, idx) => (
              <motion.div
                key={criterion.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative bg-nyala-gray border border-nyala-gray-light p-8 transition-all hover:border-nyala-red/50"
              >
                <span className="font-mono text-lg text-nyala-red tracking-wider font-bold">{criterion.points} PTS</span>
                <h3 className="font-glacial text-xl font-bold text-nyala-white mt-4 mb-3">{criterion.title}</h3>
                <p className="text-nyala-gray-muted text-xs leading-relaxed">{criterion.description}</p>
                <div className="mt-6 h-1 w-full bg-nyala-black">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${criterion.points}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-nyala-red to-nyala-yellow"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedDivider />

      {/* FAQ Section */}
      <section id="faq" className="relative py-24 bg-nyala-black/50">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="FAQ" subtitle="Common questions and quick answers" />
          
          <div className="mt-16 grid gap-px bg-nyala-gray-light border border-nyala-gray-light md:grid-cols-2">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-nyala-black p-10"
              >
                <h4 className="font-glacial text-lg font-bold text-nyala-white mb-4 tracking-tight">{faq.q}</h4>
                <p className="text-nyala-gray-muted text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedDivider />

      {/* Organizers Section */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title="Organizers" subtitle="Powered by the teams building the future of compute and AI" />
          
          <div className="mt-16 flex flex-col md:flex-row gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex-1 border border-nyala-gray-light p-10 flex items-center gap-8 bg-nyala-gray/30"
            >
              <img
              src="/images/icons/21.svg"
              alt="brand icon"
              className="h-32 w-32 shrink-0 opacity-90 transition-transform duration-300 group-hover:scale-110"
              />
              <div>
                <h3 className="font-glacial text-3xl font-bold text-nyala-white uppercase tracking-tighter">NYALA<span className="text-nyala-red">LABS</span></h3>
                <p className="font-mono text-[10px] text-nyala-gray-muted uppercase tracking-[0.2em] mt-1">Research & Development</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="flex-1 border border-nyala-gray-light p-10 flex items-center gap-8 bg-nyala-gray/30"
            >
              <img
              src="/images/partners/chutes-logo.webp"
              alt="brand icon"
              className="h-32 w-32 shrink-0 opacity-90 transition-transform duration-300 group-hover:scale-110"
              />
              <div>
                <h3 className="font-glacial text-3xl font-bold text-nyala-white uppercase tracking-tighter">CHUTES</h3>
                <p className="font-mono text-[10px] text-nyala-gray-muted uppercase tracking-[0.2em] mt-1">Decentralized Compute</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden border-t border-nyala-gray-light">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(198,40,40,0.07)_0%,transparent_70%)] opacity-50 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 text-center relative z-10">
          <span className="font-mono text-xs text-nyala-red tracking-[0.3em] uppercase mb-6 block">Ready to build?</span>
          <h2 className="font-glacial text-6xl md:text-8xl font-bold text-nyala-white tracking-tighter mb-10 leading-none">
            START YOUR <br />
            <span className="text-nyala-red">AI JOURNEY</span>
          </h2>
          <a
            href="https://luma.com/gdre3p9z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-nyala-red px-12 py-6 font-mono text-sm font-bold uppercase tracking-[0.2em] text-nyala-black transition-all hover:scale-105"
          >
            Register Now
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="mt-8 font-mono text-[15px] text-nyala-gray-muted tracking-widest uppercase">Registration deadline: <span className="text-nyala-yellow">MAY 17, 2026</span></p>
          <p className="mt-2 font-mono text-[12px] text-nyala-gray-muted">
            Join the Discord for updates:
            <a
              href="https://discord.gg/MmncAPW9Wb"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-2 text-nyala-yellow hover:underline"
            >
              <img
                src="/images/icons/discord.svg"
                alt="Discord"
                aria-hidden="false"
                width={16}
                height={16}
                className="h-4 w-4 inline-block"
              />
              <span className="underline">discord.gg/MmncAPW9Wb</span>
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

