import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./src/sanity/schemas";
import { bulkUploadTool } from "./src/sanity/tools/bulkUpload";

export default defineConfig({
  name: "waterdog-productions",
  title: "Waterdog Productions",
  projectId: "4osx568p",
  dataset: "production",
  basePath: "/studio",
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
  tools: [bulkUploadTool],
});
