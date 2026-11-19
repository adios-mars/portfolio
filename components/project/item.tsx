"use client";

import { ArrowUpRightIcon, GlobeIcon } from "lucide-react";
import Link from "next/link";
import type React from "react";

import { Icons } from "@/components/icons";
import { MediaPreview } from "@/components/media-preview";
import { AppLink } from "@/components/ui/app-link";
import { Button } from "@/components/ui/button";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { Title } from "@/components/ui/title";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTES } from "@/constants/routes";
import { trackExternalLinkClick, trackProjectDetailClick } from "@/lib/events";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/projects";

interface ProjectLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isGrid: boolean;
  preview?: GlimpseData | null;
  listClassName?: string;
}

const ProjectLink = ({
  href,
  label,
  icon,
  isGrid,
  preview,
  listClassName,
  slug,
  title,
}: ProjectLinkProps & { slug: string; title: string }) => {
  const handleClick = () => {
    trackExternalLinkClick({
      context: "project_item",
      link_type: label.toLowerCase(),
      slug,
      title,
      url: href,
    });
  };

  if (isGrid) {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              className="text-muted-foreground hover:text-foreground"
              nativeButton={false}
              render={
                <a
                  aria-label={label}
                  href={href}
                  onClick={handleClick}
                  rel="noreferrer"
                  target="_blank"
                />
              }
              size="icon-sm"
              variant="ghost"
            />
          }
        >
          {icon}
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <AppLink
      className={cn("text-muted-foreground text-xs font-medium", listClassName)}
      eventName="external_link_click"
      eventProperties={{
        context: "project_item",
        link_type: label.toLowerCase(),
        slug,
        title,
        url: href,
      }}
      external
      href={href}
      preview={preview}
      previewSide="bottom"
      target="_blank"
    >
      {label}
    </AppLink>
  );
};

const resolvePreview = (
  url: string | undefined,
  previews: Record<string, GlimpseData> | undefined,
  fallbackImage: string,
  title: string,
  description: string
): GlimpseData | undefined => {
  if (!url) {
    return undefined;
  }
  const preview = previews?.[url];
  if (preview?.image) {
    return preview;
  }
  if (fallbackImage) {
    return {
      description,
      image: fallbackImage,
      title,
    };
  }
  return undefined;
};

interface ProjectItemProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    Pick<
      Project,
      "slug" | "title" | "description" | "links" | "image" | "category" | "date"
    > {
  index?: number;
  showHeader?: boolean;
  variant?: string;
  previews?: Record<string, GlimpseData>;
}

/** Displays a numbered monochrome project showcase card with links and previews. */
const ProjectItem = ({
  slug,
  title,
  category,
  date,
  links,
  description,
  image: projectImage,
  index = 0,
  showHeader = true,
  className,
  variant = "list",
  previews,
  ...attr
}: ProjectItemProps) => {
  const isGrid = variant === "grid";
  const image = projectImage ?? previews?.[links?.website ?? ""]?.image ?? "";
  const formattedIndex = String(index + 1).padStart(2, "0");

  const handleDetailClick = () =>
    trackProjectDetailClick(slug, title, showHeader ? "home" : "listing");

  const titleLink = (
    <Link
      className="hover:underline underline-offset-4"
      href={`${ROUTES.PROJECTS}/${slug}`}
      onClick={handleDetailClick}
    >
      {title}
    </Link>
  );

  const websitePreview = resolvePreview(
    links.website,
    previews,
    image,
    title,
    description
  );
  const githubPreview = resolvePreview(
    links.github,
    previews,
    image,
    title,
    description
  );

  return (
    <div
      className={cn(
        "group/card flex h-full w-full flex-col justify-between gap-4 rounded-2xl border border-border/80 bg-card/50 p-5 sm:p-6 transition-all duration-200 hover:border-foreground/30 hover:bg-card",
        className
      )}
      {...attr}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-semibold tracking-widest text-muted-foreground tabular-nums">
              {formattedIndex}
            </span>
            <span className="font-mono inline-flex items-center rounded-full border border-border/80 bg-muted/40 px-2.5 py-0.5 text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
              {`${category} · ${date.year}`}
            </span>
          </div>

          <div className="flex shrink-0 flex-row items-center justify-end gap-3">
            {links.website && (
              <ProjectLink
                href={links.website}
                icon={<GlobeIcon />}
                isGrid={isGrid}
                label="Website"
                preview={websitePreview}
                slug={slug}
                title={title}
              />
            )}
            {links.github && (
              <ProjectLink
                href={links.github}
                icon={<Icons.github />}
                isGrid={isGrid}
                label="GitHub"
                preview={githubPreview}
                slug={slug}
                title={title}
              />
            )}
          </div>
        </div>

        {isGrid && image ? (
          <MediaPreview
            className="aspect-1200/630 grayscale transition-[filter] duration-300 group-hover/card:grayscale-0"
            src={image}
            title={title}
          />
        ) : null}

        <div
          className={cn(
            "flex flex-col gap-4",
            !isGrid &&
              projectImage &&
              "sm:flex-row sm:items-center sm:justify-between"
          )}
        >
          <div className="space-y-1.5">
            <Title
              className="font-sans text-lg sm:text-xl font-bold tracking-tight text-foreground"
              render={showHeader ? <h3>{titleLink}</h3> : <h2>{titleLink}</h2>}
            />
            <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed font-normal">
              {description}
            </p>
          </div>

          {!isGrid && projectImage ? (
            <MediaPreview
              className="aspect-1200/630 shrink-0 grayscale transition-[filter] duration-300 group-hover/card:grayscale-0 sm:w-44"
              src={projectImage}
              title={title}
            />
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 pt-3">
        <Link
          className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-widest uppercase text-muted-foreground transition-colors hover:text-foreground"
          href={`${ROUTES.PROJECTS}/${slug}`}
          onClick={handleDetailClick}
        >
          <span>Case study</span>
          <ArrowUpRightIcon
            aria-hidden="true"
            className="size-3.5 transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
          />
        </Link>
      </div>
    </div>
  );
};

export { ProjectItem, type ProjectItemProps };
