import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { client } from "@/lib/sanity";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const photoIds = session.metadata?.photoIds?.split(",") || [];
    const photoCount = parseInt(session.metadata?.photoCount || "0");

    // Create order in Sanity if it doesn't exist
    const existingOrder = await client.fetch(
      `*[_type == "order" && stripeSessionId == $sessionId][0]`,
      { sessionId }
    );

    if (!existingOrder) {
      await client.create({
        _type: "order",
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent as string,
        customerEmail:
          session.customer_email || session.customer_details?.email || "",
        photos: photoIds.map((id) => ({
          _type: "reference",
          _ref: id,
          _key: id,
        })),
        photoCount: photoCount,
        amount: session.amount_total || 0,
        status: "paid",
        createdAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      email: session.customer_email || session.customer_details?.email,
      photoIds,
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
