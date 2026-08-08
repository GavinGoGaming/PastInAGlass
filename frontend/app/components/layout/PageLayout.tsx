"use client";
import "./layout.css";
import Navbar from "./Navigation";
import { PageStateContext } from "./PageState";

export default function PageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <PageStateContext>
            <Navbar />
            <div className="content">{children}</div>
        </PageStateContext>
    );
}