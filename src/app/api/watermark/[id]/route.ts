import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { client } from "@/lib/sanity";

const CACHE_DURATION = 86400; // 24 hours

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const width = Math.min(parseInt(searchParams.get("w") || "800"), 2000);

    // Fetch the image URL from Sanity (server-side only — never exposed to client)
    const photo = await client.fetch(
      `*[_type == "photo" && _id == $id][0]{ "imageUrl": image.asset->url }`,
      { id }
    );

    if (!photo?.imageUrl) {
      return new NextResponse("Image not found", { status: 404 });
    }

    // Fetch the original image from Sanity CDN
    const imageResponse = await fetch(photo.imageUrl);
    if (!imageResponse.ok) {
      return new NextResponse("Failed to fetch image", { status: 500 });
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Resize first so watermark SVG matches the output dimensions
    const resized = sharp(imageBuffer).resize(width, null, {
      withoutEnlargement: true,
      fit: "inside",
    });
    const resizedBuffer = await resized.toBuffer();
    const { width: imgW, height: imgH } = await sharp(resizedBuffer).metadata();
    const w = imgW || width;
    const h = imgH || Math.round(width * 0.75);

    // Scale watermark text to image size — large enough to deter theft
    const fontSize = Math.max(Math.floor(w / 7), 48);
    const strokeWidth = Math.max(Math.floor(fontSize / 12), 2);
    const spacingX = fontSize * 4;
    const spacingY = fontSize * 2.5;

    // Tile watermark text across the entire image in a diagonal pattern
    // Each text element is rendered twice: dark stroke behind, white fill on top
    let watermarkTexts = "";
    for (let y = -spacingY; y < h + spacingY; y += spacingY) {
      for (let x = -spacingX; x < w + spacingX; x += spacingX) {
        const rot = `rotate(-30, ${x}, ${y})`;
        const attrs = `x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" transform="${rot}"`;
        // Dark outline for visibility on bright areas (sky, white water)
        watermarkTexts += `<text ${attrs} class="wm-stroke">WATERDOG</text>`;
        // White fill on top
        watermarkTexts += `<text ${attrs} class="wm-fill">WATERDOG</text>`;
      }
    }

    const watermarkSvg = Buffer.from(`
      <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            .wm-stroke {
              font-family: Arial, Helvetica, sans-serif;
              font-weight: bold;
              font-size: ${fontSize}px;
              fill: none;
              stroke: rgba(0, 0, 0, 0.4);
              stroke-width: ${strokeWidth}px;
            }
            .wm-fill {
              font-family: Arial, Helvetica, sans-serif;
              font-weight: bold;
              font-size: ${fontSize}px;
              fill: rgba(255, 255, 255, 0.6);
              stroke: none;
            }
          </style>
        </defs>
        ${watermarkTexts}
      </svg>
    `);

    const watermarkedImage = await sharp(resizedBuffer)
      .composite([{ input: watermarkSvg, gravity: "center" }])
      .jpeg({ quality: 80, progressive: true })
      .toBuffer();

    return new NextResponse(new Uint8Array(watermarkedImage), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": `public, max-age=${CACHE_DURATION}, s-maxage=${CACHE_DURATION}`,
        "CDN-Cache-Control": `public, max-age=${CACHE_DURATION}`,
        "Vercel-CDN-Cache-Control": `public, max-age=${CACHE_DURATION}`,
      },
    });
  } catch (error) {
    console.error("Watermark error:", error);
    return new NextResponse("Error processing image", { status: 500 });
  }
}
