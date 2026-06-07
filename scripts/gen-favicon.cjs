// One-off generator for the Waterdog favicon set. Run: node scripts/gen-favicon.cjs
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const appDir = path.join(__dirname, "..", "src", "app");

// Ocean-gradient rounded square + bold white "W" (matches the WATERDOG wordmark).
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a1b2a"/>
      <stop offset="1" stop-color="#1d4d73"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="22" fill="url(#g)"/>
  <path d="M18 27 L34 73 L50 45 L66 73 L82 27" fill="none" stroke="#ffffff"
        stroke-width="13" stroke-linejoin="round" stroke-linecap="round"/>
  <rect x="40" y="83" width="20" height="5" rx="2.5" fill="#14b8a6"/>
</svg>`;

const svgBuf = Buffer.from(svg);

function buildIco(pngs) {
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);
  const entries = [];
  let offset = 6 + count * 16;
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // planes
    e.writeUInt16LE(32, 6); // bpp
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

async function png(size) {
  return sharp(svgBuf, { density: 512 }).resize(size, size).png().toBuffer();
}

(async () => {
  const sizes = [16, 32, 48];
  const pngs = [];
  for (const s of sizes) pngs.push({ size: s, data: await png(s) });

  fs.writeFileSync(path.join(appDir, "favicon.ico"), buildIco(pngs));
  fs.writeFileSync(path.join(appDir, "icon.svg"), svg);
  fs.writeFileSync(path.join(appDir, "apple-icon.png"), await png(180));

  // preview for visual check
  fs.writeFileSync(
    path.join(__dirname, "..", "docs", "guides", "favicon-preview.png"),
    await png(256)
  );
  console.log("Wrote favicon.ico, icon.svg, apple-icon.png (+ preview)");
})();
