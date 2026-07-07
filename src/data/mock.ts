import type { BlogPost, CommitteeMember, Activity, TimelineEntry, Aim } from "@/types";

export const taglines = [
  "Blaze The Trail",
  "Build What Matters",
  "Code The Future",
  "Break Boundaries",
  "Ignite Innovation",
];

export const heroMedia = [
  { type: "image" as const, src: "/images/hero-1.jpg", alt: "Nyala Labs hackathon" },
  { type: "image" as const, src: "/images/hero-2.jpg", alt: "Nyala Labs workshop" },
  { type: "image" as const, src: "/images/hero-3.jpg", alt: "Nyala Labs community event" },
];

export const mockBlogPosts: BlogPost[] = [
  {
    _id: "1",
    title: "How we built our first hackathon project in 48 hours",
    slug: "First-hackathon-project",
    excerpt:
      "A behind-the-scenes look at our team's journey through sleepless nights, countless bugs, and the thrill of shipping something real.",
    coverImage: "/images/blog-1.jpg",
    author: "Nyala Labs",
    categories: ["Hackathon", "Development"],
    publishedAt: "2025-12-15",
    readingTime: 5,
    featured: true,
  },
  {
    _id: "2",
    title: "Introduction to Web3: A Beginner's Roadmap",
    slug: "intro-to-web3",
    excerpt:
      "Breaking down the fundamentals of blockchain, smart contracts, and decentralized applications for newcomers.",
    coverImage: "/images/blog-2.jpg",
    author: "Tech Division",
    categories: ["Education", "Web3"],
    publishedAt: "2025-11-20",
    readingTime: 8,
  },
  {
    _id: "3",
    title: "Designing UI that doesn't suck: Lessons from our redesign",
    slug: "UI-Redesign-Lessons",
    excerpt:
      "What we learned when we threw out our entire design system and started from scratch.",
    coverImage: "/images/blog-3.jpg",
    author: "Design Team",
    categories: ["Design", "UX"],
    publishedAt: "2025-10-05",
    readingTime: 6,
  },
  {
    _id: "4",
    title: "The Art of Technical Presentations",
    slug: "Technical-Presentations",
    excerpt:
      "Tips and tricks for delivering impactful tech talks that actually keep your audience awake.",
    coverImage: "/images/blog-4.jpg",
    author: "Nyala Labs",
    categories: ["Skills", "Community"],
    publishedAt: "2025-09-18",
    readingTime: 4,
  },
  {
    _id: "5",
    title: "Open Source Contributions: Getting Started",
    slug: "open-source-guide",
    excerpt:
      "Your first pull request doesn't have to be terrifying. Here's how to start contributing to open source.",
    coverImage: "/images/blog-5.jpg",
    author: "Dev Team",
    categories: ["Development", "Open-Source"],
    publishedAt: "2025-08-22",
    readingTime: 7,
  },
  {
    _id: "6",
    title: "Recap: Nyala Labs Tech Summit 2025",
    slug: "Tech-Summit-Recap",
    excerpt:
      "Highlights from our biggest event yet — featuring industry speakers, workshops, and a lot of pizza.",
    coverImage: "/images/blog-6.jpg",
    author: "Events Team",
    categories: ["Events", "Recap"],
    publishedAt: "2025-07-10",
    readingTime: 5,
  },
];

export const mockCommittee: CommitteeMember[] = [
  {
    _id: "1",
    name: "Abel Chin",
    role: "President",
    image: "/images/committee/testing.jpg",
    bio: "Full-stack developer passionate about building communities and shipping products that matter.",
    linkedin: "https://linkedin.com",
    order: 1,
  },
  {
    _id: "2",
    name: "Joshua Kong",
    role: "Vice President I",
    image: "/images/committee/member-2.jpg",
    bio: "UX designer and blockchain enthusiast. Believes great design should be invisible.",
    linkedin: "https://linkedin.com",
    order: 2,
  },
  {
    _id: "3",
    name: "Javen Quek",
    role: "Vice President II",
    image: "/images/committee/member-3.jpg",
    bio: "systems architect who thinks in code. rust evangelist. occasional hackathon winner.",
    linkedin: "https://linkedin.com",
    order: 3,
  },
  {
    _id: "4",
    name: "maya patel",
    role: "events director",
    image: "/images/committee/member-4.jpg",
    bio: "organizes chaos into unforgettable experiences. powered by coffee and spreadsheets.",
    linkedin: "https://linkedin.com",
    order: 4,
  },
  {
    _id: "5",
    name: "liam tanaka",
    role: "marketing lead",
    image: "/images/committee/member-5.jpg",
    bio: "storyteller who turns tech jargon into compelling narratives. social media strategist.",
    linkedin: "https://linkedin.com",
    order: 5,
  },
  {
    _id: "6",
    name: "rin vasquez",
    role: "treasurer",
    image: "/images/committee/member-6.jpg",
    bio: "keeps the books balanced and the budgets realistic. aspiring fintech developer.",
    order: 6,
  },
  {
    _id: "7",
    name: "david okonkwo",
    role: "education lead",
    image: "/images/committee/member-7.jpg",
    bio: "believes in learning by doing. workshop facilitator and mentor to newcomers.",
    linkedin: "https://linkedin.com",
    order: 7,
  },
  {
    _id: "8",
    name: "emma wright",
    role: "secretary",
    image: "/images/committee/member-8.jpg",
    bio: "documentation enthusiast. if it's not written down, it didn't happen.",
    order: 8,
  },

];

export const mockActivities: Activity[] = [
  {
    _id: "1",
    title: "Nyala Labs Hackathon 2026",
    description: "48-hour hackathon open to youth and builders. build something amazing.",
    startDate: "2026-04-15T09:00:00",
    endDate: "2026-04-17T09:00:00",
    location: "Campus Innovation Hub",
    image: "/images/activity-1.jpg",
    speakers: ["Abel Chin", "Javen Quek"],
  },
  {
    _id: "2",
    title: "Intro to React Workshop",
    description: "Hands-on workshop covering react fundamentals and modern patterns.",
    startDate: "2026-03-28T14:00:00",
    endDate: "2026-03-28T17:00:00",
    location: "Lecture Hall B",
    image: "/images/activity-2.jpg",
    speakers: ["Joshua Kong"],
  },
  {
    _id: "3",
    title: "Tech Talk: AI in Production",
    description: "Industry speaker sharing real-world experiences deploying ai systems.",
    startDate: "2026-03-20T19:00:00",
    endDate: "2026-03-20T21:00:00",
    location: "Auditorium",
    image: "/images/activity-3.jpg",
    speakers: ["Dr. Sarah Lee"],
  },
];

export const timelineEvents: TimelineEntry[] = [
  {
    year: "2023",
    title: "The Spark",
    description:
      "Young people named a shared goal: a tech community centred on building, mentoring, and learning together—not only consuming content, but shipping real work.",
    type: "milestone",
  },
  {
    year: "2023",
    title: "First recognition bid",
    description:
      "We put forward an early application for formal recognition. The outcome was not a yes—yet the feedback pushed us to sharpen what makes Nyala Labs distinct and sustainable.",
    type: "setback",
  },
  {
    year: "2024",
    title: "Second recognition bid",
    description:
      "We returned with a clearer mission and plan. The decision was still no for official recognition—so we doubled down on consistent programming and an open door for new members.",
    type: "setback",
  },
  {
    year: "2024",
    title: "Proof in the room",
    description:
      "Workshops, hackathons, and meetups continued—youth-led, welcoming to beginners, and focused on outcomes. Participation became the clearest signal of demand.",
    type: "milestone",
  },
  {
    year: "2025",
    title: "Nyala Labs is born",
    description:
      "Officially recognised as a youth society under the Ministry of Youth and Sports—a formal home for the community we had been building with peers, mentors, and supporters.",
    type: "achievement",
  },
  {
    year: "2025",
    title: "First major summit",
    description:
      "Hosted the Nyala Labs Tech Summit with 200+ attendees, industry voices, and youth showcases—evidence of what sustained energy and teamwork can convene when we show up for the community.",
    type: "achievement",
  },
];

export const aims: Aim[] = [
  {
    title: "Build",
    description:
      "Ship projects that address real needs—prioritising practical outcomes, teamwork, and accountability over endless tutorials.",
    icon: "/images/icons/code.png",
  },
  {
    title: "Learn",
    description:
      "Peer-led teaching and mentorship through workshops, talks, and hands-on sessions—meet people where they are, from first lines of code to advanced builds.",
    icon: "/images/icons/learn.png",
  },
  {
    title: "Connect",
    description:
      "Open pathways between young people, alumni, and industry—networking and mentorship grounded in curiosity and mutual respect.",
    icon: "/images/icons/connect.png",
  },
  {
    title: "Compete",
    description:
      "Represent peers and our youth society with integrity in hackathons, competitions, and collaborative challenges—win with craft, not cynicism.",
    icon: "/images/icons/compete.png",
  },
  {
    title: "Innovate",
    description:
      "Explore emerging technology with care—AI, blockchain, IoT—and ask not only what we can build, but what we should build for people.",
    icon: "/images/icons/innovate.png",
  },
];

export const allCategories = [
  "all",
  "hackathon",
  "development",
  "education",
  "web3",
  "design",
  "ux",
  "skills",
  "community",
  "open-source",
  "events",
  "recap",
];
