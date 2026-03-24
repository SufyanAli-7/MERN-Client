import { Col, Form, Row, Typography, Input, Button } from "antd"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/Auth"
const { Title, Paragraph } = Typography

const initialState = { email: "" }

const ForgetPassword = () => {

  const { dispatch } = useAuth()
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setState(state => ({ ...state, [e.target.name]: e.target.value }))

  const handleForgetPassword = () => {
    let { email } = state
    if (!window.isValidEmail(email)) {
      return window.toastify("Please enter a valid email address", "error")
    }  
    setIsProcessing(true)
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find(u => u.email === email)
    if (!user) {
      setIsProcessing(false)
      return window.toastify("No account found with this email.", "error")
    }
    dispatch({ isAuth: true, user: { ...user } })
    navigate("/")
    setTimeout(() => {
      setIsProcessing(false)
      window.toastify("Password reset link has been sent to your email (simulated).", "success")
    }, 1000)  
    }   

  return (
    <main className="auth">
      <div className="container">
        <div className="card p-3">

          <Title level={1} className="text-center mb-4">
            Forget Password
          </Title>
          <Paragraph className="text-center">Remember your password? <Link to="/auth/login">Login</Link></Paragraph>
          <Form layout='vertical'>
            <Row>
              <Col span={24}>
                <Form.Item label="Email" required>
                  <Input size='large' type="email" placeholder="Enter Your Email" name='email' onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col span={24} >
                <Button type="primary" size='large' block htmlType='submit' loading={isProcessing} onClick={handleForgetPassword}>
                  Forget Password
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </main>
  )
}

export default ForgetPassword