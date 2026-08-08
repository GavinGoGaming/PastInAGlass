"use client";
import "./layout.css";
import Navbar from "./Navigation";
import { PageStateContext } from "./PageState";

export default function PageLayout({
    children,
    actionButton = "filter"
}: Readonly<{
    children: React.ReactNode;
    actionButton?: "filter" | "archive";
}>) {
    return (
        <PageStateContext>
            <Navbar actionButton={actionButton} />
            <div className="content">
                {children}
                <div className="footer">
                    <img src="/glass.png" alt="Past in a Glass" />
                    <span className="footer-title">Past in a Glass</span>
                    <span className="footer-text">
                        <span>A collection of recipes & stories from the past.</span>
                        <a href="https://www.instagram.com/pastinaglass/" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i> Instagram
                        </a>
                    </span>
                </div>
            </div>
        </PageStateContext>
    );
}