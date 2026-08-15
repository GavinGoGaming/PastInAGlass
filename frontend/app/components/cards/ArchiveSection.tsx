"use client";

import { useEffect, useState } from "react";
import ArchiveGrid from "./ArchivePosts";
import type { SanityDocument } from "next-sanity";
import { usePageState } from "../layout/PageState";
import { useRouter } from "next/navigation";
import { SanityDrink } from "@/app/utils/types";

export default function ArchiveSection({ posts, spirits }: { posts: SanityDrink[], spirits?: string[] }) {
    const [search, setSearch] = useState("");
    const [tagsFilter, setTagsFilter] = useState<string[]>([]);

    const [pathname, setPathname] = useState<string>("");
    useEffect(() => {
        if(!window) return;
        setPathname(window.location.pathname);
    }, []);

    const tags = Array.from(
        new Set(
            posts.flatMap((post) => (Array.isArray(post.tags) ? post.tags.map((tag: any) => tag.label) : []))
        )
    );

    const {isFilterOpen, setIsFilterOpen} = usePageState();
    const onClose = () => setIsFilterOpen(false);

    const router = useRouter();

    return (
        <>
            <div className={`archive-filters-wrapper`}>
                <div
                    className={`archive-filters-overlay ${isFilterOpen ? "is-open" : ""}`} onClick={onClose}></div>
                <div className={`archive-filters ${isFilterOpen ? "is-open" : ""}`}>
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
                    {spirits && <div className="tags-filter-group">
                        <span className="tags-filter-label">Spirits</span>
                        <div className="tags-filter">
                            {spirits.map((tag) => (
                                <span
                                    key={tag}
                                    className={`tag ${(pathname || '').includes(tag) ? "selected" : ""}`}
                                    onClick={() => {
                                        router.push(`/spirits/${encodeURIComponent(tag)}`);
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>}
                    <div className="tags-filter-group">
                        <span className="tags-filter-label">Filter by Tags</span>
                        <div className="tags-filter">
                            {tags.filter((tag) => !spirits || !spirits.includes(tag)).map((tag) => (
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
                <div className="filter" onClick={() => setIsFilterOpen(!isFilterOpen)}>
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