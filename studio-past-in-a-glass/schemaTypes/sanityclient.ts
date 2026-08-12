import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "rkr6d6m0",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: false,
});