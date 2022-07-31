// import logo from "/docs/4.0/assets/brand/bootstrap-solid.svg";

function Header(props){ //props -> active

    const active = props.active;

    return(
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="Logo" />
                </a>

                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className={active === "home" ? "nav-link active" : "nav-link"} aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className={active === "projects" ? "nav-link active" : "nav-link"} href="/projects">Projects</a>
                    </li>
                    <li className="nav-item">
                    <a className={active === "about" ? "nav-link active" : "nav-link"} href="/about">About</a>
                    </li>
                    <li className="nav-item">
                    <a className={active === "profile" ? "nav-link active" : "nav-link"} href="/" tabIndex="-1">Profile</a>
                    </li>
                </ul>
                </div>
            </nav>
    );
    
}
export default Header;