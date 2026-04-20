import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@stacks/connect', '@stacks/network', '@stacks/transactions'],
  serverExternalPackages: [],
};

export default nextConfig;
