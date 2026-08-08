import PageLayout from "@/app/components/layout/PageLayout";
import { PortableText } from "next-sanity";

function DrinkHeader({
    title,
    imageUrl,
    tags,
}: {
    title: string;
    imageUrl: string;
    tags: string[];
}) {
    return (
        <div className="drink-hero">
            <img src={imageUrl} alt={title} className="drink-hero-image" />
            <div className="drink-hero-overlay" />
            <div className="drink-hero-content">
                <h1 className="drink-hero-title">{title}</h1>
                <div className="drink-hero-tags">
                    {tags.map((tag) => (
                        <span key={tag} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="spacer" style={{ width: 'fit-content' }}>
                    <div className="spacer-square"></div>
                </div>
            </div>
        </div>
    );
}

export default function DrinkPageContent({ data }: {
    data: {
        title: string;
        description: string;
        imageUrl: string;
        body: any;
        recipe: any;
        tags: { label: string }[];
        slug: string;
        headerImageUrl?: string;
    }
}) {
    return (
        <PageLayout actionButton="archive">
            <DrinkHeader title={data.title} imageUrl={data.headerImageUrl || data.imageUrl} tags={data.tags.map((tag) => tag.label)} />
            <div className="content-section">
                <div className="drink-body">
                    {data.body && <PortableText value={data.body} />}
                </div>
                <div className="drink-recipe">
                    {data.recipe && <PortableText value={data.recipe} />}
                </div>
                <div className="spacer-large">
                    <div className="spacer-graphic">
                        <div className="spacer-square"></div>
                        <div className="spacer-line"></div>
                        <div className="spacer-square-large"></div>
                        <div className="spacer-line"></div>
                        <div className="spacer-square"></div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}