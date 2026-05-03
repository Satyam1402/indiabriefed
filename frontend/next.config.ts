import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'https',
        hostname: '**.ndtvimg.com',
      },
      {
        protocol: 'https',
        hostname: '**.thehindu.com',
      },
      {
        protocol: 'https',
        hostname: '**.indianexpress.com',
      },
      {
        protocol: 'https',
        hostname: '**.timesofindiaindiatimes.com',
      },
    ],
  },
};

export default nextConfig;
