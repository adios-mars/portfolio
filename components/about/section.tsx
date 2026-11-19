import { IntroSection } from "@/components/about/intro-section";

const AboutSection = () => (
  <IntroSection>
    <div className="flex flex-col gap-5 sm:gap-6 pt-3 sm:pt-4">
      {/* Monumental Hero Display Title */}
      <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-[105px] xl:text-[120px] font-bold tracking-tight leading-[1.04] text-foreground py-1">
        Building{" "}
        <span className="font-courgette not-italic font-normal text-foreground/90">
          reliable
        </span>
        <br className="hidden sm:block" /> systems, mobile &amp; web apps.
      </h1>

      {/* Editorial Overview Paragraph */}
      <p className="max-w-3xl text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
        Systems-minded engineer turning ideas into clean, real-world software
        across{" "}
        <span className="text-foreground font-semibold">
          C, Flutter, React, Next.js &amp; TypeScript
        </span>
        . Ready to learn fast and ship high-impact digital products.
      </p>
    </div>
  </IntroSection>
);

export { AboutSection };
