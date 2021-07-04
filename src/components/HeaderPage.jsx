import React from "react";
import { Row, Col, Select } from "antd";
const { Option } = Select;

const HeaderPage = ({ onChangeSortPrice, total }) => {
  const loadTime =
    window.performance.timing.domComplete -
    window.performance.timing.domLoading;
  return (
    <Row justify="space-between" style={{ padding: "15px 0" }}>
      <Col span={6}>
        <span>
          {total} results found in {loadTime < 0 ? 0 : loadTime}
          ms
        </span>
      </Col>
      <Col span={6}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <span>Sort by</span>
          <Select
            defaultValue="Featured"
            style={{ width: 120 }}
            onChange={(value) => onChangeSortPrice(value)}
          >
            <Option value="featured">Featured</Option>
            <Option value="asc">Price asc</Option>
            <Option value="desc">Price desc</Option>
          </Select>
        </div>
      </Col>
    </Row>
  );
};

export default HeaderPage;
