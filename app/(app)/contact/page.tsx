import { ContactFormSection } from "@/components/contact/form-section";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { BreadcrumbJsonLd, contactBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  canonical: ROUTES.CONTACT,
  description: `Get in touch with ${SITE.AUTHOR.NAME}.`,
  title: "Contact",
});

const ContactPage = () => (
  <>
    <BreadcrumbJsonLd items={contactBreadcrumbs()} />
    <ContactFormSection className="pt-6" headingAs="h1" />
  </>
);

export default ContactPage;
