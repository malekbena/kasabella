import { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLogged, setIsLogged] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLogged) {
            navigate('/')
        }
    }, [isLogged, navigate])

    const send = (e) => {
        e.preventDefault()
        axios.post('http://localhost:9000/auth/login', {
            username: username,
            password: password
        }).then((res) => {
            localStorage.setItem('token', res.data.token)
            setIsLogged(true)
        })
    }
    return (
        <div>
            <h1>Login</h1>
            <form action="">
                <label htmlFor="username">Utilisateur</label>
                <input id="username" type="text" onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password">Mot de passe</label>
                <input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                <input type="submit" value="Valider" onClick={e => { send(e) }} />
            </form>
        </div>
    );
}

export default Login