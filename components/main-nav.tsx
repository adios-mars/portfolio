"use client";

import { useLenis } from "lenis/react";
import { ArrowUpRightIcon, MenuIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ROUTES } from "@/constants/routes";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/types/nav";

const NAV_ITEMS: {
  domId: string;
  href: string;
  id: SectionId;
  label: string;
}[] = [
  { domId: "skills", href: "/#skills", id: "skills", label: "Skills" },
  {
    domId: "experience",
    href: "/#experience",
    id: "experience",
    label: "Experience",
  },
  { domId: "projects", href: "/#projects", id: "projects", label: "Projects" },
  { domId: "contact", href: "/#contact", id: "contact", label: "Contact" },
];

type LenisInstance = ReturnType<typeof useLenis>;

const scrollToTop = (lenis: LenisInstance) => {
  if (lenis) {
    lenis.start();
    lenis.scrollTo(0);
    return;
  }
  window.scrollTo({ behavior: "smooth", top: 0 });
};

const scrollToSection = (lenis: LenisInstance, domId: string) => {
  const el = document.querySelector<HTMLElement>(`#${domId}`);
  if (!el) {
    return false;
  }
  if (lenis) {
    lenis.start();
    lenis.scrollTo(el);
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return true;
};

const HomeBrandLink = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const lenis = useLenis();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    window.dispatchEvent(new Event("close-mobile-nav"));
    if (pathname === ROUTES.HOME) {
      e.preventDefault();
      scrollToTop(lenis);
      if (window.location.hash) {
        window.history.replaceState(null, "", ROUTES.HOME);
      }
    }
  };

  return (
    <Link
      href={ROUTES.HOME}
      onClick={handleClick}
      aria-label="Home"
      title="Home"
      className={className}
    >
      {children}
    </Link>
  );
};

const useActiveNavSection = () => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  useEffect(() => {
    if (pathname !== ROUTES.HOME) {
      if (pathname.startsWith(ROUTES.PROJECTS)) {
        setActiveSection("projects");
      } else if (pathname.startsWith(ROUTES.EXPERIENCES)) {
        setActiveSection("experience");
      } else if (pathname.startsWith(ROUTES.CONTACT)) {
        setActiveSection("contact");
      } else {
        setActiveSection("home");
      }
      return;
    }

    const handleScroll = () => {
      const { scrollY, innerHeight: windowHeight } = window;
      const { scrollHeight: docHeight } = document.documentElement;

      if (scrollY + windowHeight >= docHeight - 60) {
        const contactEl =
          document.querySelector("#contact") ??
          document.querySelector("#socials");
        if (contactEl && contactEl.getBoundingClientRect().top < windowHeight) {
          setActiveSection("contact");
          return;
        }
      }

      let current: SectionId = "home";
      for (const item of NAV_ITEMS) {
        const el = document.querySelector(`#${item.domId}`);
        if (el && el.getBoundingClientRect().top <= windowHeight * 0.4) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return { activeSection, pathname, setActiveSection };
};

const useSectionNavigation = () => {
  const lenis = useLenis();
  const { activeSection, setActiveSection, pathname } = useActiveNavSection();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof NAV_ITEMS)[number]
  ) => {
    if (pathname === ROUTES.HOME && scrollToSection(lenis, item.domId)) {
      e.preventDefault();
      setActiveSection(item.id);
    }
  };

  return { activeSection, handleLinkClick, lenis, pathname };
};

const MainNav = () => {
  const { activeSection, handleLinkClick } = useSectionNavigation();

  return (
    <div className="hidden sm:flex items-center">
      <nav className="flex items-center">
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <NavigationMenuItem key={item.id}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item)}
                    className={cn(
                      "font-courgette rounded-full px-3.5 py-1.5 text-lg transition-colors",
                      isActive
                        ? "text-foreground bg-accent/70"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                    )}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
};

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { activeSection, handleLinkClick, lenis, pathname } =
    useSectionNavigation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useLockBodyScroll(open);

  // Close menu on route change, escape key, or brand click
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!(lenis && open)) {
      return;
    }
    lenis.stop();
    return () => {
      lenis.start();
    };
  }, [lenis, open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onCloseMenu = () => setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("close-mobile-nav", onCloseMenu);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("close-mobile-nav", onCloseMenu);
    };
  }, []);

  const onItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof NAV_ITEMS)[number]
  ) => {
    setOpen(false);
    handleLinkClick(e, item);
  };

  const navOverlay = (
    <AnimatePresence>
      {open && (
        <>
          {/* Solid backdrop completely masking the page behind */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-[72px] z-[90] bg-background/95 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Full-bleed Mobile Nav Drawer with Grand Display Typography */}
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[72px] h-[calc(100dvh-72px)] z-[100] flex flex-col bg-background px-6 pt-8 pb-12 shadow-2xl border-t border-border/40 overflow-y-auto"
          >
            <div className="flex flex-col space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground/75 px-3">
                Menu
              </span>

              <ul className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        onClick={(e) => onItemClick(e, item)}
                        className={cn(
                          "group flex items-center justify-between rounded-2xl px-4 py-4 transition-all duration-200",
                          isActive
                            ? "bg-foreground/10 text-foreground shadow-xs"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-sm font-bold tracking-widest text-muted-foreground/60 tabular-nums">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "font-courgette text-4xl xs:text-5xl transition-transform duration-200 group-hover:translate-x-1.5",
                              isActive
                                ? "text-foreground font-bold"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {item.label}
                          </span>
                        </div>

                        {isActive ? (
                          <span className="size-3 rounded-full bg-foreground shadow-[0_0_10px_rgba(var(--foreground),0.9)]" />
                        ) : (
                          <ArrowUpRightIcon className="size-6 text-muted-foreground/40 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="sm:hidden flex items-center">
      <button
        type="button"
        className="relative z-50 flex size-11 items-center justify-center rounded-full border border-border/80 bg-background/80 hover:bg-accent text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer touch-manipulation select-none active:scale-95"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
      >
        {open ? <XIcon className="size-5.5" /> : <MenuIcon className="size-5.5" />}
      </button>

      {mounted ? createPortal(navOverlay, document.body) : null}
    </div>
  );
};

export { HomeBrandLink, MainNav, MobileNav };
