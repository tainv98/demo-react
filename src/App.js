import React, { useState, useEffect } from "react";
import MainLayout from "./components/layout.jsx";
import Product from "./components/Product.jsx";
import productApi from "./api/productApi.js";
import { Row, Col } from "antd";
const App = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = { _page: 1, _limit: 12 };
        const res = await productApi.getAll(params);
        console.log("Fetch products successfully: ", res);
        setProducts(res);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchProductList();
  }, []);
  return (
    <MainLayout>
      <Row gutter={[16, 16]}>
        {products &&
          products.map((item) => (
            <Col xl={6} lg={8} md={12} xs={24}>
              <Product key={item.objectID} product={item} />
            </Col>
          ))}
      </Row>
    </MainLayout>
  );
};
export default App;
