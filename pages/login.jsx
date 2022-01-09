import { Button, Card, Col, Input, Row } from "antd"

import {
     UserOutlined,
     KeyOutlined,
     CaretRightOutlined,
} from "@ant-design/icons"

import React from "react"

function login() {
     return (
          <Row justify='center' align='middle'>
               <Col>
                    <Card
                         style={{ marginTop: 20, borderRadius: 10 }}
                         title='Login '
                    >
                         <Input
                              style={{ borderRadius: 10 }}
                              placeholder='username'
                              prefix={<UserOutlined />}
                         />
                         <br />
                         <br />

                         <Input.Password
                              style={{ borderRadius: 10 }}
                              placeholder='password'
                              prefix={<KeyOutlined />}
                         />
                         <br />
                         <br />
                         <Button
                              block

                              type='primary'
                              style={{ borderRadius: 10 }}
                              icon={<CaretRightOutlined />}
                         >
                              Login
                         </Button>
                    </Card>
               </Col>
          </Row>
     )
}

export default login
