import { Route, Routes } from "react-router-dom"
import All from "./All"
import Add from "./Add"
import Edit from "./Edit"

const Todos = () => {
  return (
    <Routes>
        <Route path="/" element={<All />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  )
}

export default Todos