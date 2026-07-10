// Optimaliserer originalbilder til web-vennlige versjoner.
//
// Leser:  public/bilder/Originalbilder/*  (tunge originaler, ikke i Git)
// Skriver: public/bilder/produkter/*.jpg  (nedskalert + komprimert, i Git)
//
// Kjør:   npm run bilder
//
// Originalene beholdes lokalt som arkiv (se .gitignore). Kjør skriptet på nytt
// når du legger til nye originalbilder – eksisterende web-bilder overskrives.

import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';

const SRC = 'public/bilder/Originalbilder';
const OUT = 'public/bilder/produkter';
const MAX_SIDE = 1600; // px – lengste side; nok til skarpe produktbilder
const QUALITY = 80;    // JPEG-kvalitet (mozjpeg)

// Gjør «Skål6b.jpg» -> «skal6b», «2 etasjers serveringsfat» -> «2-etasjers-serveringsfat»
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f));
await mkdir(OUT, { recursive: true });

let totalOut = 0;

for (const file of files) {
  const base = file.slice(0, -extname(file).length);
  const outName = `${slugify(base)}.jpg`;
  const src = join(SRC, file);
  const dst = join(OUT, outName);

  const info = await sharp(src)
    .rotate()
    .resize(MAX_SIDE, MAX_SIDE, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(dst);

  totalOut += info.size;
  console.log(`${file}  ->  ${outName}  (${(info.size / 1024).toFixed(0)} kB)`);
}

console.log(`\nFerdig: ${files.length} bilder -> ${OUT}`);
console.log(`Samlet størrelse på web-bilder: ${(totalOut / 1024 / 1024).toFixed(1)} MB`);
