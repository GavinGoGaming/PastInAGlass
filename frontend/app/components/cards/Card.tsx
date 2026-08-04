export interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
}

export default function Card({ title, description, imageUrl, linkUrl }: CardProps) {
    return (
        <div className="card">
            <a href={linkUrl}>
                <h2>{title}</h2>
                <p>{description}</p>
            </a>
        </div>
    );
}