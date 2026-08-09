export type SanityDrink = {
    title: string;
    imageUrl: string;
    body: any;
    recipe: any;
    tags: { label: string }[];
    slug: {current: string};
    headerImageUrl?: string;
    photographer?: string;
    instagram?: string;
};