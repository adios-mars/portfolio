import { ExperiencesView } from "@/components/experience/view";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants/routes";
import { getExperiences } from "@/lib/experiences";
import { BreadcrumbJsonLd, experiencesBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

const DESCRIPTION = "Where I have worked and what I shipped.";

export const metadata = createMetadata({
  canonical: ROUTES.EXPERIENCES,
  description: DESCRIPTION,
  title: "Experience",
});

const ExperiencesPage = () => {
  const experiences = getExperiences();

  return (
    <>
      <BreadcrumbJsonLd items={experiencesBreadcrumbs()} />
      <header className="px-4 pt-6 pb-4">
        <SectionHeading
          as="h1"
          description={DESCRIPTION}
          eyebrow="02 — Chronology"
          title="Experience"
        />
      </header>
      <Section className="animate-none flex flex-col py-4">
        <ExperiencesView showHeader={false} experiences={experiences} />
      </Section>
    </>
  );
};

export default ExperiencesPage;
