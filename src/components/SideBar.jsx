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
        header={item.name}
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
  return mapMenu(data, onChangeCategories);
};

export default SideBar;
