import React from "react";
import { Collapse, Checkbox, InputNumber, Button, Rate } from "antd";
const { Panel } = Collapse;

const mapMenu = (categories, onChangeCategories) => {
  return categories.map((item, i) => (
    <Collapse
      activeKey={item.isActive ? i : ""}
      ghost
      key={i}
      onChange={() => onChangeCategories(item)}
    >
      <Panel
        header={
          <span
            style={{ fontWeight: item.isActive ? 600 : 400 }}
            className="list__item"
          >
            {item.name}
          </span>
        }
        key={i}
        forceRender={true}
        destroyInactivePanel={true}
      >
        {item.children && mapMenu(item.children, onChangeCategories)}
      </Panel>
    </Collapse>
  ));
};
const SideBar = ({
  categories,
  types,
  brands,
  ratings,
  total,
  priceRanges,
  onChangeType,
  onChangeCategories,
}) => {
  return (
    <>
      <Button style={{ display: "block", margin: "0 auto" }}>
        Clear all filters
      </Button>
      <h1 className="sider__heading">Show result for</h1>
      {mapMenu(categories, onChangeCategories)}
      <h1 className="sider__heading">Refine by</h1>
      <h4>Type</h4>
      {types.map((type) => (
        <p>
          <Checkbox onChange={() => onChangeType(type)}>
            {type.name}
            <span style={{ color: "#999" }}> ({type.quantity})</span>
          </Checkbox>
        </p>
      ))}
      <h4>Brand</h4>
      {brands.map((brand) => (
        <p>
          <Checkbox onChange={() => onChangeType(brand)}>
            {brand.name}
            <span style={{ color: "#999" }}> ({brand.quantity})</span>
          </Checkbox>
        </p>
      ))}
      <h4>Ratings</h4>
      {Object.entries(ratings)
        .slice(0, 4)
        .reverse()
        .map(([key, value]) => (
          <p>
            <Rate disabled defaultValue={key} /> {value}
          </p>
        ))}

      <h4>Prices</h4>
      <p style={{ paddingBottom: 40 }}>
        {priceRanges.map((price) => (
          <p>{price.name}</p>
        ))}
        $ <InputNumber min={1} size="small" /> to $
        <InputNumber min={1} size="small" />
        <Button type="primary" shape="circle" style={{ margin: "0 8px" }}>
          Go
        </Button>
      </p>
    </>
  );
};

export default SideBar;
