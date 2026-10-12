import type { MetadataRoute } from "next";

import { ROUTES } from "@/constants/routes";
import { SITE, META_THEME_COLORS } from "@/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: META_THEME_COLORS.light,
    description: SITE.DESCRIPTION.LONG,
    display: "standalone",

    name: SITE.NAME,
    short_name: SITE.NAME,
    start_url: ROUTES.HOME,
    theme_color: META_THEME_COLORS.light,
  };
}
