import React, { useState, useEffect } from "react";
import MainLayout from "./components/layout.jsx";
import Product from "./components/Product.jsx";
import productApi from "./api/productApi.js";
import { Row, Col, Spin } from "antd";
import { getCategoriesLv1, handleData } from "./utils/index.js";

const App = () => {
  const [productInPage, setProductInPage] = useState([]);
  const [filter, setFilter] = useState({ _page: 1, _limit: 12 });
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentCate, setCurrentCate] = useState({});
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const { _page, _limit, ...filterd } = filter;
        const productsPage = await productApi.getAll(filter);
        const products = await productApi.getAll(filterd);

        const { categories, types, brands, ratings, priceRanges, total } =
          handleData(products);
        setCategories(categories);
        setTypes(types);
        setBrands(brands);
        setPriceRanges(priceRanges);
        setRatings(ratings);
        setTotalProducts(total);
        setProductInPage(productsPage);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductList();
  }, [filter]);

  const handleChangeType = (type) => {
    setFilter({ ...filter, type: type.type });
  };

  const handleChangeSortPrice = (value) => {
    if (value === "featured") {
      const { _sort, _order, ...filterd } = filter;
      setFilter({ ...filterd, _page: 1 });
    } else {
      setFilter({ ...filter, _sort: "price", _order: value, _page: 1 });
    }
  };
  const handleChangeSearch = (value) => {
    setFilter({ ...filter, name_like: value });
  };

  const handleChangeCategories = (category) => {
    setFilter({ ...filter, q: category.name });
  };

  const handleChangePagination = (page, pageSize) => {
    setFilter({ ...filter, _page: page, _limit: pageSize });
  };

  return (
    <MainLayout
      categories={categories}
      types={types}
      brands={brands}
      priceRanges={priceRanges}
      ratings={ratings}
      onChangeSortPrice={handleChangeSortPrice}
      onChangeSearch={handleChangeSearch}
      onChangeCategories={handleChangeCategories}
      onChangePagination={handleChangePagination}
      onChangeType={handleChangeType}
      totalProducts={totalProducts}
    >
      <Row gutter={[16, 16]} type="flex">
        {productInPage.length ? (
          productInPage.map((item) => (
            <Col xl={6} lg={8} md={12} xs={24} key={item.objectID}>
              <Product product={item} />
            </Col>
          ))
        ) : (
          <Spin size="large" style={{ margin: "20vh auto" }} />
        )}
      </Row>
    </MainLayout>
  );
};
export default App;
