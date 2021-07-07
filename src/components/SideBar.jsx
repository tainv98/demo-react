import React from "react";
import { Collapse } from "antd";
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
const SideBar = ({ data, onChangeCategories }) => {
  return (
    <>
      <h1 className="sider__heading">Show result for</h1>
      {mapMenu(data, onChangeCategories)}
      <h1 className="sider__heading">Refine by</h1>
    </>
  );
};

export default SideBar;
