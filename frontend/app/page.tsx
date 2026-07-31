import { PortableText, type SanityDocument } from "next-sanity";
import { client, FETCH_OPTIONS, POSTS_QUERY } from "./sanity/client";
import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url"; // add /signed ?
import PageLayout from "./components/layout/PageLayout";
  
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function Home() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, FETCH_OPTIONS);
  
  return (
    <PageLayout>
      {posts.length}
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.tags.map((b: any) => b.label).join(', ')}</p>
          <img src={post.image ? urlFor(post.image)?.width(500).height(500).url() : undefined} alt={post.title} />
          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </div>
      ))}
    </PageLayout>
  );
}
