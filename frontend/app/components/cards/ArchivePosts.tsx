"use client";

import { useMemo, useState } from "react";
import type { SanityDocument } from "next-sanity";
import Card from "./Card";

interface ArchiveGridProps {
    posts: SanityDocument[];
    search: string;
    tagsFilter: string[];
    toggleTagFilter: (tag: string) => void;
}

const INITIAL_COUNT = 6;

export default function ArchiveGrid({ posts, search, tagsFilter, toggleTagFilter }: ArchiveGridProps) {
    const [showAll, setShowAll] = useState(false);

    const postsShown = useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch =
                !search || post.title?.toLowerCase().includes(search.toLowerCase());

            const postTags: string[] = Array.isArray(post.tags)
                ? post.tags.map((tag: any) => tag.label)
                : [];

            const matchesTags =
                tagsFilter.length === 0 ||
                tagsFilter.every((filterTag) => postTags.includes(filterTag));

            return matchesSearch && matchesTags;
        });
    }, [posts, search, tagsFilter]);

    const visiblePosts = showAll ? postsShown : postsShown.slice(0, INITIAL_COUNT);
    const hasMore = postsShown.length > INITIAL_COUNT;

    return (
        <>
            <div className="archive-drinks">
                {visiblePosts.map((post) => (
                    <Card
                        key={post._id}
                        description={post.body}
                        title={post.title}
                        imageUrl={post.imageUrl || ""}
                        linkUrl={`/drinks/${post.slug.current}`}
                        tags={Array.isArray(post.tags) ? post.tags.map((tag: any) => tag.label) : []}
                        tagsFilter={tagsFilter}
                        toggleTagFilter={toggleTagFilter}
                    />
                ))}
            </div>
            {hasMore && !showAll && (
                <button onClick={() => setShowAll(true)}>Show more...</button>
            )}
        </>
    );
}