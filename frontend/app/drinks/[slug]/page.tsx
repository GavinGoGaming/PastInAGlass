import { Metadata } from 'next';
import { client, FETCH_OPTIONS } from "../../sanity/client"; // Adjust path if needed
import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";
import DrinkPageContent from './content';
import blocksToText from '@/app/utils/portableToPlain';

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? createImageUrlBuilder({ projectId, dataset }).image(source)
        : null;

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const slugs = await client.fetch<{ slug: { current: string } }[]>(
        `*[_type == "drink" && defined(slug.current)]{ slug }`,
        {},
        FETCH_OPTIONS
    );

    return slugs.map((item) => ({
        slug: item.slug.current,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const drink = await client.fetch(
        `*[_type == "drink" && slug.current == $slug][0]{ title, body }`,
        { slug },
        FETCH_OPTIONS
    );

    if (!drink) return { title: "Drink Not Found" };

    return {
        title: `${drink.title} | Past in a Glass`,
        description: drink?.body ? blocksToText(drink.body) : `${drink.title} on Past in a Glass`,
    };
}
export default async function Page({ params }: Props) {
    const { slug } = await params;

    const drink = await client.fetch(
        `*[_type == "drink" && slug.current == $slug][0]`,
        { slug },
        FETCH_OPTIONS
    );

    if (!drink) {
        return <main style={{ padding: '2rem' }}>Drink not found</main>;
    }
    const drinkWithImageUrl = {
        ...drink,
        imageUrl: drink.image ? urlFor(drink.image)?.width(1000).height(1000).url() || "" : "",
        headerImageUrl: drink.header ? urlFor(drink.header)?.width(1000).height(1000).url() || "" : undefined,
    };

    const similarDrinks = await client.fetch(
        `*[_type == "drink" && slug.current != $slug]{
    ...,
    "matchCount": count((tags[].label)[@ in $tags])
  }[matchCount > 0] | order(matchCount desc, _createdAt desc)[0...3]`,
        { slug, tags: drink.tags.map((tag: any) => tag.label) },
        FETCH_OPTIONS
    );

    const similarDrinksWithImageUrl = similarDrinks.map((drink: any) => ({
        ...drink,
        imageUrl: drink.image ? urlFor(drink.image)?.width(500).height(500).url() || "" : "",
    }));

    return <DrinkPageContent data={drinkWithImageUrl} similarDrinks={similarDrinksWithImageUrl} />;
}
