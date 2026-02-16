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

    // Resize first
    const resizedBuffer = await sharp(imageBuffer)
      .resize(width, null, { withoutEnlargement: true, fit: "inside" })
      .toBuffer();

    // Get dimensions of resized image
    const metadata = await sharp(resizedBuffer).metadata();
    const imgWidth = metadata.width || width;
    const imgHeight = metadata.height || 600;

    // Build tiled watermark SVG with inline attributes (no CSS)
    const fontSize = Math.max(Math.floor(imgWidth / 6), 60);
    const spacingX = fontSize * 4;
    const spacingY = fontSize * 2.5;

    let textElements = "";
    for (let y = Math.floor(spacingY / 2); y < imgHeight + spacingY; y += spacingY) {
      for (let x = Math.floor(spacingX / 2); x < imgWidth + spacingX; x += spacingX) {
        textElements += `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" transform="rotate(-30, ${x}, ${y})" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="900" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.3)" stroke-width="2">WATERDOG</text>`;
      }
    }

    const svgBuffer = Buffer.from(
      `<svg width="${imgWidth}" height="${imgHeight}" xmlns="http://www.w3.org/2000/svg">${textElements}</svg>`
    );

    // Convert SVG to PNG first — direct SVG compositing silently fails
    const watermarkPng = await sharp(svgBuffer).png().toBuffer();

    // Composite the PNG watermark onto the photo
    const watermarkedImage = await sharp(resizedBuffer)
      .composite([{ input: watermarkPng, top: 0, left: 0 }])
      .jpeg({ quality: 85 })
      .toBuffer();

    return new Response(watermarkedImage, {
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
