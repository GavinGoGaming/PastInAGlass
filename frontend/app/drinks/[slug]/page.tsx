import PageLayout from "@/app/components/layout/PageLayout";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function DrinkPage({ params }: PageProps) {
    const { slug } = await params;

    return (
        <PageLayout>
            <h1>Current Slug: {slug}</h1>
        </PageLayout>
    );
}