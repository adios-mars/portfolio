"use client";

import { CheckIcon, CopyIcon, MailIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { LINK } from "@/constants/links";

/** Monochrome direct-email card with one-click clipboard copy feedback. */
export const DirectEmailCard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(LINK.EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex items-center justify-between gap-2.5 sm:gap-4 rounded-2xl border border-border/80 bg-card/50 p-3.5 sm:p-6 transition-colors duration-200 hover:border-foreground/30 hover:bg-card">
      <a
        className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-4"
        href={`mailto:${LINK.EMAIL}`}
      >
        <span className="flex size-9 sm:size-12 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-background text-foreground">
          <MailIcon aria-hidden="true" className="size-4 sm:size-5" />
        </span>
        <span className="min-w-0 space-y-0.5 sm:space-y-1">
          <span className="block font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-muted-foreground">
            Direct Email
          </span>
          <span className="block truncate font-sans text-xs min-[360px]:text-sm sm:text-base md:text-lg font-semibold tracking-tight sm:tracking-normal text-foreground">
            {LINK.EMAIL}
          </span>
        </span>
      </a>

      <Button
        aria-label={copied ? "Email address copied" : "Copy email address"}
        className="shrink-0 font-mono text-xs uppercase tracking-wider px-2.5 sm:px-4 py-1.5 sm:py-2 gap-1.5"
        onClick={handleCopy}
        size="sm"
        title={copied ? "Copied" : "Copy email address"}
        type="button"
        variant="outline"
      >
        {copied ? (
          <>
            <CheckIcon className="size-3.5 sm:size-4 text-emerald-500" />
            <span className="hidden sm:inline text-xs">Copied</span>
          </>
        ) : (
          <>
            <CopyIcon className="size-3.5 sm:size-4" />
            <span className="hidden sm:inline text-xs">Copy</span>
          </>
        )}
      </Button>
    </div>
  );
};
