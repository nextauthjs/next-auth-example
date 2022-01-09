import { Col, Row, Pagination } from "antd"
import Member from "../components/layout/member"
import { Table, Tag, Space } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
function Layuot1() {
     const columns = [
          {
               title: "Name",
               dataIndex: "name",
               key: "name",
               width: 100,
               render: (text) => <a>{text}</a>,
          },
          {
               title: "Age",
               dataIndex: "age",
               key: "age",
               responsive: ["lg"],
          },
          {
               title: "Address",
               dataIndex: "address",
               key: "address",
               responsive: ["lg"],
          },
          {
               title: "Tags",
               key: "tags",
               dataIndex: "tags",
               width: 50,
               render: (tags) => (
                    <>
                         {tags.map((tag) => {
                              let color = tag.length > 5 ? "geekblue" : "green"
                              if (tag === "ถอน") {
                                   color = "volcano"
                              }
                              return (
                                   <Tag color={color} key={tag}>
                                        {tag.toUpperCase()}
                                   </Tag>
                              )
                         })}
                    </>
               ),
          },
          {
               title: "Action",
               key: "action",
               width: 100,
               render: (text, record) => (
                    <Space size='middle'>
                         <EditOutlined />
                         <DeleteOutlined />
                    </Space>
               ),
          },
     ]

     const data = [
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "1",
               name: "tsb05676654",
               age: 32,
               address: "New York No. 1 Lake Park",
               tags: ["ฝาก"],
          },
          {
               key: "2",
               name: "tsb09677876",
               age: 42,
               address: "London No. 1 Lake Park",
               tags: ["ถอน"],
          },
          {
               key: "3",
               name: "tsb0567655",
               age: 32,
               address: "Sidney No. 1 Lake Park",
               tags: ["ฝาก"],
          },
     ]

     return (
          <Member>
               <Row>
                    <Col span={10} offset={1}>
                         <Row >
                              <Table
                                   scroll={{
                                        y: 300,
                                   }}
                                   columns={columns}
                                   dataSource={data}
                                   size='small'
                                   bordered
                                   title={() => "รายการฝาก"}
                              />
                         </Row>
                         <Row>
                              <Table
                                   columns={columns}
                                   dataSource={data}
                                   size='small'
                                   bordered
                                   title={() => "รายการถอน"}
                              />
                         </Row>
                         <Row>
                              <Table
                                   columns={columns}
                                   dataSource={data}
                                   size='small'
                                   bordered
                                   title={() => "รายการถอน"}
                              />
                         </Row>
                    </Col>
                    <Col span={12} offset={1}>
                         {" "}
                         <Table
                              columns={columns}
                              dataSource={data}
                              size='small'
                              pagination={<Pagination disabled />}
                         />
                    </Col>
               </Row>
          </Member>
     )
}

export default Layuot1
