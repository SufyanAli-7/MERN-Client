import { Col, Row, Typography } from "antd"

const { Title } = Typography
const Maps = () => {
  return (
    <div className="container">
        <Row>
            <Col span={24} className="text-center mt-4">
                <Title level={1} className="text-center">Maps</Title>
            </Col>
        </Row>
    </div>
  )
}

export default Maps