import { env } from "./env.ts";

env.parse(process.env);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      { hostname: "*.theaffordableorganicstore.com" },
      { hostname: "i0.wp.com" },
      { hostname: "cdn.shopify.com" },
    ],
  },
};

export default nextConfig;
