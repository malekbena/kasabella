import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo_white.png'
import { AuthContext } from '../context/AuthContext'

const Footer = () => {
    const currentYear = new Date().getFullYear()
    const { isLogged, user, logout } = useContext(AuthContext)
    
    const handleLogout = (e) => {
        e.preventDefault()
        logout()
    }


    return (
        <footer>
            <img src={logo} alt="logo Kasa" />
            <p>
                © {currentYear} Kasa. All rights reserved
            </p>
            {
                isLogged ?
                    <>
                        <p>
                            Bonjour {user.username}
                        </p>
                    <button onClick={e => handleLogout(e)}>
                        Déconnexion
                    </button>
                    </>
                    :
                    <NavLink to={'/login'}>
                        Connexion
                    </NavLink>
            }
        </footer>
    );
}
export default Footer;