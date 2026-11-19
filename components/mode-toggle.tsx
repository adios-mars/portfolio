"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useThemeToggle } from "@/hooks/use-theme-toggle";
import { trackThemeToggle } from "@/lib/events";

export const ModeToggle = () => {
  const { theme, toggleTheme } = useThemeToggle();

  const handleToggle = () => {
    toggleTheme();
    trackThemeToggle(theme === "dark" ? "light" : "dark");
  };

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="outline"
            size="icon-lg"
            className="size-10 rounded-full border-border/70 bg-background/60 hover:bg-accent"
            onClick={handleToggle}
          />
        }
      >
        <Icons.theme className="size-5" />
      </TooltipTrigger>
      <TooltipContent>
        Toggle Mode
        <Kbd>D</Kbd>
      </TooltipContent>
    </Tooltip>
  );
};
