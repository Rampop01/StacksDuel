import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@stacks/connect', '@stacks/network', '@stacks/transactions', 'stacksduel-sdk'],
  serverExternalPackages: ['pino', 'pino-pretty'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding', 'pino');
    return config;
  },
};

export default nextConfig;
