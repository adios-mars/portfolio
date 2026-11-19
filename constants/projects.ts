import type {
  Project,
  ProjectSource,
  ProjectSourceOption,
} from "@/types/projects";

export const HOME_FEATURED_PROJECT_COUNT = 6 as const;

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
      month: "November",
      year: 2026,
    },
    description:
      "Web platform and Telegram Mini App tracking daily staple food prices across Addis Ababa markets (Merkato, Atkilt Tera, Shola, and Piassa).",
    featured: true,
    links: {
      github: "https://github.com/adios-mars/addis-market-tracker",
    },
    slug: "addis-market-tracker",
    source: "personal",
    title: "Addis Market Tracker",
  },
  {
    category: "Tool",
    date: {
      month: "November",
      year: 2026,
    },
    description:
      "Low-latency conversational AI voice assistant with multi-model LLM failover, pre-upload MP3 compression, dual-engine STT/TTS, and native Linux audio routing.",
    featured: true,
    links: {
      github: "https://github.com/adios-mars/veda-voice-assistant",
    },
    slug: "veda-voice-assistant",
    source: "personal",
    title: "Veda Voice Assistant",
  },
  {
    category: "Product",
    date: {
      month: "October",
      year: 2026,
    },
    description:
      "Real-time minibus transit tracking and seat availability for Addis Ababa built with Flutter, OpenStreetMap, and OSRM routing.",
    featured: true,
    image: "/projects/taxi-ale-hero.png",
    links: {
      github: "https://github.com/adios-mars/taxi-ale",
    },
    slug: "taxi-ale",
    source: "personal",
    title: "Taxi Ale",
  },
  {
    category: "Tool",
    date: {
      month: "October",
      year: 2026,
    },
    description:
      "Asynchronous Telegram attendance tracking system for Dire Dawa University built with Python, Aiogram 3, SQLite WAL concurrency, and ReportLab PDF exports.",
    featured: true,
    image: "/projects/campus-attendance-bot.jpg",
    links: {
      github: "https://github.com/adios-mars/campus-attendance-bot",
    },
    slug: "campus-attendance-bot",
    source: "personal",
    title: "Campus Attendance Bot",
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
] satisfies readonly Project[];
