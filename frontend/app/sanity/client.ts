import { createClient } from "next-sanity";

export const FETCH_OPTIONS = {
    next: {
        revalidate: 60,
    }
}
export const POSTS_QUERY = `*[
  _type == "drink"
  && defined(slug.current)
][0...12]{_id, title, slug, tags, body, recipe, image}`;

export const client = createClient({
  projectId: "rkr6d6m0",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: false,
});