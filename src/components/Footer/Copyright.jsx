import { Col, Row, Typography } from "antd"

const { Paragraph } = Typography

const Copyright = () => {
    const year = new Date().getFullYear()
    return (
        <footer className="bg-primary py-2">
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Paragraph className="text-center mb-0 text-white">&copy; {year}. All rights reserved.</Paragraph>
                    </Col>
                </Row>
            </div>
        </footer>
    )
}

export default Copyright