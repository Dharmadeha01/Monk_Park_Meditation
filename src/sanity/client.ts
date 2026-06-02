import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  // Fresh reads from the API (not the cached CDN) so edits in Studio show up.
  // Next.js still caches at the data layer via the `revalidate`/`tags` options
  // on the fetch, busted instantly by the /api/revalidate webhook on publish.
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "published",
});
