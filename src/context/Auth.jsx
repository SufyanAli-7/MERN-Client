import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

const Auth = createContext()
const initialState = { isAuth: false, user: {} }

const AuthContext = ({ children }) => {

    const [state, setState] = useState(initialState)
    const [isAppLoading, setIsAppLoading] = useState(true)

    const readProfile = (token) => {
        
        axios.get("http://localhost:8000/auth/user", { headers: { Authorization: `Bearer ${ token || localStorage.getItem("token") }` } })
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setState({ isAuth: true, user: data.user })
                }
            })
            .catch(err => {
                   console.error("Error fetching user profile:", err)
            })
            .finally(() => {
                setIsAppLoading(false)
            })
    }
    useEffect(() => {
        readProfile()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        setState(initialState)
    }

    return (
        <Auth.Provider value={{ ...state, isAppLoading, handleLogout , dispatch : setState , readProfile }}>
            {children}
        </Auth.Provider>
    )
}

export default AuthContext

export const useAuth = () => useContext(Auth)
