import { BriefcaseIcon } from "lucide-react";
import Image from "next/image";
import type React from "react";

import { cn } from "@/lib/utils";

interface FlipMockupProps {
  slug: string;
  title: string;
  image?: string;
  className?: string;
}

const getProjectImagePosition = (slug: string) => {
  if (slug === "katch") {
    return "object-top";
  }
  return "object-center";
};

export const ProjectFlipMockup: React.FC<FlipMockupProps> = ({
  slug,
  title,
  image,
  className,
}) => {
  const mockupHeightClass =
    "h-36 xs:h-40 sm:h-48 md:h-52 lg:h-56 xl:h-60 max-h-[30vh]";

  // If a custom image exists (e.g. Katch, Taxi Ale, Campus Attendance Bot)
  if (image) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl sm:rounded-2xl border border-border/70",
          slug === "taxi-ale" ? "bg-[#3896a8]" : "bg-muted/30",
          mockupHeightClass,
          className
        )}
      >
        <Image
          alt={title}
          className={cn(
            "object-cover transition-transform duration-500 group-hover/card:scale-105",
            getProjectImagePosition(slug)
          )}
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, 1100px"
          src={image}
        />
        {slug !== "taxi-ale" && (
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
        )}
      </div>
    );
  }

  // Addis Market Tracker mockup
  if (slug === "addis-market-tracker") {
    return (
      <div
        className={cn(
          "relative flex w-full flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl border border-border/80 bg-zinc-950/70 p-3 sm:p-4 text-xs font-mono text-zinc-300",
          mockupHeightClass,
          className
        )}
      >
        {/* Top telemetry bar */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-emerald-400 uppercase">
              Live Rates · Addis Ababa
            </span>
          </div>
          <span className="text-[10px] text-zinc-400">Telegram Mini App</span>
        </div>

        {/* Commodity price grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 my-auto">
          <div className="flex flex-col rounded-lg border border-zinc-800/70 bg-zinc-900/60 p-2">
            <div className="flex items-center justify-between">
              <span className="text-zinc-200 font-medium">
                White Teff (ማግኛ)
              </span>
              <span className="rounded bg-emerald-500/20 px-1 text-[9px] font-semibold text-emerald-300">
                Merkato
              </span>
            </div>
            <span className="mt-1 text-sm sm:text-base font-bold text-zinc-100 tabular-nums">
              11,200 ETB{" "}
              <span className="text-[10px] font-normal text-zinc-400">
                / Qtl
              </span>
            </span>
          </div>

          <div className="flex flex-col rounded-lg border border-zinc-800/70 bg-zinc-900/60 p-2">
            <div className="flex items-center justify-between">
              <span className="text-zinc-200 font-medium">Red Teff (ቀይ)</span>
              <span className="rounded bg-zinc-800 px-1 text-[9px] text-zinc-400">
                Shola
              </span>
            </div>
            <span className="mt-1 text-sm sm:text-base font-bold text-zinc-100 tabular-nums">
              9,400 ETB{" "}
              <span className="text-[10px] font-normal text-zinc-400">
                / Qtl
              </span>
            </span>
          </div>

          <div className="flex flex-col rounded-lg border border-zinc-800/70 bg-zinc-900/60 p-2">
            <div className="flex items-center justify-between">
              <span className="text-zinc-200 font-medium">Misir (ምስር)</span>
              <span className="rounded bg-emerald-500/20 px-1 text-[9px] font-semibold text-emerald-300">
                Atkilt Tera
              </span>
            </div>
            <span className="mt-1 text-sm sm:text-base font-bold text-zinc-100 tabular-nums">
              245 ETB{" "}
              <span className="text-[10px] font-normal text-zinc-400">
                / kg
              </span>
            </span>
          </div>

          <div className="flex flex-col rounded-lg border border-zinc-800/70 bg-zinc-900/60 p-2">
            <div className="flex items-center justify-between">
              <span className="text-zinc-200 font-medium">Wheat (ስንዴ)</span>
              <span className="rounded bg-zinc-800 px-1 text-[9px] text-zinc-400">
                Piassa
              </span>
            </div>
            <span className="mt-1 text-sm sm:text-base font-bold text-zinc-100 tabular-nums">
              6,800 ETB{" "}
              <span className="text-[10px] font-normal text-zinc-400">
                / Qtl
              </span>
            </span>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-[10px] text-zinc-400 border-t border-zinc-800/80 pt-1.5">
          <span>FastAPI + SQLite WAL</span>
          <span>4 Trading Hubs Verified</span>
        </div>
      </div>
    );
  }

  // Veda Voice Assistant mockup
  if (slug === "veda-voice-assistant") {
    return (
      <div
        className={cn(
          "relative flex w-full flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl border border-border/80 bg-zinc-950/70 p-3 sm:p-4 text-xs font-mono text-zinc-300",
          mockupHeightClass,
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-violet-400 uppercase">
              Veda Speech Pipeline
            </span>
          </div>
          <span className="rounded bg-violet-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-violet-300">
            Active Stream
          </span>
        </div>

        {/* Audio frequency bars */}
        <div className="my-auto flex items-center justify-center gap-1 sm:gap-1.5 py-2">
          {[
            20, 36, 52, 74, 92, 65, 42, 80, 96, 68, 45, 88, 35, 72, 98, 55, 38,
            64, 82, 91, 58, 44, 76, 89, 62, 38, 54, 30,
          ].map((val, idx) => (
            <div
              className="w-1.5 sm:w-2 rounded-full bg-gradient-to-t from-violet-600 via-indigo-500 to-cyan-400 transition-all duration-300"
              key={idx}
              style={{ height: `${Math.max(14, val * 0.45)}px` }}
            />
          ))}
        </div>

        {/* Telemetry chips */}
        <div className="grid grid-cols-3 gap-2 border-t border-zinc-800/80 pt-2 text-[10px]">
          <div className="rounded bg-zinc-900/80 px-2 py-1 text-center">
            <div className="text-zinc-400 text-[9px]">COMPRESSION</div>
            <div className="font-semibold text-zinc-200">32kbps MP3 (-85%)</div>
          </div>
          <div className="rounded bg-zinc-900/80 px-2 py-1 text-center">
            <div className="text-zinc-400 text-[9px]">STT LATENCY</div>
            <div className="font-semibold text-emerald-400">112ms Nova-2</div>
          </div>
          <div className="rounded bg-zinc-900/80 px-2 py-1 text-center">
            <div className="text-zinc-400 text-[9px]">FAILOVER</div>
            <div className="font-semibold text-zinc-200">Gemini 1.5 Flash</div>
          </div>
        </div>
      </div>
    );
  }

  // Taxi Ale mockup
  if (slug === "taxi-ale") {
    return (
      <div
        className={cn(
          "relative flex w-full flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl border border-border/80 bg-zinc-950/70 p-3 sm:p-4 text-xs font-mono text-zinc-300",
          mockupHeightClass,
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-amber-400 uppercase">
              Taxi Ale · Transit Radar
            </span>
          </div>
          <span className="text-[10px] text-zinc-400">OSRM Live Routing</span>
        </div>

        <div className="my-auto space-y-2">
          {/* Route path */}
          <div className="flex items-center justify-between rounded-lg bg-zinc-900/70 px-3 py-2 text-[11px]">
            <span className="font-medium text-zinc-200">Bole Airport</span>
            <span className="text-amber-400">➔</span>
            <span className="font-medium text-zinc-200">Meskel Sq</span>
            <span className="text-amber-400">➔</span>
            <span className="font-medium text-zinc-200">Piassa Hub</span>
          </div>

          {/* Vehicle status card */}
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-2">
              <span className="text-zinc-400">Active Minibus</span>
              <div className="text-xs font-bold text-zinc-100">
                Toyota HiAce #3-4920
              </div>
              <div className="text-[9px] text-zinc-400 mt-0.5">
                GPS: 9.0108° N, 38.7612° E
              </div>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-2">
              <span className="text-zinc-400">Seat Availability</span>
              <div className="text-xs font-bold text-amber-400">
                3 / 12 Seats Open
              </div>
              <div className="text-[9px] text-emerald-400 mt-0.5">
                ETA Next Hub: ~3 min
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-zinc-400 border-t border-zinc-800/80 pt-1.5">
          <span>Flutter · OpenStreetMap</span>
          <span>30+ Offline Addis Hubs</span>
        </div>
      </div>
    );
  }

  // Campus Attendance Bot mockup
  if (slug === "campus-attendance-bot") {
    return (
      <div
        className={cn(
          "relative flex w-full flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl border border-border/80 bg-zinc-950/70 p-3 sm:p-4 text-xs font-mono text-zinc-300",
          mockupHeightClass,
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-blue-400 uppercase">
              Dire Dawa Attendance Bot
            </span>
          </div>
          <span className="text-[10px] text-zinc-400">Aiogram 3</span>
        </div>

        <div className="my-auto space-y-2">
          <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/70 p-2.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-300">Course: SE-402 Systems Eng</span>
              <span className="text-blue-400 font-bold">60s PIN Active</span>
            </div>
            <div className="mt-2 flex items-center justify-center gap-2">
              {["7", "3", "9", "1"].map((digit, i) => (
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-blue-500/40 bg-blue-500/10 text-base font-bold text-blue-300 shadow-sm"
                  key={i}
                >
                  {digit}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] px-1">
            <span className="text-emerald-400 font-semibold">
              ✓ 48 / 52 Checked In (92%)
            </span>
            <span className="text-zinc-400">PDF Roster Generated</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-zinc-400 border-t border-zinc-800/80 pt-1.5">
          <span>Python · SQLite WAL</span>
          <span>ReportLab Export Ready</span>
        </div>
      </div>
    );
  }

  // Multi-User Chat System mockup (C / Berkeley Sockets)
  if (slug === "multi-user-chat-system") {
    return (
      <div
        className={cn(
          "relative flex w-full flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl border border-border/80 bg-zinc-950/80 p-3 sm:p-4 text-xs font-mono text-zinc-300",
          mockupHeightClass,
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-cyan-400 uppercase">
              POSIX Socket Server
            </span>
          </div>
          <span className="text-[10px] text-zinc-400">C99 · pthread</span>
        </div>

        <div className="my-auto space-y-1 text-[11px] font-mono leading-tight bg-zinc-900/50 rounded-lg p-2.5 border border-zinc-800/60">
          <div className="text-zinc-400">
            <span className="text-cyan-400">$</span> ./chat_server --port 8080
            --max 128
          </div>
          <div className="text-zinc-300">
            [SYS] Socket 0.0.0.0:8080 bound (non-blocking)
          </div>
          <div className="text-emerald-400">
            [CONN] Client #14 accepted (192.168.1.104)
          </div>
          <div className="text-zinc-400">
            [MUTEX] Room lock acquired · 0 collisions
          </div>
          <div className="text-amber-300">
            [CHUNK] Binary frame 64/64 (8192B) verified
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-zinc-400 border-t border-zinc-800/80 pt-1.5">
          <span>Raw Berkeley Sockets</span>
          <span>Zero Race Conditions</span>
        </div>
      </div>
    );
  }

  // Fallback generic card
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl border border-border/80 bg-muted/40 p-4",
        mockupHeightClass,
        className
      )}
    >
      <div className="text-center space-y-1">
        <BriefcaseIcon className="mx-auto size-8 text-muted-foreground/60" />
        <p className="text-xs font-mono text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};
