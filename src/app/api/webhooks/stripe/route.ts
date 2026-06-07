import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createOrderIfNotExists } from "@/lib/orders";
import { sendOrderConfirmation } from "@/lib/email";
import { buildDownloadUrl } from "@/lib/downloadToken";

// Stripe signature verification needs the raw body and Node crypto.
export const runtime = "nodejs";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new NextResponse("Missing signature or webhook secret", {
      status: 400,
    });
  }

  const stripe = getStripe();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === "paid") {
      const photoIds =
        session.metadata?.photoIds?.split(",").filter(Boolean) || [];
      const photoCount = parseInt(session.metadata?.photoCount || "0");
      const email =
        session.customer_email || session.customer_details?.email || "";

      try {
        await createOrderIfNotExists({
          sessionId: session.id,
          paymentIntentId: session.payment_intent as string,
          customerEmail: email,
          photoIds,
          photoCount,
          amount: session.amount_total || 0,
        });

        if (email && photoIds.length > 0) {
          const origin =
            process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
          const downloads = photoIds.map((id) => ({
            photoId: id,
            url: buildDownloadUrl(origin, session.id, id),
          }));
          await sendOrderConfirmation({
            to: email,
            amount: session.amount_total || 0,
            downloads,
          });
        }
      } catch (err) {
        // Return 500 so Stripe retries delivery.
        console.error("Webhook processing error:", err);
        return new NextResponse("Processing error", { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
