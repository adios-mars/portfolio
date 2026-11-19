"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { markGreetingSeen } from "@/lib/intro-session";
import { cn } from "@/lib/utils";

interface BackToProjectsButtonProps {
  className?: string;
  label?: string;
}

const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  markGreetingSeen();
  if (typeof window !== "undefined" && window.history.length > 1) {
    e.preventDefault();
    window.history.back();
  }
};

export const BackToProjectsButton = ({
  className,
  label = "Back to Projects",
}: BackToProjectsButtonProps) => {
  useEffect(() => {
    markGreetingSeen();
  }, []);

  return (
    <Link
      href="/#projects"
      onClick={handleBackClick}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/40 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-wider uppercase text-muted-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-muted hover:text-foreground",
        className
      )}
    >
      <ArrowLeftIcon className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
      <span>{label}</span>
    </Link>
  );
};
