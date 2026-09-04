import type { NextConfig } from 'next';

const repoName = 'renato-lima-website';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? `/${repoName}` : '',
  images: { unoptimized: true },
};

export default nextConfig;
