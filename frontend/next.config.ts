import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['lucide-react'],
  serverExternalPackages: ['@stacks/network', '@stacks/transactions', '@stacks/connect'],
};

export default nextConfig;
