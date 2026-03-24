import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import About from "./About"
import Contact from "./contact"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const Frontend = () => {
    return (
        <> 
          <Header />
           <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
           </Routes>
           <Footer />
        </>
    )
}

export default Frontend