import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { client } from "@/lib/sanity";

const CACHE_DURATION = 86400; // 24 hours

// Create diagonal stripe pattern using raw pixel manipulation — no SVG
async function createStripeOverlay(w: number, h: number): Promise<Buffer> {
  // Create a raw RGBA buffer with diagonal stripes
  const pixels = Buffer.alloc(w * h * 4, 0); // Start fully transparent

  const stripeWidth = Math.max(Math.floor(w / 8), 40);
  const stripeSpacing = stripeWidth * 3;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Diagonal stripe: (x + y) mod spacing determines if we're in a stripe
      const pos = (x + y) % stripeSpacing;
      if (pos < stripeWidth) {
        const idx = (y * w + x) * 4;
        pixels[idx] = 0;       // R
        pixels[idx + 1] = 0;   // G
        pixels[idx + 2] = 0;   // B
        pixels[idx + 3] = 70;  // Alpha (~27% opacity)
      }
    }
  }

  return sharp(pixels, {
    raw: { width: w, height: h, channels: 4 },
  })
    .png()
    .toBuffer();
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

    // Create watermark using ONLY sharp native operations — zero SVG
    const stripeOverlay = await createStripeOverlay(imgWidth, imgHeight);

    const result = await sharp(resizedBuffer)
      .composite([{ input: stripeOverlay, blend: "over", top: 0, left: 0 }])
      .jpeg({ quality: 85 })
      .toBuffer();

    return new Response(result, {
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
