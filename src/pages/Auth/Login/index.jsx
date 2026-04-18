import { Col, Form, Row, Typography, Input, Button } from "antd"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/Auth"
import axios from "axios"
const { Title, Paragraph } = Typography

const initialState = { email: "", password: "" }

const Login = () => {

  const { dispatch, readProfile } = useAuth()
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setState(state => ({ ...state, [e.target.name]: e.target.value }))

  const handleLogin = () => {
    let { email, password } = state   
    const userData = { email, password }
    if (!email || !password) {
      return window.toastify("Please fill in all fields.", "error")
    }

    setIsProcessing(true)

    axios.post("http://localhost:8000/auth/login", userData)
      .then(res => {
        const { status, data } = res
        if ( status === 200 ) {
          localStorage.setItem("token", data.token)
          readProfile(data.token)
          window.toastify(data.message, "success")
        }
      })
      .catch(err => {
        console.error("Login error:", err)
        window.toastify(err.response.data.message, "error")
      })    
      .finally(() => {
        setIsProcessing(false)
      })
  }

  return (
    <main className="auth">
      <div className="container">
        <div className="card p-3">

          <Title level={1} className="text-center mb-4">
            Login
          </Title>
          <Paragraph className="text-center">Don't have an account? <Link to="/auth/register">Create Account</Link></Paragraph>
          <Form layout='vertical'>
            <Row>
              <Col span={24}>
                <Form.Item label="Email" required>
                  <Input size='large' type="email" placeholder="Enter Your Email" name='email' onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Password" required>
                  <Input.Password size="large" placeholder="Enter Your Password" name='password' onChange={handleChange} />
                </Form.Item>
                <Paragraph> <Link to="/auth/forgot-password">Forgot Password?</Link></Paragraph>
              </Col>
              <Col span={24} >
                <Button type="primary" size='large' block htmlType='submit' loading={isProcessing} onClick={handleLogin}>
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </main>
  )
}

export default Login