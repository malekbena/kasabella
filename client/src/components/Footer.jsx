import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo_white.png'
import { AuthContext } from '../context/AuthContext'
import Button from './Button'

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
                        <Button text={'Déconnexion'} onClick={e => handleLogout(e)} />
                    </>
                    :
                    <Button text={'Connexion'} isLink />
                    
            }
        </footer>
    );
}
export default Footer;