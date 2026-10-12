import { MailIcon } from "lucide-react";
import { Suspense } from "react";

import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/about/github-contributions";
import { IntroSection } from "@/components/about/intro-section";
import { AppLink } from "@/components/ui/app-link";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { LINK } from "@/constants/links";
import { getGitHubContributions } from "@/lib/github/contributions";

const AboutSection = () => {
  const contributions = getGitHubContributions();

  return (
    <IntroSection>
      <div className="prose text-muted-foreground prose-p:my-2 dark:prose-invert max-w-full text-sm leading-6 font-normal">
        <p>
          Software engineer building practical systems, mobile applications, and
          modern web platforms.
        </p>
        <p>
          Passionate about open-source engineering; from concurrent networking
          in C and real-time transit tracking with Flutter to full-stack web
          applications with React and TypeScript.
        </p>
      </div>
      <Callout className="space-y-1 p-1">
        <Suspense fallback={<GitHubContributionsFallback />}>
          <GitHubContributions contributions={contributions} />
        </Suspense>
        <div className="flex flex-col gap-3 p-2">
          <p>
            Interested in working together? Check out my{" "}
            <AppLink
              href={LINK.GITHUB}
              target="_blank"
              className="text-muted-foreground text-sm font-medium inline-flex min-w-17.25"
              external
              eventName="external_link_click"
              eventProperties={{ location: "work_together" }}
            >
              GitHub
            </AppLink>
          </p>
          <div className="flex flex-row items-center gap-2">
            <Button
              nativeButton={false}
              render={
                <AppLink
                  href={`mailto:${LINK.EMAIL}`}
                  target="_blank"
                  eventName="send_email_click"
                />
              }
            >
              <MailIcon />
              Send an email
            </Button>
          </div>
        </div>
      </Callout>
    </IntroSection>
  );
};

export { AboutSection };
