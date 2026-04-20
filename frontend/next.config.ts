import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@stacks/connect', '@stacks/network', '@stacks/transactions', 'lucide-react'],
  serverExternalPackages: ['@stacks/network', '@stacks/transactions', '@stacks/connect'],
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
};

export default nextConfig;
