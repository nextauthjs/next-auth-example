import { Button, Card, Col, Form, Input, Row } from "antd"
import { getCsrfToken } from "next-auth/react"
import {
     UserOutlined,
     KeyOutlined,
     CaretRightOutlined,
} from "@ant-design/icons"

import axios from "axios"
import { useRouter } from "next/router"

function login({ csrfToken }) {
     const router = useRouter()

     const onFinish = async (values) => {
          await axios
               .post("/api/auth/callback/credentials", values)
               .then(async (r) => {
                    console.log(r)
               })
     }

     return (
          <div>
               <Row justify='center' align='middle'>
                    <Col>
                         <Card
                              style={{ marginTop: 20, borderRadius: 10 }}
                              title='Login '
                         >
                              <form
                                   method='post'
                                   action='/api/auth/callback/credentials'
                              >
                                   <Input
                                        name='csrfToken'
                                        type='hidden'
                                        defaultValue={csrfToken}
                                   />
                                   <label>
                                        Username
                                        <Input
                                             name='username'
                                             type='text'
                                             style={{ borderRadius: 10 }}
                                        />
                                   </label>
                                   <label>
                                        Password
                                        <Input.Password
                                             style={{ borderRadius: 10 }}
                                             name='password'
                                        />
                                   </label>
                                   <br />
                                   <br />
                                   <Button
                                        type='primary'
                                        block
                                        htmlType='submit'
                                        style={{ borderRadius: 10 }}
                                   >
                                        login
                                   </Button>
                              </form>
                         </Card>
                    </Col>
               </Row>
          </div>
     )
}

export default login

export async function getServerSideProps(context) {
     return {
          props: {
               csrfToken: await getCsrfToken(context),
          },
     }
}
