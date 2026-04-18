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
                <Paragraph className="text-center fw-semibold">uid: {user?.uid}</Paragraph>
                <Paragraph className="text-center">Welcome <span className="fw-bold text-bg-danger p-1 px-2 rounded shadow">{user?.fullName || "User"}</span> to our website!</Paragraph>
                <Paragraph className="text-center fw-semibold">Email: {user?.email}</Paragraph>
            </Col>
        </Row>
    </div>
  )
}

export default Hero