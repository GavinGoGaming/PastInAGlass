import { PortableText, type SanityDocument } from "next-sanity";
import { client, FETCH_OPTIONS, POSTS_QUERY } from "./sanity/client";
import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url"; // add /signed ?
import PageLayout from "./components/layout/PageLayout";
import Header from "./components/header/Header";
import Card from "./components/cards/Card";
import ArchiveGrid from "./components/cards/ArchivePosts";
import ArchiveSection from "./components/cards/ArchiveSection";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;
export default async function Home() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, FETCH_OPTIONS);
  
  const postsWithImages = posts.map((post) => ({
    ...post,
    imageUrl: post.image ? urlFor(post.image)?.width(500).height(500).url() || "" : "",
  }));

  const spirits = await client.fetch<string[]>(`*[_type == "keylist" && slug.current == "tag-list-spirits"][0].tags[]`, {}, FETCH_OPTIONS);

  console.log(spirits)

  return (
    <PageLayout>
      <Header />
      <div className="archive">
        <span>The Archive</span>
        <div className="spacer-large">
          <div className="spacer-graphic">
            <div className="spacer-square"></div>
            <div className="spacer-line"></div>
            <div className="spacer-square-large"></div>
            <div className="spacer-line"></div>
            <div className="spacer-square"></div>
          </div>
        </div>
        <ArchiveSection spirits={spirits.map((tag: any) => tag.label)} posts={postsWithImages} />
      </div>
    </PageLayout>
  );
}
