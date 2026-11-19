"use client";

import { ArrowUpRightIcon, GlobeIcon } from "lucide-react";
import Link from "next/link";

import { Icons } from "@/components/icons";
import { RevealItem } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { ROUTES } from "@/constants/routes";
import { trackExternalLinkClick, trackProjectDetailClick } from "@/lib/events";
import { saveReturnTarget } from "@/lib/intro-session";
import { filterProjectsBySource } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/projects";

import { ProjectFlipMockup } from "./flip-mockup";
import { PROJECT_TECH_STACKS, ProjectsFlipScroll } from "./flip-scroll";
import { ProjectItem } from "./item";
import { ProjectsViewProvider, useProjectsView } from "./view-context";
import type { ProjectSourceControl } from "./view-toolbar";
import { ProjectsViewToolbar } from "./view-toolbar";

const FeaturedProjectCard = ({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) => {
  const techStack = PROJECT_TECH_STACKS[project.slug] ?? [];

  const handleDetailClick = () => {
    saveReturnTarget("projects");
    trackProjectDetailClick(project.slug, project.title, "home");
  };

  const handleExternalClick = (label: string, url: string) => () => {
    trackExternalLinkClick({
      context: "featured_project_card",
      link_type: label.toLowerCase(),
      slug: project.slug,
      title: project.title,
      url,
    });
  };

  return (
    <div className="group/card relative flex w-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-4 sm:p-6 shadow-md transition-all duration-300 hover:border-foreground/30">
      <div className="space-y-3.5">
        {/* Top Header: Index + Category on left, External links on right */}
        <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2.5">
          <div className="flex shrink-0 items-center gap-2">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-muted-foreground tabular-nums">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <span className="font-mono inline-flex items-center rounded-full border border-border/80 bg-muted/50 px-2 py-0.5 text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
              {project.category}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {project.links.website && (
              <Button
                aria-label="Visit Website"
                className="size-7.5 rounded-full text-muted-foreground hover:text-foreground"
                nativeButton={false}
                render={
                  <a
                    aria-label="Visit Website"
                    href={project.links.website}
                    onClick={handleExternalClick(
                      "website",
                      project.links.website
                    )}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <GlobeIcon className="size-3.5" />
                  </a>
                }
                size="icon-xs"
                variant="ghost"
              />
            )}
            {project.links.github && (
              <Button
                aria-label="View GitHub Repository"
                className="size-7.5 rounded-full text-muted-foreground hover:text-foreground"
                nativeButton={false}
                render={
                  <a
                    aria-label="View GitHub Repository"
                    href={project.links.github}
                    onClick={handleExternalClick(
                      "github",
                      project.links.github
                    )}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icons.github className="size-3.5" />
                  </a>
                }
                size="icon-xs"
                variant="ghost"
              />
            )}
          </div>
        </div>

        {/* Bespoke Visual Mockup - Sized boldly and beautifully */}
        <div className="my-1 w-full">
          <ProjectFlipMockup
            image={project.image}
            slug={project.slug}
            title={project.title}
          />
        </div>

        {/* Title and Description */}
        <div className="space-y-1.5 pt-1">
          <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            <Link
              className="hover:underline underline-offset-4"
              href={`${ROUTES.PROJECTS}/${project.slug}`}
              onClick={handleDetailClick}
            >
              {project.title}
            </Link>
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Footer: Tech stack and Case Study Link (100% inside the card) */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5 border-t border-border/60 pt-3">
        {techStack.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {techStack.map((tech) => (
              <span
                className="font-mono rounded-full border border-border/80 bg-muted/40 px-2.5 py-0.5 text-[11px] text-muted-foreground"
                key={tech}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <Link
          className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-muted/40 px-3 py-1 font-mono text-xs font-semibold tracking-wider uppercase text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-muted hover:text-foreground shrink-0 ml-auto"
          href={`${ROUTES.PROJECTS}/${project.slug}`}
          onClick={handleDetailClick}
        >
          <span>Case study</span>
          <ArrowUpRightIcon className="size-3.5 transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
};

interface ProjectsViewListProps {
  projects: readonly Project[];
  previews: Record<string, GlimpseData>;
  showHeader?: boolean;
  viewClassName?: string;
  featuredOnly?: boolean;
  limit?: number;
}

const ProjectsViewList = ({
  projects,
  previews,
  showHeader = true,
  viewClassName,
  featuredOnly = false,
  limit,
}: ProjectsViewListProps) => {
  const { source, variant } = useProjectsView();
  let filteredProjects = filterProjectsBySource(projects, source);

  if (featuredOnly) {
    filteredProjects = filteredProjects.filter((project) => project.featured);
  }

  if (limit !== undefined) {
    filteredProjects = filteredProjects.slice(0, limit);
  }

  if (featuredOnly) {
    return (
      <>
        {/* Mobile View: Large, full-width Solomon-style showcase cards (no tiny card, no black void, no trapped scroll) */}
        <div className="flex sm:hidden flex-col gap-6 w-full">
          {filteredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.slug}
              project={project}
              index={index}
              total={filteredProjects.length}
            />
          ))}
        </div>

        {/* Desktop View: Interactive 3D Card Stage */}
        <div className="hidden sm:block w-full">
          <ProjectsFlipScroll
            className={viewClassName}
            previews={previews}
            projects={filteredProjects}
          />
        </div>
      </>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1",
        variant === "grid" && "gap-5 md:grid-cols-2",
        variant === "list" && "gap-4 sm:gap-5",
        viewClassName
      )}
    >
      {filteredProjects.map((project, index) => (
        <RevealItem
          className="h-full"
          delay={Math.min(index * 0.06, 0.24)}
          key={project.slug}
        >
          <ProjectItem
            category={project.category}
            date={project.date}
            description={project.description}
            image={project.image}
            index={index}
            links={project.links}
            previews={previews}
            showHeader={showHeader}
            slug={project.slug}
            title={project.title}
            variant={variant}
          />
        </RevealItem>
      ))}
    </div>
  );
};

interface ProjectsViewHeaderProps {
  headerClassName?: string;
  sourceControl?: ProjectSourceControl;
  showToolbar?: boolean;
}

const ProjectsViewHeader = ({
  headerClassName,
  sourceControl = "combobox",
  showToolbar = false,
}: ProjectsViewHeaderProps) => (
  <SectionHeading
    className={headerClassName}
    copyLinkTitle="Projects"
    description="Real-time mobile apps, C network systems, automation bots, and web platforms."
    eyebrow="03 — Selected Work"
    rightSlot={
      showToolbar ? (
        <ProjectsViewToolbar
          className="w-auto shrink-0 justify-end gap-2"
          sourceControl={sourceControl}
        />
      ) : undefined
    }
    title="Projects"
  />
);

interface ProjectsViewProps {
  projects: readonly Project[];
  previews: Record<string, GlimpseData>;
  showHeader?: boolean;
  showToolbar?: boolean;
  sourceControl?: ProjectSourceControl;
  headerClassName?: string;
  toolbarClassName?: string;
  viewClassName?: string;
  featuredOnly?: boolean;
  limit?: number;
}

/**
 * Renders filterable project showcase cards paired with an editorial Courgette
 * header.
 */
const ProjectsView = ({
  projects,
  previews,
  showHeader = true,
  showToolbar = false,
  headerClassName,
  toolbarClassName,
  viewClassName,
  sourceControl = "combobox",
  featuredOnly,
  limit,
}: ProjectsViewProps) => (
  <ProjectsViewProvider>
    {showHeader && (
      <ProjectsViewHeader
        headerClassName={headerClassName}
        showToolbar={showToolbar}
        sourceControl={sourceControl}
      />
    )}
    {showToolbar && (
      <ProjectsViewToolbar
        className={toolbarClassName}
        sourceControl={sourceControl}
      />
    )}
    <ProjectsViewList
      featuredOnly={featuredOnly}
      limit={limit}
      previews={previews}
      projects={projects}
      showHeader={showHeader}
      viewClassName={viewClassName}
    />
  </ProjectsViewProvider>
);

export {
  ProjectsView,
  ProjectsViewHeader,
  ProjectsViewList,
  ProjectsViewProvider,
  ProjectsViewToolbar,
};

export { useProjectsView } from "./view-context";
