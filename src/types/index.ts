export type SectionAnchor = {
  id: string;
  label: string;
};

export type Skill = {
  name: string;
  level: number;
  detail: string;
};

export type SkillCategory = {
  title: string;
  description: string;
  gradient: string;
  skills: Skill[];
};

export type Project = {
  title: string;
  subtitle: string;
  summary: string;
  details: string[];
  tags: string[];
  live: string;
  repo: string;
};

export type ExperienceEntry = {
  year: string;
  company: string;
  role: string;
  location: string;
  highlights: string[];
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
  type: 'milestone' | 'setback' | 'achievement';
};

export type Aim = {
  title: string;
  description: string;
  icon: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  categories: string[];
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
};

export type CommitteeMember = {
  _id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  order: number;
};

export type Activity = {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  image: string;
  speakers: string[];
};

export type HeroMediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
};

export type HighlightItem = {
  image: string;
  caption?: string;
};
