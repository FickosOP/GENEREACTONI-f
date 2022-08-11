// import logo from "/docs/4.0/assets/brand/bootstrap-solid.svg";
import { useSelector, useDispatch } from 'react-redux';
import { removeUserTokenState } from '../actions/actions';

function Header(props){ //props -> active

    const active = props.active;

    const model = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

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
                    <a className={active === "profile" ? "nav-link active" : "nav-link"} href="/">Profile</a>
                    </li>
                    <li className="nav-item">
                    <a className={active === "profile" ? "nav-link active" : "nav-link"} href="/login" onClick={() => dispatch(removeUserTokenState())} tabIndex="-1">{model.id ? "Logout" : "Login"}</a>
                    </li>
                </ul>
                </div>
            </nav>
    );
    
}
export default Header;