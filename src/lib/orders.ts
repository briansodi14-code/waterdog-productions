import { createClient } from "@sanity/client";
import { projectId, dataset, apiVersion } from "./sanity";

// Dedicated non-CDN client for order reads/writes. The CDN can serve stale
// data, which would break the "did the webhook create this order yet?" check
// in the download route.
export const orderClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export interface OrderDoc {
  _id: string;
  stripeSessionId: string;
  customerEmail: string;
  status: "paid" | "fulfilled" | "refunded";
  photos?: { _ref: string }[];
}

export interface CreateOrderInput {
  sessionId: string;
  paymentIntentId: string;
  customerEmail: string;
  photoIds: string[];
  photoCount: number;
  amount: number;
}

export async function getOrderBySession(
  sessionId: string
): Promise<OrderDoc | null> {
  return orderClient.fetch(
    `*[_type == "order" && stripeSessionId == $sessionId][0]{
      _id, stripeSessionId, customerEmail, status, photos
    }`,
    { sessionId }
  );
}

// Idempotent: returns the existing order if one already exists for this session.
export async function createOrderIfNotExists(
  input: CreateOrderInput
): Promise<{ order: OrderDoc; created: boolean }> {
  const existing = await getOrderBySession(input.sessionId);
  if (existing) return { order: existing, created: false };

  const order = (await orderClient.create({
    _type: "order",
    stripeSessionId: input.sessionId,
    stripePaymentIntentId: input.paymentIntentId,
    customerEmail: input.customerEmail,
    photos: input.photoIds.map((id) => ({
      _type: "reference",
      _ref: id,
      _key: id,
    })),
    photoCount: input.photoCount,
    amount: input.amount,
    status: "paid",
    createdAt: new Date().toISOString(),
  })) as unknown as OrderDoc;

  return { order, created: true };
}
