"use client";

import { useMemo, useState } from "react";
import type { SanityDocument } from "next-sanity";
import Card from "./Card";
import { SanityDrink } from "@/app/utils/types";

interface ArchiveGridProps {
    posts: SanityDocument[];
    search: string;
    tagsFilter: string[];
    toggleTagFilter: (tag: string) => void;
}

const COUNT_AMOUNT = 6;

export default function ArchiveGrid({ posts, search, tagsFilter, toggleTagFilter }: ArchiveGridProps) {
    const [showCount, setShowCount] = useState(COUNT_AMOUNT);

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

    const visiblePosts = useMemo(() => {
        return postsShown.slice(0, showCount);
    }, [postsShown, showCount]);
    const hasMore = postsShown.length > showCount;

    return (
        <>
            <div className="archive-drinks">
                {visiblePosts.map((post: SanityDocument) => (
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
            {hasMore && (
                <div className="archive-show-more">
                    <button onClick={() => setShowCount(showCount + COUNT_AMOUNT)}>Show more...</button>
                </div>
            )}
        </>
    );
}