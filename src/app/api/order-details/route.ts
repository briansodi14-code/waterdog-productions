import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { buildDownloadUrl } from "@/lib/downloadToken";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

// Read-only: the order document is created by the Stripe webhook. This route
// just verifies payment and returns the signed download links for the success
// page (which works even if the webhook hasn't landed yet).
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    const photoIds = session.metadata?.photoIds?.split(",").filter(Boolean) || [];
    const origin = request.nextUrl.origin;
    const downloads = photoIds.map((id) => ({
      photoId: id,
      url: buildDownloadUrl(origin, sessionId, id),
    }));

    return NextResponse.json({
      email: session.customer_email || session.customer_details?.email,
      photoIds,
      downloads,
      amount: session.amount_total,
    });
  } catch (error) {
    console.error("Order details error:", error);
    return NextResponse.json(
      { error: "Failed to get order details" },
      { status: 500 }
    );
  }
}
