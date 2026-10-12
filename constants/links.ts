export const GITHUB = {
  branch: "main",
  org: "adios-mars",
  repo: "portfolio",
  user: "adios-mars",
} as const;

const GITHUB_URL = `https://github.com/${GITHUB.user}`;

export const LINK = {
  BLUESKY: "https://bsky.app",
  CALENDLY: "https://cal.com",
  CLARITY: "https://clarity.microsoft.com",
  DAILYDEV: "https://daily.dev",
  DISCORD: "https://discord.com",
  EMAIL: "adiosruthe@gmail.com",
  GITHUB: GITHUB_URL,
  GITHUB_REPO: `https://github.com/${GITHUB.user}/${GITHUB.repo}`,
  LICENSE: `${GITHUB_URL}/${GITHUB.repo}/blob/${GITHUB.branch}/LICENSE`,
  LINKEDIN: "https://www.linkedin.com/in/ruth-yeneneh",
  PEERLIST: "https://peerlist.io",
  RESUME: "/resume.pdf",
  SHADCN_LABS: "https://ui.shadcn.com",
  SHADCN_UI: "https://ui.shadcn.com",
  SPONSOR: `https://github.com/sponsors/${GITHUB.user}`,
  TELEGRAM: "https://t.me",
  TOKSCALE: "https://tokscale.ai",
  TOPMATE: "https://topmate.io",
  TWITTER: "https://x.com/adios_mars",
  X: "https://x.com/adios_mars",
  X_SHADCN_LABS: "https://x.com",
  YOUTUBE: "https://youtube.com",
} as const;
