import { Col, Form, Row, Typography, Input, Button } from "antd"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
const { Title, Paragraph } = Typography

const initialState = { fullName: "", email: "", password: "", confirmPassword: "" }

const Register = () => {
  const navigate = useNavigate()
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const handleChange = e => setState(state => ({ ...state, [e.target.name]: e.target.value }))

  const handleRegister = () => {
    let { fullName, email, password, confirmPassword } = state
    fullName = fullName.trim()
    if (fullName.length < 3) {
      return window.toastify("Full Name must be at least 3 characters", "error")
    }
    if (!window.isValidEmail(email)) {
      return window.toastify("Please enter a valid email address", "error")
    }
    if (password.length < 6) {
      return window.toastify("Password must be at least 6 characters", "error")
    }
    if (password !== confirmPassword) {
      return window.toastify("Passwords do not match", "error")
    }

    const user = { fullName, email, password }

    setIsProcessing(true)

    axios.post('http://localhost:8000/auth/register', user)
      .then(res => {
        const { status, data } = res
        if (status === 201) {
          navigate("/auth/login")
          return window.toastify(data.message, "success")
        }
      })
      .catch(err => {
        const { data, status } = err.response
        if (status === 401) {
          return window.toastify(data.message || "Registration failed. Please try again.", "error")
        }
        return window.toastify("Registration failed. Please try again.", "error")
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
            Register
          </Title>
          <Paragraph className="text-center">Already have an account? <Link to="/auth/login">Login</Link></Paragraph>
          <Form layout='vertical'>
            <Row>
              <Col span={24}>
                <Form.Item label="Full Name" required>
                  <Input size='large' type="text" placeholder="Enter Your Full Name" name='fullName' onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Email" required>
                  <Input size='large' type="email" placeholder="Enter Your Email" name='email' onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Password" required>
                  <Input.Password size="large" placeholder="Enter Your Password" name='password' onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Confirm Password" required>
                  <Input.Password size='large' placeholder="Confirm Your Password" name='confirmPassword' onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col span={24} >
                <Button type="primary" size='large' block htmlType='submit' loading={isProcessing} onClick={handleRegister}>
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </main>
  )
}

export default Register