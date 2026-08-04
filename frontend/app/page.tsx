import { PortableText, type SanityDocument } from "next-sanity";
import { client, FETCH_OPTIONS, POSTS_QUERY } from "./sanity/client";
import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url"; // add /signed ?
import PageLayout from "./components/layout/PageLayout";
import Header from "./components/header/Header";
  
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function Home() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, FETCH_OPTIONS);
  
  return (
    <PageLayout>
      <Header />
      <div className="archive">
        <span>The Archive</span>
        <div className="spacer-large">
          <div className="spacer-graphic">
            {/* pureCSS version of:
            <div class="flex items-center gap-1.5" data-fg-d3bl117=":0:/src/app/App.tsx:504:15:19520:397:e:div:etetetete"><div class="w-1 h-1 rotate-45 bg-primary/50" data-fg-d3bl118=":0:/src/app/App.tsx:505:17:19580:51:e:div"></div><div class="w-3 h-px bg-primary/50" data-fg-d3bl119=":0:/src/app/App.tsx:506:17:19648:42:e:div"></div><div class="w-2 h-2 rotate-45 border border-primary/60" data-fg-d3bl120=":0:/src/app/App.tsx:507:17:19707:62:e:div"></div><div class="w-3 h-px bg-primary/50" data-fg-d3bl121=":0:/src/app/App.tsx:508:17:19786:42:e:div"></div><div class="w-1 h-1 rotate-45 bg-primary/50" data-fg-d3bl122=":0:/src/app/App.tsx:509:17:19845:51:e:div"></div></div> */}
            <div className="spacer-square"></div>
            <div className="spacer-line"></div>
            <div className="spacer-square-large"></div>
            <div className="spacer-line"></div>
            <div className="spacer-square"></div>
          </div>
        </div>
      </div>
      {/* {posts.length}
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.tags.map((b: any) => b.label).join(', ')}</p>
          <img src={post.image ? urlFor(post.image)?.width(500).height(500).url() : undefined} alt={post.title} />
          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </div>
      ))} */}
    </PageLayout>
  );
}
