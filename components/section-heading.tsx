import type { ReactNode } from "react";

import { CopyLink } from "@/components/copy-link";
import { RevealItem } from "@/components/scroll-reveal";
import { Title } from "@/components/ui/title";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  as?: "h1" | "h2";
  className?: string;
  copyLinkTitle?: string;
  description?: string;
  eyebrow: string;
  rightSlot?: ReactNode;
  title: string;
}

/**
 * Editorial section header pairing a tracked monochrome eyebrow with a large
 * Courgette display title and optional contextual summary.
 */
export const SectionHeading = ({
  as = "h2",
  className,
  copyLinkTitle,
  description,
  eyebrow,
  rightSlot,
  title,
}: SectionHeadingProps) => {
  const headingNode = as === "h1" ? <h1>{title}</h1> : <h2>{title}</h2>;

  return (
    <RevealItem
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className
      )}
      yOffset={16}
    >
      <div className="space-y-4 sm:space-y-5">
        <span className="block font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground/85">
          {eyebrow}
        </span>

        <div className="group/heading flex items-center gap-3">
          <Title
            className="font-courgette not-italic font-normal text-6xl sm:text-8xl md:text-9xl lg:text-[110px] xl:text-[128px] leading-[1.02] tracking-tight text-foreground py-1"
            render={headingNode}
          />
          {copyLinkTitle ? (
            <CopyLink
              className="hidden group-hover/heading:inline-flex size-7 sm:size-8"
              title={copyLinkTitle}
            />
          ) : null}
        </div>

        {description ? (
          <p className="max-w-3xl border-l-2 border-border/80 pl-5 sm:pl-6 text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
    </RevealItem>
  );
};
