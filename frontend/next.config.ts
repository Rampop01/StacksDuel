import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@stacks/network', '@stacks/transactions', '@stacks/connect'],
};

export default nextConfig;
