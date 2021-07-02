import React from "react";
import { Row, Col, Select } from "antd";
const { Option } = Select;

const HeaderPage = () => {
  return (
    <Row justify="space-between" style={{ padding: "15px 0" }}>
      <Col span={6}>
        <span>21,469 results found in 2ms</span>
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
          <Select defaultValue="lucy" style={{ width: 120 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>
      </Col>
    </Row>
  );
};

export default HeaderPage;
