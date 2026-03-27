import { Col, Row, Typography } from "antd"

const { Title } = Typography
const Services = () => {
  return (
    <div className="container">
        <Row>
            <Col span={24} className="text-center">
                <Title>Services</Title>
            </Col>
        </Row>
    </div>
  )
}

export default Services