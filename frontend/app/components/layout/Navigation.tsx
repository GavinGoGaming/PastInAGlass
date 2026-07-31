export default function Navbar() {
    return (<>
        <div className="navbar">
            <div className="navbar-logo">
                <img src="/glass.png" alt="Past in a Glass" />
                <a>Past in a Glass</a>
            </div>
            <div className="navbar-links">
                <i className="fab fa-instagram"></i>
            </div>
            <div className="navbar-right">
                <i className="far fa-bars"></i>
                Filter
            </div>
        </div>
    </>)
}