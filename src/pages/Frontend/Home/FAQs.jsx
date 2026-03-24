import { Col, Row, Typography } from "antd"

const { Title } = Typography
const FAQs = () => {
  return (
    <div className="container">
        <Row>
            <Col span={24} className="text-center mt-4">
                <Title level={1} className="text-center">FAQs</Title>
            </Col>
        </Row>
    </div>
  )
}

export default FAQs