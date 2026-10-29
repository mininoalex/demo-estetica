import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // All image variants are generated locally at build time, without a paid service.
  images: {
    loader: 'custom',
    loaderFile: './src/lib/static-image-loader.ts',
  },
};

export default nextConfig;
