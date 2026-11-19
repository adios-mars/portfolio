import { ProjectsView } from "@/components/project/view";
import { SectionHeading } from "@/components/section-heading";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants/routes";
import { collectProjectUrls, getProjects } from "@/lib/projects";
import { BreadcrumbJsonLd, projectsBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

const DESCRIPTION = "Tools, APIs, and products I have built or maintain.";

export const metadata = createMetadata({
  canonical: ROUTES.PROJECTS,
  description: DESCRIPTION,
  title: "Projects",
});

const ProjectsPage = async () => {
  const projects = getProjects();
  const previews = await prefetchGlimpses(collectProjectUrls(projects));

  return (
    <>
      <BreadcrumbJsonLd items={projectsBreadcrumbs()} />
      <header className="px-4 pt-6 pb-4">
        <SectionHeading
          as="h1"
          description={DESCRIPTION}
          eyebrow="03 — Selected Work"
          title="Projects"
        />
      </header>
      <Section className="animate-none flex flex-col gap-6 py-4">
        <ProjectsView
          showHeader={false}
          showToolbar={true}
          sourceControl="tabs"
          projects={projects}
          previews={previews}
        />
      </Section>
    </>
  );
};

export default ProjectsPage;
