import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { disconnect } from '../util'
import logo from '../assets/logo_white.png'
const Footer = () => {
    const [isLogged, setIsLogged] = useState(false)
    const currentYear = new Date().getFullYear()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogged(true)
        } else {
            setIsLogged(false)
        }
    }, [isLogged])

    const handleDisconnect = (e) => {
        e.preventDefault()
        disconnect()
        setIsLogged(false)
    }


    return (
        <footer>
            <img src={logo} alt="logo Kasa" />
            <p>
                © {currentYear} Kasa. All rights reserved
            </p>
            {
                isLogged ?
                    <button onClick={e => handleDisconnect(e)}>
                        Déconnexion
                    </button>
                    :
                    <NavLink to={'/login'}>
                        Connexion
                    </NavLink>
            }
        </footer>
    );
}
export default Footer;