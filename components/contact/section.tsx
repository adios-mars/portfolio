import { ContactItem } from "@/components/contact/item";
import { SectionHeading } from "@/components/section-heading";
import { prefetchGlimpses } from "@/components/ui/glimpse/server";
import { Section } from "@/components/ui/section";
import { resolveContacts } from "@/lib/contacts";
import { cn } from "@/lib/utils";

interface ContactSectionProps {
  className?: string;
  showHeader?: boolean;
}

/** Renders resolved social profile tiles with prefetched hover link previews. */
const ContactSection = async ({
  className,
  showHeader = true,
}: ContactSectionProps) => {
  const contacts = resolveContacts();
  const contactUrls = contacts
    .map((contact) => contact.link?.url)
    .filter(Boolean);
  const previews = await prefetchGlimpses(contactUrls);

  return (
    <Section
      className={cn(
        "animate-none grid grid-cols-1 justify-start gap-4 p-0 scroll-mt-24",
        className
      )}
      id="socials"
    >
      {showHeader ? (
        <SectionHeading
          copyLinkTitle="Socials"
          eyebrow="04 — Networks"
          title="Socials"
        />
      ) : null}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {contacts.map((contact) => (
          <ContactItem
            {...contact}
            key={contact.title}
            preview={previews[contact.link?.url]}
          />
        ))}
      </div>
    </Section>
  );
};

export { ContactSection };
