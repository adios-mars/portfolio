import { AboutSection } from "@/components/about/section";
import { ContactSection } from "@/components/contact/section";
import { ProjectSection } from "@/components/project/section";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd } from "@/seo/json-ld";

const MainView = () => (
  <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: ROUTES.HOME }]} />
    <AboutSection />
    <ProjectSection />
    <ContactSection />
  </>
);

export default MainView;
