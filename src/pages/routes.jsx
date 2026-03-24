import { Route, Routes } from "react-router-dom"
import Frontend from "./Frontend"
import Auth from "./Auth"
import Dashboard from "./Dashboard"

const index = () => {
  return (
    <Routes>
        <Route path="/*" element={<Frontend />} />
        <Route path="auth/*" element={<Auth />} />
        <Route path="dashboard/*" element={<Dashboard />} />
    </Routes>
  )
}

export default index