/**
 * Generates deterministic placeholder cover art with no dependencies.
 *
 * Real covers should be replaced with publisher art you have the right to use,
 * exported at 1200×630 or larger, named after the game and the subject
 * (e.g. "diablo-4-necromancer-build-guide.png"). See SEO.md §7.
 *
 * Run: npm run images
 */
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

function crc32(buf) {
  let crc = 0xffffffff;
  for (const byte of buf) {
    crc ^= byte;
    for (let k = 0; k < 8; k++) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([length, body, crc]);
}

function encodePng(width, height, pixel) {
  const raw = Buffer.alloc(height * (1 + width * 3));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    raw[offset++] = 0; // filter type: none
    for (let x = 0; x < width; x++) {
      const [r, g, b] = pixel(x, y);
      raw[offset++] = r;
      raw[offset++] = g;
      raw[offset++] = b;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour
  ihdr[10] = 0; // deflate
  ihdr[11] = 0; // adaptive filtering
  ihdr[12] = 0; // no interlace

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const lerp = (a, b, t) => Math.round(a + (b - a) * t);

function coverPixel(width, height) {
  const from = [79, 70, 229]; // indigo
  const to = [12, 15, 30]; // near-black navy

  return (x, y) => {
    const t = (x / width) * 0.75 + (y / height) * 0.25;
    let r = lerp(from[0], to[0], t);
    let g = lerp(from[1], to[1], t);
    let b = lerp(from[2], to[2], t);

    // Faint diagonal banding so the placeholder reads as artwork, not a bug.
    const band = (x + y * 1.6) % 96;
    if (band < 2) {
      r = Math.min(255, r + 14);
      g = Math.min(255, g + 14);
      b = Math.min(255, b + 14);
    }

    // Vignette.
    const cx = x / width - 0.5;
    const cy = y / height - 0.5;
    const v = Math.min(1, (cx * cx + cy * cy) * 2.1);
    r = lerp(r, 8, v * 0.55);
    g = lerp(g, 9, v * 0.55);
    b = lerp(b, 18, v * 0.55);

    return [r, g, b];
  };
}

const targets = [
  {
    path: "public/games/azeroth-survivors/azeroth-survivors-cover-art.png",
    width: 640,
    height: 360,
  },
];

for (const target of targets) {
  const out = resolve(process.cwd(), target.path);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(
    out,
    encodePng(target.width, target.height, coverPixel(target.width, target.height)),
  );
  console.log(`wrote ${target.path} (${target.width}×${target.height})`);
}
