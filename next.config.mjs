import { createContent } from "fuma-content/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "interfaces-flood-appliance-nylon.trycloudflare.com",
  ],
  images: {
    remotePatterns: [
      {
        hostname: "ik.imagekit.io",
        protocol: "https",
      },
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
    ],
  },
  redirects() {
    return [
      {
        destination: "/uses",
        permanent: true,
        source: "/stack",
      },
    ];
  },
};

const withContent = await createContent();

export default withContent(nextConfig);
