"use client";
import blocksToText from "@/app/utils/portableToPlain";
import { PortableText, type PortableTextBlock } from "next-sanity";
import Link from "next/link";
import { CSSProperties } from "react";

export interface CardProps {
    title: string;
    description: PortableTextBlock;
    imageUrl: string;
    linkUrl: string;
    tags: string[];
    tagsFilter: string[];
    toggleTagFilter: (tag: string) => void;
}

export default function Card({ title, description, imageUrl, linkUrl, tags, tagsFilter, toggleTagFilter }: CardProps) {
    return (
        <div className="archive-drink">
            <img src={imageUrl} alt={title} />
            <Link href={linkUrl}>
                <h2>{title}</h2>
                <span>
                    {blocksToText(description)}
                </span>
                <div className="tags">
                    {tags.map((tag, index) => (
                        <span key={index} className={`tag ${tagsFilter.includes(tag) ? "selected" : ""}`} onClick={(e) => {
                            toggleTagFilter(tag);
                            e.stopPropagation();
                            e.preventDefault();
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </Link>
        </div>
    );
}