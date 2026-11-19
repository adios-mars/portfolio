import Image from "next/image";

import { HomeBrandLink, MainNav, MobileNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SITE } from "@/constants/site";

const SiteHeader = () => (
  <header className="font-sans sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-colors">
    <div className="mx-auto w-full max-w-6xl lg:max-w-7xl flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-4">
      <HomeBrandLink className="group flex items-center gap-3.5 transition-opacity hover:opacity-80">
        <Image
          src={SITE.AUTHOR.AVATAR}
          alt={`Portrait of ${SITE.AUTHOR.NAME}`}
          width={48}
          height={48}
          className="size-11 sm:size-12 rounded-full object-cover border border-border/80 ring-1 ring-border/20 shrink-0"
          priority
        />
        <span className="font-bold text-xl sm:text-2xl tracking-tight text-foreground whitespace-nowrap">
          Ruth
        </span>
      </HomeBrandLink>

      <div className="flex items-center gap-2 sm:gap-2.5">
        <MainNav />
        <div className="hidden sm:block h-5 w-px bg-border/80 mx-1" />
        <ModeToggle />
        <MobileNav />
      </div>
    </div>
  </header>
);

export { SiteHeader };
