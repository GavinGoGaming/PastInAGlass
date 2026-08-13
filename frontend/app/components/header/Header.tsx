import { ReactNode } from "react";

export default function Header({
    customTitle,
    customDescription,
}: {
    customTitle?: ReactNode;
    customDescription?: ReactNode;
}) {
    return (
        <div className="header">
            <div className="header-inner">
                <img src="/glass.png" alt="Past in a Glass" />
                {customTitle ? <h1>{customTitle}</h1> : <h1>Past in a Glass</h1>}
                <div className="spacer">
                    <div className="spacer-square"></div>
                </div>
                {customDescription ? <p>{customDescription}</p> : <p>Every classic cocktail carries a story — a moment, a place, a person. This is where those stories are kept. In photographs, in recipes, and in the quiet reverence they deserve.</p>}
            </div>
        </div>
    );
}