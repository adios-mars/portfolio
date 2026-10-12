import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd, testimonialsBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

const DESCRIPTION = "Kind words from people I have worked with.";

export const metadata = createMetadata({
  canonical: ROUTES.TESTIMONIALS,
  description: DESCRIPTION,
  title: "Testimonials",
});

const TESTIMONIALS = [
  {
    author: "Colleague",
    role: "Engineering Manager",
    text: "Ruth has a rare combination of design sensibility and engineering rigor. She doesn't just build interfaces — she crafts experiences. Every detail matters to her, from animation timing to accessibility.",
  },
  {
    author: "Collaborator",
    role: "Product Designer",
    text: "Working with Ruth is like having a design partner who can also ship code. She understands the intent behind design decisions and elevates them with technical execution I couldn't achieve alone.",
  },
  {
    author: "Teammate",
    role: "Senior Engineer",
    text: "Ruth's code is clean, well-structured, and a pleasure to review. She writes with clarity and thinks about the developer experience of anyone who will maintain her work later.",
  },
] as const;

const TestimonialsPage = () => (
  <>
    <BreadcrumbJsonLd items={testimonialsBreadcrumbs()} />
    <header className="animate-slide-in space-y-2 px-4 py-6">
      <Title className="text-xl font-medium italic">{"testimonials."}</Title>
      <p className="text-muted-foreground text-sm">{DESCRIPTION}</p>
    </header>
    <Section className="delay-100 flex flex-col gap-6 py-2">
      {TESTIMONIALS.map((testimonial, index) => (
        <blockquote
          key={index}
          className="flex flex-col gap-3 rounded-lg border p-4"
        >
          <p className="text-muted-foreground text-sm leading-relaxed">
            &ldquo;{testimonial.text}&rdquo;
          </p>
          <footer className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{testimonial.author}</span>
            <span aria-hidden className="text-muted-foreground">
              ·
            </span>
            <span className="text-muted-foreground">{testimonial.role}</span>
          </footer>
        </blockquote>
      ))}
    </Section>
  </>
);

export default TestimonialsPage;
