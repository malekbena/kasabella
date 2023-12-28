import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

const Layout = () => {
    const user = useContext(AuthContext)
    
    return (
        <div className='layout'>
            {
                user.isLogged &&
                console.log(user )}
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;