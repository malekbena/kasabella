import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
    return (
        <header>
            <NavLink to={"/"}>
                <img src={logo} alt="logo Kasa" />
            </NavLink>
            <nav>
                <ul>
                    <li>
                        <NavLink to={"/"} className={(nav)=> nav.isActive ? "active" : ""}>
                            accueil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/about"} className={(nav)=> nav.isActive ? "active" : ""}>
                            a propos
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Navbar;