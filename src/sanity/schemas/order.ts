import { defineField, defineType } from "sanity";

export const order = defineType({
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    defineField({
      name: "stripeSessionId",
      title: "Stripe Session ID",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "photos",
      title: "Photos Purchased",
      type: "array",
      of: [{ type: "reference", to: [{ type: "photo" }] }],
      readOnly: true,
    }),
    defineField({
      name: "photoCount",
      title: "Photo Count",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "amount",
      title: "Amount Paid (cents)",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Paid", value: "paid" },
          { title: "Fulfilled", value: "fulfilled" },
          { title: "Refunded", value: "refunded" },
        ],
      },
      initialValue: "paid",
    }),
    defineField({
      name: "createdAt",
      title: "Order Date",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
      description: "Internal notes about this order",
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      email: "customerEmail",
      amount: "amount",
      date: "createdAt",
      status: "status",
    },
    prepare({ email, amount, date, status }) {
      return {
        title: email || "Unknown customer",
        subtitle: `$${((amount || 0) / 100).toFixed(2)} - ${status || "unknown"} - ${date ? new Date(date).toLocaleDateString() : ""}`,
      };
    },
  },
});
