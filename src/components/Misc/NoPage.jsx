import { Col, Row, Typography } from "antd"

const { Title } = Typography
const NoPage = () => {
  return (
    <div className="container">
        <Row>
            <Col span={24}>
                <Title className="text-center">404 - Page Not Found</Title>
            </Col>
        </Row>
    </div>
  )
}

export default NoPage