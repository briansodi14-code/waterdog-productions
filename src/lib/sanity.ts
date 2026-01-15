import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "4osx568p";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Types
export interface SanityPhoto {
  _id: string;
  _createdAt: string;
  image: SanityImageSource;
  date: string;
  location: "HB Pier" | "Newport" | "San Clemente" | "Laguna";
  featured: boolean;
}

// Queries
export const photosQuery = `*[_type == "photo"] | order(date desc) {
  _id,
  _createdAt,
  image,
  date,
  location,
  featured
}`;

export const featuredPhotosQuery = `*[_type == "photo" && featured == true] | order(date desc) {
  _id,
  _createdAt,
  image,
  date,
  location,
  featured
}`;

// Fetch functions
export async function getPhotos(): Promise<SanityPhoto[]> {
  return client.fetch(photosQuery);
}

export async function getFeaturedPhotos(): Promise<SanityPhoto[]> {
  return client.fetch(featuredPhotosQuery);
}
