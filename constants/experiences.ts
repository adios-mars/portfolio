import type { Experience } from "@/types/experiences";

export const HOMEPAGE_EXPERIENCE_COUNT = 3 as const;

export const EXPERIENCES: readonly Experience[] = [
  {
    category: "Open Source",
    experienceDescription: [
      "Built Taxi Ale in Flutter and Dart with live GPS tracking, 30+ offline-indexed Addis Ababa transit hubs, and zero-cost OpenStreetMap/OSRM routing.",
      "Shipped Addis Market Tracker (FastAPI, SQLite, Telegram Mini App) comparing daily staple food prices across Merkato, Atkilt Tera, Shola, and Piassa.",
      "Engineered Veda voice assistant reducing audio upload payloads by 85%+ with 32kbps MP3 compression, Deepgram/Gemini STT, and multi-model quota failover.",
    ],
    experienceLinks: {
      github: "https://github.com/adios-mars",
      website: "https://github.com/adios-mars",
    },
    experienceOrg: {
      link: "https://github.com/adios-mars",
      name: "Independent / GitHub",
      websiteDisplayName: "github.com/adios-mars",
    },
    experienceStatus: {
      endAt: "PRESENT",
      startAt: "2025",
    },
    experienceTech: [
      "Flutter",
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
    ],
    experienceTitle: "Open-Source Software Engineer",
    orgDescription:
      "Designing and shipping open-source mobile, web, and AI products from Addis Ababa, Ethiopia.",
    slug: "open-source-software-engineer",
  },
  {
    category: "Backend & Automation",
    experienceDescription: [
      "Architected an asynchronous Telegram attendance management system in Python and Aiogram 3 supporting multi-course instructor administration and deep-link enrollment.",
      "Enabled SQLite Write-Ahead Logging (WAL) to handle simultaneous classroom check-ins without write-lock contention.",
      "Implemented 60-second anti-cheat check-in PIN sessions, 3-absence disciplinary alerts, and automated institutional PDF roster exports via ReportLab.",
    ],
    experienceLinks: {
      github: "https://github.com/adios-mars/campus-attendance-bot",
    },
    experienceOrg: {
      link: "https://github.com/adios-mars/campus-attendance-bot",
      name: "Dire Dawa University Tooling",
      websiteDisplayName: "campus-attendance-bot",
    },
    experienceStatus: {
      endAt: "PRESENT",
      startAt: "OCT 2026",
    },
    experienceTech: ["Python", "Aiogram 3", "Asyncio", "SQLite WAL", "ReportLab"],
    experienceTitle: "Backend & Bot Developer",
    orgDescription:
      "Asynchronous campus attendance automation built for Dire Dawa University (DDU) courses and cohorts.",
    slug: "campus-tooling-developer",
  },
  {
    category: "Systems",
    experienceDescription: [
      "Engineered a concurrent client-server TCP chat application in C using POSIX threads (pthread) and raw Berkeley sockets.",
      "Implemented mutex-synchronized client registries and dynamic room routing to prevent race conditions under concurrent connections.",
      "Designed a three-stage framed binary file transfer protocol using 8KB payload chunks alongside direct private messaging.",
    ],
    experienceLinks: {
      github: "https://github.com/adios-mars/multi-user-chat-system",
    },
    experienceOrg: {
      link: "https://github.com/adios-mars/multi-user-chat-system",
      name: "C Systems Engineering",
      websiteDisplayName: "multi-user-chat-system",
    },
    experienceStatus: {
      endAt: "OCT 2026",
      startAt: "OCT 2026",
    },
    experienceTech: ["C", "POSIX Threads", "Berkeley Sockets", "TCP/IP", "GCC"],
    experienceTitle: "Systems & Network Developer",
    orgDescription:
      "Low-level concurrent networking and socket systems built in C with POSIX threads.",
    slug: "systems-network-developer",
  },
];
