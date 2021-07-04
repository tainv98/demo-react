import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;

const b = ["tu lanh", "toshiba"];
const c = ["tu lanh", "samsung"];

const categories = [
  {
    "Tủ lạnh": [
      {
        "To lam": [
          {
            "Tủ nóng": "Sieu to",
          },
        ],
      },
    ],
  },
];

const isArray = (item) => Array.isArray(item || objectKeys(item));
const objectKeys = (item) => item[Object.keys(item)];

const mapMenu = (item) => {
  return item.map((ite, i) => (
    <Collapse ghost>
      <Panel
        header={Object.keys(ite)}
        key={i}
        forceRender={true}
        showArrow={isArray(objectKeys(ite))}
      >
        {isArray(objectKeys(ite)) && mapMenu(objectKeys(ite))}
      </Panel>
    </Collapse>
  ));
};

const SideBar = () => {
  return mapMenu(categories);
};

export default SideBar;
