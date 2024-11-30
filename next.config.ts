import type { NextConfig } from 'next';
import pkg from './package.json';

const nextConfig: NextConfig = {
  env: {
    VERSION: pkg.version,
    FIXED_CHAIN_ID: process.env.FIXED_CHAIN,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.repot.dev',
      },
    ],
  },
};

export default nextConfig;
