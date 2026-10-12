import type { NavGroup, NavItem } from "@/types/nav";

import { ROUTES } from "./routes";
import { getBaseUrl } from "./url";
import { NAME, USER } from "./user";

const baseUrl = getBaseUrl();

export const SITE = {
  AUTHOR: {
    AVATAR: USER.avatar,
    NAME,
    TWITTER: "@adios_mars",
  },
  DESCRIPTION: {
    LONG: "Software engineer building practical systems, mobile applications, and modern web platforms.",
    SHORT: "Software engineer building systems, mobile, and web applications.",
  },
  KEYWORDS: [
    "Ruth Yeneneh",
    "adios-mars",
    "Software Engineer",
    "Full Stack Developer",
    "Systems Programming",
    "Mobile Developer",
    "Flutter",
    "React Developer",
    "Next.js",
    "Tailwind CSS",
    "Web Development",
    "Portfolio",
  ],
  NAME,
  URL: baseUrl,
} as const;

export const META_THEME_COLORS = {
  dark: "#0a0a0a",
  light: "#ffffff",
};

export const UTM_PARAMS = {
  utm_source: new URL(baseUrl).hostname,
};

export const NAV_STANDALONE: NavItem[] = [
  {
    href: ROUTES.HOME,
    id: "home",
    label: "home",
  },
  {
    href: ROUTES.CONTACT,
    id: "contact",
    label: "contact",
  },
];

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "work",
    items: [
      {
        href: ROUTES.PROJECTS,
        id: "projects",
        label: "projects",
      },
      {
        href: ROUTES.USES,
        id: "uses",
        label: "uses",
      },
    ],
    label: "work",
  },
  {
    id: "extras",
    items: [
      {
        href: ROUTES.STATS,
        id: "stats",
        label: "stats",
      },
    ],
    label: "extras",
  },
];
