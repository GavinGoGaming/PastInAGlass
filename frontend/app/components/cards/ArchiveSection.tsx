"use client";

import { useState } from "react";
import ArchiveGrid from "./ArchivePosts";
import type { SanityDocument } from "next-sanity";

export default function ArchiveSection({ posts }: { posts: SanityDocument[] }) {
    const [search, setSearch] = useState("");
    const [tagsFilter, setTagsFilter] = useState<string[]>([]);

    const tags = Array.from(
        new Set(
            posts.flatMap((post) => (Array.isArray(post.tags) ? post.tags.map((tag: any) => tag.label) : []))
        )
    );

    return (
        <>
            <div className="archive-filters">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="tags-filter">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className={`tag ${tagsFilter.includes(tag) ? "selected" : ""}`}
                            onClick={() => {
                                if (tagsFilter.includes(tag)) {
                                    setTagsFilter(tagsFilter.filter((t) => t !== tag));
                                } else {
                                    setTagsFilter([...tagsFilter, tag]);
                                }
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="archive-filters-inline">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="filter">
                    Filter
                    <i className="far fa-bars-staggered"></i>
                </div>
            </div>
            <ArchiveGrid posts={posts} search={search} tagsFilter={tagsFilter} />
        </>
    );
}