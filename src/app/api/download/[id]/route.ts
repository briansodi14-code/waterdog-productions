import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch the original image URL from Sanity
    const photo = await client.fetch(
      `*[_type == "photo" && _id == $id][0]{
        "imageUrl": image.asset->url,
        "originalFilename": image.asset->originalFilename
      }`,
      { id }
    );

    if (!photo?.imageUrl) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const imageResponse = await fetch(photo.imageUrl);
    if (!imageResponse.ok) {
      return new NextResponse("Failed to fetch image", { status: 500 });
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const filename = photo.originalFilename || `waterdog-photo-${id}.jpg`;

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-cache",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return new NextResponse("Error downloading image", { status: 500 });
  }
}
