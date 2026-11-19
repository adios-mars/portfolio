import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

import "@/styles/globals.css";

import { Analytics } from "@/components/analytics";
import { TooltipProvider } from "@/components/ui/tooltip";
import { META_THEME_COLORS } from "@/constants/site";
import { env } from "@/env";
import { HapticsProvider } from "@/providers/haptics-provider";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { SoundProvider } from "@/providers/sound-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { JsonLdScripts } from "@/seo/json-ld";
import { baseMetadata } from "@/seo/metadata";

const geist = Geist({
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  subsets: ["latin"],
  variable: "--font-geist",
});

const geist_mono = Geist_Mono({
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500"],
});

const instrument_serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
});

const courgette = localFont({
  src: "./fonts/courgette.ttf",
  variable: "--font-courgette-font",
  weight: "400",
});

const digital7 = localFont({
  src: "./fonts/digital-7-mono.ttf",
  variable: "--font-digital-7",
  weight: "400",
});

export const viewport: Viewport = {
  initialScale: 1,
  themeColor: META_THEME_COLORS.light,
  viewportFit: "cover",
  width: "device-width",
};

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLdScripts />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
      </head>
      <body
        className={`overscroll-none font-sans flex flex-col min-h-screen ${geist.variable} ${geist_mono.variable} ${instrument_serif.variable} ${courgette.variable} ${digital7.variable}`}
      >
        <ThemeProvider>
          <Analytics projectId={env.NEXT_PUBLIC_CLARITY_PROJECT_ID} />
          <TooltipProvider>
            <SoundProvider>
              <HapticsProvider>
                <SmoothScrollProvider>{children}</SmoothScrollProvider>
              </HapticsProvider>
            </SoundProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
