import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { client } from "@/lib/sanity";

const CACHE_DURATION = 86400; // 24 hours

// Bitmap font for "WATERDOG" — each letter is 5 wide x 7 tall (1 = pixel on)
const FONT: Record<string, number[][]> = {
  W: [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,1,0,1,1],
    [1,0,0,0,1],
  ],
  A: [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
  ],
  T: [
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
  ],
  E: [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1],
  ],
  R: [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,1,0,0],
    [1,0,0,1,0],
    [1,0,0,0,1],
  ],
  D: [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
  ],
  O: [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  G: [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,0],
    [1,0,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
};

const WORD = "WATERDOG";

// Draw "WATERDOG" text into a raw RGBA buffer at given position and scale
function drawText(
  pixels: Buffer,
  imgW: number,
  startX: number,
  startY: number,
  scale: number,
  r: number,
  g: number,
  b: number,
  alpha: number
) {
  let cursorX = startX;
  const letterSpacing = 1; // 1 cell gap between letters

  for (const char of WORD) {
    const glyph = FONT[char];
    if (!glyph) continue;

    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        if (glyph[row][col] === 1) {
          // Draw a scaled block for each "on" pixel
          for (let sy = 0; sy < scale; sy++) {
            for (let sx = 0; sx < scale; sx++) {
              const px = cursorX + col * scale + sx;
              const py = startY + row * scale + sy;
              if (px >= 0 && px < imgW && py >= 0) {
                const idx = (py * imgW + px) * 4;
                if (idx >= 0 && idx + 3 < pixels.length) {
                  pixels[idx] = r;
                  pixels[idx + 1] = g;
                  pixels[idx + 2] = b;
                  pixels[idx + 3] = alpha;
                }
              }
            }
          }
        }
      }
    }
    cursorX += (5 + letterSpacing) * scale;
  }
}

// Create full watermark overlay with tiled "WATERDOG" text — zero SVG
function createWatermarkOverlay(w: number, h: number): Buffer {
  const pixels = Buffer.alloc(w * h * 4, 0); // Start fully transparent

  // Scale text based on image width
  const scale = Math.max(Math.floor(w / 80), 3);
  const textWidth = (5 * 8 + 7) * scale; // 8 letters, 7 gaps
  const textHeight = 7 * scale;

  // Spacing between repetitions
  const spacingX = textWidth + scale * 12;
  const spacingY = textHeight + scale * 14;

  // Tile across the image with offset rows for diagonal feel
  for (let row = -1; row * spacingY < h + spacingY; row++) {
    const offsetX = (row % 2) * Math.floor(spacingX / 2); // Stagger every other row
    for (let col = -1; col * spacingX < w + spacingX; col++) {
      const x = col * spacingX + offsetX;
      const y = row * spacingY;
      // Dark text with some transparency
      drawText(pixels, w, x, y, scale, 0, 0, 0, 90);
    }
  }

  return pixels;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const width = Math.min(parseInt(searchParams.get("w") || "800"), 2000);

    // Fetch the image URL from Sanity (server-side only)
    const photo = await client.fetch(
      `*[_type == "photo" && _id == $id][0]{ "imageUrl": image.asset->url }`,
      { id }
    );

    if (!photo?.imageUrl) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const imageResponse = await fetch(photo.imageUrl);
    if (!imageResponse.ok) {
      return new NextResponse("Failed to fetch image", { status: 500 });
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Resize the photo
    const resizedBuffer = await sharp(imageBuffer)
      .resize(width, null, { withoutEnlargement: true, fit: "inside" })
      .toBuffer();

    const metadata = await sharp(resizedBuffer).metadata();
    const imgWidth = metadata.width || width;
    const imgHeight = metadata.height || 600;

    // Create text watermark using raw pixels — no SVG
    const watermarkPixels = createWatermarkOverlay(imgWidth, imgHeight);
    const watermarkPng = await sharp(watermarkPixels, {
      raw: { width: imgWidth, height: imgHeight, channels: 4 },
    })
      .png()
      .toBuffer();

    // Composite onto the photo
    const result = await sharp(resizedBuffer)
      .composite([{ input: watermarkPng, blend: "over", top: 0, left: 0 }])
      .jpeg({ quality: 85 })
      .toBuffer();

    return new Response(new Uint8Array(result), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": `public, max-age=${CACHE_DURATION}, s-maxage=${CACHE_DURATION}`,
        "CDN-Cache-Control": `public, max-age=${CACHE_DURATION}`,
        "Vercel-CDN-Cache-Control": `public, max-age=${CACHE_DURATION}`,
      },
    });
  } catch (error) {
    console.error("Watermark error:", error);
    return new NextResponse(`Error: ${error}`, { status: 500 });
  }
}
