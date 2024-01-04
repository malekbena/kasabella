import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(null)
    const [user, setUser] = useState(null)
    const [isLoaded, setisLoaded] = useState(false)

    const login = (username, password) => {
        axios.post('http://localhost:9000/auth/login', {
            username: username,
            password: password
        }).then((res) => {
            localStorage.setItem('id', res.data.id)
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('refreshToken', res.data.refreshToken)
            setIsLogged(true)
            setUser({ username: res.data.username, id: res.data.id })
        })
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        setIsLogged(false)
        setUser(null)
    }

    useEffect(() => {
        const checkAuth = async () => {
            setisLoaded(false)
            const token = localStorage.getItem('token')
            const username = localStorage.getItem('username')
            const userId = localStorage.getItem('id')
            if (token) {
                setUser({ username: username, id: userId })
            }
            setIsLogged(!!token)
        }
        checkAuth()
        setisLoaded(true)
    }, [])

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser, login, logout, isLoaded }}>
            {children}
        </AuthContext.Provider>
    )
}
