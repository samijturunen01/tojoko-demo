/**
 * Builds every image the site uses from source-assets/ (run: npm run images).
 *
 *  - Illustrative Pexels photos (free licence, see docs/ASSET_PROVENANCE.md) → WebP + JPEG
 *    in several widths. Tojoko Oy has no published company photos yet; every one of these
 *    is labelled "Kuvituskuva" on the site.
 *  - Favicons from the conceptual TOJOKO socket mark
 *  - Open Graph share image (1200 × 630)
 *
 * Output manifest (sizes for width/height attributes): src/data/photos.generated.json
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const SRC = 'source-assets/stock'
const OUT = 'public/images'
const wordmark = JSON.parse(await fs.readFile('src/components/brand/wordmark.json', 'utf8'))

/** name → Pexels source, output widths */
const photos = {
  tyokaluseina: { file: 'p14637833.jpg', widths: [640, 1024, 1600, 2400] },
  diagnoosi: { file: 'p4116193.jpg', widths: [640, 1024, 1600] },
  akkutesti: { file: 'p13065692.jpg', widths: [640, 1024, 1600] },
  oljy: { file: 'p13065690.jpg', widths: [640, 1024, 1600] },
  mittatikku: { file: 'p6870297.jpg', widths: [640, 1024, 1600] },
  alusta: { file: 'p4116173.jpg', widths: [640, 1024, 1600] },
  moottoritila: { file: 'p10490621.jpg', widths: [640, 1024, 1600] },
  tyokalu: { file: 'p4116172.jpg', widths: [640, 1024, 1600] },
}

await fs.mkdir(OUT, { recursive: true })

const manifest = {}
for (const [name, cfg] of Object.entries(photos)) {
  const src = path.join(SRC, cfg.file)
  const meta = await sharp(src).metadata()
  const ratio = meta.height / meta.width
  const widths = cfg.widths.filter((w) => w <= meta.width)
  for (const w of widths) {
    const img = sharp(src).rotate().resize({ width: w, withoutEnlargement: true })
    await img.clone().webp({ quality: 78, effort: 5 }).toFile(path.join(OUT, `${name}-${w}.webp`))
    await img.clone().jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(path.join(OUT, `${name}-${w}.jpg`))
  }
  manifest[name] = { width: widths.at(-1), height: Math.round(widths.at(-1) * ratio), widths }
}
await fs.writeFile('src/data/photos.generated.json', JSON.stringify(manifest, null, 2) + '\n')

/* ---------- Icons: the socket "O" on signal yellow ---------- */
const socket = wordmark.letters[1].d
const iconSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="26" fill="#ffc933"/>
  <g transform="translate(-83 9)"><path d="${socket}" fill="#0f3b3f" fill-rule="evenodd"/></g>
</svg>`
await sharp(Buffer.from(iconSvg(32))).resize(32, 32).png().toFile('public/favicon-32.png')
await sharp(Buffer.from(iconSvg(180))).resize(180, 180).png().toFile('public/apple-touch-icon.png')
await sharp(Buffer.from(iconSvg(192))).resize(192, 192).png().toFile('public/icon-192.png')
await fs.writeFile('public/favicon.svg', iconSvg(32))

/* ---------- Open Graph image 1200 × 630 ---------- */
const letters = wordmark.letters
  .map((l) => `<path d="${l.d}" fill="${l.ok ? '#ffc933' : '#f4f1e9'}" fill-rule="evenodd"/>`)
  .join('')
const holes = []
for (let y = 12; y < 630; y += 24) for (let x = 12; x < 640; x += 24) holes.push(`<circle cx="${x}" cy="${y}" r="2.6" fill="#061a1c" opacity=".55"/>`)
const photo = await sharp(path.join(SRC, 'p14637833.jpg')).resize(560, 630, { fit: 'cover', position: 'centre' }).toBuffer()
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0f3b3f"/>
  ${holes.join('')}
  <g transform="translate(60 150) scale(0.88)">${letters}</g>
  <text x="62" y="320" font-family="Courier New, monospace" font-size="21" letter-spacing="3" fill="#b5cbc9">AUTOKORJAAMO · JOENSUU</text>
  <text x="60" y="420" font-family="Arial, sans-serif" font-weight="700" font-size="46" fill="#f4f1e9">Huolto, korjaus ja</text>
  <text x="60" y="476" font-family="Arial, sans-serif" font-weight="700" font-size="46" fill="#f4f1e9">hankalatkin viat.</text>
  <text x="60" y="560" font-family="Arial, sans-serif" font-size="24" fill="#ffc933">040 169 5277 · ma–pe 8–17</text>
  <text x="60" y="600" font-family="Arial, sans-serif" font-size="16" fill="#8fb0ad">Konseptidemo – Hades Design</text>
</svg>`
await sharp(Buffer.from(ogSvg))
  .composite([{ input: photo, left: 640, top: 0 }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(OUT, 'og-tojoko.jpg'))

console.log(`Processed ${Object.keys(photos).length} photos, icons and OG image.`)
