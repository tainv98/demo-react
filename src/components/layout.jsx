import React from "react";
import { Layout, Input, Row, Col, Pagination } from "antd";
import SideBar from "./SideBar";
import HeaderPage from "./HeaderPage";

const { Search } = Input;
const { Header, Content, Sider, Footer } = Layout;

class MainLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Header className="header">
          <Row align="middle">
            <Col span={3}>
              <h1 className="logo">Amazing</h1>
            </Col>
            <Col span={6}>
              <Search placeholder="Search a product" enterButton />
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider width={280} className="site-layout-background sider">
            <SideBar />
          </Sider>
          <Layout className="content-products">
            <HeaderPage />
            <Content className="site-layout-background">
              {this.props.children}
            </Content>
            <Footer style={{ textAlign: "center" }}>
              <Pagination showSizeChanger defaultCurrent={3} total={500} />
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
export default MainLayout;
