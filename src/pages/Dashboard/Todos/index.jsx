import { Route, Routes } from "react-router-dom"
import All from "./All"
import Add from "./Add"

const Todos = () => {
  return (
    <Routes>
        <Route path="/" element={<All />} />
        <Route path="/add" element={<Add />} />
    </Routes>
  )
}

export default Todos