import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@stacks/network', '@stacks/transactions', '@stacks/connect'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
