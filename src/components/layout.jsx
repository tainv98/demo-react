import React from "react";
import { Layout, Input, Row, Col, Pagination } from "antd";
import SideBar from "./SideBar";
import HeaderPage from "./HeaderPage";

const { Search } = Input;
const { Header, Content, Sider, Footer } = Layout;

const MainLayout = ({
  data,
  children,
  onChangeSortPrice,
  onChangeSearch,
  onChangeCategories,
  onChangePagination,
  totalProducts,
}) => {
  return (
    <Layout>
      <Header className="header">
        <Row align="middle">
          <Col span={3}>
            <h1 className="logo">Amazing</h1>
          </Col>
          <Col span={6}>
            <Search
              onSearch={(value) => onChangeSearch(value)}
              placeholder="Search a product"
              enterButton
            />
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider width={280} className="site-layout-background sider">
          <SideBar data={data} onChangeCategories={onChangeCategories} />
        </Sider>
        <Layout className="content-products">
          <HeaderPage
            onChangeSortPrice={onChangeSortPrice}
            totalProducts={totalProducts}
          />
          <Content className="site-layout-background">{children}</Content>
          <Footer style={{ textAlign: "center" }}>
            <Pagination
              showSizeChanger
              pageSizeOptions={["12", "24", "36"]}
              defaultPageSize={12}
              onChange={(page, pageSize) => onChangePagination(page, pageSize)}
              total={totalProducts}
            />
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
