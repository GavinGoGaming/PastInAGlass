export default function Navbar() {
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
                    <div className="filter">
                        Filter
                        <i className="far fa-bars-staggered"></i>
                    </div>
                </div>
            </div>
        </div>
    </>)
}