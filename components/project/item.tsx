"use client";

import { GlobeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

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
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground"
              nativeButton={false}
              render={
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  onClick={handleClick}
                />
              }
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
      className={cn(
        "text-muted-foreground min-w-[60px] text-xs font-normal",
        listClassName
      )}
      href={href}
      target="_blank"
      external
      previewSide="bottom"
      preview={preview}
      eventName="external_link_click"
      eventProperties={{
        context: "project_item",
        link_type: label.toLowerCase(),
        slug,
        title,
        url: href,
      }}
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
    Pick<Project, "slug" | "title" | "description" | "links" | "image"> {
  showHeader?: boolean;
  variant?: string;
  previews?: Record<string, GlimpseData>;
}

const ProjectItem = ({
  slug,
  title,
  links,
  description,
  image: projectImage,
  showHeader = true,
  className,
  variant = "list",
  previews,
  ...attr
}: ProjectItemProps) => {
  const isGrid = variant === "grid";
  const image = projectImage ?? previews?.[links?.website ?? ""]?.image ?? "";

  const titleLink = (
    <Link
      href={`${ROUTES.PROJECTS}/${slug}`}
      className="hover:underline underline-offset-4"
      onClick={() =>
        trackProjectDetailClick(slug, title, showHeader ? "home" : "listing")
      }
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
        "py-4 w-full space-y-1 transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30",
        className
      )}
      {...attr}
    >
      {isGrid && image && (
        <MediaPreview
          src={image}
          title={title}
          className="mb-2 aspect-1200/630"
        />
      )}
      <div className="flex items-center justify-between gap-4">
        <Title
          className="font-sans text-base font-normal"
          render={showHeader ? <h3>{titleLink}</h3> : <h2>{titleLink}</h2>}
        />
        <div className="flex shrink-0 flex-row items-center justify-start gap-1.5">
          {links.website && (
            <ProjectLink
              href={links.website}
              label="Website"
              icon={<GlobeIcon />}
              isGrid={isGrid}
              preview={websitePreview}
              listClassName="min-w-[66px]"
              slug={slug}
              title={title}
            />
          )}
          {links.github && (
            <ProjectLink
              href={links.github}
              label="GitHub"
              icon={<Icons.github />}
              isGrid={isGrid}
              preview={githubPreview}
              slug={slug}
              title={title}
            />
          )}
        </div>
      </div>

      <p className="text-muted-foreground text-sm font-normal">{description}</p>
    </div>
  );
};

export { ProjectItem, type ProjectItemProps };
