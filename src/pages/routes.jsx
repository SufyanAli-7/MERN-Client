import { Navigate, Route, Routes } from "react-router-dom"
import Frontend from "./Frontend"
import Auth from "./Auth"
import Dashboard from "./Dashboard"
import ProtectedRoute from "../components/Misc/ProtectedRoute"
import { useAuth } from "../context/Auth"

const index = () => {
  const { isAuth} = useAuth()
  return (
    <Routes>
        <Route path="/*" element={<Frontend />} />
        <Route path="auth/*" element={!isAuth ? <Auth /> : <Navigate to="/dashboard" />} />
        <Route path="dashboard/*" element={<ProtectedRoute Component={Dashboard} />} />
    </Routes>
  )
}

export default index