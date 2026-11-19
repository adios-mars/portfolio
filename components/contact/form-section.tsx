import { DirectEmailCard } from "@/components/contact/email-card";
import { ContactForm } from "@/components/contact/form";
import { ContactSection } from "@/components/contact/section";
import { RevealItem } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

interface ContactFormSectionProps {
  className?: string;
  headingAs?: "h1" | "h2";
}

/**
 * Unified editorial contact block combining direct email copy, social tiles,
 * and the message form.
 */
export const ContactFormSection = ({
  className,
  headingAs = "h2",
}: ContactFormSectionProps) => (
  <Section
    className={cn("animate-none flex flex-col gap-8 py-10 sm:py-12", className)}
    id="contact"
  >
    <SectionHeading
      as={headingAs}
      copyLinkTitle={headingAs === "h2" ? "Contact" : undefined}
      description="Open to software engineering roles, systems development, and product collaborations. Send a message or reach out directly."
      eyebrow="04 — Connection"
      title="Contact"
    />

    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
      <RevealItem className="flex flex-col gap-3 lg:col-span-5" delay={0.05}>
        <DirectEmailCard />
        <ContactSection showHeader={false} />
      </RevealItem>

      <RevealItem className="lg:col-span-7" delay={0.12}>
        <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 md:p-10 shadow-sm">
          <ContactForm />
        </div>
      </RevealItem>
    </div>
  </Section>
);
