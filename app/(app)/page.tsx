import { AboutSection } from "@/components/about/section";
import { ContactFormSection } from "@/components/contact/form-section";
import { ExperienceSection } from "@/components/experience/section";
import { ProjectSection } from "@/components/project/section";
import { SkillsSection } from "@/components/skills/section";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd } from "@/seo/json-ld";

const MainView = () => (
  <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: ROUTES.HOME }]} />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <ProjectSection />
    <ContactFormSection />
  </>
);

export default MainView;
