import React, { useState, useEffect } from "react";
import MainLayout from "./components/layout.jsx";
import Product from "./components/Product.jsx";
import productApi from "./api/productApi.js";
import { Row, Col, Spin } from "antd";
const App = () => {
  // const d = [a,b]
  // const b = ["tu lanh", "toshiba"];
  // const c = ["tu lanh", "samsung"];
  // b.map(x => (
  //   {b: x}
  // ))
  // const a = {
  //   tulanh : {
  //     tosiba: {
       
  //     },
  //     samsung: {
       
  //     }
  //   }
  // }
  
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ _page: 1, _limit: 12 });
  const [totalProduct, setTotalProduct] = useState(0);
  // const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const {_page, _limit,...filterd} = filter;
        const res = await productApi.getAll(filter);
        const data = await productApi.getAll(filterd);
        if(data) {
          // setCategories(data.)
          setTotalProduct(data.length)
        }
        setProducts(res);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchProductList();
  }, [filter]);

  const handleChangeSortPrice = (value) => {
    if(value === "featured") {
      const {_sort, _order,...filterd} = filter;
      setFilter({...filterd,_page: 1});
    } else {
      setFilter({...filter, _sort: 'price',_order: value,_page: 1})
    }
  }

  const handleChangeSearch = (value) => {
    setFilter({...filter, name_like: value})
  }

  const handleChangeCategories = () => {
    setFilter({})
  }

  const handleChangePagination = (page, pageSize) => {
    setFilter({...filter, _page: page, _limit: pageSize})
  }

  return (
    <MainLayout
      onChangeSortPrice={handleChangeSortPrice}
      onChangeSearch={handleChangeSearch}
      onChangeCategories={handleChangeCategories}
      onChangePagination={handleChangePagination}
      total={totalProduct}
      >
      <Row gutter={[16, 16]} className="content-spin">
        {products.length ?
          products.map((item) => (
            <Col xl={6} lg={8} md={12} xs={24} key={item.objectID}>
              <Product  product={item} />
            </Col>
          )) : <Spin size="large" style={{ margin: "20vh auto"}}/>}
      </Row>
    </MainLayout>
  );
};
export default App;
