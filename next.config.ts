import type { NextConfig } from 'next';

// Fonte única do base path: usado pelo Next e exposto para assetPath() (src/lib/assets.ts)
const basePath = '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: { unoptimized: true },
};

export default nextConfig;
