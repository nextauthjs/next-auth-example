import { Layout, Menu, Breadcrumb } from "antd"
import {
     DesktopOutlined,
     PieChartOutlined,
     FileOutlined,
     TeamOutlined,
     UserOutlined,
} from "@ant-design/icons"
import { useState } from "react"

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu
function Member({ children }) {
     const [collapsed, onCollapse] = useState(false)

     return (
          <Layout style={{ minHeight: "100vh", minWidth: "100%" }}>
               <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={onCollapse}
                    theme='light'
               >
                    <div className='logo' />
                    <Menu
                         theme='light'
                         defaultSelectedKeys={["1"]}
                         mode='inline'
                    >
                         <Menu.Item key='1' icon={<PieChartOutlined />}>
                              Option 1
                         </Menu.Item>
                         <Menu.Item key='2' icon={<DesktopOutlined />}>
                              Option 2
                         </Menu.Item>
                         <SubMenu
                              key='sub1'
                              icon={<UserOutlined />}
                              title='User'
                         >
                              <Menu.Item key='3'>Tom</Menu.Item>
                              <Menu.Item key='4'>Bill</Menu.Item>
                              <Menu.Item key='5'>Alex</Menu.Item>
                         </SubMenu>
                         <SubMenu
                              key='sub2'
                              icon={<TeamOutlined />}
                              title='Team'
                         >
                              <Menu.Item key='6'>Team 1</Menu.Item>
                              <Menu.Item key='8'>Team 2</Menu.Item>
                         </SubMenu>
                         <Menu.Item key='9' icon={<FileOutlined />}>
                              Files
                         </Menu.Item>
                    </Menu>
               </Sider>
               <Layout className='site-layout'>
                    <Header
                         className='site-layout-background'
                         style={{ padding: 0 }}
                    />
                    <Content style={{ margin: "0 16px" }}>{children}</Content>
                    <Footer style={{ textAlign: "center" }}>
                         Ant Design ©2018 Created by Ant UED
                    </Footer>
               </Layout>
          </Layout>
     )
}

export default Member
