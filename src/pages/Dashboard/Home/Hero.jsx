import { Col, Row, Space, Typography } from "antd"
import { Link } from "react-router-dom"

const { Title } = Typography
const Hero = () => {
  return (
    <div className="container">
      <Row>
        <Col span={24} className="text-center mt-4">
          <Title>Hero</Title>
          <Space>
            <Link to="/" className="btn btn-danger mb-4">Frontend Page</Link>
            <Link to="/dashboard/Todos" className="btn btn-primary mb-4">Todos</Link>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default Hero