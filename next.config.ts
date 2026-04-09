import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: 'picsum.photos' },
      { hostname: 'i.pravatar.cc' },
      { hostname: 'images.unsplash.com' }
    ]
  }
};

export default nextConfig;
