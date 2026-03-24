import { Col, Row, Typography } from "antd"
import { useAuth } from "@/context/Auth"

const { Title, Paragraph } = Typography
const Hero = () => {
  const { user } = useAuth()
  return (
    <div className="container">
        <Row>
            <Col span={24} className="text-center mt-4">
                <Title level={1} className="text-center">Hero</Title>
                <Paragraph className="text-center">Welcome <span className="fw-bold">{user.fullName || user.email}</span> to our website!</Paragraph>
            </Col>
        </Row>
    </div>
  )
}

export default Hero