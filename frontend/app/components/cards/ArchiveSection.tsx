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

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);

    return (
        <>
            <div className={`archive-filters-wrapper`}>
                <div
                    className={`archive-filters-overlay ${isOpen ? "is-open" : ""}`} onClick={onClose}></div>
                <div className={`archive-filters ${isOpen ? "is-open" : ""}`}>
                    <div className="archive-filters-header">
                        <span>Browse</span>
                        <i className="fas fa-x" onClick={onClose}></i>
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="tags-filter-group">
                        <span className="tags-filter-label">Tags</span>
                        <div className="tags-filter">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className={`tag ${tagsFilter.includes(tag) ? "selected" : ""}`}
                                    onClick={() => {
                                        setTagsFilter(
                                            tagsFilter.includes(tag)
                                                ? tagsFilter.filter((t) => t !== tag)
                                                : [...tagsFilter, tag]
                                        );
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="archive-filters-inline">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="filter" onClick={() => setIsOpen(!isOpen)}>
                    Filter
                    <i className="far fa-bars-staggered"></i>
                </div>
            </div>
            <div className="archive-tags-inline">
                {tagsFilter.map((tag) => (
                    <span
                        key={tag + '-filterinline'}
                        className="tag selected"
                        onClick={() => {
                            setTagsFilter(tagsFilter.filter((t) => t !== tag));
                        }}
                    >
                        <i className="fas fa-x"></i>
                        {tag}
                    </span>
                ))}
            </div>
            <ArchiveGrid posts={posts} search={search} tagsFilter={tagsFilter} toggleTagFilter={(tag) => {
                setTagsFilter(
                    tagsFilter.includes(tag)
                        ? tagsFilter.filter((t) => t !== tag)
                        : [...tagsFilter, tag]
                );
            }} />
        </>
    );
}