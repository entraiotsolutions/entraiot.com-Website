import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone" removed — not needed for Vercel deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  compress: true,
  poweredByHeader: false,
  turbopack: {},
  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "entraiot.com",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;