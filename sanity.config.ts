"use client";

import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";
import { siteSettingsSchema } from "./src/sanity/schema";

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
    ]);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "8a6lzfqo";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "meditation-monk-park",
  title: "Meditation with a Monk in a Park",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: [siteSettingsSchema],
  },
  plugins: [structureTool({ structure })],
  // Singleton: hide create/delete/duplicate for siteSettings — only edit + publish
  document: {
    actions: (prev, { schemaType }) =>
      schemaType === "siteSettings"
        ? prev.filter((action) =>
            ["publish", "discardChanges", "restore"].includes(
              action.action ?? ""
            )
          )
        : prev,
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global" ? [] : prev,
  },
});
