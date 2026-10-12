import { ImageResponse } from "next/og";

import { SITE } from "@/constants/site";

const getGeistRegular = async (request: Request) => {
  const res = await fetch(new URL("/fonts/Geist-Regular.ttf", request.url));
  return res.arrayBuffer();
};

const getGeistBold = async (request: Request) => {
  const res = await fetch(new URL("/fonts/Geist-Bold.ttf", request.url));
  return res.arrayBuffer();
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? SITE.NAME;
  const description = searchParams.get("description") ?? SITE.DESCRIPTION.SHORT;
  const category = searchParams.get("category") ?? undefined;

  try {
    const [geistRegular, geistBold] = await Promise.all([
      getGeistRegular(request),
      getGeistBold(request),
    ]);

    return new ImageResponse(
      <div
        tw="flex flex-col h-full w-full bg-white p-[60px] relative overflow-hidden"
        style={{ fontFamily: "Geist" }}
      >
        {/* Top row: author name + optional pill */}
        <div tw="flex items-center justify-between w-full">
          <span tw="text-[28px] font-bold tracking-[-1px] text-neutral-900">
            {SITE.AUTHOR.NAME}
          </span>

          {category && (
            <div tw="flex items-center justify-center rounded-full bg-black/5 px-8 py-3">
              <span tw="text-[28px] font-medium tracking-[-0.3px] text-neutral-500">
                {category}
              </span>
            </div>
          )}
        </div>

        {/* Title + description at bottom */}
        <div tw="flex flex-1 flex-col justify-end">
          <span tw="text-[56px] font-bold tracking-[-2px] leading-[1.05] text-neutral-950 mb-4">
            {title}
          </span>
          <span tw="text-[28px] tracking-[-0.3px] leading-[1.4] text-neutral-500">
            {description}
          </span>
        </div>
      </div>,
      {
        fonts: [
          {
            data: geistRegular,
            name: "Geist",
            style: "normal",
            weight: 400,
          },
          {
            data: geistBold,
            name: "Geist",
            style: "normal",
            weight: 700,
          },
        ],
        height: 630,
        width: 1200,
      }
    );
  } catch (error) {
    console.error("Failed to generate OG image:", error);
    return Response.json(
      { error: "Failed to generate OG image" },
      { status: 500 }
    );
  }
};
