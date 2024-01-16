import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext()
const api = process.env.REACT_APP_API_URL

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(null)
    const [user, setUser] = useState(null)
    const [isLoaded, setisLoaded] = useState(false)

    const login = (username, password) => {
        axios.post(`${api}/auth/login`, {
            username: username,
            password: password
        }).then((res) => {
            localStorage.setItem('id', res.data.id)
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('refreshToken', res.data.refreshToken)
            setIsLogged(true)
            setUser({ username: res.data.username, id: res.data.id, isAdmin: res.data.isAdmin })
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
                const decoded = jwtDecode(token)
                setUser({ username: username, id: userId })
                if (decoded.exp < Date.now() / 1000) {
                    const refreshToken = localStorage.getItem('refreshToken')
                    await axios.post(`${api}/auth/refresh`, {
                        refreshToken: refreshToken
                    }).then((res) => {
                        localStorage.setItem('token', res.data.accessToken)
                        localStorage.setItem('refreshToken', res.data.refreshToken)
                    }).catch((err) => {
                        console.log(err)
                    })
                }
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
