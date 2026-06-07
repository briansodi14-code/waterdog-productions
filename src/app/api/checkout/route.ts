import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(request: NextRequest) {
  try {
    const { items, customerEmail } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // Calculate pricing: $8 each or 5 for $30
    const count = items.length;
    const bundles = Math.floor(count / 5);
    const remainder = count % 5;
    const totalAmount = bundles * 30 + remainder * 8;

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Surf Photos (${count} image${count !== 1 ? "s" : ""})`,
            description:
              bundles > 0
                ? `${bundles} bundle${bundles !== 1 ? "s" : ""} of 5 ($30 each)${remainder > 0 ? ` + ${remainder} individual ($8 each)` : ""}`
                : `${count} photo${count !== 1 ? "s" : ""} at $8 each`,
          },
          unit_amount: totalAmount * 100,
        },
        quantity: 1,
      },
    ];

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cart`,
      customer_email: customerEmail || undefined,
      metadata: {
        photoIds: items.map((item: { id: string }) => item.id).join(","),
        photoCount: count.toString(),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
