import { cn } from "@/lib/utils";

const Section = ({ className, ...attr }: React.ComponentProps<"section">) => (
  <section
    className={cn("animate-slide-in scroll-mt-20 px-4 py-6", className)}
    {...attr}
  >
    {attr?.children}
  </section>
);

export { Section };
