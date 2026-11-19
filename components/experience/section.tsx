import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { Section } from "@/components/ui/section";
import { ViewAllButton } from "@/components/view-all-button";
import { ROUTES } from "@/constants/routes";
import { getExperiences, getHomepageExperiences } from "@/lib/experiences";

import { ExperiencesView } from "./view";

const ExperienceSection = async () => {
  const allExperiences = getExperiences();
  const displayed = getHomepageExperiences();
  const orgLinks = displayed
    .map((exp) => exp.experienceOrg.link)
    .filter(Boolean);
  const previews = await prefetchGlimpses(orgLinks);

  return (
    <Section
      className="animate-none flex flex-col gap-8 py-10 sm:py-12"
      id="experience"
    >
      <ExperiencesView experiences={displayed} previews={previews} />
      {allExperiences.length > displayed.length ? (
        <div className="flex items-center justify-center">
          <ViewAllButton href={ROUTES.EXPERIENCES} eventName="experience" />
        </div>
      ) : null}
    </Section>
  );
};

export { ExperienceSection };
