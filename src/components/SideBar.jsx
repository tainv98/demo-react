import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;

const mapMenu = (categories, onChangeCategories) => {
  console.log(categories);
  return categories.map((item, i) => (
    <Collapse
      ghost
      key={i}
      onChange={() => onChangeCategories(item.name, item.level)}
    >
      {console.log(item)}
      <Panel header={item.name} key={i} forceRender={true}>
        {item.children && mapMenu(item.children)}
      </Panel>
    </Collapse>
  ));
};
const SideBar = ({ data, onChangeCategories }) => {
  return mapMenu(data, onChangeCategories);
};

export default SideBar;
