"use client";

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { AppLink } from "@/components/ui/app-link";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { Title } from "@/components/ui/title";
import { TechStack } from "@/components/uses/tech-stack";
import { ROUTES } from "@/constants/routes";
import { trackExperienceDetailClick } from "@/lib/events";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types/experiences";

interface ExperienceItemProps
  extends Experience, Omit<React.ComponentProps<"div">, "title"> {
  showHeader?: boolean;
  preview?: GlimpseData | null;
  isActive?: boolean;
  isPassed?: boolean;
  nodeRef?: (node: HTMLElement | null) => void;
  onSelectMilestone?: () => void;
}

const ExperienceNodeAnchor = ({
  nodeRef,
  isActive,
  isPassed,
  onSelectMilestone,
}: {
  nodeRef?: (node: HTMLElement | null) => void;
  isActive: boolean;
  isPassed: boolean;
  onSelectMilestone?: () => void;
}) => (
  <button
    type="button"
    ref={nodeRef as (el: HTMLButtonElement | null) => void}
    onClick={onSelectMilestone}
    onPointerEnter={onSelectMilestone}
    onTouchStart={onSelectMilestone}
    aria-label="Milestone bullet point"
    className={cn(
      "absolute top-8 sm:top-10 -left-8 sm:-left-12 flex size-5 sm:size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300 z-10 cursor-pointer hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      isActive &&
        "border-foreground bg-background scale-110",
      isPassed &&
        !isActive &&
        "border-foreground/50 bg-background hover:border-foreground",
      !isActive &&
        !isPassed &&
        "border-border/70 bg-background/90 hover:border-foreground/60"
    )}
  >
    <div
      className={cn(
        "rounded-full transition-all duration-300",
        isActive && "opacity-0",
        isPassed && !isActive && "size-2 bg-foreground/60 opacity-100",
        !isActive && !isPassed && "size-2 bg-muted-foreground/30 opacity-100"
      )}
    />
  </button>
);

const ExperienceOrgLink = ({
  org,
  slug,
  preview,
}: {
  org: Experience["experienceOrg"];
  slug: string;
  preview?: GlimpseData | null;
}) => {
  if (typeof org.link === "string") {
    return (
      <AppLink
        className="text-sm font-normal"
        eventName="external_link_click"
        eventProperties={{
          context: "experience_item",
          link_type: "website",
          slug,
          title: org.name,
          url: org.link,
        }}
        external
        href={org.link}
        preview={preview}
        target="_blank"
      >
        {org.websiteDisplayName}
      </AppLink>
    );
  }
  return <span className="text-sm font-normal">{org.websiteDisplayName}</span>;
};

/** Displays a single timeline experience card with role metadata, results, and stack. */
const ExperienceItem = ({
  slug,
  experienceTitle,
  experienceDescription,
  experienceOrg,
  experienceStatus,
  experienceTech,
  category: _category,
  orgDescription: _orgDescription,
  experienceLinks: _experienceLinks,
  showHeader = true,
  preview,
  isActive = false,
  isPassed = false,
  nodeRef,
  onSelectMilestone,
  className,
  ...attr
}: ExperienceItemProps) => {
  const titleLink = (
    <Link
      href={`${ROUTES.EXPERIENCES}/${slug}`}
      className="inline-flex items-center gap-1.5 hover:underline underline-offset-4"
      onClick={() =>
        trackExperienceDetailClick(
          slug,
          `${experienceTitle}, ${experienceOrg.name}`,
          showHeader ? "home" : "listing"
        )
      }
    >
      <span>{experienceTitle}</span>
      <ArrowUpRightIcon
        aria-hidden="true"
        className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:text-foreground"
      />
    </Link>
  );

  return (
    <div
      className={cn(
        "group/card relative w-full rounded-2xl sm:rounded-3xl border transition-all duration-300 p-6 sm:p-8 md:p-9",
        isActive
          ? "border-foreground/45 bg-card shadow-sm ring-1 ring-foreground/15"
          : "border-border/80 bg-card/50 hover:border-foreground/30 hover:bg-card",
        className
      )}
      onPointerEnter={onSelectMilestone}
      {...attr}
    >
      <ExperienceNodeAnchor
        isActive={isActive}
        isPassed={isPassed}
        nodeRef={nodeRef}
        onSelectMilestone={onSelectMilestone}
      />

      <div className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1.5">
            <Title
              className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
              render={showHeader ? <h3>{titleLink}</h3> : <h2>{titleLink}</h2>}
            />
            <div className="flex items-center justify-start gap-2 text-base sm:text-lg text-muted-foreground">
              <span className="font-medium text-foreground/85">
                {experienceOrg?.name}
              </span>
              <span aria-hidden="true">·</span>
              <ExperienceOrgLink
                org={experienceOrg}
                preview={preview}
                slug={slug}
              />
            </div>
          </div>

          <time
            className={cn(
              "font-mono inline-flex shrink-0 items-center rounded-full border px-4 py-1.5 text-xs sm:text-sm font-bold tracking-widest uppercase tabular-nums transition-colors duration-300",
              isActive
                ? "border-foreground/40 bg-foreground/10 text-foreground"
                : "border-border/80 bg-muted/40 text-muted-foreground"
            )}
          >
            {experienceStatus?.startAt === experienceStatus?.endAt
              ? experienceStatus?.startAt
              : `${experienceStatus?.startAt} - ${experienceStatus?.endAt}`}
          </time>
        </div>

        {experienceDescription?.length ? (
          <ul className="flex flex-col items-start justify-start gap-2.5 pl-5">
            {experienceDescription.map((descriptionItem, index) => (
              <li
                key={index}
                className="text-muted-foreground list-outside list-disc text-base sm:text-lg leading-relaxed font-normal"
              >
                {descriptionItem}
              </li>
            ))}
          </ul>
        ) : null}

        {experienceTech?.length ? <TechStack items={experienceTech} /> : null}
      </div>
    </div>
  );
};

export { ExperienceItem, type ExperienceItemProps };
