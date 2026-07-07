import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: [],
  images: {
    remotePatterns: [
      // Cloudflare R2 public URL (set NEXT_PUBLIC_R2_PUBLIC_URL in env)
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
      // Custom R2 domain pattern — covers any subdomain
      {
        protocol: "https",
        hostname: "**.cloudflarestorage.com",
      },
      // Luma cover images (scraped events)
      {
        protocol: "https",
        hostname: "images.lumacdn.com",
      },
      // Luma host/organizer avatars (scraped events)
      {
        protocol: "https",
        hostname: "cdn.lu.ma",
      },
      // GDG event cover images (scraped events)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default withPayload(nextConfig);
