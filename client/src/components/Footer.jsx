import { useContext } from 'react'
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
                        <Button text={'Tableau de bord'} link={"/dashboard"} />
                        <Button text={'Déconnexion'} onClick={e => handleLogout(e)} />
                    </>
                    :
                    <Button text={'Connexion'} link={"/login"} />
                    
            }
        </footer>
    );
}
export default Footer;