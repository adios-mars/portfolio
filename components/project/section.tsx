import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { Section } from "@/components/ui/section";
import { ViewAllButton } from "@/components/view-all-button";
import { HOME_FEATURED_PROJECT_COUNT } from "@/constants/projects";
import { ROUTES } from "@/constants/routes";
import { collectProjectUrls, getProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";

import { ProjectsView } from "./view";

const ProjectSection = async () => {
  const allProjects = getProjects();
  const previews = await prefetchGlimpses(collectProjectUrls(allProjects));

  return (
    <Section
      className={cn("animate-none flex flex-col gap-8 py-10 sm:py-12")}
      id="projects"
    >
      <ProjectsView
        projects={allProjects}
        previews={previews}
        featuredOnly
        limit={HOME_FEATURED_PROJECT_COUNT}
      />
      <div className="flex items-center justify-center">
        <ViewAllButton href={ROUTES.PROJECTS} eventName="projects" />
      </div>
    </Section>
  );
};

export { ProjectSection };
