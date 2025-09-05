import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },  
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
    dangerouslyAllowSVG: true
  },
};

export default nextConfig;
