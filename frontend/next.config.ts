import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['lucide-react', '@stacks/connect', '@stacks/network', '@stacks/transactions'],
};

export default nextConfig;
