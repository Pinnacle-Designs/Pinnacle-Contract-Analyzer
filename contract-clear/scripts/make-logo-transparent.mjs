import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, "../public/logo-original.png");
const output = path.join(__dirname, "../public/logo.png");

function chroma(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b);
}

function shouldBeTransparent(r, g, b, a) {
  if (a === 0) return true;

  const sum = r + g + b;
  const max = Math.max(r, g, b);
  const c = chroma(r, g, b);

  if (sum <= 18) return true;
  if (max <= 8) return true;
  if (max <= 32 && c <= 16) return true;

  return false;
}

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  if (shouldBeTransparent(r, g, b, data[i + 3])) {
    data[i + 3] = 0;
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim()
  .png()
  .toFile(output);

console.log("Saved transparent logo");
