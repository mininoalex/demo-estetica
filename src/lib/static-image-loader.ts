'use client';

import type { ImageLoaderProps } from 'next/image';

const widths = [320, 640, 960, 1600];

export default function staticImageLoader({ src, width }: ImageLoaderProps) {
  // Original JPEGs are retained so locally stored demo treatments keep working.
  if (!/^\/images\/[a-z0-9-]+\.(jpg|png|webp)$/.test(src)) return src;
  const target = widths.find(candidate => candidate >= width) ?? 1600;
  const name = src.split('/').at(-1)!.replace(/\.[^.]+$/, '');
  return `/images/optimized/${name}-${target}.webp`;
}
