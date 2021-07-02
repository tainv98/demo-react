import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const SideBar = () => {
  return (
    <Collapse ghost>
      <Panel header="This is panel " key="1">
        <Collapse ghost>
          <Panel header="This is panel hea" key="1">
            <p>{text}</p>
          </Panel>
          <Panel header="This is pa" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="This is pa" key="3">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <Collapse ghost>
          <Panel header="This is panel header 1" key="1">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <Collapse ghost>
          <Panel header="This is panel header 1" key="1">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </Panel>
    </Collapse>
  );
};

export default SideBar;
