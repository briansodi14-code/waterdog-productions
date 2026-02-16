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

    // Resize the photo
    const resizedBuffer = await sharp(imageBuffer)
      .resize(width, null, { withoutEnlargement: true, fit: "inside" })
      .toBuffer();

    const metadata = await sharp(resizedBuffer).metadata();
    const imgWidth = metadata.width || width;
    const imgHeight = metadata.height || 600;

    // --- Approach: SVG pattern rendered to PNG, then composited ---
    const fontSize = Math.max(Math.floor(imgWidth / 5), 80);

    const svgImage = `<svg width="${imgWidth}" height="${imgHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="wm" patternUnits="userSpaceOnUse" width="${fontSize * 5}" height="${fontSize * 3}" patternTransform="rotate(-30)">
      <text x="${fontSize * 2.5}" y="${fontSize * 1.5}" font-family="Arial Black, Arial, sans-serif" font-size="${fontSize}px" font-weight="900" fill="#000000" fill-opacity="0.35" text-anchor="middle" dominant-baseline="middle">WATERDOG</text>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#wm)"/>
</svg>`;

    let watermarkPng: Buffer;
    try {
      watermarkPng = await sharp(Buffer.from(svgImage))
        .ensureAlpha()
        .png({ compressionLevel: 0 })
        .toBuffer();
      console.log("SVG watermark PNG size:", watermarkPng.length);
    } catch (svgError) {
      console.error("SVG render failed, using fallback:", svgError);
      // Fallback: solid semi-transparent dark overlay (no SVG needed)
      watermarkPng = await sharp({
        create: {
          width: imgWidth,
          height: imgHeight,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 80 },
        },
      })
        .png()
        .toBuffer();
    }

    // Composite watermark onto the photo
    const result = await sharp(resizedBuffer)
      .composite([{ input: watermarkPng, blend: "over", top: 0, left: 0 }])
      .jpeg({ quality: 85 })
      .toBuffer();

    console.log("Final image size:", result.length);

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
