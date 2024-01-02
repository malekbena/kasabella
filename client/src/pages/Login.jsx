import { useState, useEffect, useContext} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { isLogged, login } = useContext(AuthContext)
    const location = useLocation()

    const handleLogin = (e) => {
        e.preventDefault()
        login(username, password)
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (isLogged) {
            navigate(location.state ? location.state : '/')
            
        }
    }, [isLogged, navigate, location.state])

    
    return (
        <div>
            <h1>Login</h1>
            <form action="">
                <label htmlFor="username">Utilisateur</label>
                <input id="username" type="text" onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password">Mot de passe</label>
                <input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                <input type="submit" value="Valider" onClick={e => { handleLogin(e) }} />
            </form>
        </div>
    );
}

export default Login