export interface CoreTechnology {
  activeBg: string;
  activeBorder: string;
  activeShadow: string;
  badgeHover: string;
  brandColor?: string;
  darkBrandColor?: string;
  icon:
    | "c"
    | "flutter"
    | "js"
    | "nextjs"
    | "python"
    | "react"
    | "tailwindcss"
    | "ts";
  iconColor: string;
  name: string;
}

export const CORE_TECHNOLOGIES: readonly CoreTechnology[] = [
  {
    activeBg: "rgba(0, 89, 156, 0.08)",
    activeBorder: "rgba(0, 89, 156, 0.45)",
    activeShadow: "0 4px 20px -4px rgba(101, 154, 210, 0.35)",
    badgeHover:
      "hover:border-[#00599C]/45 dark:hover:border-[#659AD2]/50 hover:bg-[#00599C]/5 dark:hover:bg-[#659AD2]/10 hover:shadow-[0_4px_20px_-4px_rgba(101,154,210,0.3)] active:border-[#00599C]/60 active:bg-[#00599C]/10",
    brandColor: "#00599C",
    darkBrandColor: "#659AD2",
    icon: "c",
    iconColor:
      "group-hover:text-[#00599C] dark:group-hover:text-[#659AD2] group-active:text-[#00599C] dark:group-active:text-[#659AD2]",
    name: "C / POSIX",
  },
  {
    activeBg: "rgba(2, 86, 155, 0.08)",
    activeBorder: "rgba(2, 86, 155, 0.45)",
    activeShadow: "0 4px 20px -4px rgba(71, 197, 251, 0.35)",
    badgeHover:
      "hover:border-[#02569B]/45 dark:hover:border-[#47C5FB]/50 hover:bg-[#02569B]/5 dark:hover:bg-[#47C5FB]/10 hover:shadow-[0_4px_20px_-4px_rgba(71,197,251,0.3)] active:border-[#02569B]/60 active:bg-[#02569B]/10",
    brandColor: "#02569B",
    darkBrandColor: "#47C5FB",
    icon: "flutter",
    iconColor:
      "group-hover:text-[#02569B] dark:group-hover:text-[#47C5FB] group-active:text-[#02569B] dark:group-active:text-[#47C5FB]",
    name: "Flutter / Dart",
  },
  {
    activeBg: "rgba(8, 126, 164, 0.08)",
    activeBorder: "rgba(8, 126, 164, 0.45)",
    activeShadow: "0 4px 20px -4px rgba(97, 218, 251, 0.35)",
    badgeHover:
      "hover:border-[#087ea4]/45 dark:hover:border-[#61DAFB]/50 hover:bg-[#087ea4]/5 dark:hover:bg-[#61DAFB]/10 hover:shadow-[0_4px_20px_-4px_rgba(97,218,251,0.3)] active:border-[#087ea4]/60 active:bg-[#087ea4]/10",
    brandColor: "#087ea4",
    darkBrandColor: "#61DAFB",
    icon: "react",
    iconColor:
      "group-hover:text-[#087ea4] dark:group-hover:text-[#61DAFB] group-active:text-[#087ea4] dark:group-active:text-[#61DAFB]",
    name: "React 19",
  },
  {
    activeBg: "rgba(120, 120, 120, 0.08)",
    activeBorder: "rgba(120, 120, 120, 0.45)",
    activeShadow: "0 4px 20px -4px rgba(0, 0, 0, 0.2)",
    badgeHover:
      "hover:border-foreground/50 hover:bg-foreground/5 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.15)] active:border-foreground/60 active:bg-foreground/10",
    brandColor: "currentColor",
    darkBrandColor: "#ffffff",
    icon: "nextjs",
    iconColor: "group-hover:text-foreground group-active:text-foreground",
    name: "Next.js",
  },
  {
    activeBg: "rgba(49, 120, 198, 0.08)",
    activeBorder: "rgba(49, 120, 198, 0.5)",
    activeShadow: "0 4px 20px -4px rgba(49, 120, 198, 0.35)",
    badgeHover:
      "hover:border-[#3178C6]/50 hover:bg-[#3178C6]/5 dark:hover:bg-[#3178C6]/10 hover:shadow-[0_4px_20px_-4px_rgba(49,120,198,0.3)] active:border-[#3178C6]/60 active:bg-[#3178C6]/10",
    brandColor: "#3178C6",
    darkBrandColor: "#3178C6",
    icon: "ts",
    iconColor: "group-hover:text-[#3178C6] group-active:text-[#3178C6]",
    name: "TypeScript",
  },
  {
    activeBg: "rgba(247, 223, 30, 0.08)",
    activeBorder: "rgba(247, 223, 30, 0.5)",
    activeShadow: "0 4px 20px -4px rgba(247, 223, 30, 0.35)",
    badgeHover:
      "hover:border-[#F7DF1E]/50 hover:bg-[#F7DF1E]/5 dark:hover:bg-[#F7DF1E]/10 hover:shadow-[0_4px_20px_-4px_rgba(247,223,30,0.3)] active:border-[#F7DF1E]/60 active:bg-[#F7DF1E]/10",
    brandColor: "#F7DF1E",
    darkBrandColor: "#F7DF1E",
    icon: "js",
    iconColor: "group-hover:text-[#F7DF1E] group-active:text-[#F7DF1E]",
    name: "JavaScript",
  },
  {
    activeBg: "rgba(55, 118, 171, 0.08)",
    activeBorder: "rgba(55, 118, 171, 0.45)",
    activeShadow: "0 4px 20px -4px rgba(55, 118, 171, 0.35)",
    badgeHover:
      "hover:border-[#3776AB]/45 dark:hover:border-[#FFD43B]/45 hover:bg-[#3776AB]/5 dark:hover:bg-[#FFD43B]/5 hover:shadow-[0_4px_20px_-4px_rgba(55,118,171,0.3)] active:border-[#3776AB]/60 active:bg-[#3776AB]/10",
    brandColor: "#3776AB",
    darkBrandColor: "#FFD43B",
    icon: "python",
    iconColor:
      "group-hover:text-[#3776AB] dark:group-hover:text-[#4B8BBE] group-active:text-[#3776AB]",
    name: "Python",
  },
  {
    activeBg: "rgba(6, 182, 212, 0.08)",
    activeBorder: "rgba(6, 182, 212, 0.45)",
    activeShadow: "0 4px 20px -4px rgba(56, 189, 248, 0.35)",
    badgeHover:
      "hover:border-[#06B6D4]/45 dark:hover:border-[#38BDF8]/50 hover:bg-[#06B6D4]/5 dark:hover:bg-[#38BDF8]/10 hover:shadow-[0_4px_20px_-4px_rgba(56,189,248,0.3)] active:border-[#06B6D4]/60 active:bg-[#06B6D4]/10",
    brandColor: "#06B6D4",
    darkBrandColor: "#38BDF8",
    icon: "tailwindcss",
    iconColor:
      "group-hover:text-[#06B6D4] dark:group-hover:text-[#38BDF8] group-active:text-[#06B6D4] dark:group-active:text-[#38BDF8]",
    name: "Tailwind CSS",
  },
] as const;
