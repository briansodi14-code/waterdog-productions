import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { client } from "@/lib/sanity";
import { getOrderBySession } from "@/lib/orders";
import { verifyDownloadToken } from "@/lib/downloadToken";

export const runtime = "nodejs";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sessionId = request.nextUrl.searchParams.get("session");
    const token = request.nextUrl.searchParams.get("token");

    // 1. Verify the signed token before doing anything else.
    if (!sessionId || !token || !verifyDownloadToken(sessionId, id, token)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Confirm the photo was actually paid for. Prefer the Sanity order
    //    (so a refund revokes access); fall back to the live Stripe session
    //    for the brief window before the webhook creates the order.
    let authorized = false;
    const order = await getOrderBySession(sessionId);
    if (order) {
      authorized =
        order.status !== "refunded" &&
        (order.photos || []).some((p) => p._ref === id);
    } else {
      try {
        const stripe = getStripe();
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const photoIds = session.metadata?.photoIds?.split(",") || [];
        authorized =
          session.payment_status === "paid" && photoIds.includes(id);
      } catch {
        authorized = false;
      }
    }

    if (!authorized) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 3. Serve the original, unwatermarked image.
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
