import { Button, Card, Col, Form, Input, Row } from "antd"
import { getCsrfToken } from "next-auth/react"
import {
     UserOutlined,
     KeyOutlined,
     CaretRightOutlined,
} from "@ant-design/icons"
import React from "react"
import * as reactRedux from "react-redux"
import { loginSuccess } from "./authSlice"
import axios from "axios"
import { useRouter } from "next/router"

function SignIn({ providers, csrfToken }) {
     const router = useRouter()
     const [form] = Form.useForm()
     const dispatch = reactRedux.useDispatch()

     const onFinish = async (values) => {
          await axios
               .post("/api/auth/callback/credentials", values)
               .then(async (r) => {
                    console.log(r)
               })

          // await axios
          //      .post("http://localhost:3001/auth/login", data)
          //      .then(async (r) => {
          //           const token = r.data.accessToken
          //           return token
          //      })
          //      .then(async (token) => {
          //           const headers = { Authorization: `Bearer ${token}` }
          //           const data = await axios
          //                .get("http://localhost:3001/auth/me", {
          //                     headers,
          //                })
          //                .then((res) => {
          //                     const { name, role } = res.data.data
          //                     localStorage.setItem('isAuth',true)
          //                     localStorage.setItem('isToken',`"${token}"`)

          //                     dispatch(
          //                          loginSuccess({
          //                               token,
          //                               name,
          //                               role,
          //                          })
          //                     )
          //                     router.push('/')

          //                     return { data, token }
          //                })
          //           log
          //      })

          //      .catch((e) => console.log(e))
     }

     return (
          <div>
               <Row justify='center' align='middle'>
                    <Col>
                         <Card
                              style={{ marginTop: 20, borderRadius: 10 }}
                              title='Login '
                         >
                              <Form
                                   name='basic'
                                   labelCol={{ span: 8 }}
                                   wrapperCol={{ span: 16 }}
                                   initialValues={{ remember: true }}
                                   onFinish={onFinish}
                                   autoComplete='off'
                              >
                                   <Form.Item
                                        label='Username'
                                        name='username'
                                        rules={[
                                             {
                                                  required: true,
                                                  message: "กรุณากรอกยูสเซอร์เนม!",
                                             },
                                        ]}
                                   >
                                        <Input
                                             style={{ borderRadius: 10 }}
                                             placeholder='username'
                                           prefix={<UserOutlined />}
                                        />
                                   </Form.Item>

                                   <Form.Item
                                        label='Password'
                                        name='password'
                                        rules={[
                                             {
                                                  required: true,
                                                  message: "กรุณากรอกรหัสผ่าน!",
                                             },
                                        ]}
                                   >
                                        <Input.Password
                                             style={{ borderRadius: 10 }}
                                             placeholder='password'
                                             prefix={<KeyOutlined />}
                                        />
                                   </Form.Item>

                                   <Form.Item
                                        wrapperCol={{ offset: 8, span: 16 }}
                                   >
                                        <Button
                                             block
                                             type='primary'
                                             style={{ borderRadius: 10 }}
                                             icon={<CaretRightOutlined />}
                                             htmlType='submit'
                                        >
                                             Login
                                        </Button>
                                   </Form.Item>
                              </Form>
                         </Card>
                    </Col>
               </Row>
          </div>
     )
}

export default SignIn
