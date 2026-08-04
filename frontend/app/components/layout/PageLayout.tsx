import "./layout.css";
import Navbar from "./Navigation";

export default function PageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <div className="content">{children}</div>
        </>
    );
}