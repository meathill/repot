import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import pkg from './package.json';

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  env: {
    VERSION: pkg.version,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.roudan.io',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
