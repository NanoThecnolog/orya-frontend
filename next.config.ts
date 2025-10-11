import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dcdn-us.mitiendanube.com',
        port: '',
      },
    ],
    minimumCacheTTL: 86400
  },
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
