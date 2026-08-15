import Card from "@/app/components/cards/Card";
import PageLayout from "@/app/components/layout/PageLayout";
import { SanityDrink } from "@/app/utils/types";
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

export default function DrinkPageContent({ data, similarDrinks }: {
    data: SanityDrink;
    similarDrinks: SanityDrink[];
}) {
    return (
        <PageLayout actionButton="archive">
            <DrinkHeader title={data.title} imageUrl={data.headerImageUrl || '/default.jpg'} tags={data.tags.map((tag) => tag.label)} />
            <div className="content-section">
                <div className="drink-body">
                    <div className="drink-body-left">
                        <div className="drink-image">
                            <div className="image-arrows top"></div>
                            <img src={data.imageUrl} alt={data.title} className="drink-image-main" />
                            <div className="image-arrows bottom"></div>
                        </div>
                        {data.photographer && <a href={`https://www.instagram.com/${data.photographer}/`} target="_blank" rel="noopener noreferrer">
                            <i className="far fa-camera"></i> {data.photographer}
                        </a>}
                        {data.instagram && <a href={data.instagram} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i> View on Instagram
                        </a>}
                    </div>
                    <div className="drink-body-text">
                        <span className="heading">Description</span>
                        {data.body && <PortableText value={data.body} />}
                        <div className="spacer-large">
                            <div className="spacer-graphic">
                                <div className="spacer-square"></div>
                                <div className="spacer-line"></div>
                                <div className="spacer-square-large"></div>
                                <div className="spacer-line"></div>
                                <div className="spacer-square"></div>
                            </div>
                        </div>
                        <span className="heading">Recipe</span>
                        {data.recipe && <PortableText value={data.recipe} />}
                    </div>
                </div>
            </div>
            <div className="content-section">
                <h2>Similar Drinks</h2>
                <div className="spacer-large">
                    <div className="spacer-graphic">
                        <div className="spacer-square"></div>
                        <div className="spacer-line"></div>
                        <div className="spacer-square-large"></div>
                        <div className="spacer-line"></div>
                        <div className="spacer-square"></div>
                    </div>
                </div>
                <div className="similar-drinks">
                    {similarDrinks.length === 0 && <p>No similar drinks found.</p>}
                    {similarDrinks.map((drink) => (
                        <Card
                            key={drink.slug.current + '-similardrink'}
                            title={drink.title}
                            imageUrl={drink.imageUrl}
                            tags={drink.tags.map((tag) => tag.label)}
                            description={drink.body}
                            linkUrl={`/drinks/${drink.slug.current}`}
                        />
                    ))}
                </div>
            </div>
        </PageLayout>
    );
}