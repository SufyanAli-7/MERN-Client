import { Button, Space } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/Auth"

const Navbar = () => {
    const {isAuth, handleLogout} = useAuth()
    const navigate = useNavigate()
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Todo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <Space>
                                {isAuth 
                                ?<>
                                <Button type="primary" size="large" className="bg-danger" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                                <Button type="primary" size="large" className="bg-info" onClick={handleLogout}>Logout</Button>
                                </>
                                :<>
                                <Button type="primary" size="large" className="bg-success" onClick={() => navigate('/auth/login')}>Login</Button>
                                <Button type="primary" size="large" className="bg-danger" onClick={() => navigate('/auth/register')}>Register</Button>
                                </>
                                }
                            </Space>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar