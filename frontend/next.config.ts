import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@stacks/connect', '@stacks/network', '@stacks/transactions'],
  serverExternalPackages: ['pino', 'pino-pretty'],
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding', 'pino');
    return config;
  },
};

export default nextConfig;
