"use client";

import { useRouter } from "next/navigation";
import { usePageState } from "./PageState";

export default function Navbar({
    actionButton = "filter"
}: {
    actionButton?: "filter" | "archive"
}) {
    const { isFilterOpen, setIsFilterOpen } = usePageState();
    const router = useRouter();
    return (<>
        <div className="navbar">
            <div className="navbar-content">
                <div className="navbar-logo">
                    <img src="/glass.png" alt="Past in a Glass" />
                    <a>Past in a Glass</a>
                </div>
                {/* <div className="navbar-links">
                <i className="fab fa-instagram"></i>
            </div> */}
                <div className="navbar-right">
                    {actionButton === "filter" && (
                        <div className="filter" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                            <i className="far fa-bars-staggered"></i>
                            Filter
                        </div>
                    )}
                    {actionButton === "archive" && (
                        <div className="filter not-filter" onClick={() => router.push("/")}>
                            <i className="fas fa-arrow-left-long"></i>
                            Archive
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>)
}