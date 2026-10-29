import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const directory = path.resolve('public/images');
const output = path.join(directory, 'optimized');
await mkdir(output, { recursive: true });
const files = (await readdir(directory)).filter(file => /\.(jpg|png|webp)$/.test(file));
// Prefer the WebP master when an original PNG with the same basename exists.
const sources = new Map();
for (const file of files) {
  const name = file.replace(/\.[^.]+$/, '');
  if (!sources.has(name) || file.endsWith('.webp')) sources.set(name, file);
}
for (const [name, file] of sources) {
  await Promise.all([320, 640, 960, 1600].map(width =>
    sharp(path.join(directory, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(output, `${name}-${width}.webp`))
  ));
}
console.log(`Optimized ${sources.size} photographs in 4 responsive sizes.`);
