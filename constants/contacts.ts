import { LINK } from "@/constants/links";
import type { Contact } from "@/types/contacts";

export const CONTACTS = [
  {
    icon: "github",
    link: {
      display: "@adios-mars",
      url: LINK.GITHUB,
    },
    title: "GitHub",
  },
  {
    icon: "linkedin",
    link: {
      display: "@ruth-yeneneh",
      url: LINK.LINKEDIN,
    },
    title: "LinkedIn",
  },
  {
    icon: "x",
    link: {
      display: "@adios_mars",
      url: LINK.TWITTER,
    },
    title: "Twitter",
  },
  {
    icon: "discord",
    link: {
      display: "@adios-mars",
      url: LINK.DISCORD,
    },
    title: "Discord",
  },
] as const satisfies readonly Contact[];
