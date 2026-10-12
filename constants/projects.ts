import type {
  Project,
  ProjectSource,
  ProjectSourceOption,
} from "@/types/projects";

export const HOME_FEATURED_PROJECT_COUNT = 4 as const;

export const PROJECT_SOURCES = [
  {
    label: "Personal",
    value: "personal",
  },
] as const satisfies readonly ProjectSourceOption[];

export const DEFAULT_PROJECT_SOURCE: ProjectSource = "personal";

export const PROJECTS = [
  {
    category: "Product",
    date: {
      month: "October",
      year: 2026,
    },
    description:
      "Real-time minibus transit tracking and seat availability for Addis Ababa built with Flutter, OpenStreetMap, and OSRM routing.",
    featured: true,
    links: {
      github: "https://github.com/adios-mars/taxi-ale",
    },
    slug: "taxi-ale",
    source: "personal",
    title: "Taxi Ale",
  },
  {
    category: "Product",
    date: {
      month: "July",
      year: 2026,
    },
    description:
      "A community-driven reading tracker and social book discovery platform with real-time reading clubs and personal library management.",
    featured: true,
    image: "/projects/katch.png",
    links: {
      github: "https://github.com/adios-mars/Katch",
      website: "https://adios-mars.github.io/Katch",
    },
    slug: "katch",
    source: "personal",
    title: "Katch",
  },
  {
    category: "Tool",
    date: {
      month: "October",
      year: 2026,
    },
    description:
      "Concurrent client-server chat application implemented in C using POSIX threads and raw Berkeley TCP sockets with multi-room messaging and file transfers.",
    featured: true,
    links: {
      github: "https://github.com/adios-mars/multi-user-chat-system",
    },
    slug: "multi-user-chat-system",
    source: "personal",
    title: "Multi-User Chat System",
  },
] satisfies readonly Project[];
