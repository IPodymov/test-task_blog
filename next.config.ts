import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      { hostname: 'picsum.photos' },
      { hostname: 'i.pravatar.cc' },
      { hostname: 'images.unsplash.com' }
    ]
  }
};

export default nextConfig;
