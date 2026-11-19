import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentTOC } from "@/components/content-toc";
import { BackToExperienceButton } from "@/components/experience/back-button";
import { TrackedExperienceLinks } from "@/components/experience/tracked-links";
import { MdxBody } from "@/components/mdx-body";
import { Badge } from "@/components/ui/badge";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { getExperienceMdxEntry } from "@/lib/content/experiences";
import { tocFromMdast } from "@/lib/content/toc";
import { getExperienceBySlug, getExperienceSlugs } from "@/lib/experiences";
import { BreadcrumbJsonLd, experiencesBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

interface ExperiencePageProps {
  params: Promise<{ slug: string }>;
}

const getExperienceHeading = (experience: {
  experienceTitle: string;
  experienceOrg: { name: string };
}) => `${experience.experienceTitle}, ${experience.experienceOrg.name}`;

export const generateStaticParams = () =>
  getExperienceSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: ExperiencePageProps): Promise<Metadata> => {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    return { title: "Experience not found" };
  }

  return createMetadata({
    canonical: `${ROUTES.EXPERIENCES}/${experience.slug}`,
    category: "Experience",
    description: experience.orgDescription,
    title: getExperienceHeading(experience),
  });
};

const ExperiencePage = async ({ params }: ExperiencePageProps) => {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);
  const mdxEntry = getExperienceMdxEntry(slug);

  if (!experience || !mdxEntry) {
    notFound();
  }

  const { default: Content, _mdast } = mdxEntry.compiled;
  const tocItems = tocFromMdast(_mdast);
  const heading = getExperienceHeading(experience);

  return (
    <>
      <BreadcrumbJsonLd
        items={experiencesBreadcrumbs({
          name: heading,
          path: `${ROUTES.EXPERIENCES}/${experience.slug}`,
        })}
      />

      <ContentTOC items={tocItems} />

      <article className="space-y-5 px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-4">
          <BackToExperienceButton />
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline" className="text-muted-foreground">
              {experience.category}
            </Badge>
            <span aria-hidden>·</span>
            <time className="font-mono text-xs font-medium tracking-widest uppercase text-muted-foreground tabular-nums">
              {experience.experienceStatus.startAt ===
              experience.experienceStatus.endAt
                ? experience.experienceStatus.startAt
                : `${experience.experienceStatus.startAt} - ${experience.experienceStatus.endAt}`}
            </time>
          </div>
        </div>

        <header className="animate-slide-in space-y-2 pt-1">
          <Title className="font-sans">{heading}</Title>
          <p className="text-muted-foreground text-sm">
            {experience.orgDescription}
          </p>
        </header>

        <TrackedExperienceLinks
          slug={experience.slug}
          title={heading}
          links={experience.experienceLinks}
        />

        <MdxBody className="delay-200 mt-10" Content={Content} />

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
          <BackToExperienceButton />
          <a
            href="#about"
            className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </article>
    </>
  );
};

export default ExperiencePage;
