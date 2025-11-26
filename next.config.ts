import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dcdn-us.mitiendanube.com',
        port: '',
      }, {
        protocol: 'https',
        hostname: 'images.tcdn.com.br',
        port: '',
      },
    ],
    minimumCacheTTL: 86400
  },
  /* config options here */
  reactStrictMode: true,
  env: {
    SECRET_JWT: process.env.SECRET_JWT
  },
  /*async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/api/proxy/:path*",
      },
    ]
  },*/
};

export default nextConfig;
