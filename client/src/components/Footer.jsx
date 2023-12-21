import logo from '../assets/logo_white.png'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer>
            <img src={logo} alt="logo Kasa" />
            <p>
                © {currentYear} Kasa. All rights reserved
            </p>
        </footer>
    );
}
export default Footer;