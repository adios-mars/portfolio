import { AppLink } from "@/components/ui/app-link";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import type { ResolvedContact } from "@/lib/contacts";
import { cn } from "@/lib/utils";

interface ContactItemProps
  extends ResolvedContact, Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  preview?: GlimpseData | null;
}

/** Displays a monochrome social profile card linking externally with hover previews. */
const ContactItem = ({
  title,
  icon,
  link,
  preview,
  className,
  ...attr
}: ContactItemProps) => (
  <div
    className={cn(
      "flex items-center justify-between gap-3 rounded-xl border border-border/80 bg-card/50 px-4 py-3 transition-colors duration-200 hover:border-foreground/30 hover:bg-card",
      className
    )}
    {...attr}
  >
    <div className="flex min-w-0 items-center gap-3">
      <span className="shrink-0 text-foreground grayscale">
        {icon({ className: "size-4" })}
      </span>
      <div className="min-w-0">
        {title ? (
          <span className="block font-mono text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
            {title}
          </span>
        ) : null}
        {link?.url ? (
          <AppLink
            className="text-foreground text-sm font-medium"
            eventName="contact_link_click"
            eventProperties={{ platform: title, url: link.url }}
            external
            href={link.url}
            preview={preview}
            target="_blank"
          >
            {link.display}
          </AppLink>
        ) : (
          <span className="text-muted-foreground text-sm font-normal">
            {"link not found"}
          </span>
        )}
      </div>
    </div>
  </div>
);

export { ContactItem };
